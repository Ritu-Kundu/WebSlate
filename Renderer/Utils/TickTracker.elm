module Utils.TickTracker where
{- |
   This module defines utility functions needed to track ticks of sections/subsection/subsubsections and slides
 -}
import Types.Slate as S
import Dict

-- Returns List cotaining slide index for slide to be displayed at each tick
getTickList: Bool -> Bool -> S.SectionIdList -> S.SlideIndexInfoList -> S.SlideIndexInfoList
getTickList isMarkSection isMarkSubsection sectionIdList slideList =
  let sect = zip sectionIdList (repeat (length sectionIdList) []) 
      sectionwiseSlidesDict =foldl (\(rt,sl) d -> add (rt) [sl] d) 
                                   (Dict.fromList sect) 
                                   slideList
      sections = filterOutLevel [1] sectionIdList
      subsections = filterOutLevel [2] sectionIdList
      sectionsInserted = if (isMarkSection)
                         then insertMarkerSlides -1 sections sectionwiseSlidesDict
                         else sectionwiseSlidesDict

      subsectionsInserted = if (isMarkSubsection)
                            then insertMarkerSlides -2 sections sectionsInserted
                            else sectionsInserted
      toSeparatedSlideIndex (route, indices) = zip
                                            ( repeat (length indices) route)
                                            indices
  in
     concatMap toSeparatedSlideIndex (Dict.toList subsectionsInserted)

-- Returns tick corresponding to each section/subsection/subsubsection
getSectionTick: S.SectionIdList -> S.SlideIndexInfoList -> S.TickDict
getSectionTick sectionIdList slideList =
  let sect = zip sectionIdList (repeat (length sectionIdList) []) 
      sectionwiseSlidesDict =foldl (\((rt,sl),tick) d -> add (rt) [tick] d) 
                                   (Dict.fromList sect) 
                                   <| zip slideList [0..((length slideList)-1)]
      onlyFirstTick tickList = if (isEmpty tickList)
                               then -100
                               else head tickList
      tickDict = Dict.map onlyFirstTick sectionwiseSlidesDict

      firstTick rt tickD = 
         let subtreeOfrt = findSubtree rt sectionIdList
             ticksOfsubtree = map (\x -> Dict.getOrFail x tickD)
                                             subtreeOfrt
             validTicksOfSubtree = filter (\x -> x /= -100) ticksOfsubtree
             func v old = case old of
                            Nothing -> Nothing
                            Just x -> Just v
             updateWith v = Dict.update rt (func v) tickD
         in
             if (isEmpty validTicksOfSubtree)
             then updateWith -100
             else updateWith (head validTicksOfSubtree)
      sections = filterOutLevel [1] sectionIdList
      subsections = filterOutLevel [2] sectionIdList
      
  in
      foldl firstTick 
            (foldl firstTick tickDict subsections)
            sections


--------------------------------------------------------------------------------------
-----------------------------------------Misc-----------------------------------------
--------------------------------------------------------------------------------------
add: S.Route -> [Int] -> S.DictSectionwiseSlide -> S.DictSectionwiseSlide
add k v d
  = let func old = case old of
                  Nothing -> Nothing
                  Just x -> Just (x ++ v)
    in Dict.update k func d

addAtBegin: S.Route -> S.SlideIndex -> S.DictSectionwiseSlide -> S.DictSectionwiseSlide
addAtBegin k v d
  = let fun old = case old of
                  Nothing -> Nothing
                  Just x -> Just (v::x)
    in Dict.update k fun d

insertMarkerSlides: S.SlideIndex -> S.SectionIdList -> S.DictSectionwiseSlide -> S.DictSectionwiseSlide 
insertMarkerSlides marker sec slideDict
  = foldl (\x d-> addAtBegin x marker d) slideDict sec 
  
filterOutLevel: [Int] -> S.SectionIdList-> S.SectionIdList
filterOutLevel levels sectionList =
  filter (\x -> any (\y -> (length x) == y) levels) sectionList

findSubtree: S.Route ->  S.SectionIdList ->  S.SectionIdList
findSubtree rt treeList = 
  let len = (length rt) + 1
      allchildren = filterOutLevel [len] treeList
   in
      rt :: (filter (\x -> (take (len-1) <| x) == rt) treeList)
  
