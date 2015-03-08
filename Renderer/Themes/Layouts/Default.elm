module Themes.Layouts.Default where
{- |
   This module defines Default Layout theme
 -}

import Types.Theme as T

footlineLayout: T.Layout
footlineLayout = T.Layout {columns = [{id=1, width = 1
                                   , placement = topRight, colAlign = T.TopAlign }]
                       , inserts = [{id="logo",column=1}]
                       }

titlePageLayout: T.Layout
titlePageLayout = T.Layout { columns = [{id=1, width = 1
                                      , placement = middle
                                      , colAlign= T.TopAlign
                                      }
                                     ]
                         , inserts = [{id="title",column=1}
                                     ,{id="subtitle",column=1}
                                     ,{id="author",column=1}
                                     ,{id="institute",column=1}
                                     ,{id="date",column=1}
                                     ,{id="image",column=1}
                                     ]
                         }

navigationalsymbolsLayout: T.Layout
navigationalsymbolsLayout = T.Layout { columns = [{id=1, width = 1
                                                  , placement = middle
                                                  , colAlign= T.TopAlign 
                                                  }
                                                 ]
                                     , inserts = [{id="slidenavigation",column=1}
                                                 ,{id="subsectionnavigation",column=1}
                                                 ,{id="sectionnavigation",column=1}
                                                 ,{id="backforward",column=1}
                                                 ]
                               }
                            
modechangesymbolsLayout: T.Layout
modechangesymbolsLayout =   T.Layout { columns = [{id=1, width = 1
                                                  , placement = middle
                                                  , colAlign= T.TopAlign 
                                                  }
                                                 ]
                                     , inserts = [{id="supportbin",column=1}
                                                 ,{id="zoom",column=1}
                                                 ,{id="scribble",column=1}
                                                 ,{id="quiz",column=1}
                                                 ]
                               }
                            
defaulttocOptions: T.TocOptions
defaulttocOptions = { pauseSections = False
                  , pauseSubsections = False
                  , currentSection = T.Show
                  , otherSection = T.Shade
                  , currentSubsectionOfCurrentSection = T.Show
                  , otherSubsectionOfCurrentSection = T.Show
                  , subsectionOfOtherSection = T.Hide
                  }

defaultLayoutInfo:T.LayoutInfo
defaultLayoutInfo = { headline = T.Empty
                  , footline = footlineLayout
                  , leftSidebar = T.Empty
                  , rightSidebar = T.Empty
                  , navigationalSymbols = navigationalsymbolsLayout
                  , modechangeSymbols = modechangesymbolsLayout
                  , atBeginSectionSlide = (T.Empty, defaulttocOptions)
                  , atBeginSubsectionSlide = (T.Empty, defaulttocOptions)
                  , tocSlide = (T.Empty, defaulttocOptions)
                  , titleSlide = titlePageLayout
                  }

changePalletteMapping: T.ParentList
changePalletteMapping = []

