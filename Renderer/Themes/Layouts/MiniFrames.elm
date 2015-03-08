module Themes.Layouts.MiniFrames  where
{- |
   This module defines Miniframes Layout theme
 -}
import Types.Theme as T
import Themes.Layouts.Default as LD

headlineLayout: T.Layout
headlineLayout = T.Layout {columns = [{ id=1, width = 1
                                      , placement = midLeft
                                      , colAlign= T.TopAlign 
                                      }
                                     ]
                                    
                       , inserts = [{ id="navigation",column=1}
                                   ,{ id="subsection",column=1}
                                   ]
                       }

footlineLayout2: String -> String -> T.Layout
footlineLayout2 id1 id2 = 
              T.Layout {columns = [{ id=1, width = 0.51
                                       , placement = middle
                                       , colAlign= T.TopAlign 
                                       },
                                       { id=2, width = 0.51
                                       , placement = middle
                                       , colAlign= T.TopAlign 
                                       }
                                      ]
                                    
                       , inserts = [{ id=id1,column=1}
                                   ,{ id=id2,column=2}
                                   ]
                       }
footlineLayout3: T.Layout
footlineLayout3 = T.Layout {columns =[{ id=1, width = 0.331
                                      , placement = middle
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=2, width = 0.33
                                      , placement = middle
                                      , colAlign= T.TopAlign 
                                      },
                                      { id=3, width = 0.33
                                      , placement = middle
                                      , colAlign= T.TopAlign 
                                      }
                                     ]
                                    
                       , inserts = [{ id="author",column=1}
                                   ,{ id="title",column=2}
                                   ,{ id="institute",column=3}
                                   ]
                       }
defLayOut = LD.defaultLayoutInfo
miniframesLayoutInfo: T.MiniFramesFoot -> T.LayoutInfo
miniframesLayoutInfo foot = 
   case foot of
     T.AuthorTitle -> { defLayOut | 
                          headline <- headlineLayout,
                          footline <-  footlineLayout2 "author" "title"}
     T.InstituteTitle -> { defLayOut | 
                             headline <- headlineLayout,
                             footline <-  footlineLayout2 "institute" "title"}
     T.AuthorInstituteTitle -> { defLayOut | 
                                   headline <- headlineLayout,
                                   footline <-  footlineLayout3}  
     T.NoFoot -> { defLayOut | 
                             headline <- headlineLayout}
                             

changePalletteMapping: T.ParentList
changePalletteMapping = [ (("author", "headline"), T.Secondary)
                        , (("author", "footline"), T.Secondary)
                        , (("title", "headline"), T.Tertiary)
                        , (("title", "footline"), T.Tertiary)
                        , (("section", "headline"), T.Tertiary)
                        , (("section", "footline"),  T.Tertiary)
                        , (("subsection", "headline"), T.Secondary)
                        , (("subsection", "footline"),  T.Secondary)
                        , (("shadedsection", "headline"), T.TertiaryShading)
                        , (("shadedsection", "footline"),  T.TertiaryShading)
                        , (("shadedsubsection", "headline"), T.SecondaryShading)
                        , (("shadedsubsection", "footline"),  T.SecondaryShading)
                        ]
