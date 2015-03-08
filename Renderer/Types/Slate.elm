module Types.Slate where
{- |
   This file describes the format in which data will be used in core-renderer module
 -}

import Types.Theme as T
import Dict
-------------------------------------------------------------------------------------
-- section id
type Id = Int
--route to a section. For example a subsection with id=x.y.z will have route [x,y,z]
type Route = [Id]
--level for section=1, subsection=2, subsubsection=3
type Level = Int
--Route to current slide. If slide is in section x and subsection y, this is [x,y]
type CurrentSectionInfo = [Id]

-- tickLife [0] means present everytime
type Animation = { tickLife: [Int]
                 }

-------------------------------------------------------------------------------------
---------------------------------------Content---------------------------------------
-------------------------------------------------------------------------------------
type Content = [ContentSlide]

data SlideType = PlainSlide | SectionSlide | SubsectionSlide | 
                 TitleSlide | SupportbinSlide | NormalSlide
type ContentSlide = { slideId: Int
                    , slideType: SlideType
                    , partOf: Route
                    , title: String
                    , subtitle: String
                    , supportbin: String
                    , quiz: String
                    , slideContent: [Column]
                    }
type Column = { colAlign: T.ColAlign
              , content: [ColumnContent]
              }
type ColumnContent = { body: [ContentElement]
                     ,  otherLife: Element
                     }

type ContentElement = { element: Element
                      , animation: Animation
                      }

type Supportbin = { supportbinId:String
                  , content:[Element]
                  }
type SupportbinList = [Supportbin]
type Quiz = { id:String
            , qtype: String
            , question: String
            , options: [{option:String, isCorrect:String}]
            , correctAns: [String]
            , explanation: String
            }

type Marker = Element
type Picture = Element

type ConcreteSizeInfo =  
                     { leftSidebar: (T.Width, T.Height)
                     , rightSidebar:(T.Width, T.Height)
                     , headline:(T.Width, T.Height)
                     , footline: (T.Width, T.Height)
                     , navigationSymbol: (T.Width, T.Height)
                     , slideTitle: (T.Width, T.Height)
                     , content: (T.Width, T.Height)
                     } 



--------------------------------------------------------------------------------------
-----------------------------------Intermediate---------------------------------------
--------------------------------------------------------------------------------------
type RawColumnContent =  { containerColumn: Int
                          , inColumnnPos: [Int]
                          , body: [ContentElement]
                          , otherLife: Element
                          }

type CurrentInfoForOuter = { route: Route
                           , currentSlideNumber: String
                           , maxSlideNumber: String
                           }
--------------------------------------------------------------------------------------
--------------------------------------Tick for slides---------------------------------
--------------------------------------------------------------------------------------
type Tick = Int
type SlideIndex = Int
type SectionIdList = [Route]
type SlideIndexInfoList = [(Route,SlideIndex)]

type DictSectionwiseSlide = Dict.Dict Route [SlideIndex]
type TickDict = Dict.Dict Route Tick
