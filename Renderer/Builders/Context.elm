module Builders.Context where
{- |
   This module buils the context from various signals being controlled by mouse and keyboard
 -}
import Keyboard
import Window
import Mouse
import Graphics.Input as I
import Graphics.Input.Field as Field
import Types.Context (..)


-- Signal to keep track of last preseed keys
lastKeysDownSignal: Signal [Keyboard.KeyCode]
lastKeysDownSignal = sampleOn (dropIf isEmpty [] Keyboard.keysDown) Keyboard.keysDown
  

-- 39=Right Arrow  , 78=n
-- 37=Left Arrow  , 80=p
-- 35=end  , 69=e 
-- 36=home  , 72=h
-- 34= page down , 40=down arrow , 13=Enter
-- Function to modify slide index and tick value according to input from mouse and keyboard
step ((ktmStamp,keys), (ctmStamp, asynNum)) indexes =
  let (nextSlideIndex,nextTick) = 
          if | ctmStamp > ktmStamp -> case (asynNum) of
                                        Inc -> (indexes.current+1, 1)
                                        Dec -> (indexes.current-1, 1)
                                        IncTick -> (indexes.current,indexes.currentTick+1)
                                        DecTick -> (indexes.current,indexes.currentTick-1)
                                        Asyn num ->  ( num, 1)  
             | keys == [39] || keys == [78] -> (indexes.current+1,1)
             | keys == [37] || keys == [80] -> (indexes.current-1,1)
             | keys == [35] || keys == [69] -> (0-1,1)
             | keys == [36] || keys == [72] -> (0,1)
             | keys == [34] || keys==[40] || keys==[13] -> (indexes.current,indexes.currentTick+1)
             | keys == [33] || keys == [38] -> (indexes.current,indexes.currentTick-1)
             | otherwise -> (indexes.current,indexes.currentTick)
        in { current = nextSlideIndex, previous = indexes.current, currentTick = nextTick}

-- Signal keeping track of slide index and tick
slideContextSignal: Signal SlideContext
slideContextSignal=
  let combineSig sig1 sig2 = (sig1, sig2) 
  in keepWhen slideContextEnable { current=0, previous=0, currentTick=0} 
     <| foldp step { current=0, previous=0, currentTick=1}
                   (lift2 combineSig (timestamp lastKeysDownSignal) 
                                     (timestamp asynClicks.signal))

--------------------------------------------------------------------------------------
--------------------------------Asynchronous Signals----------------------------------
--------------------------------------------------------------------------------------
-- Keep track of clicks for changing slide Index or tick
asynClicks: I.Input AsynSlideChange
asynClicks = I.input (Asyn 0)

-- Keep track of clicks for changing mode
modeClicks: I.Input SlateMode
modeClicks = I.input NormalMode

-- Keep track of clicks for displaying elemeent to be zoomed
zoomClicks: I.Input Element
zoomClicks = I.input empty

-- Keep track of clicks for responding to quiz clicks
quizClicks: I.Input Element
quizClicks = I.input empty

-- Keep track of clicks for responding to quiz text-box
quizContent : I.Input Field.Content
quizContent = I.input Field.noContent

-- Function to disable signals for changing slide index or tick in all modes except normal mode 
checkMode: SlateMode -> Bool
checkMode m = 
 case m of
   NormalMode -> True
   otherwise -> False
-- Slide Context will be changed only in Normal mode
slideContextEnable: Signal Bool
slideContextEnable = lift checkMode modeClicks.signal

--------------------------------------------------------------------------------------
-- Build complete context record
makeContextRecord : (Int, Int) -> SlideContext -> SlateMode -> Element ->  (Int, Int) -> (Time, Element) -> (Time, Field.Content) -> SlateContext
makeContextRecord (w, h) sc m ze  mp qb qc=
  { windowWidth = w
  , windowHeight = h
  , currentSlideIndex = sc.current
  , previousSlideIndex = sc.previous
  , currentTick = sc.currentTick
  , mode = m
  , zoomElem = ze
  , mousePosition = mp
  , quizButton = qb 
  , quizContent = qc 
  }

contextSignal : Signal SlateContext
contextSignal = makeContextRecord <~ Window.dimensions
                                   ~ slideContextSignal
                                   ~ modeClicks.signal
                                   ~ zoomClicks.signal
                                   ~ keepWhen Mouse.isDown (0,0) Mouse.position
                                   ~ timestamp quizClicks.signal
                                   ~ timestamp quizContent.signal
