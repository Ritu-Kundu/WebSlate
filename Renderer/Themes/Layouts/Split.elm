module Themes.Layouts.Split  where
{- |
   This module defines Split Layout theme
 -}
import Types.Theme as T
import Themes.Layouts.Default as LD

headlineLayout: T.Layout
headlineLayout = T.Layout {columns = [{ id=1, width = 0.5
                                      , placement = midRight
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=2, width =0.5
                                      , placement = midLeft
                                      , colAlign= T.TopAlign 
                                      }
                               ]
                                    
                       , inserts = [{ id="sectionnavigationvertical",column=1}
                                   ,{ id="subsectionnavigationvertical",column=2}
                                   ]
                       }

footlineLayout: T.Layout
footlineLayout = T.Layout {columns = [{ id=1, width = 0.5
                                      , placement = midRight
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=2, width =0.5
                                      , placement = midLeft
                                      , colAlign= T.TopAlign 
                                      }
                                     ]
                                    
                       , inserts = [{ id="section",column=1}
                                   ,{ id="subsection",column=2}
                                   ]
                       }
defLayOut = LD.defaultLayoutInfo
splitLayoutInfo: T.LayoutInfo
splitLayoutInfo = { defLayOut |
                        headline <- headlineLayout,
                        footline <- footlineLayout
                     }

changePalletteMapping: T.ParentList
changePalletteMapping = [ (("author", "headline"), T.Quaternary)
                        , (("author", "footline"), T.Quaternary)
                        , (("title", "headline"), T.Primary)
                        , (("title", "footline"), T.Primary)
                        , (("section", "headline"), T.Quaternary)
                        , (("section", "footline"),  T.Quaternary)
                        , (("subsection", "headline"), T.Primary)
                        , (("subsection", "footline"),  T.Primary)
                        , (("shadedsection", "headline"), T.QuaternaryShading)
                        , (("shadedsection", "footline"),  T.QuaternaryShading)
                        , (("shadedsubsection", "headline"), T.PrimaryShading)
                        , (("shadedsubsection", "footline"),  T.PrimaryShading)
                        ]

    
