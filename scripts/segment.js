// Extracts unique translatable segments from source/html and writes batches of
// untranslated segments to work/batches/ for the translation agents.
const fs = require('fs');
const path = require('path');
const { loadFragment, preprocess, collectRuns, encodeRun, keyOf, escapeText } = require('./lib/segments');

const ROOT = path.join(__dirname, '..');
const HTML_DIR = path.join(ROOT, 'source', 'html');
const TM_DIR = path.join(ROOT, 'translation', 'tm');
const BATCH_DIR = path.join(ROOT, 'work', 'batches');
const MAX_CHARS = 6000;
const MAX_SEGS = 150;

const fileOf = (pageName) => path.join(HTML_DIR, pageName.replace(/[\/\\:*?"<>|]/g, '_') + '.html');

function loadTM() {
  const tm = {};
  if (!fs.existsSync(TM_DIR)) return tm;
  for (const f of fs.readdirSync(TM_DIR).filter((f) => f.endsWith('.json'))) {
    Object.assign(tm, JSON.parse(fs.readFileSync(path.join(TM_DIR, f), 'utf8')));
  }
  return tm;
}

const EXCLUSIONS_FILE = path.join(ROOT, 'site-src', 'exclusions.json');
const exclusions = fs.existsSync(EXCLUSIONS_FILE) ? JSON.parse(fs.readFileSync(EXCLUSIONS_FILE, 'utf8')) : {};

function extractPage(pageName, info, mainPage) {
  const $ = loadFragment(fs.readFileSync(fileOf(pageName), 'utf8'));
  preprocess($, { isMainPage: pageName === mainPage, exclude: exclusions[pageName] });
  const segs = [];
  const title = escapeText(info.displayTitle || info.title);
  segs.push({ key: keyOf(title), src: title });
  for (const run of collectRuns($.root()[0])) {
    const { src, key } = encodeRun($, run);
    segs.push({ key, src });
  }
  return segs;
}

function main() {
  require('./sanitize_sources').sanitizeSources();
  const meta = JSON.parse(fs.readFileSync(path.join(HTML_DIR, 'pages.json'), 'utf8'));
  const tm = loadTM();
  const unique = new Map();
  let total = 0;
  const perPage = [];
  for (const [pageName, info] of Object.entries(meta.pages)) {
    const segs = extractPage(pageName, info, 'Crusader_Kings_III_Wiki');
    total += segs.length;
    let fresh = 0;
    for (const s of segs) {
      if (!unique.has(s.key)) { unique.set(s.key, { ...s, page: pageName }); fresh++; }
    }
    perPage.push(`${pageName}: ${segs.length} segments (${fresh} new)`);
  }
  const assigned = new Set();
  if (fs.existsSync(BATCH_DIR)) {
    for (const f of fs.readdirSync(BATCH_DIR).filter((f) => f.endsWith('.json'))) {
      for (const s of JSON.parse(fs.readFileSync(path.join(BATCH_DIR, f), 'utf8')).segments) assigned.add(s.k);
    }
  }
  const pending = [...unique.values()].filter((s) => !(s.key in tm) && !assigned.has(s.key));
  const chars = (arr) => arr.reduce((n, s) => n + s.src.length, 0);
  console.log(perPage.join('\n'));
  console.log(`\npages: ${Object.keys(meta.pages).length}, segments: ${total}, unique: ${unique.size} (${chars([...unique.values()])} chars)`);
  const done = [...unique.values()].filter((s) => s.key in tm).length;
  console.log(`translated: ${done}, assigned to existing batches: ${assigned.size}, unassigned: ${pending.length} (${chars(pending)} chars)`);

  if (!process.argv.includes('--write') || !pending.length) return;
  fs.mkdirSync(BATCH_DIR, { recursive: true });
  const runFile = path.join(ROOT, 'work', 'run.txt');
  const run = (fs.existsSync(runFile) ? parseInt(fs.readFileSync(runFile, 'utf8'), 10) : 0) + 1;
  fs.writeFileSync(runFile, String(run));
  const batches = [];
  let cur = null;
  for (const s of pending) {
    if (!cur || (cur.segments.length && (cur.chars + s.src.length > MAX_CHARS || cur.segments.length >= MAX_SEGS))) {
      cur = { id: `r${run}_b${String(batches.length + 1).padStart(3, '0')}`, pages: [], segments: [], chars: 0 };
      batches.push(cur);
    }
    cur.segments.push({ k: s.key, t: s.src });
    cur.chars += s.src.length;
    if (!cur.pages.includes(s.page)) cur.pages.push(s.page);
  }
  for (const b of batches) {
    fs.writeFileSync(path.join(BATCH_DIR, b.id + '.json'), JSON.stringify({ id: b.id, pages: b.pages, segments: b.segments }, null, 1));
  }
  console.log(`wrote ${batches.length} batches to work/batches (run ${run})`);
}

main();
