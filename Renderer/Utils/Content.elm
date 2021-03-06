module Utils.Content where
{- |
   This module defines utility functions needed for preprocessing content
 -}
import Dict

import Types.Theme as T
import Types.Slate as S

import Utils.Naive (..)
import Utils.Theme as UT

getStyling: T.TemplateId -> T.StyleInfo -> T.Styling
getStyling templateId styleInfo =
  let lookIn dict =  Dict.getOrFail templateId dict
  in 
      case (UT.getDictType templateId) of
        "outer" -> lookIn styleInfo.outer
        "inner" -> lookIn styleInfo.inner

getSymbolStyling: T.TemplateId -> T.StyleInfo -> T.SymbolStyling
getSymbolStyling templateId styleInfo =
  let lookIn dict =  Dict.getOrFail templateId dict
  in 
      case (UT.getDictType templateId) of
        "symbol" -> lookIn styleInfo.symbol


rawColumnContentToColumnContent: [S.RawColumnContent] -> Int -> [[S.ColumnContent]]
rawColumnContentToColumnContent rawList numCol =
  let partList list id = 
        if (id > numCol)
        then [[]]
        else let partedList = partition (\x -> x.containerColumn == id) list
                 convertToColElem rawColElem = let intermediate = {rawColElem - inColumnnPos}
                                               in {intermediate - containerColumn}
                 colElemList =  map convertToColElem <| sortBy .inColumnnPos <| fst partedList
             in [colElemList] ++ (partList (snd partedList) (id + 1))
  in
      partList rawList 1
      
