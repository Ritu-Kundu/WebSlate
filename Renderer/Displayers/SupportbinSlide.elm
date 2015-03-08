module Displayers.SupportbinSlide where
{- |
   This module displays the Supportbin
 -}
import Graphics.Input as Input

import Types.Context as C
import Types.Slate as S
import  Builders.Context (..)

closeSign = fittedImage 30 30 ("Symbols/Close.gif")
closeButton = Input.customButton  modeClicks.handle C.NormalMode
              (closeSign)
              (opacity 0.5 <|closeSign)
              (closeSign) 
display: S.Supportbin -> C.SlateContext -> S.ConcreteSizeInfo -> Element
display supportbin context  concreteSizeInfo =
 let elementList = supportbin.content
     w = fst concreteSizeInfo.content  
     h = snd concreteSizeInfo.content
     colW = truncate <| (toFloat w) / 4
     rowH = truncate <| (toFloat h) / 4
     cellW = colW - 5
     cellH = rowH - 5
     scaleFactor = (toFloat cellW) / (toFloat <| w)
     scaleElem elem = collage cellW cellH [scale scaleFactor <| toForm elem]
     makeCell element = let elem = scaleElem element
                     in
                         Input.hoverable zoomClicks.handle 
                                         (\x -> if x then elem else empty)
                                         <| Input.clickable  modeClicks.handle 
                                                             C.SupportBinZoomMode elem
     grid = flow down <| map (\x -> flow right <| map makeCell x) 
           <| (makeGrid 4 elementList) 
     base = container w h topRight closeButton
     positionedElem = opacity 0.7 <| container w h middle grid
  in   
    layers [positionedElem, base]  
    

makeGrid: Int -> [Element] -> [[Element]]
makeGrid n elemList =
  if (isEmpty elemList)
  then []
  else
  [(take n elemList)] ++  (makeGrid n (drop n elemList))
