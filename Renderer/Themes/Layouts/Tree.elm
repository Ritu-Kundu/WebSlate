module Themes.Layouts.Tree  where
{- |
   This module defines Tree Layout theme
 -}
import Types.Theme as T
import Themes.Layouts.Default as LD

headlineLayout: T.Layout
headlineLayout = T.Layout {columns = [{ id=1, width = 1
                                      , placement = midLeft
                                      , colAlign= T.TopAlign 
                                      }
                                     ]
                                    
                       , inserts = [ { id="title",column=1}
                                   , { id="treesection",column=1}
                                   ,{ id="treesubsection",column=1}
                                   ]
                       }
defLayOut = LD.defaultLayoutInfo
treeLayoutInfo: T.LayoutInfo
treeLayoutInfo = { defLayOut |
                      headline <- headlineLayout
                 }

changePalletteMapping: T.ParentList
changePalletteMapping = [ ]
    
