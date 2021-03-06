module Utils.Theme where
{- |
   This module defines utility functions needed to build theme
 -}

import Dict
import Types.Theme (..)
import Types.Intermediate as I
import Themes.SizeSettings

--------------------------------------------------------------------------------------
-- common function to blend two colors
blendColors: Color -> Color -> Float ->Color
blendColors color1 color2 blendAlpha =
  let c1 = toRgb color1
      c2 = toRgb color2
      average num1 num2 = truncate (((toFloat num1) * blendAlpha) + 
                                     ((toFloat num2)) * (1-blendAlpha))
      newR = average c1.red c2.red
      newG = average c1.green c2.green
      newB = average c1.blue c2.blue
      bewA = (c1.alpha * blendAlpha) + (c2.alpha * (1-blendAlpha))
  in
    rgb newR newG newB

--------------------------------------------------------------------------------------
------------------------------------Styling-------------------------------------------
--------------------------------------------------------------------------------------

------------------------------------Background----------------------------------------
setBackGround: Styling -> FillStyle -> Styling
setBackGround oldStyle newbackground =
   { oldStyle | background <- newbackground}

getBackgroundColor: Styling -> Color
getBackgroundColor style =
   case style.background of
    Transparent -> rgba 0 0 0 0  
    SingleColored color -> color
    Grad gradient color -> color

-- returns singlecolored in case of gradient without blending
blendBackground: Styling -> Color -> Float -> Styling
blendBackground oldStyle secondColor blendAlpha =
  let newColor =  blendColors (getBackgroundColor oldStyle) secondColor blendAlpha
  in
    { oldStyle | background <- SingleColored newColor }

-----------------------------------------Text------------------------------------------
setTextAlign: Styling -> (Text -> Element) -> Styling
setTextAlign oldStyle alignFunc =
  let oldText = oldStyle.text
  in
    { oldStyle | 
        text <- { oldText |
                    align <- alignFunc}}


setTextBold: Styling -> Styling
setTextBold oldStyle =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | bold <- True}}}

unsetTextBold: Styling -> Styling
unsetTextBold oldStyle =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | bold <- False}}}

setTextItalic: Styling -> Styling
setTextItalic oldStyle =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | italic <- True}}}
unsetTextItalic: Styling -> Styling
unsetTextItalic oldStyle =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | italic <- False}}}


setTextSize: Styling -> Maybe Float -> Styling
setTextSize oldStyle newFontSize =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | height <- newFontSize}}}

setTextFont: Styling -> [String] -> Styling
setTextFont oldStyle newFont =
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | typeface <- newFont}}}

setTextColor: Styling -> Color -> Styling
setTextColor oldStyle newColor=
  let oldText = oldStyle.text
      oldTextStyle = oldStyle.text.style
  in
    { oldStyle | 
        text <- { oldText |
                    style <- {oldTextStyle | color <- newColor}}}

blendTextColor: Styling -> Color -> Float -> Styling
blendTextColor oldStyle secondColor blendAlpha =
  let newColor = blendColors oldStyle.text.style.color secondColor blendAlpha
  in
    setTextColor oldStyle newColor

-- blending with background
shadeTextColor:  Styling -> Float -> Styling
shadeTextColor oldStyle  blendAlpha =
  let newColor = blendColors oldStyle.text.style.color (getBackgroundColor oldStyle) blendAlpha
  in
    setTextColor oldStyle newColor

---------------------------------------Symbol------------------------------------------
setSymbolAlpha: SymbolStyling -> Float -> SymbolStyling
setSymbolAlpha oldStyle newAlpha = 
  { oldStyle | symbolAlpha <- newAlpha}

setSymbolFill: SymbolStyling -> FillStyle -> SymbolStyling
setSymbolFill oldStyle newFill = 
  { oldStyle | symbolFill <- newFill}

setSymbolShape: SymbolStyling -> SymbolShape -> SymbolStyling
setSymbolShape oldStyle newShape = 
  { oldStyle | symbolShape <- newShape}

--------------------------------------Border-------------------------------------------
setBorder: Styling -> BorderStyle -> Styling
setBorder oldStyle newBorder = 
  { oldStyle | border <- newBorder}

setBorderWidth: Styling -> Float -> Styling
setBorderWidth oldStyle newWidth =
  let newBorder = case oldStyle.border of
                    None -> if newWidth == 0 then None 
                            else Border {defaultLine |
                                           width <- newWidth}
                    Border x -> if newWidth == 0 then None 
                                else Border {x |
                                              width <- newWidth}
  in
    { oldStyle | 
        border <- newBorder}
 

setBorderColor: Styling -> Color -> Styling
setBorderColor oldStyle newColor =
  let newBorder = case oldStyle.border of
                    None -> Border {defaultLine |
                                           color <- newColor}
                    Border x -> Border {x |
                                           color <- newColor}
  in
    { oldStyle | 
        border <- newBorder}
 
setBorderDashing: Styling -> [Int] -> Styling
setBorderDashing oldStyle newDashing =
  let newBorder = case oldStyle.border of
                    None -> Border {defaultLine |
                                           dashing <- newDashing}
                    Border x -> Border {x |
                                           dashing <- newDashing}
  in
    { oldStyle | 
        border <- newBorder}
----------------------------------------Padding---------------------------------------
setPaddingThickness: PaddingStyle -> Int -> PaddingStyle
setPaddingThickness oldPadStyle newThickness =
  {oldPadStyle | thickness <- newThickness}

setPaddingColor: PaddingStyle -> FillStyle -> PaddingStyle
setPaddingColor oldPadStyle newColor =
  {oldPadStyle | fillcolor <- newColor}

 
-------------------------------------Font---------------------------------------------
getNormalFontSize: Maybe Float
getNormalFontSize = Themes.SizeSettings.normalFontSize

getRealFontSize: FontSize -> Maybe Float -> Maybe Float
getRealFontSize fs normal =
  let changeBy number = case normal of 
                          Nothing -> Nothing
                          Just x -> Just (x + number)
  in  
    case fs of 
     Tiny -> changeBy -12
     ScriptSize -> changeBy -10
     FootnoteSize -> changeBy -8
     VerySmall -> changeBy -6
     Small -> changeBy -3
     NormalSize -> changeBy 0
     Large -> changeBy 2
     VeryLarge -> changeBy 4
     Huge -> changeBy 6

--------------------------------------------------------------------------------------
---------------Combining Intermediate Raw style with Internal style-------------------
--------------------------------------------------------------------------------------

combineRawAndStyle: I.Raw -> Styling -> Styling
combineRawAndStyle raw styling = 
   let changeFont style = case raw.font of
                            Nothing -> style
                            Just x -> setTextFont style x
       changeFontColor style = case raw.fontColor of
                            Nothing -> style
                            Just x -> setTextColor style x
       changeFontSize style = case raw.fontSize of
                            Nothing -> style
                            Just x -> setTextSize style (getRealFontSize x (Just 16))
       changeFontBold style = case raw.fontBold of
                            Nothing -> style
                            Just x -> if x then setTextBold style
                                           else unsetTextBold style
       changeFontItalic style = case raw.fontItalic of
                            Nothing -> style
                            Just x -> if x then setTextItalic style
                                           else unsetTextItalic style

       changeFontAlign style = case raw.fontAlign of
                            Nothing -> style
                            Just x -> setTextAlign style x 
                                
       changeBorderWidth style = case raw.borderWidth of
                            Nothing -> style
                            Just x -> setBorderWidth style x 
       changeBorderColor style = case raw.borderColor of
                            Nothing -> style
                            Just x -> setBorderColor style x 
       changeBorderDashing style = case raw.borderDashing of
                            Nothing -> style
                            Just x -> setBorderDashing style x 
       changeBG style = case raw.bg of
                            Nothing -> style
                            Just x -> setBackGround style x 
       changeSinglePadThickness t padStyle  = case t of
                                              Nothing -> padStyle
                                              Just x -> setPaddingThickness padStyle  x
       changeSinglePadColor c padStyle = case c of
                                              Nothing -> padStyle
                                              Just x -> setPaddingColor padStyle  x

       changeSinglePad padStyle  t c =     changeSinglePadThickness t
                                        <| (changeSinglePadColor c padStyle)
       changePadding style = case raw.padding of
                               Nothing -> style
                               Just x -> let pad = style.padding
                                             allPads = { 
                                                       left = changeSinglePad pad.left x.leftThick x.leftColor
                                                        , right = changeSinglePad pad.right x.rightThick x.rightColor
                                                        , top = changeSinglePad pad.top x.topThick x.topColor
                                                        , bottom = changeSinglePad pad.bottom x.bottomThick x.bottomColor}

                                         in 
                                             {style | padding <- allPads}
   in 
      changeFont <| changeFontColor <| changeFontSize <| changeFontBold 
      <| changeFontItalic <| changeFontAlign 
      <| changeBorderWidth <| changeBorderColor <| changeBorderDashing 
      <| changeBG <| changePadding styling

-- For Symbols
combineRawAndSymbolStyle: I.Raw -> SymbolStyling -> SymbolStyling
combineRawAndSymbolStyle raw symbolStyling = 
   let changeShape style = case raw.shape of
                            Nothing -> style
                            Just x -> setSymbolShape style x
       changeFill style = case raw.shapeFill of
                            Nothing -> style
                            Just x -> setSymbolFill style x
       changeAlpha style = case raw.shapeAlpha of
                            Nothing -> style
                            Just x -> setSymbolAlpha style x
       generalStyle = symbolStyling.general
      
   in 
      changeShape <| changeFill <|  changeAlpha 
      <| {symbolStyling | general <- (combineRawAndStyle raw generalStyle)}


getUpdatedStyler: I.RawParentDict -> String -> Styling -> Styling
getUpdatedStyler rawParentDict parent style =
  let raw = Dict.getOrFail parent rawParentDict
  in
    case raw of
      I.NoChange -> style
      I.NewStyle x -> combineRawAndStyle x style

getUpdatedSymbolStyler: I.RawParentDict -> String -> SymbolStyling -> SymbolStyling
getUpdatedSymbolStyler rawParentDict parent style =
  let raw = Dict.getOrFail parent rawParentDict
  in
    case raw of
      I.NoChange -> style
      I.NewStyle x -> combineRawAndSymbolStyle x style
-----------------------------------------------------------------------------------
-- Merging
mergeWithRaw: I.RawTemplateDict -> TemplateDict -> TemplateDict 
mergeWithRaw rawTemplateDict templateDict =
  let styleAfterRaw templateId style tDict = 
        let rawStyle = case (Dict.get templateId rawTemplateDict) of
                         Nothing ->  I.NoChange
                         Just x-> x
            newStyle = case rawStyle of
                         I.NoChange -> style
                         I.NewStyle x -> combineRawAndStyle x style
        in
          Dict.insert templateId style tDict
  in
      Dict.foldr styleAfterRaw Dict.empty templateDict

mergeSymbolWithRaw: I.RawTemplateDict -> SymbolDict -> SymbolDict 
mergeSymbolWithRaw rawTemplateDict templateDict =
  let styleAfterRaw templateId style tDict = 
        let rawStyle = case (Dict.get templateId rawTemplateDict) of
                         Nothing ->  I.NoChange
                         Just x-> x
            newStyle = case rawStyle of
                         I.NoChange -> style
                         I.NewStyle x -> combineRawAndSymbolStyle x style
        in
          Dict.insert templateId style tDict
  in
      Dict.foldr styleAfterRaw Dict.empty templateDict
                    
--------------------------------------------------------------------------------------
----------------------Getting Style Info of an element from dictionary-----------------
--------------------------------------------------------------------------------------

outerList: [TemplateId]
outerList =    [ ("headline", "none")
               , ("footline", "none")
               , ("leftsidebar", "none")
               , ("rightsidebar", "none")
               , ("miniframes","none")
               , ("logo","none")
               
               , ("title", "none")
               , ("title", "headline")
               , ("title", "footline")
               , ("title", "sidebar")

               , ("subtitle", "none")
               , ("subtitle", "headline")
               , ("subtitle", "footline")
               , ("subtitle", "sidebar")

               , ("author", "none") 
               , ("author", "headline")
               , ("author", "footline")
               , ("author", "sidebar")

               , ("date", "none") 
               , ("date", "headline")
               , ("date", "footline")
               , ("date", "sidebar")

               , ("institute", "none") 
               , ("institute", "headline")
               , ("institute", "footline")
               , ("institute", "sidebar")

               , ("slidenumber", "none")
               , ("slidenumber", "headline")
               , ("slidenumber", "footline")
               , ("slidenumber", "sidebar")

               , ("titlegraphic", "none")
               , ("sectiongraphic", "none")
               , ("subsectiongraphic", "none")
  

               , ("slidetitle", "none")
               , ("slidesubtitle", "none")

               , ("section", "none") 
               , ("section", "headline")
               , ("section", "footline")
               , ("section", "sidebar")

               , ("subsection", "none") 
               , ("subsection", "headline")
               , ("subsection", "footline")
               , ("subsection", "sidebar")

               , ("subsubsection", "none")
               , ("subsubsection", "headline")
               , ("subsubsection", "footline")
               , ("subsubsection", "sidebar")

               , ("shadedsection", "headline")
               , ("shadedsection", "footline")
               , ("shadedsection", "sidebar")
               
               , ("shadedsubsection", "headline")
               , ("shadedsubsection", "footline")
               , ("shadedsubsection", "sidebar")

               , ("shadedsubsubsection", "headline")
               , ("shadedsubsubsection", "footline")
               , ("shadedsubsubsection", "sidebar")
               ]
innerList: [TemplateId]
innerList =         [ ("block", "none")
                    , ("framebox", "none")
                    , ("imagebox", "none")
                    , ("alertedblock", "none")
                    , ("quiz", "none")                  
                   
                    , ("blocktitle", "block")
                    , ("blocktitle", "alertedblock")
                   
                    , ("normal", "none")
                    , ("highlight", "none")
                    , ("alert", "none")

                    , ("itemizeitem", "none")
                    , ("itemizesubitem", "none")
                    , ("itemizesubsubitem", "none")
                    , ("enumerateitem", "none") 
                    , ("enumeratesubitem", "none")
                    , ("enumeratesubsubitem", "none")
                    , ("descriptionitem", "none")
                    , ("descriptionsubitem", "none")
                    , ("descriptionsubsubitem", "none") 

                    , ("caption", "imagebox")
                    , ("captionnameandnumber", "imagebox")

                     
                    , ("toc", "none")
                    , ("section", "toc")
                    , ("subsection", "toc") 
                    , ("subsubsection", "toc")
                    , ("shadedsection", "toc")
                    , ("shadedsubsection", "toc")
                    , ("shadedsubsubsection", "toc")
                 
                    ]  


getDictType: TemplateId -> String
getDictType templateId =
  let anyOuter = any (\t -> t == templateId) outerList
      anyInner = any (\t -> t == templateId) innerList
  in
     if (anyOuter)
     then "outer"
     else if anyInner
          then "inner"
          else "symbol"

separateList: ParentList -> SeparatedParentList
separateList parentList =
  let separateIn str = filter (\item -> (getDictType (fst item)) == str) parentList
  in
      { outer = separateIn "outer"
      , inner = separateIn "inner"
      , symbol = separateIn "symbol"
      }

updateMapping: Mapping -> ParentList -> Mapping
updateMapping mapping parentList  =
  let changeParent item mappingDict = 
        let templateId = fst item
            newParent = snd item
            change oldParent = case oldParent of
                                 Nothing -> Nothing
                                 Just x -> Just newParent
        in 
            Dict.update templateId change mappingDict
      separatedList = separateList parentList
      updateDict list dict = foldr changeParent dict list           
  in
      { outer = updateDict separatedList.outer mapping.outer
      , inner = updateDict separatedList.inner mapping.inner
      , symbol = updateDict separatedList.symbol mapping.symbol
      }

-------------------------------------------------------------------------------------
updateStyleInfo: StyleLists -> StyleInfo -> StyleInfo
updateStyleInfo styleLists styleInfo =
  let changeStyle item styleDict = 
        let templateId = fst item
            newStyle = snd item
            change oldStyle = case oldStyle of
                                 Nothing -> Nothing
                                 Just x -> Just newStyle
        in 
            Dict.update templateId change styleDict
      
      changeSymbolStyle item styleDict = 
        let templateId = fst item
            newStyle = snd item
            change oldStyle = case oldStyle of
                                 Nothing -> Nothing
                                 Just x -> Just newStyle
        in 
            Dict.update templateId change styleDict
      updateDict list dict = foldr changeStyle dict list
      updateStyleDict list dict = foldr changeSymbolStyle dict list           
  in
      { outer = updateDict styleLists.outer styleInfo.outer
      , inner = updateDict styleLists.inner styleInfo.inner
      , symbol = updateStyleDict styleLists.symbol styleInfo.symbol
      , slideBackground = styleInfo.slideBackground
      }

--------------------------------------------------------------------------------------
------------------------------------Layout--------------------------------------------
--------------------------------------------------------------------------------------
adjustFontSize: FontSizingList -> StyleInfo -> StyleInfo
adjustFontSize  fontSizeList styleInfo =
  let setFontSize symbolicSize s = 
        setTextSize s (getRealFontSize symbolicSize  getNormalFontSize)
      changeFontSize item styleDict = 
        let templateId = fst item
            newSize = snd item
            change oldStyle = case oldStyle of
                                 Nothing -> Nothing
                                 Just x -> Just (setFontSize newSize x)
        in 
            Dict.update templateId change styleDict
      changeSymbolFontSize item styleDict = 
        let templateId = fst item
            newSize = snd item
            change oldStyle = case oldStyle of
                                 Nothing -> Nothing
                                 Just x -> Just {x | general <- (setFontSize newSize x.general)}
        in 
            Dict.update templateId change styleDict
      separateIn str = filter (\item -> (getDictType (fst item)) == str) fontSizeList
      updateDict list dict = foldr changeFontSize dict list 
      updateSymbolDict list dict = foldr changeSymbolFontSize dict list          
  in
      { outer = updateDict (separateIn "outer") styleInfo.outer
      , inner = updateDict (separateIn "inner") styleInfo.inner
      , symbol = updateSymbolDict (separateIn "symbol") styleInfo.symbol
      , slideBackground = styleInfo.slideBackground
      }


