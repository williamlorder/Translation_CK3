// Builds the static Chinese wiki into docs/ from source/html + translation memory.
const fs = require('fs');
const path = require('path');
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
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (c) => c.replace(/[\/\\:*?"<>|%#]/g, '_');
const fileOf = (c) => path.join(HTML_DIR, c.replace(/[\/\\:*?"<>|]/g, '_') + '.html');
const urlFromRoot = (c) => (c === MAIN ? 'index.html' : 'wiki/' + encodeURIComponent(slug(c)) + '.html');
const canon = (t) => { const s = t.replace(/ /g, '_'); return s.charAt(0).toUpperCase() + s.slice(1); };

function zhTitle(c) {
  const info = pages[c];
  const en = info.displayTitle || info.title || c.replace(/_/g, ' ');
  const tr = tm[keyOf(escapeText(en))];
  return tr ? tr.replace(/<[^>]+>/g, '') : en;
}

function known(t) {
  if (pages[t]) return { c: t };
  if (meta.aliases[t] && pages[meta.aliases[t]]) return { c: meta.aliases[t] };
  if (redirects[t]) {
    const [target, frag] = redirects[t].split('#');
    const c = canon(target);
    if (pages[c]) return { c, frag };
  }
  return null;
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
    $(run[0]).before(lead + decode(tr, map) + trail);
    for (const n of run) $(n).remove();
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

function sidebar(prefix, current) {
  let html = `<ul><li><a href="${prefix}index.html"${current === MAIN ? ' class="current"' : ''}>首页</a></li><li><a href="${prefix}about.html"${current === 'about' ? ' class="current"' : ''}>关于本站</a></li></ul>`;
  for (const [group, names] of SIDEBAR) {
    const items = names.map((n) => known(canon(n))).filter(Boolean).map((r) => r.c);
    if (!items.length) continue;
    html += `<h3>${group}</h3><ul>` + items.map((c) => `<li><a href="${prefix}${urlFromRoot(c)}"${c === current ? ' class="current"' : ''}>${escHtml(zhTitle(c))}</a></li>`).join('') + '</ul>';
  }
  return html;
}

function shell({ prefix, title, current, body, description }) {
  return `<!DOCTYPE html>
<html lang="zh-CN" data-root="${prefix}">
<head>
<meta charset="utf-8">
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
<p>本页译自 Paradox Wikis 社区《Crusader Kings III Wiki》的条目「<a href="${escAttr(orig)}" target="_blank" rel="noopener">${escHtml(info.displayTitle || c)}</a>」（修订版本 ${info.revid}）。原文采用 <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans" target="_blank" rel="noopener">CC BY-SA 3.0</a> 协议授权；本译文对原文作了翻译修改，同样以 CC BY-SA 3.0 协议发布。</p>
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
  const results = Object.keys(pages).map(buildPage);
  aboutPage();
  notFoundPage();
  const index = results.map((r) => ({ z: r.zh, e: r.en, u: urlFromRoot(r.c) }));
  fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify(index));
  let T = 0;
  let D = 0;
  for (const r of results) { T += r.total; D += r.done; if (r.done < r.total) console.log(`  ${r.c}: ${r.done}/${r.total} segments translated`); }
  console.log(`built ${results.length} pages into docs/ — ${D}/${T} segments translated (${T ? Math.round((D / T) * 100) : 0}%)`);
}

main();
