# 决斗（Duel）

> 原文来源: https://ck3.paradoxwikis.com/Duel
> 授权协议: CC BY-SA 3.0 (Paradox Wikis)

本文已针对游戏当前PC版本（1.20）进行了校验。

决斗（Duel）是两个角色在战场之外进行的战斗（Combat）。决斗可以持续到一方受伤（Wound）为止，也可以持续到一方死亡。以下角色不能参与决斗：儿童、拥有失明（Blind）、无能（Incapable）或怀孕（Pregnant）特质（Trait）的角色、拥有疾病特质的角色，以及年龄超过70岁且勇武（Prowess）低于10的角色。角色在决斗中会穿戴盔甲，但部落统治者会赤膊上阵。

## 发起挑战

决斗可以由事件触发，也可以由角色主动发起挑战。每个角色每5年只能发起一次挑战。如果被挑战者拒绝，将失去150威望（Prestige），而挑战者则获得150威望。决斗的接受与否取决于双方勇武的差距，以及被挑战者的好感度（Opinion）和性格。AI统治者不会挑战勇武比自己高15点以上的对手，除非他们的理性（Rationality）非常低。两个正在交战的统治者之间不能进行决斗。

| **类型** | **挑战者要求（满足任一）** | **对手要求** | **效果** |
| :--- | :--- | :--- | :--- |
| 宝物挑战（Artifact Challenge） | 对对手的一件宝物拥有宣称 | 挑战者宣称的宝物持有者 | 挑战者获胜则夺取所宣称的宝物。被挑战者获胜则挑战者失去对该宝物的宣称。 |
| 切磋（Sparring） | 骑士精神传统（Chivalry tradition）、骑士道传统（Futuwaa tradition）、坚定信仰个人教义（Unrelenting Faith personal tenet）（满足任一） | 骑士（Knight） | 胜者有75%的概率获得一个随机正面修正（持续10年），25%的概率获得一个随机负面修正（持续10年）。 |
| 单挑（Single Combat） | 坚毅领袖能力（Stalwart Leader perk）、尚武崇拜传统（Martial Admiration tradition）、亲卫队传统（Druzhina tradition）、游牧政府（Nomadic government）、惣領政府（Sōryō government）、脆弱和平传统（Fragile Peace tradition）、扩张政治运动（Expansion political movement）（满足任一） | 宿敌（Rival）或死敌（Nemesis） | 胜者降低压力（Stress），败者增加压力。 |
| 泄愤（Anger Release） | 易怒特质（Irritable trait）且压力等级1级以上 | — | 挑战者获得+5恐怖值（Dread）。胜者降低压力，败者增加压力。 |
| 惩罚（Punishment） | 暴怒特质（Wrathful trait） | 罪犯（非领主） | 挑战者获胜：若罪行允许处决，则被挑战者被处决；否则被囚禁。被挑战者获胜：挑战者获得100压力。 |
| 成人礼（Rite of Passage） | 成人礼决议（Rite of Passage decision） | 成年角色 | 挑战者获胜：在封臣和同文化角色中获得+10好感度，并获得-10%压力增长（持续10年）。被挑战者获胜：挑战者获得+25%压力增长（持续10年）。 |
| 勇武政变（Prowess Coup） | 试图推翻领主决议（Attempt to Overthrow Liege decision） | 领主 | 挑战者获胜则取代领主。败者死亡。可以使用个人勇士。 |
| 家族长挑战（House Head Challenge） | 家族团结度为冷漠（Impassive）、竞争（Competitive）或敌对（Antagonistic） | 家族长（House Head） | 挑战者获胜则成为新的家族长。被挑战者获胜则获得对挑战者的弱把柄（Weak Hook）。 |
| 决斗审判（Trial-by-Combat） | 表演荣誉传统（Performative Honor tradition） | 罪犯（非领主或封臣） | 挑战者可选择以金币（Gold）、压力（Stress）、弱把柄（Weak Hook）或死亡（Death）为赌注进行决斗。可以使用个人勇士。决斗胜方的荣誉勋章（Accolades）可获得+10至+250荣耀值（Glory），取决于胜者的勇武优势（介于+4到-20或更低之间）。击败宿敌还可额外获得+25荣耀值。 |

## 机制

每场决斗需要追踪两个数值：

- **胜利可能性（Likelihood of Success）**——衡量角色在攻防两方面的整体表现；在回合结束时，若此数值领先足够多，则以"技巧制胜"获得胜利。
- **受伤风险（Risk of Injury）**——衡量角色的冒进程度；当此数值足够接近角色自身的胜利可能性时，若该回合未能以技巧制胜，则可能因"失误落败"。失误落败的概率等于受伤风险超出胜利可能性的部分。若双方同时失误落败，则进攻方（通常是发起决斗的角色）获胜。

这两个数值在决斗过程中持续累积。所有决斗持续2到4个回合。从第三回合开始，无论以哪种方式获胜的可能性都会逐回合增加。若四个回合结束后仍未分出胜负，则勇武较高的角色以"突然死亡"方式获胜。若双方勇武相同，则以掷硬币决定胜负。

每个回合中，两位角色各会获得三个战斗招式（Combat Move）供选择；招式的出现概率主要取决于其勇武值：勇武越高，越有可能出现更好、更高效的招式。选择招式后，这些招式会以不同方式影响上述两个追踪数值，部分招式还有额外效果。在决斗过程中，角色可以获得或失去"决斗优势（Duel Edge）"，这会在该场决斗中修正角色的勇武值。

AI角色会根据其性格从可用招式中做出选择：

- 勇敢（Boldness）或复仇心（Vengefulness）高的角色会选择胜利可能性最高的招式
- 勇敢或复仇心低的角色会选择受伤风险最低的招式
- 理性（Rationality）高的角色会选择折中方案
- 勇敢、复仇心和理性均无明显倾向的角色会随机选择

| **战斗招式** | **胜利可能性** | **受伤风险** | **勇武要求** | **其他效果** |
| :--- | :--- | :--- | :--- | :--- |
| 静观其变（Wait & Hope） | 低 | 中 | 0-15 | — |
| 犹豫攻击（Unsure Attack） | 中 | 高 | 0-15 | — |
| 狂热冲锋（Enthusiastic Onslaught） | 高 | 极高 | 0-15 | — |
| 视线遮蔽（Clouded Vision） | 无 | 低 | 0-15 | 使对手的决斗优势-4 |
| 头槌（Headbutt） | 中 | 高 | 0-15 | 使双方的决斗优势-4 |
| 防御（Guard） | 低 | 低 | 6-20 | — |
| 试探攻击（Probing Attack） | 中 | 中 | 6-20 | — |
| 猛攻（Onslaught） | 高 | 高 | 6-20 | — |
| 踩踏（Put the Boot In） | 极高 | 极高 | 6-20 | — |
| 突袭（Surprise Attack） | 随机 | 中 | 6-20 | — |
| 嘲讽（Taunt） | 无 | 中 | 6-20 | 使对手获得压力增长修正 |
| 严密防守（Strict Guard） | 低 | 无 | 8+ | — |
| 自信攻击（Confident Attack） | 中 | 低 | 8+ | — |
| 精湛猛攻（Expert Onslaught） | 高 | 中 | 8+ | — |
| 闪电突击（Lightning Assault） | 极高 | 高 | 8+ | — |
| 消耗对手（Tire Opponent） | 低 | 无 | 8+ | 增加对手的受伤风险 |
| 尝试缴械（Attempt Disarm） | 低 | 中 | 12+ | 使对手的决斗优势-6 |

### 特殊招式

特殊战斗招式更加有效或能带来额外收益，但有特定的前提条件。当满足条件时，特殊招式有30%的概率取代普通招式出现。

| **战斗招式** | **胜利可能性** | **受伤风险** | **前提条件** | **其他效果** |
| :--- | :--- | :--- | :--- | :--- |
| 孤注一掷（Hail Mary） | 极高 | 高 | 勇武差距至少10点 | — |
| 瓦解士气（Disheartening Speech） | 无 | 中 | 外交（Diplomacy）技能至少18 | 每点外交值获得5威望 |
| 指挥若定（In Command） | 无 | 低 | 军事（Martial）技能至少18 | 若对手有傲慢（Arrogant）特质，使其决斗优势-2；若没有，则使其决斗优势-4 |
| 毒蛇般的攻击（Like a Viper） | 高 | 中 | 密谋（Intrigue）技能至少18 | 增加对手的受伤风险 |
| 传奇技法（Legendary Technique） | 高 | 低 | 学识（Learning）技能至少18 | — |
| 银色洞察（Silvered Vision） | 中 | 无 | 管理（Stewardship）技能至少18；拥有至少20金币；角色未残废（Maimed） | 花费20金币 |
| 嘲弄夸口（Mocking Boast） | 无 | 无 | 威望高于对手；对手没有谦逊（Humble）特质 | 使对手的决斗优势-2。若对手有傲慢特质，使其获得40压力；若没有，则获得20压力 |
| 地形大师（Master of Terrain） | 高 | 低 | 拥有在当前地形提供加成的任意特质 | 获得+2决斗优势 |
| 狂战士之怒（Berserkergang） | 极高 | 中 | 狂战士特质（Berserker trait） | 减少20压力 |
| 铁血勇气（Hard Grit） | 高 | 无 | 盾女特质（Shieldmaiden trait） | 获得+4决斗优势 |
| 虚晃刺击（Feint & Stab） | 高 | 中 | 猎手特质（Hunter trait） | 获得+4密谋修正（持续5年） |
| 屠杀（Butchery） | 高 | 中 | 劫掠者特质（Raider trait） | 每2点勇武获得2恐怖值 |
| 老兵沉稳（Stoic Veteran） | 中 | 无 | 瓦兰吉卫士特质（Varangian trait） | 获得健康（Health）增强修正（持续5年） |
| 剑舞（Blade Dance） | 高 | 低 | 剑术大师特质（Blademaster trait） | 每点勇武获得5威望 |
| 神圣之怒（Divine Wrath） | 低 | 无 | 狂信特质（Zealous trait） | 若对手信仰被视为"正统"，获得10虔诚（Piety）；被视为"偏离"，获得25虔诚；被视为"敌意"，获得50虔诚；被视为"邪恶"，获得75虔诚 |
| 痛苦驱动（Fueled by Pain） | 中 | 中 | 异端特质（Deviant trait）或秘密 | 若角色没有重伤（Severely Wounded）或残忍伤害（Brutally Mangled）特质，获得+2决斗优势；若有重伤特质，获得+4决斗优势；若有残忍伤害特质，获得+8决斗优势 |
| 暗藏秘密（Something to Hide） | 无 | 无 | 持有对手的把柄（Hook）；决斗不会以死亡结束 | 若持有弱把柄，获得+4决斗优势；若持有强把柄（Strong Hook），获得+8决斗优势 |
| 意外援助（An Unexpected Ally） | 极高 | 无 | 决斗地点在非洲、波斯、印度或缅甸；地形为农田（Farmlands）、泛滥平原（Floodplains）、丛林（Jungle）、绿洲（Oasis）或湿地（Wetlands）；决斗将以死亡结束 | 只能出现一次 |
