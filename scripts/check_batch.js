// Validates translation output for batches: node scripts/check_batch.js <batchId...> | --all
const fs = require('fs');
const path = require('path');
const { checkTranslation } = require('./lib/segments');

const ROOT = path.join(__dirname, '..');
const BATCH_DIR = path.join(ROOT, 'work', 'batches');
const TM_DIR = path.join(ROOT, 'translation', 'tm');

const args = process.argv.slice(2);
const ids = args.includes('--all')
  ? fs.readdirSync(BATCH_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')).sort()
  : args;
if (!ids.length) { console.log('usage: node scripts/check_batch.js <batchId...> | --all'); process.exit(2); }

let bad = 0;
for (const id of ids) {
  const batch = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, id + '.json'), 'utf8'));
  const outFile = path.join(TM_DIR, id + '.json');
  if (!fs.existsSync(outFile)) { console.log(`${id}: MISSING output file translation/tm/${id}.json`); bad++; continue; }
  let out;
  try { out = JSON.parse(fs.readFileSync(outFile, 'utf8')); } catch (e) { console.log(`${id}: INVALID JSON - ${e.message}`); bad++; continue; }
  const problems = [];
  const warnings = [];
  for (const s of batch.segments) {
    if (!(s.k in out)) { problems.push(`missing key ${s.k}`); continue; }
    const err = checkTranslation(s.t, out[s.k]);
    if (err) problems.push(`${s.k}: ${err}`);
    else if (out[s.k] === s.t && /[a-z]{3,}\s+[a-z]{3,}/i.test(s.t.replace(/<[^>]+>/g, ''))) warnings.push(`${s.k}: identical to source (fine only for names/brands): ${s.t.slice(0, 60)}`);
  }
  const extra = Object.keys(out).filter((k) => !batch.segments.some((s) => s.k === k));
  if (extra.length) problems.push(`unexpected keys: ${extra.join(', ')}`);
  if (problems.length) { bad++; console.log(`${id}: ${problems.length} problem(s)\n  ` + problems.slice(0, 30).join('\n  ')); }
  else console.log(`${id}: OK (${batch.segments.length} segments)`);
  if (warnings.length) console.log(`  warnings:\n  ` + warnings.slice(0, 15).join('\n  '));
}
process.exit(bad ? 1 : 0);
