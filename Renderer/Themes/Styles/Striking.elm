module Themes.Styles.Striking where
{- |
   This module defines Striking Style theme
 -}

import Types.Theme as T
import Types.Intermediate as I
import Utils.Theme as U
import Themes.MapStyling

--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
defaultTheme: [String] -> Maybe Float -> I.RawParentDict -> T.Mapping -> T.StyleInfo
defaultTheme fontFamily normalFontSize rawParentDict mapping = 
  let setFontSize symbolicSize s = 
        U.setTextSize s (U.getRealFontSize symbolicSize  normalFontSize)
      updateWithRaw = U.getUpdatedStyler rawParentDict
      updateSymbolWithRaw = U.getUpdatedSymbolStyler rawParentDict
      setBgFb st fgc1 fgc2 fgalpha bgc1 bgc2 bgalpha = U.blendTextColor (U.setTextColor (U.blendBackground (U.setBackGround st bgc1) bgc2 bgalpha) fgc1) fgc2 fgalpha

      defaultTextStyle = 
                   { typeface = fontFamily
                   , height = normalFontSize
                   , color = black
                   , bold = False
                   , italic  = False
                   , line = Nothing
                   }
      defaultText = 
              { style = defaultTextStyle
              , align = justified
              }
      defaultBackground = T.SingleColored white
      defaultSinglePad = 
                   { thickness = 0
                   , fillcolor = T.Transparent
                   }
      defaultPadding =
                 { left = defaultSinglePad
                 , right = defaultSinglePad
                 , top = defaultSinglePad
                 , bottom = defaultSinglePad
                 }
      defaultStyling = 
                 { border = T.None
                 , text = defaultText
                 , background = defaultBackground
                 , padding =defaultPadding
                 }
      defaultSymbol = 
                { general = defaultStyling
                , symbolShape = T.Circle
                , symbolFill = T.Transparent
                , symbolAlpha = 1
                }
      darkBlue = rgb 0 0 204

      darkBlueBg = T.SingleColored darkBlue
      yellowBg = T.SingleColored yellow
      orangeBg = T.SingleColored orange
      
      outer = updateWithRaw "Outer" 
              <| setFontSize T.Tiny <| U.setTextColor defaultStyling black
      outerElements =  updateWithRaw "OuterElements" 
                       <|setFontSize T.Small <| outer
      inner =  updateWithRaw "Inner" 
               <|U.setTextColor defaultStyling black   
      innerElements =  updateWithRaw "InnerElements" 
                       <|inner
      titleLike = updateWithRaw "TitleLike" 
                  <| setFontSize T.Large <| U.setTextColor (U.blendBackground (U.setBackGround outer yellowBg) orange 0.85) darkBlue 
      
      headFootPallette = 
                   { primary = setBgFb outer darkBlue black 0.6 yellowBg orange 0.85
                   , secondary = setBgFb outer darkBlue black 0.7 yellowBg orange 0.6
                   , tertiary =  setBgFb outer yellow orange 0.5 darkBlueBg black 0.8
                   , quaternary = U.setTextColor (U.blendBackground (U.setBackGround outer yellowBg) orange 0.2) darkBlue 
                   }
      sidebarPallette = 
                   { primary = U.blendTextColor (U.setTextColor inner darkBlue) black 0.1
                   , secondary = U.setTextColor outer white
                   , tertiary = U.blendTextColor (U.setTextColor outer darkBlue) black 0.5
                   , quaternary = U.blendTextColor (U.setTextColor outer yellow) orange 0.1
                   }
      
      shadingPallette =
                   { primary =  U.shadeTextColor headFootPallette.primary 0.4
                   , secondary =  U.shadeTextColor headFootPallette.secondary 0.4
                   , tertiary =  U.shadeTextColor headFootPallette.tertiary 0.4
                   , quaternary =  U.shadeTextColor headFootPallette.quaternary 0.4
                   }
      shadingSidebarPallette = 
                   { primary =  U.shadeTextColor sidebarPallette.primary 0.4
                   , secondary =  U.shadeTextColor sidebarPallette.secondary 0.4
                   , tertiary =  U.shadeTextColor sidebarPallette.tertiary 0.4
                   , quaternary =  U.shadeTextColor sidebarPallette.quaternary 0.4
                   }
      shadingTocPallette = 
                   { primary =  U.shadeTextColor innerElements 0.4
                   , secondary =  U.shadeTextColor innerElements 0.4
                   , tertiary =  U.shadeTextColor innerElements 0.4
                   , quaternary =  U.shadeTextColor innerElements 0.4
                   }
      sidebar = U.setTextColor (U.blendBackground (U.setBackGround outer orangeBg) white 0.75) darkBlue  
      normalText = updateWithRaw "TitleLike" 
                   <|inner
      alertText =  updateWithRaw "AlertText" 
                   <| U.blendTextColor (U.setTextColor normalText darkBlue) yellow 0.8
      highlightText =  updateWithRaw "HighlightText" 
                       <| U.setTextBold normalText

      item = updateWithRaw "Item" 
             <| innerElements
      subitem = updateWithRaw "Subitem" 
                <| setFontSize T.Small <| item
      subsubitem = updateWithRaw "Subsubitem" 
                   <|setFontSize T.FootnoteSize <| subitem

      itemProjection = updateSymbolWithRaw "ItemProjection" 
                       <|
                { general =  setFontSize T.Tiny <| U.setTextColor (defaultStyling) white 
                , symbolShape = T.Triangle
                , symbolFill = T.SingleColored item.text.style.color
                , symbolAlpha = 1
                 }                     
      subitemProjection =  updateSymbolWithRaw "SubitemProjection" 
                           <| U.setSymbolShape itemProjection T.Square
      subsubitemProjection =  updateSymbolWithRaw "SubsubitemProjection" 
                              <| U.setSymbolShape itemProjection T.Circle

      button = 
          { general =  setFontSize T.Tiny<| U.setTextColor innerElements white
          , symbolFill = .background  (U.blendBackground innerElements
                                               innerElements.text.style.color
                                               0.4)
          , symbolShape = T.Rectangle
          , symbolAlpha = 1
          }
      generalSymbol = 
                { general = (U.setBackGround outerElements T.Transparent)
                , symbolShape = T.Circle
                , symbolFill = T.Transparent
                , symbolAlpha = 0.7
                }
      shadedGeneralSymbol =   U.setSymbolAlpha generalSymbol 0.2         
     
      sectionProjection = itemProjection
      shadedSectionProjection =   U.setSymbolAlpha sectionProjection 0.5
                

      miniframeSymbol =  
                   { general = (U.setBackGround outerElements T.Transparent)
                    , symbolShape = T.Circle
                    , symbolFill = T.SingleColored green
                    , symbolAlpha = 1
                    }
       
      shadedMiniframeSymbol =   U.setSymbolAlpha miniframeSymbol 0.5

      symbolBoard = 
         { miniframeSymbol = miniframeSymbol
         , shadedMiniframeSymbol = shadedMiniframeSymbol
         , generalSymbol = generalSymbol
         , shadedGeneralSymbol = shadedGeneralSymbol
         , sectionProjection = sectionProjection
         , shadedSectionProjection = shadedSectionProjection         
         , button = button 
         }
               
      styleGuide = 
         { outer = outer
         , inner = inner
         , outerElements = outerElements
         , innerElements = innerElements
         , titleLike = titleLike
         , headFootPallette = headFootPallette
         , sidebarPallette = sidebarPallette
         , shadingPallette = shadingPallette
         , shadingSidebarPallette = shadingSidebarPallette
         , shadingTocPallette = shadingTocPallette
         , normalText = normalText
         , alertText = alertText
         , highlightText = highlightText
         , item = item
         , subitem = subitem
         , subsubitem = subsubitem
         , itemProjection =itemProjection
         , subitemProjection = subitemProjection
         , subsubitemProjection = subsubitemProjection
         , symbolBoard = symbolBoard
         }
      slideTitle = (U.blendBackground (U.setBackGround titleLike yellowBg) orange 0.9)
      framebox = U.setBorder innerElements (T.Border (solid black))
      styleLists = 
            { outer = [ (("leftSidebar", "none"), sidebar)
                      , (("rightSidebar", "none"), sidebar)
                      ]
            , inner = [(("framebox","none"),framebox)
                      , (("slidetitle", "none"), slideTitle)
                      ]
            , symbol = []
            }
     
      updatedMapping = mapping
      slideBackground = 
                       { title = T.SingleColored white
                       , section = T.SingleColored white
                       , normal = T.SingleColored white
                       , supportbin = T.SingleColored white
                       }
  in
    U.updateStyleInfo styleLists
    <| Themes.MapStyling.toStyleInfo styleGuide updatedMapping slideBackground
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
