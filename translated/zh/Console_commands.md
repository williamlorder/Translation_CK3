# 控制台命令

> 原文来源: https://ck3.paradoxwikis.com/Console_commands
> 授权协议: CC BY-SA 3.0 (Paradox Wikis)

请协助验证或更新本文中较旧的章节。至少有部分内容最后验证于版本1.19。本文仅适用于PC版《十字军之王III》。

《十字军之王III》提供了一个调试模式（默认禁用），允许输入控制台命令。本页面列出了可以在控制台窗口中输入的代码，控制台窗口是一个特殊的调试窗口，在非铁人模式的游戏中启用调试模式后，可以通过按 Shift+2、ALT+2+1、Shift+3、§、~、^、°、² 或 ` 键打开（具体按键取决于键盘布局）。对于 QWERTY 键盘，按键为 `。如果以上组合键均无效，可以尝试 Shift + Alt + C。按上下箭头键可以浏览之前执行过的命令。许多代码可以通过重复输入命令来关闭，但有时需要重新加载存档或退出游戏。

将光标悬停在角色上并启用调试模式即可查看角色ID。

使用任何控制台命令都将禁用当前游戏的成就。

## 调试模式

调试模式是一组游戏工具，允许通过非常规方式修改游戏行为。它包括：

- 控制台窗口（接受控制台命令）
- 调试菜单（包括肖像编辑器、GUI编辑器、微调菜单等）
- 调试角色互动（用户可以即时改变好感度、监禁等）
- 按住 Ctrl 点击肖像可以控制该角色，按住 Alt 点击可以杀死该角色
- 文件监视器，可自动将更改的文件（包括模组）重新加载到内存中

### 启用调试模式

调试模式可以在启动游戏前启用，也可以在游戏中通过模组切换。调试模式可以从控制台禁用，但关闭后无法重新启用（除非使用模组）。

启用方法：

#### 模组

有许多模组可以实现此功能，例如 Free Console Access 和 Debug Toggle。

这些模组允许开启和关闭调试模式，方便使用控制台和游玩，但不会启用文件即时重载功能。对于模组制作，最好同时使用模组和启动选项。

#### 启动器

在游戏启动器中：

- 切换到左侧的游戏设置
- 向下滚动到"以调试模式打开游戏"部分并点击启动

#### Steam

在 Steam 上：

- 右键点击游戏，打开属性
- 在底部的启动选项中添加 -debug_mode
- 启动游戏

#### Windows

不通过 Steam，在 Windows 上：

- 前往 CK3 目录的 "binaries" 文件夹
- 右键点击 ck3.exe 并创建快捷方式
- 右键点击快捷方式，打开属性
- 在目标字段末尾添加 -debug_mode（使其看起来像这样 "...\ck3.exe" -debug_mode）
- 使用快捷方式启动游戏

或者：

- 前往 CK3 目录的 "binaries" 文件夹
- 右键创建一个新的记事本文本文件
- 添加以下内容：start ck3.exe -debug_mode
- 转到文件菜单并点击另存为
- 保存为批处理文件（.bat）
- 使用批处理文件启动游戏

#### GOG

在 GOG 上：

- 右键点击游戏，打开设置
- 勾选"添加命令行参数"并输入 debug_mode

在 GOG Galaxy 2.0 上：

- 在游戏页面中，选择设置（位于页面顶部"开始游戏"按钮旁边）
- 打开"管理安装"并选择"配置..."
- 确保页面底部的启动参数"自定义可执行文件/参数"已勾选。您可以复制 "startgame" 可执行文件并在参数字段中输入 -debug_mode。

#### Xbox Game Pass

对于 Xbox Game Pass / Windows 10 商店版本，操作会更复杂一些，因为你无法为其创建普通的快捷方式，所以每次打开游戏时都需要在命令提示符中运行以下命令：

start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode

为了简化操作，你也可以创建一个包含此命令的批处理（.bat）文件并从桌面运行：

- 右键点击桌面，选择 新建 -> 文本文档。
- 将其重命名为 "ck3.bat"。确保删除末尾的 ".txt"。出现提示时确认更改。
- 右键点击文件并选择编辑。
- 粘贴命令：start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode
- 保存文件
- 双击运行以启动游戏

## 调试信息

调试信息可以通过控制台按钮或使用 debug_mode 命令来启用和禁用。当调试信息激活时，角色、互动和事件将显示正常游戏中隐藏的调试信息。需要注意的是，启用调试信息后游戏会消耗更多资源，但在大多数机器上不会产生明显影响。

### 角色

以下数值在调试模式下会显示在角色信息中：

| **名称** | **描述** |
|---|---|
| ID | 角色的ID。用于在事件和控制台命令中引用角色。 |
| Historical ID | 历史ID |
| Fertility | 角色的生育率，以百分比显示。 |
| Health | 角色的健康值，以数字显示。精确到小数点后一位。 |
| Stress | 角色的压力值。 |
| Base Weight | 与体重机制相关。 |
| Target Weight | 与体重机制相关。 |
| Current Weight | 与体重机制相关。 |

### 事件

将鼠标悬停在事件选项上会显示该选项的AI权重。此外，在事件窗口的右上角，将鼠标悬停在问号（?）上会显示内部详细信息，包括以下内容：

- 事件ID
- 触发事件的角色
- 根角色
- 保存的事件目标
- 保存的列表目标
- 描述

### 互动

在给定互动的菜单中，将鼠标悬停在最终按钮旁边的紫色 R 上会显示根作用域、主要/次要执行者和主要/次要接收者。

## 作弊命令

作弊命令是可用于获得不公平优势的控制台命令，而非仅用于测试目的。请注意，在调试窗口打开时按 Tab 键会显示命令列表，输入选定命令后再次按 Tab 键会在调试窗口中显示该命令的可用参数。

| **命令** | **效果** | **参数** | **示例** |
|---|---|---|---|
| abort_travel_plan | 取消[角色ID]的当前活动，如果未指定角色则为玩家角色。 | [角色ID] | abort_travel_plan |
| add_claim | 为[角色ID]添加对[头衔ID]的宣称（已确认），如果未指定角色则为玩家角色。 | [头衔ID] [角色ID] | add_claim e_hre |
| add_doctrine | 将[教义ID]添加到[信仰ID]，如果未指定信仰则为玩家角色的信仰。按 Tab 键可显示所有教义ID。 | [教义ID] [信仰ID] | add_doctrine doctrine_gender_equal catholic |
| add_dread | 为[角色ID]增加[数量]的恐惧值，如果未指定角色则为玩家角色。负值会降低恐惧值。 | [数量] [角色ID] | add_dread 100 |
| add_house_unity_value | 增加[数量]的家族团结值。负值会降低。 | [数量] | add_house_unity_value 20 |
| add_maa | 为[角色ID]添加[兵团ID]类型的扈从部队，如果未指定角色则为玩家角色。按 Tab 键可显示所有兵团ID。 | [兵团ID] [角色ID] | add_maa bowmen |
| add_perk | 为[角色ID]添加[技能ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有技能ID。 | [技能ID] [角色ID] | add_perk thoughtful_perk |
| add_piety | 为玩家角色增加[数量]的虔诚值。负值会降低。默认值为1000。 | [数量] | add_piety 9000 |
| add_piety_no_experience | 为玩家角色增加[数量]的虔诚值但不增加奉献等级。负值会降低。默认值为1000。 | [数量] | add_piety_no_experience 9000 |
| add_prestige | 为玩家角色增加[数量]的威望值。负值会降低。默认值为1000。 | [数量] | add_prestige 16000 |
| add_realm_law | 为[角色ID]的领地通过[法律ID]，如果未指定角色则为玩家角色的领地。按 Tab 键可显示所有法律ID。 | [法律ID] [角色ID] | add_realm_law crown_authority_3 |
| add_realm_law_skip_effects | 为[角色ID]的领地添加[法律ID]（跳过效果），如果未指定角色则为玩家角色的领地。按 Tab 键可显示所有法律ID。 | [法律ID] [角色ID] | add_realm_law_skip_effects crown_authority_3 |
| add_relation | 在[角色ID]和[角色ID]之间添加[关系ID]，如果只指定一个角色则在玩家角色和该角色之间添加。 | [关系ID] [角色ID] | add_relation friend 1234 |
| add_secret | 为玩家角色添加[秘密ID]。按 Tab 键可显示所有秘密ID。如果未指定ID则为玩家角色。添加[角色ID 1] [角色ID 2]可创建由相应角色持有的秘密。 | [秘密ID] [角色ID] | add_secret secret_witch |
| add_stress | 为[角色ID]增加[数量]的压力值，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | add_stress 50 |
| add_title_law | 为[头衔ID]添加[继承法ID]。 | [头衔ID] [法律ID] | add_title_law e_hre feudal_elective_succession_law |
| add_trait | 为[角色ID]添加[特质ID]，如果未指定角色则为玩家角色。 | [特质ID] [角色ID] | add_trait witch |
| add_lifestyle_xp_all | 为[角色ID]的所有生活方式增加[数量]的经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp_all 2000 |
| add_lifestyle_xp diplomacy_lifestyle | 为[角色ID]增加[数量]的外交生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp diplomacy_lifestyle 2000 |
| add_lifestyle_xp martial_lifestyle | 为[角色ID]增加[数量]的军事生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp martial_lifestyle 2000 |
| add_lifestyle_xp stewardship_lifestyle | 为[角色ID]增加[数量]的管理生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp stewardship_lifestyle 2000 |
| add_lifestyle_xp intrigue_lifestyle | 为[角色ID]增加[数量]的谋略生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp intrigue_lifestyle 2000 |
| add_lifestyle_xp learning_lifestyle | 为[角色ID]增加[数量]的学识生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp learning_lifestyle 2000 |
| add_lifestyle_xp wanderer_lifestyle | 为[角色ID]增加[数量]的流浪者生活方式经验值，如果未指定角色则为玩家角色。默认值为1000。 | [数量] [角色ID] | add_lifestyle_xp wanderer_lifestyle 2000 |
| age | 为[角色ID]增加[数量]的年龄，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | age 20 |
| ai.disable | 禁用[角色ID]的AI，如果未指定角色则禁用所有角色的AI。注意：禁用所有角色的AI也会禁用自动军队的AI（如果已启用）。 | [角色ID] | ai.disable 20076 |
| ai.enable | 启用[角色ID]的AI，如果未指定角色则启用所有角色的AI。 | [角色ID] | ai.enable 20076 |
| bypass_requirements | 忽略大部分事项的要求限制。 | 无 | bypass_requirements |
| change_culture | 将[伯爵领ID]的文化更改为[文化ID]。 | [伯爵领ID] [文化ID] | change_culture 496 swedish |
| change_development_level | 为[伯爵领ID或男爵领ID]增加[数量]的发展度，如果未指定伯爵领则为玩家角色的首都。负值会降低。 | [数量] [伯爵领ID或男爵领ID] | change_development_level 100 496 |
| change_fervor | 为[信仰ID]增加[数量]的热忱值，如果未指定信仰则为玩家角色的信仰。负值会降低。默认值为10。 | [数量] [信仰ID] | change_fervor 100 catholic |
| change_house_unity_stage | 将家族团结设置为[等级名称]。按 Tab 键可显示所有等级名称。 | [等级名称] | change_house_unity_stage friendly |
| change_diplomacy | 为[角色ID]增加[数量]的外交技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_diplomacy 16 |
| change_martial | 为[角色ID]增加[数量]的军事技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_martial 16 |
| change_stewardship | 为[角色ID]增加[数量]的管理技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_stewardship 16 |
| change_intrigue | 为[角色ID]增加[数量]的谋略技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_intrigue 16 |
| change_learning | 为[角色ID]增加[数量]的学识技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_learning 16 |
| change_prowess | 为[角色ID]增加[数量]的勇武技能，如果未指定角色则为玩家角色。负值会降低。 | [数量] [角色ID] | change_prowess 16 |
| charinfo | 可以在游戏中查看角色ID等信息。 | 无 | charinfo |
| clear_character_modifiers | 移除[角色ID]的所有角色修正，如果未指定角色则为玩家角色。 | [角色ID] | clear_character_modifiers |
| clear_title_laws | 移除[头衔ID]的所有头衔继承法。 | [头衔ID] | clear_title_laws e_hre |
| clear_traits | 移除[角色ID]的所有特质，如果未指定角色则为玩家角色。 | [角色ID] | clear_traits |
| complete_schemes | 完成[角色ID]发起的所有阴谋，如果未指定角色则为玩家角色。 | [角色ID] | complete_schemes |
| discover_all_eras | 发现[角色ID]文化的所有时代革新，如果未指定角色则为玩家角色的文化。 | [角色ID] | discover_all_eras all |
| discover_era | 发现[时代ID]及其所有革新，应用于玩家角色的文化。按 Tab 键可显示所有时代ID。默认为当前时代。 | [时代ID] | discover_era culture_era_early_medieval |
| discover_fascination | 发现[角色ID]文化的当前关注点，如果未指定角色则为玩家角色的文化。 | [角色ID] | discover_fascination |
| discover_innovation | 为[角色ID]的文化发现[革新ID]，如果未指定角色则为玩家角色的文化。按 Tab 键可显示所有革新ID。 | [革新ID] [角色ID] | discover_innovation innovation_motte |
| dynasty_prestige | 为[宗族ID]增加[数量]的声望值，如果未指定宗族则为玩家角色的宗族。负值会降低。默认值为1000。 | [数量] [宗族ID] | dynasty_prestige 100000 |
| effect change_government = | 将政体更改为[政体ID]，如果该政体的DLC未安装则无法使用。 | [政体ID] | effect change_government = feudal_government |
| end_diarchy | 结束[角色ID]的权力分享，如果未指定角色则为玩家角色。 | [角色ID] | end_diarchy |
| end_schemes | 所有针对玩家角色的阴谋将被放弃。 | 无 | end_schemes |
| event | 触发[事件ID]。 | [事件ID] [角色ID] | event court_maintenance.0012 |
| fow | 切换战争迷雾。 | 无 | fow |
| gain_all_dynasty_perks | 为[角色ID]的宗族购买所有宗族传承，如果未指定角色则为玩家角色的宗族。 | [角色ID] | gain_all_dynasty_perks |
| gain_all_perks | 为[角色ID]赋予所有生活方式技能，如果未指定角色则为玩家角色。 | [角色ID] | gain_all_perks |
| give_title | 将[头衔ID]赋予[角色ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有头衔ID。注意：头衔的ID可以通过将鼠标悬停在其纹章上找到。 | [头衔ID] [角色ID] | give_title e_hre |
| gold | 为玩家角色增加[数量]的金币。负值会降低。默认值为1000。 | [数量] | gold 500 |
| guaranteed_scheme_success | 阴谋总是成功。 | 无 | guaranteed_scheme_success |
| guaranteed_scheme_secrecy_success | 阴谋总是保密。 | 无 | guaranteed_scheme_secrecy_success |
| instabuild | 玩家的扈从部队立即补充满员。玩家领地中正在进行的建造立即完成。新的建造在一天内完成。再次输入可禁用。 | 无 | instabuild |
| instant_birth | 怀孕持续一天。再次输入可禁用。 | 无 | instant_birth |
| instant_culture_reformation | 更改传统立即生效。再次输入可禁用。 | 无 | instant_culture_reformation |
| instant_responses | 角色立即响应玩家的行动。再次输入可禁用。 | 无 | instant_responses |
| instasiege | 围城将在当天结束时立即完成。该命令为开关式切换。 | 无 | instasiege |
| join_era | 为[角色ID]的文化进入[时代ID]，如果未指定角色则为玩家角色的文化。按 Tab 键可显示所有时代ID。 | [时代ID] | join_era culture_era_high_medieval |
| kill | 杀死[角色ID]，如果未指定角色则为玩家角色。 | [角色ID] | kill |
| know_schemes | 发现所有针对玩家角色的阴谋。 | 无 | know_schemes |
| merge_culture | 将所有[文化ID]的伯爵领文化更改为[文化ID]。 | [文化ID] [文化ID] | merge_culture greek swedish |
| pregnancy | 使女性[角色ID]怀孕，父亲为[角色ID]，如果未指定角色则为未知父亲。 | [角色ID] [角色ID] | pregnancy 1234 |
| progress_struggle_phase | 为[斗争ID]的下一阶段增加[数量]的催化点。按 Tab 键可显示所有斗争ID。 | [斗争ID] [阶段ID] [数量] | progress_struggle_phase iberian_struggle struggle_iberia_phase_hostility 1000 |
| remove_doctrine | 从[信仰ID]中移除[教义ID]，如果未指定信仰则为玩家角色的信仰。按 Tab 键可显示所有教义ID。 | [教义ID] [信仰ID] | remove_doctrine doctrine_gender_equal catholic |
| remove_nick | 移除[角色ID]的当前昵称，如果未指定角色则为玩家角色。 | [角色ID] | remove_nick |
| remove_relation | 移除[角色ID]和[角色ID]之间的[关系ID]，如果只指定一个角色则移除玩家角色和该角色之间的关系。 | [关系ID] [角色ID] | remove_relation friend 1234 |
| remove_trait | 从[角色ID]移除[特质ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有特质ID。 | [特质ID] [角色ID] | remove_trait witch |
| set_culture | 将[角色ID]的文化更改为[文化ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有文化ID。 | [文化ID] [角色ID] | set_culture swedish |
| set_dread | 将[角色ID]的恐惧值设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_dread 100 |
| set_faith | 将[角色ID]的信仰更改为[信仰ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有信仰ID。注意：对信仰领袖无效。 | [信仰ID] [角色ID] | set_faith catholic |
| set_focus | 将[角色ID]的专注设置为[专注ID]，如果未指定角色则为玩家角色。 | [专注ID] [角色ID] | set_focus diplomacy_majesty_focus |
| set_nick | 为[角色ID]赋予[昵称ID]，如果未指定角色则为玩家角色。按 Tab 键可显示所有昵称ID。 | [昵称ID] [角色ID] | set_nick nick_the_lazy |
| set_sexuality | 将[角色ID]的性取向更改为[性取向ID]，如果未指定角色则为玩家角色。 | [性取向ID] [角色ID] | set_sexuality bisexual |
| set_stress | 将[角色ID]的压力值设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_stress 0 |
| set_diplomacy | 将[角色ID]的外交技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_diplomacy 16 |
| set_martial | 将[角色ID]的军事技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_martial 16 |
| set_stewardship | 将[角色ID]的管理技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_stewardship 16 |
| set_intrigue | 将[角色ID]的谋略技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_intrigue 16 |
| set_learning | 将[角色ID]的学识技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_learning 16 |
| set_prowess | 将[角色ID]的勇武技能设置为[数量]，如果未指定角色则为玩家角色。 | [数量] [角色ID] | set_prowess 16 |
| set_date | 将日期设置为[年.月.日]，如果未指定月份或日期，则设置为1月1日。 | [年.月.日] | set_date 1100.6.15 |
| skip_activity_phase | 跳至[角色ID]的下一个活动阶段，如果未指定角色则为玩家角色。 | [角色ID] | skip_activity_phase |
| start_diarchy | 为[角色ID]开始权力分享，如果未指定角色则为玩家角色。 | [角色ID] | start_diarchy |
| start_struggle | 开始[斗争ID]。按 Tab 键可显示所有斗争ID。 | [斗争ID] | start_struggle iberian_struggle |
| yesmen | AI角色接受所有提议。再次输入可禁用。 | 无 | yesmen |
| yesmen_instant | AI角色立即接受所有提议。再次输入可禁用。 | 无 | yesmen_instant |
| change_treasury | 增加[数量]的国库金币。负值会降低。 | [数量] | change_treasury 500 |
| add_pending_court_event | 为玩家角色的皇家宫廷添加一个待处理事件。 | 无 | add_pending_court_event |
| effect change_current_court_grandeur = | 增加[数量]的宫廷宏伟度。负值会降低。 | [数量] | effect change_current_court_grandeur = 10 |
| add_influence | 为玩家角色增加[数量]的影响力。负值会降低。默认值为1000。 | [数量] | add_influence 16000 |
| change_provisions | 为玩家角色增加[数量]的补给。负值会降低。 | [数量] | change_provisions 2500 |
| add_merit | 为玩家角色增加[数量]的功勋值。负值会降低。默认值为1000。 | [数量] | add_merit 10000 |
| barter_goods | 为玩家角色增加[数量]的贸易货物。负值会降低。默认值为500。 | [数量] | barter_goods 1000 |

### 生成文物

大多数文物是通过复杂脚本随机生成的，无法通过控制台生成。但历史文物可以通过这种方式创建。要生成文物，请在控制台中复制以下命令之一。如果没有 { OWNER = this } 作用域，游戏会崩溃。

| **命令** | **文物** |
|---|---|
| effect create_artifact_fp3_ancient_drinking_vessel_effect = { OWNER = this } | 阿契美尼德饮器 |
| effect create_artifact_al_dawat_effect = { OWNER = this } | 达瓦特墨水瓶 |
| effect create_artifact_al_hafir_effect = { OWNER = this } | 哈菲尔 |
| effect create_artifact_pedestal_al_jabal_effect = { OWNER = this } | 贾巴尔 |
| effect create_artifact_al_sayf_al_khass_effect = { OWNER = this } | 哈斯圣剑 |
| effect create_artifact_al_taj_crown_effect = { OWNER = this } | 谢里夫王冠 |
| effect create_artifact_pedestal_al_yatima_effect = { OWNER = this } | 雅提马 |
| effect create_artifact_abhidhamma_pitaka_effect = { OWNER = this } | 阿毗达磨藏 |
| effect create_artifact_afarganyu_effect = { OWNER = this } | 阿法尔甘尤 |
| effect create_artifact_arms_of_alexander_effect = { OWNER = this } | 亚历山大的盔甲 |
| effect create_artifact_aruval_effect = { OWNER = this } | 古代阿鲁瓦尔 |
| effect create_artifact_kantele_effect = { OWNER = this } | 古代坎特勒琴 |
| effect create_artifact_angelicas_ring_effect = { OWNER = this } | 安杰莉卡之戒 |
| effect create_artifact_aram_effect = { OWNER = this } | 阿拉姆 |
| effect create_artifact_sculpture_ark_of_covenant_effect = { OWNER = this } | 约柜 |
| effect create_artifact_ascalon_effect = { OWNER = this } | 亚实基伦 |
| effect create_artifact_sculpture_babr_e_bayan_effect = { OWNER = this } | 巴布尔-巴扬 |
| effect create_artifact_pedestal_sakanoue_sword_effect = { OWNER = this } | 坂上之宝剑 |
| effect create_artifact_wall_banner_thankfulness_effect = { OWNER = this } | 感恩之旗 |
| effect create_artifact_various_bells_santiago = { OWNER = this } | 圣地亚哥之钟 |
| effect create_artifact_pedestal_branch_relic_boog_effect = { OWNER = this } | 松布树枝——大地上的第一棵树 |
| effect create_artifact_pedestal_branch_relic_hinduism_effect = { OWNER = this } | 如意宝树卡尔帕弗利克沙之枝 |
| effect create_artifact_pedestal_branch_relic_slavic_effect = { OWNER = this } | 生命之树树枝——立于阿拉特石上 |
| effect create_artifact_bronze_head_effect = { OWNER = this } | 青铜头像 |
| effect create_artifact_byz_throne_effect = { OWNER = this } | 拜占庭所罗门王座 |
| effect create_artifact_khanda_effect = { OWNER = this } | 礼仪剑 |
| effect create_artifact_goblet_chalice_of_dona_urraca = { OWNER = this } | 多尼亚·乌拉卡圣杯 |
| effect create_artifact_chinese_caligraphy_effect = { OWNER = this } | 中国书法 |
| effect create_colada_effect = { OWNER = this } | 科拉达 |
| effect create_artifact_pedestal_justinian_effect = { OWNER = this } | 查士丁尼王冠 |
| effect create_artifact_nikephoros_crown_effect = { OWNER = this } | 尼基弗鲁斯二世王冠 |
| effect create_artifact_crystal_carving_effect = { OWNER = this } | 水晶雕刻 |
| effect create_artifact_pedestal_cup_jamshid_effect = { OWNER = this } | 贾姆希德之杯 |
| effect create_artifact_curtana_effect = { OWNER = this } | 科塔纳 |
| effect create_artifact_dagger_of_rostam_effect = { OWNER = this } | 罗斯塔姆之匕首 |
| effect create_artifact_pedestal_david_harp_effect = { OWNER = this } | 大卫的竖琴 |
| effect create_artifact_wall_banner_kaviani_effect = { OWNER = this } | 卡维亚尼战旗 |
| effect create_artifact_dhammapada_effect = { OWNER = this } | 法句经 |
| effect create_artifact_dragvandil_effect = { OWNER = this } | 德拉格万迪尔 |
| effect create_artifact_durendal_effect = { OWNER = this } | 迪朗达尔 |
| effect create_artifact_eight_fold_chest_effect = { OWNER = this } | 八重宝箱 |
| effect create_artifact_military_classics_effect = { OWNER = this } | 武经总要 |
| effect create_artifact_excalibur_effect = { OWNER = this } | 石中剑 |
| effect create_artifact_pedestal_gyerimro_dagger_effect = { OWNER = this } | 异域匕首 |
| effect create_artifact_various_aquamanile_santiago = { OWNER = this } | 昔日圣地亚哥之钟 |
| effect create_artifact_fp2_4p_chess_board_effect = { OWNER = this } | 四人棋盘 |
| effect create_artifact_pedestal_baekje_incense_burner_effect = { OWNER = this } | 鎏金铜香炉 |
| effect create_artifact_pedestal_great_diamond_effect = { OWNER = this } | 巨钻 |
| effect create_artifact_statue_viet_green_amitabha_buddha_effect = { OWNER = this } | 绿石阿弥陀佛像 |
| effect create_artifact_edmund_head_effect = { OWNER = this } | 圣埃德蒙之首 |
| effect create_artifact_heirloom_seal_effect = { OWNER = this } | 传国玉玺 |
| effect create_artifact_hizamaru_sword_effect = { OWNER = this } | 膝丸 |
| effect create_artifact_hydraulic_organ_effect = { OWNER = this } | 液压管风琴 |
| effect create_artifact_ibeji_effect = { OWNER = this } | 伊贝吉 |
| effect create_artifact_pedestal_ikenga_effect = { OWNER = this } | 伊肯加 |
| effect create_artifact_wall_banner_edessa_effect = { OWNER = this } | 埃德萨圣像 |
| effect create_artifact_chinese_armillary_sphere_effect = { OWNER = this } | 浑天仪 |
| effect create_artifact_pedestal_crown_iron_effect = { OWNER = this } | 伦巴第铁王冠 |
| effect create_artifact_jewelled_danda_effect = { OWNER = this } | 宝石权杖 |
| effect create_artifact_joyeuse_effect = { OWNER = this } | 欢悦之剑 |
| effect create_artifact_karakawa_armor_effect = { OWNER = this } | 唐皮甲 |
| effect create_artifact_kaves_apron_effect = { OWNER = this } | 卡维的围裙 |
| effect create_artifact_essen_crown_effect = { OWNER = this } | 儿童王冠 |
| effect create_artifact_kladenets_effect = { OWNER = this } | 克拉德涅茨 |
| effect create_artifact_legbiter_effect = { OWNER = this } | 噬腿剑 |
| effect create_artifact_fp2_2p_chess_board_effect = { OWNER = this } | 幸运棋盘 |
| effect create_artifact_makarakundala_effect = { OWNER = this } | 摩伽罗耳环 |
| effect create_artifact_mantle_of_the_prophet_effect = { OWNER = this } | 先知斗篷 |
| effect create_artifact_pedestal_reliquary_judaism_effect = { OWNER = this } | 耶路撒冷烛台 |
| effect create_artifact_sword_mmaagha_kamalu_effect = { OWNER = this } | 卡马卢之剑 |
| effect create_artifact_monomachus_crown_effect = { OWNER = this } | 莫诺马赫王冠 |
| effect create_artifact_pedestal_koh_i_noor_effect = { OWNER = this } | 光之山 |
| effect create_artifact_nagelring_effect = { OWNER = this } | 纳格尔林 |
| effect create_artifact_navaratna_effect = { OWNER = this } | 九宝石 |
| effect create_artifact_olifant_effect = { OWNER = this } | 象牙号角 |
| effect create_artifact_oxus_bracelet_effect = { OWNER = this } | 奥克瑟斯手镯 |
| effect create_artifact_papal_tiara_effect = { OWNER = this } | 教宗三重冠 |
| effect create_artifact_peacock_throne_effect = { OWNER = this } | 孔雀王座 |
| effect create_artifact_sculpture_cabinet_pentapyrgion_effect = { OWNER = this } | 五塔圣物柜 |
| effect create_artifact_robe_kassapa_effect = { OWNER = this } | 迦叶法衣碎片 |
| effect create_artifact_trinket_icon_ancient_effect = { OWNER = this } | 便携式圣像 |
| effect create_artifact_qadib_al_mulk_effect = { OWNER = this } | 王权之杖 |
| effect create_artifact_quernbiter_effect = { OWNER = this } | 磨石碎裂者 |
| effect create_artifact_reichskrone_effect = { OWNER = this } | 帝国王冠 |
| effect create_artifact_ruyi_effect = { OWNER = this } | 如意 |
| effect create_artifact_illustrious_sassanian_sword_effect = { OWNER = this } | 萨珊宝剑 |
| effect create_artifact_zomorrodnegar_effect = { OWNER = this } | 祖母绿宝剑 |
| effect create_artifact_pedestal_shankha_conch_effect = { OWNER = this } | 法螺 |
| effect create_artifact_pedestal_seven_branched_sword_effect = { OWNER = this } | 七支刀 |
| effect create_artifact_siddhachakra_effect = { OWNER = this } | 成就轮 |
| effect create_artifact_skull_cap_charlemagne_effect = { OWNER = this } | 查理曼头骨帽 |
| effect create_artifact_sledovik_effect = { OWNER = this } | 斯列多维克 |
| effect create_artifact_spear_of_the_prophet_effect = { OWNER = this } | 先知之矛 |
| effect create_artifact_staff_kakusandha_effect = { OWNER = this } | 拘留孙佛之杖 |
| effect create_artifact_statue_roman_woman_effect = { OWNER = this } | 罗马女性雕像 |
| effect create_artifact_statue_constantine_effect = { OWNER = this } | 君士坦丁雕像 |
| effect create_artifact_statue_four_tetrarchs_effect = { OWNER = this } | 四帝共治雕像 |
| effect create_artifact_throne_scone_effect = { OWNER = this } | 斯昆石 |
| effect create_artifact_sutta_pitaka_effect = { OWNER = this } | 经藏 |
| effect create_artifact_wall_sword_attila_effect = { OWNER = this } | 神之剑 |
| effect create_artifact_sword_goujian_effect = { OWNER = this } | 勾践剑 |
| effect create_artifact_wall_muhammad_sword_effect = { OWNER = this } | 穆罕默德之剑 |
| effect create_artifact_szczerbiec_effect = { OWNER = this } | 什切尔别茨 |
| effect create_artifact_throne_charlemagne_effect = { OWNER = this } | 查理曼王座 |
| effect create_artifact_throne_solomon_effect = { OWNER = this } | 所罗门王座 |
| effect create_artifact_wall_cid_sword_effect = { OWNER = this } | 提索纳 |
| effect create_artifact_tree_automa_effect = { OWNER = this } | 树形自动机 |
| effect create_artifact_turquoise_throne_effect = { OWNER = this } | 绿松石王座 |
| effect create_artifact_vinaya_pitaka_effect = { OWNER = this } | 律藏 |
| effect create_artifact_fp2_votive_crowns_effect = { OWNER = this } | 西哥特献祭王冠 |
| effect create_artifact_konagamana_effect = { OWNER = this } | 拘那含牟尼的净水器 |

### 转换命令

以下命令可用于将领地转换为某一信仰、文化、政体或头衔层级。仅限于角色直辖领的转换可以通过调试互动（在每个伯爵领中采取行动）来完成。

| **命令** | **转换效果** |
|---|---|
| effect every_sub_realm_county = { set_county_culture = root.culture } | 将领地内所有伯爵领转换为该角色的文化 |
| effect every_sub_realm_county = { set_county_faith = root.faith } | 将领地内所有伯爵领转换为该角色的信仰 |
| effect every_vassal_or_below = { set_culture = root.culture } | 将所有封臣和下级封臣转换为该角色的文化 |
| effect every_vassal_or_below = { set_character_faith = root.faith } | 将所有封臣和下级封臣转换为该角色的信仰 |
| effect every_courtier_or_guest = { set_culture = root.culture } | 将所有廷臣和宾客转换为该角色的文化 |
| effect every_courtier_or_guest = { set_character_faith = root.faith } | 将所有廷臣和宾客转换为该角色的信仰 |
| effect every_courtier_or_guest = { set_age = 20 } | 将所有廷臣和宾客的年龄设为20岁（可替换为其他数值） |
| effect every_vassal_or_below = { change_government = feudal_government } | 将所有封臣和下级封臣转换为封建政体（可替换为其他政体ID） |
| effect every_sub_realm_county = { change_development_level = 100 } | 将领地内所有伯爵领的发展度改为100（可替换为其他数值） |
| effect every_held_title = { set_de_jure_liege_title = root.primary_title } | 将所有持有的低一级头衔法理归属于主头衔 |

### 碎裂世界模式

要使用碎裂世界模式游玩，请使用以下命令：

| **命令** | **碎裂世界等级** |
|---|---|
| effect every_ruler = { every_held_title = { limit = { tier >= tier_empire } holder = { destroy_title = prev } } } | 王国级 |
| effect every_ruler = { every_held_title = { limit = { tier >= tier_kingdom } holder = { destroy_title = prev } } } | 公国级 |
| effect every_ruler = { every_held_title = { limit = { tier >= tier_duchy } holder = { destroy_title = prev } } } | 伯爵领级 |

### 脚本命令

脚本命令通常更为复杂，主要用于设置事件。这些命令也可以在控制台中作为作弊使用。

| **脚本** | **效果** | **参数** | **示例** |
|---|---|---|---|
| effect gok_world_conquest_generic_rewards_effect | 创建一个自定义霸权，它将没有法理领土（可以使用前文提到的另一个控制台命令解决）且名称和纹章随机生成（可随时手动更改）。 | | effect gok_world_conquest_generic_rewards_effect |
| effect spawn_army = { men_at_arms = { type = (扈从类型) = (数量) } location = capital_province } | 添加特殊部队 | (扈从类型), (数量) | effect spawn_army = { men_at_arms = { type = huscarl men = 500 } location = capital_province } |
| effect add_trait_xp = { trait = [x] value=[y] } | 增加单路径等级生活方式特质的经验值 | [x]：等级特质标签，[y]：经验值 | effect add_trait_xp = { trait = lifestyle_blademaster value = 100 } |

等级特质标签：
lifestyle_blademaster, lifestyle_reveler, lifestyle_physician, pilgrim,
lifestyle_mystic, lifestyle_hunter, lifestyle_traveler, tourney_participant,
peasant_leader

| **脚本** | **效果** | **参数** | **示例** |
|---|---|---|---|
| effect add_trait_xp = { trait = [x] track=[y] value=[z] } | 增加多路径等级生活方式特质的经验值 | [x]：等级特质标签，[y]：特质路径名称，[z]：经验值 | effect add_trait_xp = { trait = lifestyle_hunter track=venator value=100 } |

lifestyle_hunter 路径名称：venator, falconer

lifestyle_traveler 路径名称：travel, danger

tourney_participant 路径名称：bow, foot, horse, wit

| **脚本** | **效果** | **参数** | **示例** |
|---|---|---|---|
| effect root = { set_father/mother = character:historical_id } | 设置你的父母，仅适用于历史ID | father/mother, historical_id | effect root = { set_father = character:7627 } |
| effect root = { set_house = character:historical_id.house } | 设置你的家族，仅适用于历史ID | historical_id | effect root = { set_house = character:7627.house } |
| effect title:[x] = { set_de_jure_liege_title = title:[y] } | 使[x]成为[y]的法理部分 | [x]：头衔ID，[y]：头衔ID | effect title:k_egypt = { set_de_jure_liege_title = title:e_byzantium } |
| effect every_vassal_or_below = { add_trait = traitname } | 为所有臣属添加特质 | 特质名称 | effect every_vassal_or_below = { add_trait = intellect_good_3 } |
| effect every_vassal_or_below = { remove_trait = traitname } | 从所有臣属移除特质 | 特质名称 | effect every_vassal_or_below = { remove_trait = ill } |
| effect every_courtier_or_guest = { add_trait = traitname } | 为所有廷臣或宾客添加特质 | 特质名称 | effect every_courtier_or_guest = { add_trait = strong } |
| effect every_courtier_or_guest = { remove_trait = traitname } | 从所有廷臣或宾客移除特质 | 特质名称 | effect every_courtier_or_guest = { remove_trait = infertile } |
| effect root.culture = { add_culture_tradition = tradition } | 为玩家的文化添加传统 | 传统名称 | effect root.culture = { add_culture_tradition = tradition_horse_lords } |
| effect root.culture = { remove_culture_tradition = tradition } | 从玩家的文化移除传统 | 传统名称 | effect root.culture = { remove_culture_tradition = tradition_horse_lords } |
| effect culture:culture = { add_culture_tradition = tradition } | 为特定文化添加传统 | 文化名称，传统名称 | effect culture:mongol = { add_culture_tradition = tradition_horse_lords } |
| effect culture:culture = { remove_culture_tradition = tradition } | 从特定文化移除传统 | 文化名称，传统名称 | effect culture:mongol = { remove_culture_tradition = tradition_horse_lords } |
| effect title:[x] = { set_capital_county = title:[y] } | 使[y]成为[x]的首都伯爵领 | [x]：头衔ID，[y]：伯爵领ID | effect title:e_byzantium = { set_capital_county = title:c_rome } |

## 测试命令

测试命令用于开发者、测试人员或模组制作者的测试工作。

| **命令** | **效果** | **参数** | **示例** |
|---|---|---|---|
| clear | 清除控制台历史记录。 | 无 | clear |
| dump_bookmark_portraits | 创建所有当前书签角色的书签肖像，存储在 Documents\Paradox Interactive\Crusader Kings III\common\bookmark_portraits 目录下。通过理发店应用的任何更改将被保留。 | 无 | dump_bookmark_portraits |
| effect | 执行脚本效果。要在非玩家角色上运行效果，可以使用 effect character:<角色ID> = {<效果名称> = <参数>}，或者固定你要影响的角色（取消固定所有其他角色）并使用 effect random_pinned_character = { <效果> }。注意：以前可以用等号和花括号包裹整个效果（例如 effect = { add_prestige = 100 }），但自v.1.18.0起不再支持。你仍然可以在效果内部使用花括号，但不能再写成 effect = {} 的格式，现在必须写成 effect add_prestige = 100 这样的格式。 | [效果脚本] | effect test |
| faction_spawn | 如果有有效的伯爵领或廷臣可以创建[派系类型]，则生成该派系。 | [派系类型] | faction_spawn peasant_faction |
| generate_cadet_coa | 为玩家角色的家族生成新的纹章。 | 无 | generate_cadet_coa |
| guaranteed_scheme_failure | 阴谋永远不会成功。 | 无 | guaranteed_scheme_failure |
| guaranteed_scheme_secrecy_failure | 阴谋永远不会保密。 | 无 | guaranteed_scheme_secrecy_failure |
| help | 打印[命令]的描述，如果为空则列出所有控制台命令。 | [命令] | help help |
| instamove | 军队每天移动一个男爵领。同时影响AI和玩家。 | 无 | instamove |
| map_editor | 打开地图编辑器。 | 无 | map_editor |
| nomen | AI角色拒绝所有提议。再次输入可禁用。 | 无 | nomen |
| observe | 进入观察者模式。 | 无 | observe |
| play | 切换到[角色ID]的角色进行游玩。 | [角色ID] | play 1234 |
| portrait_editor | 打开肖像编辑器。 | 无 | portrait_editor |
| reload | 将模组和游戏文件重新加载到内存中。按 Tab 键可查看所有可重新加载的（众多）目标。 | [文件名][目标] | reload events |
| run | 执行[文件名]中的命令。txt文件必须放置在 Documents/Paradox Interactive/Crusader Kings III/run 目录下。 | 无 | run test.txt |
| set_is_ai | 允许AI控制[角色ID]。 | [角色ID] | set_is_ai 1234 |
| set_is_player | 禁止AI控制[角色ID]。 | [角色ID] | set_is_player 1234 |
| script_docs | 将所有效果、事件作用域、修正、触发动作、条件等打印到 Documents\Paradox Interactive\Crusader Kings III\logs 目录。 | 无 | script_docs |
| tick_development | 为所有伯爵领增加[数量]的发展度。 | [数量] | tick_development 200 |

## 特质标签

主条目：特质

所有特质都有一个游戏内部引用的标签。可以在 game\common\traits\00_traits.txt 中找到。特质的标签通常与其名称匹配。要从特质名称获取其标签，请执行以下步骤：

- 将空格（ ）和连字符（-）替换为下划线（_）
- 移除所有撇号（'）
- 将所有大写字母转换为小写字母（A...Z -> a...z）

不遵循此规则的特质已在下方列出以供参考。

| **特质（教育）** | **标签** |
|---|---|
| Naive Appeaser | education_diplomacy_1 |
| Adequate Bargainer | education_diplomacy_2 |
| Charismatic Negotiator | education_diplomacy_3 |
| Grey Eminence | education_diplomacy_4 |
| Virtuoso Arbitrator | education_diplomacy_5 |
| Misguided Warrior | education_martial_1 |
| Tough Soldier | education_martial_2 |
| Skilled Tactician | education_martial_3 |
| Brilliant Strategist | education_martial_4 |
| Exalted Warlord | education_martial_5 |
| Indulgent Wastrel | education_stewardship_1 |
| Thrifty Clerk | education_stewardship_2 |
| Fortune Builder | education_stewardship_3 |
| Midas Touched | education_stewardship_4 |
| Golden Sovereign | education_stewardship_5 |
| Amateurish Plotter | education_intrigue_1 |
| Flamboyant Trickster | education_intrigue_2 |
| Intricate Webweaver | education_intrigue_3 |
| Elusive Shadow | education_intrigue_4 |
| Conniving Puppetmaster | education_intrigue_5 |
| Conscientious Scribe | education_learning_1 |
| Insightful Thinker | education_learning_2 |
| Astute Intellectual | education_learning_3 |
| Mastermind Philosopher | education_learning_4 |
| Erudite Oracle | education_learning_5 |
| Bumbling Squire | education_martial_prowess_1 |
| Confident Knight | education_martial_prowess_2 |
| Formidable Banneret | education_martial_prowess_3 |
| Famous Champion | education_martial_prowess_4 |
| Town Dweller | education_republican_knowledge_1 |
| Mayor Trainee | education_republican_knowledge_2 |
| Town Maven | education_republican_knowledge_3 |
| Republican Heir | education_republican_knowledge_4 |

| **特质（先天）** | **标签** |
|---|---|
| Homely | beauty_bad_1 |
| Ugly | beauty_bad_2 |
| Hideous | beauty_bad_3 |
| Comely | beauty_good_1 |
| Handsome / Pretty | beauty_good_2 |
| Beautiful | beauty_good_3 |
| Slow | intellect_bad_1 |
| Stupid | intellect_bad_2 |
| Imbecile | intellect_bad_3 |
| Quick | intellect_good_1 |
| Intelligent | intellect_good_2 |
| Genius | intellect_good_3 |
| Delicate | physique_bad_1 |
| Frail | physique_bad_2 |
| Feeble | physique_bad_3 |
| Hale | physique_good_1 |
| Robust | physique_good_2 |
| Amazonian / Herculean | physique_good_3 |
| Melancholic | depressed_1 / depressed_genetic |
| Lunatic | lunatic_1 / lunatic_genetic |
| Possessed | possessed_1 / possessed_genetic |
| Sterile / Barren | infertile |

| **特质（其他）** | **标签** |
|---|---|
| Blademaster | lifestyle_blademaster |
| Hunter | lifestyle_hunter |
| Wise Man / Wise Woman | lifestyle_mystic |
| Eager Reveler | lifestyle_reveler |
| Novice Physician | lifestyle_physician |
| Herbalist | lifestyle_herbalist |
| Gardener | lifestyle_gardener |
| Patriarch / Matriarch | family_first |
| Dynastic Kinslayer | kinslayer_1 |
| Familial Kinslayer | kinslayer_2 |
| Kinslayer | kinslayer_3 |
| Wounded | wounded_1 |
| Severely Injured | wounded_2 |
| Brutally Mauled | wounded_3 |
| Monk / Nun | devoted |
| Crusader Mujahid Warrior of the Faith | faith_warrior |
| Holy Monarch | crusader_king |
| Bloody Flux | dysentery |
| Club-footed | clubfooted |
| Holy Fire | ergotism |
| Pneumonia | pneumonic |
| The Savior | savior |
| Raider / Viking | viking |
| Child of Concubine | child_of_concubine_female |
| Child of Consort | child_of_concubine_male |
| Venerated Ancestor | saint |
| Exiled | the_wake |
| Accused of Decadence | decadent |
| Extolled by House | extolled |
| Former Adventurer | adventurer |
| Follower | adventurer_follower |
| Diplomatic Courtier | diplomatic_court_1 |
| Valued Diplomatic Courtier | diplomatic_court_2 |
| Warlike Courtier | warlike_court_1 |
| Valued Warlike Courtier | warlike_court_2 |
| Administrative Courtier | administrative_court_1 |
| Valued Administrative Courtier | administrative_court_2 |
| Intrigue Courtier | intrigue_court_1 |
| Valued Intrigue Courtier | intrigue_court_2 |
| Scholarly Courtier | scholarly_court_1 |
| Valued Scholarly Courtier | scholarly_court_2 |
| Hastiluder | tourney_participant |
| Detractor of the Caliphate | fp3_struggle_detractor |
| Supporter of Caliphal Authority | fp3_struggle_supporter |
| Inspector | lifestyle_surveyor |
| Wayfarer | lifestyle_wayfarer |
| Voyager | lifestyle_voyager |
| Way of the Nomad | nomadic_philosophy |

## 革新标签

主条目：革新

革新ID通常与其名称匹配。但以下革新使用了不同的ID：

| **革新** | **标签** |
|---|---|
| Currency | innovation_currency_01 |
| Public Works | innovation_development_01 |
| Onager | innovation_catapult |
| Chu-ko-nu | innovation_repeating_crossbow |
| Defensive Tactics | innovation_mobile_guards |
| Konni Raids | innovation_hussar_raids |
| Longships | innovation_longboats |
| West African Canoes | innovation_african_canoes |
| Coinage | innovation_currency_02 |
| Communal Development | innovation_development_02 |
| Household Soldiers | innovation_house_soldiers |
| Desert Mountain Practices | innovation_desert_mountain_herding |
| Stammesherzogtum | innovation_stem_duchies |
| Banking | innovation_currency_03 |
| Urbanization | innovation_development_03 |
| Ostsiedlung | innovation_east_settling |
| Promissory Notes | innovation_currency_04 |
| Renaissance Thought | innovation_development_04 |
| Stone Forts | innovation_burhs |

## 另见

- 昵称ID
- 决议ID

## 参考资料

| 文档 | 脚本编写 - 作用域 - 效果 - 条件 - 变量 - 修正 |
|---|---|
| 脚本编写 | AI - 书签 - 角色 - 命令 - 议会 - 文化 - 决议 - 宗族 - 事件 - 政体 - 历史 - 领地 - 生活方式 - 兵团 - 宗教 - 脚本值 - 故事线 - 斗争 - 头衔 - 特质 |
| 界面 | 界面 - 数据类型 - 本地化 - 自定义本地化 - 风格化 |
| 地图 | 地图 - 地形 |
| 图形 | 3D模型 - 导出器 - 纹章 - 图形资产 - 字体 - 粒子 - 着色器 - 单位模型 |
| 音频 | 音乐 - 音效 |
| 其他 | 控制台命令 - 校验和 - 模组结构 - 模组兼容性 - 模组工具 - 故障排除 |

- 可能过时
- 1.19
- 模组制作
