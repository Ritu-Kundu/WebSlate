module Builders.Outer where
{- |
   This module builds the Outer elements and Marker slides
 -}

import Graphics.Input as Input

import Types.Slate as S
import Types.Naive as Naive
import Types.Theme as T
import Types.Context as C
import Utils.Naive  (..)
import Utils.Content as UC
import Utils.Builder as UB

import Builders.ElementMaker as BE
import Builders.Context (..)
--import Debug
-- Builds Outer component
buildOuterComponent: T.Theme -> (T.Width, T.Height) -> String -> T.PresInfo -> T.SectionList -> S.CurrentInfoForOuter -> S.TickDict -> Element 
buildOuterComponent theme (w, h) componentType presInfo sectionList currentInfo tickDict=
  let componentLayout = getLayout componentType theme.layout
  in
      case componentLayout of
        T.Empty -> empty
        T.Layout layoutDetails -> case componentType of
                                    "navigationalsymbols" -> buildSymbolPanel 
                                                               layoutDetails theme h
                                                               "navigationalsymbols"
                                                                sectionList 
                                                                currentInfo.route tickDict

                                    "modechangesymbols" -> buildSymbolPanel 
                                                               layoutDetails theme h
                                                               "modechangesymbols"
                                                                sectionList 
                                                                currentInfo.route tickDict

                                    otherwise -> buildConcreteComponent 
                                                    layoutDetails theme presInfo w h 
                                                    componentType sectionList 
                                                    currentInfo tickDict

-- Builds components: Headline/ Footline/ Sidebars
buildConcreteComponent : T.LayoutDetails -> T.Theme -> T.PresInfo -> T.Width -> T.Height -> String -> T.SectionList -> S.CurrentInfoForOuter -> S.TickDict-> Element 
buildConcreteComponent layoutDetails theme presInfo 
                       w h componentType sectionList currentInfo tickDict=
  let cols = layoutDetails.columns
      getCol id = head <| filter (\x -> x.id == id) cols
      getColWidth id = .width <| getCol id  
      getColPlacement id = .placement <| getCol id
      
      currentRoute = currentInfo.route     

      toIntermediateElement ins = 
        let width = truncate <|(getColWidth ins.column) * (toFloat w)
            placement = getColPlacement ins.column
            partialBuilder func = func theme width placement sectionList 
                                         currentRoute tickDict componentType 
            miniframes = partialBuilder buildMiniframes
            sectionNavigation  = partialBuilder buildSectionNavigation
            subsectionNavigation = partialBuilder buildSubsectionNavigation
            toc = partialBuilder buildSidebarToc
            sectionType = partialBuilder buildSectionType
            treesubsection = partialBuilder buildTreeSubsection 
            simple elem t =  buildComponentTextElement elem componentType t theme.style width placement
        in 
            case ins.id of
              "navigation" ->if(isEmpty sectionList) then empty 
                             else miniframes T.Horizontal 
              "navigationvertical" -> if(isEmpty sectionList) then empty 
                             else miniframes T.Vertical
              "sectionnavigation" -> if(isEmpty sectionList) then empty 
                             else sectionNavigation T.Horizontal
              "sectionnavigationvertical" -> if(isEmpty sectionList) then empty 
                             else sectionNavigation T.Vertical
              "subsectionnavigation" -> if(isEmpty sectionList) then empty 
                             else subsectionNavigation T.Horizontal
              "subsectionnavigationvertical" ->if(isEmpty sectionList) then empty 
                             else subsectionNavigation T.Vertical
              "toc" -> if(isEmpty sectionList) then empty 
                             else toc

              "treesection" -> if(isEmpty sectionList) then empty 
                             else treesubsection "section"
              "treesubsection" -> if(isEmpty sectionList) then empty 
                             else treesubsection "subsection"
              "section" -> if(isEmpty sectionList) then empty 
                             else sectionType "section"
              "subsection" -> if(isEmpty sectionList) then empty 
                             else sectionType "subsection"
              "subsubsection" -> if(isEmpty sectionList) then empty 
                             else sectionType "subsubsection"

              "logo" -> buildImage "logo"  presInfo.logo width theme 

              "slidenumber" -> simple "slidenumber" currentInfo.currentSlideNumber
              "slidenumberandtotal" -> simple "slidenumber" 
                                  (currentInfo.currentSlideNumber ++ "/" ++
                                      currentInfo.maxSlideNumber)
        
              x -> simple x (getElementText x presInfo)

  in                        
     BE.buildCompleteElement (w,h) (UC.getStyling (componentType, "none") theme.style)
                          (getCompleteComponent layoutDetails (w,h) toIntermediateElement)

--------------------------------------------------------------------------------------
-- Build miniframes
buildMiniframes: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route ->  S.TickDict -> String -> T.CollectionDirection -> Element
buildMiniframes theme w placement sectionList currentRoute tickDict containerType direction =
  let  currentFrame = UC.getSymbolStyling ("current", "miniframes") theme.style
       currentsubsectionFrame = UC.getSymbolStyling ("currentsubsection", "miniframes") theme.style
       othersubsectionFrame = UC.getSymbolStyling ("othersubsection", "miniframes") theme.style
       othersectionFrame = UC.getSymbolStyling ("othersection", "miniframes") theme.style
       numCols = UB.getNumberOfSections sectionList
       width = case direction of
                 T.Horizontal -> truncate <| (toFloat w)/ (toFloat numCols)
                 T.Vertical -> w
       offsetSpacerWidth =  truncate <| (theme.symbolSize.miniframe.offset )
       offsetSpacer = spacer (offsetSpacerWidth) theme.symbolSize.miniframe.height
       clickable sec elem = UB.makeClickable tickDict sec elem
       makeHead elem txt = buildComponentTextElement elem containerType txt theme.style width placement
       makeMiniframe styling =  BE.buildSymbol styling theme.symbolSize.miniframe Nothing 
       makeSection section = clickable section.route <| 
                            if (UB.isCurrentSection currentRoute section)
                            then makeHead "section" section.shortName
                            else makeHead "shadedsection" section.shortName
       makeSubsection section = empty
       makeSubsubsection section =  clickable section.route <|
                                   if  (UB.isCurrentSection currentRoute section)
                                   then if (UB.isCurrentSubsection currentRoute section)
                                        then if (UB.isCurrentSubsubsection currentRoute section)
                                             then makeMiniframe currentFrame
                                             else makeMiniframe currentsubsectionFrame
                                        else makeMiniframe othersubsectionFrame
                                   else makeMiniframe othersectionFrame
       routeAndElementList = UB.levelwiseRouteMap [makeSection, makeSubsection, makeSubsubsection] sectionList
       sectionwiseList = UB.partitionInSection routeAndElementList
       toSubsectionFrameCollection routeAndElemList = flow right
                                                      <| intersperse offsetSpacer 
                                                      <| snd 
                                                      <| unzip  routeAndElemList
        
       toSectionFrameCollection secList =  flow down
                                        <| map (toSubsectionFrameCollection) 
                                        <| UB.partitionInSubsection secList
       sectionCollection = map (\(x,y) -> above x y) 
                             <| zip 
                                 (map (\x -> snd <| head x) sectionwiseList) 
                                 (map toSectionFrameCollection sectionwiseList) 
       
       miniframes = case direction of 
                     T.Horizontal -> flow right sectionCollection
                     T.Vertical -> flow down sectionCollection

  in 
     BE.buildCompleteElement (w, heightOf miniframes)  (UC.getStyling ("miniframes","none") theme.style) miniframes
    


--------------------------------------------------------------------------------------
-- Build section navigation
buildSectionNavigation: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route -> S.TickDict -> String -> T.CollectionDirection -> Element
buildSectionNavigation theme w placement sectionList currentRoute tickDict containerType direction =
  let  numCols = UB.getNumberOfSections sectionList                   
       width = case direction of
                 T.Horizontal -> truncate <| (toFloat w)/ (toFloat numCols)
                 T.Vertical -> w
       clickable sec elem = UB.makeClickable tickDict sec elem
       makeHead elem txt = buildComponentTextElement elem containerType txt theme.style width placement
       makeSection section =  clickable section.route <| 
                            if (UB.isCurrentSection currentRoute section)
                            then makeHead "section" section.shortName
                            else makeHead "shadedsection" section.shortName
       sections =  UB.filterOutSection sectionList
       sectionCollection = if  (isEmpty sections)
                              then [makeHead "section" " "]
                              else  UB.toElementMap [makeSection] sectionList
  in
    case direction of 
      T.Horizontal -> flow right sectionCollection
      T.Vertical -> flow down sectionCollection

--------------------------------------------------------------------------------------
-- build subsection navigation
buildSubsectionNavigation: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route -> S.TickDict  -> String -> T.CollectionDirection -> Element
buildSubsectionNavigation theme w placement sectionList currentRoute tickDict containerType direction =
  let  numCols = UB.getNumberOfSubsections (head currentRoute) sectionList
       width = case direction of
                 T.Horizontal -> truncate <| (toFloat w)/ (toFloat numCols)
                 T.Vertical -> w
       clickable sec elem = UB.makeClickable tickDict sec elem
       makeHead elem txt = buildComponentTextElement elem containerType txt theme.style width placement
       dummyMakeSection section = empty
       makeSubsection section =  clickable section.route <|
                            if (UB.isCurrentSubsection currentRoute section)
                            then makeHead "subsection" section.shortName
                            else makeHead "shadedsubsection" section.shortName
       subsectionOfCurrentSection =  UB.filterOutSubsectionOfCurrentSection (head currentRoute) sectionList
       subsectionCollection = if  (isEmpty subsectionOfCurrentSection)
                              then [makeHead "subsection" " "]
                              else UB.toElementMap [dummyMakeSection, makeSubsection] sectionList 
  in
       case direction of 
         T.Horizontal -> flow right subsectionCollection
         T.Vertical -> flow down subsectionCollection
 
--------------------------------------------------------------------------------------
-- Build toc in sidebar
buildSidebarToc: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route -> S.TickDict -> String -> Element
buildSidebarToc theme w placement sectionList currentRoute tickDict containerType =
  let  sectionProjection = UC.getSymbolStyling ("sectionprojection", "none") theme.style
       shadedSectionProjection = UC.getSymbolStyling ("shadedsectionprojection", "none") theme.style
       subsectionProjection = UC.getSymbolStyling ("subsectionprojection", "none") theme.style
       shadedSubsectionProjection = UC.getSymbolStyling ("shadedsubsectionprojection", "none") theme.style
       offset = truncate <| theme.symbolSize.sectionProjection.offset * (toFloat w)
       
       marker markerStyling = BE.buildSymbol markerStyling theme.symbolSize.sectionProjection Nothing
       makeMarker markerType = case markerType of
                                 "section" -> marker sectionProjection
                                 "shadedsection" -> marker shadedSectionProjection
                                 "subsection" -> marker subsectionProjection
                                 "shadedsubsection" -> marker shadedSubsectionProjection
       clickable sec elem = UB.makeClickable tickDict sec elem
       makeHead elem txt level = 
          let sectionName =  buildComponentTextElement elem containerType txt 
                                                       theme.style w midLeft
          in
              BE.buildTabbedElement (w, heightOf sectionName) level offset 
                                     (makeMarker elem) sectionName
                                                       
       makeSection section = clickable section.route <|
                             makeHead "shadedsection" section.shortName 1
       makeSubsection section = clickable section.route <|
                            if ((UB.isCurrentSection currentRoute section) &&
                                    (UB.isCurrentSubsection currentRoute section))
                            then makeHead "subsection" section.shortName 2
                            else makeHead "shadedsubsection" section.shortName 2
       tocCollection = UB.toElementMap [makeSection, makeSubsection]
                           <| UB.filterOutSectionAndSubsection sectionList
       
  in
    flow down tocCollection      

 
--------------------------------------------------------------------------------------
-- Buils section or subsection name
buildSectionType: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route ->S.TickDict ->  String -> String -> Element
buildSectionType theme w placement sectionList currentRoute tickDict containerType sectionType =
  let makeHead txt = buildComponentTextElement sectionType containerType txt theme.style w placement
      clickable sec elem = UB.makeClickable tickDict sec elem 
      getSectionish = case sectionType of
                       "section" -> UB.getCurrentSection
                       "subsection" -> UB.getCurrentSubsection
                       "subsubsection" -> UB.getCurrentSubsubsection 
      sectionish =  getSectionish currentRoute sectionList
  in
       case sectionish of
         Nothing -> makeHead " "
         Just x -> clickable x.route <| makeHead x.shortName

--------------------------------------------------------------------------------------
buildTreeSubsection: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route -> S.TickDict -> String -> String -> Element
buildTreeSubsection theme w placement sectionList currentRoute tickDict containerType sectionType=
  let elemContainer = case containerType of
                    "leftsidebar" -> "sidebar"
                    "rightsidebar" -> "sidebar"
                    otherwise -> containerType
      style = UC.getStyling (sectionType, elemContainer) theme.style
      treeSymbolWidth = case sectionType of
                        "section"-> 15
                        "subsection" -> 30
      getSectionish = case sectionType of
                        "section"-> UB.getCurrentSection
                        "subsection" -> UB.getCurrentSubsection
      clickable sec elem = UB.makeClickable tickDict sec elem
      makeHead txt = buildComponentTextElement sectionType containerType txt theme.style (w-treeSymbolWidth) placement 
      sectionish =  getSectionish currentRoute sectionList

      sectionHead = case sectionish of
                      Nothing -> makeHead " "
                      Just x -> clickable x.route <| makeHead x.shortName
      treeSymbolHeight = truncate <| (toFloat <| heightOf sectionHead) / 2
      treeSymbolColor = .color <| .style <| .text
                        <| style
      treeSymbolVerticalBar = color treeSymbolColor <|spacer 2 treeSymbolHeight
      treeSymbolHorizontalBar = color treeSymbolColor <| spacer 10 2
      treeSymbol = container treeSymbolWidth (heightOf sectionHead) midTop 
                     <| flow down [treeSymbolVerticalBar, treeSymbolHorizontalBar]
      completeElem = flow right [treeSymbol, sectionHead]
      
  in
     BE.buildCompleteElement (sizeOf completeElem) style completeElem
--------------------------------------------------------------------------------------
-- Build image for section/subsection/title slides and logo
buildImage: String -> String ->T.Width -> T.Theme -> Element
buildImage imageType imgFile w theme =
  case imgFile of
    "" -> empty
    otherwise ->
                 let style = UC.getStyling (imageType, "none") theme.style
                     img = fittedImage w w imgFile
                 in
                     BE.buildCompleteElement (w,w) style img

--------------------------------------------------------------------------------------
-- Build an Elm-element for corresponding Slate-element taking information from presinfo
buildComponentTextElement: String -> String -> String -> T.StyleInfo -> T.Width -> Position -> Element
buildComponentTextElement elementType containerType elementText styleInfo w placement=
  let slateContainer = case containerType of
                    "leftsidebar" -> "sidebar"
                    "rightsidebar" -> "sidebar"
                    otherwise -> containerType
      bodyStyling = UC.getStyling (elementType, slateContainer) styleInfo
      bodyText = BE.buildText bodyStyling elementText
      h = (heightOf bodyText)
      body = container w h  placement bodyText
  in
     BE.buildCompleteElement (w,h) bodyStyling body 

--------------------------------------------------------------------------------------
----------------------------------Symbol Panels---------------------------------------
--------------------------------------------------------------------------------------
-- Build complete panel
buildSymbolPanel: T.LayoutDetails -> T.Theme -> T.Height -> String -> T.SectionList -> T.Route -> S.TickDict -> Element
buildSymbolPanel layoutDetails theme h panelType sectionList currentRoute tickDict  =
  let symbolStyle = UC.getSymbolStyling (panelType, "none") theme.style
      panel = flow right <| map (buildSingleSymbol h sectionList currentRoute tickDict) 
                         <| map (.id) layoutDetails.inserts
     
  in
      opacity symbolStyle.symbolAlpha <|
      BE.buildCompleteElement (sizeOf panel) symbolStyle.general (panel) 

-- build a single symbol of the panel
buildSingleSymbol:T.Height -> T.SectionList -> T.Route -> S.TickDict ->  String -> Element
buildSingleSymbol h  sectionList currentRoute tickDict symbolType=
  let draw img = fittedImage h h (getImageName img)
      drawButton handle val img = Input.customButton handle val 
                                                     img (opacity 0.5 img) img
      getTick = UB.getNextOrPvsTick tickDict currentRoute sectionList
      drawSymbol sym = 
        case sym of
          "tick" -> flow right 
                               [drawButton  asynClicks.handle C.DecTick 
                                     <| draw "pvs"
                               , draw "tick"
                               , drawButton  asynClicks.handle C.IncTick 
                                     <|draw "next"
                               ]

          "slide" -> flow right 
                               [drawButton  asynClicks.handle C.Dec 
                                     <| draw "pvs"
                               , draw "slide"
                               , drawButton  asynClicks.handle C.Inc 
                                     <|draw "next"
                               ]
          "section" -> if ((isEmpty sectionList) || (length currentRoute < 1))
                       then flow right <| map draw ["pvs","section","next"]
                       else  flow right 
                               [Input.clickable  asynClicks.handle (C.Asyn (getTick 1 -1)) 
                                     <| draw "pvs"
                               , draw "section"
                               , Input.clickable  asynClicks.handle (C.Asyn (getTick 1 1)) 
                                     <|draw "next"
                               ]
          "subsection" -> if ((isEmpty sectionList) || (length currentRoute < 2))
                          then flow right <| map draw ["pvs","subsection","next"]
                           else flow right 
                               [Input.clickable  asynClicks.handle (C.Asyn (getTick 2 -1)) 
                                     <| draw "pvs"
                               , draw "subsection"
                               , Input.clickable  asynClicks.handle (C.Asyn (getTick 2 1)) 
                                     <|draw "next"
                               ]

          "supportbin" -> drawButton  modeClicks.handle C.BeginSupportBinMode 
                                     <| draw "support"
          "zoom" -> drawButton  modeClicks.handle C.BeginZoomMode 
                                     <| draw "zoom"

          "quiz" -> drawButton  modeClicks.handle (C.QuizMode )
                                     <| draw "quiz"

          "scribble" -> drawButton  modeClicks.handle C.ScribbleMode 
                                     <| draw "scribble"
                       


      makeSymbol sym = container (3*h+2) (h+1) middle (drawSymbol sym)
  in
      case symbolType of
        "slidenavigation" -> makeSymbol "slide"
        "sectionnavigation" -> makeSymbol "section"
        "subsectionnavigation" -> makeSymbol "subsection"
        "backforward" -> makeSymbol "tick"
        x ->  makeSymbol x

-- Returns image file name for corresponding symbol
getImageName: String -> String
getImageName picType =
  let name str = "Symbols/" ++ str ++ ".gif"
  in
      case picType of
        "slide" -> name "Slide"
        "section" -> name "Section"
        "subsection" -> name "Subsection"
        "tick" -> name "Tick"
        "next" -> name "Next"
        "pvs" -> name "Previous"
        "support" -> name "Supportbin"
        "quiz" -> name "Quiz"
        "zoom" -> name "Zoom"
        "scribble" -> name "Scribble"

--------------------------------------------------------------------------------------
--------------------------------Slide Title/Subtitle----------------------------------
--------------------------------------------------------------------------------------

-- Build title and subtitle of the slide
buildTitle: T.Theme -> (T.Width, T.Height) -> String -> String  -> Element 
buildTitle theme (w, h) titleStr subtitleStr =
  let title = buildComponentTextElement "slidetitle" "none" titleStr theme.style
                                        w middle    
      subtitle =  buildComponentTextElement "slidesubtitle" "none" subtitleStr 
                                            theme.style (w) middle
     
  in
     height h <| flow down [title, subtitle]

--------------------------------------------------------------------------------------
-------------------------------------Marker Slides------------------------------------
--------------------------------------------------------------------------------------

-- Build Title slide
-- Will be called to build only when layout details are there
buildTitleSlide: T.Theme -> (T.Width, T.Height) -> T.PresInfo -> Element 
buildTitleSlide theme (w, h) presInfo =
  let layoutDetails = case theme.layout.titleSlide of
                        T.Layout x -> x
      cols = layoutDetails.columns
      getCol id = head <| filter (\x -> x.id == id) cols
      getColWidth id = .width <| getCol id  
      getColPlacement id = .placement <| getCol id
     
      toIntermediateElement ins = 
        let width = truncate <|(getColWidth ins.column) * (toFloat w)
            placement = middle
              
        in 
            case ins.id of
              "image" -> buildImage "titlegraphic"  presInfo.titleGraphic width theme
              x ->  buildComponentTextElement ins.id "none"
                                      (getElementText ins.id presInfo)
                                      theme.style width placement
           

  in                        
      (getCompleteComponent layoutDetails (w,h) toIntermediateElement)
--------------------------------------------------------------------------------------
----------------------------------------Section/Subsection slide-----------------------
-- Build section/subsectio/toc slide
-- Will be called to build only when layout details are there
buildSectionishSlide: T.Theme -> (T.Width, T.Height) -> T.PresInfo -> T.SectionList ->  T.Route ->S.TickDict ->  String-> [[S.ContentElement]]
buildSectionishSlide theme (w, h) presInfo sectionList currentRoute tickDict sectionishType  =
  let sectionLayout = case sectionishType of
                         "section" -> theme.layout.atBeginSectionSlide
                         "subsection" -> theme.layout.atBeginSubsectionSlide
                         "tocslide" -> theme.layout.tocSlide
      layoutDetails = case (fst sectionLayout) of
                        T.Layout x -> x
      tocOptions = snd sectionLayout
      cols = layoutDetails.columns
      getCol id = head <| filter (\x -> x.id == id) cols
      getColWidth id = .width <| getCol id  
      getColPlacement id = .placement <| getCol id
     
      toIntermediateElement ins = 
        let width = truncate <|(getColWidth ins.column) * (toFloat w)
            placement = getColPlacement ins.column
           
            sectionType = buildSectionType theme width placement sectionList 
                                         currentRoute tickDict "none" 
            toColAndContentElement elem = (ins.column 
                                          , [{ element = elem
                                             , animation = { tickLife = [0]
                                                           }
                                               }
                                              ]
                                            )
  
        in 
            case ins.id of
              "image" -> case sectionishType of
                           "section" -> toColAndContentElement<| buildImage "section"  presInfo.sectionGraphic width theme
                           "subsection" -> toColAndContentElement <|buildImage "subsection"  presInfo.subsectionGraphic width theme
              "toc" -> 
                 let t =
                       buildToc theme width placement sectionList currentRoute  tocOptions                  
                 in 
                     case sectionishType of
                       "tocslide" -> (ins.column,({ element = color grey 
                                                 <| container w 40  middle 
                                                 <| centered <| Text.color red
                                                 <|Text.height 34 <| Text.bold
                                                 <| toText "Table of Contents"
                                      , animation = { tickLife = [0]}
                                      } :: t))
                       otherwise -> (ins.column,t)
              "section" -> toColAndContentElement <| sectionType "section"
              "subsection" -> toColAndContentElement <| sectionType "subsection"
              "logo" ->toColAndContentElement <|  buildImage "logo"  presInfo.logo width theme 

            
  in                        
      UB.partitionColWiseContentElement (length cols) (map toIntermediateElement layoutDetails.inserts)


-- build TOC
buildToc: T.Theme -> T.Width -> Position -> T.SectionList -> T.Route -> T.TocOptions -> [S.ContentElement]
buildToc theme w placement sectionList currentRoute  tocOptions=
  let  sectionProjection = UC.getSymbolStyling ("sectionprojection", "toc") theme.style
       shadedSectionProjection = UC.getSymbolStyling ("shadedsectionprojection", "toc") theme.style
       subsectionProjection = UC.getSymbolStyling ("subsectionprojection", "toc") theme.style
       shadedSubsectionProjection = UC.getSymbolStyling ("shadedsubsectionprojection", "toc") theme.style
       offset = truncate <| theme.symbolSize.sectionProjection.offset * (toFloat w)
       
       marker markerStyling = BE.buildSymbol markerStyling theme.symbolSize.sectionProjection Nothing
       makeMarker markerType = case markerType of
                                 "section" -> marker sectionProjection
                                 "shadedsection" -> marker shadedSectionProjection
                                 "subsection" -> marker subsectionProjection
                                 "shadedsubsection" -> marker shadedSubsectionProjection
       makeHead elem txt level =           
         let sectionName =  buildComponentTextElement elem "toc" txt 
                                                       theme.style w midLeft
          in
              BE.buildTabbedElement (w, heightOf sectionName) level offset 
                                     (makeMarker elem) sectionName

       makeTocHead tocStyle txt level = case  (tocStyle,level) of
                                          (T.Show,1) -> makeHead "section" txt 1
                                          (T.Shade,1) -> makeHead "shadedsection" txt 1
                                          (T.Show,2) -> makeHead "subsection" txt 2
                                          (T.Shade,2) -> makeHead "shadedsubsection" txt 2
                                          otherwise -> empty
                                   
       
       makeSection section = if (UB.isCurrentSection currentRoute section || isEmpty currentRoute)
                            then makeTocHead tocOptions.currentSection section.shortName 1
                            else makeTocHead tocOptions.otherSection section.shortName 1
       makeSubsection section = if  (UB.isCurrentSection currentRoute section || isEmpty currentRoute)
                                   then if (UB.isCurrentSubsection currentRoute section|| isEmpty currentRoute)
                                        then  makeTocHead tocOptions.currentSubsectionOfCurrentSection section.shortName 2
                                        else  makeTocHead tocOptions.otherSubsectionOfCurrentSection section.shortName 2
                                else  makeTocHead tocOptions.subsectionOfOtherSection section.shortName 2

       tocCollection =UB.levelwiseRouteMap [makeSection, makeSubsection]
                           <| UB.filterOutSectionAndSubsection sectionList

       tickList = if tocOptions.pauseSections
                  then if tocOptions.pauseSubsections
                       then [1..(length tocCollection)]
                       else let sectionwise = UB.partitionInSection tocCollection
                                repeatTimes = map length sectionwise
                                tickValue = [1..(length sectionwise)]
                            in  concatMap (\(t, r) -> repeat r t)
                                <| zip (tickValue) (repeatTimes)
                  else repeat (length tocCollection) 1
       maxTick = maximum tickList
       getTickLife start = [start..maxTick]
        
  in  
      map (\(t,elem) -> { element =  elem
                        , animation = { tickLife = getTickLife t
                                      }
                         }
          )
      <| zip (tickList) ( map snd tocCollection)      

--------------------------------------------------------------------------------------
----------------------------------Misc Functions---------------------------------------

getLayout: String -> T.LayoutInfo -> T.Layout
getLayout componentType layoutInfo =
  case componentType of
    "headline" -> layoutInfo.headline
    "footline" -> layoutInfo.footline
    "leftsidebar" -> layoutInfo.leftSidebar
    "rightsidebar" -> layoutInfo.rightSidebar
    "navigationalsymbols" -> layoutInfo.navigationalSymbols
    "modechangesymbols" -> layoutInfo.modechangeSymbols


getElementText: String -> T.PresInfo -> String
getElementText elementType presInfo =
  case elementType of
    "title" -> presInfo.presTitle
    "subtitle" -> presInfo.presSubTitle
    "author" ->  join " , " presInfo.authors
    "institute" ->  join " , " presInfo.institute
    "date" ->  presInfo.date

getCompleteComponent: T.LayoutDetails -> (T.Width, T.Height) -> (T.Insert -> Element) -> Element
getCompleteComponent layoutDetails (w,h) toIntermediateElement =
  let intermedateList = map 
                         (\x -> (x.column,   toIntermediateElement x))
                         layoutDetails.inserts
      columnElementList = UB.partitionColWise (length layoutDetails.columns) intermedateList
      maxColHeight = maximum <| map heightOf columnElementList
      scaleCol col = let scaleFactor = ((toFloat maxColHeight)/ toFloat (heightOf col))
                         newW = truncate <| (toFloat  (widthOf col)) *  scaleFactor
                     in
                         collage newW maxColHeight 
                             [ scale scaleFactor  <| toForm col] 
      columnAlignList = map UB.getColumnPosition 
                        <| map ( .colAlign) layoutDetails.columns
      columnList = map (\(align, elem) -> container (widthOf elem) maxColHeight align elem)
                   <| zip columnAlignList (map scaleCol columnElementList) 
      component = flow right columnElementList
      scaledComponenet  = scale ((toFloat w)/ toFloat (widthOf component)) 
                                <| toForm  component
                  
  in 
      container  w  h middle 
                    <| collage w h [scaledComponenet]
