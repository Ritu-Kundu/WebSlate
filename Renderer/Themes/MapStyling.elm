module Themes.MapStyling where
{- |
   This module maps the style of a style controller to the style of the element it controls
 -}

import Types.Theme (..)
import Dict

-- Note: title/subtitle/autor etc with none is that on titleslide
-- section/subsection/subsub/toc with none is that on section slide etc
-- sectionprojection/sub/subsub or shadedsectionprojection/sub/subsub with none for headline/footline/sidebar etc
-------------------------------------------------------------------------------------
-- It returns the style dictionary after mapping the style of the controllers defined in style guide (from theme) according to the mapping(which controller controls which element)
toStyleInfo: StyleGuide -> Mapping -> SlideBackground -> StyleInfo
toStyleInfo stylingGuide mapping slideBG = 
  let outer = stylingGuide.outer
      inner = stylingGuide.inner
      outerElements = stylingGuide.outerElements
      innerElements = stylingGuide.innerElements
     
      titleLike = stylingGuide.titleLike

      primary = stylingGuide.headFootPallette.primary
      secondary = stylingGuide.headFootPallette.secondary
      tertiary = stylingGuide.headFootPallette.tertiary
      quaternary = stylingGuide.headFootPallette.quaternary

      primarySidebar = stylingGuide.sidebarPallette.primary
      secondarySidebar = stylingGuide.sidebarPallette.secondary
      tertiarySidebar = stylingGuide.sidebarPallette.tertiary
      quaternarySidebar = stylingGuide.sidebarPallette.quaternary
 
      primaryShading = stylingGuide.shadingPallette.primary
      secondaryShading = stylingGuide.shadingPallette.secondary
      tertiaryShading = stylingGuide.shadingPallette.tertiary
      quaternaryShading = stylingGuide.shadingPallette.quaternary

      primarySidebarShading = stylingGuide.shadingSidebarPallette.primary
      secondarySidebarShading = stylingGuide.shadingSidebarPallette.secondary
      tertiarySidebarShading = stylingGuide.shadingSidebarPallette.tertiary
      quaternarySidebarShading = stylingGuide.shadingSidebarPallette.quaternary

      primaryTocShading = stylingGuide.shadingTocPallette.primary
      secondaryTocShading = stylingGuide.shadingTocPallette.secondary
      tertiaryTocShading = stylingGuide.shadingTocPallette.tertiary
      quaternaryTocShading = stylingGuide.shadingTocPallette.quaternary


      normalText = stylingGuide.normalText
      alertText = stylingGuide.alertText
      highlightText = stylingGuide.highlightText

      item = stylingGuide.item
      subitem = stylingGuide.subitem
      subsubitem = stylingGuide.subsubitem
      itemProjection = stylingGuide.itemProjection
      subitemProjection = stylingGuide.subitemProjection
      subsubitemProjection = stylingGuide.subsubitemProjection

      miniframeSymbol = stylingGuide.symbolBoard.miniframeSymbol
      shadedMiniframeSymbol = stylingGuide.symbolBoard.shadedMiniframeSymbol
      generalSymbol = stylingGuide.symbolBoard.generalSymbol
      shadedGeneralSymbol = stylingGuide.symbolBoard.shadedGeneralSymbol
      sectionProjection = stylingGuide.symbolBoard.sectionProjection
      shadedSectionProjection = stylingGuide.symbolBoard.shadedSectionProjection
      button = stylingGuide.symbolBoard.button


      toStyle parent =
        case parent of 
          Outer  -> outer
          Inner  -> inner
          OuterElements  -> outerElements
          InnerElements  -> innerElements
          TitleLike  -> titleLike
          NormalText  -> normalText
          AlertText  -> alertText
          HighlightText  -> highlightText
          Primary  -> primary
          Secondary  -> secondary
          Tertiary  -> tertiary
          Quaternary  -> quaternary
          PrimarySidebar  -> primarySidebar
          SecondarySidebar  -> secondarySidebar
          TertiarySidebar  -> tertiarySidebar
          QuaternarySidebar  -> quaternarySidebar
          PrimaryShading  -> primaryShading
          SecondaryShading  -> secondaryShading
          TertiaryShading  -> tertiaryShading
          QuaternaryShading  -> quaternaryShading
          PrimarySidebarShading  -> primarySidebarShading
          SecondarySidebarShading  -> secondarySidebarShading
          TertiarySidebarShading  -> tertiarySidebarShading
          QuaternarySidebarShading  -> quaternarySidebarShading
          PrimaryTocShading  -> primaryTocShading
          SecondaryTocShading  -> secondaryTocShading
          TertiaryTocShading  -> tertiaryTocShading
          QuaternaryTocShading  -> quaternaryTocShading
          Item  -> item
          Subitem  -> subitem
          Subsubitem  -> subsubitem

      toSymbolStyle parent =
        case parent of
          ItemProjection  -> itemProjection
          SubitemProjection  -> subitemProjection
          SubsubitemProjection  -> subsubitemProjection
          MiniframeSymbol  -> miniframeSymbol
          ShadedMiniframeSymbol  -> shadedMiniframeSymbol
          GeneralSymbol  -> generalSymbol
          ShadedGeneralSymbol  -> shadedGeneralSymbol
          SectionProjection  -> sectionProjection
          ShadedSectionProjection  -> shadedSectionProjection
          Button -> button
               
      
  in
    { outer = Dict.map toStyle mapping.outer
    , inner =  Dict.map toStyle mapping.inner
    , symbol = Dict.map toSymbolStyle mapping.symbol
    , slideBackground = slideBG
    }
