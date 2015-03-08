module Builders.ElementMaker where
{- |
   This module builds the Elm-elements from the given text and theme
 -}
import Utils.Naive (..)
import Types.Theme as T
import Types.Slate as S
import Types.Naive as Naive

import Utils.Content as UC
import Utils.Theme as UT

-- Text buider
buildText: T.Styling -> String -> Element
buildText styling s=
  let styledText = styling.text.align <| style styling.text.style <| toText s
  in
   styledText

-- Build slate text made-up of different text parts with different style
buildSlateText:  T.StyleInfo -> T.Styling -> Naive.SlateText ->Element
buildSlateText styleInfo styling slateText =
  let  alertStying = UC.getStyling ("alert", "none") styleInfo
       highlightStying = UC.getStyling ("highlight", "none") styleInfo
       coloredStyling c = UT.setTextColor styling c
       applyEffect effect txt = case effect of
                                  "bold" -> Text.bold txt
                                  "italic" -> Text.italic txt
                                  "underline" -> Text.line Under txt
                                  otherwise -> txt
       inlineStyleToStyle str = case str of
                                  "alert" -> alertStying
                                  "highlight" -> highlightStying
                                  "bold" ->  styling
                                  "italic" -> styling
                                  "underline" -> styling
                                  "normal" -> styling
                                  x -> coloredStyling (processColor x)

       partToElem  partNStyle =  styling.text.align
                                     <| applyEffect (snd partNStyle) 
                                     <| style 
                                             (.style <| .text <| inlineStyleToStyle (snd partNStyle)) 
                                             (toText (fst partNStyle))
                                
       group partNStyle partList = if (String.startsWith "\n" (fst partNStyle))
                                  then partList ++ [[partNStyle]]
                                  else let newListInitial = take ((length partList) - 1)partList
                                           newLast = (last partList) ++ [partNStyle]
                                       in
                                          newListInitial ++ [newLast]  
       partNStyleList = zip slateText.parts slateText.inlinestyle
       groupedList = foldl group [[head partNStyleList]] <| tail partNStyleList

  in
      if (isEmpty slateText.parts)
      then empty
      else flow down <| map (\x -> flow right <| map partToElem x) groupedList

-- Build a tabbed element of given width and height
buildTabbedElement: (T.Width, T.Height) -> S.Level -> Int -> S.Marker -> Element -> Element
buildTabbedElement (w,h) level offset marker item  = 
  let
        offsetWidth = offset
        markerWidth = (widthOf marker)
        emptySpacerWidth = markerWidth + offsetWidth
        remainingWidth = w - (level * emptySpacerWidth)
        resizedElem =  collage remainingWidth h 
                               [ scale ((toFloat remainingWidth) / toFloat (widthOf item)) <| toForm item
                               ]
        emptySpacer = opacity 0<| spacer ((level - 1) * emptySpacerWidth) h
   in
        container w h middle
         <| flow right [ emptySpacer
                       , (container markerWidth h midTop marker)
                       , (spacer offsetWidth h)
                       , resizedElem
                       ]

-- Draw background
drawFill: T.Width -> T.Height -> T.FillStyle -> Element
drawFill w h fill = 
  let 
    frame = rect (toFloat w) (toFloat h)
    solidFrame f = collage w h [f]
  in
    case fill of
      T.Transparent -> spacer w h
      T.SingleColored fillColor -> solidFrame <| filled fillColor frame
      T.Grad grad gradientColor -> solidFrame <| gradient grad frame

--Build canvas by drawing background and border
buildCanvas: T.Width -> T.Height -> T.BorderStyle -> T.FillStyle -> Element
buildCanvas w h borderstyle fillstyle = 
  let bordered = case borderstyle of
                     T.None -> empty
                     T.Border borderstyle -> let
                                             newWidth = (toFloat w) - borderstyle.width
                                             newHeight = (toFloat h) - borderstyle.width
                                           in 
                                             collage w h 
                                              [(outlined borderstyle 
                                                 (rect newWidth newHeight)
                                               )
                                              ]
      filled = drawFill w h fillstyle  
    in
    layers [filled, bordered]

-- Build padding around an element
buildPadding: T.Width -> T.Height -> T.AllPaddingStyle -> Element
buildPadding w h padding = 
  let singlePad posPad pad= container w h posPad pad
      leftPad = singlePad topLeft 
                <| drawFill (padding.left.thickness) h
                            padding.left.fillcolor                            
      rightPad = singlePad topRight 
                 <| drawFill (padding.right.thickness) h
                             padding.right.fillcolor                            
      topPad = singlePad midTop 
                <| drawFill w (padding.top.thickness)
                            padding.top.fillcolor
      bottomPad = singlePad midBottom 
                <| drawFill w (padding.bottom.thickness)
                            padding.bottom.fillcolor
  in 
    layers [leftPad, rightPad, topPad, bottomPad]


-- Build a complete element by drawing padding, border, background
-- Element is placed in the container of given width and height
buildCompleteElement: (T.Width, T.Height) -> T.Styling -> Element ->Element
buildCompleteElement (w, h) styling elem = 
  let lPad = styling.padding.left.thickness
      rPad = styling.padding.right.thickness
      tPad = styling.padding.top.thickness
      bPad = styling.padding.bottom.thickness
      borderThickness = case styling.border of
                         T.None -> 0
                         T.Border borderstyle -> truncate borderstyle.width
      withPadWidth = w + lPad + rPad
      withPadHeight = h + tPad + bPad
      textWidth = withPadWidth - lPad  - rPad
      positionedElem =  container w h middle elem 
      totalWidth = withPadWidth  + (borderThickness * 2)      
      totalHeight = withPadHeight  + (borderThickness * 2)
      relativePadLeftPos = (toFloat borderThickness) / (toFloat totalWidth)
      relativePadTopPos = (toFloat borderThickness) / (toFloat totalHeight)
      relativeElementLeftPos = relativePadLeftPos + ((toFloat lPad) / (toFloat totalWidth))
      relativeElementTopPos = relativePadTopPos + ((toFloat tPad) / (toFloat totalHeight))
      canvas = buildCanvas  totalWidth totalHeight styling.border styling.background
      padding = buildPadding withPadWidth withPadHeight styling.padding
      placedPadding = container totalWidth totalHeight 
                        (topLeftAt (relative relativePadLeftPos) 
                                   (relative relativePadTopPos)
                        )
                        padding
      placedElem = container totalWidth totalHeight 
                     (topLeftAt (relative relativeElementLeftPos) 
                                (relative relativeElementTopPos )
                     ) 
                     positionedElem
  in
    layers [ canvas
           , placedPadding
           , placedElem
           ]

-- Build a symbol by drawing and filling its shape and then applying its opacity settings 
buildSymbol: T.SymbolStyling -> T.SymbolSizing -> Maybe String -> Element
buildSymbol symbolStyle symbolSizing tex=
  let
    w = symbolSizing.width
    h = symbolSizing.height
    floatWidth = (toFloat w) * symbolSizing.coverage
    floatHeight = (toFloat h) * symbolSizing.coverage
    normalStyle = symbolStyle.general
   
    getShapeFrame = case symbolStyle.symbolShape of
                            T.Circle -> circle floatHeight
                            T.Rectangle -> rect floatWidth floatHeight
                            T.Square -> rect floatHeight floatHeight
                            T.Triangle -> ngon 3 floatHeight
                            T.Tick -> rect 2 floatHeight
    getShape = case symbolStyle.symbolFill of
                 T.Transparent -> outlined (solid normalStyle.text.style.color)
                                           (getShapeFrame)
                 T.SingleColored fillColor -> filled fillColor (getShapeFrame)
                 T.Grad grad gradientColor -> gradient grad (getShapeFrame)
    markerSymbol =  collage w h [getShape]
    markerText = case tex of
               Nothing -> empty
               Just t -> let textElem = buildText normalStyle t
                         in 
                          collage w h [
                                        scale (floatHeight / toFloat (heightOf textElem))
                                        <| toForm textElem
                                       ]
    marker =  buildCompleteElement (w,h) normalStyle <|layers [markerSymbol, markerText]
  in
    opacity symbolStyle.symbolAlpha marker
