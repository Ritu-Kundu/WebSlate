module Themes.Styles.Sober where
{- |
   This module defines Sober Style theme
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
                   { thickness = 1
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
      darkRed = rgb 204 0 0

      darkRedBg = T.SingleColored darkRed
      greyBg = T.SingleColored darkGrey
      
      outer = updateWithRaw "Outer" 
              <| setFontSize T.Tiny <| U.setTextColor defaultStyling black
      outerElements =  updateWithRaw "OuterElements" 
                       <|setFontSize T.Small 
                      <| U.setTextAlign outer centered 
      inner =  updateWithRaw "Inner" 
               <|U.setTextColor defaultStyling black   
      innerElements =  updateWithRaw "InnerElements" 
                       <|inner
      titleLike = updateWithRaw "TitleLike" 
                  <| setFontSize T.Large <| U.setTextColor (U.blendBackground (U.setBackGround outer greyBg) white 0.1) darkRed 
      
      headFootPallette = 
                   { primary = setBgFb outer darkRed black 0.6 greyBg white 0.3
                   , secondary =  setBgFb outer darkRed black 0.7 greyBg white 0.15
                   , tertiary =  setBgFb outer grey white 0.1 darkRedBg black 0.8
                   , quaternary = U.setTextColor (U.blendBackground (U.setBackGround outer greyBg) white 0.05) darkRed 
                   }
      sidebarPallette = 
                   { primary = U.blendTextColor (U.setTextColor inner darkRed) black 0.1
                   , secondary = U.setTextColor outer white
                   , tertiary = U.blendTextColor (U.setTextColor outer darkRed) black 0.5
                   , quaternary = U.blendTextColor (U.setTextColor outer grey) white 0.1
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
      sidebar = U.setTextColor (U.blendBackground (U.setBackGround outer greyBg) white 0.15) darkRed  
      normalText = updateWithRaw "TitleLike" 
                   <|inner
      alertText =  updateWithRaw "AlertText" 
                   <| U.blendTextColor (U.setTextColor normalText darkRed) grey 0.8
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
          , symbolAlpha = 0.7
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

      framebox = U.setBorder innerElements (T.Border (solid black))
      styleLists = 
            { outer = [ (("leftSidebar", "none"), sidebar)
                      , (("rightSidebar", "none"), sidebar)
                      ]
            , inner = [(("framebox","none"),framebox)]
            , symbol = []
            }
     
      updatedMapping = mapping
      slideBackground = 
                       { title = T.SingleColored <|U.blendColors white grey 0.2
                       , section = T.SingleColored white
                       , normal = T.SingleColored white
                       , supportbin = T.SingleColored white
                       }
  in
    U.updateStyleInfo styleLists
    <| Themes.MapStyling.toStyleInfo styleGuide updatedMapping slideBackground
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------







