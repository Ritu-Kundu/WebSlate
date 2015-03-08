module Displayers.QuizSlide where
{- |
   This module displays the quiz
 -}
import Graphics.Input as Input
import Graphics.Input.Field as Field

import Types.Context as C
import Types.Slate as S
import  Builders.Context (..)

getButton custom elem =
   Input.customButton  quizClicks.handle elem
              (custom)
              (opacity 0.5 <|custom)
              (custom)

closeSign = fittedImage 30 30 ("Symbols/Close.gif")
submitSign =  fittedImage 213 86 ("Symbols/Submit.gif")
explainSign =  fittedImage 213 86 ("Symbols/Explain.gif")
closeButton = Input.customButton  modeClicks.handle C.NormalMode
              (closeSign)
              (opacity 0.5 <|closeSign)
              (closeSign) 
submitButton = getButton  submitSign empty
              
correctAnsNotify =fittedImage 393 136 ("Symbols/Correct.gif")
wronAnsNotify =  fittedImage 393 136 ("Symbols/Wrong.gif")

display: S.Quiz -> C.SlateContext -> S.ConcreteSizeInfo -> Element
display quiz context  concreteSizeInfo =
  case quiz.qtype of
   "simple" -> displaySimple quiz context  concreteSizeInfo
   "mcq" -> displayMcq quiz context  concreteSizeInfo


displaySimple: S.Quiz -> C.SlateContext -> S.ConcreteSizeInfo -> Element
displaySimple quiz context  concreteSizeInfo =
 let question = color lightCharcoal <| plainText quiz.question
     correctAns = map String.toUpper <| map String.trim quiz.correctAns
     w = fst concreteSizeInfo.content  
     h = snd concreteSizeInfo.content
     tboxContent =(snd context.quizContent)
     textbox = Field.field Field.defaultStyle 
                      quizContent.handle id "Type your answer here!" tboxContent
     explanation= container w h midTop <| 
                                        plainText (if (quiz.explanation =="")
                                                     then "No Explanation"
                                                     else quiz.explanation)
     explainButton =  getButton explainSign explanation
     
     base = container w h topRight closeButton
     buttons = container w h bottomRight <| flow down [explainButton,submitButton]
     qAndTbox = container w h middle <| flow down [question, textbox]
     questionView = layers [base,qAndTbox,buttons]
     cAns = container w h midTop <|correctAnsNotify
     wAns = container w h midTop <|wronAnsNotify

  in  
         if ((fst context.quizContent) >= (fst context.quizButton)) 
         then questionView
         else let clickedElem = (snd context.quizButton)
              in
                 if (widthOf clickedElem /= 0)
                 then layers [clickedElem,questionView]
                  else if (any (\x -> x == (String.toUpper tboxContent.string)) 
                           correctAns)
                       then  layers [questionView,cAns]
                       else  layers [questionView,wAns]
    
displayMcq: S.Quiz -> C.SlateContext -> S.ConcreteSizeInfo -> Element
displayMcq quiz context  concreteSizeInfo =
 let question = color lightCharcoal <| plainText quiz.question
     w = fst concreteSizeInfo.content  
     h = snd concreteSizeInfo.content
     explanation= color darkGrey <| container w h midTop <| 
                                        plainText (if (quiz.explanation =="")
                                                     then "No Explanation"
                                                     else quiz.explanation)
     explainButton =  getButton explainSign explanation
     cAns = container w h midTop <|correctAnsNotify
     wAns = container w h midTop <|wronAnsNotify
     dropDn =  makeDropDown quiz.options cAns wAns
     base = container w h topRight closeButton
     buttons = container w h bottomRight explainButton
     qAndDrop = container w h middle <| flow down [question, dropDn]
     questionView = layers [base,qAndDrop,buttons]
    

 in  
     let clickedElem = (snd context.quizButton)
     in layers [questionView,clickedElem]
                      
 
makeDropDown: [{option:String, isCorrect:String}] -> Element -> Element ->Element
makeDropDown quizOptions correct wrong =
  let getElem rec = case rec.isCorrect of
                      "true" ->  correct
                      "false" -> wrong
      makeOpt rec = (rec.option, (getElem rec))
  in
     Input.dropDown quizClicks.handle <| (("Select",empty)) ::  (map makeOpt quizOptions)
