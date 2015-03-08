module Types.Theme where
{- |
   This module contains data-structures used by Renderer to implement Theme
 -}
import Dict

type Width = Int
type Height = Int
type RelWidth = Float
type RelHeight = Float
-- | Template is a pair of id and parentid
type TemplateId = (String, String)
--------------------------------------------------------------------------------------
---------------------------------------------Styling---------------------------------
--------------------------------------------------------------------------------------
{- |
   General styling used by every element
   Position is inbuilt Postion: 
   Here, only : middle, midLeft, midRight corresponding to justification of Text
 -}
type Styling = { border: BorderStyle
               , text: TextStyle
               , background: FillStyle
               , padding: AllPaddingStyle
               }

{- |
   Border can either be a line style or none
   Linestyle is inbuilt elm type:
     {color : Color,
      width : Float,
      cap   : LineCap,
      join  : LineJoin,
      dashing    : [Int],
      dashOffset : Int}
 -}
data BorderStyle = Border LineStyle | None

{- |
    - style is same as inbuilt elm Text.Style which is
     { typeface : [String]
     , height   : Maybe Float
     , color    : Color
     , bold     : Bool
     , italic   : Bool
     , line     : Maybe Line
     }
    - align is one of Text functions leftAligned, rightAligned, centered , justified 
 -}
type TextStyle = { style: Text.Style
                 , align: Text -> Element
                 }
{- | 
   Fill can either be transparent or a single color or a gradient
 -}
data FillStyle = Transparent | SingleColored Color| Grad Gradient Color

type AllPaddingStyle = { left: PaddingStyle
                       , right: PaddingStyle
                       , top: PaddingStyle
                       , bottom: PaddingStyle
                       }
                       
type PaddingStyle = { thickness: Int
                    , fillcolor: FillStyle
                    }

---------------------------------------------SymbolStyling---------------------------
data SymbolShape = Circle | Square | Triangle | Tick | Rectangle

type SymbolStyling = { general: Styling
                     , symbolShape: SymbolShape
                     , symbolFill: FillStyle
                     , symbolAlpha: Float
                     }

type SlideBackground = { title: FillStyle
                       , section: FillStyle
                       , normal: FillStyle
                       , supportbin: FillStyle
                       }
                         

--------------------------------------------------------------------------------------
---------------------------------------------Size-------------------------------------
--------------------------------------------------------------------------------------
-- relative width
type Sizing = { width: Float
              , placement: Position
              }

-- coverage gives the size of the shape 
-- offset is space after symbol. Relative to container                     
type SymbolSizing = { width: Width
                    , height: Height
                    , coverage: Float
                    , offset: Float
                    }
type SymbolSizeInfo = { generalSymbol: SymbolSizing
                      , miniframe: SymbolSizing
                      , sectionProjection: SymbolSizing
                      , itemProjection: SymbolSizing
                      , button: SymbolSizing
                      }
type ComponentSizeInfo =  
                     { leftSidebarWidth: Float
                     , rightSidebarWidth: Float
                     , headlineHeight: Float 
                     , footlineHeight: Float 
                     , navigationSymbolHeight: Float
                     , slideTitleWidth: Float
                     , slideTitleHeight: Float
                     , textWidth: Float
                     , itemTab: Float
                     } 
 
data FontSize = Tiny | ScriptSize | FootnoteSize | VerySmall | Small | NormalSize | Large | VeryLarge | Huge

type FontSizingList = [(TemplateId, FontSize)] 


--------------------------------------------------------------------------------------
---------------------------------------------Layout-----------------------------------
--------------------------------------------------------------------------------------
data ColAlign = TopAlign | BottomAlign | CenterAlign
type Column = { id: Int
              , width: Float
              , placement: Position
              , colAlign: ColAlign
              }
type Insert = { id: String
              , column: Int
              }

type LayoutDetails = { columns:[Column]
                     , inserts: [Insert]
                     }

data Layout = Empty | Layout LayoutDetails

data CollectionDirection = Horizontal | Vertical
--type SymbolCollection = (Layout, CollectionDirection)

data TocStyle = Show | Hide | Shade
type TocOptions = { pauseSections: Bool
                  , pauseSubsections: Bool
                  , currentSection: TocStyle
                  , otherSection: TocStyle
                  , currentSubsectionOfCurrentSection: TocStyle
                  , otherSubsectionOfCurrentSection: TocStyle
                  , subsectionOfOtherSection: TocStyle
                  }

type SectionSlideLayout = (Layout, TocOptions)

type LayoutInfo = { headline: Layout
                  , footline: Layout
                  , leftSidebar: Layout
                  , rightSidebar: Layout
                  , navigationalSymbols: Layout 
                  , modechangeSymbols: Layout
                  , atBeginSectionSlide: SectionSlideLayout
                  , atBeginSubsectionSlide: SectionSlideLayout
                  , tocSlide: SectionSlideLayout
                  , titleSlide: Layout
                  }
data Sidebar = LeftSidebar | RightSidebar
data MiniFramesFoot = AuthorTitle | InstituteTitle | AuthorInstituteTitle | NoFoot


--------------------------------------------------------------------------------------
---------------------------------------------Mapping----------------------------------
--------------------------------------------------------------------------------------
--Contains data-types for mapping Style-controllers to SLATE-elements

data ParentType  = Outer | Inner | OuterElements | InnerElements |
                   TitleLike | NormalText | AlertText | HighlightText |
                   Primary | Secondary |Tertiary | Quaternary |
                   PrimarySidebar | SecondarySidebar |TertiarySidebar | 
                   QuaternarySidebar |
                   PrimaryShading | SecondaryShading |TertiaryShading | 
                   QuaternaryShading |
                   PrimarySidebarShading | SecondarySidebarShading |
                   TertiarySidebarShading | QuaternarySidebarShading |
                   PrimaryTocShading | SecondaryTocShading | TertiaryTocShading | 
                   QuaternaryTocShading |
                   Item | Subitem | Subsubitem |
                   ItemProjection | SubitemProjection | SubsubitemProjection |
                   MiniframeSymbol | ShadedMiniframeSymbol |
                   GeneralSymbol | ShadedGeneralSymbol |
                   SectionProjection | ShadedSectionProjection |
                   Button

type ParentList =[(TemplateId, ParentType)]
type SeparatedParentList = { outer: ParentList
                           , inner: ParentList
                           , symbol: ParentList
                           } 
type MappingDict = Dict.Dict TemplateId ParentType
type Mapping = { outer: MappingDict
               , inner: MappingDict
               , symbol: MappingDict
               }
--------------------------------------------------------------------------------------
---------------------------------------------Styles-----------------------------------
--------------------------------------------------------------------------------------
type Pallette = { primary: Styling
                , secondary: Styling
                , tertiary: Styling
                , quaternary: Styling
                }
type SymbolBoard = 
         { miniframeSymbol: SymbolStyling
         , shadedMiniframeSymbol: SymbolStyling
         , generalSymbol: SymbolStyling
         , shadedGeneralSymbol: SymbolStyling
         , sectionProjection: SymbolStyling
         , shadedSectionProjection: SymbolStyling          
         , button: SymbolStyling
         }
type StyleGuide = 
         { outer: Styling
         , inner: Styling
         , outerElements: Styling
         , innerElements: Styling
         , titleLike: Styling
         , headFootPallette: Pallette
         , sidebarPallette: Pallette
         , shadingPallette: Pallette
         , shadingSidebarPallette: Pallette
         , shadingTocPallette: Pallette
         , normalText: Styling
         , alertText: Styling
         , highlightText: Styling
         , item: Styling
         , subitem: Styling
         , subsubitem: Styling
         , itemProjection: SymbolStyling
         , subitemProjection: SymbolStyling
         , subsubitemProjection: SymbolStyling
         , symbolBoard: SymbolBoard
         }

type StyleLists = { outer: [(TemplateId,Styling)]
                  , inner: [(TemplateId,Styling)]
                  , symbol: [(TemplateId,SymbolStyling)]
                  } 


type TemplateDict = Dict.Dict TemplateId Styling
type SymbolDict = Dict.Dict TemplateId SymbolStyling

type StyleInfo = { outer: TemplateDict
                 , inner:  TemplateDict
                 , symbol:  SymbolDict
                 , slideBackground: SlideBackground
                 }
--------------------------------------------------------------------------------------
---------------------------------------------Templates--------------------------------
--------------------------------------------------------------------------------------
type SymbolSizeDict =  Dict.Dict String SymbolSizing

type Theme =     { style: StyleInfo
                 , componentSize: ComponentSizeInfo
                 , symbolSize: SymbolSizeInfo
                 , layout: LayoutInfo
                  }
              

--------------------------------------------------------------------------------------
---------------------------------------------PresInfo--------------------------------
--------------------------------------------------------------------------------------
type Id = Int
type Route = [Id]
type PresInfo = { presTitle: String
                , presSubTitle: String
                , authors:[String]
                , institute:[String]
                , date: String
                , logo: String
                , titleGraphic: String
                , sectionGraphic: String
                , subsectionGraphic: String
                }
type Section = { route: Route
               , shortName: String
               , longName: String
               }
type SectionList = [Section]
