module Themes.Layouts.SideBar  where
{- |
   This module defines Leftsidebar and Rightsidebar Layout themes
 -}
import Types.Theme as T
import Themes.Layouts.Default as LD

sidebarLayout: T.Layout
sidebarLayout = T.Layout {columns = [{ id=1, width =1
                                      , placement = midRight
                                      , colAlign= T.TopAlign 
                                      }
                                    ]
                                    
                       , inserts = [{ id="title",column=1}
                                   ,{ id="author",column=1}
                                   ,{ id="toc",column=1}
                                   ]
                       }


defLayOut = LD.defaultLayoutInfo
sideBarLayoutInfo: T.Sidebar -> T.LayoutInfo
sideBarLayoutInfo side = 
   case side of
     T.LeftSidebar -> { defLayOut | leftSidebar <- sidebarLayout }
     T.RightSidebar -> { defLayOut | rightSidebar <- sidebarLayout }      


changePalletteMapping: T.ParentList
changePalletteMapping = []
