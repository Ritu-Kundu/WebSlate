module Utils.Builder where
{- |
   This module defines utility functions needed by Builders
 -}
import Types.Theme as T
import Types.Slate as S
import Dict
import Builders.Context (..)
import Types.Context (..)
import Graphics.Input as Input

--------------------------------------------------------------------------------------
---------------------------------------------Level wise Mapping------------------------
--------------------------------------------------------------------------------------
-- Function that maps each section to element using levelwise mapping functions
toElementMap: [(T.Section -> Element)] -> T.SectionList -> [Element]
toElementMap funcList sectionList =
  let 
    toElement section = (last <| take (length <| section.route) funcList) section
  in
   (map toElement sectionList)

-- Function that maps each section to pair of route to section and element using levelwise mapping functions
levelwiseRouteMap: [(T.Section -> Element)] -> T.SectionList -> [(T.Route,Element)]
levelwiseRouteMap funcList sectionList =
  let 
    onlyRoute section = section.route
  in
    zip (map onlyRoute sectionList) (toElementMap funcList sectionList)

-- Partition Pairs of route and elements according to the given level
partitionInLevel: Int -> [(T.Route,Element)] -> [[(T.Route,Element)]]
partitionInLevel level routeAndElement =
  let numSections = length <| filter (\x -> x == level) <| map length <| fst (unzip routeAndElement)
      partList list id = 
        if (id > numSections)
        then []
        else let partedList = partition (\(x, y) -> (getLevelNumber level x) == id) list
             in [fst partedList] ++ (partList (snd partedList) (id + 1))
  in
      partList routeAndElement 1

partitionInSection: [(T.Route,Element)] -> [[(T.Route,Element)]]
partitionInSection routeAndElement = partitionInLevel 1 routeAndElement

partitionInSubsection: [(T.Route,Element)] -> [[(T.Route,Element)]]
partitionInSubsection routeAndElement = partitionInLevel 2 routeAndElement

--------------------------------------------------------------------------------------
--------------------------------------------Filtering levelwise-----------------------
--------------------------------------------------------------------------------------
-- Filter out section of the given levels
filterOutLevel: [Int] -> T.SectionList -> T.SectionList
filterOutLevel levels sectioList =
  filter (\x -> any (\y -> (length x.route) == y) levels) sectioList

filterOutSection:T.SectionList -> T.SectionList
filterOutSection sectionList =  filterOutLevel [1] sectionList

filterOutSubsection:T.SectionList -> T.SectionList
filterOutSubsection sectionList =  filterOutLevel [2] sectionList

filterOutSectionAndSubsection:T.SectionList -> T.SectionList
filterOutSectionAndSubsection sectionList =  filterOutLevel [1,2] sectionList


filterOutSubsectionOfCurrentSection:Int-> T.SectionList -> T.SectionList
filterOutSubsectionOfCurrentSection currentSection sectionList =  
  filter (\x -> (getSectionFromRoute x.route) == currentSection) <| filterOutLevel [2] sectionList

tryHeadElseDefault: [T.Section] -> Maybe T.Section
tryHeadElseDefault secList=
  if (isEmpty secList)
  then Nothing
  else Just (head secList)

getCurrentSection: T.Route -> T.SectionList -> Maybe T.Section
getCurrentSection currentRoute sectionList =
  tryHeadElseDefault <| filter (isCurrentSection currentRoute) <| filterOutSection sectionList

getCurrentSubsection: T.Route -> T.SectionList -> Maybe T.Section
getCurrentSubsection currentRoute sectionList =
  tryHeadElseDefault <| filter (isCurrentSection currentRoute) 
  <| filter (isCurrentSubsection currentRoute) 
  <| filterOutSubsection sectionList

getCurrentSubsubsection: T.Route -> T.SectionList -> Maybe T.Section
getCurrentSubsubsection currentRoute sectionList =
  tryHeadElseDefault <| filter (isCurrentSection currentRoute) 
  <| filter (isCurrentSubsection currentRoute) 
  <| filter (isCurrentSubsubsection currentRoute) 
  <| filterOutLevel [3] sectionList

--------------------------------------------------------------------------------------
--------------------------------------------Misc--------------------------------------
--------------------------------------------------------------------------------------
isCurrentSection: T.Route -> T.Section -> Bool
isCurrentSection currentRoute section =
  (getSectionFromRoute currentRoute == getSectionFromRoute section.route)

isCurrentSubsection: T.Route -> T.Section -> Bool
isCurrentSubsection currentRoute section =
  (getSubsectionFromRoute currentRoute == getSubsectionFromRoute section.route)

isCurrentSubsubsection: T.Route -> T.Section -> Bool
isCurrentSubsubsection currentRoute section =
  (getSubsubsectionFromRoute currentRoute == getSubsubsectionFromRoute section.route)


getLevelNumber: Int -> T.Route -> Int
getLevelNumber level route =
  if (level > (length route))
  then -1
  else last <| take level route

getSectionFromRoute: T.Route -> Int
getSectionFromRoute route = getLevelNumber 1 route
 
getSubsectionFromRoute: T.Route -> Int
getSubsectionFromRoute route = getLevelNumber 2 route
  
getSubsubsectionFromRoute: T.Route -> Int
getSubsubsectionFromRoute route = getLevelNumber 3 route
   

getNumberOfSections: T.SectionList -> Int
getNumberOfSections sectionList = 
   length <| filter (\x -> x == 1) <| map (\x -> length x.route) sectionList

getNumberOfSubsections: Int -> T.SectionList -> Int
getNumberOfSubsections sectionId sectionList = 
   length <| filter (\x -> x == 2) <| map (\x -> length x.route) <| filter (\x -> (getSectionFromRoute x.route) == sectionId) sectionList

--------------------------------------------------------------------------------------
----------------------Partition Elements according to Column numbers------------------
--------------------------------------------------------------------------------------
partitionColWise: Int -> [(Int,Element)] -> [Element]
partitionColWise col colAndElement =
  let partList list id = 
        if (id > col)
        then []
        else let partedList = partition (\(x, y) -> x == id) list
                 colElem = flow down <| snd <| unzip <| fst partedList
             in [colElem] ++ (partList (snd partedList) (id + 1))
  in
      partList colAndElement 1

partitionColWiseContentElement: Int -> [(Int,[S.ContentElement])] -> [[S.ContentElement]]
partitionColWiseContentElement col colAndElement =
  let partList list id = 
        if (id > col)
        then []
        else let partedList = partition (\(x, conelemList) -> x == id) list
                 allconElemList = concat <| snd <| unzip <| fst partedList
             in [allconElemList] ++ (partList (snd partedList) (id + 1))
  in
      partList colAndElement 1

getColumnPosition: T.ColAlign -> Position
getColumnPosition colAlign =
  case colAlign of
    T.TopAlign -> midTop
    T.BottomAlign -> midBottom
    T.CenterAlign -> middle


---------------------------------------------------------------------------------------
----------------------------------CLICKABLE--------------------------------------------
---------------------------------------------------------------------------------------
makeClickable: S.TickDict -> T.Route -> Element -> Element
makeClickable tickDict sectionishId elem =
  let tick = Dict.getOrFail sectionishId tickDict
  in
     if (tick == -100)
     then elem
     else Input.clickable asynClicks.handle (Asyn tick) elem 

getNextOrPvsTick: S.TickDict -> T.Route -> T.SectionList -> Int -> Int -> Int
getNextOrPvsTick tickDict currentRoute sectionList level nextOrPvs =
  let cl = if (level == 1)
           then [getSectionFromRoute currentRoute]
           else [getSectionFromRoute currentRoute, getSubsectionFromRoute currentRoute]
      siblings = map .route
                 <| if (level == 1)
                 then filterOutSection sectionList
                 else filterOutSubsectionOfCurrentSection (head currentRoute) sectionList
      validSiblings = if (nextOrPvs > 0)
                       then filter (\x -> x > cl) siblings
                       else filter (\x -> x < cl) siblings
      ticks = filter (\x -> x /= -100) 
              <|map (\x -> Dict.getOrFail x tickDict) validSiblings
  in
      if (isEmpty ticks)
      then Dict.getOrFail currentRoute tickDict
      else if (nextOrPvs > 0)
           then head ticks
           else last ticks
