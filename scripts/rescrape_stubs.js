const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const STUB_PAGES = [
  'Council', 'Court', 'Government', 'Culture', 'Traits',
  'Schemes', 'Hooks', 'Warfare', 'Alliance', 'Subjects',
  'County', 'Patches', 'Innovation', 'Doctrines', 'Attributes',
  'Adventurer', 'Royal_court', 'Power_sharing', 'Hired_forces',
  'Prisoners', 'Activity', 'Domicile', 'Situation', 'Mechanics',
  "Beginner%27s_guide", 'Achievements', 'Game_rules', 'Jargon'
];

const BASE_URL = 'https://ck3.paradoxwikis.com';
const OUT_DIR = path.join(__dirname, '..', 'source', 'en');

async function scrapePage(page, pageName) {
  const url = `${BASE_URL}/${pageName}`;
  console.log(`Scraping: ${pageName}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(8000);

    const hasContent = await page.evaluate(() => {
      const body = document.querySelector('#bodyContent') || document.querySelector('#mw-content-text');
      if (!body) return false;
      const text = body.textContent.trim();
      return text.length > 200 && !text.includes('Please check your connection');
    });

    if (!hasContent) {
      await page.waitForTimeout(10000);
    }

    const content = await page.evaluate(() => {
      const bodyContent = document.querySelector('#bodyContent') || document.querySelector('#mw-content-text') || document.body;
      const toRemove = bodyContent.querySelectorAll('.mw-editsection, .noprint, .navbox, .mw-jump-link, #toc, .toc');
      toRemove.forEach(el => el.remove());

      const elements = bodyContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, dt, dd, caption, blockquote, pre');
      let text = '';

      elements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        let line = el.textContent.trim();
        if (!line) return;

        if (tag.startsWith('h')) {
          const level = parseInt(tag[1]);
          text += '\n' + '#'.repeat(level) + ' ' + line + '\n\n';
        } else if (tag === 'li') {
          text += '- ' + line + '\n';
        } else if (tag === 'th') {
          text += '| **' + line + '** ';
        } else if (tag === 'td') {
          text += '| ' + line + ' ';
        } else if (tag === 'pre') {
          text += '```\n' + line + '\n```\n\n';
        } else {
          text += line + '\n\n';
        }
      });

      return text.replace(/\n{3,}/g, '\n\n').trim();
    });

    const title = await page.evaluate(() => {
      const h1 = document.querySelector('#firstHeading, .mw-page-title-main');
      return h1 ? h1.textContent.trim() : '';
    });

    return { title, content, success: true };
  } catch (e) {
    console.error(`  Error scraping ${pageName}: ${e.message}`);
    return { title: pageName, content: '', success: false };
  }
}

async function main() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    headless: true,
    args: ['--no-sandbox', '--ignore-certificate-errors']
  });

  const page = await browser.newPage();
  let improved = 0;

  for (const pageName of STUB_PAGES) {
    const result = await scrapePage(page, pageName);
    const filename = decodeURIComponent(pageName).replace(/['"]/g, '') + '.md';
    const filepath = path.join(OUT_DIR, filename);
    const existingSize = fs.existsSync(filepath) ? fs.statSync(filepath).size : 0;

    if (result.success && result.content.length > 100 && result.content.length > existingSize) {
      const header = `# ${result.title}\n\n> Source: ${BASE_URL}/${pageName}\n> License: CC BY-SA 3.0 (Paradox Wikis)\n\n`;
      fs.writeFileSync(filepath, header + result.content);
      console.log(`  IMPROVED: ${filename} (${existingSize} -> ${result.content.length + header.length} bytes)`);
      improved++;
    } else {
      console.log(`  No improvement: ${filename} (got ${result.content.length} chars, existing ${existingSize} bytes)`);
    }
    await page.waitForTimeout(2000);
  }

  console.log(`\nDone! Improved ${improved}/${STUB_PAGES.length} pages.`);
  await browser.close();
}

main().catch(console.error);
