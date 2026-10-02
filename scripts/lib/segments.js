// Shared HTML segmentation: turns article HTML into translatable segments with
// inline-tag placeholders, and restores translated segments back into the DOM.
const cheerio = require('cheerio');
const crypto = require('crypto');

const INLINE = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'big', 'cite', 'del', 'dfn', 'em', 'font', 'i', 'ins', 'mark',
  'q', 's', 'small', 'span', 'strike', 'strong', 'sub', 'sup', 'time', 'tt', 'u',
  'img', 'br', 'wbr', 'code', 'kbd', 'samp', 'var',
]);
const OPAQUE = new Set(['img', 'br', 'wbr', 'code', 'kbd', 'samp', 'var', 'math', 'svg', 'input', 'button', 'iframe', 'video', 'audio', 'canvas', 'object', 'embed']);
const SKIP_BLOCK = new Set(['script', 'style', 'noscript', 'pre', 'textarea', 'template', 'math', 'svg', 'iframe', 'video', 'audio', 'canvas', 'object']);
const SHORT = { a: 'a', b: 'b', strong: 'b', i: 'i', em: 'i', span: 's', img: 'img', br: 'br', sup: 'sup', sub: 'sub', small: 'sm', code: 'c', abbr: 'ab', u: 'u' };
const TOKEN_RE = /<(\/?)([a-z]+\d+)(\/?)>/g;

const hasLetters = (s) => /[A-Za-z]{2,}/.test(s);
const keyOf = (src) => crypto.createHash('sha1').update(src).digest('hex').slice(0, 16);
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const noTranslate = (el) => el.attribs && ('data-nt' in el.attribs || /\b(toc|mw-editsection|reference)\b/.test(el.attribs.class || '') || el.attribs.id === 'toc');

function textOf(node) {
  if (node.type === 'text') return node.data;
  return (node.children || []).map(textOf).join('');
}

function containsBlock(node) {
  return (node.children || []).some((c) => c.type === 'tag' && (!INLINE.has(c.name) || containsBlock(c)));
}

function isInline(node) {
  if (node.type === 'text') return true;
  if (node.type !== 'tag' || !INLINE.has(node.name)) return false;
  return OPAQUE.has(node.name) || !containsBlock(node);
}

function openTag(el) {
  const attrs = Object.entries(el.attribs || {}).map(([k, v]) => (v === '' ? ` ${k}` : ` ${k}="${escapeAttr(v)}"`)).join('');
  return `<${el.name}${attrs}>`;
}

// Collect runs of sibling inline nodes that contain translatable text.
function collectRuns(root) {
  const runs = [];
  const walk = (el) => {
    let run = [];
    const flush = () => {
      if (run.length && hasLetters(run.map((n) => (n.type === 'tag' && OPAQUE.has(n.name) ? '' : textOf(n))).join(''))) runs.push(run);
      run = [];
    };
    for (const k of el.children || []) {
      if (k.type === 'comment' || k.type === 'directive') continue;
      if (isInline(k)) { run.push(k); continue; }
      flush();
      if (k.type === 'tag' && !SKIP_BLOCK.has(k.name) && !noTranslate(k)) walk(k);
    }
    flush();
  };
  walk(root);
  return runs;
}

// Encode a run into a placeholder string plus the token map needed to restore it.
function encodeRun($, run) {
  let n = 0;
  const map = {};
  const enc = (nodes) => {
    let s = '';
    for (const nd of nodes) {
      if (nd.type === 'text') { s += escapeText(nd.data.replace(/\s+/g, ' ')); continue; }
      if (nd.type !== 'tag') continue;
      n++;
      const tag = (SHORT[nd.name] || 'x') + n;
      if (OPAQUE.has(nd.name) || noTranslate(nd) || !hasLetters(textOf(nd))) {
        map[tag] = { html: $.html(nd) };
        s += `<${tag}/>`;
      } else {
        map[tag] = { open: openTag(nd), close: `</${nd.name}>` };
        s += `<${tag}>` + enc(nd.children || []) + `</${tag}>`;
      }
    }
    return s;
  };
  const raw = enc(run);
  const src = raw.replace(/ {2,}/g, ' ').trim();
  return { src, key: keyOf(src), map, lead: /^\s/.test(raw) ? ' ' : '', trail: /\s$/.test(raw) ? ' ' : '' };
}

function tokensOf(s) {
  return Array.from(s.matchAll(TOKEN_RE)).map((m) => `<${m[1]}${m[2]}${m[3]}>`);
}

// Validate that a translation keeps exactly the source's placeholders, properly nested.
function checkTranslation(src, tr) {
  if (typeof tr !== 'string' || !tr.trim()) return 'empty translation';
  const a = tokensOf(src).sort().join('');
  const b = tokensOf(tr).sort().join('');
  if (a !== b) return `placeholder mismatch: source ${tokensOf(src).join('')} vs translation ${tokensOf(tr).join('')}`;
  const stack = [];
  for (const m of tr.matchAll(TOKEN_RE)) {
    if (m[3]) continue;
    if (!m[1]) stack.push(m[2]);
    else if (stack.pop() !== m[2]) return `bad nesting at </${m[2]}>`;
  }
  if (stack.length) return 'unclosed placeholder';
  return null;
}

const sanitize = (s) => s.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d{1,7}|#x[0-9a-fA-F]{1,6});)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function decode(tr, map) {
  let out = '';
  let last = 0;
  for (const m of tr.matchAll(TOKEN_RE)) {
    out += sanitize(tr.slice(last, m.index));
    last = m.index + m[0].length;
    const info = map[m[2]];
    out += m[3] ? info.html : m[1] ? info.close : info.open;
  }
  return out + sanitize(tr.slice(last));
}

// Normalisation applied identically before extraction and before building.
// Replaces excluded parts (e.g. verbatim official texts that are not under the wiki's
// CC BY-SA licence) with a note. Rules: { selector, note } or { section: headlineId, note }.
function applyExclusions($, rules = []) {
  const note = (text) => `<div class="excluded-note" data-nt="">${text}</div>`;
  for (const rule of rules) {
    if (rule.selector) {
      $(rule.selector).each((i, el) => (i === 0 ? $(el).replaceWith(note(rule.note)) : $(el).remove()));
      continue;
    }
    const heading = $(`.mw-headline[id="${rule.section}"]`).first().closest('h1,h2,h3,h4,h5,h6');
    if (!heading.length) continue;
    const level = Number(heading[0].name[1]);
    let next = heading[0].nextSibling;
    while (next) {
      const after = next.nextSibling;
      if (next.type === 'tag' && /^h[1-6]$/.test(next.name) && Number(next.name[1]) <= level) break;
      $(next).remove();
      next = after;
    }
    heading.after(note(rule.note));
  }
}

function preprocess($, { isMainPage = false, exclude = [] } = {}) {
  $('.mw-editsection').remove();
  if (isMainPage) $('.grid-container > .header').remove();
  applyExclusions($, exclude);
  // Long italic/quoted passages on this wiki are verbatim in-game narrative text written
  // by the publisher; they are not reproduced.
  $('i, em, blockquote, .quote, .cquote').each((_, el) => {
    if ($(el).parents('i, em, blockquote, .quote, .cquote').length) return;
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    const hasGameVariable = /\[[A-Za-z][A-Za-z ]*(name|NAME)\]|\[(ROOT|GetName|protagonist)/.test(text);
    if (text.length > 60 || (hasGameVariable && text.length >= 20)) {
      $(el).replaceWith('<span class="flavor-omitted" data-nt="" title="此处原文为游戏内叙事文本，版权归 Paradox Interactive 所有，本站不转载">〔游戏内叙事文本，未转载〕</span>');
    }
  });
  $('*').contents().filter((_, n) => n.type === 'comment').remove();
  // Embedded videos become a link titled with the video's name only; the rest of the
  // caption is the publisher's own video description and is not reproduced.
  $('figure.embedvideo').each((_, el) => {
    let src = '';
    try { src = JSON.parse($(el).attr('data-iframeconfig') || '{}').src || ''; } catch { /* ignore */ }
    const id = (src.match(/embed\/([\w-]+)/) || [])[1];
    const cap = $(el).find('figcaption').text().replace(/\s+/g, ' ').trim();
    const name = (cap.match(/^(.{4,120}?)[.!?](?:\s|$)/) || [null, cap.slice(0, 80)])[1] || 'YouTube';
    $(el).replaceWith(id ? `<p class="embedvideo-link">▶ <a class="external" href="https://www.youtube.com/watch?v=${id}">${escapeText(name)}</a></p>` : '');
  });
}

function loadFragment(html) {
  return cheerio.load(html, null, false);
}

module.exports = { loadFragment, preprocess, collectRuns, encodeRun, checkTranslation, decode, keyOf, escapeText, hasLetters };
