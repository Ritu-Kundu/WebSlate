module Utils.Naive where
{- |
   This module defines utility functions for naive input
 -}

-- Converts string to a cocrete float
toConcreteFloat str
  = case (String.toFloat str) of
      Nothing -> 0
      Just x -> x
toConcreteInt str
  = case (String.toInt str) of
      Nothing -> 0
      Just x -> x

-- Converts string to a cocrete int
concreteInt: Maybe Int -> Int
concreteInt x = case x of 
                  Nothing -> 0
                  Just y -> y
-------------------------------------------------------------------------------------
-- Builds Elm color from code as string for rgb, rgba, hsl, hsla encodings
buildColorFromCode: String -> Color
buildColorFromCode str = 
      let substrList =  String.split ":" str
          intList = map toConcreteInt (tail substrList)
          floatList = map toConcreteFloat (tail substrList)
      in
          case (head substrList) of
            "rgb" -> rgb (head intList) (head <| tail intList) (last intList)
            "rgba" -> rgba (head intList) (head <| tail intList) 
                           (last <| take 3 intList) (last floatList)
            "hsl" -> hsl (head floatList) (head <| tail floatList) (last floatList) 
            "hsla" -> hsla (head floatList) (head <| tail floatList) 
                         (last <| take 3 floatList) (last floatList)

-- Returns Color corresponding to a given name as string
getNamedColor: String -> Color
getNamedColor str = 
     case str of
      "red" -> red
      "orange" -> orange
      "yellow" -> yellow
      "green"  -> green
      "blue" -> blue
      "purple" -> purple
      "brown" -> brown
      "lightred" -> lightRed
      "lightorange" -> lightOrange
      "lightyellow" -> lightYellow
      "lightgreen"  -> lightGreen
      "lightblue" -> lightBlue
      "lightpurple" -> lightPurple
      "lightbrown" -> lightBrown
      "darkred" -> darkRed
      "darkorange" -> darkOrange
      "darkyellow" -> darkYellow
      "darkgreen"  -> darkGreen
      "darkblue" -> darkBlue
      "darkpurple" -> darkPurple
      "darkbrown" -> darkBrown
      "white" -> white
      "lightgrey" -> lightGrey
      "grey" -> grey
      "darkgrey" -> darkGrey
      "lightcharcoal" -> lightCharcoal
      "charcoal" -> charcoal
      "darkcharcoal" -> darkCharcoal
      "black" -> black

-- Process color from a  string
processColor: String -> Color
processColor str =
  if | (String.contains ":" str) -> buildColorFromCode str
     |otherwise -> getNamedColor str


