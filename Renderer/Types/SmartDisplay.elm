module Types.SmartDisplay where

type SmartDisplay = { width: Int
                    , sdType: SmartDisplayType 
                    , items: SmartItemList
                    }
type Route = [Int]
type SmartItemList = [SmartItem]
-- Body will never be empty
type SmartItem = { route: Route
                 , body: String
                 }
data SmartDisplayType = CircleFull | CircleHalf | CircleCone | 
                        PlusEqualHorizontal | PlusEqualVertical |
                        PlusMinus | ParagraphList |
                        CheckBoxComparision | ContainerList | FramedList
