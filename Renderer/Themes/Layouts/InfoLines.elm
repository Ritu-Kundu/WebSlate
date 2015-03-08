module Themes.Layouts.InfoLines  where
{- |
   This module defines Infolines Layout theme
 -}
import Types.Theme as T
import Themes.Layouts.Default as LD

footlineLayout: T.Layout
footlineLayout = T.Layout {columns = [{ id=1, width = 0.33
                                      , placement = middle
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=2, width =0.331
                                      , placement = middle
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=3, width = 0.17
                                      , placement = midRight
                                      ,  colAlign= T.TopAlign 
                                      },
                                      { id=4, width = 0.17
                                      , placement = midRight
                                      , colAlign= T.TopAlign 
                                      }
                                     ]
                                    
                       , inserts = [{ id="author",column=1}
                                   ,{ id="title",column=2}
                                   ,{ id="date",column=3}
                                   ,{ id="slidenumberandtotal",column=4}
                                   ]
                       }

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
                                    
                       , inserts = [{ id="section",column=1}
                                   ,{ id="subsection",column=2}
                                   ]
                       }

defLayOut = LD.defaultLayoutInfo

infoLineLayoutInfo: T.LayoutInfo
infoLineLayoutInfo = { defLayOut |
                      headline <- headlineLayout
                    , footline <- footlineLayout
                  }

changePalletteMapping: T.ParentList
changePalletteMapping = [ (("author", "headline"), T.Tertiary)
                        , (("author", "footline"), T.Tertiary)
                        , (("title", "headline"), T.Secondary)
                        , (("title", "footline"), T.Secondary)
                        , (("date", "headline"), T.Primary)
                        , (("date", "footline"),  T.Primary)
                        ]

    
