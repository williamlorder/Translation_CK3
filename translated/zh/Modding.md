# 模组制作

> 原文来源: https://ck3.paradoxwikis.com/Modding
> 授权协议: CC BY-SA 3.0 (Paradox Wikis)

本文内容不受版本限制，适用于游戏的任何版本。

模组制作（Modding），即创建模组（Mod），是指修改游戏的资源或行为，可以是供个人使用，也可以公开发布给其他玩家，例如通过 Paradox Mods 或 Steam 创意工坊发布。

《十字军之王III》具有很高的可模组化程度，模组制作者的目标各不相同：增加更多事件或决议、改善地图和模型、全面转换、无障碍辅助、翻译等。

CK3 的模组制作不需要任何编程语言知识，大部分工作只需一个简单的文本编辑器即可完成。游戏使用其自有的脚本语言，旨在易于使用和学习。然而，与其他游戏相比，这也在一定程度上限制了可修改的内容范围。

自 1.9 补丁以来，模组不再禁用成就。模组也不会使铁人模式存档失效。在多人游戏中，所有玩家必须使用相同的模组并保持相同的加载顺序。

本文是 CK3 模组制作的简要入门介绍。如需深入学习，请查阅游戏文件和其他模组，自行实验并加入模组制作 Discord 社区。

## 提示与指南

### 必知事项

- 使用 `-debug_mode -develop` 启动选项来实现编辑时热重载文件，并启用控制台
- 使用一款优秀的文本编辑器，如安装了 Paradox Modding Toolkit 的 VSC
- 务必检查错误日志！日志位于 Documents/Paradox Interactive/Crusader Kings III/logs/error.log
- 使用 `script_docs` 和 `dump_data_types` 控制台命令来生成所有可用效果、触发器等的日志。日志文件生成在上述相同的 logs 文件夹中。
- 如果你订阅了自己的模组，请删除本地版本！否则模组将无法正常工作。

### 文件重载

使用 `-debug_mode -develop` 启动选项启动游戏，可以即时重载文件并使用控制台。

- Steam 平台：在 Steam 中右键点击游戏 -> 属性 -> 在底部的启动选项中添加 `-debug_mode -develop`
- Windows：为 .exe 文件创建快捷方式 -> 右键点击 -> 属性 -> 在目标字段末尾添加 `-debug_mode -develop`
- Windows Xbox Game Pass：打开"命令提示符"并运行 `start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode -develop`

部分文件可能仍需重启游戏，但大多数文件都可以重载。

### 文本编辑器与工具

使用优秀的文本编辑器来辅助模组制作，不要使用默认的记事本。文本编辑器的优势：

- 搜索游戏中所有文件的内容
- 自动补全
- 语法高亮和自动格式化

这将大大加快工作进度并帮助我们预防错误。
以下编辑器除 Intellij IDEA 外均为免费：

- Visual Studio Code - 快速且强大，初学者的最佳选择。
  扩展插件：
  - Paradox Modding Toolkit - 良好的自动补全、语法高亮功能，集成 CK3 Tiger 进行错误验证。如果你是新手，使用这个就够了。
  - CK3 Tiger - 错误验证工具，也可作为独立工具使用
  - CWTools - 已过时的扩展，显示许多误报错误且自动补全不可靠。包含 Paradox Syntax Highlighting
  - Paradox Highlight - 较新的语法高亮选项
  - All Autocomplete - 可以帮助捕获其他扩展遗漏的自动补全项
- Sublime Text
  - 有开发者制作的扩展：CK3 Tools，提供语法高亮和补全功能。
  - 提示：如果你想在 Sublime 中切换注释，还需要将此文件添加到 "User" 文件夹中。
- Notepad++
  - 提示：选择 Perl 作为语法高亮语言。要将其设为默认，请前往 Settings -> Styler Configurator，在左侧列表中找到 Perl，然后在底部的 "User ext." 字段中添加 "gui txt"（不含引号）。
- Intellij IDEA
  - 有粉丝制作的 Paradox Language Support 插件，提供语法高亮和验证功能。安装方法：前往 File -> Settings -> Plugins 并搜索 "Paradox Language Support"。
- Pulsar（Atom 的分支）
  - 注意：不包含本地化文件所需的 UTF-8-BOM 编码！可能需要在其他编辑器中重新保存文件。
  - 提示：选择 Perl 6 作为高亮语言。要将其设为默认，请前往 File -> Config，找到 "core:" 并在下方添加：`customFileTypes: "source.perl6": [ "txt" "gui"]`，如示例所示。

### 日志

务必检查错误日志！

你会犯错误。错误日志会报告这些错误。将日志添加到你的编辑器中，并尽量保持日志清洁。

日志位于 Documents/Paradox Interactive/Crusader Kings III/logs/error.log

相关控制台命令：

- `release_mode` - 显示一个名为 Errorhoof 的追踪器，显示错误数量，这样你就不会错过新出现的错误
- `log_viewer` - 打开游戏内日志，同时包含 debug.log（可在顶部进行过滤）

注意：即使在未安装模组的游戏中，日志也会报告错误。在不加载任何模组的情况下启动游戏并运行一段时间，了解哪些错误是常见的且不是由你引起的。

我们可以使用 `error_log` 和 `debug_log` 效果将信息发送到相应的日志中。这有助于测试你的脚本，确保其正确执行。

日志文件夹中还包含效果、触发器和作用域的列表——这些就是你在脚本中可以实际使用的内容。

在游戏中使用 `script_docs` 和 `dump_data_types` 控制台命令来生成它们。

在 Linux 上，此目录位于 ~/.local/share/Paradox Interactive/Crusader Kings III

调试模式快捷键——启用调试模式后，我们可以对角色进行额外的点击操作：

- Ctrl+点击 - 切换到该角色
- Alt+点击 - 杀死该角色
- Ctrl+Alt+点击 - 在资源管理器中打开该角色。
  资源管理器让我们可以轻松地对游戏对象运行效果和触发器。控制台中有一个按钮可以打开它。

控制台也可以运行脚本。先添加 effect 或 trigger 关键字，例如：`effect add_gold = 100` 或 `trigger is_adult = yes`

### 其他提示

- 当你订阅了 Steam 版本的模组时，请删除本地副本！否则模组将无法在游戏中正常工作。启动器只能有一个版本的模组：本地版或 Steam 版。（你也可以删除 .mod 文件或更改其扩展名，而不是删除整个模组文件夹）你不需要订阅自己的模组来测试它，只要上传时没有错误，它就能为其他人正常工作。
- 为你的修改创建模组：即使是微小的更改也要使用个人模组，绝不要直接修改 CK3 游戏文件夹中的游戏文件，因为它们可能会被不加警告地覆盖。
- 传达模组的关键信息：
  - 在描述顶部列出主要的更改和新增内容。为了帮助兼容性，你可以在底部添加已更改文件的列表。
  - 在其他平台（创意工坊、Paradox Mods、论坛）提供你的模组链接。
- 尽可能将模组上传到所有平台，特别是如果模组很受欢迎的话。并非所有人都在 Steam 上拥有游戏。
- 备份你的工作。可以手动备份或使用 Git 等版本控制系统。考虑使用 GitHub 和 Discord 进行团队协作。
- 使用合适的合并工具（如 WinMerge）来合并文件夹之间的差异，并在新补丁发布时更新修改过的文件。
- 如果你需要在数十或数百行代码中替换文本，正则表达式可以节省大量时间。上述所有文本编辑器都支持正则表达式。学习资源：RegexOne、RegExr。
- Win+V 可以打开剪贴板历史记录。在制作模组时你会复制大量文本，这个功能可以让你访问之前复制的条目，而无需返回其来源。
- 加入 CK3 Modding Discord 社区来提问并帮助他人
- Modding Git Guide 是一份社区制作的关于使用 Git、GitHub/GitLab 及 KDiff3 等相关工具的指南。对于本维基之外的问题，它是一个有用的参考，并且包含了此处讨论的许多内容的分步指南。虽然示例基于 HOI4，但原则同样适用于任何 Paradox 游戏模组。
- 你可以更改启动器和游戏保存用户特定数据的路径：
  - 启动器的设置文件位于 steamapps\common\Crusader Kings III\launcher\launcher-settings.json。编辑 gameDataPath 键来更改位置。
  - 对于游戏数据，你需要创建文件 steamapps\common\Crusader Kings III\game\userdir.txt，内容为游戏应保存数据的绝对路径。例如：C:/Users/username/AppData/Local/Paradox Interactive/Crusader Kings III/。注意路径必须以 / 结尾。

### 本地化文件

- localization 文件夹中的 *.yml 文件必须以 UTF-8 + BOM 编码保存，才能被游戏正确读取。
- 文件名需要保存为 *l_<language>.yml 的格式，游戏才能正确读取文件。例如 council_l_english.yml。
  - 你必须使用美式拼写 "localization"。英联邦拼写 "localisation" 将不起作用。
  - 注意，l_ 是小写字母 L（代表 language），不是大写字母 I。
- 要覆盖现有的本地化值，请将包含更改的文件放入 localization 文件夹中名为 "replace" 的文件夹内。
- 如果模组只有英文本地化，使用其他语言的玩家将看到类似 strings_like_this 的未本地化字符串。最好将你的本地化文件复制给其他语言，即使你不提供翻译。模组制作 Discord 有一个工具可以一键复制所有文件并重命名其语言标记。

### 启动选项

可以添加到 Steam 游戏属性或游戏 exe 文件的桌面快捷方式的目标字段中。这可以让你绕过启动器。

`-debug_mode` - 启用调试工具提示和交互

`-develop` - 启用大多数文件保存后的热重载

`-mapeditor` - 打开地图编辑器

`-skip` - 跳过主菜单，直接加载到 1066 开始日期的角色选择大厅

`-play=e_hre` - 跳过菜单，直接以 1066 开始日期中持有该头衔的角色开始游戏

- 头衔名称可以在游戏的调试工具提示中找到。其他示例：`-play=d_apulia`、`-play=k_poland`

`-continuelastsave` - 加载上次存档，与在启动器中点击"继续"相同

`-debug_controller_camera` - 添加手柄控制镜头的支持（1.9 之前为 `-handle_controller_input`）

`-nographics` - 启动游戏时不创建窗口或渲染任何内容，并开始观察者游戏

`-random_seed=42` - 使用固定的随机数种子启动游戏（本例中为 42），仅在与 `-debug_mode` 组合使用时有效

`-benchmark` - 运行 1.5 年的自动化测试，移动镜头并打开各种窗口。输出 timer_dump 日志，显示每个 tick 处理所花费的时间（将其转换为表格并制作图表进行分析）

## 创建模组

主条目：Mod structure#Creating initial files

建议使用游戏启动器来创建初始模组文件：

- 打开游戏启动器。
- 前往左侧的 Mod library（模组库）。
- 点击右上角的 Upload Mod（上传模组）。
- 点击 Create a Mod（创建模组）。
- 输入名称、模组版本（不是游戏版本）、目录（启动器会创建该目录）以及至少一个标签。必须填写所有这些内容才能点击底部的 Create（创建）。
  - （名称必须至少 3 个字符。目录可以包含空格，但不能以空格结尾。）

之后，将你要编辑的游戏文件复制到创建的模组文件夹中，保持相同的文件夹结构。例如，mod/my_new_mod/events/test_events.txt

## 上传/更新模组

上传和更新遵循相同的流程：

- 打开游戏启动器。
- 前往左侧的 Mod library（模组库）。
- 点击右上角的 Upload Mod（上传模组）。
- 从下拉菜单中选择你的模组。
- 选择要上传到的平台。
- 输入描述。（如果是更新，请确保启动器复制了网站上的最新描述。）
- 添加缩略图
  - Steam 创意工坊：将 thumbnail.png 放入模组文件夹。使用 1:1 比例，最大 1MB。创意工坊显示的最大缩略图约为 600x600 像素。
  - Paradox Mods：将缩略图拖到描述下方的区域。建议最小尺寸为 900x500，png 或 jpg 格式，最大 1MB。
- 点击 "Upload"（上传）。
  - 在 Steam 上，模组将以私密模式上传，出现在你的 Steam 个人资料 -> 创意工坊物品中。打开它并将侧边栏中的可见性更改为公开，以实际发布。
  - 在 Paradox Mods 上，模组将在验证过程后发布。你可能需要编辑描述，因为该网站通常会删除换行和 BBCode 格式。

## 手动安装模组

模组安装在 Windows 的 Documents/Paradox Interactive/Crusader Kings III/mod 文件夹中，或 Linux 的 ~/.local/share/Paradox Interactive/Crusader Kings III/mod/ 中。

每个模组必须有一个 .mod 文件和一个文件夹。（例如，"Nameplates.mod" 和 "nameplates" 文件夹）

注意，单个模组文件夹不需要在 CK3 主 mod 文件夹中，只有 .mod 文件需要在此处。你可以编辑 .mod 文件来指向新的模组文件夹路径。（即将 `path="mod/my mod"` 这一行改为例如 `path="C:/Local_Documents/CK3_mods/my mod"`）

如果你的 OneDrive 空间不足且不想付费扩容，这非常有用。

### 安装论坛模组

模组制作者通常会将 .mod 文件和模组文件夹打包在一起。在这种情况下，你只需将 zip 文件直接解压到你的 "mod" 目录即可。如果你看到的是 descriptor.mod 和其他一些文件夹，请继续阅读下一节：

### 安装 Paradox Mods

从 Paradox Mods 下载的模组只包含模组文件夹的内容，需要进行以下操作：

- 在你的 "mod" 目录中创建一个新文件夹。随意命名，例如 "my mod"。
- 将下载的模组直接解压到这个新文件夹中。
- 从中复制 descriptor.mod 并粘贴到你的 "mod" 文件夹中。
- 将复制的 descriptor 文件重命名为任意名称。
- 用文本编辑器打开它，添加一行 `path="mod/my mod"`（其中 "my mod" 是你创建的文件夹名称）。保存文件。
- 之后，你应该能够在启动器中添加此模组。

如果这不起作用，你可以尝试从启动器创建一个新模组，然后将下载的文件复制到其文件夹中（不包括 descriptor.mod）。

## 从 Microsoft Store 版本提取文件

如果你想使用 Microsoft Store 版本读取文件，可以使用名为 UWPDumper 的程序来提取文件。

- 下载最新的 UWPDumper x64 二进制文件
- 启用开发者模式（Windows 设置 -> 更新和安全 -> 开发者选项 -> 开发者模式）。
- 运行 CK3。
- 运行你刚下载的程序中的 UWPInjector.exe。
- 输入 ck3.exe : ParadoxInteractive.ProjectTitus_zfnrdv2de78ny 旁边的数字作为进程 ID。
- 查看文件将存储在哪里（可能类似 C:\Users\%USERPROFILE%\AppData\Local\Packages\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny\TempState\DUMP）
- 等待程序完成。

文件应该出现在之前指定的目录中。如果你想编辑文件，请创建一个模组并将所需文件复制到其中。

## 模组加载顺序

加载顺序仅在两个或更多模组修改相同文件时才重要，这称为模组冲突。

模组按照播放集（Playset）中从上到下的顺序加载。

播放集中位置较低的模组将覆盖上方的同名文件。

因此，如果你想确保某个模组不被任何其他模组覆盖，请将其放在播放集的最底部。

务必阅读模组描述。模组制作者通常会列出他们更改了哪些文件以及可能与其他模组产生的兼容性问题。

一些热门模组有兼容补丁（compatch），可以将冲突的文件合并在一起，让玩家同时使用两个模组。兼容补丁模组在另外两个模组之后加载。

除此之外，加载顺序不会影响任何东西。

## 覆盖规则

#### 完整文件覆盖

如果一个模组与游戏有相同的文件，它会替换该文件的所有内容。

（所谓相同文件，是指相同路径、相同文件名。）

除非你打算覆盖整个文件，否则请避免这样做！

当两个模组有相同的文件时，播放集中位置较低的模组的文件会被加载。

#### 单一对象覆盖

通常，我们可以覆盖单个对象，例如一个 define 或一个脚本化触发器。

将你的更改放在一个新文件中，路径与原版相同。

你的文件名在 ASCII 字母排序中应排在后面：01_defines.txt 将覆盖 00_defines.txt。

这被称为 LIOS（Last In Only Served，后加载优先）。大多数覆盖遵循此顺序。图形界面文件中的 Types 使用 FIOS（First In Only Served，先加载优先）。

示例：

我们可以在 common\scripted_triggers 中创建一个文件，命名为 all_can_raid_trigger.txt，内容如下：

```
can_raid_trigger = { always = yes }
```

它将覆盖 00_scripted_rule_triggers.txt 中的 can_raid_trigger 触发器，允许任何人进行劫掠。

一般规则是我们可以覆盖文件中的顶层声明：即在行首定义的、不在任何代码块内的内容。

单一覆盖也不能删除一个对象，只能更改它。

使用覆盖时，最好在文件名中添加你的模组名称，这样你可以在 database_conflicts.log 中轻松识别是否已加载。

更多细节：

##### Defines（定义）

common/defines

包含你更改的分类名称，例如：

```
NCharacter = {
	BASE_FERTILITY = 0.5
	BASE_HEALTH = 5.0
}
```

##### On_actions（触发动作）

common/on_action

on_actions 的某些部分是合并而非覆盖的。

events、random_events 和 on_actions 是追加的。

trigger 和 effect 在技术上是覆盖的，但它们会产生错误。

如果你想向一个 on_action 添加效果，请创建一个包含你效果的自定义 on_action，并从现有的 on_action 中触发它。

以下代码向 on_birth 添加一个效果：

```
on_birth = { on_actions = { my_mod_on_birth } }
my_mod_on_birth = {
   effect = { add_gold = 100 }
}
```

以下代码覆盖 on_birth 的所有原版效果：

```
on_birth = {
   effect = { add_gold = 100 }
}
```

除非你打算进行如此大幅度的更改，否则不要这样做。

##### Localization（本地化）

我们可以替换单个本地化键，但这会产生错误，除非文件被添加到 replace/ 文件夹中。

以下两种路径都有效：

localization/{language}/replace

localization/replace/{language}

##### UI types（界面类型）

窗口必须在特定命名的 gui 文件中，因此如果我们想更改角色窗口，就必须编辑整个 window_character.gui

Types 和 templates 可以被覆盖，但它们遵循 FIOS 顺序：先加载的 type 或 template 具有优先权。

你的文件名在 ASCII 字母排序中需要排在前面，例如，在文件名前添加 00_：00_my_buttons.gui。
如果要替换一个 type，记得先定义一个 group，名称随意，然后在其中定义 type。
如果是 template，只需将 template 放入文件中，不需要添加其他内容。

以下代码重新定义了小按钮的尺寸：

```
types SmallButton {
  type button_standard_small = button_standard
    {
        size = { 40 25 }
    }
}
```

##### 常见问题

我们不能覆盖单个事件，不能覆盖单个信仰。我们必须覆盖它们的整个文件。

在 history 中定义的角色不会互相覆盖，而是产生重复。必须覆盖整个文件。

虽然多个模组可以添加建筑，但它们需要覆盖 common/holdings 中的整个 holdings.txt 文件才能真正添加建筑。

新服装也需要覆盖基因文件，动画需要覆盖空闲动画。

## 故障排除

### Paradox Mods 上的模组无法正常工作

目前，从 Paradox Mods 网站添加模组时存在一个 bug。如果模组添加了新文件，游戏会完全忽略它们。

要解决此问题，请从播放集中移除该模组，下载它并按照这些步骤手动安装。

### 你上传到 Steam 的模组不起作用

确保你只使用一个版本的模组：Steam 创意工坊版或本地副本。取消订阅或删除另一个版本。否则，即使其中一个被禁用，游戏也会混淆并可能根本无法加载该模组。

### 模组停止工作

由于未知原因，模组有时会停止工作。有两种解决方法：

- 从启动器重新加载：
  - 打开启动器
  - 前往左侧的 Mod library（模组库）
  - 点击右上角的 Reload Mods（重新加载模组）然后点击 Reload（清除缓存似乎不是必需的）
  - 前往 Playsets（播放集）。该模组应该有一个警告，提示文件不在磁盘上。将其从播放集中移除。
  - 关闭启动器
  - 重新订阅该模组。
  - 打开启动器并重新添加该模组。
- 如果以上方法都无效，删除以下文件（如果存在）并重启启动器：
  - Documents/Paradox Interactive/Crusader Kings III/mods_registry.json
  - Documents/Paradox Interactive/Crusader Kings III/launcher-v2.sqlite

### 模组冲突

如果多个模组修改了相同的文件或游戏对象，则只会加载一个版本的文件/对象。这就是我们所说的模组冲突。

冲突记录在 Documents/Paradox Interactive/Crusader Kings III/logs/database_conflicts.log

要搜索已下载模组中的冲突文件，你可以使用 Visual Studio Code 等文本编辑器并将 mod 文件夹拖入其中。

CK3 模组下载位置为 Steam\steamapps\workshop\content\1158310

在 VSC 中你可以按 Ctrl+Shift+F 搜索整个项目，或右键点击文件夹并选择 Find in Folder（在文件夹中查找）。

## 工具与实用程序

- 导出器（Maya 和 Photoshop）
- 社区制作的模组工具
- Clausewitz Maya Exporter：用于创建和导出 3D 模型以在 CK3 和其他 Clausewitz 游戏中使用的工具。
- UWPDumper：用于从 Microsoft Store 游戏中提取文件的工具。
- CK3 triggers, modifiers, effects, event scopes, event targets, on actions, code revisions and setup.log：自发布以来大多数游戏版本的有效输入列表。使用 GitHub 文件历史功能来比较版本。

## 存档编辑

> 此功能似乎已不再有效

存档文件位于：

- Windows：Documents\Paradox Interactive\Crusader Kings III\save games
- Linux：~/.local/share/Paradox Interactive/Crusader Kings III/save games

首先以调试模式启动游戏并保存。如果是铁人模式游戏，退出到菜单以自动保存。

- Steam 平台：在 Steam 中右键点击游戏 -> 属性 -> 在底部的启动选项中添加 `-debug_mode`
- Windows：为 .exe 文件创建快捷方式 -> 右键点击 -> 属性 -> 在目标字段末尾添加 `-debug_mode`

PC：

- 在存档文件夹中找到存档文件。
- 如果是自动存档，跳到下一步。否则：
  - 右键点击存档文件，使用 7-Zip 或 WinRar 将其作为压缩包解压
  - 将解压出的 'gamestate' 文件重命名为 .ck3 扩展名。
- 右键点击它并用文本编辑器打开（不推荐使用 Windows 记事本，因为存档文件非常大）。
- 编辑文件并保存。
  - 要移除铁人模式状态，搜索 "ironman=yes" 并将其改为 "no"
- 在游戏中加载它。

Mac：

- 打开终端
- 确保目录设置到正确的文件夹
- 输入 "unzip FileName.ck3"
- 将解压出的 'gamestate' 文件重命名为带 .ck3 扩展名的名称
- 编辑这个纯文本存档
- 直接在游戏中加载（无需重新压缩）

| **操作系统** | **存档类型** | **位置** |
|---|---|---|
| Windows | 本地 | C:\Users\%USERPROFILE%\Documents\Paradox Interactive\Crusader Kings III\save games |
| Windows | Steam 云 | C:\Program Files (x86)\Steam\userdata\####\1158310\remote\save games |
| Mac | 本地 | $HOME/Documents/Paradox Interactive/Crusader Kings III/save games |
| Linux | 本地 | $HOME/.local/share/Paradox Interactive/Crusader Kings III/save games |

### gamestate 文件的内容

下表包含 gamestate 文件中可能出现的第一级代码块。条目按出现顺序排列。

| **代码块** | **描述** |
|---|---|
| meta_data | 包含有关游戏的元数据，例如游戏版本。由主菜单界面使用。 |
| （各种变量） | 这些变量不属于任何代码块。 |
| | **变量** |
| | date |
| | random_seed |
| | random_count |
| | speed |
| | date |
| | bookmark_date |
| | first_start |
| variables | 包含脚本标志。 |
| traits_lookup | 可以查找的各种特质。 |
| provinces | 包含省份数据，包括建筑。 |
| landed_titles | 包含以下子代码块：dynamic_templates、landed_titles（重复） |
| dynasties | 包含以下子代码块：dynasty_house（到条目约 6401 结束）、dynasties（到条目约 6239 结束）、static_dynasties（数字列表）、static_dynasty_houses（数字列表） |
| character_lookup | |
| deleted_characters | |
| living | 包含存活角色的条目。 |
| dead_unprunable | 包含角色条目。 |
| characters | 包含以下子代码块：dead_prunable（包含角色条目）、prune_queue、dummy_female（包含角色条目）、dummy_male（包含角色条目）、unborn（包含未出生数据条目）、natural_deaths、current_natural_death、sexuality_chances |
| units | |
| （触发事件） | 每个触发事件都有自己的代码块，使用 triggered_event={ 开始 |
| played_character | 包含以下子代码块：name="..."（变量）、character=（角色 id）（变量）、player=（值）（变量）、important_decisions、legacy、rally_points |
| currently_played_characters={ (character id...) } | 角色 id 列表。 |
| armies | 包含以下子代码块：regiments、army_regiments、armies |
| activity_manager | 数据库条目 |
| opinions | 包含以下子代码块：active_opinions（包含好感度条目） |
| relations | 包含钩子、联盟等。包含以下子代码块：active_relations |
| schemes | 包含以下子代码块：active（包含阴谋条目） |
| stories | 包含以下子代码块：active（包含故事条目）、next=（日期）（变量） |
| combats | combat_results={}、combats={} |
| pending_character_interactions | 包含以下子代码块：data、player |
| secrets | 包含以下子代码块：secrets（包含秘密条目）（重复）、indices 等 |
| mercenary_company_manager | 包含以下子代码块：mercenary_companies |
| vassal_contracts | active={ id=contract_details } |
| religion | 包含以下子代码块：religions、faiths、great_holy_wars、holy_sites |
| wars | 包含以下子代码块：active_wars、names |
| sieges | 包含以下子代码块：sieges（重复） |
| succession | |
| holdings | |
| county_manager | 包含以下子代码块：counties、monthly_increase（值列表） |
| fleet_manager | 包含以下子代码块：fleets |
| council_task_manager | 包含以下子代码块：active |
| important_action_manager | 包含以下子代码块：active |
| faction_manager | 包含以下子代码块：factions |
| culture_manager | 包含以下子代码块：cultures、template_cultures（数字列表）、era_discovery |
| holy_orders | 包含以下子代码块：holy_orders、religion_name、faith_name |
| ai | 包含以下子代码块：war_coordinator_db、war_plan_db、ai_stategies |
| game_rules | 包含存档当前的游戏规则。 |
| raid | 包含以下子代码块：raid（重复） |
| ironman_manager | 与铁人模式存档相关。 |
| coat_of_arms | 包含以下子代码块：coat_of_arms_manager_name_map、coat_of_arms_manager_database（到条目约 17278 结束）、next_id=（id）（变量） |
| artifacts | |
| inspirations_manager | |
| court_positions | |
| struggle_manager | |
| character_memory_manager | |
| diarchies | |
| travel_plans | |
| accolades | |
| tax_slot_manager | |
| epidemics | |
| legends | |
| next_player_event_id=（值）（变量） | |

landed_titles 中每个登陆头衔的条目格式如下：

```
# 文件中的实际格式在空格和换行方面有所不同
# 通常更加紧凑。
# 此处为清晰展示和演示目的进行了编辑。

# 头衔的索引从 0 开始
index={
	key="(title id)" # 在 00_landed_titles.txt 中使用的标识，例如 k_england

	de_facto_liege=(title index) # 可选
	de_jure_liege=(title index) # 可选。类似代码块开头的数字，不是 title id
	de_jure_vassals={ (title index...) } # 可选，头衔索引列表。
	holder="(character id)" # 可选

	name="..."
	adj="..." # 可选
	pre="..." # 可选
	article="..." # 可选

	date=2020.10.27 # yyyy.mm.dd
	heir={ (character id...) } # 可选。角色 id 列表。
	claim={ (character id...) } # 可选
	history = { (...) } # 可选 
	capital=(province id)
	capital_barony=yes # 可选
	theocratic_lease=yes # 可选
	history_government="(government id)" # 可选
	laws={ "(law id)"... } # 可选。法律 id 列表。

	# 可选 (succession_election)。
	succession_election={
		electors = {  (character id...) }
		candidates={ (character id...) }
		nominations={
			{
				elector=(character id)
				candidate=(character id)
				strength=(value)
			}
		
		}
	} # succession_election 代码块结束

	coat_of_arms_id=(coat of arms id)
	localization_key="(localization key)" # 可选

	# 以下所有内容用于雇佣兵团
	special={
		type=mc
		identity=(id)
	}
	color=rgb { (r) (g) (b) }
	landless=yes
	destroy_if_invalid_heir=yes
	no_automatic_claims=yes
	definite_form=yes
}
```

在原版 CK3 中，此代码块在约第 12369 个条目处结束。

living 中每个存活角色的条目格式如下：

```
index={
	first_name="..."
	birth=(date) # 格式: yyy.m.d
	female=yes # 可选
	was_playable=yes # 可选
	nickname="nick_..." # 可选
	culture=(culture index) # 如果指定了 dynasty_house 则可选，默认为 dynasty_house 的文化。如果没有 dynasty_house 或文化与 dynasty_house 不同则为必需。
	faith=(faith index) # 如果指定了 dynasty_house 则可选，默认为 dynasty_house 的信仰。如果没有 dynasty_house 或信仰与 dynasty_house 不同则为必需。
	dynasty_house=(dynasty house index) # 可选，如果省略则必须指定文化和信仰
	skill={ (diplomacy) (stewardship) (martial) (intrigue) (learning) (prowess) } # 每项技能一个值
	prowess_age=(value) # 可选。负值。
	dna="(dna string)" # 可选
	mass=(value) # 可选，与 weight 互斥
	weight={ # 可选，与 mass 互斥
		base=(value)
		current=(value) # 可选
		target=(value) # 可选
	}

	sexuality=(value) # 可选。默认为异性恋。有效值：ho, bi, as, none。None 用于 10 岁以下的儿童。
	traits={ (trait index...) } # 可选。特质索引列表。通常幼儿会省略。
	recessive_traits = { (trait index...) } # 可选。特质索引列表
	inactive_traits = { (trait index...) } # 可选。特质索引列表
	
	# 可选 (family_data)
	family_data={
		real_father=(character id) # 可选
		betrothed=(character id) # 可选
		primary_spouse=(character id) # 可选。等于其中一个配偶 id。
		spouse=(character id) # 可选。第一个配偶
		spouse=(character id) # 可选。第二个配偶
		spouse=(character id) # 可选。第三个配偶
		spouse=(character id) # 可选。第四个配偶
		concubine=(character id) # 可选。第一个妾室
		concubine=(character id) # 可选。第二个妾室
		concubine=(character id) # 可选。第三个妾室
		former_spouses={ (character id...) } # 可选。角色 id 列表
		former_concubines={ (character id...) } # 可选。角色 id 列表
		former_concubinists={ (character id...) } # 可选。角色 id 列表
		child = { (character id...) } # 可选。角色 id 列表
	}

	alive_data={

		# 可选 (variables)，包含标志
		variables={
			data={
				# (...)
			}
		}

		# 可选 (modifiers)，位于 alive_data 中的不同位置
		modifier={
			modifier="(modifier)"
			expiration_date=(date)
		}

		gold=(value) # 可选
		income=(value) # 可选
		location=(landed title index) # 可选
		stress=(value) # 可选
		fertility=(value)
		health=(value)
		piety={
			currency=(value)
			accumulated=(value) # 可选。虔诚
		}
		prestige={
			currency=(value) # 可选
			accumulated=(value) # 可选。声望
		}
		focus={ # 可选
			type="(value)" # 教育或生活方式
			date=(date)
			changes=(value)
			progress=(value)
		}
		secrets= { (id...) } # 可选。id 列表
		targeting_secrets={ (id...) } # 可选。id 列表
		schemes={ (id...) } # 可选。id 列表
		targeting_schemes={ (id...) } # 可选。id 列表
		heir={ (ids...) } # 可选。id 列表
		pretender={ (ids...) } # 可选。id 列表
		claim={ { # 可选。宣称列表
			title=(title id)
			pressed=yes # 可选
			}
		}
		used_punishments={ # 可选。理由列表
			(value)={
				imprisonment_reason=yes # 可选
				revoke_title_reason=yes # 可选
			}
		}
		lifestyle_xp={ # 可选
			diplomacy_lifestyle=(value) # 可选
			martial_lifestyle=(value) # 可选
			stewardship_lifestyle=(value) # 可选
			intrigue_lifestyle=(value) # 可选
			learning_lifestyle=(value) # 可选
		}
		perk={ ... } # 可选。天赋列表
		prison_data={ # 可选
			imprisoner=(character id)
			date=(date)
			imprison_type_date=(date)
			type="(value)" # house_arrest（软禁）或 dungeon（地牢）
		}
		weight_update=(value) # 可选
		kills={ (character ids... } # 可选。角色 id 列表
		pool_history=(date) # 可选
		wars={ (value) (value) (value) (value) } # 可选
	} # alive_data 代码块结束

	court_data={
		# 此代码块中的所有键均为可选
		host=(value)
		employer=(character id)
		council_task=(council task index)
		special_council_tasks={ (value...) }
		army=(value)
		regiment=(regiment index)
		knight=yes
		wants_to_leave_court=yes
		leave_court_date=(date)
	}

	# 可选 (landed_data)
	landed_data={
		domain={ (landed title index...) } # 登陆头衔索引列表
		vassal_contracts={ (values) } # 值列表
		units= { (values...) } # 可选
		last_war_finish_date=(date) # 可选
		last_raid=(date) # 可选
		became_ruler_date=(date)
		laws={ "(law id)"... } # 法律 id 列表
		strength=(value)
		strength_for_liege=(value) # 可选
		liege_tax=(value) # 可选
		balance=(value)
		dread=(value) # 可选
		known_schemes={ (ids...) } # 可选。id 列表
		succession={ (character id...) } # 角色 id 列表
		is_powerful_vassal=yes # 可选
		vassal_power_value=(value) # 可选
		domain_limit=(value)
		vassal_limit=(value) # 可选
		vassals_towards_limit=(value) # 可选
		government="(government id)"
		realm_capital=(value)
		ai_allowed_to_marry=yes
		council={ (value...) } # 值列表
		at_peace_penalty=(value)
		diplo_centers={ (value...) } # 值列表
		election_titles={ (landed title index...) } # 登陆头衔索引列表
		absolute_control=yes # 可选
		interaction_cooldowns={ # 可选
			(interaction)=(date)
		}
	} # landed_data 代码块结束

	# 可选 (playable_data)
	playable_data={
		knights={ (character id...) } # 角色 id 列表
		was_player=yes
	}

}
```

## 有维基页面的模组

模组维基页面由模组团队负责，而非 Paradox 维基团队

- Way of Kings（王者之路）
- Kingdom of Heaven（天国王朝）
- When the World Stopped Making Sense（当世界失去理性）
- Princes of Darkness（黑暗王子）
- Elder Kings II（上古之王II）
- CK3AGOT（CK3 冰与火之歌）
- Nightmare in Britain（不列颠噩梦）
- Rajas of Asia（亚洲王公）
- LotR: Realms in Exile（指环王：流亡王国）
- The Fallen Eagle（陨落之鹰）
- Medieval Arts（中世纪艺术）

## 外部链接

- Paradox 论坛上的 CK3 用户模组。
- 十字军之王官方 Discord 模组制作频道。前往 server-roles 频道并在 Channel Access 帖子中选择 CK3 Modding。
- CK3 Mod Coop：一个专门用于 CK3 模组制作的社区 Discord 服务器。
