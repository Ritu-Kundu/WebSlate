module Utils.Displayer where
{- |
   This module defines utility functions needed by Displayers
 -}
import Window

import Types.Theme as T

getNthFromList n (h::t) = 
   let nmod = n `mod` (length (h::t))
   in 
       if nmod == 0 then h else getNthFromList (nmod-1) t



