# County

> Source: https://ck3.paradoxwikis.com/County
> License: CC BY-SA 3.0 (Paradox Wikis)

Please help with verifying or updating older sections of this article.At least some were last verified for [version](https://ck3.paradoxwikis.com/CK3_Wiki:Versioning) 1.19.This article is for the PC version of Crusader Kings 3 only.


A **Count** is a character who controls at least one **County**. It is the second title rank available and the lowest rank that is playable. On the map, the territory of a county will contain multiple [Baronies](https://ck3.paradoxwikis.com/Barony) and cannot be altered. Each county belongs to a de jure [Duchy](https://ck3.paradoxwikis.com/Duchy), which also cannot be changed.


## Popular opinion


**Popular Opinion** represents the sentiment of the populace towards the county's direct owner. If Popular Opinion is negative, Populist or Peasant Factions can form in the County.

Each county has a culture and faith. If the ruler who owns the county title has a different faith, it will lose up to **-45** Popular Opinion depending on faith hostility and the county's faith's [] Fervor. If the ruler who owns the county title has a different culture, it will lose up to **-15** Popular Opinion depending on Cultural Acceptance and whether they speak the county's culture's language.

A county's culture and faith can be converted by assigning the relevant [Councilor Task](https://ck3.paradoxwikis.com/Council#Council_task). Note that the conversion has to be completed in one sitting; progress will be lost if the councilor assigned to the conversion task is reassigned to another task or County.

Offensive wars that last more than 6 months add **-0.5** Popular Opinion. This modifier will gradually decay at **+0.5** per month after the war ends. If another offensive war is started before the penalty decayed completely, there is no grace period and the penalty will begin to accumulate immediately.


## Control


**Control** represents the power a landed Count has over their County and ranges from 0 to 100. It can be decreased from events, baronies being captured in sieges (unless title holder has *Enduring Hardships* perk), or being forcefully seized (**-75**). Control increases at a rate of **0.1** per month and can be increased faster with the [](https://ck3.paradoxwikis.com/File:Task_increase_control.png) Increase Control in County councilor task.

Every point of Control below 100 brings the following penalties:

- [] **-1%** Tax

- [] **-0.5%** Levies

- [] by **+0.6%** Danger

- [] **-1%** County Fertility


If the title holder has the Absolute Control perk when Control is 100 it will read as *Absolute* and the county will provide an additional **+10%** [] Taxes and **+5%** [] Levies.


## Development


**Development** is the measurement of technological advancement and general infrastructure in a county and ranges from 0 to 100.  Each point of development increases a county's [] Supply limit by **+150**. The average development of counties following a culture will affect that culture's adoption rate of [innovations](https://ck3.paradoxwikis.com/Innovations) by **0.02** per average level.

If the county is ruled by a [] Feudal, [] Clan or [] Administrative ruler, each point of development also provides **+0.5%** [] Taxes and [] Levies.

Development levels of 10/20/40 or higher also give increasing penalties to the [] Hunt success chance in the county.


### Development growth


Increasing county development by 1 requires accumulating 100 development growth.

Development radiates outwards from high-development counties to all other counties connected by a land route at **0.1** per difference in development level between these two counties.

Development growth can be most significantly increased via the steward's * **Increase Development in County** task in the [council](https://ck3.paradoxwikis.com/Council). However, when performing this task an **existing development** penalty decreasing monthly development growth from it is also applied. The maximum penalty is reached at 10 development, but each era has a civic innovation that will raise the development level at which it is reached: 20, 35, 55, and finally 90. **The steward's culture must know these innovations for them to apply**, your character's culture and the culture of the county are irrelevant (may not be working as intended as there is currently also a UI bug)*.

The monthly development growth from the **Increase Development in County** task is calculated as follows:

- ( 0.1 + 0.175 * * Councilor stewardship ) * (1 - existing development penalty*)


*existing development penalty* is capped at 87.5%:

- *existing development penalty* = min( 0.875, development/100 * 9.13 * *Innovation development* )


*Innovation development* applies only if your steward's culture knows the following civic innovations:

- Public Works = 0.5

- Communal Government = 0.2856

- Urbanization = 0.1818

- Renaissance Thought = 0.1111


In addition to not being able to research these innovations past tribal era, tribals also get a **x0.5** penalty to development growth increase. The penalty can be avoided by having a feudal liege, vassal or lower rank neighbor. It's not clear if it is working completely as intended.

Development can also be increased by **+0.3** monthly in your realm capital through the centralization perk in the stewardship [lifestyle](https://ck3.paradoxwikis.com/Lifestyle) or by certain special [buildings](https://ck3.paradoxwikis.com/Building), but it is still a fairly slow process. Development growth receives positive modifiers from economic buildings, civic [innovations](https://ck3.paradoxwikis.com/Innovation) (one every era for **+10%** [] Development Growth), the 3rd erudition [legacy](https://ck3.paradoxwikis.com/Legacy) (**+20%** [] Development Growth). [Terrain](https://ck3.paradoxwikis.com/Terrain) can provide a positive or negative modifier, same as event modifiers such as [corruption](https://ck3.paradoxwikis.com/Corruption). Modifiers are applied additively after the penalty has been subtracted.


#### Sources of development growth:


| ****
| **[] monthly development growth**|

| From neighbors
| **+0.1** per difference to neighbors|

| Increase Development in County councilor task
| see above|

| Court gardener
| **+0.1** to **+0.7** Development growth in realm capital|

| Buildings
| varies|

| Artifacts
| varies|


## Corruption


**Corruption** includes various negative modifiers that can appear for 10 years in a County if Control falls below **35%** or the title holder is in Debt for more than 3 months. They can also be added for 5 years by the *Collect Taxes* councilor action if the Steward has low skill (Stewardship). A county can have up to 3 Corruption modifiers at the same time. Corruption modifiers can be removed by the Marshal task "Increase Control"; one Corruption modifier can be removed by this task immediately if Control is at 100, at the cost of **-25** Control.


| **Modifier**
| **Effects**|

| [](https://ck3.paradoxwikis.com/File:Modifier_outdoors_negative.png)
Bandits Running RampantBandits roam freely in the County
| [] **-20%** Holding Taxes
[] **-50%** Monthly Development Growth|

| [](https://ck3.paradoxwikis.com/File:Modifier_martial_negative.png)
Deserting LeviesLevies are deserting in great numbers in this County
| [] **-30%** Levy Size|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
Distrust of CourtsThere are not enough courts to sit in judgement in peasant cases in this County
| [] **-25** Popular Opinion|

| [](https://ck3.paradoxwikis.com/File:Modifier_economy_negative.png)
Incompetent Tax CollectionTax collection efforts are failing in this County
| [] **-40%** Holding Taxes|

| [](https://ck3.paradoxwikis.com/File:Modifier_letter_negative.png)
Inefficient CensusWe have no idea who or how many people live in this County
| [] **-20%** Holding Taxes
[] **-30%** Garrison Size|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_corruption_negative.png)
Lack of SheriffsThere are not enough sheriffs to handle all the territory in this County
| [] **-20%** Holding Taxes
[] **-30%** Monthly Development Growth
[] **-10** Popular Opinion|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_control_negative.png)
Lackluster AdministrationWe can no longer fund the proper administration of the County
| [] **-50%** Levy Reinforcement Rate
[] **-1** Monthly Control|

| [](https://ck3.paradoxwikis.com/File:Modifier_family_negative.png)
Smuggling RingsSmugglers are running rampant throughout the County
| [] **-30%** Supply Limit
[] **-30%** Monthly Development Growth|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_development_negative.png)
Thieves GuildA thieves' guild is operating freely in this County
| [] **-10%** Holding Taxes
[] **-80%** Monthly Development Growth|

| [](https://ck3.paradoxwikis.com/File:Modifier_stewardship_negative.png)
Uncooperative GuildsThe local guilds are reluctant to cooperate with us
| [] **+25%** Building Construction Time
[] **+25%** Building Construction Cost|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
Unsafe HighwaysThe highways of this County are less safe than wandering through the forest at night
| [] **-20%** Monthly Development Growth
[] **-10** Popular Opinion|


### Fomented Revolts


| [](https://ck3.paradoxwikis.com/All_Under_Heaven)
| Available only with the [All Under Heaven](https://ck3.paradoxwikis.com/All_Under_Heaven) DLC enabled.|


Fomented Revolts is a form of corruption that can only be created by characters who have a [](https://ck3.paradoxwikis.com/File:Domicile_astrologer_yurt.png) Yamen Grievance Drum estate upgrade at level 3 or 4. They come in 3 levels of severity depending on how much the character who uses the interaction pays.


| **Modifier**
| **[] Monthly Control**
| **[] Popular Opinion**
| **[] Development Growth**|

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
Peasant OutcryPeasants are voicing their concerns under foreign influence in this County
| **-0.1**
| **-25**
||

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
Peasant OutragePeasants are agitated by foreign agents and refuse to work in this County
| **-0.25**
| **-50**
||

| [](https://ck3.paradoxwikis.com/File:Modifier_county_opinion_negative.png)
Peasant RiotsPeasants are instigated by foreign propaganda into rioting all over this County
| **-0.5**
| **-100**
| **-25%**|


## County Fertility


| [](https://ck3.paradoxwikis.com/Khans_of_the_Steppe)
| Available only with the [Khans of the Steppe](https://ck3.paradoxwikis.com/Khans_of_the_Steppe) DLC enabled.|


[County Fertility](https://ck3.paradoxwikis.com/index.php?title=County_Fertility&action=edit&redlink=1) affects [] [Herd](https://ck3.paradoxwikis.com/Herd). Things like [steppe season](https://ck3.paradoxwikis.com/Situation#Steppe_seasons), [Terrain](https://ck3.paradoxwikis.com/Barony#Terrain), [Holding type](https://ck3.paradoxwikis.com/Barony#Holdings), and more affects County Fertility & Fertility Growth.


## Siberian permafrost


| [](https://ck3.paradoxwikis.com/Khans_of_the_Steppe)
| Available only with the [Khans of the Steppe](https://ck3.paradoxwikis.com/Khans_of_the_Steppe) DLC enabled.|


Counties in the region of Siberia are affected by Siberian Permafrost, which affects the county differently depending on where its owner's culture has the Tribes of the North tradition.


| **[Yes] Tribes of the North tradition**
| **[No] Tribes of the North tradition**|

| [] **-6** Monthly Development
[] **-60%** Building Construction Cost in Forest and Taiga terrain
[] **+6** Defender Advantage
[] **+1** Building Slots
| [] **-6** Monthly Development
[] **+600%** Building Construction Cost in Forest and Taiga terrain
[] **-6** Monthly Control|


Feudalizing the county's holding costs 2500 [] Gold but removes the permafrost.


## References


**[Mechanics](https://ck3.paradoxwikis.com/Mechanics)**


| Characters
| [Characters](https://ck3.paradoxwikis.com/Character) • [Attributes](https://ck3.paradoxwikis.com/Attributes) • [Traits](https://ck3.paradoxwikis.com/Traits) • [Resources](https://ck3.paradoxwikis.com/Resources) • [Modifiers](https://ck3.paradoxwikis.com/Modifiers) • [Lifestyle](https://ck3.paradoxwikis.com/Lifestyle) • [Family](https://ck3.paradoxwikis.com/Family_(relation)) • [Dynasty](https://ck3.paradoxwikis.com/Dynasty) • [Schemes](https://ck3.paradoxwikis.com/Schemes) • [Hooks](https://ck3.paradoxwikis.com/Hooks) • [Activities](https://ck3.paradoxwikis.com/Activity) • [Artifacts](https://ck3.paradoxwikis.com/Artifacts) • [Interactions](https://ck3.paradoxwikis.com/Interactions) • [Travel](https://ck3.paradoxwikis.com/Travel) • [Adventurers](https://ck3.paradoxwikis.com/Adventurer) • [Prisoners](https://ck3.paradoxwikis.com/Prisoner)|


| Realm & Governance
| [Council](https://ck3.paradoxwikis.com/Council) • [Court](https://ck3.paradoxwikis.com/Court) • [Power sharing](https://ck3.paradoxwikis.com/Power_sharing) • [Subjects](https://ck3.paradoxwikis.com/Subjects) • [Succession](https://ck3.paradoxwikis.com/Succession) • [Government](https://ck3.paradoxwikis.com/Government) • [Laws](https://ck3.paradoxwikis.com/Laws) • [Decisions](https://ck3.paradoxwikis.com/Decisions) • [Titles](https://ck3.paradoxwikis.com/Titles) • [Barony](https://ck3.paradoxwikis.com/Barony) • County • [Buildings](https://ck3.paradoxwikis.com/Buildings) • [Royal court](https://ck3.paradoxwikis.com/Royal_court) • [Domiciles](https://ck3.paradoxwikis.com/Domicile) • [Great projects](https://ck3.paradoxwikis.com/Great_projects)|


| Warfare
| [Warfare](https://ck3.paradoxwikis.com/Warfare) • [Casus belli](https://ck3.paradoxwikis.com/Casus_belli) • [Alliance](https://ck3.paradoxwikis.com/Alliance) • [Army](https://ck3.paradoxwikis.com/Army) • [Hired forces](https://ck3.paradoxwikis.com/Hired_forces) • [Knights](https://ck3.paradoxwikis.com/Knight) • [Duel](https://ck3.paradoxwikis.com/Duel) • [Situations](https://ck3.paradoxwikis.com/Situation)|


| Culture & Faith
| [Culture](https://ck3.paradoxwikis.com/Culture) • [Traditions](https://ck3.paradoxwikis.com/Traditions) • [Innovations](https://ck3.paradoxwikis.com/Innovation) • [Form of Address](https://ck3.paradoxwikis.com/Form_of_address) • [Faith](https://ck3.paradoxwikis.com/Faith) • [Doctrines](https://ck3.paradoxwikis.com/Doctrines) • [Tenets](https://ck3.paradoxwikis.com/Tenets) • [Holy sites](https://ck3.paradoxwikis.com/Holy_sites)|


| Meta
| [Modding](https://ck3.paradoxwikis.com/Modding) • [Patches](https://ck3.paradoxwikis.com/Patches) • [Downloadable content](https://ck3.paradoxwikis.com/Downloadable_content) • [Developer diaries](https://ck3.paradoxwikis.com/Developer_diaries) • [Achievements](https://ck3.paradoxwikis.com/Achievement) • [Jargon](https://ck3.paradoxwikis.com/Jargon) • [Bookmarks](https://ck3.paradoxwikis.com/Bookmarks) • [Interesting characters](https://ck3.paradoxwikis.com/Interesting_characters) • [Ruler Designer](https://ck3.paradoxwikis.com/Ruler_Designer) • [Game rules](https://ck3.paradoxwikis.com/Game_rules)|


Retrieved from "[https://ck3.paradoxwikis.com/index.php?title=County&oldid=35075](https://ck3.paradoxwikis.com/index.php?title=County&oldid=35075)"
		[Categories](https://ck3.paradoxwikis.com/Special:Categories): - [Potentially outdated](https://ck3.paradoxwikis.com/Category:Potentially_outdated)
- [1.19](https://ck3.paradoxwikis.com/Category:1.19)
- [Realm](https://ck3.paradoxwikis.com/Category:Realm)
