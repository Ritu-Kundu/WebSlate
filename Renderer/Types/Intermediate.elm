module Types.Intermediate where
{- |
   This module describes the types used to convert naive theme format into internal theme format
 -}
import Dict
import Types.Theme as T
-- A style specification may or may not be present in naive data.
data RawStyle = NoChange | NewStyle Raw  
-- Dictionaries to keep this intermediate style information       
type RawParentDict = Dict.Dict String RawStyle
type RawTemplateDict = Dict.Dict T.TemplateId RawStyle

-- Intermediate theme-data format
type Raw = { font: Maybe [String]
           , fontColor: Maybe Color
           , fontSize: Maybe T.FontSize
           , fontBold: Maybe Bool
           , fontItalic: Maybe Bool
           , fontAlign: Maybe (Text -> Element)
           , borderWidth: Maybe Float
           , borderColor: Maybe Color
           , borderDashing: Maybe [Int]
           , bg: Maybe T.FillStyle
           , padding: Maybe RawPad
           , shapeAlpha: Maybe Float 
           , shape: Maybe T.SymbolShape
           , shapeFill: Maybe T.FillStyle
           }
type RawSinglePad = { thickness: Maybe Int
                    , fill: Maybe T.FillStyle
                    }
type RawPad = { leftThick: Maybe Int
              , rightThick: Maybe Int
              , bottomThick: Maybe Int
              , topThick: Maybe Int
              , leftColor: Maybe T.FillStyle
              , rightColor: Maybe T.FillStyle
              , bottomColor: Maybe T.FillStyle
              , topColor: Maybe T.FillStyle
              }


