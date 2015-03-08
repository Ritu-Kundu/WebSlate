module Types.Context where
{- |
   This module describes the types used to build context
 -}
import Graphics.Input.Field as Field

-- Used by signal asynClicks.signal 
data AsynSlideChange = Inc | Dec | IncTick | DecTick | Asyn Int

-- Used by signal modeChange.signal
data SlateMode = NormalMode | QuizMode | BeginSupportBinMode | SupportBinZoomMode | ScribbleMode | BeginZoomMode | InZoomMode

type SlideContext = { current: Int
                    , previous: Int
                    , currentTick:Int              
                    }
-- Context record
type SlateContext = 
               { windowWidth : Int
               , windowHeight : Int
               , currentSlideIndex : Int
               , previousSlideIndex : Int
               , currentTick : Int
               , mode: SlateMode
               , zoomElem: Element
               , mousePosition : (Int, Int)
               , quizButton : (Time, Element) 
               , quizContent : (Time, Field.Content) 

               }
