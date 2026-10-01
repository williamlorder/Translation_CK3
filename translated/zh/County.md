# 伯爵领

> 原文来源: https://ck3.paradoxwikis.com/County
> 授权协议: CC BY-SA 3.0 (Paradox Wikis)

请协助验证或更新本文中较旧的章节。至少部分内容最后验证于[版本](https://ck3.paradoxwikis.com/CK3_Wiki:Versioning) 1.19。本文仅适用于《十字军之王3》PC版。


**伯爵**是控制至少一个**伯爵领 (County)** 的角色。伯爵领是可用的第二级头衔 (Title)，也是可游玩的最低等级。在地图上，一个伯爵领的领土包含多个[男爵领 (Barony)](https://ck3.paradoxwikis.com/Barony)，且无法更改。每个伯爵领都属于一个法理 (De jure) [公爵领 (Duchy)](https://ck3.paradoxwikis.com/Duchy)，同样无法更改。


## 民众好感度


**民众好感度 (Popular Opinion)** 代表民众对伯爵领直接领主的态度。如果民众好感度为负值，伯爵领中可能会形成民粹派系或农民派系。

每个伯爵领都有一种文化 (Culture) 和信仰 (Faith)。如果拥有该伯爵领头衔的统治者信仰不同，将会根据信仰敌对程度和该伯爵领信仰的 [] 狂热度损失最多 **-45** 民众好感度。如果拥有该伯爵领头衔的统治者文化不同，将会根据文化接受度以及统治者是否通晓该伯爵领文化的语言，损失最多 **-15** 民众好感度。

伯爵领的文化和信仰可以通过指派相应的[议政官任务](https://ck3.paradoxwikis.com/Council#Council_task)来进行转化。请注意，转化必须一次性完成；如果被指派转化任务的议政官被重新分配到其他任务或其他伯爵领，进度将会丢失。

持续超过6个月的进攻性战争会增加 **-0.5** 民众好感度。该修正值将在战争结束后以每月 **+0.5** 的速率逐渐衰减。如果在惩罚完全衰减之前开始另一场进攻性战争，则没有宽限期，惩罚将立即开始累积。


## 控制度


**控制度 (Control)** 代表拥有领地的伯爵对其伯爵领的掌控力，范围从0到100。控制度可能因事件、男爵领在围城中被攻占（除非头衔持有者拥有*坚忍不拔*特长）或被强行夺取（**-75**）而降低。控制度以每月 **0.1** 的速率增长，可以通过 [](https://ck3.paradoxwikis.com/File:Task_increase_control.png) 提高伯爵领控制度议政官任务来更快地提升。

控制度每低于100一点，将带来以下惩罚：

- [] **-1%** 税收 (Tax)

- [] **-0.5%** 征召兵 (Levy)

- [] **+0.6%** 危险度

- [] **-1%** 伯爵领肥沃度


如果头衔持有者在控制度为100时拥有绝对控制特长，控制度将显示为*绝对*，伯爵领将额外提供 **+10%** [] 税收和 **+5%** [] 征召兵。


## 发展度


**发展度 (Development)** 是衡量伯爵领技术进步和基础设施水平的指标，范围从0到100。每点发展度使伯爵领的 [] 补给上限增加 **+150**。遵循某一文化的伯爵领的平均发展度将以每平均等级 **0.02** 的比率影响该文化对[革新](https://ck3.paradoxwikis.com/Innovations)的采纳速度。

如果伯爵领由 [] 封建制、[] 氏族制或 [] 行政制统治者统治，每点发展度还额外提供 **+0.5%** [] 税收和 [] 征召兵。

发展度达到10/20/40或更高时，还会对伯爵领内的 [] 狩猎成功率造成递增的惩罚。


### 发展度增长


将伯爵领发展度提升1点需要累积100点发展度增长。

发展度从高发展度伯爵领向所有通过陆路连接的其他伯爵领辐射扩散，速率为两个伯爵领之间每点发展度差异 **0.1**。

发展度增长最显著的提升方式是通过管家的***提高伯爵领发展度***[议政会](https://ck3.paradoxwikis.com/Council)任务。然而，执行此任务时还会施加一个**现有发展度**惩罚，降低由此产生的每月发展度增长。最大惩罚在发展度为10时达到，但每个时代都有一项民政革新会提高达到最大惩罚的发展度门槛：分别为20、35、55，最终为90。**管家的文化必须掌握这些革新才能生效**，你的角色的文化和伯爵领的文化无关（可能未按预期运作，因为目前还存在UI错误）*。

***提高伯爵领发展度***任务的每月发展度增长计算如下：

- ( 0.1 + 0.175 * *议政官管理能力* ) * (1 - 现有发展度惩罚*)


*现有发展度惩罚*上限为87.5%：

- *现有发展度惩罚* = min( 0.875, 发展度/100 * 9.13 * *革新发展度* )


*革新发展度*仅在你的管家文化掌握以下民政革新时生效：

- 公共工程 = 0.5

- 社区治理 = 0.2856

- 城市化 = 0.1818

- 文艺复兴思潮 = 0.1111


除了无法研究部落时代之后的这些革新外，部落制还会受到 **x0.5** 的发展度增长惩罚。拥有封建制领主、封臣或低级邻国可以避免该惩罚。目前尚不清楚该机制是否完全按预期运作。

发展度还可以通过管理[生活方式](https://ck3.paradoxwikis.com/Lifestyle)中的集权化特长在你的领国首都每月增加 **+0.3**，或通过某些特殊[建筑 (Building)](https://ck3.paradoxwikis.com/Building)来提升，但这仍然是一个相当缓慢的过程。发展度增长可从经济建筑、民政[革新](https://ck3.paradoxwikis.com/Innovation)（每个时代一项，提供 **+10%** [] 发展度增长）、第三级博学[传承](https://ck3.paradoxwikis.com/Legacy)（**+20%** [] 发展度增长）获得正面修正。[地形](https://ck3.paradoxwikis.com/Terrain)可以提供正面或负面修正，事件修正（如[腐败](https://ck3.paradoxwikis.com/Corruption)）同理。修正值在扣除惩罚后以加法方式叠加。


#### 发展度增长来源：


| ****
| **[] 每月发展度增长**|

| 邻近辐射
| 与邻近伯爵领每点差异 **+0.1**|

| 提高伯爵领发展度议政官任务
| 见上文|

| 宫廷园丁
| 领国首都 **+0.1** 至 **+0.7** 发展度增长|

| 建筑
| 各异|

| 宝物
| 各异|


## 腐败


**腐败 (Corruption)** 包括多种负面修正，当控制度降至 **35%** 以下或头衔持有者负债超过3个月时，可在伯爵领中出现并持续10年。管家的*征收税款*议政官行动在管家技能（管理）较低时，也可能施加持续5年的腐败修正。一个伯爵领同时最多可拥有3个腐败修正。腐败修正可通过统帅任务"提高控制度"来移除；如果控制度为100，该任务可以立即移除一个腐败修正，代价是 **-25** 控制度。


| **修正**
| **效果**|

| [](https://ck3.paradoxwikis.com/File:Modifier_outdoors_negative.png)
盗匪横行——盗匪在伯爵领中自由游荡
| [] **-20%** 地产 (Holding) 税收
[] **-50%** 每月发展度增长|

| [](https://ck3.paradoxwikis.com/File:Modifier_martial_negative.png)
征召兵逃散——该伯爵领中大量征召兵正在逃散
| [] **-30%** 征召兵规模|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
对法庭的不信任——该伯爵领中没有足够的法庭来审理农民案件
| [] **-25** 民众好感度|

| [](https://ck3.paradoxwikis.com/File:Modifier_economy_negative.png)
无能的税收征管——该伯爵领中的税收征管工作正在失败
| [] **-40%** 地产税收|

| [](https://ck3.paradoxwikis.com/File:Modifier_letter_negative.png)
低效的人口普查——我们不知道该伯爵领中住着什么人以及有多少人
| [] **-20%** 地产税收
[] **-30%** 驻军规模|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_corruption_negative.png)
缺乏治安官——没有足够的治安官来管辖该伯爵领的全部领土
| [] **-20%** 地产税收
[] **-30%** 每月发展度增长
[] **-10** 民众好感度|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_control_negative.png)
行政松懈——我们无法再为伯爵领的正常行政提供资金
| [] **-50%** 征召兵补充速率
[] **-1** 每月控制度|

| [](https://ck3.paradoxwikis.com/File:Modifier_family_negative.png)
走私集团——走私者在伯爵领各处猖獗活动
| [] **-30%** 补给上限
[] **-30%** 每月发展度增长|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_development_negative.png)
盗贼公会——一个盗贼公会在该伯爵领中自由活动
| [] **-10%** 地产税收
[] **-80%** 每月发展度增长|

| [](https://ck3.paradoxwikis.com/File:Modifier_stewardship_negative.png)
不合作的行会——当地行会不愿与我们合作
| [] **+25%** 建筑建造时间
[] **+25%** 建筑建造费用|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
不安全的道路——该伯爵领的道路比夜间穿越森林还要危险
| [] **-20%** 每月发展度增长
[] **-10** 民众好感度|


### 煽动叛乱


| [](https://ck3.paradoxwikis.com/All_Under_Heaven)
| 仅在启用[万邦来朝](https://ck3.paradoxwikis.com/All_Under_Heaven) DLC时可用。|


煽动叛乱是一种特殊的腐败形式，只能由拥有 [](https://ck3.paradoxwikis.com/File:Domicile_astrologer_yurt.png) 衙门击鼓鸣冤庄园升级（3级或4级）的角色发起。根据使用该互动的角色所支付的费用，分为3个严重程度等级。


| **修正**
| **[] 每月控制度**
| **[] 民众好感度**
| **[] 发展度增长**|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
农民抗议——农民在外国势力影响下表达不满
| **-0.1**
| **-25**
||

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
农民愤怒——农民被外国代理人煽动，拒绝在该伯爵领中劳作
| **-0.25**
| **-50**
||

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
农民暴动——农民被外国宣传煽动，在伯爵领各地暴动
| **-0.5**
| **-100**
| **-25%**|


## 伯爵领肥沃度


| [](https://ck3.paradoxwikis.com/Khans_of_the_Steppe)
| 仅在启用[草原可汗](https://ck3.paradoxwikis.com/Khans_of_the_Steppe) DLC时可用。|


[伯爵领肥沃度](https://ck3.paradoxwikis.com/index.php?title=County_Fertility&action=edit&redlink=1)影响 [] [畜群](https://ck3.paradoxwikis.com/Herd)。[草原季节](https://ck3.paradoxwikis.com/Situation#Steppe_seasons)、[地形](https://ck3.paradoxwikis.com/Barony#Terrain)、[地产类型](https://ck3.paradoxwikis.com/Barony#Holdings)等因素会影响伯爵领肥沃度和肥沃度增长。


## 西伯利亚永久冻土


| [](https://ck3.paradoxwikis.com/Khans_of_the_Steppe)
| 仅在启用[草原可汗](https://ck3.paradoxwikis.com/Khans_of_the_Steppe) DLC时可用。|


西伯利亚地区的伯爵领受到西伯利亚永久冻土的影响，其效果取决于领主的文化是否拥有北方部落传统。


| **[有] 北方部落传统**
| **[无] 北方部落传统**|

| [] **-6** 每月发展度
[] **-60%** 森林和针叶林地形的建筑建造费用
[] **+6** 防御方优势
[] **+1** 建筑槽位
| [] **-6** 每月发展度
[] **+600%** 森林和针叶林地形的建筑建造费用
[] **-6** 每月控制度|


将伯爵领的地产封建化需花费2500 [] 金币，但可以移除永久冻土效果。
