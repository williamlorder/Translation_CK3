const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  'Crusader_Kings_III',
  "Beginner%27s_guide",
  'Mechanics',
  'Characters',
  'Attributes',
  'Traits',
  'Resources',
  'Lifestyle',
  'Dynasty',
  'Schemes',
  'Hooks',
  'Artifacts',
  'Modifiers',
  'Council',
  'Court',
  'Government',
  'Laws',
  'Prisoners',
  'Activity',
  'Decisions',
  'Power_sharing',
  'Royal_court',
  'Adventurer',
  'Titles',
  'Subjects',
  'Building',
  'Domicile',
  'Great_projects',
  'Situation',
  'Barony',
  'County',
  'Travel',
  'Warfare',
  'Army',
  'Knight',
  'Hired_forces',
  'Casus_belli',
  'Alliance',
  'Duel',
  'Religion',
  'Doctrines',
  'Tenets',
  'Holy_sites',
  'Culture',
  'Traditions',
  'Innovation',
  'Modding',
  'Jargon',
  'Achievements',
  'Console_commands',
  'Game_rules',
  'Downloadable_content',
  'Patches',
  'Interesting_characters',
];

const BASE_URL = 'https://ck3.paradoxwikis.com';
const OUT_DIR = path.join(__dirname, '..', 'source', 'en');

async function scrapePage(page, pageName) {
  const url = `${BASE_URL}/${pageName}`;
  console.log(`Scraping: ${pageName}...`);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(5000);

    const content = await page.evaluate(() => {
      const bodyContent = document.querySelector('#bodyContent') || document.querySelector('#mw-content-text') || document.body;

      // Remove navigation, edit links, etc.
      const toRemove = bodyContent.querySelectorAll('.mw-editsection, .noprint, .navbox, .mw-jump-link, #toc, .toc');
      toRemove.forEach(el => el.remove());

      // Get headings and content
      const elements = bodyContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, dt, dd, caption, blockquote, pre');
      let text = '';
      let lastTag = '';

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
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    headless: true,
    args: ['--no-sandbox', '--ignore-certificate-errors']
  });

  const page = await browser.newPage();
  let successCount = 0;

  for (const pageName of PAGES) {
    const result = await scrapePage(page, pageName);
    if (result.success && result.content.length > 50) {
      const filename = decodeURIComponent(pageName).replace(/['"]/g, '') + '.md';
      const filepath = path.join(OUT_DIR, filename);
      const header = `# ${result.title}\n\n> Source: ${BASE_URL}/${pageName}\n> License: CC BY-SA 3.0 (Paradox Wikis)\n\n`;
      fs.writeFileSync(filepath, header + result.content);
      console.log(`  Saved: ${filename} (${result.content.length} chars)`);
      successCount++;
    }
    // Brief pause between pages
    await page.waitForTimeout(1500);
  }

  console.log(`\nDone! Successfully scraped ${successCount}/${PAGES.length} pages.`);
  await browser.close();
}

main().catch(console.error);
