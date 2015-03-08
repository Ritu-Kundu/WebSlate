module Types.Naive where
{- |
   This module contains data-structures in which input will be recieved from he Renderer
 -}

type Presentation = { presInfo: PresInfo
                    , themeInfo: ThemeInfo
                    , slides: [Slide]
                    , supportbin: [Supportbin]
                    , quizes: [Quiz]
                    }
--------------------------------------------------------------------------------------
---------------------------------------------PresInfo---------------------------------
--------------------------------------------------------------------------------------
{- |
   PresInfo contains the information about presentation
   - authors and institute are related by thier positions in respective lists
 -}

type PresInfo = { presTitle: String
                , presSubTitle: String
                , authors:[String]
                , institute:[String]
                , date: String
                , logo: String
                , titleGraphic: String
                , sectionGraphic: String
                , subsectionGraphic: String
                , sections: [Section]
                }
{- Section is logical partitioning of presentation
   It can be a scetion/subsection/subsubsection as identified by id
   id = x : Section x
      = x.y : subsection y of section x
      = x.y.z : subsubsection z of subsection y of section x
 -}
type Section = { id: String
               , shortName:String
               , longName:String
               }
--------------------------------------------------------------------------------------
---------------------------------------------ThemeInfo--------------------------------
--------------------------------------------------------------------------------------
-- Some common types used bt ThemeInfo and Slide
{- |
    Column information
      id: ColumnNummber
      width: Float  --- relative
      columnAlign: t,b,c
      inColumnAlign: leaft, right, center
 -}
type ColumnInfo = { id: Int
                  , width: String
                  , columnAlign: String
                  , inColumnAlign: String
                  }
--------------------------------------------------------------------------------------
-- ThemeInfo contains the information about the theme
type ThemeInfo = { themes: Themes

                 , guidingCanvas: [TemplateCanvas]
                 , guidingColors: [TemplateColor]
                 , guidingFonts: [TemplateFont]

                 , templateCanvas: [TemplateCanvas]
                 , templateColors: [TemplateColor]
                 , templateFonts: [TemplateFont]
                 , templateLayout: [TemplateLayout]
                 }

{- |
    Theme contains names of corresponding themes
    layout: sidebars:left, sidebars:right, tree, split, infolines,
            miniframes, miniframes:authortitle, miniframesinstitutetitle:, 
            miniframes:authorinstitutetitle
    style: sober,striking
    font: <font-series>
 -}
type Themes = {
                layout: String
              , style: String
              , font: [String]
              }
{- |
   TemplateLayout contains the information about the Layout
     id is the name of template
     parent is id of container template
     canvas layout gives the basic information (border, padding etc)
     options are template specific additional options
   |
   guiding: (id only, no parent) -- It pushes the setting down the tree
                   Outer | Inner | OuterElements | InnerElements |
                   TitleLike | NormalText | AlertText | HighlightText |
                   Item | Subitem | Subsubitem |
                   ItemProjection | SubitemProjection | SubsubitemProjection
                  
   specifics:
    outer: (no parent) 
      id: headline, footline, sidebars, leftsidebar, rightsidebar, miniframes, 
          dimmednavigationalsymbols,navigationalsymbols, 
          modechangesymbols, dimmedmodechangesymbols
          slidetitle, slidesubtitle
    outerelements:
      id: author, institute, date, slidenumber, totalslides, 
          section, subsection, subsubsection,title, subtitle 
          shadedsection, shadedsubsection, shadedsubsubsection
      parent:  headline, footline, sidebar, miniframes
             if none then belongs to tileslide
    inner:
      id: block, framebox, imagebox, alertedblock, toc 
          quiz, button, <newtemplatename>
    innerelements:
      id: blocktitle, highlight, alert, normal,
         itemizeitem, itemizesubitem, itemizesubsubitem,
         enumerateitem, enumeratesubitem, enumeratesubsubitem,
         descriptionitem, descriptionsubitem, descriptionsubsubitem,
         caption
       parent: if none then act as global
               otherwise inner  
-}
  
type TemplateCanvas = { id: String
                      , container: String
                      , canvas: Canvas
                      , options: [Options]
                      }
{- |
    Canvas information
      border: thin/medium/thick/none
      borderstyle: solid/dashed/dotted
      padding: x or a!b!c!d where x,a,b,c,d are numbers
 -}
type Canvas = { border: String
              , borderstyle: String
              , leftpadding: String
              , rightpadding: String
              , toppadding: String
              , bottompadding: String
              }

type Options = { option: String
               , value: String
               }

{- | 
    TemplateColor contains the information about the Color of the template
     id is the name of template
     parent is id of container template
     colorInfo gives the basic color information (bg, fg etc)
     options are template specific additional options
   
 -}
type TemplateColor = { id: String
                     , container: String
                     , colorInfo: ColorInfo
                     , options: [Options]
                     }
{- |
    Color information
      bg: colorstr/ gradientstr
      fg: colorstr
      border: colorstr
      paddings: colorstr
     where
      colorstr = rgb:x:y:z
                 or rgba:x:y:z:a
                 or hsl:x:y:z
                 or hsla:x:y:z:a
                 or red, orange, yellow, green, blue, purple, brown, white, black, 
                    charcoal, grey
                    lightred, lightorange, lightyellow,  lightgreen,  lightblue,  
                    lightpurple, lightbrown, lightgrey, lightcharcoal,
                    darkred, darkorange, darkyellow, darkgreen, darkblue, darkpurple,
                     darkbrown, darkgrey, darkcharcoal
  -}
type ColorInfo = { bg: String
                 , fg: String
                 , border: String
                 , leftpadding: String
                 , rightpadding: String
                 , toppadding: String
                 , bottompadding: String
                 }
{- | 
    TemplateFont contains the information about the Color of the template
     id is the name of template
     parent is id of container template
     fontInfo gives the basic font information (font-family etc)
   |
   id and parent same as in template color
 -}
type TemplateFont = { id: String
                     , container: String
                     , fontInfo: FontInfo
                     }

{- |
    Font information
      size: tiny, footnotesize, scriptsize, verysmall, small, medium, large, verylarge, huge
      shape: italic, bold, normal, bolditalic
      family: "helvetica","arial","sans-serif" etc
 -}
type FontInfo = { size: String
                , shape: String
                , align: String
                , family: String
                }
{- | 
    TemplateLayout contains the information about the elements that will be 
     included in that template
     - id is the name of template
     - parent is id of container template
     - Columns give the layout of area division in which elements will be inserted
     - inserts give the name of the elements that will be inserted in the
        corresponding column of the template
   |
   id : given below

   |
   inserts:
       id                  parent                   insert              
     -----------------------------------------------------------------------------------
      headline             -                      navigation, navigationvertical, 
                                                  sectionnavigation, 
                                                  sectionnavigationvertical,
                                                  subsectionnavigation, 
                                                  subsectionnavigationvertical,
                                                  author, istitute, date, slidenumber
                                                  , slideandtotal,
                                                  treesection, treesubsection,
                                                  section, subsection, subsubsection,
                                                  logo
     footline              -                      as above
     navigationalsymbols:direction   -            slidenavigation, 
                                                  subsectionnavigation, 
                                                  sectionnavigation, 
                                                  backforward
     modechangesymbols:direction  -               supportmode, historymode, 
                                                  addtohistory                        
     titleslide            -                      author, institute, date, title, 
                                                  subtitle, image:filename
     tocslide                                     toc:tocstring**
     atbeginsectionslide                          sectiion  
                                                  image:filename, logo
                                                  toc:tocstring**
     atbeginsubsectionslide                       sectiion,subsection,  
                                                  image:filename, logo
                                                  toc:tocstring**
 -}
type TemplateLayout = { id: String
                      , columns: [ColumnInfo]
                      , inserts: [InsertInfo]
                      }

type InsertInfo = { name: String
                  , columnid: Int
                  } 
             
{- | 
    SizeInfo contains the information about the size and placement of various 
    components
     - id is the name of the component
     - size give the width of the element in %
     - placement gives the placement of elements in that component: 
        left, right, center
   |
   id: sidebars, leftsidebar, rightsidebar,  --- width % of total window
       textwidth  --- width of % of column area      
 -}
type SizeInfo = { id: String
                , size: String
                , placement: String
                }
{- |
   NOTE:
      tocstr format:
        following options seperated by -
         firstsection=<sectionnumber> -- IGNORE
         pausesections=true/false
         pausesubsections=true/false
         showsections=<comma sepreated list of numbers> -- IGNORE
         Parser WILL CHANGE THIS TO SECTIONSTYLE - style=currentsection/currentsubsection/hideallsubsections/hideothersubsections
         sectionstyle=<style for current section > ! <style for other sections>
         subsectionstyle=<style for current subsection in current section> !
                         <style for other subsection in current section> !
                         <style for other subsection in other section> 
          where style is shaded/hide/show

      minitemplate string:
        <minitemplate for section>!<mini template for subsection>!<minitemplate for subsubsection>
        where minitemplate is a string such that
                a, A, 1, i, I is used for section number
                b, B, 2, j, J is used for subsection number
                c, C, 3, k, K is used for subsubsection number
             and
              a,b,c : Corresponding Alphabet in lowercase
              A,B,C : Corresponding Alphabet in uppercase
              1,2,3 : 
              i.j.k : Roman number in lowercase
              I,J,K : Roman number in uppercase
 -}
--------------------------------------------------------------------------------------
---------------------------------------------Slide------------------------------------
--------------------------------------------------------------------------------------

--  Some Common types used by Slide
{- |
   ElementLayout contains information about its placement in container column 
   and its styling template
   - containerColumn gives id of the columnn
   - inColumnnPos: x where x is its placement in column.For e.g. 3 => third in column
   - templateName gives its styling template
 -}
type ElementLayout = { containerColumn: Int
                     , inColumnnPos: Int
                     } 
{- |
   Text is collection of parts where part is a string
   Inline style applied to that part is given by element at corresponding position in 
   inlinestyle list. It can be alert, italic, bold,highlight, underline, normal or colorstr**
 -}
type SlateText = { parts:[String]
                 , inlinestyle: [String]
                 , animation: Animation
                 }

{- |
   - tickLife is list of all ticks at which that element is present
  -} 
type Animation = { tickLife: [Int]
                 }


-------------------------------------------------------------------------------------
{- |
   Slide contains the content of a slide and info about itself
   - slideType: normal/plain
   - partOf : Section.Subsection.Subsubsection id     
 -}
type Slide = { id: Int
             , slideType: String
             , partOf: String
             , slideTitle:String
             , slideSubtitle: String
             , supportbin: String
             , quiz: String
             , columns: [ColumnInfo]
             , slideContent: SlideContent
             }
{- |
   Slidecontent contains the lists of various types of possible contenets
     simpletextboxes contains the texts that are without ant enclosing environment
     They can be seen as framebox with invisible frame
  -}
type SlideContent = { blocks: [Block]
                    , simpletextboxes: [Framebox]
                    , frameboxes: [Framebox]
                    , imageboxes: [Imagebox]
                    , slateLists: [SlateList]
                    , smartLists: [SmartList]
                    }
{- |
   - layout gives placement
   - isAlerted is "true" or "false"
   - title is the block title
   - body is the list of textelements.
 NOTE: There can be many elements corresponding to a single text 
       depending on the animation of that element
      For e.g if body text had a command to make a part of the 
              text alerted at tick=5 say, then parser will give 2 Slatetext
              one complate normal string with animation = 1,2,3,4,6,7..
              other with style=alert for that part with animation = 5
 -} 
type Block = { layout: ElementLayout
             , isAlerted: String
             , title: String
             , body: [SlateText]
             , otherLife: String           
             }
-- Same as Block without title
type Framebox = { layout: ElementLayout
                , body: [SlateText]
                , otherLife: String
                }
{- |
   - layout gives placement
   - imageFile: path to file
   - imageOptionns:
                "width":"",
                "height":"",
                "scale":"" 
 -}
type Imagebox = { layout: ElementLayout
                , imageFile: String
                , imageOptions: [Options]
                , caption: String
                , animation: Animation
                , otherLife: String
                }

{- |
   - layout gives placement
   - items contains list items
 -}
type SlateList = { layout: ElementLayout
                 , items: [ListItem]
                 }
{- |
   Listitem contains different items
    - id gives the hierarchy of items. Its length will give the level of item tree
        - type gives the marker-type: 
        itemizeitem, itemizesubitem, itemizesubsubitem,
        enumerateitem, enumeratesubitem, enumeratesubsubitem,
        descriptionitem, descriptionsubitem, descriptionsubsubitem
    - itemInfo gives the text of the marker
        projection number in case of enumerate
        description word in case of description
        empty string in case of itemize 
    e.g. :
                                      id              type            info            
             |> a                     1               itemizeitem      -
             |> b                     2               itemizeitem      - 
             |> c                     3               itemizeitem      -
                1. somethinng         3.1             enumerateitem    1.
                2. something          3.2             enumerateitem    2.
                3. (a) something      3.3             enumerateitem    3.
                                      3.3.0           enumeratesubitem (a)
                   (b) something      3.3.1           enumeratesubitem (b)
                4. - something        3.4             enumerateitem     4
                                      3.4.0           itemizesubitem    -
                   - something        3.4.1           itemizesubitem    -
                5 something           3.5             enumerateitem     5
                   (a) something      3.5.1           enumeratesubitem  (a)
             |> something             4               itemizeitem        -
                - something           4.1             itemizesubitem     -
                    * something       4.1.1           itemizesubsubitem  -
 NOTE: .0 => overlapped with previous   -- currently ignored         

 -}
type ListItem = { id:String
                , itemType: String
                , itemInfo: String
                , body: [SlateText]
                , otherLife: String
                } 

{- |
   - layout gives placement
   - label : text on button
   - target: tickprev, ticknext,
             slidestartprev, slideendprev, slidestartnext, slideendnext,
             sectionstartprev, sectionendprev, sectionstartnext, sectionendnext 
       subbsectionstartprev, subsectionendprev, subsectionstartnext, subsectionendnext
             presentationstart, presentationend, supportbin, <any label>
 -}
-- Currently being ignored
type SmartList = { layout: ElementLayout
                 , sdType: String 
                 , items: [SmartItem]
                 , animation: Animation
                 , otherLife: String
                 }

type SmartItem = { id: String
                 , body: String
                 }

-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
type Supportbin = { id: String
                  , slideContent: SlideContent
                  }
type Quiz = { id: String
            , qtype: String
            , question: String
            , options: [{option:String, isCorrect:String}]
            , correctAns: [String]
            , explanation: String
            }
