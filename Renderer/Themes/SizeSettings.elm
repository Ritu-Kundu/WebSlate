module Themes.SizeSettings where
{- |
   This module contins the sizing information of various elements/componenets
 -}

import Types.Theme as T

--------------------------------------------------------------------------------------
--------------------------------------Default Sizing-----------------------------------
--------------------------------------------------------------------------------------
generalSymbolSizing: T.SymbolSizing
generalSymbolSizing = { width = 20
                      , height = 20
                      , coverage = 0.5
                      , offset = 0.2
                      }
-- offset is fixed for miniframe
miniFrameSizing: T.SymbolSizing
miniFrameSizing = { width = 20
                  , height = 20
                  , coverage = 0.3
                  , offset = 2
                  }
sectionProjection = { width = 20
                  , height = 20
                  , coverage = 0.3
                  , offset = 0.001
                  }
itemProjection = { width = 20
                  , height = 20
                  , coverage = 0.4
                  , offset = 0.01
                  }

button: T.SymbolSizing
button = { width = 10
         , height = 10
         , coverage = 0.5
         , offset = 0.05
         }

symbolSizeInfo:T.SymbolSizeInfo 
symbolSizeInfo = { generalSymbol = generalSymbolSizing
                   , miniframe = miniFrameSizing
                   , sectionProjection = sectionProjection
                   , itemProjection = itemProjection
                   , button = button
                 }


--itemspacer wrt textwidth  
-- rest wrt window width
componentSizeInfo: T.ComponentSizeInfo                 
componentSizeInfo = { 
                       leftSidebarWidth = 0.2
                     , rightSidebarWidth = 0.2
                     , headlineHeight = 0.1
                     , footlineHeight = 0.1
                     , navigationSymbolHeight = 0.05
                     , slideTitleWidth = 1
                     , slideTitleHeight = 0.01
                     , textWidth = 1
                     , itemTab = 0.1
                     } 
-- Default font size
normalFontSize = Just 30

--------------------------------------------------------------------------------------
-- Changing font sizes at a finer level
changeFontSizingList: T.FontSizingList
changeFontSizingList = [ (("subtitle","none"), T.NormalSize)
                 , (("title","none"), T.Huge)
                 , (("author","none"), T.NormalSize)
                 , (("date","none"), T.NormalSize) 
                 , (("institute","none"),T.ScriptSize)

                 , (("section","none"), T.VeryLarge)
                 , (("subsection","none"), T.Large)  
                 
                 , (("section","headline"), T.Large)
                 , (("subsection","headline"), T.Large)   
                 , (("slidesubtitle","none"),T.FootnoteSize)

                 , (("section","sidebar"), T.Tiny) 
                 , (("subsection","sidebar"), T.Tiny)
                 , (("subsubsection","sidebar"), T.Tiny)
                 , (("shadedsection","sidebar"), T.Tiny) 
                 , (("shadedsubsection","sidebar"), T.Tiny)
                 , (("shadedsubsubsection","sidebar"), T.Tiny)

                 , (("sectionprojection","none"), T.Tiny)
                 , (("subsectionprojection","none"), T.Tiny)
                 , (("subsectionprojection","none"), T.Tiny)
                 , (("shadedsectionprojection","none"), T.Tiny)
                 , (("shadedsubsubsectionprojection","none"), T.Tiny) 
                 , (("shadedsubsubsectionprojection","none"), T.Tiny) 

                 , (("subsubsection","toc"), T.FootnoteSize) 
                 , (("shadedsubsubsection","toc"), T.FootnoteSize)

                 , (("sectionprojection","toc"), T.Small) 
                 , (("subsectionprojection","toc"), T.Small) 
                 , (("subsubsectionprojection","toc"), T.Tiny) 
                 , (("shadedsectionprojection","toc"), T.Small)
                 , (("shadedsubsectionprojection","toc"), T.Small)
                 , (("shadedsubsubsectionprojection","toc"), T.Tiny)


                 , (("caption", "imagebox"), T.Small)
                 , (("captionnameandnumber", "imagebox"), T.Small)
                 ]
