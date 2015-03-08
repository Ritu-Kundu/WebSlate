module Displayers.SectionishSlide where
{- |
   This module displays the marker slides
 -}

import Types.Context as C
import Types.Slate as S
import Types.Theme as T

import Utils.Builder as UB

import Builders.Outer as BO
import Builders.ElementMaker as BE


display: C.SlateContext -> S.ConcreteSizeInfo -> S.CurrentInfoForOuter -> T.Theme -> T.PresInfo -> T.SectionList -> S.TickDict -> String -> Element
display context concreteSizeInfo currentInfoForOuter theme presInfo sectionList tickDict slideType =
 let getOuter str size = BO.buildOuterComponent theme size str presInfo sectionList currentInfoForOuter tickDict
     w = context.windowWidth
     h = context.windowHeight
     slideBG = case slideType of
                 "titleslide" -> theme.style.slideBackground.title
                 "tocslide" -> theme.style.slideBackground.title
                 otherwise -> theme.style.slideBackground.section
     content =  case slideType of
                  "titleslide" -> BO.buildTitleSlide theme  
                                  (w,h) presInfo
                  otherwise ->  let slideContent = BO.buildSectionishSlide theme  
                                                     (w,h) 
                                                      presInfo  sectionList 
                                                      currentInfoForOuter.route 
                                                      tickDict
                                                      slideType 
                                in
                                    displayContent slideContent 
                                        concreteSizeInfo.content
                                        context.currentTick


  in 
     container w h middle <| layers
     [BE.drawFill w h  theme.style.slideBackground.section
     , flow down [ content
                 ]
    ]


displayContent:[[S.ContentElement]] -> (T.Width, T.Height) -> Int -> Element
displayContent content (w, h) tick =
  let isThere anim = (any (\x -> x == tick) anim.tickLife) || (anim.tickLife == [0])
      toChangedElement contentElem = if (isThere contentElem.animation)
                                     then contentElem.element
                                     else empty
      scaleHeightwise elem =
       let scaleFactor = (toFloat h)/ (toFloat <| heightOf elem)
           newW = truncate (scaleFactor * (toFloat <| widthOf elem))
       in
           collage newW h  [(scale scaleFactor <| toForm elem)]

      scaledColumn col = if (heightOf col > h)
                         then scaleHeightwise col
                         else col

      toColContentElem colContent = scaledColumn <|flow down <| map toChangedElement colContent
      columnList = map toColContentElem content
      columns = flow right columnList
     
      
  in
     container w h middle columns

--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------

