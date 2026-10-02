// Polite crawler: fetches rendered article HTML (.mw-parser-output) from the CK3 wiki.
// One tab, images/fonts/media blocked, randomized delay between pages, limited retries.
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE = 'https://ck3.paradoxwikis.com';
const OUT_DIR = path.join(__dirname, '..', 'source', 'html');
const META_FILE = path.join(OUT_DIR, 'pages.json');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

const CORE_PAGES = [
  'Crusader_Kings_III_Wiki', 'Crusader_Kings_III', "Beginner's_guide", 'Mechanics', 'Characters',
  'Attributes', 'Traits', 'Resources', 'Lifestyle', 'Dynasty', 'Schemes', 'Hooks', 'Artifacts',
  'Modifiers', 'Council', 'Court', 'Government', 'Laws', 'Prisoners', 'Activity', 'Decisions',
  'Power_sharing', 'Royal_court', 'Adventurer', 'Titles', 'Subjects', 'Building', 'Domicile',
  'Great_projects', 'Situation', 'Barony', 'County', 'Travel', 'Warfare', 'Army', 'Knight',
  'Hired_forces', 'Casus_belli', 'Alliance', 'Duel', 'Religion', 'Doctrines', 'Tenets',
  'Holy_sites', 'Culture', 'Traditions', 'Innovation', 'Modding', 'Jargon', 'Achievements',
  'Console_commands', 'Game_rules', 'Downloadable_content', 'Patches', 'Interesting_characters',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isChallenge = (html) => /<title>Client Challenge<\/title>/.test(html);

function rlconf(html, key) {
  const m = html.match(new RegExp('"' + key + '":("(?:[^"\\\\]|\\\\.)*"|-?\\d+|true|false|null|\\[[^\\]]*\\])'));
  if (!m) return undefined;
  try { return JSON.parse(m[1]); } catch { return m[1]; }
}

function extract(html) {
  const $ = cheerio.load(html);
  const content = $('#mw-content-text > .mw-parser-output').first();
  if (!content.length) return null;
  return {
    contentHtml: $.html(content),
    displayTitle: $('#firstHeading').text().trim(),
    pageName: rlconf(html, 'wgPageName'),
    title: rlconf(html, 'wgTitle'),
    revid: rlconf(html, 'wgRevisionId'),
    redirectedFrom: rlconf(html, 'wgRedirectedFrom') || null,
    categories: rlconf(html, 'wgCategories') || [],
    lastmod: $('#footer-info-lastmod').text().trim(),
  };
}

async function fetchPage(page, docBodies, name, special = false) {
  const url = special ? BASE + '/' + name : BASE + '/' + encodeURI(name).replace(/\?/g, '%3F');
  for (let attempt = 1; attempt <= 2; attempt++) {
    docBodies.length = 0;
    let resp;
    try {
      resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {
      console.log(`  [${name}] goto error: ${e.message.split('\n')[0]}`);
    }
    let html = resp ? await resp.text().catch(() => '') : '';
    if (!html || isChallenge(html)) {
      const deadline = Date.now() + 25000;
      while (Date.now() < deadline) {
        const real = docBodies.find((b) => !isChallenge(b) && b.includes('mw-parser-output'));
        if (real) { html = real; break; }
        await sleep(1000);
      }
    }
    if (html && !isChallenge(html)) {
      if (special && html.includes('mw-body')) return { rawHtml: html };
      const data = extract(html);
      if (data) return data;
    }
    const wait = 60000 + Math.random() * 15000;
    console.log(`  [${name}] attempt ${attempt} failed; waiting ${Math.round(wait / 1000)}s`);
    await sleep(wait);
  }
  return null;
}

// Reads Special:ListRedirects (one page load per 5000 redirects) into source/html/redirects.json.
async function crawlRedirects(page, docBodies) {
  const map = {};
  for (let offset = 0; offset < 50000; offset += 5000) {
    const data = await fetchPage(page, docBodies, `Special:ListRedirects?limit=5000&offset=${offset}`, true);
    if (!data) { console.log('  redirect list fetch failed'); break; }
    const $ = cheerio.load(data.rawHtml);
    let n = 0;
    $('ol.special > li').each((_, li) => {
      const links = $(li).find('a');
      if (links.length < 2) return;
      const from = decodeURIComponent((links.first().attr('href') || '').replace(/^\//, '').split('?')[0]);
      const to = decodeURIComponent((links.last().attr('href') || '').replace(/^\//, ''));
      if (from && to) { map[from] = to; n++; }
    });
    console.log(`  offset ${offset}: ${n} redirects`);
    if (n < 5000) break;
    await sleep(5000);
  }
  fs.writeFileSync(path.join(OUT_DIR, 'redirects.json'), JSON.stringify(map, null, 1));
  console.log(`saved ${Object.keys(map).length} redirects`);
}

async function main() {
  const redirectsMode = process.argv.includes('--redirects');
  const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const targets = redirectsMode ? [] : only.length ? only : CORE_PAGES;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const meta = fs.existsSync(META_FILE) ? JSON.parse(fs.readFileSync(META_FILE, 'utf8')) : { pages: {}, aliases: {} };

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    headless: true,
    args: ['--no-sandbox', '--ignore-certificate-errors'],
  });
  const ctx = await browser.newContext({ userAgent: UA });
  await ctx.route('**/*', (route) => {
    const r = route.request();
    if (r.url().includes('/_fs-ch-')) return route.continue();
    return ['image', 'media', 'font'].includes(r.resourceType()) ? route.abort() : route.continue();
  });
  const page = await ctx.newPage();
  const docBodies = [];
  page.on('response', async (r) => {
    try {
      const type = r.request().resourceType();
      if (type === 'document' && r.url().startsWith(BASE)) docBodies.push(await r.text());
    } catch { /* body unavailable for redirects */ }
  });

  if (redirectsMode) await crawlRedirects(page, docBodies);
  let ok = 0;
  let streak = 0;
  const failed = [];
  for (const name of targets) {
    const done = Object.values(meta.pages).find((p) => p.requested && p.requested.includes(name));
    if (done && !only.length) { console.log(`skip ${name} (have ${done.pageName})`); continue; }
    console.log(`fetch ${name}`);
    const data = await fetchPage(page, docBodies, name);
    if (!data) {
      failed.push(name);
      if (++streak >= 3) { console.log('3 pages in a row were refused; stopping.'); break; }
      continue;
    }
    streak = 0;
    const canonical = data.pageName;
    fs.writeFileSync(path.join(OUT_DIR, canonical.replace(/[\/\\:*?"<>|]/g, '_') + '.html'), data.contentHtml);
    const prev = meta.pages[canonical] || {};
    meta.pages[canonical] = {
      pageName: canonical,
      title: data.title,
      displayTitle: data.displayTitle,
      revid: data.revid,
      categories: data.categories,
      lastmod: data.lastmod,
      requested: Array.from(new Set([...(prev.requested || []), name])),
      fetchedAt: new Date().toISOString(),
    };
    if (name !== canonical) meta.aliases[name] = canonical;
    if (data.redirectedFrom) meta.aliases[data.redirectedFrom] = canonical;
    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 1));
    ok++;
    console.log(`  ok -> ${canonical} rev ${data.revid} (${Math.round(data.contentHtml.length / 1024)} KB)`);
    await sleep(10000 + Math.random() * 5000);
  }
  await browser.close();
  console.log(`\nDone: ${ok} fetched, ${failed.length} failed${failed.length ? ': ' + failed.join(', ') : ''}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
