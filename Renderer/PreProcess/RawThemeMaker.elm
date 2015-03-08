module PreProcess.RawThemeMaker where
{- |
   This module builds the Intermediate Theme structure from Naive theme structures
 -}
import Types.Naive as Naive
import Types.Theme (..)
import Types.Intermediate as I
import Dict
import Utils.Naive (..)

------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
-- Default record for intermediate
defaultRaw: I.Raw
defaultRaw =      { font = Nothing
           , fontColor = Nothing
           , fontSize = Nothing
           , fontBold = Nothing
           , fontItalic = Nothing
           , fontAlign = Nothing
           , borderWidth = Nothing
           , borderColor = Nothing
           , borderDashing = Nothing
           , bg = Nothing
           , padding = Nothing
           , shapeAlpha = Nothing
           , shape = Nothing
           , shapeFill = Nothing
           }

defaultRawPad: I.RawPad           
defaultRawPad =      { leftThick = Nothing
              , rightThick = Nothing
              , bottomThick = Nothing
              , topThick = Nothing
              , leftColor = Nothing
              , rightColor = Nothing
              , bottomColor = Nothing
              , topColor = Nothing
              }

-------------------------------------------------------------------------------------
parentList: [String]
parentList = [     "Outer" , "Inner" , "OuterElements" , "InnerElements" ,
                   "TitleLike" , "NormalText" , "AlertText" , "HighlightText" ,
                   "Item" , "Subitem", "Subsubitem" ,
                   "ItemProjection" , "SubitemProjection" , "SubsubitemProjection"
             ]

rawParentList: [(String,I.RawStyle)]
rawParentList = zip parentList (repeat (length parentList) I.NoChange)

rawParentDict:I.RawParentDict
rawParentDict = Dict.fromList rawParentList

-------------------------------------------------------------------------------------
-- Convert Naive to Intermediate theme for style controllers
applyTheme: Naive.ThemeInfo -> I.RawParentDict
applyTheme themeInfo =
  applyFont themeInfo.guidingFonts
  <| applyColor themeInfo.guidingColors
  <| applyCanvas themeInfo.guidingCanvas rawParentDict

-- Convert Naive to Intermediate theme for individual elements
applyTemplate: Naive.ThemeInfo -> I.RawTemplateDict
applyTemplate themeInfo =
  applyTemplateFont themeInfo.templateFonts
  <| applyTemplateColor themeInfo.templateColors
  <| applyTemplateCanvas themeInfo.templateCanvas Dict.empty

-------------------------------------------------------------------------------------
-- Convert Naive to Intermediate canvas
applyCanvas: [Naive.TemplateCanvas] -> I.RawParentDict -> I.RawParentDict
applyCanvas templateList rawParentDict =
  let updateCanvas templateCanvas rawDict=
        let parentId = templateCanvas.id 
            rawFromDict = Dict.getOrFail parentId rawDict 
            raw = case rawFromDict of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            canvas = templateCanvas.canvas
            options = templateCanvas.options 
            modifiedRaw = processBorderFromCanvas canvas raw
            paddedRaw =  case modifiedRaw.padding of
                           Nothing ->
                             let thickPad = processPadThickness canvas defaultRawPad
                             in
                                if (thickPad == defaultRawPad)
                                then modifiedRaw
                                else {modifiedRaw | padding <- Just thickPad}
                           Just x ->
                             {modifiedRaw | 
                                   padding <- Just (processPadThickness canvas x)}
            optionModifiedRaw = foldr  processOptions paddedRaw options
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle optionModifiedRaw)
        in
            Dict.update parentId set rawDict
  in
     foldr updateCanvas rawParentDict templateList
          
-- Convert Naive to Intermediate Color               
applyColor: [Naive.TemplateColor] -> I.RawParentDict -> I.RawParentDict
applyColor templateList rawParentDict =
  let updateColor templateColor rawDict=
        let parentId = templateColor.id 
            rawFromDict = Dict.getOrFail parentId rawDict 
            raw = case rawFromDict of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            colorInfo = templateColor.colorInfo
            options = templateColor.options 
            modifiedRaw =  
                          processBorderFromColor colorInfo
                       <| processFontColor colorInfo
                       <| { raw | bg <- processFill colorInfo.bg}
            paddedRaw = case modifiedRaw.padding of
                          Nothing ->
                               let coloredPad = processPadColor colorInfo defaultRawPad
                               in
                                  if (coloredPad == defaultRawPad)
                                  then modifiedRaw
                                  else {modifiedRaw | padding <- Just coloredPad}
                          Just x ->
                                 {modifiedRaw | 
                                       padding <- Just (processPadColor colorInfo x)}
            optionModifiedRaw = foldr  processOptions paddedRaw options 
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle optionModifiedRaw)
        in
            Dict.update parentId set rawDict
  in
     foldr updateColor rawParentDict templateList

-- Convert Naive to Intermediate font       
applyFont: [Naive.TemplateFont] -> I.RawParentDict -> I.RawParentDict
applyFont templateList rawParentDict =
  let updateFont templateFont rawDict=
        let parentId = templateFont.id 
            rawFromDict = Dict.getOrFail parentId rawDict 
            raw = case rawFromDict of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            fontInfo = templateFont.fontInfo
            modifiedRaw = processFont fontInfo raw
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle modifiedRaw)
        in
            Dict.update parentId set rawDict
  in
     foldr updateFont rawParentDict templateList
          
     
-------------------------------------------------------------------------------------
---------------------------------------Template--------------------------------------
applyTemplateCanvas: [Naive.TemplateCanvas] -> I.RawTemplateDict -> I.RawTemplateDict
applyTemplateCanvas templateList rawTemplateDict =
  let updateCanvas templateCanvas rawDict=
        let templateId = (templateCanvas.id, templateCanvas.container)  
            updatedRawDict = case (Dict.get templateId rawDict) of
                               Nothing -> Dict.insert templateId  I.NoChange rawDict
                               Just x -> rawDict
            raw = case (Dict.getOrFail templateId updatedRawDict) of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            canvas = templateCanvas.canvas
            options = templateCanvas.options 
            modifiedRaw = processBorderFromCanvas canvas raw
            paddedRaw =  case modifiedRaw.padding of
                           Nothing ->
                             let thickPad = processPadThickness canvas defaultRawPad
                             in
                                if (thickPad == defaultRawPad)
                                then modifiedRaw
                                else {modifiedRaw | padding <- Just thickPad}
                           Just x ->
                             {modifiedRaw | 
                                   padding <- Just (processPadThickness canvas x)}
            optionModifiedRaw = foldr  processOptions paddedRaw options
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle optionModifiedRaw)
        in
            Dict.update templateId set updatedRawDict
  in
     foldr updateCanvas rawTemplateDict templateList
          

applyTemplateColor: [Naive.TemplateColor] -> I.RawTemplateDict -> I.RawTemplateDict
applyTemplateColor templateList rawTemplateDict =
  let updateColor templateColor rawDict=
        let templateId = (templateColor.id, templateColor.container) 
            updatedRawDict = case (Dict.get templateId rawDict) of
                               Nothing -> Dict.insert templateId  I.NoChange rawDict
                               Just x -> rawDict
            raw = case (Dict.getOrFail templateId updatedRawDict) of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            colorInfo = templateColor.colorInfo
            options = templateColor.options 
            modifiedRaw =  
                          processBorderFromColor colorInfo
                       <| processFontColor colorInfo
                       <| { raw | bg <- processFill colorInfo.bg}
            paddedRaw = case modifiedRaw.padding of
                          Nothing ->
                               let coloredPad = processPadColor colorInfo defaultRawPad
                               in
                                  if (coloredPad == defaultRawPad)
                                  then modifiedRaw
                                  else {modifiedRaw | padding <- Just coloredPad}
                          Just x ->
                                 {modifiedRaw | 
                                       padding <- Just (processPadColor colorInfo x)}
            optionModifiedRaw = foldr  processOptions paddedRaw options 
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle optionModifiedRaw)
        in
            Dict.update templateId set updatedRawDict
  in
     foldr updateColor rawTemplateDict templateList
       
applyTemplateFont: [Naive.TemplateFont] -> I.RawTemplateDict -> I.RawTemplateDict
applyTemplateFont templateList rawTemplateDict =
  let updateFont templateFont rawDict=
        let templateId = (templateFont.id, templateFont.container)
            updatedRawDict = case (Dict.get templateId rawDict) of
                               Nothing -> Dict.insert templateId  I.NoChange rawDict
                               Just x -> rawDict
            raw = case (Dict.getOrFail templateId updatedRawDict) of
                    I.NoChange -> defaultRaw
                    I.NewStyle x -> x
            fontInfo = templateFont.fontInfo
            modifiedRaw = processFont fontInfo raw
            set oldRaw = case oldRaw of
                           Nothing -> Nothing
                           Just x -> Just (I.NewStyle modifiedRaw)
        in
            Dict.update templateId set updatedRawDict
  in
     foldr updateFont rawTemplateDict templateList
          
     
-------------------------------------------------------------------------------------
--------------------------------------Fill/color-------------------------------------
-- TODO: DIRECTION HANDLING
-- Currently being ignored
processGradient: String -> FillStyle
processGradient str = 
  let substrList =  String.split "!" str
      direction = head <| tail substrList
      endPos = case direction of 
                   "horizontal" -> (50,50)
                   "vertical" -> (50,50)
      toColorPoint s = 
         let separated = String.split "-" s
             point = toConcreteFloat (head separated)
             color = processColor (last separated)
         in
             (point,color)
      colorPoints = map toColorPoint (drop 2 substrList)
  in 
     Grad (linear (0,0) endPos  colorPoints) (snd <| head colorPoints)      



processFill: String -> Maybe FillStyle
processFill str =
  if    | (str == "") -> Nothing
        | (String.startsWith "grad" str) -> Just (processGradient str)
        | (str == "transparent") -> Just Transparent
        | otherwise -> Just <| SingleColored (processColor str)

-------------------------------------------------------------------------------------
--------------------------------------Border-----------------------------------------
processBorderFromCanvas: Naive.Canvas -> I.Raw -> I.Raw
processBorderFromCanvas canvas raw =
  let 
     convertBorderWidth = case canvas.border of
                             "" -> Nothing
                             "none" -> Just 0
                             "thin" -> Just 1
                             "medium" -> Just 2
                             "thick" -> Just 3 
                             x -> Just <| toConcreteFloat x

     convertBorderDashing = case canvas.borderstyle of
                                   "" -> Nothing
                                   "solid" -> Just []
                                   "dashed" -> Just [8,4]
                                   "dotted" -> Just [3,3]

  in
     { raw | borderWidth <-convertBorderWidth 
           , borderDashing <- convertBorderDashing}
           

processBorderFromColor: Naive.ColorInfo -> I.Raw -> I.Raw
processBorderFromColor colorinfo raw =
  let 
     convertBorderColor = case colorinfo.border of
                            "" -> Nothing
                            x -> Just <| processColor x
  in
     { raw | borderColor <- convertBorderColor  }
            
-------------------------------------------------------------------------------------
-------------------------------------Font--------------------------------------------

processFont: Naive.FontInfo -> I.Raw -> I.Raw
processFont fontinfo raw = 
  let 
    convertSize = case fontinfo.size of 
                    "" -> Nothing
                    "tiny" -> Just Tiny
                    "scriptsize" -> Just ScriptSize
                    "footnotsize" -> Just FootnoteSize
                    "verysmall" -> Just VerySmall
                    "small" -> Just Small
                    "normalsize" -> Just NormalSize
                    "large" -> Just Large
                    "veryLarge" -> Just VeryLarge
                    "huge" -> Just Huge
    convertShapeItalic = case fontinfo.shape of 
                           "" -> Nothing
                           "italic" -> Just True
                           "bold" -> Nothing
                           "normal" -> Just False
                           "bolditalic" -> Just True
    convertShapeBold = case fontinfo.shape of 
                        "" -> Nothing
                        "italic" -> Nothing
                        "bold" -> Just True
                        "normal" -> Just False
                        "bolditalic" -> Just True
                       
    convertAlign   = case fontinfo.align of 
                        "" -> Nothing
                        "left" -> Just Text.leftAligned
                        "right" -> Just Text.leftAligned
                        "center" -> Just Text.centered
                        "justify" -> Just Text.justified
    convertFamily   = case fontinfo.family of 
                        "" -> Nothing
                        x -> Just [x]
  in
    { raw | font <- convertFamily
          , fontSize <- convertSize
          , fontBold <- convertShapeBold
          , fontItalic <- convertShapeItalic
          , fontAlign <- convertAlign}
          

processFontColor: Naive.ColorInfo -> I.Raw -> I.Raw
processFontColor colorinfo raw = 
  let 
    convertFontColor = case colorinfo.fg of
                            "" -> Nothing
                            x -> Just <| processColor x
  in
    { raw | fontColor <- convertFontColor}
-------------------------------------------------------------------------------------
--------------------------------------Padding----------------------------------------
processPadThickness: Naive.Canvas -> I.RawPad -> I.RawPad
processPadThickness canvas rawpad = 
  let convertThickness pad = case pad of
                                "" -> Nothing
                                "thin" -> Just 10
                                "medium" -> Just 15
                                "thick" -> Just 20 
                                x -> Just <| toConcreteInt x
  in
   {rawpad | leftThick <- convertThickness canvas.leftpadding
           , rightThick <-  convertThickness canvas.rightpadding
           , bottomThick <-  convertThickness canvas.bottompadding
           , topThick <-  convertThickness canvas.toppadding}

processPadColor: Naive.ColorInfo -> I.RawPad -> I.RawPad
processPadColor colorinfo rawpad = 
  { rawpad |   leftColor <- processFill colorinfo.leftpadding
              , rightColor <- processFill colorinfo.rightpadding
              , topColor <- processFill colorinfo.toppadding
              , bottomColor <- processFill colorinfo.bottompadding}

-------------------------------------------------------------------------------------
--------------------------------------Options----------------------------------------
convertAlpha: String -> Maybe Float
convertAlpha alpha = case alpha of 
                             "" -> Nothing
                             x -> Just <| toConcreteFloat x

convertShape: String -> Maybe SymbolShape
convertShape shp = case shp of 
                             "" -> Nothing
                             "circle" -> Just Circle
                             "square" -> Just Square
                             "rectangle" -> Just Rectangle
                             "triangle" -> Just Triangle
                             "tick" -> Just Tick

processOptions: Naive.Options -> I.Raw -> I.Raw 
processOptions opt raw=
  case opt.option of
    "fill" -> {raw | shapeFill <- processFill opt.value}
    "alpha" -> {raw | shapeAlpha <- convertAlpha  opt.value}
    "shape" ->  {raw | shape <- convertShape  opt.value}


--------------------------------------------------------------------------------------
------------------------------------Layout--------------------------------------------
--------------------------------------------------------------------------------------
applyLayout: Naive.ThemeInfo -> LayoutInfo -> LayoutInfo
applyLayout themeInfo layoutInfo =
  let toLayout naiveLayout oldLayout =
        case naiveLayout.id of
          "headline" -> {oldLayout | headline <- getLayout naiveLayout }
          "footline" -> {oldLayout | footline <- getLayout naiveLayout }
          "leftsidebar" -> {oldLayout | leftSidebar <- getLayout naiveLayout }
          "rightsidebar" -> {oldLayout | rightSidebar <- getLayout naiveLayout }
          "titleslide" -> {oldLayout | titleSlide <- getLayout naiveLayout }
          "tocslide" -> {oldLayout | tocSlide <- getSectionSlideLayout naiveLayout }
          "atbeginsectionslide" -> {oldLayout | atBeginSectionSlide <- getSectionSlideLayout naiveLayout }
          "atbeginsubsectionslide" ->  {oldLayout | atBeginSubsectionSlide <- getSectionSlideLayout naiveLayout }
          "navigationalsymbols" -> {oldLayout | 
                                                 navigationalSymbols <- (getLayout naiveLayout)}
          "modechangesymbols" -> {oldLayout | 
                                                 modechangeSymbols <- (getLayout naiveLayout)}
  in
     foldr toLayout layoutInfo themeInfo.templateLayout



processColumnInfo: Naive.ColumnInfo -> Column
processColumnInfo naiveColumnInfo =
  { id =  naiveColumnInfo.id
  , width = toConcreteFloat naiveColumnInfo.width
  , placement = case naiveColumnInfo.inColumnAlign of
                  "left" -> midLeft
                  "right" -> midRight
                  "center" -> middle
  , colAlign = case naiveColumnInfo.columnAlign of
                 "t" -> TopAlign
                 "b" -> BottomAlign
                 "c" -> CenterAlign
  }

processInsertInfo: Naive.InsertInfo -> Insert
processInsertInfo naiveInsertInfo =
  { id = naiveInsertInfo.name
  , column = naiveInsertInfo.columnid
  }

getLayoutDetails: Naive.TemplateLayout -> LayoutDetails
getLayoutDetails naiveTemplateLayout = 
  { columns = map processColumnInfo naiveTemplateLayout.columns
  , inserts = map processInsertInfo naiveTemplateLayout.inserts
  }

getLayout: Naive.TemplateLayout -> Layout
getLayout naiveTemplateLayout =
  if (isEmpty naiveTemplateLayout.inserts)
  then Empty
  else Layout (getLayoutDetails naiveTemplateLayout)

defaultToc =     { pauseSections = False
                  , pauseSubsections = False
                  , currentSection = Show
                  , otherSection = Hide
                  , currentSubsectionOfCurrentSection = Show
                  , otherSubsectionOfCurrentSection = Shade
                  , subsectionOfOtherSection = Hide
                  }

processTocString: String -> TocOptions
processTocString str =
  let options = String.split "-" str
      getTocStyle styleStr = case styleStr of
                               "hide" -> Hide
                               "show" -> Show
                               "shaded" -> Shade
      getTocBool boolStr = case boolStr of
                             "true" -> True
                             "false" -> False
      parameter opt = head <| String.split "=" opt  
      value opt = head <| tail <| String.split "=" opt
      sectionStyleList sec = String.split "!" sec 

      updateToc opt oldToc =
        case (parameter opt) of
          "pausesections" -> {oldToc | pauseSections <- getTocBool (value opt)}
          "pausesubsections" -> {oldToc | pauseSubsections <- getTocBool (value opt)}
          "sectionstyle" -> let secStyles =  sectionStyleList (value opt)
                            in {oldToc | currentSection <- getTocStyle <| head secStyles,
                                         otherSection <- getTocStyle <| last secStyles}
          "subsectionstyle" ->  let subsecStyles =  sectionStyleList (value opt)
                                in  {oldToc |currentSubsectionOfCurrentSection <- getTocStyle <| head subsecStyles,
                                             otherSubsectionOfCurrentSection <- getTocStyle <| head <| tail <|  subsecStyles,
                                             subsectionOfOtherSection <- getTocStyle <| last subsecStyles}
         
  in 
      if (isEmpty options)
      then defaultToc 
      else (foldl updateToc defaultToc options)    

getSectionSlideLayout: Naive.TemplateLayout -> SectionSlideLayout
getSectionSlideLayout naiveTemplateLayout =
  let getNewInsertInfo insertInfo = 
                  case insertInfo.name of
                      "section" -> insertInfo
                      "subsection" -> insertInfo
                      "image" -> insertInfo
                      otherwise -> {insertInfo| name <- "toc"}
      oldInserts = naiveTemplateLayout.inserts
      modifiedNaive = 
        { naiveTemplateLayout | inserts <- map getNewInsertInfo oldInserts} 
      processSlideLayout =  getLayout modifiedNaive
      getTocString insInfo = if (String.contains ":" insInfo.name)
                         then head <| tail <| String.split ":" insInfo.name
                         else ""
      processToc = case (filter (\x -> x /= "") (map getTocString oldInserts)) of
                    [] -> defaultToc
                    x -> processTocString (head x)
  in 
    (processSlideLayout, processToc) 
