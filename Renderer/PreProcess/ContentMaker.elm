module PreProcess.ContentMaker where
{- |
   This module builds the Content data-structure from Naive data-structures
 -}
import Types.Slate as S
import Types.Naive as Naive
import Types.Theme as T
import Types.SmartDisplay as TSD
import Utils.Naive  (..)
import Utils.Content as UC
import SmartDisplay.SmartList as Smart
import Builders.ElementMaker as BE

-- Converts Naive slide list to Slate slide list
toContent: [Naive.Slide] -> T.Theme -> T.Width -> S.Content
toContent naiveSlideList theme w=
  map (toContentSlide theme w) naiveSlideList

toContentSlide:  T.Theme -> T.Width -> Naive.Slide -> S.ContentSlide
toContentSlide theme w naiveSlide =
  let cols = map (processColumnInfo w) naiveSlide.columns
      getCol id = head <| filter (\x -> x.id == id) cols
      getColWidth id = truncate <| .width <| getCol id  
      getColPlacement id = .placement <| getCol id 
      
      blockToRaw naive = blockToRawColumnContent theme (getColWidth naive.layout.containerColumn) (getColPlacement naive.layout.containerColumn) naive
      rawBlockList = map blockToRaw naiveSlide.slideContent.blocks
      
      textboxToRaw naive = simpleTextBoxToRawColumnContent theme (getColWidth naive.layout.containerColumn) (getColPlacement naive.layout.containerColumn)  naive
      rawTextboxList = map textboxToRaw naiveSlide.slideContent.simpletextboxes
      
      framboxToRaw naive = frameboxToRawColumnContent theme (getColWidth naive.layout.containerColumn) (getColPlacement naive.layout.containerColumn)  naive
      rawFrameboxList = map framboxToRaw naiveSlide.slideContent.frameboxes
      
      imageboxToRaw naive = imageboxToRawColumnContent theme (getColWidth naive.layout.containerColumn) (getColPlacement naive.layout.containerColumn)  naive
      rawImageboxList = map imageboxToRaw naiveSlide.slideContent.imageboxes
      
      smartlistToRaw naive = smartListToRawColumnContent (getColWidth naive.layout.containerColumn) (getColPlacement naive.layout.containerColumn)  naive
      rawSmartList = map smartlistToRaw naiveSlide.slideContent.smartLists


      slatelistToRaw naive = listToRawColumnContent theme (getColWidth naive.layout.containerColumn) midLeft naive
      rawSlatelistList = concatMap slatelistToRaw naiveSlide.slideContent.slateLists

      rawList = rawBlockList ++ rawTextboxList ++ rawFrameboxList ++ rawImageboxList
               ++ rawSlatelistList ++ rawSmartList
     
      partitionedList = UC.rawColumnContentToColumnContent rawList (length cols)
      slateCol = map (\(x,y) -> {colAlign = x, content =y})
                <| zip (map (.colAlign) cols) partitionedList
  in
    { slideId = naiveSlide.id
    , slideType = getSlideType naiveSlide.slideType
    , partOf = getRoute naiveSlide.partOf
    , title = naiveSlide.slideTitle
    , subtitle = naiveSlide.slideSubtitle
    , supportbin =naiveSlide.supportbin
    , quiz= naiveSlide.quiz
    , slideContent = slateCol
    }
 
--------------------------------------------------------------------------------------
toSupportbinContent: [Naive.Supportbin] -> T.Theme -> T.Width -> S.SupportbinList
toSupportbinContent naiveSupportbinList theme w=
  map (toSupportbinSlide theme w) naiveSupportbinList

toSupportbinSlide:  T.Theme -> T.Width -> Naive.Supportbin -> S.Supportbin
toSupportbinSlide theme w naiveSupportbin =
  let 
      simplify raw= if (isEmpty raw.body)
                    then empty
                    else .element <| head <| raw.body
    
      blockToRaw naive =  simplify <| blockToRawColumnContent theme w middle naive
      blockList = map blockToRaw naiveSupportbin.slideContent.blocks
      
      textboxToRaw  naive =  simplify <| simpleTextBoxToRawColumnContent theme w middle naive
      textboxList = map textboxToRaw naiveSupportbin.slideContent.simpletextboxes
      
      framboxToRaw naive  =  simplify <| frameboxToRawColumnContent theme w middle naive
      frameboxList = map framboxToRaw naiveSupportbin.slideContent.frameboxes
      
      imageboxToRaw naive =  simplify <| imageboxToRawColumnContent theme w middle naive
      imageboxList = map imageboxToRaw naiveSupportbin.slideContent.imageboxes

      smartlistToRaw naive = simplify <| smartListToRawColumnContent w middle naive
      rawSmartList = map smartlistToRaw naiveSupportbin.slideContent.smartLists

      
      slatelistToRaw naive = listToRawColumnContent theme w middle naive
      slatelistList = map (\x -> flow down<|map simplify x) 
                         <| map slatelistToRaw naiveSupportbin.slideContent.slateLists

      elementList = blockList ++ textboxList ++ frameboxList ++ imageboxList
               ++ slatelistList ++ rawSmartList
     
  in
    { supportbinId = naiveSupportbin.id
    , content = elementList
    }
 
--------------------------------------------------------------------------------------
blockToRawColumnContent: T.Theme -> T.Width -> Position -> Naive.Block -> S.RawColumnContent
blockToRawColumnContent theme w placement naiveBlock =
  let titleStyling = if (naiveBlock.isAlerted == "true")
                     then  UC.getStyling ("blocktitle", "alertedblock") theme.style
                     else UC.getStyling ("blocktitle", "block") theme.style
      bodyStyling =  if (naiveBlock.isAlerted == "true")
                     then  UC.getStyling ("alertedblock", "none") theme.style
                     else UC.getStyling ("block", "none") theme.style
      titleText = BE.buildText titleStyling naiveBlock.title
      toBodyText =  BE.buildSlateText theme.style bodyStyling  
      bodyTexts = map toBodyText naiveBlock.body
      maxWidth = if (isEmpty bodyTexts)
                 then (widthOf titleText)
                 else max (widthOf titleText) (maximum (map widthOf bodyTexts))
      maxHeight = if (isEmpty bodyTexts)
                  then 0
                  else maximum (map heightOf bodyTexts)
      title = BE.buildCompleteElement (maxWidth, (heightOf titleText)) titleStyling titleText
      toBlockBody = BE.buildCompleteElement (maxWidth, maxHeight) bodyStyling
      rawElemBody = map (\(b, a) -> {element=scaleElem w placement
                                             <|flow down [title,b], animation=a}) 
                          (zip (map toBlockBody bodyTexts) 
                               (map .animation naiveBlock.body))
      firstElem = if(isEmpty rawElemBody)
                  then empty
                  else .element <| head <| rawElemBody
      otherLife = case ( naiveBlock.otherLife) of
                    "dead" -> empty
                    "covered" -> spacer (widthOf firstElem) (heightOf firstElem)
  in
     { containerColumn = naiveBlock.layout.containerColumn
     , inColumnnPos = [naiveBlock.layout.inColumnnPos]
     , body = rawElemBody 
     , otherLife = otherLife
     }
--------------------------------------------------------------------------------------
frameboxToRawColumnContent: T.Theme -> T.Width -> Position -> Naive.Framebox -> S.RawColumnContent
frameboxToRawColumnContent theme w placement naiveFrameBox =
  let bodyStyling = UC.getStyling ("framebox", "none") theme.style
      toBodyText =  BE.buildSlateText theme.style bodyStyling  
      bodyTexts = map toBodyText naiveFrameBox.body
      maxWidth = if (isEmpty bodyTexts)
                 then 0
                 else maximum (map widthOf bodyTexts)
      maxHeight = if (isEmpty bodyTexts)
                  then 0
                  else maximum (map heightOf bodyTexts)
      toBoxBody = BE.buildCompleteElement (maxWidth, maxHeight) bodyStyling
      rawElemBody = map (\(b, a) -> {element=scaleElem w placement
                                             <|b, animation=a}) 
                          (zip (map toBoxBody bodyTexts) 
                               (map .animation naiveFrameBox.body))
      firstElem = if(isEmpty rawElemBody)
                  then empty
                  else .element <| head <| rawElemBody
      otherLife = case ( naiveFrameBox.otherLife) of
                    "dead" -> empty
                    "covered" -> spacer (widthOf firstElem) (heightOf firstElem)
  in
     { containerColumn = naiveFrameBox.layout.containerColumn
     , inColumnnPos = [naiveFrameBox.layout.inColumnnPos]
     , body = rawElemBody 
     , otherLife = otherLife
     }
--------------------------------------------------------------------------------------
simpleTextBoxToRawColumnContent: T.Theme -> T.Width -> Position -> Naive.Framebox -> S.RawColumnContent
simpleTextBoxToRawColumnContent theme w placement naiveTextBox =
  let bodyStyling = UC.getStyling ("normal", "none") theme.style
      toBodyText =  BE.buildSlateText theme.style bodyStyling  
      bodyTexts = map toBodyText naiveTextBox.body
      maxWidth = if (isEmpty bodyTexts)
                 then 0
                 else maximum (map widthOf bodyTexts)
      maxHeight = if (isEmpty bodyTexts)
                  then 0
                  else maximum (map heightOf bodyTexts)
      toBoxBody = BE.buildCompleteElement (maxWidth, maxHeight) bodyStyling
      rawElemBody = map (\(b, a) -> {element=scaleElem w placement
                                             <|b, animation=a}) 
                          (zip (map toBoxBody bodyTexts) 
                               (map .animation naiveTextBox.body))
      firstElem = if(isEmpty rawElemBody)
                  then empty
                  else .element <| head <| rawElemBody
      otherLife = case ( naiveTextBox.otherLife) of
                    "dead" -> empty
                    "covered" -> spacer (widthOf firstElem) (heightOf firstElem)

  in
     { containerColumn = naiveTextBox.layout.containerColumn
     , inColumnnPos = [naiveTextBox.layout.inColumnnPos]
     , body = rawElemBody 
     , otherLife = otherLife
     }
--------------------------------------------------------------------------------------
imageboxToRawColumnContent: T.Theme ->  T.Width -> Position -> Naive.Imagebox -> S.RawColumnContent
imageboxToRawColumnContent theme w placement naiveImageBox =
  let imageFileName = "UserImages/" ++ naiveImageBox.imageFile
      bodyStyling = UC.getStyling ("imagebox", "none") theme.style
      captionStyling = UC.getStyling ("caption", "imagebox") theme.style
      body img = BE.buildCompleteElement (widthOf img, heightOf img) bodyStyling img
      getD optName = let opt = 
                         filter (\x -> x.option == optName) naiveImageBox.imageOptions
                     in
                       if (isEmpty opt) 
                       then w
                       else toConcreteInt <| .value <|head opt
      imgW = getD "width"
      imgH = getD "height"
            
      pic = body <| (fittedImage imgW imgH imageFileName)
                         
      caption = if (naiveImageBox.caption == "")
                then empty
                else  let captionText = BE.buildText captionStyling naiveImageBox.caption
                          hCap = heightOf captionText
                          wCap = widthOf pic
                          scaledCaption = collage w hCap 
                               [ scale ((toFloat wCap)/ toFloat (widthOf captionText)) <| toForm captionText
                               ] 
                      in
                          BE.buildCompleteElement (wCap,hCap) captionStyling scaledCaption

      toImage  = { element = scaleElem w placement <|below caption pic
                 , animation = naiveImageBox.animation}
      
      firstElem = toImage.element
      otherLife = case ( naiveImageBox.otherLife) of
                    "dead" -> empty
                    "covered" -> spacer (widthOf firstElem) (heightOf firstElem)
  in
     { containerColumn = naiveImageBox.layout.containerColumn
     , inColumnnPos = [naiveImageBox.layout.inColumnnPos]
     , body = [toImage] 
     , otherLife = otherLife
     }

processImageOptions: Naive.Options -> Element -> Element 
processImageOptions opt pic=
  case opt.option of
    "width" -> if (opt.value == "") then pic else  width (toConcreteInt opt.value) pic
    "height" ->  if (opt.value == "") then pic else height (toConcreteInt opt.value) pic
    "scale" ->  if (opt.value == "") then pic else
                let h = heightOf pic
                    w = widthOf pic
                    scalefactor = (toConcreteInt opt.value)
                in 
                   size  (w * scalefactor) (h * scalefactor) pic

--------------------------------------------------------------------------------------
smartListToRawColumnContent: T.Width -> Position -> Naive.SmartList -> S.RawColumnContent
smartListToRawColumnContent w placement naiveSmartList =
  let smartDisplay = { width = w
                     , sdType = getSDType naiveSmartList.sdType
                     , items = map processItems naiveSmartList.items
                     }
      smartListRawElem  = { element = scaleElem w placement <|Smart.getSmartDisplay smartDisplay
                          , animation = naiveSmartList.animation}      
      firstElem = smartListRawElem.element
      otherLife = case ( naiveSmartList.otherLife) of
                    "dead" -> empty
                    "covered" -> spacer (widthOf firstElem) (heightOf firstElem)
  in
     { containerColumn = naiveSmartList.layout.containerColumn
     , inColumnnPos = [naiveSmartList.layout.inColumnnPos]
     , body = [smartListRawElem] 
     , otherLife = otherLife
     }

processItems: Naive.SmartItem -> TSD.SmartItem
processItems item =
  { route = getRoute item.id
  , body = item.body
  }

getSDType: String -> TSD.SmartDisplayType
getSDType str =
  case str of
    "circlefull" -> TSD.CircleFull
    "circlehalf" ->  TSD.CircleHalf
    "circlecone" -> TSD.CircleCone
    "plusequalhorizontal" -> TSD.PlusEqualHorizontal
    "plusequalvetical" -> TSD.PlusEqualVertical
    "plusminus" -> TSD.PlusMinus
    "paragraphlist" -> TSD.ParagraphList
    "checkboxcomparision" -> TSD.CheckBoxComparision
    "containerlist" -> TSD.ContainerList
    "framedlist" -> TSD.FramedList

--------------------------------------------------------------------------------------
listToRawColumnContent: T.Theme -> T.Width ->  Position -> Naive.SlateList ->[S.RawColumnContent]
listToRawColumnContent theme w placement naiveSlateList=
  let toSlateItemText naiveListItem = 
         let bodyStyling = getItemStyling naiveListItem.itemType  theme.style
             toBodyText =  BE.buildSlateText theme.style bodyStyling  
             bodyTexts = map toBodyText naiveListItem.body
             maxWidth = if (isEmpty bodyTexts)
                        then 0
                        else maximum (map widthOf bodyTexts)
             maxHeight = if (isEmpty bodyTexts)
                         then 0
                         else maximum (map heightOf bodyTexts)
             toItemBody = BE.buildCompleteElement (maxWidth, maxHeight) bodyStyling
             rawElemBody = map (\(b, a) -> {element=scaleElem w midLeft b, animation=a}) 
                          (zip (map toItemBody bodyTexts) 
                               (map .animation naiveListItem.body))

         in
             (maxWidth, rawElemBody)
      toItemMarkers naiveListItem =
         let markerStyling = getItemMarkerStyling naiveListItem.itemType theme.style
             markerText = if (naiveListItem.itemInfo == "") 
                          then Nothing 
                          else Just naiveListItem.itemInfo
             marker = BE.buildSymbol markerStyling theme.symbolSize.itemProjection markerText
         in
             BE.buildCompleteElement (widthOf marker, heightOf marker) markerStyling.general marker
      slateMaxWidthNItemBodyTexts = map toSlateItemText naiveSlateList.items
      maxItemWidth = maximum (map fst slateMaxWidthNItemBodyTexts)
      slateItemBodyTexts = snd <| unzip slateMaxWidthNItemBodyTexts
      slateMarkers = map toItemMarkers naiveSlateList.items
      offsetWidth =  truncate (theme.symbolSize.itemProjection.offset * (toFloat w))
      levels = map (\x -> length <|  getRoute x.id) naiveSlateList.items

 
      toSlateItem ((marker, itemBody), lvl) =
         let toItemSingle itm =  {element = 
                                    BE.buildTabbedElement 
                                         (maxItemWidth, heightOf itm.element)
                                         lvl offsetWidth marker itm.element
                                 , animation = itm.animation}
         in
             map toItemSingle itemBody

      toItemElement ((ind,itemBody),naiveotherLife) =
         let firstElem = if (isEmpty itemBody)
                         then empty
                         else .element <| head <| itemBody
             otherLife = case ( naiveotherLife) of
                          "dead" -> empty
                          "covered" -> spacer (widthOf firstElem) (heightOf firstElem)
        in
            { containerColumn = naiveSlateList.layout.containerColumn
            , inColumnnPos = [naiveSlateList.layout.inColumnnPos,ind]
            , body = itemBody 
            , otherLife = otherLife
            }
  in 
     map toItemElement 
     <|zip (zip ([1..(length naiveSlateList.items)])  
                (map toSlateItem <| zip (zip slateMarkers slateItemBodyTexts)
                                        (levels)
                 )
           )
           (map .otherLife naiveSlateList.items)
            

getItemStyling: String -> T.StyleInfo -> T.Styling
getItemStyling itemType styleInfo =
  case itemType of
    "itemizeitem" ->  UC.getStyling ("itemizeitem", "none") styleInfo
    "itemizesubitem" ->  UC.getStyling ("itemizesubitem", "none") styleInfo
    "itemizesubsubitem" ->  UC.getStyling ("itemizesubsubitem", "none") styleInfo
    "enumerateitem" ->  UC.getStyling ("enumerateitem", "none") styleInfo
    "enumeratesubitem" ->  UC.getStyling ("enumeratesubitem", "none") styleInfo
    "enumeratesubsubitem" ->  UC.getStyling ("enumeratesubsubitem", "none") styleInfo
    "descriptionitem" ->  UC.getStyling ("descriptionitem", "none") styleInfo
    "descriptionsubitem" ->  UC.getStyling ("descriptionsubitem", "none") styleInfo
    "descriptionsubsubitem" ->  UC.getStyling ("descriptionsubsubitem", "none") styleInfo

getItemMarkerStyling: String -> T.StyleInfo -> T.SymbolStyling
getItemMarkerStyling itemType styleInfo =
  case itemType of
    "itemizeitem" ->  UC.getSymbolStyling ("itemizeitemprojection", "none") styleInfo
    "itemizesubitem" ->  UC.getSymbolStyling ("itemizesubitemprojection", "none") styleInfo
    "itemizesubsubitem" ->  UC.getSymbolStyling ("itemizesubsubitemprojection", "none") styleInfo
    "enumerateitem" ->  UC.getSymbolStyling ("enumerateitemprojection", "none") styleInfo
    "enumeratesubitem" ->  UC.getSymbolStyling ("enumeratesubitemprojection", "none") styleInfo
    "enumeratesubsubitem" ->  UC.getSymbolStyling ("enumeratesubsubitemprojection", "none") styleInfo
    "descriptionitem" ->  UC.getSymbolStyling ("descriptionitemprojection", "none") styleInfo
    "descriptionsubitem" ->  UC.getSymbolStyling ("descriptionsubitemprojection", "none") styleInfo
    "descriptionsubsubitem" ->  UC.getSymbolStyling ("descriptionsubsubitemprojection", "none") styleInfo
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
getSlideType: String -> S.SlideType
getSlideType string =
  case string of
    "plain" -> S.PlainSlide 
    "section" -> S.SectionSlide 
    "subsection" -> S.SubsectionSlide 
    "title" -> S.TitleSlide 
    "supportbin" -> S.SupportbinSlide 
    "normal" -> S.NormalSlide

getRoute: String -> S.Route
getRoute string =
  String.split "." string
  |> map toConcreteInt

scaleElem: Int -> Position -> Element -> Element
scaleElem w placement elem =
  let scaleFactor = (toFloat w)/ (toFloat <| widthOf elem)
      newH = truncate (scaleFactor * (toFloat <| heightOf elem))
  in
      if (widthOf elem > w)
      then  collage w newH  [(scale scaleFactor <| toForm elem)]
      else container w (heightOf elem) placement elem


processColumnInfo:  T.Width -> Naive.ColumnInfo -> T.Column
processColumnInfo  w naiveColumnInfo=
  { id = naiveColumnInfo.id
  , width = (toConcreteFloat naiveColumnInfo.width) * (toFloat w)
  , placement = case naiveColumnInfo.inColumnAlign of
                  "left" -> midLeft
                  "right" -> midRight
                  "center" -> middle
  , colAlign = case naiveColumnInfo.columnAlign of
                 "t" -> T.TopAlign
                 "b" -> T.BottomAlign
                 "c" -> T.CenterAlign
  }
