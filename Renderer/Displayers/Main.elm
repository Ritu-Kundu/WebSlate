module Displayers.Main where
{- |
   This is the main module responsible for displaying
 -}
import Graphics.Input as Input

import PreProcess.ThemeMaker
import PreProcess.ContentMaker
import Types.Slate as S
import Types.Naive as Naive
import Types.Theme as T
import Types.Context as C
import Utils.Naive  (..)
import Utils.Displayer as UD
import Utils.TickTracker as UTT

import Builders.Context (..)

import Displayers.ContentSlide as DC
import Displayers.SectionishSlide as DS
import Displayers.SupportbinSlide as DSUP
import Displayers.QuizSlide as DQ

-- Converts Naive Presentation to an elm-element depicting a slide to be displayed
showPresentation: Naive.Presentation -> C.SlateContext -> Element
showPresentation presentation context =
  let theme = PreProcess.ThemeMaker.toTheme presentation.themeInfo
      naivePresInfo = presentation.presInfo
      presInfo = { naivePresInfo - sections }
      sectionList = map PreProcess.ThemeMaker.naiveToThemeSection  
                        presentation.presInfo.sections
      w = context.windowWidth
      h = context.windowHeight
      geSize = getComponentSize theme.layout theme.componentSize
      concreteSizeInfo = getConcreteComponentSize geSize w h
      contentSlideList = PreProcess.ContentMaker.toContent presentation.slides theme 
                           (fst concreteSizeInfo.content)
      supportbinList =  PreProcess.ContentMaker.toSupportbinContent presentation.supportbin theme (fst concreteSizeInfo.content)
      quizList = presentation.quizes
      slideTickList = getTickList theme (map .route sectionList) 
                                  <| zip (map .partOf contentSlideList) 
                                      (map .slideId contentSlideList)
      slideRouteAndIndex = UD.getNthFromList context.currentSlideIndex slideTickList
      currentInfoForOuter = { route = fst slideRouteAndIndex
                            , currentSlideNumber = show (snd slideRouteAndIndex)
                            , maxSlideNumber = show (length contentSlideList)
                            }
      tickDict = UTT.getSectionTick (map .route sectionList) slideTickList
      displaySectionish slideType = DS.display context concreteSizeInfo 
                                                      currentInfoForOuter  theme 
                                                      presInfo sectionList tickDict slideType
  in 
     if | (snd slideRouteAndIndex == -20) -> displaySectionish "titleslide"
        | (snd slideRouteAndIndex == -10) -> displaySectionish "tocslide"
        | (snd slideRouteAndIndex == -1) -> displaySectionish "section"
        | (snd slideRouteAndIndex == -2) -> displaySectionish "subsection"
        | otherwise  -> let csId = (snd slideRouteAndIndex) 
                            contentSlide = let cs = filter (\x -> x.slideId 
                                                          ==csId) 
                                                         contentSlideList
                                           in
                                            if (isEmpty cs)
                                            then head contentSlideList
                                            else head cs 
                            supportbin = let sb = filter (\x -> x.supportbinId 
                                                          == contentSlide.supportbin) 
                                                         supportbinList
                                         in
                                            if (isEmpty sb)
                                            then {supportbinId="",content =[]}
                                            else head sb
                            quiz = let ql = filter (\x -> x.id 
                                                          == contentSlide.quiz) 
                                                         quizList
                                         in
                                            if (isEmpty ql)
                                            then {id=""
                                                 , qtype =""
                                                 , question= ""
                                                 , options= []
                                                 , correctAns= []
                                                 , explanation= ""}
                                            else head ql
                        in
                         case context.mode of
                         C.InZoomMode -> displayZoomed context
                         C.SupportBinZoomMode -> displayZoomed context
                         C.BeginSupportBinMode -> DSUP.display  supportbin context  
                                                                concreteSizeInfo
                         C.QuizMode -> DQ.display  quiz context  
                                                                concreteSizeInfo
                         
                         otherwise -> 
                                    DC.display contentSlide context concreteSizeInfo 
                                       currentInfoForOuter theme presInfo sectionList
                                      tickDict
                                     

-- diplays Zoomed element      
displayZoomed: C.SlateContext -> Element
displayZoomed context =
  let elem = context.zoomElem
      h = context.windowHeight
      w = context.windowWidth
      scaleFactor = (toFloat w) / (toFloat <| widthOf elem)
      scaledElem = collage w 
                           (truncate <| scaleFactor * (toFloat <| heightOf elem)) 
                           [scale scaleFactor <| toForm elem]
      
      onCloseMode = case context.mode of
                         C.InZoomMode -> C.BeginZoomMode
                         C.SupportBinZoomMode -> C.BeginSupportBinMode
      closeSign = fittedImage 30 30 ("Symbols/Close.gif")
      closeButton = Input.customButton  modeClicks.handle onCloseMode
                     (closeSign)
                     (opacity 0.5 <|closeSign)
                     (closeSign)
      base = color lightCharcoal <|container w 35 topRight closeButton
      positionedElem = container w (h-35) midTop scaledElem
 
  in
     flow down [ base,scaledElem]          
{-                 
getSlideIndexList: T.SectionList -> S.Content -> [S.SlideIndexInfo]
getSlideIndexList sectionList contentSlideList =
  let siiContentSlideList = map (\x -> { slideType = S.NormalSlide
                                       , route = x.partOf
                                       , id = x.id}) contentSlideList
      siiSectionList =  map (\x -> { slideType = S.SectionSlide
                                       , route = x.route
                                       , id =0}) sectionList
-}
-------------------------------------------------------------------------------------
-----------------------------------Determine size------------------------------------
-------------------------------------------------------------------------------------

getConcreteComponentSize: (T.Width -> T.Height -> String ->(T.Width, T.Height)) -> T.Width -> T.Height -> S.ConcreteSizeInfo 
getConcreteComponentSize getSize w h =
  let headlineSize = getSize w h "headline"
      footlineSize = getSize w h "footline"
      sideBarheight = h - (snd headlineSize) - (snd footlineSize)
      leftSidebarSize = getSize w sideBarheight "leftSidebar"
      rightSidebarSize = getSize w sideBarheight "rightSidebar"
      bodySize = (w - (fst leftSidebarSize) - (fst rightSidebarSize), sideBarheight)
      titleSize = getSize (fst bodySize)(snd bodySize) "title"
      navSymbolSize = getSize (fst bodySize)(snd bodySize) "navigationSymbol"
      contentSize = ((fst bodySize), (snd bodySize) - (snd navSymbolSize) - (snd titleSize))
  in
        { leftSidebar = leftSidebarSize
        , rightSidebar = rightSidebarSize
        , headline = headlineSize
        , footline = footlineSize
        , navigationSymbol = navSymbolSize
        , slideTitle = titleSize
        , content = contentSize
        }  



getComponentSize: T.LayoutInfo -> T.ComponentSizeInfo -> T.Width -> T.Height -> String  -> (T.Width, T.Height)
getComponentSize layoutInfo componenSizeInfo w h componentType =
  let getX layout relX x = case layout of
                              T.Empty -> 0
                              otherwise -> truncate <| relX * (toFloat x)
  in
      case componentType of
        "headline" -> (w, getX layoutInfo.headline componenSizeInfo.headlineHeight h)
        "footline" -> (w, getX layoutInfo.footline componenSizeInfo.footlineHeight h)
        "leftSidebar" -> (getX layoutInfo.leftSidebar componenSizeInfo.leftSidebarWidth w, h)
        "rightSidebar" -> (getX layoutInfo.rightSidebar componenSizeInfo.rightSidebarWidth w, h)
        "title" -> ( truncate <| componenSizeInfo.slideTitleWidth * (toFloat w)
                   , truncate <| componenSizeInfo.slideTitleHeight * (toFloat h))
        "navigationSymbol" -> (w , truncate <| componenSizeInfo.navigationSymbolHeight * (toFloat h))
        
-------------------------------------------------------------------------------------
-----------------------------------determine Tick List-------------------------------
getTickList: T.Theme -> S.SectionIdList -> S.SlideIndexInfoList -> S.SlideIndexInfoList
getTickList theme sectionIdList slideList =
  let isMarkSection = case (fst theme.layout.atBeginSectionSlide) of
                        T.Empty -> False
                        T.Layout x -> True
      isMarkSubsection = case (fst theme.layout.atBeginSubsectionSlide) of
                        T.Empty -> False
                        T.Layout x -> True
      tickList = if (isEmpty sectionIdList)
                 then slideList
                 else  UTT.getTickList isMarkSection isMarkSubsection sectionIdList slideList
      tickListAfterToc = case (fst theme.layout.tocSlide) of
                        T.Empty -> tickList
                        T.Layout x ->  if (isEmpty sectionIdList)
                                         then tickList
                                         else([],-10) :: tickList
  in
     ([],-20) :: tickListAfterToc
