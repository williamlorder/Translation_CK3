# Modding

> Source: https://ck3.paradoxwikis.com/Modding
> License: CC BY-SA 3.0 (Paradox Wikis)

This article is timeless and should be accurate for any version of the game.

Modding, or creating mods, is the act of modifying the assets or behavior of the game either for personal use, or to release publicly to other players, for instance via Paradox Mods or the Steam Workshop.

Crusader Kings III is moddable to a great extent and the goals of modders may vary: more events or decisions, better map and models, total conversions, accessibility, translations, etc.

Modding CK3 doesn't require knowledge of any programming language and most of it can be done with a simple text editor. The game uses its own scripting language that is intended to be easy to use and learn. However, this puts some limits on what can be modded, compared to other games.

Mods no longer disable achievements since 1.9 patch. Mods also don't invalidate ironman saves. In multiplayer, all players must use the same mods in the same load order.

This article is a brief introduction to CK3 modding. To learn more, inspect game files and other mods, experiment on your own and join the modding discord.

## Tips & guidelines

### Must know

- Use -debug_mode -develop launch options to hot-reload files as you edit them and use the console
- Use a good text editor, like VSC with Paradox Modding Toolkit
- Always check the error log! It's in Documents/Paradox Interactive/Crusader Kings III/logs/error.log
- Use script_docs and dump_data_types console commands to create logs of all effects, triggers, etc you can use. Logs created in the same logs folder as above.
- If you subscribe to your own mod, remove the local version of it! Otherwise it will not work.

### File reloading

Start the game with -debug_mode -develop launch options to instantly reload files and use the console.

- On Steam: right-click the game on Steam -> Properties ->  add -debug_mode -develop to Launch Options at the bottom
- Windows: Create a shortcut for the .exe file -> right-click it -> Properties -> add -debug_mode -develop at the end of the Target field
- Windows Xbox Game Pass: Open 'Command Prompt' and run 'start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode -develop'
Some files may still require restarting the game, but most of them will reload.

### Text editor and tools

Use a good text editor to help you mod, not the default notepad. Benefits of a text editor:

- search through the contents of all files in the game
- auto-complete
- syntax highlighting and auto-formatting
This greatly speeds up the process and helps us prevent errors.
The following editors, aside from Intellij IDEA, are free:

- Visual Studio Code - fast and robust, best choice if you're starting.
Has extensions:
Paradox Modding Toolkit - good auto-complete, syntax highlighting, integrates CK3 Tiger for error validation. If you're new, just use this one.
CK3 Tiger - error validation, can be used as standalone
CWTools - outdated extension, shows many false errors and has unreliable auto-complete. Includes Paradox Syntax Highlighting
Paradox Highlight - a newer option for syntax highlighting
All Autocomplete - will help catch things for autocomplete missed by other extensions
- Has extensions:
Paradox Modding Toolkit - good auto-complete, syntax highlighting, integrates CK3 Tiger for error validation. If you're new, just use this one.
CK3 Tiger - error validation, can be used as standalone
CWTools - outdated extension, shows many false errors and has unreliable auto-complete. Includes Paradox Syntax Highlighting
Paradox Highlight - a newer option for syntax highlighting
All Autocomplete - will help catch things for autocomplete missed by other extensions
- Paradox Modding Toolkit - good auto-complete, syntax highlighting, integrates CK3 Tiger for error validation. If you're new, just use this one.
- CK3 Tiger - error validation, can be used as standalone
- CWTools - outdated extension, shows many false errors and has unreliable auto-complete. Includes Paradox Syntax Highlighting
- Paradox Highlight - a newer option for syntax highlighting
- All Autocomplete - will help catch things for autocomplete missed by other extensions
- Sublime Text
Has a developer-made extension: CK3 Tools with syntax highlighting and completions.
Tip: if you want to toggle comments in Sublime, you also need to add this file to the "User" folder.
- Has a developer-made extension: CK3 Tools with syntax highlighting and completions.
- Tip: if you want to toggle comments in Sublime, you also need to add this file to the "User" folder.
- Notepad++.
Tip: choose Perl as your language for syntax highlighting. To set it as default, go to Settings, Styler Configurator, find Perl in the list on the left and add "gui txt" (without quotes) to the "User ext." field at the bottom.
- Tip: choose Perl as your language for syntax highlighting. To set it as default, go to Settings, Styler Configurator, find Perl in the list on the left and add "gui txt" (without quotes) to the "User ext." field at the bottom.
- Intellij IDEA.
Has a fan-made Paradox Language Support plugin with syntax highlighting and validation. To install it, go to File -> Settings -> Plugins and search for "Paradox Language Support".
- Has a fan-made Paradox Language Support plugin with syntax highlighting and validation. To install it, go to File -> Settings -> Plugins and search for "Paradox Language Support".
- Pulsar (fork of Atom).
Note: doesn't include UTF-8-BOM encoding needed for localization files! Might need to re-save them in another editor.
Tip: choose Perl 6 as your language for highlighting. To set it as default, go to File, Config, find "core:" and add below it: "customFileTypes: "source.perl6": [ "txt" "gui"]", like in this example.
- Note: doesn't include UTF-8-BOM encoding needed for localization files! Might need to re-save them in another editor.
- Tip: choose Perl 6 as your language for highlighting. To set it as default, go to File, Config, find "core:" and add below it: "customFileTypes: "source.perl6": [ "txt" "gui"]", like in this example.

### Logs

Always check the error log!

You will make mistakes. The error log will report them. Add it to your editor and try to keep it clean.

It's located in Documents/Paradox Interactive/Crusader Kings III/logs/error.log

Related console commands:

- release_mode - shows a tracker, called Errorhoof, with the number of errors so you don't miss when they appear
- log_viewer - opens in-game log, which also includes debug.log (can be filtered at the top)
Note: the log will report errors even in an unmodded game. Launch the game without any mods and let it run for a while to learn which errors are common and not caused by you.

We can use effects error_log and debug_log to send information to the respective logs. This can help test your script, so you know it executes right.

The log folder also has lists of effects, triggers and scopes - this is what you can actually use in script

Use script_docs and dump_data_types console commands in the game to generate them.

On Linux this directory is ~/.local/share/Paradox Interactive/Crusader Kings III

Debug mode shortcuts - with debug mode enabled, we have extra clicks for characters:

- Ctrl+click - switch to this character
- Alt+click - kill the character
- Ctrl+Alt+click - open the character in the Explorer.
Explorer lets us easily run effects and triggers on game objects. The console has a button to open it.

The console can also run script. Add the word effect or trigger first, like this: effect add_gold = 100 or trigger is_adult = yes

### Other tips

- Remove your local copy of the mod when you subscribe to the Steam version! Otherwise the mod will not work in the game. The launcher needs to have only one version of your mod: local or Steam. (You can also remove the .mod file or change its extension, rather than deleting the whole mod folder) You don't need to subscribe to your own mod to test it, if it was uploaded without errors, it will work for others.
- Create a mod for your modifications: use a personal mod even for minor changes, and never directly modify the game files in the CK3 game folder as they may be overwritten without warning.
- Communicate key facts about your mod:
List the main changes and additions at the top of the description. To help with compatibility, you may add a list of changed files at the bottom.
Provide links to your mod on other platforms (Workshop, Paradox Mods, forums).
- List the main changes and additions at the top of the description. To help with compatibility, you may add a list of changed files at the bottom.
- Provide links to your mod on other platforms (Workshop, Paradox Mods, forums).
- When possible, upload your mod to all platforms, especially if it is popular. Not everybody owns the game on Steam.
- Backup your work. Either manually or with a source control system like Git. Consider using GitHub and Discord for team collaboration.
- Use a proper merge tool (like WinMerge) to merge between folders and update modified files for a new patch.
- If you're replacing text across dozens or hundreds lines of code, regular expressions may save a lot of time. They are available in all of the text editors above. Learning resources: RegexOne, RegExr.
- Win+V opens your clipboard history. You'll be copying a lot of text while modding, and this lets you access older copied entries without going back to their source.
- Join CK3 Modding discord to ask any questions and help others
- The Modding Git Guide is a community made guide for using Git, GitHub/GitLab, and related tools such as KDiff3. It can be a useful stop for questions beyond this wiki, and contains step by step guides for much of what is talked about here. Though the examples are HOI4 based, the principles apply equally well to any Paradox game mod.
- You can change the path where the launcher and the game saves user specific data:
The launcher's settings file is steamapps\common\Crusader Kings III\launcher\launcher-settings.json. Edit the gameDataPath key to change the location.
For the game data you need to create the file steamapps\common\Crusader Kings III\game\userdir.txt with the content being the absolute path where the game should save it's data. For example: C:/Users/username/AppData/Local/Paradox Interactive/Crusader Kings III/. Note that the path must end with a /.
- The launcher's settings file is steamapps\common\Crusader Kings III\launcher\launcher-settings.json. Edit the gameDataPath key to change the location.
- For the game data you need to create the file steamapps\common\Crusader Kings III\game\userdir.txt with the content being the absolute path where the game should save it's data. For example: C:/Users/username/AppData/Local/Paradox Interactive/Crusader Kings III/. Note that the path must end with a /.

### Localization Files

- *.yml files in the localization folder must be saved with UTF-8 + BOM encoding to be read properly by the game.
- filenames need to be saved in the form as *l_<language>.yml for the game to read the file correctly. For example council_l_english.yml.
You must use the US spelling of "localization". The Commonwealth spelling of "localisation" will not work.
Note, l_ is a lower case L, as in language, not capital i.
- You must use the US spelling of "localization". The Commonwealth spelling of "localisation" will not work.
- Note, l_ is a lower case L, as in language, not capital i.
- To overwrite existing localization values, put your files with changes into a folder named "replace" within the localization folder.
- If a mod only has English localization, any player using a different language will see unlocalized strings_like_this. It is better to copy your localization for other languages, even if you don't provide a translation. Modding discord has a tool to copy all the files and rename their language markers in one click.

### Launch options

Can be added to Steam game properties or to a desktop shortcut to the game's exe file, in the Target field. This can let you bypass the launcher.

-debug_mode - enables debug tooltips and interactions

-develop - enables hot reload of most files as soon as they are saved

-mapeditor - opens the map editor

-skip - skips the main menu and loads directly to the character selection lobby in the 1066 start date

-play=e_hre - skips the menu and load directly as the character holding the title in the 1066 start date

- title names can be found in debug tooltips in the game. Other examples: -play=d_apulia, -play=k_poland
-continuelastsave - load the last save, same as pressing Resume in the launcher

-debug_controller_camera - adds support for controlling camera with a controller (before 1.9 it was -handle_controller_input)

-nographics - launches the game without creating a window or rendering anything and starts an observer game

-random_seed=42 - launches the game with a fixed RNG seed (in this example 42), works only in combination with -debug_mode

-benchmark - runs an automated test for 1.5 years, moving the camera around and opening various windows. Outputs timer_dump logs showing how much time each tick took to process (convert them to tables and make graphs to analyze)

## Creating a mod

Main article: Mod structure#Creating initial files

It is recommended to use the game launcher to create initial mod files:

- Open the game launcher.
- Go to Mod library on the left.
- Press Upload Mod in the top right.
- Press Create a Mod.
- Enter a name, version of the mod (not the game), directory (the launcher will create it) and at least one tag. All of these must be completed before you can press Create at the bottom.
(Name must be at least 3 symbols long. DIrectory can include spaces, but cannot end with one.)
- (Name must be at least 3 symbols long. DIrectory can include spaces, but cannot end with one.)
After this, copy the game files you want to edit to the created mod folder, following the same folder structure. For example, mod/my_new_mod/events/test_events.txt

## Uploading/updating a mod

Uploading and updating follows the same process:

- Open the game launcher.
- Go to Mod library on the left.
- Press Upload Mod in the top right.
- Choose your mod from the dropdown menu.
- Choose what platform to upload it to.
- Enter any description. (If updating, make sure the launcher copied the most recent one from the site.)
- Add a thumbnail
For the Steam Workshop, put thumbnail.png in the mod folder. Use 1:1 ratio, 1MB max. The biggest thumbnail the Workshop displays is around 600x600 pixels.
For Paradox Mods, drag the thumbnail to the field below the description. Suggested minimum size is 900x500, png or jpg, 1MB max.
- For the Steam Workshop, put thumbnail.png in the mod folder. Use 1:1 ratio, 1MB max. The biggest thumbnail the Workshop displays is around 600x600 pixels.
- For Paradox Mods, drag the thumbnail to the field below the description. Suggested minimum size is 900x500, png or jpg, 1MB max.
- Press "Upload".
On Steam, the mod will be uploaded in private mode and appear in your Steam Profile -> Workshop Items. Open it and change visibility on the side bar to Public to actually publish.
On Paradox Mods the mod will be published after the verification process. You may need to edit your description, as the site usually removes line breaks and BBCode formatting.
- On Steam, the mod will be uploaded in private mode and appear in your Steam Profile -> Workshop Items. Open it and change visibility on the side bar to Public to actually publish.
- On Paradox Mods the mod will be published after the verification process. You may need to edit your description, as the site usually removes line breaks and BBCode formatting.

## Installing mods manually

Mods are installed to your Documents/Paradox Interactive/Crusader Kings III/mod folder in Windows or ~/.local/share/Paradox Interactive/Crusader Kings III/mod/ in Linux.

Every mod in it must have a .mod file and a folder. (For example, "Nameplates.mod" and "nameplates" folder)

Note that the individual mod folder doesn't need to be in the main CK3 mod folder, only the .mod file is required to be here. You can just edit the .mod file to point at a new mod folder path. (As in change the line path="mod/my mod" to for example path="C:/Local_Documents/CK3_mods/my mod")

This is very helpful if your OneDrive is getting full, and you don't want to pay for more space.

### Installing Forum mods

Modders will usually zip both the .mod file and the mod folder. In this case, you only need to unpack the zip file directly to your "mod" directory. If instead you see descriptor.mod and a number of other folders, continue to the next section:

### Installing Paradox Mods

Mods downloaded from Paradox Mods only have the contents of the mod folder and require the following:

- Create a new folder in your "mod" directory. Give it any name, like "my mod".
- Unzip the downloaded mod directly to this new folder.
- Copy descriptor.mod from it and paste to your "mod" folder.
- Rename the copied descriptor file to anything.
- Open it with a text editor and add a line path="mod/my mod" (where "my mod" is the name of the folder you created). Save the file.
- After this, you should be able to add this mod in the launcher.
If this didn't work, you can try to create a new mod from the launcher and then copy the downloaded files to its folder (excluding descriptor.mod).

## Extracting files From Microsoft Store version

If you want to read the files using the Microsoft Store version, you can use a program called UWPDumper to extract the files.

- Download the latest x64 binary of UWPDumper
- Enable Developer Mode (Windows Settings -> Update and Security -> For Developers -> Developer Mode).
- Run CK3.
- Run UWPInjector.exe from the program you just downloaded.
- Enter the number next to ck3.exe : ParadoxInteractive.ProjectTitus_zfnrdv2de78ny as the processID.
- Check where it is going to store the files (probably somewhere like C:\Users\%USERPROFILE%\AppData\Local\Packages\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny\TempState\DUMP
- Wait for the program to finish.
The files should then be present in the directory specified earlier. If you want to edit the files, create a mod and copy the desired files there.

## Mod load order

Load order only matters when two or more mods change the same files, this is called a mod conflict.

Mods are loaded in order from top to bottom of the playset.

The mod lower in the playset will overwrite identical files from above.

So if you want to make sure that a mod is not overwritten by anything, put it at the very bottom of the playset.

Always read mod description. Modders will often list what files they change and what compatibility issues might arise with other mods.

Some popular mods have compatches that merge conflicting files together and let players use both mods. The compatch mod is loaded after the other two mods.

Otherwise, load order doesn't impact anything.

## Override rules

#### Full file override

If a mod has the same file as the game, it replaces all the contents of the file.

(By the same file we mean same path, same filename).

Avoid doing this unless you intend to overwrite the whole file!

When two mods have the same file, the file of the mod that is lower in the playset is loaded.

#### Single object override

Often, we can override a single object, for example, a define or a scripted trigger.

Put your changes in a new file, with the same path as vanilla.

The name of your file should come later in ASCIIbetical order: 01_defines.txt will override 00_defines.txt.

This has been called Last in Only Served, or LIOS. Most overrides follow this order. Types in UI files use FIOS: First In Only Served.

Example:

We can create a file in common\scripted_triggers, call it all_can_raid_trigger.txt with this:

```
can_raid_trigger = { always = yes }
```

It will override can_raid_trigger trigger in 00_scripted_rule_triggers.txt and allow anyone to raid.

The general rule is we can override a top-level declaration in a file: things that are defined at the start of a line, not inside any block.

A single override also cannot remove an object, only change it.

With overrides, it is good practice to add your mod's name to the filename, so you can easily spot if it was loaded in database_conflicts.log.

More specifics:

##### Defines

common/defines

Include the name of the category you change, for example:

```
NCharacter = {
	BASE_FERTILITY = 0.5
	BASE_HEALTH = 5.0
}
```

##### On_actions

common/on_action

Some parts of on_actions combine rather than override each other.

events, random_events and on_actions are appended.

trigger and effect technically overwrite, but they produce errors.

If you want to add effects to an on_action, make a custom one with your effects and fire it from the existing one.

This adds an effect to on_birth:

```
on_birth = { on_actions = { my_mod_on_birth } }
my_mod_on_birth = {
   effect = { add_gold = 100 }
}
```

This overrides all of vanilla effects of on_birth:

```
on_birth = {
   effect = { add_gold = 100 }
}
```

Do not do this, unless you intend to make such drastic changes.

##### Localization

We can replace single localization keys, but this produces errors, unless the file is added to the replace/ folder.

Both paths work:

localization/{language}/replace

localization/replace/{language}

##### UI types

Windows have to be in specificly named gui files, so if we want to change the character window, we have to edit the whole window_character.gui

Types and templates can be overwritten, but they follow FIOS order: first loaded type or template takes priority.

Your file name needs to come first asciibetically, for example, add 00_ to it: 00_my_buttons.gui.
If replacing a type, remember to define a group first, with any name. Then the type inside it.
If it's a template, just put the template in the file, don't need to add anything else.

This redefines the small button to have a different size:

```
types SmallButton {
  type button_standard_small = button_standard
    {
        size = { 40 25 }
    }
}
```

##### Common issues

We cannot override a single event, we cannot override a single faith. We have to override their whole files.

In history defined characters do not overwrite each other but produce duplicates. Have to override the whole file.

While multiple mods can add buildings, they need to overwrite the whole holdings.txt file in common/holdings to actually add them.

New clothes would also need to overwrite genes, animations need to overwrite the idle animation.

## Troubleshooting

### A mod from Paradox Mods is broken

Currently, there is a bug when adding mods from the Paradox Mods website. If a mod adds new files, the game completely ignores them.

To fix it, remove the mod from the playset, download it and install manually, following these steps.

### The mod you uploaded to Steam doesn't work

Make sure that you only use one version of the mod: either from Steam Workshop or your local copy. Unsubscribe or remove the other one. Otherwise, even if one if them is disabled, the game will be confused and may not load the mod at all.

### Mods stopped working

For unknown reasons, mods sometime stop working. There are two ways to solve this:

- Reload from the launcher:
Open the launcher
Go to Mod library on the left
Press Reload Mods in the top right and Reload (Clearing cache doesn't seem to be necessary)
Go to Playsets. The mod should have a warning saying the files aren't present on disk. Remove it from the playset.
Close the launcher
Resubscribe to the mod.
Open the launcher and add the mod back again.
- Open the launcher
- Go to Mod library on the left
- Press Reload Mods in the top right and Reload (Clearing cache doesn't seem to be necessary)
- Go to Playsets. The mod should have a warning saying the files aren't present on disk. Remove it from the playset.
- Close the launcher
- Resubscribe to the mod.
- Open the launcher and add the mod back again.
- If nothing helps, delete the following files if they are present and restart the launcher:
Documents/Paradox Interactive/Crusader Kings III/mods_registry.json
Documents/Paradox Interactive/Crusader Kings III/launcher-v2.sqlite
- Documents/Paradox Interactive/Crusader Kings III/mods_registry.json
- Documents/Paradox Interactive/Crusader Kings III/launcher-v2.sqlite

### Mods are conflicting

If several mods modify the same files or game objects, only one version of the file/object will be loaded. That's what we call a mod conflict.

Conflicts are logged in Documents/Paradox Interactive/Crusader Kings III/logs/database_conflicts.log

To search for conflicting files in downloaded mods, you can use a text editor like Visual Studio Code and drop the mod folder in it.

CK3 mods are downloaded to Steam\steamapps\workshop\content\1158310

In VSC you can press Ctrl+Shift+F to search through your whole project or right-click a folder and choose Find in Folder.

## Tools & utilities

- Exporters (Maya and Photoshop)
- Community-made modding tools
- Clausewitz Maya Exporter: a tool to create and export 3D models to use in CK3 and other Clausewitz games.
- UWPDumper: a tool to extract files from Microsoft Store games.
- CK3 triggers, modifiers, effects, event scopes, event targets, on actions, code revisions and setup.log: List of valid inputs for most game versions since launch. Use GitHub file history feature to compare_versions.

## Save game editing

> This doesn't seem to work anymore

Save files are located in:

- Windows: Documents\Paradox Interactive\Crusader Kings III\save games
- Linux: ~/.local/share/Paradox Interactive/Crusader Kings III/save games
First start the game in the debug mode and save. If it's an ironman game, exit to menu to autosave.

- On Steam: right-click the game on Steam -> Properties ->  add -debug_mode to Launch Options at the bottom
- Windows: Create a shortcut for the .exe file -> right-click it -> Properties -> add -debug_mode at the end of the Target field
PC:

- Find the save file in the save games folder.
- If it was an autosave, skip to the next step. Else:
Right-click the save file and extract it like an archive with 7-Zip or WinRar
Rename the extracted 'gamestate' file to have a .ck3 extension.
- Right-click the save file and extract it like an archive with 7-Zip or WinRar
- Rename the extracted 'gamestate' file to have a .ck3 extension.
- Right-click it and open with a text editor (Windows Notepad is not recommended as the save files are very big).
- Edit the file and save it.
To remove ironman status, search for "ironman=yes" and change it to "no"
- To remove ironman status, search for "ironman=yes" and change it to "no"
- Load it in the game.
Mac:

- Open Terminal
- Ensure that the directory is set to the correct folder
- Type in "unzip FileName.ck3"
- Rename the extracted 'gamestate' file to something with a .ck3 extension
- Edit this plain-text save
- Load it directly in the game (no need to re-compress)
| **OS** | **Save type** | **Location** | Windows | Local | C:\Users\%USERPROFILE%\Documents\Paradox Interactive\Crusader Kings III\save games | Windows | Steam Cloud | C:\Program Files (x86)\Steam\userdata\####\1158310\remote\save games | Mac | Local | $HOME/Documents/Paradox Interactive/Crusader Kings III/save games | Linux | Local | $HOME/.local/share/Paradox Interactive/Crusader Kings III/save games 
### Contents of the gamestate file

The table below contains the possible first-level blocks in the gamestate file. Entries are provided in order of appearance.

| **Block** | **Description** | meta_data | Contains metadata about the game, such as the game version. Used by the main menu screen. | (various variables) | These variables do not belong in a block.

Variable

date

random_seed

random_count

speed

date

bookmark_date

first_start | **Variable** | date | random_seed | random_count | speed | date | bookmark_date | first_start | variables | Contains script flags. | traits_lookup | Various traits that can been looked up | provinces | Contains province data, including buildings. | landed_titles | Contains the following sub-blocks:

Sub-block

Description

dynamic_templates

landed_titles(repetition)

Contains an entry for each landed title in the game, in the format:
# Exact formatting in file is different in terms of spaces and lines
# It is usually more compact.
# It has been edited here for clarity and demonstration.

# Index for titles starts at 0
index={
	key="(title id)" # The one used in 00_landed_titles.txt, e.g. k_england

	de_facto_liege=(title index) # Optional
	de_jure_liege=(title index) # Optional. The number at the start of a similar block, NOT the title id
	de_jure_vassals={ (title index...) } # Optional, list of title indices.
	holder="(character id)" # Optional

	name="..."
	adj="..." # Optional
	pre="..." # Optional
	article="..." # Optional

	date=2020.10.27 # yyyy.mm.dd
	heir={ (character id...) } # Optional. List of character ids.
	claim={ (character id...) } # Optional
	history = { (...) } # Optional 
	capital=(province id)
	capital_barony=yes # Optional
	theocratic_lease=yes # Optional
	history_government="(government id)" # Optional
	laws={ "(law id)"... } # Optional. List of law ids.

	# Optional (succession_election).
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
	} # end of succession_election block

	coat_of_arms_id=(coat of arms id)
	localization_key="(localization key)" # Optional

	# All below is used for mercenary bands
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

In vanilla CK3, this block ends at entry ~12369.

index=(value)(variable) | **Sub-block** | **Description** | dynamic_templates | landed_titles(repetition) | Contains an entry for each landed title in the game, in the format:
# Exact formatting in file is different in terms of spaces and lines
# It is usually more compact.
# It has been edited here for clarity and demonstration.

# Index for titles starts at 0
index={
	key="(title id)" # The one used in 00_landed_titles.txt, e.g. k_england

	de_facto_liege=(title index) # Optional
	de_jure_liege=(title index) # Optional. The number at the start of a similar block, NOT the title id
	de_jure_vassals={ (title index...) } # Optional, list of title indices.
	holder="(character id)" # Optional

	name="..."
	adj="..." # Optional
	pre="..." # Optional
	article="..." # Optional

	date=2020.10.27 # yyyy.mm.dd
	heir={ (character id...) } # Optional. List of character ids.
	claim={ (character id...) } # Optional
	history = { (...) } # Optional 
	capital=(province id)
	capital_barony=yes # Optional
	theocratic_lease=yes # Optional
	history_government="(government id)" # Optional
	laws={ "(law id)"... } # Optional. List of law ids.

	# Optional (succession_election).
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
	} # end of succession_election block

	coat_of_arms_id=(coat of arms id)
	localization_key="(localization key)" # Optional

	# All below is used for mercenary bands
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

In vanilla CK3, this block ends at entry ~12369. ```
# Exact formatting in file is different in terms of spaces and lines
# It is usually more compact.
# It has been edited here for clarity and demonstration.

# Index for titles starts at 0
index={
	key="(title id)" # The one used in 00_landed_titles.txt, e.g. k_england

	de_facto_liege=(title index) # Optional
	de_jure_liege=(title index) # Optional. The number at the start of a similar block, NOT the title id
	de_jure_vassals={ (title index...) } # Optional, list of title indices.
	holder="(character id)" # Optional

	name="..."
	adj="..." # Optional
	pre="..." # Optional
	article="..." # Optional

	date=2020.10.27 # yyyy.mm.dd
	heir={ (character id...) } # Optional. List of character ids.
	claim={ (character id...) } # Optional
	history = { (...) } # Optional 
	capital=(province id)
	capital_barony=yes # Optional
	theocratic_lease=yes # Optional
	history_government="(government id)" # Optional
	laws={ "(law id)"... } # Optional. List of law ids.

	# Optional (succession_election).
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
	} # end of succession_election block

	coat_of_arms_id=(coat of arms id)
	localization_key="(localization key)" # Optional

	# All below is used for mercenary bands
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

In vanilla CK3, this block ends at entry ~12369.

| index=(value)(variable) | dynasties | Contains the following sub-blocks:
dynasty_house (ends at entry ~6401)
dynasties (ends at entry ~6239)
static_dynasties (list of numbers)
static_dynasty_houses (list of numbers) - dynasty_house (ends at entry ~6401)
- dynasties (ends at entry ~6239)
- static_dynasties (list of numbers)
- static_dynasty_houses (list of numbers)
| character_lookup | deleted_characters | living | Contains entries of living characters. The following format is used for each character:

index={
	first_name="..."
	birth=(date) # Format: yyy.m.d
	female=yes # Optional
	was_playable=yes # Optional
	nickname="nick_..." # Optional
	culture=(culture index) # Optional if dynasty_house is specified, defaults to dynasty_house culture. Required if no dynasty_house, or culture different from that of dynasty_house.
	faith=(faith index) # Optional if dynasty_house is specified, defaults to dynasty_house faith.  Required if no dynasty_house or faith different from that of dynasty_house.
	dynasty_house=(dynasty house index) # Optional, must specify culture and faith if omitted
	skill={ (diplomacy) (stewardship) (martial) (intrigue) (learning) (prowess) } # One value for each skill
	prowess_age=(value) # Optional. Negative value.
	dna="(dna string)" # Optional
	mass=(value) # Optional, exclusive with weight
	weight={ # Optional, exclusive with mass
		base=(value)
		current=(value) # Optional
		target=(value) # Optional
	}

	sexuality=(value) # Optional. Defaults to heterosexual. Valid values: ho, bi, as, none. None is for children under 10.
	traits={ (trait index...) } # Optional. List of trait indices. Typically omitted for young children.
	recessive_traits = { (trait index...) } # Optional. List of trait indices
	inactive_traits = { (trait index...) } # Optional. List of trait indices
	
	# Optional (family_data)
	family_data={
		real_father=(character id) # Optional
		betrothed=(character id) # Optional
		primary_spouse=(character id) # Optional. Equal to one of the spouse ids.
		spouse=(character id) # Optional. First spouse
		spouse=(character id) # Optional. Second spouse
		spouse=(character id) # Optional. Third spouse
		spouse=(character id) # Optional. Fourth spouse
		concubine=(character id) # Optional. First concubine
		concubine=(character id) # Optional. Second concubine
		concubine=(character id) # Optional. Third concubine
		former_spouses={ (character id...) } # Optional. List of character ids
		former_concubines={ (character id...) } # Optional. List of character ids
		former_concubinists={ (character id...) } # Optional. List of character ids
		child = { (character id...) } # Optional. List of character ids
	}

	alive_data={

		# Optional (variables), contains flags
		variables={
			data={
				# (...)
			}
		}

		# Optional (modifiers), various locations in alive_data
		modifier={
			modifier="(modifier)"
			expiration_date=(date)
		}

		gold=(value) # Optional
		income=(value) # Optional
		location=(landed title index) # Optional
		stress=(value) # Optional
		fertility=(value)
		health=(value)
		piety={
			currency=(value)
			accumulated=(value) # Optional. Devotion
		}
		prestige={
			currency=(value) # Optional
			accumulated=(value) # Optional. Fame
		}
		focus={ # Optional
			type="(value)" # Education or lifestyle
			date=(date)
			changes=(value)
			progress=(value)
		}
		secrets= { (id...) } # Optional. List of ids
		targeting_secrets={ (id...) } # Optional. List of ids
		schemes={ (id...) } # Optional. List of ids
		targeting_schemes={ (id...) } # Optional. List of ids
		heir={ (ids...) } # Optional. List of ids
		pretender={ (ids...) } # Optional. List of ids
		claim={ { # Optional. List of claims
			title=(title id)
			pressed=yes # Optional
			}
		}
		used_punishments={ # Optional. List of reasons
			(value)={
				imprisonment_reason=yes # Optional
				revoke_title_reason=yes # Optional
			}
		}
		lifestyle_xp={ # Optional
			diplomacy_lifestyle=(value) # Optional
			martial_lifestyle=(value) # Optional
			stewardship_lifestyle=(value) # Optional
			intrigue_lifestyle=(value) # Optional
			learning_lifestyle=(value) # Optional
		}
		perk={ ... } # Optional. List of perks
		prison_data={ # Optional
			imprisoner=(character id)
			date=(date)
			imprison_type_date=(date)
			type="(value)" # house_arrest or dungeon
		}
		weight_update=(value) # Optional
		kills={ (character ids... } # Optional. List of character ids
		pool_history=(date) # Optional
		wars={ (value) (value) (value) (value) } # Optional
	} # End of alive_data block

	court_data={
		# All keys within this block are optional
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

	# Optional (landed_data)
	landed_data={
		domain={ (landed title index...) } # List of landed title indices
		vassal_contracts={ (values) } # List of values
		units= { (values...) } # Optional
		last_war_finish_date=(date) # Optional
		last_raid=(date) # Optional
		became_ruler_date=(date)
		laws={ "(law id)"... } # List of law ids
		strength=(value)
		strength_for_liege=(value) # Optional
		liege_tax=(value) # Optional
		balance=(value)
		dread=(value) # Optional
		known_schemes={ (ids...) } # Optional. List of ids
		succession={ (character id...) } # List of character ids
		is_powerful_vassal=yes # Optional
		vassal_power_value=(value) # Optional
		domain_limit=(value)
		vassal_limit=(value) # Optional
		vassals_towards_limit=(value) # Optional
		government="(government id)"
		realm_capital=(value)
		ai_allowed_to_marry=yes
		council={ (value...) } # List of values
		at_peace_penalty=(value)
		diplo_centers={ (value...) } # List of values
		election_titles={ (landed title index...) } # List of landed title indices
		absolute_control=yes # Optional
		interaction_cooldowns={ # Optional
			(interaction)=(date)
		}
	} # End of landed_data block

	# Optional (playable_data)
	playable_data={
		knights={ (character id...) } # List of character ids
		was_player=yes
	}

} | index={
	first_name="..."
	birth=(date) # Format: yyy.m.d
	female=yes # Optional
	was_playable=yes # Optional
	nickname="nick_..." # Optional
	culture=(culture index) # Optional if dynasty_house is specified, defaults to dynasty_house culture. Required if no dynasty_house, or culture different from that of dynasty_house.
	faith=(faith index) # Optional if dynasty_house is specified, defaults to dynasty_house faith.  Required if no dynasty_house or faith different from that of dynasty_house.
	dynasty_house=(dynasty house index) # Optional, must specify culture and faith if omitted
	skill={ (diplomacy) (stewardship) (martial) (intrigue) (learning) (prowess) } # One value for each skill
	prowess_age=(value) # Optional. Negative value.
	dna="(dna string)" # Optional
	mass=(value) # Optional, exclusive with weight
	weight={ # Optional, exclusive with mass
		base=(value)
		current=(value) # Optional
		target=(value) # Optional
	}

	sexuality=(value) # Optional. Defaults to heterosexual. Valid values: ho, bi, as, none. None is for children under 10.
	traits={ (trait index...) } # Optional. List of trait indices. Typically omitted for young children.
	recessive_traits = { (trait index...) } # Optional. List of trait indices
	inactive_traits = { (trait index...) } # Optional. List of trait indices
	
	# Optional (family_data)
	family_data={
		real_father=(character id) # Optional
		betrothed=(character id) # Optional
		primary_spouse=(character id) # Optional. Equal to one of the spouse ids.
		spouse=(character id) # Optional. First spouse
		spouse=(character id) # Optional. Second spouse
		spouse=(character id) # Optional. Third spouse
		spouse=(character id) # Optional. Fourth spouse
		concubine=(character id) # Optional. First concubine
		concubine=(character id) # Optional. Second concubine
		concubine=(character id) # Optional. Third concubine
		former_spouses={ (character id...) } # Optional. List of character ids
		former_concubines={ (character id...) } # Optional. List of character ids
		former_concubinists={ (character id...) } # Optional. List of character ids
		child = { (character id...) } # Optional. List of character ids
	}

	alive_data={

		# Optional (variables), contains flags
		variables={
			data={
				# (...)
			}
		}

		# Optional (modifiers), various locations in alive_data
		modifier={
			modifier="(modifier)"
			expiration_date=(date)
		}

		gold=(value) # Optional
		income=(value) # Optional
		location=(landed title index) # Optional
		stress=(value) # Optional
		fertility=(value)
		health=(value)
		piety={
			currency=(value)
			accumulated=(value) # Optional. Devotion
		}
		prestige={
			currency=(value) # Optional
			accumulated=(value) # Optional. Fame
		}
		focus={ # Optional
			type="(value)" # Education or lifestyle
			date=(date)
			changes=(value)
			progress=(value)
		}
		secrets= { (id...) } # Optional. List of ids
		targeting_secrets={ (id...) } # Optional. List of ids
		schemes={ (id...) } # Optional. List of ids
		targeting_schemes={ (id...) } # Optional. List of ids
		heir={ (ids...) } # Optional. List of ids
		pretender={ (ids...) } # Optional. List of ids
		claim={ { # Optional. List of claims
			title=(title id)
			pressed=yes # Optional
			}
		}
		used_punishments={ # Optional. List of reasons
			(value)={
				imprisonment_reason=yes # Optional
				revoke_title_reason=yes # Optional
			}
		}
		lifestyle_xp={ # Optional
			diplomacy_lifestyle=(value) # Optional
			martial_lifestyle=(value) # Optional
			stewardship_lifestyle=(value) # Optional
			intrigue_lifestyle=(value) # Optional
			learning_lifestyle=(value) # Optional
		}
		perk={ ... } # Optional. List of perks
		prison_data={ # Optional
			imprisoner=(character id)
			date=(date)
			imprison_type_date=(date)
			type="(value)" # house_arrest or dungeon
		}
		weight_update=(value) # Optional
		kills={ (character ids... } # Optional. List of character ids
		pool_history=(date) # Optional
		wars={ (value) (value) (value) (value) } # Optional
	} # End of alive_data block

	court_data={
		# All keys within this block are optional
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

	# Optional (landed_data)
	landed_data={
		domain={ (landed title index...) } # List of landed title indices
		vassal_contracts={ (values) } # List of values
		units= { (values...) } # Optional
		last_war_finish_date=(date) # Optional
		last_raid=(date) # Optional
		became_ruler_date=(date)
		laws={ "(law id)"... } # List of law ids
		strength=(value)
		strength_for_liege=(value) # Optional
		liege_tax=(value) # Optional
		balance=(value)
		dread=(value) # Optional
		known_schemes={ (ids...) } # Optional. List of ids
		succession={ (character id...) } # List of character ids
		is_powerful_vassal=yes # Optional
		vassal_power_value=(value) # Optional
		domain_limit=(value)
		vassal_limit=(value) # Optional
		vassals_towards_limit=(value) # Optional
		government="(government id)"
		realm_capital=(value)
		ai_allowed_to_marry=yes
		council={ (value...) } # List of values
		at_peace_penalty=(value)
		diplo_centers={ (value...) } # List of values
		election_titles={ (landed title index...) } # List of landed title indices
		absolute_control=yes # Optional
		interaction_cooldowns={ # Optional
			(interaction)=(date)
		}
	} # End of landed_data block

	# Optional (playable_data)
	playable_data={
		knights={ (character id...) } # List of character ids
		was_player=yes
	}

} ```
index={
	first_name="..."
	birth=(date) # Format: yyy.m.d
	female=yes # Optional
	was_playable=yes # Optional
	nickname="nick_..." # Optional
	culture=(culture index) # Optional if dynasty_house is specified, defaults to dynasty_house culture. Required if no dynasty_house, or culture different from that of dynasty_house.
	faith=(faith index) # Optional if dynasty_house is specified, defaults to dynasty_house faith.  Required if no dynasty_house or faith different from that of dynasty_house.
	dynasty_house=(dynasty house index) # Optional, must specify culture and faith if omitted
	skill={ (diplomacy) (stewardship) (martial) (intrigue) (learning) (prowess) } # One value for each skill
	prowess_age=(value) # Optional. Negative value.
	dna="(dna string)" # Optional
	mass=(value) # Optional, exclusive with weight
	weight={ # Optional, exclusive with mass
		base=(value)
		current=(value) # Optional
		target=(value) # Optional
	}

	sexuality=(value) # Optional. Defaults to heterosexual. Valid values: ho, bi, as, none. None is for children under 10.
	traits={ (trait index...) } # Optional. List of trait indices. Typically omitted for young children.
	recessive_traits = { (trait index...) } # Optional. List of trait indices
	inactive_traits = { (trait index...) } # Optional. List of trait indices
	
	# Optional (family_data)
	family_data={
		real_father=(character id) # Optional
		betrothed=(character id) # Optional
		primary_spouse=(character id) # Optional. Equal to one of the spouse ids.
		spouse=(character id) # Optional. First spouse
		spouse=(character id) # Optional. Second spouse
		spouse=(character id) # Optional. Third spouse
		spouse=(character id) # Optional. Fourth spouse
		concubine=(character id) # Optional. First concubine
		concubine=(character id) # Optional. Second concubine
		concubine=(character id) # Optional. Third concubine
		former_spouses={ (character id...) } # Optional. List of character ids
		former_concubines={ (character id...) } # Optional. List of character ids
		former_concubinists={ (character id...) } # Optional. List of character ids
		child = { (character id...) } # Optional. List of character ids
	}

	alive_data={

		# Optional (variables), contains flags
		variables={
			data={
				# (...)
			}
		}

		# Optional (modifiers), various locations in alive_data
		modifier={
			modifier="(modifier)"
			expiration_date=(date)
		}

		gold=(value) # Optional
		income=(value) # Optional
		location=(landed title index) # Optional
		stress=(value) # Optional
		fertility=(value)
		health=(value)
		piety={
			currency=(value)
			accumulated=(value) # Optional. Devotion
		}
		prestige={
			currency=(value) # Optional
			accumulated=(value) # Optional. Fame
		}
		focus={ # Optional
			type="(value)" # Education or lifestyle
			date=(date)
			changes=(value)
			progress=(value)
		}
		secrets= { (id...) } # Optional. List of ids
		targeting_secrets={ (id...) } # Optional. List of ids
		schemes={ (id...) } # Optional. List of ids
		targeting_schemes={ (id...) } # Optional. List of ids
		heir={ (ids...) } # Optional. List of ids
		pretender={ (ids...) } # Optional. List of ids
		claim={ { # Optional. List of claims
			title=(title id)
			pressed=yes # Optional
			}
		}
		used_punishments={ # Optional. List of reasons
			(value)={
				imprisonment_reason=yes # Optional
				revoke_title_reason=yes # Optional
			}
		}
		lifestyle_xp={ # Optional
			diplomacy_lifestyle=(value) # Optional
			martial_lifestyle=(value) # Optional
			stewardship_lifestyle=(value) # Optional
			intrigue_lifestyle=(value) # Optional
			learning_lifestyle=(value) # Optional
		}
		perk={ ... } # Optional. List of perks
		prison_data={ # Optional
			imprisoner=(character id)
			date=(date)
			imprison_type_date=(date)
			type="(value)" # house_arrest or dungeon
		}
		weight_update=(value) # Optional
		kills={ (character ids... } # Optional. List of character ids
		pool_history=(date) # Optional
		wars={ (value) (value) (value) (value) } # Optional
	} # End of alive_data block

	court_data={
		# All keys within this block are optional
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

	# Optional (landed_data)
	landed_data={
		domain={ (landed title index...) } # List of landed title indices
		vassal_contracts={ (values) } # List of values
		units= { (values...) } # Optional
		last_war_finish_date=(date) # Optional
		last_raid=(date) # Optional
		became_ruler_date=(date)
		laws={ "(law id)"... } # List of law ids
		strength=(value)
		strength_for_liege=(value) # Optional
		liege_tax=(value) # Optional
		balance=(value)
		dread=(value) # Optional
		known_schemes={ (ids...) } # Optional. List of ids
		succession={ (character id...) } # List of character ids
		is_powerful_vassal=yes # Optional
		vassal_power_value=(value) # Optional
		domain_limit=(value)
		vassal_limit=(value) # Optional
		vassals_towards_limit=(value) # Optional
		government="(government id)"
		realm_capital=(value)
		ai_allowed_to_marry=yes
		council={ (value...) } # List of values
		at_peace_penalty=(value)
		diplo_centers={ (value...) } # List of values
		election_titles={ (landed title index...) } # List of landed title indices
		absolute_control=yes # Optional
		interaction_cooldowns={ # Optional
			(interaction)=(date)
		}
	} # End of landed_data block

	# Optional (playable_data)
	playable_data={
		knights={ (character id...) } # List of character ids
		was_player=yes
	}

}
```

| dead_unprunable | Contains character entries. | characters | Contains the following sub-blocks:
dead_prunable (contains character entries)
prune_queue
dummy_female (contains a character entry)
dummy_male (contains a character entry)
unborn (contains unborn data entries)
natural_deaths
current_natural_death
sexuality_chances - dead_prunable (contains character entries)
- prune_queue
- dummy_female (contains a character entry)
- dummy_male (contains a character entry)
- unborn (contains unborn data entries)
- natural_deaths
- current_natural_death
- sexuality_chances
| units | (triggered events) | Each triggered event has its own block, started using triggered_event={ | played_character | Contains the following sub-blocks:
name="..." (variable)
character=(character id) (variable)
player=(value) (variable)
important_decisions
legacy
rally_points - name="..." (variable)
- character=(character id) (variable)
- player=(value) (variable)
- important_decisions
- legacy
- rally_points
| currently_played_characters={ (character id...) } | List of character ids. | armies | Contains the following sub-blocks:
regiments
army_regiments
armies - regiments
- army_regiments
- armies
| activity_manager | database entry | opinions | Contains the following sub-blocks:
active_opinions (contains opinion entries) - active_opinions (contains opinion entries)
| relations | Encompasses hooks, alliances, Contains the following sub-blocks:
active_relations - active_relations
| schemes | Contains the following sub-blocks:
active (contains scheme entries) - active (contains scheme entries)
| stories | Contains the following sub-blocks:
active (contains story entries)
next=(date) (variable) - active (contains story entries)
- next=(date) (variable)
| combats | combat_results ={}
combats={} combats={}

| pending_character_interactions | Contains the following sub-blocks:
data
player - data
- player
| secrets | Contains the following sub-blocks:
secrets (contains entries of secrets) (repetition)
indices
type
target
type
identity=(id)
owner=(id)
relation_type
participants = { (ids)}
known_secrets = {
secret=(id)
owner=(id) - secrets (contains entries of secrets) (repetition)
indices
type
target
type
identity=(id)
owner=(id)
relation_type
participants = { (ids)}
- indices
type
target
type
identity=(id)
owner=(id)
relation_type
participants = { (ids)}
- type
- target
type
identity=(id)
- type
- identity=(id)
- owner=(id)
- relation_type
- participants = { (ids)}
- known_secrets = {
secret=(id)
owner=(id)
- secret=(id)
- owner=(id)
| mercenary_company_manager | Contains the following sub-blocks:
mercenary_companies - mercenary_companies
| vassal_contracts | active={
id=contract_details
} id=contract_details
}

| religion | Contains the following sub-blocks:
religions
faiths
great_holy_wars
holy_sites - religions
- faiths
- great_holy_wars
- holy_sites
| wars | Contains the following sub-blocks:
active_wars
names - active_wars
- names
| sieges | Contains the following sub-blocks:
sieges (repetition) - sieges (repetition)
| succession | holdings | county_manager | Contains the following sub-blocks:
counties
monthly_increase (list of values) - counties
- monthly_increase (list of values)
| fleet_manager | Contains the following sub-blocks:
fleets - fleets
| council_task_manager | Contains the following sub-blocks:
active - active
| important_action_manager | Contains the following sub-blocks:
active - active
| faction_manager | Contains the following sub-blocks:
factions - factions
| culture_manager | Contains the following sub-blocks:
cultures
template_cultures (list of numbers)
era_discovery - cultures
- template_cultures (list of numbers)
- era_discovery
| holy_orders | Contains the following sub-blocks:
holy_orders
religion_name
faith_name - holy_orders
- religion_name
- faith_name
| ai | Contains the following sub-blocks:
war_coordinator_db
war_plan_db
ai_stategies - war_coordinator_db
- war_plan_db
- ai_stategies
| game_rules | Contains the save's current game rules. | raid | Contains the following sub-blocks:
raid (repetition) - raid (repetition)
| ironman_manager | Related to ironman saving. | coat_of_arms | Contains the following sub-blocks:
coat_of_arms_manager_name_map
coat_of_arms_manager_database (ends at entry ~17278)
next_id=(id) (variable) - coat_of_arms_manager_name_map
- coat_of_arms_manager_database (ends at entry ~17278)
- next_id=(id) (variable)
| artifacts | inspirations_manager | court_positions | struggle_manager | character_memory_manager | diarchies | travel_plans | accolades | tax_slot_manager | epidemics | legends | next_player_event_id=(value) (variable) 
## Mods with wiki pages

Wiki pages for modifications are the responsibility of the modification team, not the Paradox wiki team

- Way of Kings
- Kingdom of Heaven
- When the World Stopped Making Sense
- Princes of Darkness
- Elder Kings II
- CK3AGOT
- Nightmare in Britain
- Rajas of Asia
- LotR: Realms in Exile
- The Fallen Eagle
- Medieval Arts

## External links

- CK3 User Mods on the Paradox Forum.
- Crusader Kings official Discord modding channel. Go to the server-roles channel and choose CK3 Modding in the Channel Access post.
- CK3 Mod Coop A community Discord server dedicated to modding for CK3.
| Documentation | Scripting • Scopes • Effects • Triggers • Variables • Modifiers | Scripting | AI • Bookmarks • Characters • Commands • Council • Culture • Decisions • Dynasties • Events • Governments • History • Holdings • Lifestyles • Regiments • Religions • Script Values • Story cycles • Struggles • Titles • Traits | Interface | Interface • Data types • Localization • Customizable localization • Flavorization | Map | Map • Terrain | Graphics | 3D models • Exporters • Coat of arms • Graphical assets • Fonts • Particles • Shaders • Unit models | Audio | Music • Sound | Other | Console commands • Checksum • Mod structure • Mod compatibility • Modding tools • Troubleshooting | Characters | Characters • Attributes • Traits • Resources • Modifiers • Lifestyle • Family • Dynasty • Schemes • Hooks • Activities • Artifacts • Interactions • Travel • Adventurers • Prisoners | Realm & Governance | Council • Court • Power sharing • Subjects • Succession • Government • Laws • Decisions • Titles • Barony • County • Buildings • Royal court • Domiciles • Great projects | Warfare | Warfare • Casus belli • Alliance • Army • Hired forces • Knights • Duel • Situations | Culture & Faith | Culture • Traditions • Innovations • Form of Address • Faith • Doctrines • Tenets • Holy sites | Meta | Modding • Patches • Downloadable content • Developer diaries • Achievements • Jargon • Bookmarks • Interesting characters • Ruler Designer • Game rules - Timeless
- Modding