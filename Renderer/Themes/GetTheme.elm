module Themes.GetTheme where
{- |
   This module returns the theme dictionary corresponding to theme specified in naive input
 -}

import Types.Theme as T
import Types.Intermediate as I

import Themes.Styles.Default  as SDef
import Themes.Styles.Sober as SSober
import Themes.Styles.Striking as SStriking

import Themes.Layouts.Default as LDef
import Themes.Layouts.InfoLines as LInfo
import Themes.Layouts.MiniFrames as LMini
import Themes.Layouts.SideBar as LSide
import Themes.Layouts.Split as LSplit
import Themes.Layouts.Tree as LTree

-- Returns Style Theme
style: String -> ([String] -> Maybe Float -> I.RawParentDict -> T.Mapping -> T.StyleInfo)
style themeString =
  case themeString of
    "default" -> SDef.defaultTheme
    "sober" -> SSober.defaultTheme
    "striking" -> SStriking.defaultTheme
    otherwise -> SDef.defaultTheme

-- Returns Layout theme
layout: String -> (T.LayoutInfo, T.ParentList)
layout themeString =
  case themeString of
    
    "infolines" -> (LInfo.infoLineLayoutInfo, LInfo.changePalletteMapping)
    "miniframes:authortitle" -> (LMini.miniframesLayoutInfo T.AuthorTitle, LMini.changePalletteMapping)
    "miniframes:institutetitle" -> (LMini.miniframesLayoutInfo T.InstituteTitle, LMini.changePalletteMapping)
    "miniframes:authorinstitutetitle" -> (LMini.miniframesLayoutInfo T.AuthorInstituteTitle, LMini.changePalletteMapping)
    "miniframes:nofoot" -> (LMini.miniframesLayoutInfo T.NoFoot, LMini.changePalletteMapping)
    "leftsidebar" -> (LSide.sideBarLayoutInfo T.LeftSidebar, LSide.changePalletteMapping)
    "rightsidebar" -> (LSide.sideBarLayoutInfo T.RightSidebar, LSide.changePalletteMapping)
    "split" -> (LSplit.splitLayoutInfo, LSplit.changePalletteMapping)
    "tree" -> (LTree.treeLayoutInfo, LTree.changePalletteMapping)
    otherwise -> (LDef.defaultLayoutInfo, LDef.changePalletteMapping)

