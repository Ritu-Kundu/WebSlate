module SmartDisplay.SmartList where

import Types.SmartDisplay as TSD
import Utils.SmartDisplay as USD

getSmartDisplay:TSD.SmartDisplay -> Element
getSmartDisplay naive =
  let func = case naive.sdType of
              TSD.PlusEqualHorizontal -> getSmartDisplayPE
              TSD.PlusEqualVertical -> getSmartDisplayPE 
              TSD.PlusMinus -> getSmartDisplayPM
              TSD.ParagraphList -> getSmartDisplayPL
              TSD.CheckBoxComparision -> getSmartDisplayCC 
              TSD.ContainerList -> getSmartDisplayCL
              TSD.FramedList -> getSmartDisplayFL
              otherwise -> getSmartDisplayCircle
  in
     func naive

getSmartDisplayCircle:TSD.SmartDisplay -> Element
getSmartDisplayCircle naive =
  let items = naive.items
      w = naive.width
      subItems = map (\x -> centered <| toText x.body) 
                 <| USD.filterOutSubitemsOfItem [1] items
      mainItem = case (USD.getItemAt 1 items) of
                                   Nothing -> centered <| toText " "
                                   Just x -> centered <| toText x.body
      texts = mainItem :: subItems
      maxW = maximum (map widthOf texts) 
      maxH = maximum (map heightOf texts)
      dimension = (max maxW maxH) + 8
      circleR = ((toFloat dimension)/2)
      distR = ((toFloat w) /3) - circleR
      mainCircle = collage (2*dimension) (2*dimension) [USD.getCircle (2*circleR)]
      xOriginMain = case naive.sdType of
                     TSD.CircleFull -> 0
                     TSD.CircleHalf -> 0
                     TSD.CircleCone -> 0 - (2*circleR)
      sideCircle = collage dimension dimension [USD.getCircle circleR]
      toTextelem d txt =  container d d middle txt
      firstLevelItem = toForm <| layers [mainCircle, (toTextelem <| 2*dimension) mainItem]
      secondlevelItems = map (\x -> toForm <| layers [sideCircle,x])
                         <| map (toTextelem dimension) subItems 
      distributionAngles = USD.getdistributionAngles (length secondlevelItems) naive.sdType
      distributePoints = USD.getdistributePoints distR distributionAngles 
      final = collage w (truncate <|2 * (distR+circleR)) 
                             <| (USD.drawLine (xOriginMain, 0) distributePoints ) ++
                             [(moveX (xOriginMain) firstLevelItem)] ++
                             (USD.distribute distributePoints secondlevelItems)
                             
  in
     final
           

      
      

-------------------------------------------------------------------------------------
---------------------PlusEqual-------------------------------------------------------
getSmartDisplayPE: TSD.SmartDisplay -> Element
getSmartDisplayPE naive =
  let items = naive.items
      w = naive.width
      itemToText itm = case itm of
                         Nothing -> centered <| toText " "
                         Just x ->  centered <| Text.height 30<| toText x.body
      texts = map (\x -> itemToText <| USD.getItemAt x items)  [1,2,3]
      maxW = maximum (map widthOf texts)
      maxH = maximum (map heightOf texts)
      dimension = (max maxW maxH) + 8
      circleR = ((toFloat dimension)/2)
      symbolDimension = truncate circleR
      itemCircle = collage dimension dimension [USD.getCircle circleR]
      toTextelem txt =  container dimension dimension middle txt
      levelItems = map (\x -> layers [itemCircle,x])
                         <| map toTextelem texts
      plus = toTextelem <| fittedImage symbolDimension symbolDimension <| USD.getImage "plus"
      eq = fittedImage symbolDimension symbolDimension <| USD.getImage "equal"
      leftPart = let partList = [(head levelItems), plus, (head <| tail levelItems)]
                 in
                     case naive.sdType of
                        TSD.PlusEqualHorizontal -> flow right partList
                        TSD.PlusEqualVertical -> flow down partList
      restContainer = container dimension (heightOf leftPart) middle
      final = flow right [leftPart, 
                         (restContainer eq), 
                         (restContainer <| last levelItems)]
  in
      if (widthOf final > w)
      then USD.scaleItem (w) final
      else final      

-------------------------------------------------------------------------------------
---------------------PlusMinus-------------------------------------------------------
getSmartDisplayPM: TSD.SmartDisplay -> Element
getSmartDisplayPM naive =
  let items = naive.items
      w = naive.width
      level1ToText itm = case itm of
                          Nothing -> empty
                          Just x ->  centered <| Text.height 30 <| bold <| toText x.body
      level2ToText itmList = map (\itm -> justified <| Text.height 24 <|toText itm.body) itmList
      level1text = level1ToText <| USD.getItemAt 1 items 
      level2Texts = map (\x -> level2ToText <| USD.filterOutSubitemsOfItem [x] items)
                        [1,2]
      bulletedLevel2Text = let makeBullet x = 
                                if ((length x) == 1)
                                then x
                                else map USD.insertBullet x
                           in
                              map makeBullet level2Texts
      maxW = maximum (map widthOf <| level1text :: (concat bulletedLevel2Text))
      level2TextBlocks = map (flow down) bulletedLevel2Text
      maxH = maximum (map heightOf level2TextBlocks)
      blockW = maxW + 10
      blockH = maxH + 20
      blockBase = USD.getBlockBody (blockW,blockH)
      blocks = flow right <| intersperse (USD.getVerticalDivider blockH)
               <| map (\x -> layers [blockBase, (container blockW blockH middle x)])
                  <| level2TextBlocks 
      artHeading = if(widthOf level1text == 0)
                   then empty
                   else  let headW = widthOf blocks
                             headH = (heightOf level1text) + 20
                         in  layers [USD.getBlockHeading (headW, headH),
                                     container headW headH middle level1text]
      finalBlock = flow down [artHeading, blocks] 
      symbolDimension = 40
      plus = fittedImage symbolDimension symbolDimension <| USD.getImage "plus"
      minus = container symbolDimension symbolDimension middle
              <| fittedImage symbolDimension 10 <| USD.getImage "minus"
      finalContainer = container ((widthOf finalBlock) + symbolDimension) 
                                 ((heightOf finalBlock) + symbolDimension)
      final = layers [ (finalContainer middle finalBlock)
                     , (finalContainer topLeft plus)
                     , (finalContainer topRight minus)
                     ]
  in 
      if (widthOf final > w)
      then USD.scaleItem (w) final
      else final      

-------------------------------------------------------------------------------------
---------------------Paragraph List--------------------------------------------------
getSmartDisplayPL: TSD.SmartDisplay -> Element
getSmartDisplayPL naive =
  let items = naive.items
      w = naive.width
      level1ToText itm = case itm of
                          Nothing -> empty
                          Just x ->  centered <| Text.height 26 <|bold <| toText 
                                     <|String.join "\n" (String.words x.body)
      level2ToText itmList = map (\itm -> justified <| Text.height 22 <| toText itm.body) itmList
      level1text = level1ToText <| USD.getItemAt 1 items 
      level2Texts = level2ToText <| USD.filterOutSubitemsOfItem [1] items
      maxW = maximum (map widthOf level2Texts)
      maxH = maximum (map heightOf level2Texts)
      blockW = maxW +16
      blockH = maxH + 16
      blockBase = container blockW blockH middle
      blocks = flow down 
               <| intersperse (opacity 0.7 <| USD.getHorizontalDivider blockW)
               <| map (\x -> container blockW blockH middle x) level2Texts 
      artHeading = let headW = widthOf level1text + 8
                       headH = (heightOf blocks)
                   in  
                      container headW headH midTop level1text
      finalBlock = flow right [artHeading, blocks] 
      startBar = container (widthOf finalBlock) 16 middle
                 <| USD.getHorizontalDivider (widthOf finalBlock)
      final = flow down [startBar, finalBlock]
  in 
       if (widthOf final > w)
       then USD.scaleItem (w) final
       else final      


-------------------------------------------------------------------------------------
---------------------Checkbox Comparision--------------------------------------------
getSmartDisplayCC: TSD.SmartDisplay -> Element
getSmartDisplayCC naive =
  let items = naive.items
      w = naive.width
      level1ToText itmList = map (\x -> centered <| bold <| Text.height 26<| toText x.body) itmList 
      level2ToText itmList = map (\itm -> justified <| Text.height 24<|toText itm.body) itmList
      level1texts = level1ToText <| USD.filterOutItems items 
      numLevel1Items = length level1texts
      level2Texts = map (\x -> level2ToText <| USD.filterOutSubitemsOfItem [x] items)
                        [1..numLevel1Items]
      bulletedLevel2Text = let makeBullet x = 
                                map USD.insertCheckbox x
                           in
                              map makeBullet level2Texts
      maxW = maximum (map widthOf <| level1texts ++ (concat bulletedLevel2Text))
      level2TextBlocks = map (flow down) bulletedLevel2Text
      maxH = maximum (map heightOf level2TextBlocks)
      maxHHeading = (maximum  (map heightOf level1texts)) + 8
      blockW = maxW + 16
      blockH = maxH + 4

      dividingBar = container blockW 24 middle 
                    <| layers [ USD.getBlockHeading (blockW, 20)
                              , container blockW 20 bottomLeft USD.checkbox]
      
      final = flow right  
              <| map (\(h, b) -> flow down [h, dividingBar, b])
                 <| zip (map (\x -> container blockW maxHHeading middle x) level1texts)
                        (map (\x -> container blockW maxH topLeft x) level2TextBlocks)


  in 
       if (widthOf final > w)
       then USD.scaleItem (w) final
       else final      
 
-------------------------------------------------------------------------------------
---------------------------Container List--------------------------------------------
-- alternateColoredItem begin with !
getSmartDisplayCL: TSD.SmartDisplay -> Element
getSmartDisplayCL naive =
  let items = naive.items
      w = naive.width
      level1ToText itmList = map (\x -> centered <| Text.height 18 <| bold <| toText x.body) itmList 
      level2ToTypeNText itmList = let getStr str = 
                                         if  (String.startsWith "!" str)
                                         then String.dropLeft 1 str
                                         else str
                                      change itm= centered <| toText (getStr itm.body)
                                      blockType itm = (String.startsWith "!" itm.body)
                                  in
                                     map (\itm -> (blockType itm, change itm)) itmList
      level1texts = level1ToText <| USD.filterOutItems items 
      numLevel1Items = length level1texts
      level2TypeNText = map (\x -> level2ToTypeNText 
                                    <| USD.filterOutSubitemsOfItem [x] items)
                             [1..numLevel1Items]
      level2Texts = concatMap (\x-> map snd x) level2TypeNText
      maxW = maximum (map widthOf <| level2Texts)
      maxH = maximum (map heightOf level2Texts)
      blockW = maxW + 4
      blockH = maxH + 4
      innerBlock = container (blockW +8) (blockH +8) middle 
                   <| USD.getBlockBody (blockW,blockH)
      placeText (ty, tex) = let blo = if ty
                                      then opacity 0.4 <| color blue <|  innerBlock
                                      else innerBlock
                            in
                               layers [blo
                                      , container (widthOf blo) (heightOf blo) middle tex]
      level2Blocks = map (\x -> flow down <| intersperse (spacer blockW 10) 
                                             <| map placeText x) level2TypeNText
      maxHLevel2 = maximum (map heightOf level2Blocks)
      maxWHeading = max (maximum  (map widthOf level1texts)) blockW
      maxHHeading = (maximum  (map heightOf level1texts)) + 10
      level1Blocks = map (\x -> container (maxWHeading+4) (maxHHeading+4) middle x) level1texts
      outerBase =  opacity 0.2 <| USD.getBlockHeading (maxWHeading +8
                                        , maxHLevel2 +maxHHeading+8 )
      inOuterBlock = container ((widthOf outerBase)+4) ((heightOf outerBase)+4) midTop
      final = flow right <| (intersperse (spacer 4 (heightOf outerBase)))
              <| map (\ (h, b) -> layers [inOuterBlock outerBase
                                        , inOuterBlock <|flow down 
                                                         [h,container (widthOf h) (heightOf b) middle b]])
                 <| zip level1Blocks level2Blocks
  in 
       if (widthOf final > w)
       then USD.scaleItem (w) final
       else final      
     
-------------------------------------------------------------------------------------
------------------------------Framed List--------------------------------------------
getSmartDisplayFL: TSD.SmartDisplay -> Element
getSmartDisplayFL naive =
  let items = naive.items
      w = naive.width - 8
      bodyW = w - 20
      headingW = w - 40
      level1ToText itmList = map (\x -> justified <| bold <| Text.height 24<| toText x.body) itmList 
      level2ToText itmList = map (\itm -> justified <| Text.height 22<| toText itm.body) itmList
      level1texts = level1ToText <| USD.filterOutItems items 
      numLevel1Items = length level1texts
      level2Items = map (\x -> USD.filterOutSubitemsOfItem [x] items)
                        [1..numLevel1Items]
      level2Texts = map level2ToText level2Items
      level3Texts = map (\x -> map (\y -> level2ToText 
                                  <| USD.filterOutSubsubitemsOfSubitem y.route items) x) 
                        level2Items
      bulletedLevel2Text = let makeBullet x = 
                                map USD.insertBullet x
                           in
                              map makeBullet level2Texts
      bulletedLevel3Text = let makeBullet x = 
                                map (map USD.insertSubBullet) x
                           in
                              map makeBullet level3Texts

      maxHHeading = (maximum  (map heightOf level1texts)) + 8
      
      headingBase = USD.getBlockHeading (headingW, maxHHeading)
      level1TextBlocks = map (\x -> layers [headingBase
                                           , container headingW maxHHeading 
                                               (topLeftAt (absolute 8) (absolute 4)) x
                                           ]) level1texts

      level3TextBlocks = map (\x -> map (\y -> flow down y) x) bulletedLevel3Text
      headingHinBody = truncate <| (toFloat (maxHHeading + 8)) / 2
      level2TextBlocks = map (\x -> container w ((heightOf x) + 16+  headingHinBody) 
                                              (topLeftAt (absolute 20) (absolute <| headingHinBody + 2))
                                              x) 
                         <| map (flow down)
                         <| map (\x -> map (\ (l2, l3) -> flow down [l2, l3]) x)
                             <| map (\ (list1, list2) -> zip list1 list2)
                             <| zip (map (\x -> map (\y -> container bodyW (heightOf y) midLeft y) x) 
                                         bulletedLevel2Text)
                                     (map (\x -> map (\y -> container bodyW (heightOf y) midLeft y) x) 
                                          level3TextBlocks)
      final = flow down <| intersperse (spacer w 10)
              <| map (\ (h, b) -> layers[ container w (heightOf b + ((heightOf h) `div` 2)) (topLeftAt (absolute 0) (absolute ((heightOf h) `div` 2))) b,
                                         container w (heightOf b + ((heightOf h) `div` 2)) midTop h])
                 <| zip (map (\x -> container w (heightOf x) (topLeftAt (absolute 30) (absolute 0)) x) level1TextBlocks)
                        (map (\x -> layers [USD.getFrameBody (w, (heightOf x)), x] ) 
                             level2TextBlocks)


  in 
       if (widthOf final > w)
       then USD.scaleItem (w) final
       else final      
 
