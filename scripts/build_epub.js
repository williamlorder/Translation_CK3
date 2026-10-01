const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const epub = require('epub-gen-memory').default;

const ZH_DIR = path.join(__dirname, '..', 'translated', 'zh');

const CHAPTERS_ORDER = [
  { file: 'Crusader_Kings_III.md', title: '十字军之王III 总览' },
  { file: 'Resources.md', title: '资源（金币/威望/虔诚/声望）' },
  { file: 'Characters.md', title: '角色' },
  { file: 'Attributes.md', title: '属性', optional: true },
  { file: 'Traits.md', title: '特质', optional: true },
  { file: 'Titles.md', title: '头衔' },
  { file: 'Laws.md', title: '法律' },
  { file: 'Decisions.md', title: '决策' },
  { file: 'Council.md', title: '御前会议' },
  { file: 'Court.md', title: '宫廷', optional: true },
  { file: 'Royal_court.md', title: '御前宫廷', optional: true },
  { file: 'Government.md', title: '政体', optional: true },
  { file: 'Power_sharing.md', title: '权力分享', optional: true },
  { file: 'Subjects.md', title: '臣属', optional: true },
  { file: 'Dynasty.md', title: '家族' },
  { file: 'Lifestyle.md', title: '生活方式' },
  { file: 'Schemes.md', title: '阴谋', optional: true },
  { file: 'Hooks.md', title: '把柄', optional: true },
  { file: 'Artifacts.md', title: '宝物' },
  { file: 'Modifiers.md', title: '修正' },
  { file: 'Army.md', title: '军队' },
  { file: 'Casus_belli.md', title: '宣战理由' },
  { file: 'Warfare.md', title: '战争', optional: true },
  { file: 'Alliance.md', title: '联盟', optional: true },
  { file: 'Hired_forces.md', title: '雇佣军', optional: true },
  { file: 'Knight.md', title: '骑士' },
  { file: 'Duel.md', title: '决斗' },
  { file: 'Building.md', title: '建筑' },
  { file: 'Barony.md', title: '男爵领' },
  { file: 'County.md', title: '伯爵领', optional: true },
  { file: 'Domicile.md', title: '居所', optional: true },
  { file: 'Great_projects.md', title: '伟大工程' },
  { file: 'Travel.md', title: '旅行' },
  { file: 'Situation.md', title: '局势', optional: true },
  { file: 'Religion.md', title: '宗教' },
  { file: 'Doctrines.md', title: '教义', optional: true },
  { file: 'Tenets.md', title: '教条' },
  { file: 'Holy_sites.md', title: '圣地' },
  { file: 'Culture.md', title: '文化', optional: true },
  { file: 'Traditions.md', title: '传统' },
  { file: 'Innovation.md', title: '革新', optional: true },
  { file: 'Activity.md', title: '活动', optional: true },
  { file: 'Adventurer.md', title: '冒险者', optional: true },
  { file: 'Prisoners.md', title: '囚犯', optional: true },
  { file: 'Interesting_characters.md', title: '有趣的角色' },
  { file: 'Downloadable_content.md', title: 'DLC 可下载内容' },
  { file: 'Console_commands.md', title: '控制台命令' },
  { file: 'Modding.md', title: '修改（Modding）' },
  { file: 'Jargon.md', title: '术语与缩写' },
  { file: 'Beginners_guide.md', title: '新手指南', optional: true },
  { file: 'Achievements.md', title: '成就', optional: true },
  { file: 'Game_rules.md', title: '游戏规则', optional: true },
  { file: 'Patches.md', title: '补丁', optional: true },
  { file: 'Mechanics.md', title: '机制', optional: true },
];

async function buildEpub() {
  const chapters = [];
  let skipped = [];

  for (const ch of CHAPTERS_ORDER) {
    const filePath = path.join(ZH_DIR, ch.file);
    if (!fs.existsSync(filePath)) {
      if (!ch.optional) {
        console.log(`WARNING: Missing required file: ${ch.file}`);
      }
      skipped.push(ch.title);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove the attribution header (first 4 lines typically)
    const lines = content.split('\n');
    let startIdx = 0;
    for (let i = 0; i < Math.min(lines.length, 10); i++) {
      if (lines[i].startsWith('> 原文来源') || lines[i].startsWith('> 授权协议')) {
        startIdx = i + 1;
      }
    }
    // Skip blank lines after header
    while (startIdx < lines.length && lines[startIdx].trim() === '') {
      startIdx++;
    }

    content = lines.slice(startIdx).join('\n');

    // Remove the first heading if it matches the chapter title (avoid duplication)
    content = content.replace(/^#\s+.+\n+/, '');

    // Convert markdown to HTML
    const html = marked.parse(content);

    chapters.push({
      title: ch.title,
      content: html,
    });

    console.log(`  Added: ${ch.title} (${ch.file})`);
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} pages (not available):`);
    skipped.forEach(t => console.log(`  - ${t}`));
  }

  console.log(`\nGenerating EPUB with ${chapters.length} chapters...`);

  const epubOptions = {
    title: '十字军之王III Wiki 中文翻译',
    author: 'Paradox Wikis 社区（翻译项目）',
    publisher: 'CK3 Wiki 中文翻译项目',
    description: '《十字军之王III》Wiki 核心内容的简体中文翻译，涵盖游戏机制、角色、军事、宗教、文化等全部主要页面。原文内容来自 Paradox Wikis，采用 CC BY-SA 3.0 协议。',
    lang: 'zh-CN',
    tocTitle: '目录',
    css: `
      body { font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.8; color: #333; }
      h1 { font-size: 1.6em; border-bottom: 2px solid #8B4513; padding-bottom: 0.3em; margin-top: 1.5em; color: #8B4513; }
      h2 { font-size: 1.3em; border-bottom: 1px solid #CD853F; padding-bottom: 0.2em; margin-top: 1.2em; color: #8B4513; }
      h3 { font-size: 1.1em; margin-top: 1em; color: #A0522D; }
      h4 { font-size: 1em; margin-top: 0.8em; color: #CD853F; }
      table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.85em; }
      th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
      th { background-color: #f5e6d3; font-weight: bold; color: #5c3317; }
      tr:nth-child(even) { background-color: #faf5ef; }
      ul, ol { padding-left: 1.5em; }
      li { margin-bottom: 0.3em; }
      p { margin: 0.6em 0; }
      strong { color: #5c3317; }
      code { background-color: #f5f5f5; padding: 1px 4px; border-radius: 3px; font-size: 0.9em; }
      pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }
      blockquote { border-left: 3px solid #CD853F; padding-left: 1em; color: #666; margin: 1em 0; }
    `,
  };

  try {
    const epubContent = await epub(epubOptions, chapters);
    const outputPath = path.join(__dirname, '..', 'CK3_Wiki_Chinese.epub');
    fs.writeFileSync(outputPath, epubContent);
    console.log(`\nEPUB generated successfully: ${outputPath}`);
    console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total chapters: ${chapters.length}`);
  } catch (err) {
    console.error('Error generating EPUB:', err);
    process.exit(1);
  }
}

buildEpub().catch(console.error);
