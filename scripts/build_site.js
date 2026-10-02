// Builds the static Chinese wiki into docs/ from source/html + translation memory.
const fs = require('fs');
const path = require('path');
const DomUtils = require('domutils');
const { marked } = require('marked');
const { loadFragment, preprocess, collectRuns, encodeRun, decode, keyOf, escapeText, checkTranslation } = require('./lib/segments');

const ROOT = path.join(__dirname, '..');
const HTML_DIR = path.join(ROOT, 'source', 'html');
const TM_DIR = path.join(ROOT, 'translation', 'tm');
const SRC = path.join(ROOT, 'site-src');
const OUT = path.join(ROOT, 'docs');
const BASE = 'https://ck3.paradoxwikis.com';
const REPO = 'https://github.com/williamlorder/Translation_CK3';
const MAIN = 'Crusader_Kings_III_Wiki';
const SITE = '十字军之王III 中文维基';
const NS_RE = /^(File|Image|Media|Category|Template|Special|CK3_Wiki|Project|User|User_talk|Talk|Help|MediaWiki|Module|Mod|Forum)( talk)?:/i;

const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const meta = readJson(path.join(HTML_DIR, 'pages.json'), { pages: {}, aliases: {} });
const redirects = readJson(path.join(HTML_DIR, 'redirects.json'), {});
const exclusions = readJson(path.join(SRC, 'exclusions.json'), {});
const tm = {};
if (fs.existsSync(TM_DIR)) for (const f of fs.readdirSync(TM_DIR).filter((f) => f.endsWith('.json'))) Object.assign(tm, readJson(path.join(TM_DIR, f), {}));

const pages = meta.pages;

// Legacy pages: earlier text-only translations (translated/zh) for core pages that could not be
// fetched as HTML. Pages whose legacy text mostly consisted of in-game flavor text are left out.
const LEGACY_DIR = path.join(ROOT, 'translated', 'zh');
const LEGACY_SKIP = new Set(['Doctrines', 'Traditions', 'Innovation', 'Characters', 'Beginners_guide']);
const legacy = {};
const legacyAlias = {};
for (const f of fs.existsSync(LEGACY_DIR) ? fs.readdirSync(LEGACY_DIR).filter((f) => f.endsWith('.md')) : []) {
  const name = f.replace(/\.md$/, '');
  if (LEGACY_SKIP.has(name)) continue;
  const enFile = path.join(ROOT, 'source', 'en', f);
  const enTitle = fs.existsSync(enFile) ? (fs.readFileSync(enFile, 'utf8').match(/^# (.+)$/m) || [])[1] : null;
  const c = (enTitle || name).trim().replace(/ /g, '_');
  if (pages[c] || pages[name] || (meta.aliases[name] && pages[meta.aliases[name]])) continue;
  const zhText = fs.readFileSync(path.join(LEGACY_DIR, f), 'utf8');
  const zh = ((zhText.match(/^# (.+)$/m) || [])[1] || c).replace(/（[^）]*[A-Za-z][^）]*）\s*$/, '').trim();
  legacy[c] = { file: f, en: (enTitle || name.replace(/_/g, ' ')).trim(), zh, requested: name };
  legacyAlias[name] = c;
}
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (c) => c.replace(/[\/\\:*?"<>|%#]/g, '_');
const fileOf = (c) => path.join(HTML_DIR, c.replace(/[\/\\:*?"<>|]/g, '_') + '.html');
const urlFromRoot = (c) => (c === MAIN ? 'index.html' : 'wiki/' + encodeURIComponent(slug(c)) + '.html');
const canon = (t) => { const s = t.replace(/ /g, '_'); return s.charAt(0).toUpperCase() + s.slice(1); };

function zhTitle(c) {
  if (legacy[c]) return legacy[c].zh;
  const info = pages[c];
  const en = info.displayTitle || info.title || c.replace(/_/g, ' ');
  const tr = tm[keyOf(escapeText(en))];
  return tr ? tr.replace(/<[^>]+>/g, '') : en;
}

function known(t) {
  if (pages[t] || legacy[t]) return { c: t };
  if (meta.aliases[t] && pages[meta.aliases[t]]) return { c: meta.aliases[t] };
  if (legacyAlias[t]) return { c: legacyAlias[t] };
  if (redirects[t]) {
    const [target, frag] = redirects[t].split('#');
    const c = canon(target);
    if (pages[c] || legacy[c]) return { c, frag };
  }
  return null;
}

// Earlier translations flattened tables into "| cell" lines; rebuild them as HTML tables.
function legacyTable(text) {
  const split = (b) => b.replace(/\|\s*$/, '').split(/(?:^|\n)\|[ \t]?|[ \t]\|[ \t]/).slice(1).map((c) => c.trim());
  const bold = (c) => /^\*\*[^*]+\*\*$/.test(c);
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map(split);
  let head = [];
  let rows = [];
  if (blocks.length === 1) {
    const cells = blocks[0];
    let h = 0;
    while (h < cells.length && bold(cells[h])) h++;
    head = cells.slice(0, h);
    const rest = cells.slice(h);
    for (let i = 0; i < rest.length; i += h || rest.length) rows.push(rest.slice(i, i + (h || rest.length)));
  } else {
    if (blocks[0].length && blocks[0].every((c) => !c || bold(c))) head = blocks.shift();
    rows = blocks;
  }
  const cell = (c, tag) => `<${tag}>${marked.parseInline(c.replace(/^\*\*([^*]+)\*\*$/, '$1')).replace(/\n/g, '<br>')}</${tag}>`;
  return `<div class="table-wrap"><table class="wikitable">${head.length ? '<tr>' + head.map((c) => cell(c, 'th')).join('') + '</tr>' : ''}${rows.map((r) => '<tr>' + r.map((c) => cell(c, 'td')).join('') + '</tr>').join('')}</table></div>`;
}

function legacyHtml(md) {
  const lines = md.split('\n').filter((l, i) => !(i < 6 && (/^# /.test(l) || /^> (原文来源|授权协议)/.test(l))));
  const out = [];
  for (let i = 0; i < lines.length;) {
    if (!lines[i].startsWith('|')) { out.push(lines[i++]); continue; }
    const region = [];
    while (i < lines.length && !/^#{1,6} /.test(lines[i])) {
      if (!lines[i].trim()) {
        let k = i + 1;
        while (k < lines.length && !lines[k].trim()) k++;
        if (k < lines.length && lines[k].startsWith('|')) { region.push(''); i = k; continue; }
        break;
      }
      region.push(lines[i++]);
    }
    out.push('', legacyTable(region.join('\n')), '');
  }
  return marked.parse(out.join('\n')
    .replace(/\[\](?!\()/g, '<span class="img-ph" style="width:16px;height:16px"></span>')
    .replace(/\[Yes\]/g, '✓').replace(/\[No\]/g, '✗'));
}

function resolveTitle(title, isRedirect) {
  const t = canon(title);
  const hit = known(t);
  if (hit || !isRedirect) return hit;
  for (const v of [t + 's', t + 'es', t.replace(/s$/, ''), t.replace(/es$/, ''), t.replace(/y$/, 'ies'), t.replace(/ies$/, 'y')]) {
    if (v !== t && known(v)) return known(v);
  }
  return null;
}

function setOrig($, a, url, label) {
  $(a).attr('href', url).addClass('orig-link').attr('target', '_blank').attr('rel', 'noopener');
  $(a).attr('title', '英文原站：' + label);
}

function rewriteLinks($, prefix) {
  $('a[href]').each((_, a) => {
    const href = a.attribs.href;
    if (href.startsWith('#')) return;
    if (/^(https?:)?\/\//.test(href)) { $(a).attr('target', '_blank').attr('rel', 'nofollow noopener'); return; }
    if (href.startsWith('/index.php')) {
      if (/[?&]redlink=1/.test(href)) { $(a).replaceWith(`<span class="new">${$(a).html()}</span>`); return; }
      setOrig($, a, BASE + href, a.attribs.title || '');
      return;
    }
    if (!href.startsWith('/')) return;
    const cut = href.indexOf('#');
    const p = cut >= 0 ? href.slice(1, cut) : href.slice(1);
    const frag = cut >= 0 ? href.slice(cut + 1) : '';
    let title = p;
    try { title = decodeURIComponent(p); } catch { /* keep raw */ }
    if (!NS_RE.test(title)) {
      const res = resolveTitle(title, /\bmw-redirect\b/.test(a.attribs.class || ''));
      if (res) {
        const f = frag || res.frag;
        $(a).attr('href', prefix + urlFromRoot(res.c) + (f ? '#' + f : '')).removeClass('mw-redirect').attr('title', zhTitle(res.c));
        return;
      }
    }
    setOrig($, a, BASE + href, a.attribs.title || title.replace(/_/g, ' '));
  });
}

function replaceImages($) {
  $('img').each((_, img) => {
    const w = parseInt(img.attribs.width, 10) || 24;
    const h = parseInt(img.attribs.height, 10) || 24;
    const alt = img.attribs.alt || '';
    const big = w >= 80 && h >= 50;
    $(img).replaceWith(`<span class="img-ph${big ? ' big' : ''}" role="img" aria-label="${escAttr(alt || '图片')}" title="${escAttr(alt || '图片')}" style="width:${w}px;height:${h}px">${big ? '原站图片' : ''}</span>`);
  });
}

const NAMED = {
  white: '#ffffff', black: '#000000', silver: '#c0c0c0', gray: '#808080', grey: '#808080', lightgray: '#d3d3d3', lightgrey: '#d3d3d3',
  gainsboro: '#dcdcdc', whitesmoke: '#f5f5f5', ivory: '#fffff0', beige: '#f5f5dc', linen: '#faf0e6', lightyellow: '#ffffe0',
  lightgreen: '#90ee90', lightblue: '#add8e6', lightpink: '#ffb6c1', pink: '#ffc0cb', yellow: '#ffff00', gold: '#ffd700',
  orange: '#ffa500', lavender: '#e6e6fa', aliceblue: '#f0f8ff', honeydew: '#f0fff0', azure: '#f0ffff', cornsilk: '#fff8dc',
  wheat: '#f5deb3', khaki: '#f0e68c', palegreen: '#98fb98', lightcyan: '#e0ffff', mistyrose: '#ffe4e1', lemonchiffon: '#fffacd',
  antiquewhite: '#faebd7', bisque: '#ffe4c4', thistle: '#d8bfd8', powderblue: '#b0e0e6', darkgray: '#a9a9a9', darkgrey: '#a9a9a9',
  navy: '#000080', maroon: '#800000', darkred: '#8b0000', darkgreen: '#006400', darkblue: '#00008b', green: '#008000',
  blue: '#0000ff', red: '#ff0000', purple: '#800080', brown: '#a52a2a', dimgray: '#696969', dimgrey: '#696969',
};
function parseColor(v) {
  const s = v.trim().toLowerCase();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3})$/))) return m[1].split('').map((h) => parseInt(h + h, 16));
  if ((m = s.match(/^#([0-9a-f]{6})$/))) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  if ((m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/))) return [m[1], m[2], m[3]].map(Number);
  return NAMED[s] ? parseColor(NAMED[s]) : null;
}
const luma = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const mix = (a, b, t) => '#' + a.map((x, i) => Math.round(x * t + b[i] * (1 - t)).toString(16).padStart(2, '0')).join('');
const COLOR = '(#[0-9a-fA-F]{3,6}\\b|rgba?\\([^)]*\\)|[a-zA-Z]+)';

// Gives inline light backgrounds, dark text colours and light borders a dark-theme variant.
function themeStyles($) {
  $('.mw-parser-output [style]').each((_, el) => {
    const style = el.attribs.style;
    const extra = [];
    const bg = style.match(new RegExp('background(?:-color)?\\s*:\\s*' + COLOR, 'i'));
    const bgc = bg && parseColor(bg[1]);
    if (bgc && luma(bgc) > 0.55) extra.push(`--dbg:${mix(bgc, [29, 25, 21], 0.2)}`);
    const fg = style.match(new RegExp('(?:^|;)\\s*color\\s*:\\s*' + COLOR, 'i'));
    const fgc = fg && parseColor(fg[1]);
    if (fgc && luma(fgc) < 0.45) extra.push(`--dfg:${mix(fgc, [233, 225, 211], 0.2)}`);
    const bd = style.match(/border[a-z-]*\s*:[^;]*?(#[0-9a-fA-F]{3,6}\b)/i);
    const bdc = bd && parseColor(bd[1]);
    if (bdc && luma(bdc) > 0.55) extra.push(`--dbd:${mix(bdc, [58, 49, 41], 0.15)}`);
    if (extra.length) el.attribs.style = style.replace(/;?\s*$/, ';') + extra.join(';');
  });
}

function rebuildToc($) {
  const ids = new Map();
  $('[id]').each((_, e) => { if (!ids.has(e.attribs.id)) ids.set(e.attribs.id, e); });
  $('#toc .toctitle h2').text('目录');
  $('#toc li').each((_, li) => {
    const a = $(li).children('a').first();
    let id = (a.attr('href') || '').slice(1);
    try { id = decodeURIComponent(id); } catch { /* keep raw */ }
    const target = ids.get(id);
    if (!target) { $(li).remove(); return; }
    a.find('.toctext').text($(target).text().trim());
  });
}

function translateBody(c) {
  const $ = loadFragment(fs.readFileSync(fileOf(c), 'utf8'));
  preprocess($, { isMainPage: c === MAIN, exclude: exclusions[c] });
  let total = 0;
  let done = 0;
  for (const run of collectRuns($.root()[0])) {
    const { key, src, map, lead, trail } = encodeRun($, run);
    total++;
    const tr = tm[key];
    if (tr == null || checkTranslation(src, tr)) continue;
    done++;
    // cheerio's .before() ignores text nodes, so insert at the DOM level.
    for (const node of $.parseHTML(lead + decode(tr, map) + trail) || []) DomUtils.prepend(run[0], node);
    for (const n of run) DomUtils.removeElement(n);
  }
  rebuildToc($);
  $('table.wikitable, table.mildtable').each((_, t) => {
    if (!/float/.test(t.attribs.style || '') && !$(t).parent().hasClass('table-wrap')) $(t).wrap('<div class="table-wrap"></div>');
  });
  return { $, total, done };
}

const SIDEBAR = [
  ['入门', ['Crusader_Kings_III', "Beginner's_guide", 'Mechanics', 'Jargon']],
  ['角色', ['Characters', 'Attributes', 'Traits', 'Resources', 'Modifiers', 'Lifestyle', 'Dynasty', 'Schemes', 'Hooks', 'Activity', 'Artifacts', 'Travel', 'Adventurer', 'Prisoners']],
  ['国度与治理', ['Council', 'Court', 'Power_sharing', 'Subjects', 'Government', 'Laws', 'Decisions', 'Titles', 'Barony', 'County', 'Building', 'Royal_court', 'Domicile', 'Great_projects']],
  ['战争', ['Warfare', 'Casus_belli', 'Alliance', 'Army', 'Hired_forces', 'Knight', 'Duel', 'Situation']],
  ['文化与信仰', ['Culture', 'Traditions', 'Innovation', 'Religion', 'Doctrines', 'Tenets', 'Holy_sites']],
  ['其他', ['Modding', 'Console_commands', 'Game_rules', 'Patches', 'Downloadable_content', 'Achievements', 'Interesting_characters']],
];

// Chinese names for core pages that have no local version and therefore link to the original wiki.
const MISSING_ZH = { Doctrines: '教义', Traditions: '传统', Innovation: '革新', Power_sharing: '权力分享', Royal_court: '王廷' };

function sidebar(prefix, current) {
  const top = [['index.html', MAIN, '首页'], ['all.html', 'all', '全部页面'], ['about.html', 'about', '关于本站']];
  let html = '<ul>' + top.map(([u, id, label]) => `<li><a href="${prefix}${u}"${current === id ? ' class="current"' : ''}>${label}</a></li>`).join('') + '</ul>';
  for (const [group, names] of SIDEBAR) {
    html += `<h3>${group}</h3><ul>` + names.map((n) => {
      const r = known(canon(n));
      if (!r) return `<li><a class="orig-link" href="${BASE}/${encodeURI(n)}" target="_blank" rel="noopener" title="尚未收录，打开英文原站">${escHtml(MISSING_ZH[n] || n.replace(/_/g, ' '))}</a></li>`;
      return `<li><a href="${prefix}${urlFromRoot(r.c)}"${r.c === current ? ' class="current"' : ''}>${escHtml(zhTitle(r.c))}</a></li>`;
    }).join('') + '</ul>';
  }
  return html;
}

function allPagesPage(results) {
  const faithful = results.filter((r) => !r.legacy).sort((a, b) => a.en.localeCompare(b.en));
  const old = results.filter((r) => r.legacy).sort((a, b) => a.en.localeCompare(b.en));
  const missing = [...new Set(SIDEBAR.flatMap(([, names]) => names))].filter((n) => !known(canon(n)));
  const row = (r, extra) => `<tr><td><a href="${urlFromRoot(r.c)}">${escHtml(r.zh)}</a></td><td>${escHtml(r.en)}</td>${extra}</tr>`;
  const pct = (r) => (r.total ? Math.round((r.done / r.total) * 100) + '%' : '—');
  const body = `<h1 class="page-title">全部页面</h1>
<div class="mw-parser-output">
<p>本站共收录 ${results.length} 个页面：${faithful.length} 个按原站页面结构完整翻译（保留表格、信息框与导航框），${old.length} 个为早期文本版译文。下方还列出了暂未收录、只能链接到英文原站的核心页面。</p>
<h2>按原站结构翻译的页面</h2>
<div class="table-wrap"><table class="wikitable sortable"><tr><th>中文标题</th><th>英文原名</th><th>翻译进度</th></tr>${faithful.map((r) => row(r, `<td>${pct(r)}</td>`)).join('')}</table></div>
<h2>早期文本版译文</h2>
<p>以下页面暂时无法从原站获取完整页面结构，先使用早期提取文字后翻译的版本。</p>
<div class="table-wrap"><table class="wikitable sortable"><tr><th>中文标题</th><th>英文原名</th></tr>${old.map((r) => row(r, '')).join('')}</table></div>
${missing.length ? `<h2>暂未收录（链接到英文原站）</h2><ul>${missing.map((n) => `<li><a class="orig-link" href="${BASE}/${encodeURI(n)}" target="_blank" rel="noopener">${escHtml(MISSING_ZH[n] || n)}（${escHtml(n.replace(/_/g, ' '))}）</a></li>`).join('')}</ul>` : ''}
</div>`;
  fs.writeFileSync(path.join(OUT, 'all.html'), shell({ prefix: '', title: `全部页面 - ${SITE}`, current: 'all', body }));
}

function shell({ prefix, title, current, body, description }) {
  return `<!DOCTYPE html>
<html lang="zh-CN" data-root="${prefix}" data-theme="dark">
<head>
<meta charset="utf-8">
<script>try{var t=localStorage.getItem('ck3zh-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escHtml(title)}</title>
<meta name="description" content="${escAttr(description || '《十字军之王III》社区维基的非官方简体中文翻译')}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2385221b'/%3E%3Cpath d='M7 22l-1-11 6 5 4-8 4 8 6-5-1 11z' fill='%23f3d27a'/%3E%3Crect x='7' y='23.5' width='18' height='3' rx='1' fill='%23f3d27a'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${prefix}assets/style.css">
<script src="${prefix}assets/site.js" defer></script>
</head>
<body>
<header class="site-header">
<button class="menu-toggle" aria-label="菜单">☰</button>
<a class="brand" href="${prefix}index.html">十字军之王III <span class="full">中文维基</span><span class="badge">非官方翻译</span></a>
<div class="search"><input id="search" type="search" placeholder="搜索页面（中文或英文）" autocomplete="off" aria-label="搜索"><div id="search-results"></div></div>
<button class="theme-toggle" type="button" aria-label="切换浅色/深色模式"><span class="tt-icon">◐</span> <span class="tt-label">浅色模式</span></button>
</header>
<div class="layout">
<nav class="sidebar" aria-label="导航">${sidebar(prefix, current)}</nav>
<main class="content">
${body}
</main>
</div>
</body>
</html>
`;
}

function footer(c, info) {
  const orig = `${BASE}/${encodeURI(c)}`;
  return `<footer class="page-footer">
<p>本页译自 Paradox Wikis 社区《Crusader Kings III Wiki》的条目「<a href="${escAttr(orig)}" target="_blank" rel="noopener">${escHtml(info.displayTitle || c)}</a>」${info.revid ? `（修订版本 ${info.revid}）` : ''}。原文采用 <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans" target="_blank" rel="noopener">CC BY-SA 3.0</a> 协议授权；本译文对原文作了翻译修改，同样以 CC BY-SA 3.0 协议发布。</p>
<p>译文由 AI 辅助翻译生成，可能存在错误或疏漏，请以英文原文为准。游戏图片版权归 Paradox Interactive 所有，本站不转载，以占位框标示，可前往原站查看。</p>
<p>游戏内容及素材的商标与版权归 Paradox Interactive 及其许可方所有。本站为爱好者非官方翻译项目，与 Paradox Interactive 无关。 · <a href="${'{PREFIX}'}about.html">关于本站</a> · <a href="${REPO}" target="_blank" rel="noopener">GitHub</a></p>
</footer>`;
}

function buildPage(c) {
  const info = pages[c];
  const isMain = c === MAIN;
  const prefix = isMain ? '' : '../';
  const { $, total, done } = translateBody(c);
  rewriteLinks($, prefix);
  replaceImages($);
  themeStyles($);
  const en = info.displayTitle || c.replace(/_/g, ' ');
  const zh = zhTitle(c);
  const orig = `${BASE}/${encodeURI(c)}`;
  const partial = total && done < total ? ` · 已翻译 ${Math.round((done / total) * 100)}%，其余部分暂为英文原文` : '';
  let head;
  if (isMain) {
    head = `<div class="home-banner"><h1>十字军之王III 中文维基</h1><p>《十字军之王III》（Crusader Kings III）社区维基的非官方简体中文翻译。</p><p>原文来自 <a href="${BASE}/${MAIN}" target="_blank" rel="noopener">Paradox Wikis 社区</a>，采用 CC BY-SA 3.0 协议；译文由 AI 辅助翻译，以英文原文为准。${partial}</p></div>`;
  } else {
    head = `<div class="page-notice">译自英文维基：<a href="${escAttr(orig)}" target="_blank" rel="noopener">${escHtml(en)}</a>${partial}</div>
<h1 class="page-title">${escHtml(zh)}</h1>
${zh !== en ? `<div class="page-sub">英文原名：${escHtml(en)}</div>` : ''}`;
  }
  const body = head + '\n' + $.html() + '\n' + footer(c, info).replace('{PREFIX}', prefix);
  const html = shell({ prefix, title: isMain ? `${SITE}（非官方翻译）` : `${zh} - ${SITE}`, current: c, body, description: isMain ? undefined : `${zh}（${en}）- 《十字军之王III》维基中文翻译` });
  const out = path.join(OUT, urlFromRoot(c).split('/').map(decodeURIComponent).join(path.sep));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return { c, zh, en, total, done };
}

function buildLegacyPage(c) {
  const info = legacy[c];
  const prefix = '../';
  const md = fs.readFileSync(path.join(LEGACY_DIR, info.file), 'utf8');
  const $ = loadFragment(`<div class="mw-parser-output legacy">${legacyHtml(md)}</div>`);
  $('a[href]').each((_, a) => {
    const href = a.attribs.href;
    if (href.startsWith(BASE + '/') && !/^\/(index\.php|images\/)/.test(href.slice(BASE.length))) a.attribs.href = href.slice(BASE.length);
    if (!$(a).text().trim() && !$(a).find('.img-ph').length && /\/File:/.test(a.attribs.href)) $(a).replaceWith('<span class="img-ph" style="width:20px;height:20px"></span>');
  });
  rewriteLinks($, prefix);
  const orig = `${BASE}/${encodeURI(info.requested)}`;
  const head = `<div class="page-notice legacy-notice">本页为早期文本版译文：由原站页面文字提取后翻译，未完整保留原站的表格与版式，以英文原文为准：<a href="${escAttr(orig)}" target="_blank" rel="noopener">${escHtml(info.en)}</a></div>
<h1 class="page-title">${escHtml(info.zh)}</h1>
<div class="page-sub">英文原名：${escHtml(info.en)}</div>`;
  const body = head + '\n' + $.html() + '\n' + footer(info.requested, { displayTitle: info.en }).replace('{PREFIX}', prefix);
  const out = path.join(OUT, 'wiki', slug(c) + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, shell({ prefix, title: `${info.zh} - ${SITE}`, current: c, body, description: `${info.zh}（${info.en}）- 《十字军之王III》维基中文翻译` }));
  return { c, zh: info.zh, en: info.en, total: 0, done: 0, legacy: true };
}

function aboutPage() {
  const body = `<h1 class="page-title">关于本站</h1>
<div class="mw-parser-output">
<p>本站是《十字军之王III》（Crusader Kings III）社区维基 <a href="${BASE}/${MAIN}" target="_blank" rel="noopener">ck3.paradoxwikis.com</a> 的<b>非官方</b>简体中文翻译，尽量保留原站的页面结构、表格、信息框与导航框，以便中文玩家查阅游戏机制。</p>
<h2>授权与署名</h2>
<ul>
<li>原文由 Paradox Wikis 社区编写，采用 <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans" target="_blank" rel="noopener">知识共享 署名-相同方式共享 3.0（CC BY-SA 3.0）</a> 协议授权。</li>
<li>本站译文是对原文的翻译修改，同样以 CC BY-SA 3.0 协议发布。每个页面底部都注明了原文链接与修订版本号。</li>
<li>游戏图片、图标与标志的版权归 Paradox Interactive 所有，不在上述协议范围内，因此本站<b>不转载图片</b>，以同尺寸的占位框标示，可点击前往原站查看。</li>
<li>原站中整段转载的官方文本（例如完整的官方补丁说明）不属于社区授权内容，本站不予翻译，改为提供原文链接。</li>
<li>游戏内容及素材的商标与版权归 Paradox Interactive 及其许可方所有。本站与 Paradox Interactive 无关。</li>
</ul>
<h2>翻译说明</h2>
<ul>
<li>译文由 AI 辅助翻译生成，并使用统一的术语表保证一致性，但仍可能存在错误或疏漏，请以英文原文为准。</li>
<li>指向尚未翻译页面的链接会带有 <a class="orig-link" href="${BASE}/${MAIN}" target="_blank" rel="noopener">↗ 标记</a>，点击将打开英文原站。</li>
<li>欢迎在 <a href="${REPO}" target="_blank" rel="noopener">GitHub 仓库</a> 提交问题或改进译文。</li>
</ul>
</div>`;
  fs.writeFileSync(path.join(OUT, 'about.html'), shell({ prefix: '', title: `关于本站 - ${SITE}`, current: 'about', body }));
}

function notFoundPage() {
  const body = `<h1 class="page-title">页面不存在</h1><div class="mw-parser-output"><p>你要找的页面不存在或尚未翻译。可以使用上方的搜索框，或返回<a href="/Translation_CK3/index.html">首页</a>。</p></div>`;
  const html = shell({ prefix: '/Translation_CK3/', title: `页面不存在 - ${SITE}`, current: '', body });
  fs.writeFileSync(path.join(OUT, '404.html'), html);
}

function main() {
  require('./sanitize_sources').sanitizeSources();
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  fs.copyFileSync(path.join(SRC, 'style.css'), path.join(OUT, 'assets', 'style.css'));
  fs.copyFileSync(path.join(SRC, 'site.js'), path.join(OUT, 'assets', 'site.js'));
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  const results = Object.keys(pages).map(buildPage).concat(Object.keys(legacy).map(buildLegacyPage));
  aboutPage();
  allPagesPage(results);
  notFoundPage();
  const index = results.map((r) => ({ z: r.zh, e: r.en, u: urlFromRoot(r.c) }));
  fs.writeFileSync(path.join(OUT, 'search-index.js'), 'window.CK3_SEARCH_INDEX=' + JSON.stringify(index) + ';\n');
  let T = 0;
  let D = 0;
  for (const r of results) { T += r.total; D += r.done; if (r.done < r.total) console.log(`  ${r.c}: ${r.done}/${r.total} segments translated`); }
  const nLegacy = results.filter((r) => r.legacy).length;
  console.log(`built ${results.length} pages into docs/ (${results.length - nLegacy} faithful, ${nLegacy} legacy text) — ${D}/${T} faithful segments translated (${T ? Math.round((D / T) * 100) : 0}%)`);
}

main();
