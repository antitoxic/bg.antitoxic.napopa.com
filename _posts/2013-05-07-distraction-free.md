---
layout: post
category : dev
tags : [minimal, usability]
title: Minimizing distractions
---

Being productive through elimination of what makes us unproductive.

 * **Jetbrains** for IDE
 * **SublimeText** as main markdown editor and the occasional file editor

## Jetbrains
<p class="bleed_image">
    <a href="http://puu.sh/2Njjh.png"><img src="http://puu.sh/2Njjh.png" alt="asd" class="bleed"></a>
</p>

 * No tabs
 * No panels, only project tree
 * Focus on editor, light editor with dark UI
 * Quick temporary access to panels (Double `Alt`)
 * Full screen, dedicated monitor for IDE

You would think tabs are nice and useful. At least I thought so. Actually are a huge distraction. Especially in semi-large projects in which you end up opening a list of files one after another and the tabs get on several rows or the files you initially had opened are now closed in order to save space. You are still aware where in the project are you thanks to the neat shortcuts mentioned below.

### Goodness & shortcuts
Of which the favourite picks:
#### Minimum code writing
 * *Smart keys* Wraps selection in quote or bracket when typing over selected text.
 * `Ctrl+W` (several times) Selects word, then phrase then sentence. Same goes like tag name, tag contents, parent tag. 
 * `Ctrl+Alt+T` Wrap selection in a snippet. Things like wrapping code in *try and catch* or wrapping text in a tag.
 * `Ctrl+D` Duplicates line
 * `Ctrl+X` Deletes a line
 * `Alt+Insert` In OOP languages offers auto code generation (like getters and setters) plus ability to change the generated templates
 * `Ctrl+Alt+L` Auto code formatting based on the settings so you don't have to think about it

#### Navigation & Exploration
 * `Ctrl+N` Open file by typing bits of the classname. I.e. typing `MoDaMy` will list `Model_Datamapper_Mysql` as suggestion.
 * `Ctrl+F12` Filterable pop-up with all methods (if a class), tag hierarchy (if xml), all selectors (if css), all definitions (if yaml). Filtering works in the same fashion as the one above.
 * `Ctrl+Alt+Shift+N` Open file by typing bits of the method name. 
 * `Ctrl+Shift+N` Open file by typing bits of file path, `*` masking works. 
 * `Alt+F1` Select the file in either file explorer or project tree
 * `Debugging` ability to create debug profiles

#### Attention span
 * `Alt+Backspace` gets you to the previous edit location
 * `Alt+Ctrl+Left` gets you to the previous cursor location. 
 * *Local history* See what you've been doing last week or recover some lost changes

#### Seemless VCS
  * *Changes* panel to pick and choose what to commit or revert.
  * `Ctrl+T` to update the project repo
  * `Ctrl+K` to commit all changes

#### Quick & Dirty
  * *Auto uplaod* when you are testing on a remote server


## Sublime

<p class="bleed_image">
    <a href="http://puu.sh/2NnI5.png"><img src="http://puu.sh/2NnI5.png" alt="asd" class="bleed"></a>
</p>

In the markdown use-case:

 * Centered narrow column with line wrapping text for readability 
 * Syntax highlighting for headings, emphasis, bold, quotes and embedded html
 * Wrapping section with pairs of the special markdown characters `*`, `` ` ``, `**`
 * Shortcuts for inserting images and links
 * In *Distraction Free Mode* 

With my lack of experience in Sublime Text I only use the link insert shortcut: `Alt+K`. That is however overall enough to have a pleasant time writing markdown.