module Displayers.ContentSlide where
{- |
   This module displays the content slide
 -}
import Graphics.Input as Input

import Types.Context as C
import Types.Slate as S
import Types.Theme as T

import Utils.Builder as UB

import Builders.Outer as BO
import Builders.ElementMaker as BE
import  Builders.Context (..)

display: S.ContentSlide -> C.SlateContext -> S.ConcreteSizeInfo -> S.CurrentInfoForOuter ->  T.Theme -> T.PresInfo -> T.SectionList -> S.TickDict -> Element
display contentSlide context  concreteSizeInfo currentInfoForOuter theme presInfo sectionList tickDict =
  case contentSlide.slideType of
    S.PlainSlide -> displayContent contentSlide.slideContent 
                                   (context.windowWidth, context.windowHeight)
                                   context.currentTick context.mode
    S.NormalSlide -> displayNormalSlide contentSlide context concreteSizeInfo currentInfoForOuter theme presInfo sectionList tickDict


displayNormalSlide: S.ContentSlide -> C.SlateContext -> S.ConcreteSizeInfo -> S.CurrentInfoForOuter -> T.Theme -> T.PresInfo -> T.SectionList ->S.TickDict -> Element
displayNormalSlide contentSlide context concreteSizeInfo currentInfoForOuter theme presInfo sectionList tickDict =
 let getOuter str size = BO.buildOuterComponent theme size str presInfo sectionList currentInfoForOuter tickDict
     headline = getOuter "headline" concreteSizeInfo.headline
     footline = getOuter "footline" concreteSizeInfo.footline
     leftSidebar = getOuter "leftsidebar" concreteSizeInfo.leftSidebar
     rightSidebar = getOuter "rightsidebar" concreteSizeInfo.rightSidebar
     modechangesymbols = getOuter "modechangesymbols" concreteSizeInfo.navigationSymbol
     navigationalsymbols = getOuter "navigationalsymbols" concreteSizeInfo.navigationSymbol
     symbols = container (fst concreteSizeInfo.content) 
                         (snd concreteSizeInfo.navigationSymbol)
                         midRight
                         (flow right [modechangesymbols, navigationalsymbols])
     slideTitle = BO.buildTitle theme concreteSizeInfo.slideTitle contentSlide.title contentSlide.subtitle
     content =  displayContent contentSlide.slideContent 
                               concreteSizeInfo.content
                               context.currentTick
                               context.mode
     w = context.windowWidth
     h = context.windowHeight
     final = 
      layers
      [BE.drawFill w h   theme.style.slideBackground.normal
      , flow down [ headline
                 , flow right [leftSidebar
                              , (flow down [slideTitle, content])
                              , rightSidebar
                              ]
                 , symbols
                 , footline
                 ]
     ]
  in 
     case context.mode of
       C.BeginZoomMode -> let closeSign = fittedImage 30 30 ("Symbols/Close.gif")
                              closeButton = Input.customButton  modeClicks.handle C.NormalMode (closeSign) (opacity 0.5 <|closeSign)(closeSign) 
                              base = container w h topRight closeButton
                          in
                              layers [opacity 0.5 final,base]
       otherwise -> final
     


displayContent: [S.Column] -> (T.Width, T.Height) -> Int -> C.SlateMode -> Element
displayContent content (w, h) tick mode =
  let isThere conElem = (conElem.animation.tickLife == [0])
                         ||(any (\x -> x == tick) conElem.animation.tickLife) 
      toChangedElement elem = case mode of
                                C.BeginZoomMode -> Input.hoverable zoomClicks.handle (\x -> if x then elem else empty)
                                            <| Input.clickable  modeClicks.handle C.InZoomMode elem
                                otherwise -> elem
      toColContentElem colContent = let bodyElem = filter isThere colContent.body
                                    in
                                        if (isEmpty bodyElem)
                                        then colContent.otherLife
                                        else toChangedElement <| .element <| head bodyElem
      scaleHeightwise elem =
       let scaleFactor = (toFloat h)/ (toFloat <| heightOf elem)
           newW = truncate (scaleFactor * (toFloat <| widthOf elem))
       in
           collage newW h  [(scale scaleFactor <| toForm elem)]

      scaledColumn col = if (heightOf col > h)
                         then scaleHeightwise col
                         else col

                                    
      toColElem col = (UB.getColumnPosition col.colAlign
                      , scaledColumn <| flow down <| map toColContentElem col.content)
      columnList = map toColElem content
      alignedColumnList = map 
                          (\(align, elem) -> container (widthOf elem) h align elem)
                          columnList

      finalcontent = flow right alignedColumnList
      
  in 
     container w h middle finalcontent 
