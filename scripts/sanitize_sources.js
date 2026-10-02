// Applies the same exclusions used for the site to the stored source HTML, so the
// repository only keeps wiki content covered by the CC BY-SA licence. Idempotent.
// Raw crawler output is kept (uncommitted) in work/raw/.
const fs = require('fs');
const path = require('path');
const { loadFragment, preprocess } = require('./lib/segments');

const ROOT = path.join(__dirname, '..');
const HTML_DIR = path.join(ROOT, 'source', 'html');
const RAW_DIR = path.join(ROOT, 'work', 'raw');
const EXCLUSIONS_FILE = path.join(ROOT, 'site-src', 'exclusions.json');
const MAIN = 'Crusader_Kings_III_Wiki';

function sanitizeSources() {
  const exclusions = fs.existsSync(EXCLUSIONS_FILE) ? JSON.parse(fs.readFileSync(EXCLUSIONS_FILE, 'utf8')) : {};
  const meta = JSON.parse(fs.readFileSync(path.join(HTML_DIR, 'pages.json'), 'utf8'));
  const byFile = {};
  for (const c of Object.keys(meta.pages)) byFile[c.replace(/[\/\\:*?"<>|]/g, '_') + '.html'] = c;
  fs.mkdirSync(RAW_DIR, { recursive: true });
  let changed = 0;
  for (const f of fs.readdirSync(HTML_DIR).filter((f) => f.endsWith('.html'))) {
    const file = path.join(HTML_DIR, f);
    const html = fs.readFileSync(file, 'utf8');
    const raw = path.join(RAW_DIR, f);
    if (!fs.existsSync(raw) || html.includes('NewPP limit report')) fs.writeFileSync(raw, html);
    const c = byFile[f];
    const $ = loadFragment(html);
    preprocess($, { isMainPage: c === MAIN, exclude: exclusions[c] || [] });
    const out = $.html();
    if (out !== html) { fs.writeFileSync(file, out); changed++; }
  }
  return changed;
}

module.exports = { sanitizeSources };
if (require.main === module) console.log(`sanitized ${sanitizeSources()} source file(s)`);
