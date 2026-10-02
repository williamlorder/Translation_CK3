# 十字军之王III 中文维基（非官方翻译）

《十字军之王III》（Crusader Kings III）社区维基 [ck3.paradoxwikis.com](https://ck3.paradoxwikis.com/) 的非官方简体中文翻译，以静态网站形式发布在 GitHub Pages，尽量保留原站的页面结构、表格、信息框与导航框。

- 在线浏览：<https://williamlorder.github.io/Translation_CK3/>（需先按下文“部署”一节在仓库设置中启用 GitHub Pages）
- 默认深色主题，页眉可切换浅色并记住选择；支持中英文标题搜索；适配手机屏幕
- 另附 EPUB 电子书 `CK3_Wiki_Chinese.epub`（早期文本版译文）

## 内容范围

| 类型 | 说明 |
|------|------|
| 按原站结构翻译 | 抓取原站页面 HTML，逐段翻译后按原结构回填，表格、信息框、导航框、目录完整保留 |
| 早期文本版译文 | 原站反爬机制导致无法获取完整页面结构的核心页面，暂用早期提取文字后翻译的版本 |
| 暂未收录 | 侧栏与“全部页面”中以 ↗ 标记，点击打开英文原站 |

网站中的“全部页面”列出了每个页面的类型与翻译进度。

## 授权与排除说明

- 原文由 Paradox Wikis 社区编写，采用 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans) 协议。本项目译文为衍生作品，同样以 CC BY-SA 3.0 发布，每个页面底部注明原文链接与修订版本。
- 以下内容不在社区授权范围内，本项目不转载：
  - 游戏图片、图标与标志（版权归 Paradox Interactive），网站中以同尺寸占位框标示；
  - Paradox 官方商店宣传文案、DLC 官方简介、YouTube 视频说明；
  - 游戏内叙事文本（较长的斜体引文、带本地化变量的叙事句、传统/革新/教义等的风味描述）；
  - 第三方作品引文。
- 入库的源文件（`source/html/`）同样经过清理，排除规则见 `scripts/lib/segments.js` 与 `site-src/exclusions.json`。
- 译文由 AI 辅助翻译，可能存在错误，请以英文原文为准。游戏内容及素材的商标与版权归 Paradox Interactive 及其许可方所有；本项目与 Paradox Interactive 无关。

## 项目结构

```
Translation_CK3/
├── docs/                 # 生成的静态网站（GitHub Pages 发布目录）
├── source/html/          # 原站页面 HTML（已清理）与页面元数据 pages.json
├── translation/
│   ├── glossary.md       # 术语表（翻译必须遵守）
│   ├── INSTRUCTIONS.md   # 翻译规范
│   └── tm/               # 翻译记忆：片段键 → 译文
├── site-src/             # 网站样式、脚本与排除规则
├── scripts/
│   ├── crawl_html.js     # 礼貌抓取原站页面（单标签页、限速、被拒即停）
│   ├── segment.js        # 提取待翻译片段，生成批次到 work/batches
│   ├── check_batch.js    # 校验译文（占位符、完整性）
│   ├── build_site.js     # 生成 docs/ 静态网站
│   └── build_epub.js     # 生成 EPUB
├── translated/zh/        # 早期文本版译文（EPUB 与后备页来源）
└── source/en/            # 早期抓取的英文文本
```

## 构建

```bash
npm install
node scripts/segment.js --write          # 生成待翻译批次（work/batches）
# 按 translation/INSTRUCTIONS.md 翻译批次，写入 translation/tm/<批次>.json
node scripts/check_batch.js --all        # 校验译文
node scripts/build_site.js               # 生成 docs/
node scripts/build_epub.js               # 生成 EPUB
```

## 部署（GitHub Pages）

在仓库 **Settings → Pages** 中：

1. **Source** 选择 **Deploy from a branch**
2. **Branch** 选择 `claude/ck3-wiki-translation-hv2dyi`，文件夹选择 `/docs`，点击 **Save**

几分钟后即可通过 <https://williamlorder.github.io/Translation_CK3/> 访问。之后每次推送都会自动更新网站。

## 贡献

欢迎提交 Issue 或 PR 改进译文。修改译文请编辑 `translation/tm/` 中对应的条目，然后重新运行 `node scripts/build_site.js`。
