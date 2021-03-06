# WebSlate
\********************************************************************\
\****************************SLATE***********************************\
SLATE is a presentation software which takes an input file written in SLATE
language and produces output that is rendered in a web-browser.
Slate language is a mark-up language inspired from Latex.

------------------------------Usage Information------------------------

This folder contains 'slate.html' file which on opening in a web-browser 
displays a file-uploader. Any valid file written in SLATE language can be 
uploaded. For illustrative purpose, two files (features.slate and myPres.slate) 
have been given in Demo sub-folder of this folder. Presentation generated from 
'feature.slate' demonstrates basic features provided by the tool while 'myPres.slate'
will generate a pesentation demonstrating idea behind the tool, advanced features and 
future extensions.


Uploading a SLATE file will generate a presentation in the same window.
Following keys can be used to deliver the presentation:
1. Clicking Left/Right arrow keys will move the presentation to previous/
   next slide.
2. Clicking Up/Down arrow will cause previous or next tick on animation
   time-line. Enter key will also make time move forward on the same slide.

Besides arrow keys, mouse-clicks can be used for navigation in presentation.
Navigational symbols to move to next/previous slide/section/subsection or 
move back or forth on animation time-line  are given in the bottom-right
corner above footline if any.

1. The circular symbol is for time-line (animation)
2. The rectangular symbol is for slide navigation.
3. The symbol with three evenly-spaced thick lines is for section navigation.
4. The symbol with very closely-spaced tabbed thick lines is for subsection.
   navigation.

These are surrounded by two arrows. The one pointing left will make a back move
wrt the current state/slide and other pointing right will cause moving ahead. 

Preceding the navigational symbol panel is Mode change symbol panel.
Clicking a symbol will start the corresponding mode.
1. A grid-like symbol is to start Supportbin mode. The supportbin associated with
   the current slide will be displayed containing a grid of the elements that were
   dumped into it while authoring the SLATE document. Clicking an element in this mode 
   will zoom the element to fill the whole screen
2. A plus-like symbol is to begin Zoom mode. Every element on the current slide can be 
   clicked to zoom in this mode.
3. The symbol with S-like sign commences Scribble mode. Anything can be scribbled on the 
   current slide in this mode using a mouse.
4. The symbol with 'quiz' written over it is to start Quiz mode where any quiz associated 
   with current slide while authoring will be shown.

In every mode a close-sign appear in the top-right corner to close the current mode and 
return yo the parent slide.

-----------------------------Folder Structure------------------------

'slate.html' is the file that is being used as the interface to the tool.
It also stiches every module together by bringing various JavaScript files
in the same scope.

---Parser---
Parser folder contains the 'Parser.js' file. It is the parser for SLATE language.
It has been generated by using peg.js and the rules are given in 'slate.peg'. 
'slate.peg' is not needed for the operation of the tool. It was used for the 
development of the tool.
This folder also contains 'Reader.js' file which is to read the input file uploaded
and then give it to the Parser for parsing and the parsed output is given to the 
'Converter.js'

---Converter---
Converter folder contains 'Converter.js' which takes the parsed output from parser in JSON 
format and converts it into an appropriate JSON format which is suitable for Renderer
written in Elm language.
This folder also contains a sub-folder JSLIB which contains 'Underscore.js' library used by 
Converter.js and also 'elm-runtime.js' library file required for compiled Elm code to function.

---Renderer---
This folder contains 'Slate.elm' which is the main file being used by Renderer module.
It also contains PreProcess folder which contains Elm-code files used by Renderer to preprocess 
the data received from Converter.
Builder sub-folder contains the elm-code files for building various element that can be rendered on screen.
Displayer sub-folder contains the elm-code files for the displaying functionality of the Renderer. 
These are the files that handle animation and rendering logic.
SmartDisplay sub-folder contains file for displaying smart-graphics corresponding to lists.
Theme sub-folder contains various files needed to control the appearance and styling of the elements to be 
displayed on screen.
Types sub-folder contains various data-structures used by Renderer.
Utils sub-folder contains files that are providing basic utilities to various parts of the Renderer.
The above are the sub-folders carrying source-code. They are not required for the tool to function.

build sub-folder contains the files that are compiled from Elm-code files. It coatings the compiled JavaScript 
file corresponding to 'Slate.elm'. This is the folder which is needed by SLATE to be operative

---Symbols---
This folder carries various symbols being used by Slate.

---Demo---
This folder contains a sample input file in which presentation-document has been specified in SLATE language.
It can be used for demonstration.













