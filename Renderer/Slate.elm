module Slate where

import Json
--import JavaScript as JS
import JavaScript.Experimental as JSE
import Types.Naive as Naive
import Types.Context as C
import Builders.Context as BC
import  Displayers.Main as DM
import Graphics.Input as Input
import Builders.Context (..)

port portParsedStr : String

tojson: Maybe Json.Value
tojson  = Json.fromString portParsedStr

naive: Naive.Presentation
naive  = case tojson of
               Just x -> JSE.toRecord  <| JSE.fromJson x

pen= collage 5 5 [filled red <| circle 5]   

showMain:C.SlateContext -> Element -> Element
showMain context elem =

  case context.mode of
    C.ScribbleMode -> let  closeSign = fittedImage 30 30 ("Symbols/Close.gif")
                           closeButton = Input.customButton  modeClicks.handle C.NormalMode (closeSign) (opacity 0.5 <|closeSign)(closeSign)
                           base = container context.windowWidth context.windowHeight topRight closeButton
                      in
                           layers [elem,base,container context.windowWidth context.windowHeight
              (middleAt (absolute <| fst context.mousePosition) (absolute  <|snd context.mousePosition)) pen]
 
    otherwise -> (DM.showPresentation naive) context

initialBg = layers[collage 800 800 [filled grey <| rect 800 800], 
                   justified (Text.color white<|Text.height 40 <|toText "SLATE: Press Right Arrow to start")
                  ]
main = foldp  showMain (initialBg ) BC.contextSignal

