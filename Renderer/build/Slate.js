Elm.Slate = Elm.Slate || {};
Elm.Slate.make = function (_elm) {
   "use strict";
   _elm.Slate = _elm.Slate || {};
   if (_elm.Slate.values)
   return _elm.Slate.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Slate";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Displayers = Displayers || {};
   Displayers.Main = Elm.Displayers.Main.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var JavaScript = JavaScript || {};
   JavaScript.Experimental = Elm.JavaScript.Experimental.make(_elm);
   var Json = Elm.Json.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var _op = {};
   var initialBg = Graphics.Element.layers(_L.fromArray([A3(Graphics.Collage.collage,
                                                        800,
                                                        800,
                                                        _L.fromArray([Graphics.Collage.filled(Color.grey)(A2(Graphics.Collage.rect,
                                                        800,
                                                        800))]))
                                                        ,Text.justified(Text.color(Color.white)(Text.height(40)(Text.toText("SLATE: Press Right Arrow to start"))))]));
   var pen = A3(Graphics.Collage.collage,
   5,
   5,
   _L.fromArray([Graphics.Collage.filled(Color.red)(Graphics.Collage.circle(5))]));
   var portParsedStr = Native.Ports.portIn("portParsedStr",
   function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   });
   var tojson = Json.fromString(portParsedStr);
   var naive = function () {
      switch (tojson.ctor)
      {case "Just":
         return JavaScript.Experimental.toRecord(JavaScript.Experimental.fromJson(tojson._0));}
      _E.Case($moduleName,
      "between lines 19 and 20");
   }();
   var showMain = F2(function (context,
   elem) {
      return function () {
         var _v2 = context.mode;
         switch (_v2.ctor)
         {case "ScribbleMode":
            return function () {
                 var closeSign = A3(Graphics.Element.fittedImage,
                 30,
                 30,
                 "Symbols/Close.gif");
                 var closeButton = A5(Graphics.Input.customButton,
                 Builders.Context.modeClicks.handle,
                 Types.Context.NormalMode,
                 closeSign,
                 Graphics.Element.opacity(0.5)(closeSign),
                 closeSign);
                 var base = A4(Graphics.Element.container,
                 context.windowWidth,
                 context.windowHeight,
                 Graphics.Element.topRight,
                 closeButton);
                 return Graphics.Element.layers(_L.fromArray([elem
                                                             ,base
                                                             ,A4(Graphics.Element.container,
                                                             context.windowWidth,
                                                             context.windowHeight,
                                                             A2(Graphics.Element.middleAt,
                                                             Graphics.Element.absolute(Basics.fst(context.mousePosition)),
                                                             Graphics.Element.absolute(Basics.snd(context.mousePosition))),
                                                             pen)]));
              }();}
         return A2(Displayers.Main.showPresentation,
         naive,
         context);
      }();
   });
   var main = A3(Signal.foldp,
   showMain,
   initialBg,
   Builders.Context.contextSignal);
   _elm.Slate.values = {_op: _op
                       ,tojson: tojson
                       ,naive: naive
                       ,pen: pen
                       ,showMain: showMain
                       ,initialBg: initialBg
                       ,main: main};
   return _elm.Slate.values;
};Elm.Displayers = Elm.Displayers || {};
Elm.Displayers.Main = Elm.Displayers.Main || {};
Elm.Displayers.Main.make = function (_elm) {
   "use strict";
   _elm.Displayers = _elm.Displayers || {};
   _elm.Displayers.Main = _elm.Displayers.Main || {};
   if (_elm.Displayers.Main.values)
   return _elm.Displayers.Main.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Displayers.Main";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Displayers = Displayers || {};
   Displayers.ContentSlide = Elm.Displayers.ContentSlide.make(_elm);
   var Displayers = Displayers || {};
   Displayers.QuizSlide = Elm.Displayers.QuizSlide.make(_elm);
   var Displayers = Displayers || {};
   Displayers.SectionishSlide = Elm.Displayers.SectionishSlide.make(_elm);
   var Displayers = Displayers || {};
   Displayers.SupportbinSlide = Elm.Displayers.SupportbinSlide.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var PreProcess = PreProcess || {};
   PreProcess.ContentMaker = Elm.PreProcess.ContentMaker.make(_elm);
   var PreProcess = PreProcess || {};
   PreProcess.ThemeMaker = Elm.PreProcess.ThemeMaker.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Displayer = Elm.Utils.Displayer.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var Utils = Utils || {};
   Utils.TickTracker = Elm.Utils.TickTracker.make(_elm);
   var _op = {};
   var getTickList = F3(function (theme,
   sectionIdList,
   slideList) {
      return function () {
         var isMarkSubsection = function () {
            var _v0 = Basics.fst(theme.layout.atBeginSubsectionSlide);
            switch (_v0.ctor)
            {case "Empty": return false;
               case "Layout": return true;}
            _E.Case($moduleName,
            "between lines 182 and 185");
         }();
         var isMarkSection = function () {
            var _v2 = Basics.fst(theme.layout.atBeginSectionSlide);
            switch (_v2.ctor)
            {case "Empty": return false;
               case "Layout": return true;}
            _E.Case($moduleName,
            "between lines 179 and 182");
         }();
         var tickList = List.isEmpty(sectionIdList) ? slideList : A4(Utils.TickTracker.getTickList,
         isMarkSection,
         isMarkSubsection,
         sectionIdList,
         slideList);
         var tickListAfterToc = function () {
            var _v4 = Basics.fst(theme.layout.tocSlide);
            switch (_v4.ctor)
            {case "Empty": return tickList;
               case "Layout":
               return List.isEmpty(sectionIdList) ? tickList : {ctor: "::"
                                                               ,_0: {ctor: "_Tuple2"
                                                                    ,_0: _L.fromArray([])
                                                                    ,_1: -10}
                                                               ,_1: tickList};}
            _E.Case($moduleName,
            "between lines 188 and 193");
         }();
         return {ctor: "::"
                ,_0: {ctor: "_Tuple2"
                     ,_0: _L.fromArray([])
                     ,_1: -20}
                ,_1: tickListAfterToc};
      }();
   });
   var getComponentSize = F5(function (layoutInfo,
   componenSizeInfo,
   w,
   h,
   componentType) {
      return function () {
         var getX = F3(function (layout,
         relX,
         x) {
            return function () {
               switch (layout.ctor)
               {case "Empty": return 0;}
               return Basics.truncate(relX * Basics.toFloat(x));
            }();
         });
         return function () {
            switch (componentType)
            {case "footline":
               return {ctor: "_Tuple2"
                      ,_0: w
                      ,_1: A3(getX,
                      layoutInfo.footline,
                      componenSizeInfo.footlineHeight,
                      h)};
               case "headline":
               return {ctor: "_Tuple2"
                      ,_0: w
                      ,_1: A3(getX,
                      layoutInfo.headline,
                      componenSizeInfo.headlineHeight,
                      h)};
               case "leftSidebar":
               return {ctor: "_Tuple2"
                      ,_0: A3(getX,
                      layoutInfo.leftSidebar,
                      componenSizeInfo.leftSidebarWidth,
                      w)
                      ,_1: h};
               case "navigationSymbol":
               return {ctor: "_Tuple2"
                      ,_0: w
                      ,_1: Basics.truncate(componenSizeInfo.navigationSymbolHeight * Basics.toFloat(h))};
               case "rightSidebar":
               return {ctor: "_Tuple2"
                      ,_0: A3(getX,
                      layoutInfo.rightSidebar,
                      componenSizeInfo.rightSidebarWidth,
                      w)
                      ,_1: h};
               case "title":
               return {ctor: "_Tuple2"
                      ,_0: Basics.truncate(componenSizeInfo.slideTitleWidth * Basics.toFloat(w))
                      ,_1: Basics.truncate(componenSizeInfo.slideTitleHeight * Basics.toFloat(h))};}
            _E.Case($moduleName,
            "between lines 166 and 174");
         }();
      }();
   });
   var getConcreteComponentSize = F3(function (getSize,
   w,
   h) {
      return function () {
         var footlineSize = A3(getSize,
         w,
         h,
         "footline");
         var headlineSize = A3(getSize,
         w,
         h,
         "headline");
         var sideBarheight = h - Basics.snd(headlineSize) - Basics.snd(footlineSize);
         var leftSidebarSize = A3(getSize,
         w,
         sideBarheight,
         "leftSidebar");
         var rightSidebarSize = A3(getSize,
         w,
         sideBarheight,
         "rightSidebar");
         var bodySize = {ctor: "_Tuple2"
                        ,_0: w - Basics.fst(leftSidebarSize) - Basics.fst(rightSidebarSize)
                        ,_1: sideBarheight};
         var titleSize = A3(getSize,
         Basics.fst(bodySize),
         Basics.snd(bodySize),
         "title");
         var navSymbolSize = A3(getSize,
         Basics.fst(bodySize),
         Basics.snd(bodySize),
         "navigationSymbol");
         var contentSize = {ctor: "_Tuple2"
                           ,_0: Basics.fst(bodySize)
                           ,_1: Basics.snd(bodySize) - Basics.snd(navSymbolSize) - Basics.snd(titleSize)};
         return {_: {}
                ,content: contentSize
                ,footline: footlineSize
                ,headline: headlineSize
                ,leftSidebar: leftSidebarSize
                ,navigationSymbol: navSymbolSize
                ,rightSidebar: rightSidebarSize
                ,slideTitle: titleSize};
      }();
   });
   var displayZoomed = function (context) {
      return function () {
         var closeSign = A3(Graphics.Element.fittedImage,
         30,
         30,
         "Symbols/Close.gif");
         var onCloseMode = function () {
            var _v8 = context.mode;
            switch (_v8.ctor)
            {case "InZoomMode":
               return Types.Context.BeginZoomMode;
               case "SupportBinZoomMode":
               return Types.Context.BeginSupportBinMode;}
            _E.Case($moduleName,
            "between lines 110 and 113");
         }();
         var closeButton = A5(Graphics.Input.customButton,
         Builders.Context.modeClicks.handle,
         onCloseMode,
         closeSign,
         Graphics.Element.opacity(0.5)(closeSign),
         closeSign);
         var w = context.windowWidth;
         var base = Graphics.Element.color(Color.lightCharcoal)(A4(Graphics.Element.container,
         w,
         35,
         Graphics.Element.topRight,
         closeButton));
         var h = context.windowHeight;
         var elem = context.zoomElem;
         var scaleFactor = Basics.toFloat(w) / Basics.toFloat(Graphics.Element.widthOf(elem));
         var scaledElem = A3(Graphics.Collage.collage,
         w,
         Basics.truncate(scaleFactor * Basics.toFloat(Graphics.Element.heightOf(elem))),
         _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))]));
         var positionedElem = A4(Graphics.Element.container,
         w,
         h - 35,
         Graphics.Element.midTop,
         scaledElem);
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([base
                      ,scaledElem]));
      }();
   };
   var showPresentation = F2(function (presentation,
   context) {
      return function () {
         var quizList = presentation.quizes;
         var h = context.windowHeight;
         var w = context.windowWidth;
         var sectionList = A2(List.map,
         PreProcess.ThemeMaker.naiveToThemeSection,
         presentation.presInfo.sections);
         var naivePresInfo = presentation.presInfo;
         var presInfo = _U.remove("sections",
         naivePresInfo);
         var theme = PreProcess.ThemeMaker.toTheme(presentation.themeInfo);
         var geSize = A2(getComponentSize,
         theme.layout,
         theme.componentSize);
         var concreteSizeInfo = A3(getConcreteComponentSize,
         geSize,
         w,
         h);
         var contentSlideList = A3(PreProcess.ContentMaker.toContent,
         presentation.slides,
         theme,
         Basics.fst(concreteSizeInfo.content));
         var supportbinList = A3(PreProcess.ContentMaker.toSupportbinContent,
         presentation.supportbin,
         theme,
         Basics.fst(concreteSizeInfo.content));
         var slideTickList = A2(getTickList,
         theme,
         A2(List.map,
         function (_) {
            return _.route;
         },
         sectionList))(A2(List.zip,
         A2(List.map,
         function (_) {
            return _.partOf;
         },
         contentSlideList),
         A2(List.map,
         function (_) {
            return _.slideId;
         },
         contentSlideList)));
         var slideRouteAndIndex = A2(Utils.Displayer.getNthFromList,
         context.currentSlideIndex,
         slideTickList);
         var currentInfoForOuter = {_: {}
                                   ,currentSlideNumber: String.show(Basics.snd(slideRouteAndIndex))
                                   ,maxSlideNumber: String.show(List.length(contentSlideList))
                                   ,route: Basics.fst(slideRouteAndIndex)};
         var tickDict = A2(Utils.TickTracker.getSectionTick,
         A2(List.map,
         function (_) {
            return _.route;
         },
         sectionList),
         slideTickList);
         var displaySectionish = function (slideType) {
            return A8(Displayers.SectionishSlide.display,
            context,
            concreteSizeInfo,
            currentInfoForOuter,
            theme,
            presInfo,
            sectionList,
            tickDict,
            slideType);
         };
         return _U.eq(Basics.snd(slideRouteAndIndex),
         -20) ? displaySectionish("titleslide") : _U.eq(Basics.snd(slideRouteAndIndex),
         -10) ? displaySectionish("tocslide") : _U.eq(Basics.snd(slideRouteAndIndex),
         -1) ? displaySectionish("section") : _U.eq(Basics.snd(slideRouteAndIndex),
         -2) ? displaySectionish("subsection") : function () {
            var csId = Basics.snd(slideRouteAndIndex);
            var contentSlide = function () {
               var cs = A2(List.filter,
               function (x) {
                  return _U.eq(x.slideId,csId);
               },
               contentSlideList);
               return List.isEmpty(cs) ? List.head(contentSlideList) : List.head(cs);
            }();
            var supportbin = function () {
               var sb = A2(List.filter,
               function (x) {
                  return _U.eq(x.supportbinId,
                  contentSlide.supportbin);
               },
               supportbinList);
               return List.isEmpty(sb) ? {_: {}
                                         ,content: _L.fromArray([])
                                         ,supportbinId: ""} : List.head(sb);
            }();
            var quiz = function () {
               var ql = A2(List.filter,
               function (x) {
                  return _U.eq(x.id,
                  contentSlide.quiz);
               },
               quizList);
               return List.isEmpty(ql) ? {_: {}
                                         ,correctAns: _L.fromArray([])
                                         ,explanation: ""
                                         ,id: ""
                                         ,options: _L.fromArray([])
                                         ,qtype: ""
                                         ,question: ""} : List.head(ql);
            }();
            return function () {
               var _v9 = context.mode;
               switch (_v9.ctor)
               {case "BeginSupportBinMode":
                  return A3(Displayers.SupportbinSlide.display,
                    supportbin,
                    context,
                    concreteSizeInfo);
                  case "InZoomMode":
                  return displayZoomed(context);
                  case "QuizMode":
                  return A3(Displayers.QuizSlide.display,
                    quiz,
                    context,
                    concreteSizeInfo);
                  case "SupportBinZoomMode":
                  return displayZoomed(context);}
               return A8(Displayers.ContentSlide.display,
               contentSlide,
               context,
               concreteSizeInfo,
               currentInfoForOuter,
               theme,
               presInfo,
               sectionList,
               tickDict);
            }();
         }();
      }();
   });
   _elm.Displayers.Main.values = {_op: _op
                                 ,showPresentation: showPresentation
                                 ,displayZoomed: displayZoomed
                                 ,getConcreteComponentSize: getConcreteComponentSize
                                 ,getComponentSize: getComponentSize
                                 ,getTickList: getTickList};
   return _elm.Displayers.Main.values;
};Elm.Displayers = Elm.Displayers || {};
Elm.Displayers.SectionishSlide = Elm.Displayers.SectionishSlide || {};
Elm.Displayers.SectionishSlide.make = function (_elm) {
   "use strict";
   _elm.Displayers = _elm.Displayers || {};
   _elm.Displayers.SectionishSlide = _elm.Displayers.SectionishSlide || {};
   if (_elm.Displayers.SectionishSlide.values)
   return _elm.Displayers.SectionishSlide.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Displayers.SectionishSlide";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.ElementMaker = Elm.Builders.ElementMaker.make(_elm);
   var Builders = Builders || {};
   Builders.Outer = Elm.Builders.Outer.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Builder = Elm.Utils.Builder.make(_elm);
   var _op = {};
   var displayContent = F3(function (content,
   _v0,
   tick) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var scaleHeightwise = function (elem) {
                    return function () {
                       var scaleFactor = Basics.toFloat(_v0._1) / Basics.toFloat(Graphics.Element.heightOf(elem));
                       var newW = Basics.truncate(scaleFactor * Basics.toFloat(Graphics.Element.widthOf(elem)));
                       return A3(Graphics.Collage.collage,
                       newW,
                       _v0._1,
                       _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))]));
                    }();
                 };
                 var scaledColumn = function (col) {
                    return _U.cmp(Graphics.Element.heightOf(col),
                    _v0._1) > 0 ? scaleHeightwise(col) : col;
                 };
                 var isThere = function (anim) {
                    return A2(List.any,
                    function (x) {
                       return _U.eq(x,tick);
                    },
                    anim.tickLife) || _U.eq(anim.tickLife,
                    _L.fromArray([0]));
                 };
                 var toChangedElement = function (contentElem) {
                    return isThere(contentElem.animation) ? contentElem.element : Graphics.Element.empty;
                 };
                 var toColContentElem = function (colContent) {
                    return scaledColumn(Graphics.Element.flow(Graphics.Element.down)(A2(List.map,
                    toChangedElement,
                    colContent)));
                 };
                 var columnList = A2(List.map,
                 toColContentElem,
                 content);
                 var columns = A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 columnList);
                 return A4(Graphics.Element.container,
                 _v0._0,
                 _v0._1,
                 Graphics.Element.middle,
                 columns);
              }();}
         _E.Case($moduleName,
         "between lines 50 and 70");
      }();
   });
   var display = F8(function (context,
   concreteSizeInfo,
   currentInfoForOuter,
   theme,
   presInfo,
   sectionList,
   tickDict,
   slideType) {
      return function () {
         var slideBG = function () {
            switch (slideType)
            {case "titleslide":
               return theme.style.slideBackground.title;
               case "tocslide":
               return theme.style.slideBackground.title;}
            return theme.style.slideBackground.section;
         }();
         var h = context.windowHeight;
         var w = context.windowWidth;
         var content = function () {
            switch (slideType)
            {case "titleslide":
               return A3(Builders.Outer.buildTitleSlide,
                 theme,
                 {ctor: "_Tuple2",_0: w,_1: h},
                 presInfo);}
            return function () {
               var slideContent = A7(Builders.Outer.buildSectionishSlide,
               theme,
               {ctor: "_Tuple2",_0: w,_1: h},
               presInfo,
               sectionList,
               currentInfoForOuter.route,
               tickDict,
               slideType);
               return A3(displayContent,
               slideContent,
               concreteSizeInfo.content,
               context.currentTick);
            }();
         }();
         var getOuter = F2(function (str,
         size) {
            return A7(Builders.Outer.buildOuterComponent,
            theme,
            size,
            str,
            presInfo,
            sectionList,
            currentInfoForOuter,
            tickDict);
         });
         return A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.middle)(Graphics.Element.layers(_L.fromArray([A3(Builders.ElementMaker.drawFill,
                                                                       w,
                                                                       h,
                                                                       theme.style.slideBackground.section)
                                                                       ,A2(Graphics.Element.flow,
                                                                       Graphics.Element.down,
                                                                       _L.fromArray([content]))])));
      }();
   });
   _elm.Displayers.SectionishSlide.values = {_op: _op
                                            ,display: display
                                            ,displayContent: displayContent};
   return _elm.Displayers.SectionishSlide.values;
};Elm.Displayers = Elm.Displayers || {};
Elm.Displayers.ContentSlide = Elm.Displayers.ContentSlide || {};
Elm.Displayers.ContentSlide.make = function (_elm) {
   "use strict";
   _elm.Displayers = _elm.Displayers || {};
   _elm.Displayers.ContentSlide = _elm.Displayers.ContentSlide || {};
   if (_elm.Displayers.ContentSlide.values)
   return _elm.Displayers.ContentSlide.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Displayers.ContentSlide";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Builders = Builders || {};
   Builders.ElementMaker = Elm.Builders.ElementMaker.make(_elm);
   var Builders = Builders || {};
   Builders.Outer = Elm.Builders.Outer.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Builder = Elm.Utils.Builder.make(_elm);
   var _op = {};
   var displayContent = F4(function (content,
   _v0,
   tick,
   mode) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var scaleHeightwise = function (elem) {
                    return function () {
                       var scaleFactor = Basics.toFloat(_v0._1) / Basics.toFloat(Graphics.Element.heightOf(elem));
                       var newW = Basics.truncate(scaleFactor * Basics.toFloat(Graphics.Element.widthOf(elem)));
                       return A3(Graphics.Collage.collage,
                       newW,
                       _v0._1,
                       _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))]));
                    }();
                 };
                 var scaledColumn = function (col) {
                    return _U.cmp(Graphics.Element.heightOf(col),
                    _v0._1) > 0 ? scaleHeightwise(col) : col;
                 };
                 var toChangedElement = function (elem) {
                    return function () {
                       switch (mode.ctor)
                       {case "BeginZoomMode":
                          return A2(Graphics.Input.hoverable,
                            Builders.Context.zoomClicks.handle,
                            function (x) {
                               return x ? elem : Graphics.Element.empty;
                            })(A3(Graphics.Input.clickable,
                            Builders.Context.modeClicks.handle,
                            Types.Context.InZoomMode,
                            elem));}
                       return elem;
                    }();
                 };
                 var isThere = function (conElem) {
                    return _U.eq(conElem.animation.tickLife,
                    _L.fromArray([0])) || A2(List.any,
                    function (x) {
                       return _U.eq(x,tick);
                    },
                    conElem.animation.tickLife);
                 };
                 var toColContentElem = function (colContent) {
                    return function () {
                       var bodyElem = A2(List.filter,
                       isThere,
                       colContent.body);
                       return List.isEmpty(bodyElem) ? colContent.otherLife : toChangedElement(function (_) {
                          return _.element;
                       }(List.head(bodyElem)));
                    }();
                 };
                 var toColElem = function (col) {
                    return {ctor: "_Tuple2"
                           ,_0: Utils.Builder.getColumnPosition(col.colAlign)
                           ,_1: scaledColumn(Graphics.Element.flow(Graphics.Element.down)(A2(List.map,
                           toColContentElem,
                           col.content)))};
                 };
                 var columnList = A2(List.map,
                 toColElem,
                 content);
                 var alignedColumnList = A2(List.map,
                 function (_v5) {
                    return function () {
                       switch (_v5.ctor)
                       {case "_Tuple2":
                          return A4(Graphics.Element.container,
                            Graphics.Element.widthOf(_v5._1),
                            _v0._1,
                            _v5._0,
                            _v5._1);}
                       _E.Case($moduleName,
                       "on line 97, column 46 to 83");
                    }();
                 },
                 columnList);
                 var finalcontent = A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 alignedColumnList);
                 return A4(Graphics.Element.container,
                 _v0._0,
                 _v0._1,
                 Graphics.Element.middle,
                 finalcontent);
              }();}
         _E.Case($moduleName,
         "between lines 71 and 103");
      }();
   });
   var displayNormalSlide = F8(function (contentSlide,
   context,
   concreteSizeInfo,
   currentInfoForOuter,
   theme,
   presInfo,
   sectionList,
   tickDict) {
      return function () {
         var h = context.windowHeight;
         var w = context.windowWidth;
         var content = A4(displayContent,
         contentSlide.slideContent,
         concreteSizeInfo.content,
         context.currentTick,
         context.mode);
         var slideTitle = A4(Builders.Outer.buildTitle,
         theme,
         concreteSizeInfo.slideTitle,
         contentSlide.title,
         contentSlide.subtitle);
         var getOuter = F2(function (str,
         size) {
            return A7(Builders.Outer.buildOuterComponent,
            theme,
            size,
            str,
            presInfo,
            sectionList,
            currentInfoForOuter,
            tickDict);
         });
         var headline = A2(getOuter,
         "headline",
         concreteSizeInfo.headline);
         var footline = A2(getOuter,
         "footline",
         concreteSizeInfo.footline);
         var leftSidebar = A2(getOuter,
         "leftsidebar",
         concreteSizeInfo.leftSidebar);
         var rightSidebar = A2(getOuter,
         "rightsidebar",
         concreteSizeInfo.rightSidebar);
         var modechangesymbols = A2(getOuter,
         "modechangesymbols",
         concreteSizeInfo.navigationSymbol);
         var navigationalsymbols = A2(getOuter,
         "navigationalsymbols",
         concreteSizeInfo.navigationSymbol);
         var symbols = A4(Graphics.Element.container,
         Basics.fst(concreteSizeInfo.content),
         Basics.snd(concreteSizeInfo.navigationSymbol),
         Graphics.Element.midRight,
         A2(Graphics.Element.flow,
         Graphics.Element.right,
         _L.fromArray([modechangesymbols
                      ,navigationalsymbols])));
         var $final = Graphics.Element.layers(_L.fromArray([A3(Builders.ElementMaker.drawFill,
                                                           w,
                                                           h,
                                                           theme.style.slideBackground.normal)
                                                           ,A2(Graphics.Element.flow,
                                                           Graphics.Element.down,
                                                           _L.fromArray([headline
                                                                        ,A2(Graphics.Element.flow,
                                                                        Graphics.Element.right,
                                                                        _L.fromArray([leftSidebar
                                                                                     ,A2(Graphics.Element.flow,
                                                                                     Graphics.Element.down,
                                                                                     _L.fromArray([slideTitle
                                                                                                  ,content]))
                                                                                     ,rightSidebar]))
                                                                        ,symbols
                                                                        ,footline]))]));
         return function () {
            var _v9 = context.mode;
            switch (_v9.ctor)
            {case "BeginZoomMode":
               return function () {
                    var closeSign = A3(Graphics.Element.fittedImage,
                    30,
                    30,
                    "Symbols/Close.gif");
                    var closeButton = A5(Graphics.Input.customButton,
                    Builders.Context.modeClicks.handle,
                    Types.Context.NormalMode,
                    closeSign,
                    Graphics.Element.opacity(0.5)(closeSign),
                    closeSign);
                    var base = A4(Graphics.Element.container,
                    w,
                    h,
                    Graphics.Element.topRight,
                    closeButton);
                    return Graphics.Element.layers(_L.fromArray([A2(Graphics.Element.opacity,
                                                                0.5,
                                                                $final)
                                                                ,base]));
                 }();}
            return $final;
         }();
      }();
   });
   var display = F8(function (contentSlide,
   context,
   concreteSizeInfo,
   currentInfoForOuter,
   theme,
   presInfo,
   sectionList,
   tickDict) {
      return function () {
         var _v10 = contentSlide.slideType;
         switch (_v10.ctor)
         {case "NormalSlide":
            return A8(displayNormalSlide,
              contentSlide,
              context,
              concreteSizeInfo,
              currentInfoForOuter,
              theme,
              presInfo,
              sectionList,
              tickDict);
            case "PlainSlide":
            return A4(displayContent,
              contentSlide.slideContent,
              {ctor: "_Tuple2"
              ,_0: context.windowWidth
              ,_1: context.windowHeight},
              context.currentTick,
              context.mode);}
         _E.Case($moduleName,
         "between lines 19 and 23");
      }();
   });
   _elm.Displayers.ContentSlide.values = {_op: _op
                                         ,display: display
                                         ,displayNormalSlide: displayNormalSlide
                                         ,displayContent: displayContent};
   return _elm.Displayers.ContentSlide.values;
};Elm.Builders = Elm.Builders || {};
Elm.Builders.Outer = Elm.Builders.Outer || {};
Elm.Builders.Outer.make = function (_elm) {
   "use strict";
   _elm.Builders = _elm.Builders || {};
   _elm.Builders.Outer = _elm.Builders.Outer || {};
   if (_elm.Builders.Outer.values)
   return _elm.Builders.Outer.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Builders.Outer";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Builders = Builders || {};
   Builders.ElementMaker = Elm.Builders.ElementMaker.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Builder = Elm.Utils.Builder.make(_elm);
   var Utils = Utils || {};
   Utils.Content = Elm.Utils.Content.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var _op = {};
   var getCompleteComponent = F3(function (layoutDetails,
   _v0,
   toIntermediateElement) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var columnAlignList = List.map(Utils.Builder.getColumnPosition)(A2(List.map,
                 function (_) {
                    return _.colAlign;
                 },
                 layoutDetails.columns));
                 var intermedateList = A2(List.map,
                 function (x) {
                    return {ctor: "_Tuple2"
                           ,_0: x.column
                           ,_1: toIntermediateElement(x)};
                 },
                 layoutDetails.inserts);
                 var columnElementList = A2(Utils.Builder.partitionColWise,
                 List.length(layoutDetails.columns),
                 intermedateList);
                 var maxColHeight = List.maximum(A2(List.map,
                 Graphics.Element.heightOf,
                 columnElementList));
                 var scaleCol = function (col) {
                    return function () {
                       var scaleFactor = Basics.toFloat(maxColHeight) / Basics.toFloat(Graphics.Element.heightOf(col));
                       var newW = Basics.truncate(Basics.toFloat(Graphics.Element.widthOf(col)) * scaleFactor);
                       return A3(Graphics.Collage.collage,
                       newW,
                       maxColHeight,
                       _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(col))]));
                    }();
                 };
                 var columnList = List.map(function (_v4) {
                    return function () {
                       switch (_v4.ctor)
                       {case "_Tuple2":
                          return A4(Graphics.Element.container,
                            Graphics.Element.widthOf(_v4._1),
                            maxColHeight,
                            _v4._0,
                            _v4._1);}
                       _E.Case($moduleName,
                       "on line 620, column 43 to 91");
                    }();
                 })(A2(List.zip,
                 columnAlignList,
                 A2(List.map,
                 scaleCol,
                 columnElementList)));
                 var component = A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 columnElementList);
                 var scaledComponenet = Graphics.Collage.scale(Basics.toFloat(_v0._0) / Basics.toFloat(Graphics.Element.widthOf(component)))(Graphics.Collage.toForm(component));
                 return A3(Graphics.Element.container,
                 _v0._0,
                 _v0._1,
                 Graphics.Element.middle)(A3(Graphics.Collage.collage,
                 _v0._0,
                 _v0._1,
                 _L.fromArray([scaledComponenet])));
              }();}
         _E.Case($moduleName,
         "between lines 608 and 628");
      }();
   });
   var getElementText = F2(function (elementType,
   presInfo) {
      return function () {
         switch (elementType)
         {case "author":
            return A2(List.join,
              " , ",
              presInfo.authors);
            case "date":
            return presInfo.date;
            case "institute":
            return A2(List.join,
              " , ",
              presInfo.institute);
            case "subtitle":
            return presInfo.presSubTitle;
            case "title":
            return presInfo.presTitle;}
         _E.Case($moduleName,
         "between lines 599 and 604");
      }();
   });
   var getLayout = F2(function (componentType,
   layoutInfo) {
      return function () {
         switch (componentType)
         {case "footline":
            return layoutInfo.footline;
            case "headline":
            return layoutInfo.headline;
            case "leftsidebar":
            return layoutInfo.leftSidebar;
            case "modechangesymbols":
            return layoutInfo.modechangeSymbols;
            case "navigationalsymbols":
            return layoutInfo.navigationalSymbols;
            case "rightsidebar":
            return layoutInfo.rightSidebar;}
         _E.Case($moduleName,
         "between lines 588 and 594");
      }();
   });
   var getImageName = function (picType) {
      return function () {
         var name = function (str) {
            return _L.append("Symbols/",
            _L.append(str,".gif"));
         };
         return function () {
            switch (picType)
            {case "next":
               return name("Next");
               case "pvs":
               return name("Previous");
               case "quiz":
               return name("Quiz");
               case "scribble":
               return name("Scribble");
               case "section":
               return name("Section");
               case "slide":
               return name("Slide");
               case "subsection":
               return name("Subsection");
               case "support":
               return name("Supportbin");
               case "tick":
               return name("Tick");
               case "zoom":
               return name("Zoom");}
            _E.Case($moduleName,
            "between lines 406 and 416");
         }();
      }();
   };
   var buildSingleSymbol = F5(function (h,
   sectionList,
   currentRoute,
   tickDict,
   symbolType) {
      return function () {
         var getTick = A3(Utils.Builder.getNextOrPvsTick,
         tickDict,
         currentRoute,
         sectionList);
         var drawButton = F3(function (handle,
         val,
         img) {
            return A5(Graphics.Input.customButton,
            handle,
            val,
            img,
            A2(Graphics.Element.opacity,
            0.5,
            img),
            img);
         });
         var draw = function (img) {
            return A3(Graphics.Element.fittedImage,
            h,
            h,
            getImageName(img));
         };
         var drawSymbol = function (sym) {
            return function () {
               switch (sym)
               {case "quiz":
                  return A2(drawButton,
                    Builders.Context.modeClicks.handle,
                    Types.Context.QuizMode)(draw("quiz"));
                  case "scribble":
                  return A2(drawButton,
                    Builders.Context.modeClicks.handle,
                    Types.Context.ScribbleMode)(draw("scribble"));
                  case "section":
                  return List.isEmpty(sectionList) || _U.cmp(List.length(currentRoute),
                    1) < 0 ? Graphics.Element.flow(Graphics.Element.right)(A2(List.map,
                    draw,
                    _L.fromArray(["pvs"
                                 ,"section"
                                 ,"next"]))) : A2(Graphics.Element.flow,
                    Graphics.Element.right,
                    _L.fromArray([A2(Graphics.Input.clickable,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Asyn(A2(getTick,
                                 1,
                                 -1)))(draw("pvs"))
                                 ,draw("section")
                                 ,A2(Graphics.Input.clickable,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Asyn(A2(getTick,
                                 1,
                                 1)))(draw("next"))]));
                  case "slide":
                  return A2(Graphics.Element.flow,
                    Graphics.Element.right,
                    _L.fromArray([A2(drawButton,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Dec)(draw("pvs"))
                                 ,draw("slide")
                                 ,A2(drawButton,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Inc)(draw("next"))]));
                  case "subsection":
                  return List.isEmpty(sectionList) || _U.cmp(List.length(currentRoute),
                    2) < 0 ? Graphics.Element.flow(Graphics.Element.right)(A2(List.map,
                    draw,
                    _L.fromArray(["pvs"
                                 ,"subsection"
                                 ,"next"]))) : A2(Graphics.Element.flow,
                    Graphics.Element.right,
                    _L.fromArray([A2(Graphics.Input.clickable,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Asyn(A2(getTick,
                                 2,
                                 -1)))(draw("pvs"))
                                 ,draw("subsection")
                                 ,A2(Graphics.Input.clickable,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.Asyn(A2(getTick,
                                 2,
                                 1)))(draw("next"))]));
                  case "supportbin":
                  return A2(drawButton,
                    Builders.Context.modeClicks.handle,
                    Types.Context.BeginSupportBinMode)(draw("support"));
                  case "tick":
                  return A2(Graphics.Element.flow,
                    Graphics.Element.right,
                    _L.fromArray([A2(drawButton,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.DecTick)(draw("pvs"))
                                 ,draw("tick")
                                 ,A2(drawButton,
                                 Builders.Context.asynClicks.handle,
                                 Types.Context.IncTick)(draw("next"))]));
                  case "zoom":
                  return A2(drawButton,
                    Builders.Context.modeClicks.handle,
                    Types.Context.BeginZoomMode)(draw("zoom"));}
               _E.Case($moduleName,
               "between lines 344 and 392");
            }();
         };
         var makeSymbol = function (sym) {
            return A4(Graphics.Element.container,
            3 * h + 2,
            h + 1,
            Graphics.Element.middle,
            drawSymbol(sym));
         };
         return function () {
            switch (symbolType)
            {case "backforward":
               return makeSymbol("tick");
               case "sectionnavigation":
               return makeSymbol("section");
               case "slidenavigation":
               return makeSymbol("slide");
               case "subsectionnavigation":
               return makeSymbol("subsection");}
            return makeSymbol(symbolType);
         }();
      }();
   });
   var buildSymbolPanel = F7(function (layoutDetails,
   theme,
   h,
   panelType,
   sectionList,
   currentRoute,
   tickDict) {
      return function () {
         var panel = Graphics.Element.flow(Graphics.Element.right)(List.map(A4(buildSingleSymbol,
         h,
         sectionList,
         currentRoute,
         tickDict))(A2(List.map,
         function (_) {
            return _.id;
         },
         layoutDetails.inserts)));
         var symbolStyle = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: panelType
         ,_1: "none"},
         theme.style);
         return Graphics.Element.opacity(symbolStyle.symbolAlpha)(A3(Builders.ElementMaker.buildCompleteElement,
         Graphics.Element.sizeOf(panel),
         symbolStyle.general,
         panel));
      }();
   });
   var buildComponentTextElement = F6(function (elementType,
   containerType,
   elementText,
   styleInfo,
   w,
   placement) {
      return function () {
         var slateContainer = function () {
            switch (containerType)
            {case "leftsidebar":
               return "sidebar";
               case "rightsidebar":
               return "sidebar";}
            return containerType;
         }();
         var bodyStyling = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: elementType
         ,_1: slateContainer},
         styleInfo);
         var bodyText = A2(Builders.ElementMaker.buildText,
         bodyStyling,
         elementText);
         var h = Graphics.Element.heightOf(bodyText);
         var body = A4(Graphics.Element.container,
         w,
         h,
         placement,
         bodyText);
         return A3(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2",_0: w,_1: h},
         bodyStyling,
         body);
      }();
   });
   var buildTitle = F4(function (theme,
   _v14,
   titleStr,
   subtitleStr) {
      return function () {
         switch (_v14.ctor)
         {case "_Tuple2":
            return function () {
                 var subtitle = A6(buildComponentTextElement,
                 "slidesubtitle",
                 "none",
                 subtitleStr,
                 theme.style,
                 _v14._0,
                 Graphics.Element.middle);
                 var title = A6(buildComponentTextElement,
                 "slidetitle",
                 "none",
                 titleStr,
                 theme.style,
                 _v14._0,
                 Graphics.Element.middle);
                 return Graphics.Element.height(_v14._1)(A2(Graphics.Element.flow,
                 Graphics.Element.down,
                 _L.fromArray([title
                              ,subtitle])));
              }();}
         _E.Case($moduleName,
         "between lines 425 and 431");
      }();
   });
   var buildToc = F6(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tocOptions) {
      return function () {
         var marker = function (markerStyling) {
            return A3(Builders.ElementMaker.buildSymbol,
            markerStyling,
            theme.symbolSize.sectionProjection,
            Maybe.Nothing);
         };
         var offset = Basics.truncate(theme.symbolSize.sectionProjection.offset * Basics.toFloat(w));
         var shadedSubsectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "shadedsubsectionprojection"
         ,_1: "toc"},
         theme.style);
         var subsectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "subsectionprojection"
         ,_1: "toc"},
         theme.style);
         var shadedSectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "shadedsectionprojection"
         ,_1: "toc"},
         theme.style);
         var sectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "sectionprojection"
         ,_1: "toc"},
         theme.style);
         var makeMarker = function (markerType) {
            return function () {
               switch (markerType)
               {case "section":
                  return marker(sectionProjection);
                  case "shadedsection":
                  return marker(shadedSectionProjection);
                  case "shadedsubsection":
                  return marker(shadedSubsectionProjection);
                  case "subsection":
                  return marker(subsectionProjection);}
               _E.Case($moduleName,
               "between lines 531 and 536");
            }();
         };
         var makeHead = F3(function (elem,
         txt,
         level) {
            return function () {
               var sectionName = A6(buildComponentTextElement,
               elem,
               "toc",
               txt,
               theme.style,
               w,
               Graphics.Element.midLeft);
               return A5(Builders.ElementMaker.buildTabbedElement,
               {ctor: "_Tuple2"
               ,_0: w
               ,_1: Graphics.Element.heightOf(sectionName)},
               level,
               offset,
               makeMarker(elem),
               sectionName);
            }();
         });
         var makeTocHead = F3(function (tocStyle,
         txt,
         level) {
            return function () {
               var _v19 = {ctor: "_Tuple2"
                          ,_0: tocStyle
                          ,_1: level};
               switch (_v19.ctor)
               {case "_Tuple2":
                  switch (_v19._0.ctor)
                    {case "Shade": switch (_v19._1)
                         {case 1: return A3(makeHead,
                              "shadedsection",
                              txt,
                              1);
                            case 2: return A3(makeHead,
                              "shadedsubsection",
                              txt,
                              2);}
                         break;
                       case "Show": switch (_v19._1)
                         {case 1: return A3(makeHead,
                              "section",
                              txt,
                              1);
                            case 2: return A3(makeHead,
                              "subsection",
                              txt,
                              2);}
                         break;}
                    break;}
               return Graphics.Element.empty;
            }();
         });
         var makeSection = function (section) {
            return A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) || List.isEmpty(currentRoute) ? A3(makeTocHead,
            tocOptions.currentSection,
            section.shortName,
            1) : A3(makeTocHead,
            tocOptions.otherSection,
            section.shortName,
            1);
         };
         var makeSubsection = function (section) {
            return A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) || List.isEmpty(currentRoute) ? A2(Utils.Builder.isCurrentSubsection,
            currentRoute,
            section) || List.isEmpty(currentRoute) ? A3(makeTocHead,
            tocOptions.currentSubsectionOfCurrentSection,
            section.shortName,
            2) : A3(makeTocHead,
            tocOptions.otherSubsectionOfCurrentSection,
            section.shortName,
            2) : A3(makeTocHead,
            tocOptions.subsectionOfOtherSection,
            section.shortName,
            2);
         };
         var tocCollection = Utils.Builder.levelwiseRouteMap(_L.fromArray([makeSection
                                                                          ,makeSubsection]))(Utils.Builder.filterOutSectionAndSubsection(sectionList));
         var tickList = tocOptions.pauseSections ? tocOptions.pauseSubsections ? _L.range(1,
         List.length(tocCollection)) : function () {
            var sectionwise = Utils.Builder.partitionInSection(tocCollection);
            var repeatTimes = A2(List.map,
            List.length,
            sectionwise);
            var tickValue = _L.range(1,
            List.length(sectionwise));
            return List.concatMap(function (_v22) {
               return function () {
                  switch (_v22.ctor)
                  {case "_Tuple2":
                     return A2(List.repeat,
                       _v22._1,
                       _v22._0);}
                  _E.Case($moduleName,
                  "on line 569, column 55 to 65");
               }();
            })(A2(List.zip,
            tickValue,
            repeatTimes));
         }() : A2(List.repeat,
         List.length(tocCollection),
         1);
         var maxTick = List.maximum(tickList);
         var getTickLife = function (start) {
            return _L.range(start,
            maxTick);
         };
         return List.map(function (_v26) {
            return function () {
               switch (_v26.ctor)
               {case "_Tuple2": return {_: {}
                                       ,animation: {_: {}
                                                   ,tickLife: getTickLife(_v26._0)}
                                       ,element: _v26._1};}
               _E.Case($moduleName,
               "between lines 576 and 578");
            }();
         })(A2(List.zip,
         tickList,
         A2(List.map,
         Basics.snd,
         tocCollection)));
      }();
   });
   var buildImage = F4(function (imageType,
   imgFile,
   w,
   theme) {
      return function () {
         switch (imgFile)
         {case "":
            return Graphics.Element.empty;}
         return function () {
            var img = A3(Graphics.Element.fittedImage,
            w,
            w,
            imgFile);
            var style = A2(Utils.Content.getStyling,
            {ctor: "_Tuple2"
            ,_0: imageType
            ,_1: "none"},
            theme.style);
            return A3(Builders.ElementMaker.buildCompleteElement,
            {ctor: "_Tuple2",_0: w,_1: w},
            style,
            img);
         }();
      }();
   });
   var buildTitleSlide = F3(function (theme,
   _v31,
   presInfo) {
      return function () {
         switch (_v31.ctor)
         {case "_Tuple2":
            return function () {
                 var layoutDetails = function () {
                    var _v35 = theme.layout.titleSlide;
                    switch (_v35.ctor)
                    {case "Layout": return _v35._0;}
                    _E.Case($moduleName,
                    "between lines 441 and 443");
                 }();
                 var cols = layoutDetails.columns;
                 var getCol = function (id) {
                    return List.head(A2(List.filter,
                    function (x) {
                       return _U.eq(x.id,id);
                    },
                    cols));
                 };
                 var getColWidth = function (id) {
                    return function (_) {
                       return _.width;
                    }(getCol(id));
                 };
                 var toIntermediateElement = function (ins) {
                    return function () {
                       var placement = Graphics.Element.middle;
                       var width = Basics.truncate(getColWidth(ins.column) * Basics.toFloat(_v31._0));
                       return function () {
                          var _v37 = ins.id;
                          switch (_v37)
                          {case "image":
                             return A4(buildImage,
                               "titlegraphic",
                               presInfo.titleGraphic,
                               width,
                               theme);}
                          return A6(buildComponentTextElement,
                          ins.id,
                          "none",
                          A2(getElementText,
                          ins.id,
                          presInfo),
                          theme.style,
                          width,
                          placement);
                       }();
                    }();
                 };
                 var getColPlacement = function (id) {
                    return function (_) {
                       return _.placement;
                    }(getCol(id));
                 };
                 return A3(getCompleteComponent,
                 layoutDetails,
                 {ctor: "_Tuple2"
                 ,_0: _v31._0
                 ,_1: _v31._1},
                 toIntermediateElement);
              }();}
         _E.Case($moduleName,
         "between lines 441 and 461");
      }();
   });
   var buildTreeSubsection = F8(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType,
   sectionType) {
      return function () {
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var getSectionish = function () {
            switch (sectionType)
            {case "section":
               return Utils.Builder.getCurrentSection;
               case "subsection":
               return Utils.Builder.getCurrentSubsection;}
            _E.Case($moduleName,
            "between lines 274 and 277");
         }();
         var sectionish = A2(getSectionish,
         currentRoute,
         sectionList);
         var treeSymbolWidth = function () {
            switch (sectionType)
            {case "section": return 15;
               case "subsection": return 30;}
            _E.Case($moduleName,
            "between lines 271 and 274");
         }();
         var makeHead = function (txt) {
            return A6(buildComponentTextElement,
            sectionType,
            containerType,
            txt,
            theme.style,
            w - treeSymbolWidth,
            placement);
         };
         var sectionHead = function () {
            switch (sectionish.ctor)
            {case "Just":
               return clickable(sectionish._0.route)(makeHead(sectionish._0.shortName));
               case "Nothing":
               return makeHead(" ");}
            _E.Case($moduleName,
            "between lines 281 and 284");
         }();
         var treeSymbolHeight = Basics.truncate(Basics.toFloat(Graphics.Element.heightOf(sectionHead)) / 2);
         var elemContainer = function () {
            switch (containerType)
            {case "leftsidebar":
               return "sidebar";
               case "rightsidebar":
               return "sidebar";}
            return containerType;
         }();
         var style = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: sectionType
         ,_1: elemContainer},
         theme.style);
         var treeSymbolColor = function (_) {
            return _.color;
         }(function (_) {
            return _.style;
         }(function (_) {
            return _.text;
         }(style)));
         var treeSymbolVerticalBar = Graphics.Element.color(treeSymbolColor)(A2(Graphics.Element.spacer,
         2,
         treeSymbolHeight));
         var treeSymbolHorizontalBar = Graphics.Element.color(treeSymbolColor)(A2(Graphics.Element.spacer,
         10,
         2));
         var treeSymbol = A3(Graphics.Element.container,
         treeSymbolWidth,
         Graphics.Element.heightOf(sectionHead),
         Graphics.Element.midTop)(A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([treeSymbolVerticalBar
                      ,treeSymbolHorizontalBar])));
         var completeElem = A2(Graphics.Element.flow,
         Graphics.Element.right,
         _L.fromArray([treeSymbol
                      ,sectionHead]));
         return A3(Builders.ElementMaker.buildCompleteElement,
         Graphics.Element.sizeOf(completeElem),
         style,
         completeElem);
      }();
   });
   var buildSectionType = F8(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType,
   sectionType) {
      return function () {
         var getSectionish = function () {
            switch (sectionType)
            {case "section":
               return Utils.Builder.getCurrentSection;
               case "subsection":
               return Utils.Builder.getCurrentSubsection;
               case "subsubsection":
               return Utils.Builder.getCurrentSubsubsection;}
            _E.Case($moduleName,
            "between lines 253 and 257");
         }();
         var sectionish = A2(getSectionish,
         currentRoute,
         sectionList);
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var makeHead = function (txt) {
            return A6(buildComponentTextElement,
            sectionType,
            containerType,
            txt,
            theme.style,
            w,
            placement);
         };
         return function () {
            switch (sectionish.ctor)
            {case "Just":
               return clickable(sectionish._0.route)(makeHead(sectionish._0.shortName));
               case "Nothing":
               return makeHead(" ");}
            _E.Case($moduleName,
            "between lines 259 and 261");
         }();
      }();
   });
   var buildSectionishSlide = F7(function (theme,
   _v46,
   presInfo,
   sectionList,
   currentRoute,
   tickDict,
   sectionishType) {
      return function () {
         switch (_v46.ctor)
         {case "_Tuple2":
            return function () {
                 var sectionLayout = function () {
                    switch (sectionishType)
                    {case "section":
                       return theme.layout.atBeginSectionSlide;
                       case "subsection":
                       return theme.layout.atBeginSubsectionSlide;
                       case "tocslide":
                       return theme.layout.tocSlide;}
                    _E.Case($moduleName,
                    "between lines 468 and 472");
                 }();
                 var layoutDetails = function () {
                    var _v51 = Basics.fst(sectionLayout);
                    switch (_v51.ctor)
                    {case "Layout": return _v51._0;}
                    _E.Case($moduleName,
                    "between lines 472 and 474");
                 }();
                 var cols = layoutDetails.columns;
                 var getCol = function (id) {
                    return List.head(A2(List.filter,
                    function (x) {
                       return _U.eq(x.id,id);
                    },
                    cols));
                 };
                 var getColWidth = function (id) {
                    return function (_) {
                       return _.width;
                    }(getCol(id));
                 };
                 var getColPlacement = function (id) {
                    return function (_) {
                       return _.placement;
                    }(getCol(id));
                 };
                 var tocOptions = Basics.snd(sectionLayout);
                 var toIntermediateElement = function (ins) {
                    return function () {
                       var toColAndContentElement = function (elem) {
                          return {ctor: "_Tuple2"
                                 ,_0: ins.column
                                 ,_1: _L.fromArray([{_: {}
                                                    ,animation: {_: {}
                                                                ,tickLife: _L.fromArray([0])}
                                                    ,element: elem}])};
                       };
                       var placement = getColPlacement(ins.column);
                       var width = Basics.truncate(getColWidth(ins.column) * Basics.toFloat(_v46._0));
                       var sectionType = A7(buildSectionType,
                       theme,
                       width,
                       placement,
                       sectionList,
                       currentRoute,
                       tickDict,
                       "none");
                       return function () {
                          var _v53 = ins.id;
                          switch (_v53)
                          {case "image":
                             return function () {
                                  switch (sectionishType)
                                  {case "section":
                                     return toColAndContentElement(A4(buildImage,
                                       "section",
                                       presInfo.sectionGraphic,
                                       width,
                                       theme));
                                     case "subsection":
                                     return toColAndContentElement(A4(buildImage,
                                       "subsection",
                                       presInfo.subsectionGraphic,
                                       width,
                                       theme));}
                                  _E.Case($moduleName,
                                  "between lines 496 and 499");
                               }();
                             case "logo":
                             return toColAndContentElement(A4(buildImage,
                               "logo",
                               presInfo.logo,
                               width,
                               theme));
                             case "section":
                             return toColAndContentElement(sectionType("section"));
                             case "subsection":
                             return toColAndContentElement(sectionType("subsection"));
                             case "toc": return function () {
                                  var t = A6(buildToc,
                                  theme,
                                  width,
                                  placement,
                                  sectionList,
                                  currentRoute,
                                  tocOptions);
                                  return function () {
                                     switch (sectionishType)
                                     {case "tocslide":
                                        return {ctor: "_Tuple2"
                                               ,_0: ins.column
                                               ,_1: {ctor: "::"
                                                    ,_0: {_: {}
                                                         ,animation: {_: {}
                                                                     ,tickLife: _L.fromArray([0])}
                                                         ,element: Graphics.Element.color(Color.grey)(A3(Graphics.Element.container,
                                                         _v46._0,
                                                         40,
                                                         Graphics.Element.middle)(Text.centered(Text.color(Color.red)(Text.height(34)(Text.bold(Text.toText("Table of Contents")))))))}
                                                    ,_1: t}};}
                                     return {ctor: "_Tuple2"
                                            ,_0: ins.column
                                            ,_1: t};
                                  }();
                               }();}
                          _E.Case($moduleName,
                          "between lines 495 and 517");
                       }();
                    }();
                 };
                 return A2(Utils.Builder.partitionColWiseContentElement,
                 List.length(cols),
                 A2(List.map,
                 toIntermediateElement,
                 layoutDetails.inserts));
              }();}
         _E.Case($moduleName,
         "between lines 468 and 518");
      }();
   });
   var buildSidebarToc = F7(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType) {
      return function () {
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var marker = function (markerStyling) {
            return A3(Builders.ElementMaker.buildSymbol,
            markerStyling,
            theme.symbolSize.sectionProjection,
            Maybe.Nothing);
         };
         var offset = Basics.truncate(theme.symbolSize.sectionProjection.offset * Basics.toFloat(w));
         var shadedSubsectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "shadedsubsectionprojection"
         ,_1: "none"},
         theme.style);
         var subsectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "subsectionprojection"
         ,_1: "none"},
         theme.style);
         var shadedSectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "shadedsectionprojection"
         ,_1: "none"},
         theme.style);
         var sectionProjection = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "sectionprojection"
         ,_1: "none"},
         theme.style);
         var makeMarker = function (markerType) {
            return function () {
               switch (markerType)
               {case "section":
                  return marker(sectionProjection);
                  case "shadedsection":
                  return marker(shadedSectionProjection);
                  case "shadedsubsection":
                  return marker(shadedSubsectionProjection);
                  case "subsection":
                  return marker(subsectionProjection);}
               _E.Case($moduleName,
               "between lines 220 and 225");
            }();
         };
         var makeHead = F3(function (elem,
         txt,
         level) {
            return function () {
               var sectionName = A6(buildComponentTextElement,
               elem,
               containerType,
               txt,
               theme.style,
               w,
               Graphics.Element.midLeft);
               return A5(Builders.ElementMaker.buildTabbedElement,
               {ctor: "_Tuple2"
               ,_0: w
               ,_1: Graphics.Element.heightOf(sectionName)},
               level,
               offset,
               makeMarker(elem),
               sectionName);
            }();
         });
         var makeSection = function (section) {
            return clickable(section.route)(A3(makeHead,
            "shadedsection",
            section.shortName,
            1));
         };
         var makeSubsection = function (section) {
            return clickable(section.route)(A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) && A2(Utils.Builder.isCurrentSubsection,
            currentRoute,
            section) ? A3(makeHead,
            "subsection",
            section.shortName,
            2) : A3(makeHead,
            "shadedsubsection",
            section.shortName,
            2));
         };
         var tocCollection = Utils.Builder.toElementMap(_L.fromArray([makeSection
                                                                     ,makeSubsection]))(Utils.Builder.filterOutSectionAndSubsection(sectionList));
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         tocCollection);
      }();
   });
   var buildSubsectionNavigation = F8(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType,
   direction) {
      return function () {
         var subsectionOfCurrentSection = A2(Utils.Builder.filterOutSubsectionOfCurrentSection,
         List.head(currentRoute),
         sectionList);
         var dummyMakeSection = function (section) {
            return Graphics.Element.empty;
         };
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var numCols = A2(Utils.Builder.getNumberOfSubsections,
         List.head(currentRoute),
         sectionList);
         var width = function () {
            switch (direction.ctor)
            {case "Horizontal":
               return Basics.truncate(Basics.toFloat(w) / Basics.toFloat(numCols));
               case "Vertical": return w;}
            _E.Case($moduleName,
            "between lines 190 and 193");
         }();
         var makeHead = F2(function (elem,
         txt) {
            return A6(buildComponentTextElement,
            elem,
            containerType,
            txt,
            theme.style,
            width,
            placement);
         });
         var makeSubsection = function (section) {
            return clickable(section.route)(A2(Utils.Builder.isCurrentSubsection,
            currentRoute,
            section) ? A2(makeHead,
            "subsection",
            section.shortName) : A2(makeHead,
            "shadedsubsection",
            section.shortName));
         };
         var subsectionCollection = List.isEmpty(subsectionOfCurrentSection) ? _L.fromArray([A2(makeHead,
         "subsection",
         " ")]) : A2(Utils.Builder.toElementMap,
         _L.fromArray([dummyMakeSection
                      ,makeSubsection]),
         sectionList);
         return function () {
            switch (direction.ctor)
            {case "Horizontal":
               return A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 subsectionCollection);
               case "Vertical":
               return A2(Graphics.Element.flow,
                 Graphics.Element.down,
                 subsectionCollection);}
            _E.Case($moduleName,
            "between lines 205 and 208");
         }();
      }();
   });
   var buildSectionNavigation = F8(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType,
   direction) {
      return function () {
         var sections = Utils.Builder.filterOutSection(sectionList);
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var numCols = Utils.Builder.getNumberOfSections(sectionList);
         var width = function () {
            switch (direction.ctor)
            {case "Horizontal":
               return Basics.truncate(Basics.toFloat(w) / Basics.toFloat(numCols));
               case "Vertical": return w;}
            _E.Case($moduleName,
            "between lines 167 and 170");
         }();
         var makeHead = F2(function (elem,
         txt) {
            return A6(buildComponentTextElement,
            elem,
            containerType,
            txt,
            theme.style,
            width,
            placement);
         });
         var makeSection = function (section) {
            return clickable(section.route)(A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) ? A2(makeHead,
            "section",
            section.shortName) : A2(makeHead,
            "shadedsection",
            section.shortName));
         };
         var sectionCollection = List.isEmpty(sections) ? _L.fromArray([A2(makeHead,
         "section",
         " ")]) : A2(Utils.Builder.toElementMap,
         _L.fromArray([makeSection]),
         sectionList);
         return function () {
            switch (direction.ctor)
            {case "Horizontal":
               return A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 sectionCollection);
               case "Vertical":
               return A2(Graphics.Element.flow,
                 Graphics.Element.down,
                 sectionCollection);}
            _E.Case($moduleName,
            "between lines 181 and 183");
         }();
      }();
   });
   var buildMiniframes = F8(function (theme,
   w,
   placement,
   sectionList,
   currentRoute,
   tickDict,
   containerType,
   direction) {
      return function () {
         var makeSubsection = function (section) {
            return Graphics.Element.empty;
         };
         var makeMiniframe = function (styling) {
            return A3(Builders.ElementMaker.buildSymbol,
            styling,
            theme.symbolSize.miniframe,
            Maybe.Nothing);
         };
         var clickable = F2(function (sec,
         elem) {
            return A3(Utils.Builder.makeClickable,
            tickDict,
            sec,
            elem);
         });
         var offsetSpacerWidth = Basics.truncate(theme.symbolSize.miniframe.offset);
         var offsetSpacer = A2(Graphics.Element.spacer,
         offsetSpacerWidth,
         theme.symbolSize.miniframe.height);
         var toSubsectionFrameCollection = function (routeAndElemList) {
            return Graphics.Element.flow(Graphics.Element.right)(List.intersperse(offsetSpacer)(Basics.snd(List.unzip(routeAndElemList))));
         };
         var toSectionFrameCollection = function (secList) {
            return Graphics.Element.flow(Graphics.Element.down)(List.map(toSubsectionFrameCollection)(Utils.Builder.partitionInSubsection(secList)));
         };
         var numCols = Utils.Builder.getNumberOfSections(sectionList);
         var width = function () {
            switch (direction.ctor)
            {case "Horizontal":
               return Basics.truncate(Basics.toFloat(w) / Basics.toFloat(numCols));
               case "Vertical": return w;}
            _E.Case($moduleName,
            "between lines 117 and 120");
         }();
         var makeHead = F2(function (elem,
         txt) {
            return A6(buildComponentTextElement,
            elem,
            containerType,
            txt,
            theme.style,
            width,
            placement);
         });
         var makeSection = function (section) {
            return clickable(section.route)(A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) ? A2(makeHead,
            "section",
            section.shortName) : A2(makeHead,
            "shadedsection",
            section.shortName));
         };
         var othersectionFrame = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "othersection"
         ,_1: "miniframes"},
         theme.style);
         var othersubsectionFrame = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "othersubsection"
         ,_1: "miniframes"},
         theme.style);
         var currentsubsectionFrame = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "currentsubsection"
         ,_1: "miniframes"},
         theme.style);
         var currentFrame = A2(Utils.Content.getSymbolStyling,
         {ctor: "_Tuple2"
         ,_0: "current"
         ,_1: "miniframes"},
         theme.style);
         var makeSubsubsection = function (section) {
            return clickable(section.route)(A2(Utils.Builder.isCurrentSection,
            currentRoute,
            section) ? A2(Utils.Builder.isCurrentSubsection,
            currentRoute,
            section) ? A2(Utils.Builder.isCurrentSubsubsection,
            currentRoute,
            section) ? makeMiniframe(currentFrame) : makeMiniframe(currentsubsectionFrame) : makeMiniframe(othersubsectionFrame) : makeMiniframe(othersectionFrame));
         };
         var routeAndElementList = A2(Utils.Builder.levelwiseRouteMap,
         _L.fromArray([makeSection
                      ,makeSubsection
                      ,makeSubsubsection]),
         sectionList);
         var sectionwiseList = Utils.Builder.partitionInSection(routeAndElementList);
         var sectionCollection = List.map(function (_v62) {
            return function () {
               switch (_v62.ctor)
               {case "_Tuple2":
                  return A2(Graphics.Element.above,
                    _v62._0,
                    _v62._1);}
               _E.Case($moduleName,
               "on line 148, column 43 to 52");
            }();
         })(A2(List.zip,
         A2(List.map,
         function (x) {
            return Basics.snd(List.head(x));
         },
         sectionwiseList),
         A2(List.map,
         toSectionFrameCollection,
         sectionwiseList)));
         var miniframes = function () {
            switch (direction.ctor)
            {case "Horizontal":
               return A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 sectionCollection);
               case "Vertical":
               return A2(Graphics.Element.flow,
                 Graphics.Element.down,
                 sectionCollection);}
            _E.Case($moduleName,
            "between lines 153 and 157");
         }();
         return A3(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2"
         ,_0: w
         ,_1: Graphics.Element.heightOf(miniframes)},
         A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "miniframes"
         ,_1: "none"},
         theme.style),
         miniframes);
      }();
   });
   var buildConcreteComponent = F9(function (layoutDetails,
   theme,
   presInfo,
   w,
   h,
   componentType,
   sectionList,
   currentInfo,
   tickDict) {
      return function () {
         var currentRoute = currentInfo.route;
         var cols = layoutDetails.columns;
         var getCol = function (id) {
            return List.head(A2(List.filter,
            function (x) {
               return _U.eq(x.id,id);
            },
            cols));
         };
         var getColWidth = function (id) {
            return function (_) {
               return _.width;
            }(getCol(id));
         };
         var getColPlacement = function (id) {
            return function (_) {
               return _.placement;
            }(getCol(id));
         };
         var toIntermediateElement = function (ins) {
            return function () {
               var placement = getColPlacement(ins.column);
               var width = Basics.truncate(getColWidth(ins.column) * Basics.toFloat(w));
               var partialBuilder = function (func) {
                  return A7(func,
                  theme,
                  width,
                  placement,
                  sectionList,
                  currentRoute,
                  tickDict,
                  componentType);
               };
               var miniframes = partialBuilder(buildMiniframes);
               var sectionNavigation = partialBuilder(buildSectionNavigation);
               var subsectionNavigation = partialBuilder(buildSubsectionNavigation);
               var toc = partialBuilder(buildSidebarToc);
               var sectionType = partialBuilder(buildSectionType);
               var treesubsection = partialBuilder(buildTreeSubsection);
               var simple = F2(function (elem,
               t) {
                  return A6(buildComponentTextElement,
                  elem,
                  componentType,
                  t,
                  theme.style,
                  width,
                  placement);
               });
               return function () {
                  var _v67 = ins.id;
                  switch (_v67)
                  {case "logo":
                     return A4(buildImage,
                       "logo",
                       presInfo.logo,
                       width,
                       theme);
                     case "navigation":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : miniframes(Types.Theme.Horizontal);
                     case "navigationvertical":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : miniframes(Types.Theme.Vertical);
                     case "section":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : sectionType("section");
                     case "sectionnavigation":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : sectionNavigation(Types.Theme.Horizontal);
                     case "sectionnavigationvertical":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : sectionNavigation(Types.Theme.Vertical);
                     case "slidenumber":
                     return A2(simple,
                       "slidenumber",
                       currentInfo.currentSlideNumber);
                     case "slidenumberandtotal":
                     return A2(simple,
                       "slidenumber",
                       _L.append(currentInfo.currentSlideNumber,
                       _L.append("/",
                       currentInfo.maxSlideNumber)));
                     case "subsection":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : sectionType("subsection");
                     case "subsectionnavigation":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : subsectionNavigation(Types.Theme.Horizontal);
                     case "subsectionnavigationvertical":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : subsectionNavigation(Types.Theme.Vertical);
                     case "subsubsection":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : sectionType("subsubsection");
                     case "toc":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : toc;
                     case "treesection":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : treesubsection("section");
                     case "treesubsection":
                     return List.isEmpty(sectionList) ? Graphics.Element.empty : treesubsection("subsection");}
                  return A2(simple,
                  _v67,
                  A2(getElementText,
                  _v67,
                  presInfo));
               }();
            }();
         };
         return A3(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2",_0: w,_1: h},
         A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: componentType
         ,_1: "none"},
         theme.style),
         A3(getCompleteComponent,
         layoutDetails,
         {ctor: "_Tuple2",_0: w,_1: h},
         toIntermediateElement));
      }();
   });
   var buildOuterComponent = F7(function (theme,
   _v68,
   componentType,
   presInfo,
   sectionList,
   currentInfo,
   tickDict) {
      return function () {
         switch (_v68.ctor)
         {case "_Tuple2":
            return function () {
                 var componentLayout = A2(getLayout,
                 componentType,
                 theme.layout);
                 return function () {
                    switch (componentLayout.ctor)
                    {case "Empty":
                       return Graphics.Element.empty;
                       case "Layout":
                       return function () {
                            switch (componentType)
                            {case "modechangesymbols":
                               return A7(buildSymbolPanel,
                                 componentLayout._0,
                                 theme,
                                 _v68._1,
                                 "modechangesymbols",
                                 sectionList,
                                 currentInfo.route,
                                 tickDict);
                               case "navigationalsymbols":
                               return A7(buildSymbolPanel,
                                 componentLayout._0,
                                 theme,
                                 _v68._1,
                                 "navigationalsymbols",
                                 sectionList,
                                 currentInfo.route,
                                 tickDict);}
                            return A9(buildConcreteComponent,
                            componentLayout._0,
                            theme,
                            presInfo,
                            _v68._0,
                            _v68._1,
                            componentType,
                            sectionList,
                            currentInfo,
                            tickDict);
                         }();}
                    _E.Case($moduleName,
                    "between lines 24 and 42");
                 }();
              }();}
         _E.Case($moduleName,
         "between lines 22 and 42");
      }();
   });
   _elm.Builders.Outer.values = {_op: _op
                                ,buildOuterComponent: buildOuterComponent
                                ,buildConcreteComponent: buildConcreteComponent
                                ,buildMiniframes: buildMiniframes
                                ,buildSectionNavigation: buildSectionNavigation
                                ,buildSubsectionNavigation: buildSubsectionNavigation
                                ,buildSidebarToc: buildSidebarToc
                                ,buildSectionType: buildSectionType
                                ,buildTreeSubsection: buildTreeSubsection
                                ,buildImage: buildImage
                                ,buildComponentTextElement: buildComponentTextElement
                                ,buildSymbolPanel: buildSymbolPanel
                                ,buildSingleSymbol: buildSingleSymbol
                                ,getImageName: getImageName
                                ,buildTitle: buildTitle
                                ,buildTitleSlide: buildTitleSlide
                                ,buildSectionishSlide: buildSectionishSlide
                                ,buildToc: buildToc
                                ,getLayout: getLayout
                                ,getElementText: getElementText
                                ,getCompleteComponent: getCompleteComponent};
   return _elm.Builders.Outer.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.Builder = Elm.Utils.Builder || {};
Elm.Utils.Builder.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.Builder = _elm.Utils.Builder || {};
   if (_elm.Utils.Builder.values)
   return _elm.Utils.Builder.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.Builder";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var makeClickable = F3(function (tickDict,
   sectionishId,
   elem) {
      return function () {
         var tick = A2(Dict.getOrFail,
         sectionishId,
         tickDict);
         return _U.eq(tick,
         -100) ? elem : A3(Graphics.Input.clickable,
         Builders.Context.asynClicks.handle,
         Types.Context.Asyn(tick),
         elem);
      }();
   });
   var getColumnPosition = function (colAlign) {
      return function () {
         switch (colAlign.ctor)
         {case "BottomAlign":
            return Graphics.Element.midBottom;
            case "CenterAlign":
            return Graphics.Element.middle;
            case "TopAlign":
            return Graphics.Element.midTop;}
         _E.Case($moduleName,
         "between lines 161 and 164");
      }();
   };
   var partitionColWiseContentElement = F2(function (col,
   colAndElement) {
      return function () {
         var partList = F2(function (list,
         id) {
            return _U.cmp(id,
            col) > 0 ? _L.fromArray([]) : function () {
               var partedList = A2(List.partition,
               function (_v1) {
                  return function () {
                     switch (_v1.ctor)
                     {case "_Tuple2":
                        return _U.eq(_v1._0,id);}
                     _E.Case($moduleName,
                     "on line 153, column 63 to 70");
                  }();
               },
               list);
               var allconElemList = List.concat(Basics.snd(List.unzip(Basics.fst(partedList))));
               return _L.append(_L.fromArray([allconElemList]),
               A2(partList,
               Basics.snd(partedList),
               id + 1));
            }();
         });
         return A2(partList,
         colAndElement,
         1);
      }();
   });
   var partitionColWise = F2(function (col,
   colAndElement) {
      return function () {
         var partList = F2(function (list,
         id) {
            return _U.cmp(id,
            col) > 0 ? _L.fromArray([]) : function () {
               var partedList = A2(List.partition,
               function (_v5) {
                  return function () {
                     switch (_v5.ctor)
                     {case "_Tuple2":
                        return _U.eq(_v5._0,id);}
                     _E.Case($moduleName,
                     "on line 142, column 53 to 60");
                  }();
               },
               list);
               var colElem = Graphics.Element.flow(Graphics.Element.down)(Basics.snd(List.unzip(Basics.fst(partedList))));
               return _L.append(_L.fromArray([colElem]),
               A2(partList,
               Basics.snd(partedList),
               id + 1));
            }();
         });
         return A2(partList,
         colAndElement,
         1);
      }();
   });
   var getNumberOfSections = function (sectionList) {
      return List.length(List.filter(function (x) {
         return _U.eq(x,1);
      })(A2(List.map,
      function (x) {
         return List.length(x.route);
      },
      sectionList)));
   };
   var getLevelNumber = F2(function (level,
   route) {
      return _U.cmp(level,
      List.length(route)) > 0 ? -1 : List.last(A2(List.take,
      level,
      route));
   });
   var getSectionFromRoute = function (route) {
      return A2(getLevelNumber,
      1,
      route);
   };
   var getNumberOfSubsections = F2(function (sectionId,
   sectionList) {
      return List.length(List.filter(function (x) {
         return _U.eq(x,2);
      })(List.map(function (x) {
         return List.length(x.route);
      })(A2(List.filter,
      function (x) {
         return _U.eq(getSectionFromRoute(x.route),
         sectionId);
      },
      sectionList))));
   });
   var getSubsectionFromRoute = function (route) {
      return A2(getLevelNumber,
      2,
      route);
   };
   var getSubsubsectionFromRoute = function (route) {
      return A2(getLevelNumber,
      3,
      route);
   };
   var isCurrentSubsubsection = F2(function (currentRoute,
   section) {
      return _U.eq(getSubsubsectionFromRoute(currentRoute),
      getSubsubsectionFromRoute(section.route));
   });
   var isCurrentSubsection = F2(function (currentRoute,
   section) {
      return _U.eq(getSubsectionFromRoute(currentRoute),
      getSubsectionFromRoute(section.route));
   });
   var isCurrentSection = F2(function (currentRoute,
   section) {
      return _U.eq(getSectionFromRoute(currentRoute),
      getSectionFromRoute(section.route));
   });
   var tryHeadElseDefault = function (secList) {
      return List.isEmpty(secList) ? Maybe.Nothing : Maybe.Just(List.head(secList));
   };
   var filterOutLevel = F2(function (levels,
   sectioList) {
      return A2(List.filter,
      function (x) {
         return A2(List.any,
         function (y) {
            return _U.eq(List.length(x.route),
            y);
         },
         levels);
      },
      sectioList);
   });
   var filterOutSection = function (sectionList) {
      return A2(filterOutLevel,
      _L.fromArray([1]),
      sectionList);
   };
   var getCurrentSection = F2(function (currentRoute,
   sectionList) {
      return tryHeadElseDefault(List.filter(isCurrentSection(currentRoute))(filterOutSection(sectionList)));
   });
   var filterOutSubsection = function (sectionList) {
      return A2(filterOutLevel,
      _L.fromArray([2]),
      sectionList);
   };
   var getCurrentSubsection = F2(function (currentRoute,
   sectionList) {
      return tryHeadElseDefault(List.filter(isCurrentSection(currentRoute))(List.filter(isCurrentSubsection(currentRoute))(filterOutSubsection(sectionList))));
   });
   var filterOutSectionAndSubsection = function (sectionList) {
      return A2(filterOutLevel,
      _L.fromArray([1,2]),
      sectionList);
   };
   var filterOutSubsectionOfCurrentSection = F2(function (currentSection,
   sectionList) {
      return List.filter(function (x) {
         return _U.eq(getSectionFromRoute(x.route),
         currentSection);
      })(A2(filterOutLevel,
      _L.fromArray([2]),
      sectionList));
   });
   var getNextOrPvsTick = F5(function (tickDict,
   currentRoute,
   sectionList,
   level,
   nextOrPvs) {
      return function () {
         var siblings = List.map(function (_) {
            return _.route;
         })(_U.eq(level,
         1) ? filterOutSection(sectionList) : A2(filterOutSubsectionOfCurrentSection,
         List.head(currentRoute),
         sectionList));
         var cl = _U.eq(level,
         1) ? _L.fromArray([getSectionFromRoute(currentRoute)]) : _L.fromArray([getSectionFromRoute(currentRoute)
                                                                               ,getSubsectionFromRoute(currentRoute)]);
         var validSiblings = _U.cmp(nextOrPvs,
         0) > 0 ? A2(List.filter,
         function (x) {
            return _U.cmp(x,cl) > 0;
         },
         siblings) : A2(List.filter,
         function (x) {
            return _U.cmp(x,cl) < 0;
         },
         siblings);
         var ticks = List.filter(function (x) {
            return !_U.eq(x,-100);
         })(A2(List.map,
         function (x) {
            return A2(Dict.getOrFail,
            x,
            tickDict);
         },
         validSiblings));
         return List.isEmpty(ticks) ? A2(Dict.getOrFail,
         currentRoute,
         tickDict) : _U.cmp(nextOrPvs,
         0) > 0 ? List.head(ticks) : List.last(ticks);
      }();
   });
   var getCurrentSubsubsection = F2(function (currentRoute,
   sectionList) {
      return tryHeadElseDefault(List.filter(isCurrentSection(currentRoute))(List.filter(isCurrentSubsection(currentRoute))(List.filter(isCurrentSubsubsection(currentRoute))(A2(filterOutLevel,
      _L.fromArray([3]),
      sectionList)))));
   });
   var partitionInLevel = F2(function (level,
   routeAndElement) {
      return function () {
         var numSections = List.length(List.filter(function (x) {
            return _U.eq(x,level);
         })(List.map(List.length)(Basics.fst(List.unzip(routeAndElement)))));
         var partList = F2(function (list,
         id) {
            return _U.cmp(id,
            numSections) > 0 ? _L.fromArray([]) : function () {
               var partedList = A2(List.partition,
               function (_v9) {
                  return function () {
                     switch (_v9.ctor)
                     {case "_Tuple2":
                        return _U.eq(A2(getLevelNumber,
                          level,
                          _v9._0),
                          id);}
                     _E.Case($moduleName,
                     "on line 38, column 54 to 83");
                  }();
               },
               list);
               return _L.append(_L.fromArray([Basics.fst(partedList)]),
               A2(partList,
               Basics.snd(partedList),
               id + 1));
            }();
         });
         return A2(partList,
         routeAndElement,
         1);
      }();
   });
   var partitionInSection = function (routeAndElement) {
      return A2(partitionInLevel,
      1,
      routeAndElement);
   };
   var partitionInSubsection = function (routeAndElement) {
      return A2(partitionInLevel,
      2,
      routeAndElement);
   };
   var toElementMap = F2(function (funcList,
   sectionList) {
      return function () {
         var toElement = function (section) {
            return List.last(A2(List.take,
            List.length(section.route),
            funcList))(section);
         };
         return A2(List.map,
         toElement,
         sectionList);
      }();
   });
   var levelwiseRouteMap = F2(function (funcList,
   sectionList) {
      return function () {
         var onlyRoute = function (section) {
            return section.route;
         };
         return A2(List.zip,
         A2(List.map,
         onlyRoute,
         sectionList),
         A2(toElementMap,
         funcList,
         sectionList));
      }();
   });
   _elm.Utils.Builder.values = {_op: _op
                               ,toElementMap: toElementMap
                               ,levelwiseRouteMap: levelwiseRouteMap
                               ,partitionInLevel: partitionInLevel
                               ,partitionInSection: partitionInSection
                               ,partitionInSubsection: partitionInSubsection
                               ,filterOutLevel: filterOutLevel
                               ,filterOutSection: filterOutSection
                               ,filterOutSubsection: filterOutSubsection
                               ,filterOutSectionAndSubsection: filterOutSectionAndSubsection
                               ,filterOutSubsectionOfCurrentSection: filterOutSubsectionOfCurrentSection
                               ,tryHeadElseDefault: tryHeadElseDefault
                               ,getCurrentSection: getCurrentSection
                               ,getCurrentSubsection: getCurrentSubsection
                               ,getCurrentSubsubsection: getCurrentSubsubsection
                               ,isCurrentSection: isCurrentSection
                               ,isCurrentSubsection: isCurrentSubsection
                               ,isCurrentSubsubsection: isCurrentSubsubsection
                               ,getLevelNumber: getLevelNumber
                               ,getSectionFromRoute: getSectionFromRoute
                               ,getSubsectionFromRoute: getSubsectionFromRoute
                               ,getSubsubsectionFromRoute: getSubsubsectionFromRoute
                               ,getNumberOfSections: getNumberOfSections
                               ,getNumberOfSubsections: getNumberOfSubsections
                               ,partitionColWise: partitionColWise
                               ,partitionColWiseContentElement: partitionColWiseContentElement
                               ,getColumnPosition: getColumnPosition
                               ,makeClickable: makeClickable
                               ,getNextOrPvsTick: getNextOrPvsTick};
   return _elm.Utils.Builder.values;
};Elm.Displayers = Elm.Displayers || {};
Elm.Displayers.SupportbinSlide = Elm.Displayers.SupportbinSlide || {};
Elm.Displayers.SupportbinSlide.make = function (_elm) {
   "use strict";
   _elm.Displayers = _elm.Displayers || {};
   _elm.Displayers.SupportbinSlide = _elm.Displayers.SupportbinSlide || {};
   if (_elm.Displayers.SupportbinSlide.values)
   return _elm.Displayers.SupportbinSlide.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Displayers.SupportbinSlide";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var _op = {};
   var makeGrid = F2(function (n,
   elemList) {
      return List.isEmpty(elemList) ? _L.fromArray([]) : _L.append(_L.fromArray([A2(List.take,
      n,
      elemList)]),
      A2(makeGrid,
      n,
      A2(List.drop,n,elemList)));
   });
   var closeSign = A3(Graphics.Element.fittedImage,
   30,
   30,
   "Symbols/Close.gif");
   var closeButton = A5(Graphics.Input.customButton,
   Builders.Context.modeClicks.handle,
   Types.Context.NormalMode,
   closeSign,
   Graphics.Element.opacity(0.5)(closeSign),
   closeSign);
   var display = F3(function (supportbin,
   context,
   concreteSizeInfo) {
      return function () {
         var h = Basics.snd(concreteSizeInfo.content);
         var rowH = Basics.truncate(Basics.toFloat(h) / 4);
         var cellH = rowH - 5;
         var w = Basics.fst(concreteSizeInfo.content);
         var colW = Basics.truncate(Basics.toFloat(w) / 4);
         var cellW = colW - 5;
         var scaleFactor = Basics.toFloat(cellW) / Basics.toFloat(w);
         var scaleElem = function (elem) {
            return A3(Graphics.Collage.collage,
            cellW,
            cellH,
            _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))]));
         };
         var makeCell = function (element) {
            return function () {
               var elem = scaleElem(element);
               return A2(Graphics.Input.hoverable,
               Builders.Context.zoomClicks.handle,
               function (x) {
                  return x ? elem : Graphics.Element.empty;
               })(A3(Graphics.Input.clickable,
               Builders.Context.modeClicks.handle,
               Types.Context.SupportBinZoomMode,
               elem));
            }();
         };
         var base = A4(Graphics.Element.container,
         w,
         h,
         Graphics.Element.topRight,
         closeButton);
         var elementList = supportbin.content;
         var grid = Graphics.Element.flow(Graphics.Element.down)(List.map(function (x) {
            return Graphics.Element.flow(Graphics.Element.right)(A2(List.map,
            makeCell,
            x));
         })(A2(makeGrid,4,elementList)));
         var positionedElem = Graphics.Element.opacity(0.7)(A4(Graphics.Element.container,
         w,
         h,
         Graphics.Element.middle,
         grid));
         return Graphics.Element.layers(_L.fromArray([positionedElem
                                                     ,base]));
      }();
   });
   _elm.Displayers.SupportbinSlide.values = {_op: _op
                                            ,closeSign: closeSign
                                            ,closeButton: closeButton
                                            ,display: display
                                            ,makeGrid: makeGrid};
   return _elm.Displayers.SupportbinSlide.values;
};Elm.Displayers = Elm.Displayers || {};
Elm.Displayers.QuizSlide = Elm.Displayers.QuizSlide || {};
Elm.Displayers.QuizSlide.make = function (_elm) {
   "use strict";
   _elm.Displayers = _elm.Displayers || {};
   _elm.Displayers.QuizSlide = _elm.Displayers.QuizSlide || {};
   if (_elm.Displayers.QuizSlide.values)
   return _elm.Displayers.QuizSlide.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Displayers.QuizSlide";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.Context = Elm.Builders.Context.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Graphics.Input || {};
   Graphics.Input.Field = Elm.Graphics.Input.Field.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var _op = {};
   var makeDropDown = F3(function (quizOptions,
   correct,
   wrong) {
      return function () {
         var getElem = function (rec) {
            return function () {
               var _v0 = rec.isCorrect;
               switch (_v0)
               {case "false": return wrong;
                  case "true": return correct;}
               _E.Case($moduleName,
               "between lines 97 and 100");
            }();
         };
         var makeOpt = function (rec) {
            return {ctor: "_Tuple2"
                   ,_0: rec.option
                   ,_1: getElem(rec)};
         };
         return Graphics.Input.dropDown(Builders.Context.quizClicks.handle)({ctor: "::"
                                                                            ,_0: {ctor: "_Tuple2"
                                                                                 ,_0: "Select"
                                                                                 ,_1: Graphics.Element.empty}
                                                                            ,_1: A2(List.map,
                                                                            makeOpt,
                                                                            quizOptions)});
      }();
   });
   var wronAnsNotify = A3(Graphics.Element.fittedImage,
   393,
   136,
   "Symbols/Wrong.gif");
   var correctAnsNotify = A3(Graphics.Element.fittedImage,
   393,
   136,
   "Symbols/Correct.gif");
   var explainSign = A3(Graphics.Element.fittedImage,
   213,
   86,
   "Symbols/Explain.gif");
   var submitSign = A3(Graphics.Element.fittedImage,
   213,
   86,
   "Symbols/Submit.gif");
   var closeSign = A3(Graphics.Element.fittedImage,
   30,
   30,
   "Symbols/Close.gif");
   var closeButton = A5(Graphics.Input.customButton,
   Builders.Context.modeClicks.handle,
   Types.Context.NormalMode,
   closeSign,
   Graphics.Element.opacity(0.5)(closeSign),
   closeSign);
   var getButton = F2(function (custom,
   elem) {
      return A5(Graphics.Input.customButton,
      Builders.Context.quizClicks.handle,
      elem,
      custom,
      Graphics.Element.opacity(0.5)(custom),
      custom);
   });
   var submitButton = A2(getButton,
   submitSign,
   Graphics.Element.empty);
   var displaySimple = F3(function (quiz,
   context,
   concreteSizeInfo) {
      return function () {
         var tboxContent = Basics.snd(context.quizContent);
         var textbox = A5(Graphics.Input.Field.field,
         Graphics.Input.Field.defaultStyle,
         Builders.Context.quizContent.handle,
         Basics.id,
         "Type your answer here!",
         tboxContent);
         var h = Basics.snd(concreteSizeInfo.content);
         var w = Basics.fst(concreteSizeInfo.content);
         var explanation = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(Text.plainText(_U.eq(quiz.explanation,
         "") ? "No Explanation" : quiz.explanation));
         var explainButton = A2(getButton,
         explainSign,
         explanation);
         var base = A4(Graphics.Element.container,
         w,
         h,
         Graphics.Element.topRight,
         closeButton);
         var buttons = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.bottomRight)(A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([explainButton
                      ,submitButton])));
         var cAns = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(correctAnsNotify);
         var wAns = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(wronAnsNotify);
         var correctAns = List.map(String.toUpper)(A2(List.map,
         String.trim,
         quiz.correctAns));
         var question = Graphics.Element.color(Color.lightCharcoal)(Text.plainText(quiz.question));
         var qAndTbox = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.middle)(A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([question
                      ,textbox])));
         var questionView = Graphics.Element.layers(_L.fromArray([base
                                                                 ,qAndTbox
                                                                 ,buttons]));
         return _U.cmp(Basics.fst(context.quizContent),
         Basics.fst(context.quizButton)) > -1 ? questionView : function () {
            var clickedElem = Basics.snd(context.quizButton);
            return !_U.eq(Graphics.Element.widthOf(clickedElem),
            0) ? Graphics.Element.layers(_L.fromArray([clickedElem
                                                      ,questionView])) : A2(List.any,
            function (x) {
               return _U.eq(x,
               String.toUpper(tboxContent.string));
            },
            correctAns) ? Graphics.Element.layers(_L.fromArray([questionView
                                                               ,cAns])) : Graphics.Element.layers(_L.fromArray([questionView
                                                                                                               ,wAns]));
         }();
      }();
   });
   var displayMcq = F3(function (quiz,
   context,
   concreteSizeInfo) {
      return function () {
         var h = Basics.snd(concreteSizeInfo.content);
         var w = Basics.fst(concreteSizeInfo.content);
         var explanation = Graphics.Element.color(Color.darkGrey)(A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(Text.plainText(_U.eq(quiz.explanation,
         "") ? "No Explanation" : quiz.explanation)));
         var explainButton = A2(getButton,
         explainSign,
         explanation);
         var cAns = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(correctAnsNotify);
         var wAns = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.midTop)(wronAnsNotify);
         var dropDn = A3(makeDropDown,
         quiz.options,
         cAns,
         wAns);
         var base = A4(Graphics.Element.container,
         w,
         h,
         Graphics.Element.topRight,
         closeButton);
         var buttons = A4(Graphics.Element.container,
         w,
         h,
         Graphics.Element.bottomRight,
         explainButton);
         var question = Graphics.Element.color(Color.lightCharcoal)(Text.plainText(quiz.question));
         var qAndDrop = A3(Graphics.Element.container,
         w,
         h,
         Graphics.Element.middle)(A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([question
                      ,dropDn])));
         var questionView = Graphics.Element.layers(_L.fromArray([base
                                                                 ,qAndDrop
                                                                 ,buttons]));
         var clickedElem = Basics.snd(context.quizButton);
         return Graphics.Element.layers(_L.fromArray([questionView
                                                     ,clickedElem]));
      }();
   });
   var display = F3(function (quiz,
   context,
   concreteSizeInfo) {
      return function () {
         var _v1 = quiz.qtype;
         switch (_v1)
         {case "mcq":
            return A3(displayMcq,
              quiz,
              context,
              concreteSizeInfo);
            case "simple":
            return A3(displaySimple,
              quiz,
              context,
              concreteSizeInfo);}
         _E.Case($moduleName,
         "between lines 32 and 34");
      }();
   });
   _elm.Displayers.QuizSlide.values = {_op: _op
                                      ,getButton: getButton
                                      ,closeSign: closeSign
                                      ,submitSign: submitSign
                                      ,explainSign: explainSign
                                      ,closeButton: closeButton
                                      ,submitButton: submitButton
                                      ,correctAnsNotify: correctAnsNotify
                                      ,wronAnsNotify: wronAnsNotify
                                      ,display: display
                                      ,displaySimple: displaySimple
                                      ,displayMcq: displayMcq
                                      ,makeDropDown: makeDropDown};
   return _elm.Displayers.QuizSlide.values;
};Elm.Builders = Elm.Builders || {};
Elm.Builders.Context = Elm.Builders.Context || {};
Elm.Builders.Context.make = function (_elm) {
   "use strict";
   _elm.Builders = _elm.Builders || {};
   _elm.Builders.Context = _elm.Builders.Context || {};
   if (_elm.Builders.Context.values)
   return _elm.Builders.Context.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Builders.Context";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Graphics.Input || {};
   Graphics.Input.Field = Elm.Graphics.Input.Field.make(_elm);
   var Keyboard = Elm.Keyboard.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Mouse = Elm.Mouse.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Context = Elm.Types.Context.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var makeContextRecord = F7(function (_v0,
   sc,
   m,
   ze,
   mp,
   qb,
   qc) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2": return {_: {}
                                 ,currentSlideIndex: sc.current
                                 ,currentTick: sc.currentTick
                                 ,mode: m
                                 ,mousePosition: mp
                                 ,previousSlideIndex: sc.previous
                                 ,quizButton: qb
                                 ,quizContent: qc
                                 ,windowHeight: _v0._1
                                 ,windowWidth: _v0._0
                                 ,zoomElem: ze};}
         _E.Case($moduleName,
         "between lines 87 and 96");
      }();
   });
   var checkMode = function (m) {
      return function () {
         switch (m.ctor)
         {case "NormalMode":
            return true;}
         return false;
      }();
   };
   var quizContent = Graphics.Input.input(Graphics.Input.Field.noContent);
   var quizClicks = Graphics.Input.input(Graphics.Element.empty);
   var zoomClicks = Graphics.Input.input(Graphics.Element.empty);
   var modeClicks = Graphics.Input.input(Types.Context.NormalMode);
   var slideContextEnable = A2(Signal.lift,
   checkMode,
   modeClicks.signal);
   var asynClicks = Graphics.Input.input(Types.Context.Asyn(0));
   var step = F2(function (_v5,
   indexes) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            switch (_v5._0.ctor)
              {case "_Tuple2":
                 switch (_v5._1.ctor)
                   {case "_Tuple2":
                      return function () {
                           var $ = _U.cmp(_v5._1._0,
                           _v5._0._0) > 0 ? function () {
                              switch (_v5._1._1.ctor)
                              {case "Asyn":
                                 return {ctor: "_Tuple2"
                                        ,_0: _v5._1._1._0
                                        ,_1: 1};
                                 case "Dec":
                                 return {ctor: "_Tuple2"
                                        ,_0: indexes.current - 1
                                        ,_1: 1};
                                 case "DecTick":
                                 return {ctor: "_Tuple2"
                                        ,_0: indexes.current
                                        ,_1: indexes.currentTick - 1};
                                 case "Inc":
                                 return {ctor: "_Tuple2"
                                        ,_0: indexes.current + 1
                                        ,_1: 1};
                                 case "IncTick":
                                 return {ctor: "_Tuple2"
                                        ,_0: indexes.current
                                        ,_1: indexes.currentTick + 1};}
                              _E.Case($moduleName,
                              "between lines 26 and 32");
                           }() : _U.eq(_v5._0._1,
                           _L.fromArray([39])) || _U.eq(_v5._0._1,
                           _L.fromArray([78])) ? {ctor: "_Tuple2"
                                                 ,_0: indexes.current + 1
                                                 ,_1: 1} : _U.eq(_v5._0._1,
                           _L.fromArray([37])) || _U.eq(_v5._0._1,
                           _L.fromArray([80])) ? {ctor: "_Tuple2"
                                                 ,_0: indexes.current - 1
                                                 ,_1: 1} : _U.eq(_v5._0._1,
                           _L.fromArray([35])) || _U.eq(_v5._0._1,
                           _L.fromArray([69])) ? {ctor: "_Tuple2"
                                                 ,_0: 0 - 1
                                                 ,_1: 1} : _U.eq(_v5._0._1,
                           _L.fromArray([36])) || _U.eq(_v5._0._1,
                           _L.fromArray([72])) ? {ctor: "_Tuple2"
                                                 ,_0: 0
                                                 ,_1: 1} : _U.eq(_v5._0._1,
                           _L.fromArray([34])) || (_U.eq(_v5._0._1,
                           _L.fromArray([40])) || _U.eq(_v5._0._1,
                           _L.fromArray([13]))) ? {ctor: "_Tuple2"
                                                  ,_0: indexes.current
                                                  ,_1: indexes.currentTick + 1} : _U.eq(_v5._0._1,
                           _L.fromArray([33])) || _U.eq(_v5._0._1,
                           _L.fromArray([38])) ? {ctor: "_Tuple2"
                                                 ,_0: indexes.current
                                                 ,_1: indexes.currentTick - 1} : {ctor: "_Tuple2"
                                                                                 ,_0: indexes.current
                                                                                 ,_1: indexes.currentTick},
                           nextSlideIndex = $._0,
                           nextTick = $._1;
                           return {_: {}
                                  ,current: nextSlideIndex
                                  ,currentTick: nextTick
                                  ,previous: indexes.current};
                        }();}
                   break;}
              break;}
         _E.Case($moduleName,
         "between lines 25 and 39");
      }();
   });
   var lastKeysDownSignal = A2(Signal.sampleOn,
   A3(Signal.dropIf,
   List.isEmpty,
   _L.fromArray([]),
   Keyboard.keysDown),
   Keyboard.keysDown);
   var slideContextSignal = function () {
      var combineSig = F2(function (sig1,
      sig2) {
         return {ctor: "_Tuple2"
                ,_0: sig1
                ,_1: sig2};
      });
      return A2(Signal.keepWhen,
      slideContextEnable,
      {_: {}
      ,current: 0
      ,currentTick: 0
      ,previous: 0})(A3(Signal.foldp,
      step,
      {_: {}
      ,current: 0
      ,currentTick: 1
      ,previous: 0},
      A3(Signal.lift2,
      combineSig,
      Time.timestamp(lastKeysDownSignal),
      Time.timestamp(asynClicks.signal))));
   }();
   var contextSignal = A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["<~"],
   makeContextRecord,
   Window.dimensions),
   slideContextSignal),
   modeClicks.signal),
   zoomClicks.signal),
   A3(Signal.keepWhen,
   Mouse.isDown,
   {ctor: "_Tuple2",_0: 0,_1: 0},
   Mouse.position)),
   Time.timestamp(quizClicks.signal)),
   Time.timestamp(quizContent.signal));
   _elm.Builders.Context.values = {_op: _op
                                  ,lastKeysDownSignal: lastKeysDownSignal
                                  ,step: step
                                  ,slideContextSignal: slideContextSignal
                                  ,asynClicks: asynClicks
                                  ,modeClicks: modeClicks
                                  ,zoomClicks: zoomClicks
                                  ,quizClicks: quizClicks
                                  ,quizContent: quizContent
                                  ,checkMode: checkMode
                                  ,slideContextEnable: slideContextEnable
                                  ,makeContextRecord: makeContextRecord
                                  ,contextSignal: contextSignal};
   return _elm.Builders.Context.values;
};Elm.PreProcess = Elm.PreProcess || {};
Elm.PreProcess.ContentMaker = Elm.PreProcess.ContentMaker || {};
Elm.PreProcess.ContentMaker.make = function (_elm) {
   "use strict";
   _elm.PreProcess = _elm.PreProcess || {};
   _elm.PreProcess.ContentMaker = _elm.PreProcess.ContentMaker || {};
   if (_elm.PreProcess.ContentMaker.values)
   return _elm.PreProcess.ContentMaker.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "PreProcess.ContentMaker";
   var Basics = Elm.Basics.make(_elm);
   var Builders = Builders || {};
   Builders.ElementMaker = Elm.Builders.ElementMaker.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var SmartDisplay = SmartDisplay || {};
   SmartDisplay.SmartList = Elm.SmartDisplay.SmartList.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.SmartDisplay = Elm.Types.SmartDisplay.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Content = Elm.Utils.Content.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var _op = {};
   var processColumnInfo = F2(function (w,
   naiveColumnInfo) {
      return {_: {}
             ,colAlign: function () {
                var _v1 = naiveColumnInfo.columnAlign;
                switch (_v1)
                {case "b":
                   return Types.Theme.BottomAlign;
                   case "c":
                   return Types.Theme.CenterAlign;
                   case "t":
                   return Types.Theme.TopAlign;}
                _E.Case($moduleName,
                "between lines 420 and 424");
             }()
             ,id: naiveColumnInfo.id
             ,placement: function () {
                var _v0 = naiveColumnInfo.inColumnAlign;
                switch (_v0)
                {case "center":
                   return Graphics.Element.middle;
                   case "left":
                   return Graphics.Element.midLeft;
                   case "right":
                   return Graphics.Element.midRight;}
                _E.Case($moduleName,
                "between lines 416 and 420");
             }()
             ,width: Utils.Naive.toConcreteFloat(naiveColumnInfo.width) * Basics.toFloat(w)};
   });
   var scaleElem = F3(function (w,
   placement,
   elem) {
      return function () {
         var scaleFactor = Basics.toFloat(w) / Basics.toFloat(Graphics.Element.widthOf(elem));
         var newH = Basics.truncate(scaleFactor * Basics.toFloat(Graphics.Element.heightOf(elem)));
         return _U.cmp(Graphics.Element.widthOf(elem),
         w) > 0 ? A3(Graphics.Collage.collage,
         w,
         newH,
         _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))])) : A4(Graphics.Element.container,
         w,
         Graphics.Element.heightOf(elem),
         placement,
         elem);
      }();
   });
   var getRoute = function (string) {
      return List.map(Utils.Naive.toConcreteInt)(A2(String.split,
      ".",
      string));
   };
   var getSlideType = function (string) {
      return function () {
         switch (string)
         {case "normal":
            return Types.Slate.NormalSlide;
            case "plain":
            return Types.Slate.PlainSlide;
            case "section":
            return Types.Slate.SectionSlide;
            case "subsection":
            return Types.Slate.SubsectionSlide;
            case "supportbin":
            return Types.Slate.SupportbinSlide;
            case "title":
            return Types.Slate.TitleSlide;}
         _E.Case($moduleName,
         "between lines 389 and 395");
      }();
   };
   var getItemMarkerStyling = F2(function (itemType,
   styleInfo) {
      return function () {
         switch (itemType)
         {case "descriptionitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionitemprojection"
              ,_1: "none"},
              styleInfo);
            case "descriptionsubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionsubitemprojection"
              ,_1: "none"},
              styleInfo);
            case "descriptionsubsubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionsubsubitemprojection"
              ,_1: "none"},
              styleInfo);
            case "enumerateitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "enumerateitemprojection"
              ,_1: "none"},
              styleInfo);
            case "enumeratesubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "enumeratesubitemprojection"
              ,_1: "none"},
              styleInfo);
            case "enumeratesubsubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "enumeratesubsubitemprojection"
              ,_1: "none"},
              styleInfo);
            case "itemizeitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizeitemprojection"
              ,_1: "none"},
              styleInfo);
            case "itemizesubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizesubitemprojection"
              ,_1: "none"},
              styleInfo);
            case "itemizesubsubitem":
            return A2(Utils.Content.getSymbolStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizesubsubitemprojection"
              ,_1: "none"},
              styleInfo);}
         _E.Case($moduleName,
         "between lines 375 and 384");
      }();
   });
   var getItemStyling = F2(function (itemType,
   styleInfo) {
      return function () {
         switch (itemType)
         {case "descriptionitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionitem"
              ,_1: "none"},
              styleInfo);
            case "descriptionsubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionsubitem"
              ,_1: "none"},
              styleInfo);
            case "descriptionsubsubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "descriptionsubsubitem"
              ,_1: "none"},
              styleInfo);
            case "enumerateitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "enumerateitem"
              ,_1: "none"},
              styleInfo);
            case "enumeratesubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "enumeratesubitem"
              ,_1: "none"},
              styleInfo);
            case "enumeratesubsubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "enumeratesubsubitem"
              ,_1: "none"},
              styleInfo);
            case "itemizeitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizeitem"
              ,_1: "none"},
              styleInfo);
            case "itemizesubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizesubitem"
              ,_1: "none"},
              styleInfo);
            case "itemizesubsubitem":
            return A2(Utils.Content.getStyling,
              {ctor: "_Tuple2"
              ,_0: "itemizesubsubitem"
              ,_1: "none"},
              styleInfo);}
         _E.Case($moduleName,
         "between lines 362 and 371");
      }();
   });
   var listToRawColumnContent = F4(function (theme,
   w,
   placement,
   naiveSlateList) {
      return function () {
         var toItemElement = function (_v5) {
            return function () {
               switch (_v5.ctor)
               {case "_Tuple2":
                  switch (_v5._0.ctor)
                    {case "_Tuple2":
                       return function () {
                            var firstElem = List.isEmpty(_v5._0._1) ? Graphics.Element.empty : function (_) {
                               return _.element;
                            }(List.head(_v5._0._1));
                            var otherLife = function () {
                               switch (_v5._1)
                               {case "covered":
                                  return A2(Graphics.Element.spacer,
                                    Graphics.Element.widthOf(firstElem),
                                    Graphics.Element.heightOf(firstElem));
                                  case "dead":
                                  return Graphics.Element.empty;}
                               _E.Case($moduleName,
                               "between lines 341 and 344");
                            }();
                            return {_: {}
                                   ,body: _v5._0._1
                                   ,containerColumn: naiveSlateList.layout.containerColumn
                                   ,inColumnnPos: _L.fromArray([naiveSlateList.layout.inColumnnPos
                                                               ,_v5._0._0])
                                   ,otherLife: otherLife};
                         }();}
                    break;}
               _E.Case($moduleName,
               "between lines 338 and 349");
            }();
         };
         var levels = A2(List.map,
         function (x) {
            return List.length(getRoute(x.id));
         },
         naiveSlateList.items);
         var offsetWidth = Basics.truncate(theme.symbolSize.itemProjection.offset * Basics.toFloat(w));
         var toItemMarkers = function (naiveListItem) {
            return function () {
               var markerText = _U.eq(naiveListItem.itemInfo,
               "") ? Maybe.Nothing : Maybe.Just(naiveListItem.itemInfo);
               var markerStyling = A2(getItemMarkerStyling,
               naiveListItem.itemType,
               theme.style);
               var marker = A3(Builders.ElementMaker.buildSymbol,
               markerStyling,
               theme.symbolSize.itemProjection,
               markerText);
               return A3(Builders.ElementMaker.buildCompleteElement,
               {ctor: "_Tuple2"
               ,_0: Graphics.Element.widthOf(marker)
               ,_1: Graphics.Element.heightOf(marker)},
               markerStyling.general,
               marker);
            }();
         };
         var slateMarkers = A2(List.map,
         toItemMarkers,
         naiveSlateList.items);
         var toSlateItemText = function (naiveListItem) {
            return function () {
               var bodyStyling = A2(getItemStyling,
               naiveListItem.itemType,
               theme.style);
               var toBodyText = A2(Builders.ElementMaker.buildSlateText,
               theme.style,
               bodyStyling);
               var bodyTexts = A2(List.map,
               toBodyText,
               naiveListItem.body);
               var maxWidth = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
               Graphics.Element.widthOf,
               bodyTexts));
               var maxHeight = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
               Graphics.Element.heightOf,
               bodyTexts));
               var toItemBody = A2(Builders.ElementMaker.buildCompleteElement,
               {ctor: "_Tuple2"
               ,_0: maxWidth
               ,_1: maxHeight},
               bodyStyling);
               var rawElemBody = A2(List.map,
               function (_v12) {
                  return function () {
                     switch (_v12.ctor)
                     {case "_Tuple2": return {_: {}
                                             ,animation: _v12._1
                                             ,element: A3(scaleElem,
                                             w,
                                             Graphics.Element.midLeft,
                                             _v12._0)};}
                     _E.Case($moduleName,
                     "on line 306, column 45 to 87");
                  }();
               },
               A2(List.zip,
               A2(List.map,
               toItemBody,
               bodyTexts),
               A2(List.map,
               function (_) {
                  return _.animation;
               },
               naiveListItem.body)));
               return {ctor: "_Tuple2"
                      ,_0: maxWidth
                      ,_1: rawElemBody};
            }();
         };
         var slateMaxWidthNItemBodyTexts = A2(List.map,
         toSlateItemText,
         naiveSlateList.items);
         var maxItemWidth = List.maximum(A2(List.map,
         Basics.fst,
         slateMaxWidthNItemBodyTexts));
         var toSlateItem = function (_v16) {
            return function () {
               switch (_v16.ctor)
               {case "_Tuple2":
                  switch (_v16._0.ctor)
                    {case "_Tuple2":
                       return function () {
                            var toItemSingle = function (itm) {
                               return {_: {}
                                      ,animation: itm.animation
                                      ,element: A5(Builders.ElementMaker.buildTabbedElement,
                                      {ctor: "_Tuple2"
                                      ,_0: maxItemWidth
                                      ,_1: Graphics.Element.heightOf(itm.element)},
                                      _v16._1,
                                      offsetWidth,
                                      _v16._0._0,
                                      itm.element)};
                            };
                            return A2(List.map,
                            toItemSingle,
                            _v16._0._1);
                         }();}
                    break;}
               _E.Case($moduleName,
               "between lines 329 and 335");
            }();
         };
         var slateItemBodyTexts = Basics.snd(List.unzip(slateMaxWidthNItemBodyTexts));
         return List.map(toItemElement)(A2(List.zip,
         A2(List.zip,
         _L.range(1,
         List.length(naiveSlateList.items)),
         List.map(toSlateItem)(A2(List.zip,
         A2(List.zip,
         slateMarkers,
         slateItemBodyTexts),
         levels))),
         A2(List.map,
         function (_) {
            return _.otherLife;
         },
         naiveSlateList.items)));
      }();
   });
   var getSDType = function (str) {
      return function () {
         switch (str)
         {case "checkboxcomparision":
            return Types.SmartDisplay.CheckBoxComparision;
            case "circlecone":
            return Types.SmartDisplay.CircleCone;
            case "circlefull":
            return Types.SmartDisplay.CircleFull;
            case "circlehalf":
            return Types.SmartDisplay.CircleHalf;
            case "containerlist":
            return Types.SmartDisplay.ContainerList;
            case "framedlist":
            return Types.SmartDisplay.FramedList;
            case "paragraphlist":
            return Types.SmartDisplay.ParagraphList;
            case "plusequalhorizontal":
            return Types.SmartDisplay.PlusEqualHorizontal;
            case "plusequalvetical":
            return Types.SmartDisplay.PlusEqualVertical;
            case "plusminus":
            return Types.SmartDisplay.PlusMinus;}
         _E.Case($moduleName,
         "between lines 280 and 290");
      }();
   };
   var processItems = function (item) {
      return {_: {}
             ,body: item.body
             ,route: getRoute(item.id)};
   };
   var smartListToRawColumnContent = F3(function (w,
   placement,
   naiveSmartList) {
      return function () {
         var smartDisplay = {_: {}
                            ,items: A2(List.map,
                            processItems,
                            naiveSmartList.items)
                            ,sdType: getSDType(naiveSmartList.sdType)
                            ,width: w};
         var smartListRawElem = {_: {}
                                ,animation: naiveSmartList.animation
                                ,element: A2(scaleElem,
                                w,
                                placement)(SmartDisplay.SmartList.getSmartDisplay(smartDisplay))};
         var firstElem = smartListRawElem.element;
         var otherLife = function () {
            var _v23 = naiveSmartList.otherLife;
            switch (_v23)
            {case "covered":
               return A2(Graphics.Element.spacer,
                 Graphics.Element.widthOf(firstElem),
                 Graphics.Element.heightOf(firstElem));
               case "dead":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 262 and 265");
         }();
         return {_: {}
                ,body: _L.fromArray([smartListRawElem])
                ,containerColumn: naiveSmartList.layout.containerColumn
                ,inColumnnPos: _L.fromArray([naiveSmartList.layout.inColumnnPos])
                ,otherLife: otherLife};
      }();
   });
   var processImageOptions = F2(function (opt,
   pic) {
      return function () {
         var _v24 = opt.option;
         switch (_v24)
         {case "height":
            return _U.eq(opt.value,
              "") ? pic : A2(Graphics.Element.height,
              Utils.Naive.toConcreteInt(opt.value),
              pic);
            case "scale":
            return _U.eq(opt.value,
              "") ? pic : function () {
                 var scalefactor = Utils.Naive.toConcreteInt(opt.value);
                 var w = Graphics.Element.widthOf(pic);
                 var h = Graphics.Element.heightOf(pic);
                 return A3(Graphics.Element.size,
                 w * scalefactor,
                 h * scalefactor,
                 pic);
              }();
            case "width":
            return _U.eq(opt.value,
              "") ? pic : A2(Graphics.Element.width,
              Utils.Naive.toConcreteInt(opt.value),
              pic);}
         _E.Case($moduleName,
         "between lines 242 and 250");
      }();
   });
   var imageboxToRawColumnContent = F4(function (theme,
   w,
   placement,
   naiveImageBox) {
      return function () {
         var getD = function (optName) {
            return function () {
               var opt = A2(List.filter,
               function (x) {
                  return _U.eq(x.option,
                  optName);
               },
               naiveImageBox.imageOptions);
               return List.isEmpty(opt) ? w : Utils.Naive.toConcreteInt(function (_) {
                  return _.value;
               }(List.head(opt)));
            }();
         };
         var imgW = getD("width");
         var imgH = getD("height");
         var captionStyling = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "caption"
         ,_1: "imagebox"},
         theme.style);
         var bodyStyling = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "imagebox"
         ,_1: "none"},
         theme.style);
         var body = function (img) {
            return A3(Builders.ElementMaker.buildCompleteElement,
            {ctor: "_Tuple2"
            ,_0: Graphics.Element.widthOf(img)
            ,_1: Graphics.Element.heightOf(img)},
            bodyStyling,
            img);
         };
         var imageFileName = _L.append("UserImages/",
         naiveImageBox.imageFile);
         var pic = body(A3(Graphics.Element.fittedImage,
         imgW,
         imgH,
         imageFileName));
         var caption = _U.eq(naiveImageBox.caption,
         "") ? Graphics.Element.empty : function () {
            var wCap = Graphics.Element.widthOf(pic);
            var captionText = A2(Builders.ElementMaker.buildText,
            captionStyling,
            naiveImageBox.caption);
            var hCap = Graphics.Element.heightOf(captionText);
            var scaledCaption = A3(Graphics.Collage.collage,
            w,
            hCap,
            _L.fromArray([Graphics.Collage.scale(Basics.toFloat(wCap) / Basics.toFloat(Graphics.Element.widthOf(captionText)))(Graphics.Collage.toForm(captionText))]));
            return A3(Builders.ElementMaker.buildCompleteElement,
            {ctor: "_Tuple2"
            ,_0: wCap
            ,_1: hCap},
            captionStyling,
            scaledCaption);
         }();
         var toImage = {_: {}
                       ,animation: naiveImageBox.animation
                       ,element: A2(scaleElem,
                       w,
                       placement)(A2(Graphics.Element.below,
                       caption,
                       pic))};
         var firstElem = toImage.element;
         var otherLife = function () {
            var _v25 = naiveImageBox.otherLife;
            switch (_v25)
            {case "covered":
               return A2(Graphics.Element.spacer,
                 Graphics.Element.widthOf(firstElem),
                 Graphics.Element.heightOf(firstElem));
               case "dead":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 230 and 233");
         }();
         return {_: {}
                ,body: _L.fromArray([toImage])
                ,containerColumn: naiveImageBox.layout.containerColumn
                ,inColumnnPos: _L.fromArray([naiveImageBox.layout.inColumnnPos])
                ,otherLife: otherLife};
      }();
   });
   var simpleTextBoxToRawColumnContent = F4(function (theme,
   w,
   placement,
   naiveTextBox) {
      return function () {
         var bodyStyling = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "normal"
         ,_1: "none"},
         theme.style);
         var toBodyText = A2(Builders.ElementMaker.buildSlateText,
         theme.style,
         bodyStyling);
         var bodyTexts = A2(List.map,
         toBodyText,
         naiveTextBox.body);
         var maxWidth = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         bodyTexts));
         var maxHeight = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         bodyTexts));
         var toBoxBody = A2(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2"
         ,_0: maxWidth
         ,_1: maxHeight},
         bodyStyling);
         var rawElemBody = A2(List.map,
         function (_v26) {
            return function () {
               switch (_v26.ctor)
               {case "_Tuple2": return {_: {}
                                       ,animation: _v26._1
                                       ,element: A2(scaleElem,
                                       w,
                                       placement)(_v26._0)};}
               _E.Case($moduleName,
               "between lines 180 and 181");
            }();
         },
         A2(List.zip,
         A2(List.map,
         toBoxBody,
         bodyTexts),
         A2(List.map,
         function (_) {
            return _.animation;
         },
         naiveTextBox.body)));
         var firstElem = List.isEmpty(rawElemBody) ? Graphics.Element.empty : function (_) {
            return _.element;
         }(List.head(rawElemBody));
         var otherLife = function () {
            var _v30 = naiveTextBox.otherLife;
            switch (_v30)
            {case "covered":
               return A2(Graphics.Element.spacer,
                 Graphics.Element.widthOf(firstElem),
                 Graphics.Element.heightOf(firstElem));
               case "dead":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 187 and 191");
         }();
         return {_: {}
                ,body: rawElemBody
                ,containerColumn: naiveTextBox.layout.containerColumn
                ,inColumnnPos: _L.fromArray([naiveTextBox.layout.inColumnnPos])
                ,otherLife: otherLife};
      }();
   });
   var frameboxToRawColumnContent = F4(function (theme,
   w,
   placement,
   naiveFrameBox) {
      return function () {
         var bodyStyling = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "framebox"
         ,_1: "none"},
         theme.style);
         var toBodyText = A2(Builders.ElementMaker.buildSlateText,
         theme.style,
         bodyStyling);
         var bodyTexts = A2(List.map,
         toBodyText,
         naiveFrameBox.body);
         var maxWidth = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         bodyTexts));
         var maxHeight = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         bodyTexts));
         var toBoxBody = A2(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2"
         ,_0: maxWidth
         ,_1: maxHeight},
         bodyStyling);
         var rawElemBody = A2(List.map,
         function (_v31) {
            return function () {
               switch (_v31.ctor)
               {case "_Tuple2": return {_: {}
                                       ,animation: _v31._1
                                       ,element: A2(scaleElem,
                                       w,
                                       placement)(_v31._0)};}
               _E.Case($moduleName,
               "between lines 151 and 152");
            }();
         },
         A2(List.zip,
         A2(List.map,
         toBoxBody,
         bodyTexts),
         A2(List.map,
         function (_) {
            return _.animation;
         },
         naiveFrameBox.body)));
         var firstElem = List.isEmpty(rawElemBody) ? Graphics.Element.empty : function (_) {
            return _.element;
         }(List.head(rawElemBody));
         var otherLife = function () {
            var _v35 = naiveFrameBox.otherLife;
            switch (_v35)
            {case "covered":
               return A2(Graphics.Element.spacer,
                 Graphics.Element.widthOf(firstElem),
                 Graphics.Element.heightOf(firstElem));
               case "dead":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 158 and 161");
         }();
         return {_: {}
                ,body: rawElemBody
                ,containerColumn: naiveFrameBox.layout.containerColumn
                ,inColumnnPos: _L.fromArray([naiveFrameBox.layout.inColumnnPos])
                ,otherLife: otherLife};
      }();
   });
   var blockToRawColumnContent = F4(function (theme,
   w,
   placement,
   naiveBlock) {
      return function () {
         var bodyStyling = _U.eq(naiveBlock.isAlerted,
         "true") ? A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "alertedblock"
         ,_1: "none"},
         theme.style) : A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "block"
         ,_1: "none"},
         theme.style);
         var toBodyText = A2(Builders.ElementMaker.buildSlateText,
         theme.style,
         bodyStyling);
         var bodyTexts = A2(List.map,
         toBodyText,
         naiveBlock.body);
         var maxHeight = List.isEmpty(bodyTexts) ? 0 : List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         bodyTexts));
         var titleStyling = _U.eq(naiveBlock.isAlerted,
         "true") ? A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "blocktitle"
         ,_1: "alertedblock"},
         theme.style) : A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "blocktitle"
         ,_1: "block"},
         theme.style);
         var titleText = A2(Builders.ElementMaker.buildText,
         titleStyling,
         naiveBlock.title);
         var maxWidth = List.isEmpty(bodyTexts) ? Graphics.Element.widthOf(titleText) : A2(Basics.max,
         Graphics.Element.widthOf(titleText),
         List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         bodyTexts)));
         var toBlockBody = A2(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2"
         ,_0: maxWidth
         ,_1: maxHeight},
         bodyStyling);
         var title = A3(Builders.ElementMaker.buildCompleteElement,
         {ctor: "_Tuple2"
         ,_0: maxWidth
         ,_1: Graphics.Element.heightOf(titleText)},
         titleStyling,
         titleText);
         var rawElemBody = A2(List.map,
         function (_v36) {
            return function () {
               switch (_v36.ctor)
               {case "_Tuple2": return {_: {}
                                       ,animation: _v36._1
                                       ,element: A2(scaleElem,
                                       w,
                                       placement)(A2(Graphics.Element.flow,
                                       Graphics.Element.down,
                                       _L.fromArray([title
                                                    ,_v36._0])))};}
               _E.Case($moduleName,
               "between lines 122 and 123");
            }();
         },
         A2(List.zip,
         A2(List.map,
         toBlockBody,
         bodyTexts),
         A2(List.map,
         function (_) {
            return _.animation;
         },
         naiveBlock.body)));
         var firstElem = List.isEmpty(rawElemBody) ? Graphics.Element.empty : function (_) {
            return _.element;
         }(List.head(rawElemBody));
         var otherLife = function () {
            var _v40 = naiveBlock.otherLife;
            switch (_v40)
            {case "covered":
               return A2(Graphics.Element.spacer,
                 Graphics.Element.widthOf(firstElem),
                 Graphics.Element.heightOf(firstElem));
               case "dead":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 129 and 132");
         }();
         return {_: {}
                ,body: rawElemBody
                ,containerColumn: naiveBlock.layout.containerColumn
                ,inColumnnPos: _L.fromArray([naiveBlock.layout.inColumnnPos])
                ,otherLife: otherLife};
      }();
   });
   var toSupportbinSlide = F3(function (theme,
   w,
   naiveSupportbin) {
      return function () {
         var slatelistToRaw = function (naive) {
            return A4(listToRawColumnContent,
            theme,
            w,
            Graphics.Element.middle,
            naive);
         };
         var simplify = function (raw) {
            return List.isEmpty(raw.body) ? Graphics.Element.empty : function (_) {
               return _.element;
            }(List.head(raw.body));
         };
         var blockToRaw = function (naive) {
            return simplify(A4(blockToRawColumnContent,
            theme,
            w,
            Graphics.Element.middle,
            naive));
         };
         var blockList = A2(List.map,
         blockToRaw,
         naiveSupportbin.slideContent.blocks);
         var textboxToRaw = function (naive) {
            return simplify(A4(simpleTextBoxToRawColumnContent,
            theme,
            w,
            Graphics.Element.middle,
            naive));
         };
         var textboxList = A2(List.map,
         textboxToRaw,
         naiveSupportbin.slideContent.simpletextboxes);
         var framboxToRaw = function (naive) {
            return simplify(A4(frameboxToRawColumnContent,
            theme,
            w,
            Graphics.Element.middle,
            naive));
         };
         var frameboxList = A2(List.map,
         framboxToRaw,
         naiveSupportbin.slideContent.frameboxes);
         var imageboxToRaw = function (naive) {
            return simplify(A4(imageboxToRawColumnContent,
            theme,
            w,
            Graphics.Element.middle,
            naive));
         };
         var imageboxList = A2(List.map,
         imageboxToRaw,
         naiveSupportbin.slideContent.imageboxes);
         var smartlistToRaw = function (naive) {
            return simplify(A3(smartListToRawColumnContent,
            w,
            Graphics.Element.middle,
            naive));
         };
         var rawSmartList = A2(List.map,
         smartlistToRaw,
         naiveSupportbin.slideContent.smartLists);
         var slatelistList = List.map(function (x) {
            return Graphics.Element.flow(Graphics.Element.down)(A2(List.map,
            simplify,
            x));
         })(A2(List.map,
         slatelistToRaw,
         naiveSupportbin.slideContent.slateLists));
         var elementList = _L.append(blockList,
         _L.append(textboxList,
         _L.append(frameboxList,
         _L.append(imageboxList,
         _L.append(slatelistList,
         rawSmartList)))));
         return {_: {}
                ,content: elementList
                ,supportbinId: naiveSupportbin.id};
      }();
   });
   var toSupportbinContent = F3(function (naiveSupportbinList,
   theme,
   w) {
      return A2(List.map,
      A2(toSupportbinSlide,theme,w),
      naiveSupportbinList);
   });
   var toContentSlide = F3(function (theme,
   w,
   naiveSlide) {
      return function () {
         var cols = A2(List.map,
         processColumnInfo(w),
         naiveSlide.columns);
         var getCol = function (id) {
            return List.head(A2(List.filter,
            function (x) {
               return _U.eq(x.id,id);
            },
            cols));
         };
         var getColWidth = function (id) {
            return Basics.truncate(function (_) {
               return _.width;
            }(getCol(id)));
         };
         var slatelistToRaw = function (naive) {
            return A4(listToRawColumnContent,
            theme,
            getColWidth(naive.layout.containerColumn),
            Graphics.Element.midLeft,
            naive);
         };
         var rawSlatelistList = A2(List.concatMap,
         slatelistToRaw,
         naiveSlide.slideContent.slateLists);
         var getColPlacement = function (id) {
            return function (_) {
               return _.placement;
            }(getCol(id));
         };
         var blockToRaw = function (naive) {
            return A4(blockToRawColumnContent,
            theme,
            getColWidth(naive.layout.containerColumn),
            getColPlacement(naive.layout.containerColumn),
            naive);
         };
         var rawBlockList = A2(List.map,
         blockToRaw,
         naiveSlide.slideContent.blocks);
         var textboxToRaw = function (naive) {
            return A4(simpleTextBoxToRawColumnContent,
            theme,
            getColWidth(naive.layout.containerColumn),
            getColPlacement(naive.layout.containerColumn),
            naive);
         };
         var rawTextboxList = A2(List.map,
         textboxToRaw,
         naiveSlide.slideContent.simpletextboxes);
         var framboxToRaw = function (naive) {
            return A4(frameboxToRawColumnContent,
            theme,
            getColWidth(naive.layout.containerColumn),
            getColPlacement(naive.layout.containerColumn),
            naive);
         };
         var rawFrameboxList = A2(List.map,
         framboxToRaw,
         naiveSlide.slideContent.frameboxes);
         var imageboxToRaw = function (naive) {
            return A4(imageboxToRawColumnContent,
            theme,
            getColWidth(naive.layout.containerColumn),
            getColPlacement(naive.layout.containerColumn),
            naive);
         };
         var rawImageboxList = A2(List.map,
         imageboxToRaw,
         naiveSlide.slideContent.imageboxes);
         var smartlistToRaw = function (naive) {
            return A3(smartListToRawColumnContent,
            getColWidth(naive.layout.containerColumn),
            getColPlacement(naive.layout.containerColumn),
            naive);
         };
         var rawSmartList = A2(List.map,
         smartlistToRaw,
         naiveSlide.slideContent.smartLists);
         var rawList = _L.append(rawBlockList,
         _L.append(rawTextboxList,
         _L.append(rawFrameboxList,
         _L.append(rawImageboxList,
         _L.append(rawSlatelistList,
         rawSmartList)))));
         var partitionedList = A2(Utils.Content.rawColumnContentToColumnContent,
         rawList,
         List.length(cols));
         var slateCol = List.map(function (_v41) {
            return function () {
               switch (_v41.ctor)
               {case "_Tuple2": return {_: {}
                                       ,colAlign: _v41._0
                                       ,content: _v41._1};}
               _E.Case($moduleName,
               "on line 49, column 34 to 58");
            }();
         })(A2(List.zip,
         A2(List.map,
         function (_) {
            return _.colAlign;
         },
         cols),
         partitionedList));
         return {_: {}
                ,partOf: getRoute(naiveSlide.partOf)
                ,quiz: naiveSlide.quiz
                ,slideContent: slateCol
                ,slideId: naiveSlide.id
                ,slideType: getSlideType(naiveSlide.slideType)
                ,subtitle: naiveSlide.slideSubtitle
                ,supportbin: naiveSlide.supportbin
                ,title: naiveSlide.slideTitle};
      }();
   });
   var toContent = F3(function (naiveSlideList,
   theme,
   w) {
      return A2(List.map,
      A2(toContentSlide,theme,w),
      naiveSlideList);
   });
   _elm.PreProcess.ContentMaker.values = {_op: _op
                                         ,toContent: toContent
                                         ,toContentSlide: toContentSlide
                                         ,toSupportbinContent: toSupportbinContent
                                         ,toSupportbinSlide: toSupportbinSlide
                                         ,blockToRawColumnContent: blockToRawColumnContent
                                         ,frameboxToRawColumnContent: frameboxToRawColumnContent
                                         ,simpleTextBoxToRawColumnContent: simpleTextBoxToRawColumnContent
                                         ,imageboxToRawColumnContent: imageboxToRawColumnContent
                                         ,processImageOptions: processImageOptions
                                         ,smartListToRawColumnContent: smartListToRawColumnContent
                                         ,processItems: processItems
                                         ,getSDType: getSDType
                                         ,listToRawColumnContent: listToRawColumnContent
                                         ,getItemStyling: getItemStyling
                                         ,getItemMarkerStyling: getItemMarkerStyling
                                         ,getSlideType: getSlideType
                                         ,getRoute: getRoute
                                         ,scaleElem: scaleElem
                                         ,processColumnInfo: processColumnInfo};
   return _elm.PreProcess.ContentMaker.values;
};Elm.Builders = Elm.Builders || {};
Elm.Builders.ElementMaker = Elm.Builders.ElementMaker || {};
Elm.Builders.ElementMaker.make = function (_elm) {
   "use strict";
   _elm.Builders = _elm.Builders || {};
   _elm.Builders.ElementMaker = _elm.Builders.ElementMaker || {};
   if (_elm.Builders.ElementMaker.values)
   return _elm.Builders.ElementMaker.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Builders.ElementMaker";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Content = Elm.Utils.Content.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var drawFill = F3(function (w,
   h,
   fill) {
      return function () {
         var solidFrame = function (f) {
            return A3(Graphics.Collage.collage,
            w,
            h,
            _L.fromArray([f]));
         };
         var frame = A2(Graphics.Collage.rect,
         Basics.toFloat(w),
         Basics.toFloat(h));
         return function () {
            switch (fill.ctor)
            {case "Grad":
               return solidFrame(A2(Graphics.Collage.gradient,
                 fill._0,
                 frame));
               case "SingleColored":
               return solidFrame(A2(Graphics.Collage.filled,
                 fill._0,
                 frame));
               case "Transparent":
               return A2(Graphics.Element.spacer,
                 w,
                 h);}
            _E.Case($moduleName,
            "between lines 87 and 90");
         }();
      }();
   });
   var buildCanvas = F4(function (w,
   h,
   borderstyle,
   fillstyle) {
      return function () {
         var filled = A3(drawFill,
         w,
         h,
         fillstyle);
         var bordered = function () {
            switch (borderstyle.ctor)
            {case "Border":
               return function () {
                    var newHeight = Basics.toFloat(h) - borderstyle._0.width;
                    var newWidth = Basics.toFloat(w) - borderstyle._0.width;
                    return A3(Graphics.Collage.collage,
                    w,
                    h,
                    _L.fromArray([A2(Graphics.Collage.outlined,
                    borderstyle._0,
                    A2(Graphics.Collage.rect,
                    newWidth,
                    newHeight))]));
                 }();
               case "None":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 95 and 106");
         }();
         return Graphics.Element.layers(_L.fromArray([filled
                                                     ,bordered]));
      }();
   });
   var buildPadding = F3(function (w,
   h,
   padding) {
      return function () {
         var singlePad = F2(function (posPad,
         pad) {
            return A4(Graphics.Element.container,
            w,
            h,
            posPad,
            pad);
         });
         var leftPad = singlePad(Graphics.Element.topLeft)(A3(drawFill,
         padding.left.thickness,
         h,
         padding.left.fillcolor));
         var rightPad = singlePad(Graphics.Element.topRight)(A3(drawFill,
         padding.right.thickness,
         h,
         padding.right.fillcolor));
         var topPad = singlePad(Graphics.Element.midTop)(A3(drawFill,
         w,
         padding.top.thickness,
         padding.top.fillcolor));
         var bottomPad = singlePad(Graphics.Element.midBottom)(A3(drawFill,
         w,
         padding.bottom.thickness,
         padding.bottom.fillcolor));
         return Graphics.Element.layers(_L.fromArray([leftPad
                                                     ,rightPad
                                                     ,topPad
                                                     ,bottomPad]));
      }();
   });
   var buildCompleteElement = F3(function (_v6,
   styling,
   elem) {
      return function () {
         switch (_v6.ctor)
         {case "_Tuple2":
            return function () {
                 var positionedElem = A4(Graphics.Element.container,
                 _v6._0,
                 _v6._1,
                 Graphics.Element.middle,
                 elem);
                 var borderThickness = function () {
                    var _v10 = styling.border;
                    switch (_v10.ctor)
                    {case "Border":
                       return Basics.truncate(_v10._0.width);
                       case "None": return 0;}
                    _E.Case($moduleName,
                    "between lines 138 and 141");
                 }();
                 var bPad = styling.padding.bottom.thickness;
                 var tPad = styling.padding.top.thickness;
                 var withPadHeight = _v6._1 + tPad + bPad;
                 var totalHeight = withPadHeight + borderThickness * 2;
                 var relativePadTopPos = Basics.toFloat(borderThickness) / Basics.toFloat(totalHeight);
                 var relativeElementTopPos = relativePadTopPos + Basics.toFloat(tPad) / Basics.toFloat(totalHeight);
                 var rPad = styling.padding.right.thickness;
                 var lPad = styling.padding.left.thickness;
                 var withPadWidth = _v6._0 + lPad + rPad;
                 var totalWidth = withPadWidth + borderThickness * 2;
                 var relativePadLeftPos = Basics.toFloat(borderThickness) / Basics.toFloat(totalWidth);
                 var canvas = A4(buildCanvas,
                 totalWidth,
                 totalHeight,
                 styling.border,
                 styling.background);
                 var padding = A3(buildPadding,
                 withPadWidth,
                 withPadHeight,
                 styling.padding);
                 var placedPadding = A4(Graphics.Element.container,
                 totalWidth,
                 totalHeight,
                 A2(Graphics.Element.topLeftAt,
                 Graphics.Element.relative(relativePadLeftPos),
                 Graphics.Element.relative(relativePadTopPos)),
                 padding);
                 var textWidth = withPadWidth - lPad - rPad;
                 var relativeElementLeftPos = relativePadLeftPos + Basics.toFloat(lPad) / Basics.toFloat(totalWidth);
                 var placedElem = A4(Graphics.Element.container,
                 totalWidth,
                 totalHeight,
                 A2(Graphics.Element.topLeftAt,
                 Graphics.Element.relative(relativeElementLeftPos),
                 Graphics.Element.relative(relativeElementTopPos)),
                 positionedElem);
                 return Graphics.Element.layers(_L.fromArray([canvas
                                                             ,placedPadding
                                                             ,placedElem]));
              }();}
         _E.Case($moduleName,
         "between lines 134 and 167");
      }();
   });
   var buildTabbedElement = F5(function (_v12,
   level,
   offset,
   marker,
   item) {
      return function () {
         switch (_v12.ctor)
         {case "_Tuple2":
            return function () {
                 var markerWidth = Graphics.Element.widthOf(marker);
                 var offsetWidth = offset;
                 var emptySpacerWidth = markerWidth + offsetWidth;
                 var remainingWidth = _v12._0 - level * emptySpacerWidth;
                 var resizedElem = A3(Graphics.Collage.collage,
                 remainingWidth,
                 _v12._1,
                 _L.fromArray([Graphics.Collage.scale(Basics.toFloat(remainingWidth) / Basics.toFloat(Graphics.Element.widthOf(item)))(Graphics.Collage.toForm(item))]));
                 var emptySpacer = Graphics.Element.opacity(0)(A2(Graphics.Element.spacer,
                 (level - 1) * emptySpacerWidth,
                 _v12._1));
                 return A3(Graphics.Element.container,
                 _v12._0,
                 _v12._1,
                 Graphics.Element.middle)(A2(Graphics.Element.flow,
                 Graphics.Element.right,
                 _L.fromArray([emptySpacer
                              ,A4(Graphics.Element.container,
                              markerWidth,
                              _v12._1,
                              Graphics.Element.midTop,
                              marker)
                              ,A2(Graphics.Element.spacer,
                              offsetWidth,
                              _v12._1)
                              ,resizedElem])));
              }();}
         _E.Case($moduleName,
         "between lines 63 and 78");
      }();
   });
   var buildSlateText = F3(function (styleInfo,
   styling,
   slateText) {
      return function () {
         var partNStyleList = A2(List.zip,
         slateText.parts,
         slateText.inlinestyle);
         var group = F2(function (partNStyle,
         partList) {
            return A2(String.startsWith,
            "\n",
            Basics.fst(partNStyle)) ? _L.append(partList,
            _L.fromArray([_L.fromArray([partNStyle])])) : function () {
               var newLast = _L.append(List.last(partList),
               _L.fromArray([partNStyle]));
               var newListInitial = A2(List.take,
               List.length(partList) - 1,
               partList);
               return _L.append(newListInitial,
               _L.fromArray([newLast]));
            }();
         });
         var groupedList = A2(List.foldl,
         group,
         _L.fromArray([_L.fromArray([List.head(partNStyleList)])]))(List.tail(partNStyleList));
         var applyEffect = F2(function (effect,
         txt) {
            return function () {
               switch (effect)
               {case "bold":
                  return Text.bold(txt);
                  case "italic":
                  return Text.italic(txt);
                  case "underline":
                  return A2(Text.line,
                    Text.Under,
                    txt);}
               return txt;
            }();
         });
         var coloredStyling = function (c) {
            return A2(Utils.Theme.setTextColor,
            styling,
            c);
         };
         var highlightStying = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "highlight"
         ,_1: "none"},
         styleInfo);
         var alertStying = A2(Utils.Content.getStyling,
         {ctor: "_Tuple2"
         ,_0: "alert"
         ,_1: "none"},
         styleInfo);
         var inlineStyleToStyle = function (str) {
            return function () {
               switch (str)
               {case "alert":
                  return alertStying;
                  case "bold": return styling;
                  case "highlight":
                  return highlightStying;
                  case "italic": return styling;
                  case "normal": return styling;
                  case "underline":
                  return styling;}
               return coloredStyling(Utils.Naive.processColor(str));
            }();
         };
         var partToElem = function (partNStyle) {
            return styling.text.align(applyEffect(Basics.snd(partNStyle))(A2(Text.style,
            function (_) {
               return _.style;
            }(function (_) {
               return _.text;
            }(inlineStyleToStyle(Basics.snd(partNStyle)))),
            Text.toText(Basics.fst(partNStyle)))));
         };
         return List.isEmpty(slateText.parts) ? Graphics.Element.empty : Graphics.Element.flow(Graphics.Element.down)(A2(List.map,
         function (x) {
            return Graphics.Element.flow(Graphics.Element.right)(A2(List.map,
            partToElem,
            x));
         },
         groupedList));
      }();
   });
   var buildText = F2(function (styling,
   s) {
      return function () {
         var styledText = styling.text.align(Text.style(styling.text.style)(Text.toText(s)));
         return styledText;
      }();
   });
   var buildSymbol = F3(function (symbolStyle,
   symbolSizing,
   tex) {
      return function () {
         var normalStyle = symbolStyle.general;
         var h = symbolSizing.height;
         var floatHeight = Basics.toFloat(h) * symbolSizing.coverage;
         var w = symbolSizing.width;
         var floatWidth = Basics.toFloat(w) * symbolSizing.coverage;
         var getShapeFrame = function () {
            var _v18 = symbolStyle.symbolShape;
            switch (_v18.ctor)
            {case "Circle":
               return Graphics.Collage.circle(floatHeight);
               case "Rectangle":
               return A2(Graphics.Collage.rect,
                 floatWidth,
                 floatHeight);
               case "Square":
               return A2(Graphics.Collage.rect,
                 floatHeight,
                 floatHeight);
               case "Tick":
               return A2(Graphics.Collage.rect,
                 2,
                 floatHeight);
               case "Triangle":
               return A2(Graphics.Collage.ngon,
                 3,
                 floatHeight);}
            _E.Case($moduleName,
            "between lines 179 and 185");
         }();
         var getShape = function () {
            var _v19 = symbolStyle.symbolFill;
            switch (_v19.ctor)
            {case "Grad":
               return A2(Graphics.Collage.gradient,
                 _v19._0,
                 getShapeFrame);
               case "SingleColored":
               return A2(Graphics.Collage.filled,
                 _v19._0,
                 getShapeFrame);
               case "Transparent":
               return A2(Graphics.Collage.outlined,
                 Graphics.Collage.solid(normalStyle.text.style.color),
                 getShapeFrame);}
            _E.Case($moduleName,
            "between lines 185 and 190");
         }();
         var markerSymbol = A3(Graphics.Collage.collage,
         w,
         h,
         _L.fromArray([getShape]));
         var markerText = function () {
            switch (tex.ctor)
            {case "Just":
               return function () {
                    var textElem = A2(buildText,
                    normalStyle,
                    tex._0);
                    return A3(Graphics.Collage.collage,
                    w,
                    h,
                    _L.fromArray([Graphics.Collage.scale(floatHeight / Basics.toFloat(Graphics.Element.heightOf(textElem)))(Graphics.Collage.toForm(textElem))]));
                 }();
               case "Nothing":
               return Graphics.Element.empty;}
            _E.Case($moduleName,
            "between lines 191 and 199");
         }();
         var marker = A2(buildCompleteElement,
         {ctor: "_Tuple2",_0: w,_1: h},
         normalStyle)(Graphics.Element.layers(_L.fromArray([markerSymbol
                                                           ,markerText])));
         return A2(Graphics.Element.opacity,
         symbolStyle.symbolAlpha,
         marker);
      }();
   });
   _elm.Builders.ElementMaker.values = {_op: _op
                                       ,buildText: buildText
                                       ,buildSlateText: buildSlateText
                                       ,buildTabbedElement: buildTabbedElement
                                       ,drawFill: drawFill
                                       ,buildCanvas: buildCanvas
                                       ,buildPadding: buildPadding
                                       ,buildCompleteElement: buildCompleteElement
                                       ,buildSymbol: buildSymbol};
   return _elm.Builders.ElementMaker.values;
};Elm.PreProcess = Elm.PreProcess || {};
Elm.PreProcess.ThemeMaker = Elm.PreProcess.ThemeMaker || {};
Elm.PreProcess.ThemeMaker.make = function (_elm) {
   "use strict";
   _elm.PreProcess = _elm.PreProcess || {};
   _elm.PreProcess.ThemeMaker = _elm.PreProcess.ThemeMaker || {};
   if (_elm.PreProcess.ThemeMaker.values)
   return _elm.PreProcess.ThemeMaker.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "PreProcess.ThemeMaker";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var PreProcess = PreProcess || {};
   PreProcess.RawThemeMaker = Elm.PreProcess.RawThemeMaker.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.BaseMapping = Elm.Themes.BaseMapping.make(_elm);
   var Themes = Themes || {};
   Themes.GetTheme = Elm.Themes.GetTheme.make(_elm);
   var Themes = Themes || {};
   Themes.SizeSettings = Elm.Themes.SizeSettings.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var naiveToThemeSection = function (naiveSection) {
      return _U.insert("route",
      List.map(Utils.Naive.toConcreteInt)(A2(String.split,
      ".",
      naiveSection.id)),
      _U.remove("id",naiveSection));
   };
   var toTheme = function (themeInfo) {
      return function () {
         var symbolSizeInfo = Themes.SizeSettings.symbolSizeInfo;
         var componentSizeInfo = Themes.SizeSettings.componentSizeInfo;
         var baseMapping = Themes.BaseMapping.mapping;
         var normalFontSize = Utils.Theme.getNormalFontSize;
         var fonts = function () {
            var _v0 = themeInfo.themes.font;
            switch (_v0.ctor)
            {case "::": switch (_v0._0)
                 {case "": switch (_v0._1.ctor)
                      {case "[]":
                         return _L.fromArray(["Times New Roman"
                                             ,"serif"]);}
                      break;}
                 break;}
            return themeInfo.themes.font;
         }();
         var styleTheme = Themes.GetTheme.style(themeInfo.themes.style);
         var layoutTheme = Themes.GetTheme.layout(themeInfo.themes.layout);
         var layoutInfo = Basics.fst(layoutTheme);
         var mergedLayoutInfo = A2(PreProcess.RawThemeMaker.applyLayout,
         themeInfo,
         layoutInfo);
         var mappingAfterLayout = Utils.Theme.updateMapping(baseMapping)(Basics.snd(layoutTheme));
         var rawTemplateDict = PreProcess.RawThemeMaker.applyTemplate(themeInfo);
         var rawParentDict = PreProcess.RawThemeMaker.applyTheme(themeInfo);
         var styleInfo = A4(styleTheme,
         fonts,
         normalFontSize,
         rawParentDict,
         mappingAfterLayout);
         var mergedStyleInfo = {_: {}
                               ,inner: A2(Utils.Theme.mergeWithRaw,
                               rawTemplateDict,
                               styleInfo.inner)
                               ,outer: A2(Utils.Theme.mergeWithRaw,
                               rawTemplateDict,
                               styleInfo.outer)
                               ,slideBackground: styleInfo.slideBackground
                               ,symbol: A2(Utils.Theme.mergeSymbolWithRaw,
                               rawTemplateDict,
                               styleInfo.symbol)};
         var styleInfoAfterFontSize = A2(Utils.Theme.adjustFontSize,
         Themes.SizeSettings.changeFontSizingList,
         mergedStyleInfo);
         return {_: {}
                ,componentSize: componentSizeInfo
                ,layout: mergedLayoutInfo
                ,style: styleInfoAfterFontSize
                ,symbolSize: symbolSizeInfo};
      }();
   };
   _elm.PreProcess.ThemeMaker.values = {_op: _op
                                       ,toTheme: toTheme
                                       ,naiveToThemeSection: naiveToThemeSection};
   return _elm.PreProcess.ThemeMaker.values;
};Elm.PreProcess = Elm.PreProcess || {};
Elm.PreProcess.RawThemeMaker = Elm.PreProcess.RawThemeMaker || {};
Elm.PreProcess.RawThemeMaker.make = function (_elm) {
   "use strict";
   _elm.PreProcess = _elm.PreProcess || {};
   _elm.PreProcess.RawThemeMaker = _elm.PreProcess.RawThemeMaker || {};
   if (_elm.PreProcess.RawThemeMaker.values)
   return _elm.PreProcess.RawThemeMaker.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "PreProcess.RawThemeMaker";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Naive = Elm.Types.Naive.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var _op = {};
   var defaultToc = {_: {}
                    ,currentSection: Types.Theme.Show
                    ,currentSubsectionOfCurrentSection: Types.Theme.Show
                    ,otherSection: Types.Theme.Hide
                    ,otherSubsectionOfCurrentSection: Types.Theme.Shade
                    ,pauseSections: false
                    ,pauseSubsections: false
                    ,subsectionOfOtherSection: Types.Theme.Hide};
   var processTocString = function (str) {
      return function () {
         var sectionStyleList = function (sec) {
            return A2(String.split,
            "!",
            sec);
         };
         var value = function (opt) {
            return List.head(List.tail(A2(String.split,
            "=",
            opt)));
         };
         var parameter = function (opt) {
            return List.head(A2(String.split,
            "=",
            opt));
         };
         var getTocBool = function (boolStr) {
            return function () {
               switch (boolStr)
               {case "false": return false;
                  case "true": return true;}
               _E.Case($moduleName,
               "between lines 485 and 488");
            }();
         };
         var getTocStyle = function (styleStr) {
            return function () {
               switch (styleStr)
               {case "hide":
                  return Types.Theme.Hide;
                  case "shaded":
                  return Types.Theme.Shade;
                  case "show":
                  return Types.Theme.Show;}
               _E.Case($moduleName,
               "between lines 481 and 485");
            }();
         };
         var updateToc = F2(function (opt,
         oldToc) {
            return function () {
               var _v2 = parameter(opt);
               switch (_v2)
               {case "pausesections":
                  return _U.replace([["pauseSections"
                                     ,getTocBool(value(opt))]],
                    oldToc);
                  case "pausesubsections":
                  return _U.replace([["pauseSubsections"
                                     ,getTocBool(value(opt))]],
                    oldToc);
                  case "sectionstyle":
                  return function () {
                       var secStyles = sectionStyleList(value(opt));
                       return _U.replace([["currentSection"
                                          ,getTocStyle(List.head(secStyles))]
                                         ,["otherSection"
                                          ,getTocStyle(List.last(secStyles))]],
                       oldToc);
                    }();
                  case "subsectionstyle":
                  return function () {
                       var subsecStyles = sectionStyleList(value(opt));
                       return _U.replace([["currentSubsectionOfCurrentSection"
                                          ,getTocStyle(List.head(subsecStyles))]
                                         ,["otherSubsectionOfCurrentSection"
                                          ,getTocStyle(List.head(List.tail(subsecStyles)))]
                                         ,["subsectionOfOtherSection"
                                          ,getTocStyle(List.last(subsecStyles))]],
                       oldToc);
                    }();}
               _E.Case($moduleName,
               "between lines 493 and 504");
            }();
         });
         var options = A2(String.split,
         "-",
         str);
         return List.isEmpty(options) ? defaultToc : A3(List.foldl,
         updateToc,
         defaultToc,
         options);
      }();
   };
   var processInsertInfo = function (naiveInsertInfo) {
      return {_: {}
             ,column: naiveInsertInfo.columnid
             ,id: naiveInsertInfo.name};
   };
   var processColumnInfo = function (naiveColumnInfo) {
      return {_: {}
             ,colAlign: function () {
                var _v4 = naiveColumnInfo.columnAlign;
                switch (_v4)
                {case "b":
                   return Types.Theme.BottomAlign;
                   case "c":
                   return Types.Theme.CenterAlign;
                   case "t":
                   return Types.Theme.TopAlign;}
                _E.Case($moduleName,
                "between lines 445 and 449");
             }()
             ,id: naiveColumnInfo.id
             ,placement: function () {
                var _v3 = naiveColumnInfo.inColumnAlign;
                switch (_v3)
                {case "center":
                   return Graphics.Element.middle;
                   case "left":
                   return Graphics.Element.midLeft;
                   case "right":
                   return Graphics.Element.midRight;}
                _E.Case($moduleName,
                "between lines 441 and 445");
             }()
             ,width: Utils.Naive.toConcreteFloat(naiveColumnInfo.width)};
   };
   var getLayoutDetails = function (naiveTemplateLayout) {
      return {_: {}
             ,columns: A2(List.map,
             processColumnInfo,
             naiveTemplateLayout.columns)
             ,inserts: A2(List.map,
             processInsertInfo,
             naiveTemplateLayout.inserts)};
   };
   var getLayout = function (naiveTemplateLayout) {
      return List.isEmpty(naiveTemplateLayout.inserts) ? Types.Theme.Empty : Types.Theme.Layout(getLayoutDetails(naiveTemplateLayout));
   };
   var getSectionSlideLayout = function (naiveTemplateLayout) {
      return function () {
         var getTocString = function (insInfo) {
            return A2(String.contains,
            ":",
            insInfo.name) ? List.head(List.tail(A2(String.split,
            ":",
            insInfo.name))) : "";
         };
         var oldInserts = naiveTemplateLayout.inserts;
         var processToc = function () {
            var _v5 = A2(List.filter,
            function (x) {
               return !_U.eq(x,"");
            },
            A2(List.map,
            getTocString,
            oldInserts));
            switch (_v5.ctor)
            {case "[]": return defaultToc;}
            return processTocString(List.head(_v5));
         }();
         var getNewInsertInfo = function (insertInfo) {
            return function () {
               var _v6 = insertInfo.name;
               switch (_v6)
               {case "image":
                  return insertInfo;
                  case "section":
                  return insertInfo;
                  case "subsection":
                  return insertInfo;}
               return _U.replace([["name"
                                  ,"toc"]],
               insertInfo);
            }();
         };
         var modifiedNaive = _U.replace([["inserts"
                                         ,A2(List.map,
                                         getNewInsertInfo,
                                         oldInserts)]],
         naiveTemplateLayout);
         var processSlideLayout = getLayout(modifiedNaive);
         return {ctor: "_Tuple2"
                ,_0: processSlideLayout
                ,_1: processToc};
      }();
   };
   var applyLayout = F2(function (themeInfo,
   layoutInfo) {
      return function () {
         var toLayout = F2(function (naiveLayout,
         oldLayout) {
            return function () {
               var _v7 = naiveLayout.id;
               switch (_v7)
               {case "atbeginsectionslide":
                  return _U.replace([["atBeginSectionSlide"
                                     ,getSectionSlideLayout(naiveLayout)]],
                    oldLayout);
                  case "atbeginsubsectionslide":
                  return _U.replace([["atBeginSubsectionSlide"
                                     ,getSectionSlideLayout(naiveLayout)]],
                    oldLayout);
                  case "footline":
                  return _U.replace([["footline"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "headline":
                  return _U.replace([["headline"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "leftsidebar":
                  return _U.replace([["leftSidebar"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "modechangesymbols":
                  return _U.replace([["modechangeSymbols"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "navigationalsymbols":
                  return _U.replace([["navigationalSymbols"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "rightsidebar":
                  return _U.replace([["rightSidebar"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "titleslide":
                  return _U.replace([["titleSlide"
                                     ,getLayout(naiveLayout)]],
                    oldLayout);
                  case "tocslide":
                  return _U.replace([["tocSlide"
                                     ,getSectionSlideLayout(naiveLayout)]],
                    oldLayout);}
               _E.Case($moduleName,
               "between lines 419 and 432");
            }();
         });
         return A3(List.foldr,
         toLayout,
         layoutInfo,
         themeInfo.templateLayout);
      }();
   });
   var convertShape = function (shp) {
      return function () {
         switch (shp)
         {case "": return Maybe.Nothing;
            case "circle":
            return Maybe.Just(Types.Theme.Circle);
            case "rectangle":
            return Maybe.Just(Types.Theme.Rectangle);
            case "square":
            return Maybe.Just(Types.Theme.Square);
            case "tick":
            return Maybe.Just(Types.Theme.Tick);
            case "triangle":
            return Maybe.Just(Types.Theme.Triangle);}
         _E.Case($moduleName,
         "between lines 397 and 403");
      }();
   };
   var convertAlpha = function (alpha) {
      return function () {
         switch (alpha)
         {case "": return Maybe.Nothing;}
         return Maybe.Just(Utils.Naive.toConcreteFloat(alpha));
      }();
   };
   var processPadThickness = F2(function (canvas,
   rawpad) {
      return function () {
         var convertThickness = function (pad) {
            return function () {
               switch (pad)
               {case "": return Maybe.Nothing;
                  case "medium":
                  return Maybe.Just(15);
                  case "thick":
                  return Maybe.Just(20);
                  case "thin":
                  return Maybe.Just(10);}
               return Maybe.Just(Utils.Naive.toConcreteInt(pad));
            }();
         };
         return _U.replace([["leftThick"
                            ,convertThickness(canvas.leftpadding)]
                           ,["rightThick"
                            ,convertThickness(canvas.rightpadding)]
                           ,["bottomThick"
                            ,convertThickness(canvas.bottompadding)]
                           ,["topThick"
                            ,convertThickness(canvas.toppadding)]],
         rawpad);
      }();
   });
   var processFontColor = F2(function (colorinfo,
   raw) {
      return function () {
         var convertFontColor = function () {
            var _v11 = colorinfo.fg;
            switch (_v11)
            {case "": return Maybe.Nothing;}
            return Maybe.Just(Utils.Naive.processColor(_v11));
         }();
         return _U.replace([["fontColor"
                            ,convertFontColor]],
         raw);
      }();
   });
   var processFont = F2(function (fontinfo,
   raw) {
      return function () {
         var convertFamily = function () {
            var _v12 = fontinfo.family;
            switch (_v12)
            {case "": return Maybe.Nothing;}
            return Maybe.Just(_L.fromArray([_v12]));
         }();
         var convertAlign = function () {
            var _v13 = fontinfo.align;
            switch (_v13)
            {case "": return Maybe.Nothing;
               case "center":
               return Maybe.Just(Text.centered);
               case "justify":
               return Maybe.Just(Text.justified);
               case "left":
               return Maybe.Just(Text.leftAligned);
               case "right":
               return Maybe.Just(Text.leftAligned);}
            _E.Case($moduleName,
            "between lines 341 and 347");
         }();
         var convertShapeBold = function () {
            var _v14 = fontinfo.shape;
            switch (_v14)
            {case "": return Maybe.Nothing;
               case "bold":
               return Maybe.Just(true);
               case "bolditalic":
               return Maybe.Just(true);
               case "italic":
               return Maybe.Nothing;
               case "normal":
               return Maybe.Just(false);}
            _E.Case($moduleName,
            "between lines 334 and 341");
         }();
         var convertShapeItalic = function () {
            var _v15 = fontinfo.shape;
            switch (_v15)
            {case "": return Maybe.Nothing;
               case "bold":
               return Maybe.Nothing;
               case "bolditalic":
               return Maybe.Just(true);
               case "italic":
               return Maybe.Just(true);
               case "normal":
               return Maybe.Just(false);}
            _E.Case($moduleName,
            "between lines 328 and 334");
         }();
         var convertSize = function () {
            var _v16 = fontinfo.size;
            switch (_v16)
            {case "": return Maybe.Nothing;
               case "footnotsize":
               return Maybe.Just(Types.Theme.FootnoteSize);
               case "huge":
               return Maybe.Just(Types.Theme.Huge);
               case "large":
               return Maybe.Just(Types.Theme.Large);
               case "normalsize":
               return Maybe.Just(Types.Theme.NormalSize);
               case "scriptsize":
               return Maybe.Just(Types.Theme.ScriptSize);
               case "small":
               return Maybe.Just(Types.Theme.Small);
               case "tiny":
               return Maybe.Just(Types.Theme.Tiny);
               case "veryLarge":
               return Maybe.Just(Types.Theme.VeryLarge);
               case "verysmall":
               return Maybe.Just(Types.Theme.VerySmall);}
            _E.Case($moduleName,
            "between lines 317 and 328");
         }();
         return _U.replace([["font"
                            ,convertFamily]
                           ,["fontSize",convertSize]
                           ,["fontBold",convertShapeBold]
                           ,["fontItalic"
                            ,convertShapeItalic]
                           ,["fontAlign",convertAlign]],
         raw);
      }();
   });
   var processBorderFromColor = F2(function (colorinfo,
   raw) {
      return function () {
         var convertBorderColor = function () {
            var _v17 = colorinfo.border;
            switch (_v17)
            {case "": return Maybe.Nothing;}
            return Maybe.Just(Utils.Naive.processColor(_v17));
         }();
         return _U.replace([["borderColor"
                            ,convertBorderColor]],
         raw);
      }();
   });
   var processBorderFromCanvas = F2(function (canvas,
   raw) {
      return function () {
         var convertBorderDashing = function () {
            var _v18 = canvas.borderstyle;
            switch (_v18)
            {case "": return Maybe.Nothing;
               case "dashed":
               return Maybe.Just(_L.fromArray([8
                                              ,4]));
               case "dotted":
               return Maybe.Just(_L.fromArray([3
                                              ,3]));
               case "solid":
               return Maybe.Just(_L.fromArray([]));}
            _E.Case($moduleName,
            "between lines 291 and 297");
         }();
         var convertBorderWidth = function () {
            var _v19 = canvas.border;
            switch (_v19)
            {case "": return Maybe.Nothing;
               case "medium":
               return Maybe.Just(2);
               case "none":
               return Maybe.Just(0);
               case "thick":
               return Maybe.Just(3);
               case "thin":
               return Maybe.Just(1);}
            return Maybe.Just(Utils.Naive.toConcreteFloat(_v19));
         }();
         return _U.replace([["borderWidth"
                            ,convertBorderWidth]
                           ,["borderDashing"
                            ,convertBorderDashing]],
         raw);
      }();
   });
   var processGradient = function (str) {
      return function () {
         var toColorPoint = function (s) {
            return function () {
               var separated = A2(String.split,
               "-",
               s);
               var point = Utils.Naive.toConcreteFloat(List.head(separated));
               var color = Utils.Naive.processColor(List.last(separated));
               return {ctor: "_Tuple2"
                      ,_0: point
                      ,_1: color};
            }();
         };
         var substrList = A2(String.split,
         "!",
         str);
         var direction = List.head(List.tail(substrList));
         var endPos = function () {
            switch (direction)
            {case "horizontal":
               return {ctor: "_Tuple2"
                      ,_0: 50
                      ,_1: 50};
               case "vertical":
               return {ctor: "_Tuple2"
                      ,_0: 50
                      ,_1: 50};}
            _E.Case($moduleName,
            "between lines 256 and 259");
         }();
         var colorPoints = A2(List.map,
         toColorPoint,
         A2(List.drop,2,substrList));
         return A2(Types.Theme.Grad,
         A3(Color.linear,
         {ctor: "_Tuple2",_0: 0,_1: 0},
         endPos,
         colorPoints),
         Basics.snd(List.head(colorPoints)));
      }();
   };
   var processFill = function (str) {
      return _U.eq(str,
      "") ? Maybe.Nothing : A2(String.startsWith,
      "grad",
      str) ? Maybe.Just(processGradient(str)) : _U.eq(str,
      "transparent") ? Maybe.Just(Types.Theme.Transparent) : Maybe.Just(Types.Theme.SingleColored(Utils.Naive.processColor(str)));
   };
   var processPadColor = F2(function (colorinfo,
   rawpad) {
      return _U.replace([["leftColor"
                         ,processFill(colorinfo.leftpadding)]
                        ,["rightColor"
                         ,processFill(colorinfo.rightpadding)]
                        ,["topColor"
                         ,processFill(colorinfo.toppadding)]
                        ,["bottomColor"
                         ,processFill(colorinfo.bottompadding)]],
      rawpad);
   });
   var processOptions = F2(function (opt,
   raw) {
      return function () {
         var _v21 = opt.option;
         switch (_v21)
         {case "alpha":
            return _U.replace([["shapeAlpha"
                               ,convertAlpha(opt.value)]],
              raw);
            case "fill":
            return _U.replace([["shapeFill"
                               ,processFill(opt.value)]],
              raw);
            case "shape":
            return _U.replace([["shape"
                               ,convertShape(opt.value)]],
              raw);}
         _E.Case($moduleName,
         "between lines 407 and 410");
      }();
   });
   var parentList = _L.fromArray(["Outer"
                                 ,"Inner"
                                 ,"OuterElements"
                                 ,"InnerElements"
                                 ,"TitleLike"
                                 ,"NormalText"
                                 ,"AlertText"
                                 ,"HighlightText"
                                 ,"Item"
                                 ,"Subitem"
                                 ,"Subsubitem"
                                 ,"ItemProjection"
                                 ,"SubitemProjection"
                                 ,"SubsubitemProjection"]);
   var rawParentList = A2(List.zip,
   parentList,
   A2(List.repeat,
   List.length(parentList),
   Types.Intermediate.NoChange));
   var rawParentDict = Dict.fromList(rawParentList);
   var defaultRawPad = {_: {}
                       ,bottomColor: Maybe.Nothing
                       ,bottomThick: Maybe.Nothing
                       ,leftColor: Maybe.Nothing
                       ,leftThick: Maybe.Nothing
                       ,rightColor: Maybe.Nothing
                       ,rightThick: Maybe.Nothing
                       ,topColor: Maybe.Nothing
                       ,topThick: Maybe.Nothing};
   var defaultRaw = {_: {}
                    ,bg: Maybe.Nothing
                    ,borderColor: Maybe.Nothing
                    ,borderDashing: Maybe.Nothing
                    ,borderWidth: Maybe.Nothing
                    ,font: Maybe.Nothing
                    ,fontAlign: Maybe.Nothing
                    ,fontBold: Maybe.Nothing
                    ,fontColor: Maybe.Nothing
                    ,fontItalic: Maybe.Nothing
                    ,fontSize: Maybe.Nothing
                    ,padding: Maybe.Nothing
                    ,shape: Maybe.Nothing
                    ,shapeAlpha: Maybe.Nothing
                    ,shapeFill: Maybe.Nothing};
   var applyCanvas = F2(function (templateList,
   rawParentDict) {
      return function () {
         var updateCanvas = F2(function (templateCanvas,
         rawDict) {
            return function () {
               var options = templateCanvas.options;
               var canvas = templateCanvas.canvas;
               var parentId = templateCanvas.id;
               var rawFromDict = A2(Dict.getOrFail,
               parentId,
               rawDict);
               var raw = function () {
                  switch (rawFromDict.ctor)
                  {case "NewStyle":
                     return rawFromDict._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 78 and 81");
               }();
               var modifiedRaw = A2(processBorderFromCanvas,
               canvas,
               raw);
               var paddedRaw = function () {
                  var _v24 = modifiedRaw.padding;
                  switch (_v24.ctor)
                  {case "Just":
                     return _U.replace([["padding"
                                        ,Maybe.Just(A2(processPadThickness,
                                        canvas,
                                        _v24._0))]],
                       modifiedRaw);
                     case "Nothing":
                     return function () {
                          var thickPad = A2(processPadThickness,
                          canvas,
                          defaultRawPad);
                          return _U.eq(thickPad,
                          defaultRawPad) ? modifiedRaw : _U.replace([["padding"
                                                                     ,Maybe.Just(thickPad)]],
                          modifiedRaw);
                       }();}
                  _E.Case($moduleName,
                  "between lines 84 and 94");
               }();
               var optionModifiedRaw = A3(List.foldr,
               processOptions,
               paddedRaw,
               options);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(optionModifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 95 and 98");
                  }();
               };
               return A3(Dict.update,
               parentId,
               set,
               rawDict);
            }();
         });
         return A3(List.foldr,
         updateCanvas,
         rawParentDict,
         templateList);
      }();
   });
   var applyColor = F2(function (templateList,
   rawParentDict) {
      return function () {
         var updateColor = F2(function (templateColor,
         rawDict) {
            return function () {
               var options = templateColor.options;
               var colorInfo = templateColor.colorInfo;
               var parentId = templateColor.id;
               var rawFromDict = A2(Dict.getOrFail,
               parentId,
               rawDict);
               var raw = function () {
                  switch (rawFromDict.ctor)
                  {case "NewStyle":
                     return rawFromDict._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 109 and 112");
               }();
               var modifiedRaw = processBorderFromColor(colorInfo)(processFontColor(colorInfo)(_U.replace([["bg"
                                                                                                           ,processFill(colorInfo.bg)]],
               raw)));
               var paddedRaw = function () {
                  var _v30 = modifiedRaw.padding;
                  switch (_v30.ctor)
                  {case "Just":
                     return _U.replace([["padding"
                                        ,Maybe.Just(A2(processPadColor,
                                        colorInfo,
                                        _v30._0))]],
                       modifiedRaw);
                     case "Nothing":
                     return function () {
                          var coloredPad = A2(processPadColor,
                          colorInfo,
                          defaultRawPad);
                          return _U.eq(coloredPad,
                          defaultRawPad) ? modifiedRaw : _U.replace([["padding"
                                                                     ,Maybe.Just(coloredPad)]],
                          modifiedRaw);
                       }();}
                  _E.Case($moduleName,
                  "between lines 118 and 128");
               }();
               var optionModifiedRaw = A3(List.foldr,
               processOptions,
               paddedRaw,
               options);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(optionModifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 129 and 132");
                  }();
               };
               return A3(Dict.update,
               parentId,
               set,
               rawDict);
            }();
         });
         return A3(List.foldr,
         updateColor,
         rawParentDict,
         templateList);
      }();
   });
   var applyFont = F2(function (templateList,
   rawParentDict) {
      return function () {
         var updateFont = F2(function (templateFont,
         rawDict) {
            return function () {
               var fontInfo = templateFont.fontInfo;
               var parentId = templateFont.id;
               var rawFromDict = A2(Dict.getOrFail,
               parentId,
               rawDict);
               var raw = function () {
                  switch (rawFromDict.ctor)
                  {case "NewStyle":
                     return rawFromDict._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 143 and 146");
               }();
               var modifiedRaw = A2(processFont,
               fontInfo,
               raw);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(modifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 148 and 151");
                  }();
               };
               return A3(Dict.update,
               parentId,
               set,
               rawDict);
            }();
         });
         return A3(List.foldr,
         updateFont,
         rawParentDict,
         templateList);
      }();
   });
   var applyTheme = function (themeInfo) {
      return applyFont(themeInfo.guidingFonts)(applyColor(themeInfo.guidingColors)(A2(applyCanvas,
      themeInfo.guidingCanvas,
      rawParentDict)));
   };
   var applyTemplateCanvas = F2(function (templateList,
   rawTemplateDict) {
      return function () {
         var updateCanvas = F2(function (templateCanvas,
         rawDict) {
            return function () {
               var options = templateCanvas.options;
               var canvas = templateCanvas.canvas;
               var templateId = {ctor: "_Tuple2"
                                ,_0: templateCanvas.id
                                ,_1: templateCanvas.container};
               var updatedRawDict = function () {
                  var _v38 = A2(Dict.get,
                  templateId,
                  rawDict);
                  switch (_v38.ctor)
                  {case "Just": return rawDict;
                     case "Nothing":
                     return A3(Dict.insert,
                       templateId,
                       Types.Intermediate.NoChange,
                       rawDict);}
                  _E.Case($moduleName,
                  "between lines 163 and 166");
               }();
               var raw = function () {
                  var _v40 = A2(Dict.getOrFail,
                  templateId,
                  updatedRawDict);
                  switch (_v40.ctor)
                  {case "NewStyle":
                     return _v40._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 166 and 169");
               }();
               var modifiedRaw = A2(processBorderFromCanvas,
               canvas,
               raw);
               var paddedRaw = function () {
                  var _v42 = modifiedRaw.padding;
                  switch (_v42.ctor)
                  {case "Just":
                     return _U.replace([["padding"
                                        ,Maybe.Just(A2(processPadThickness,
                                        canvas,
                                        _v42._0))]],
                       modifiedRaw);
                     case "Nothing":
                     return function () {
                          var thickPad = A2(processPadThickness,
                          canvas,
                          defaultRawPad);
                          return _U.eq(thickPad,
                          defaultRawPad) ? modifiedRaw : _U.replace([["padding"
                                                                     ,Maybe.Just(thickPad)]],
                          modifiedRaw);
                       }();}
                  _E.Case($moduleName,
                  "between lines 172 and 182");
               }();
               var optionModifiedRaw = A3(List.foldr,
               processOptions,
               paddedRaw,
               options);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(optionModifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 183 and 186");
                  }();
               };
               return A3(Dict.update,
               templateId,
               set,
               updatedRawDict);
            }();
         });
         return A3(List.foldr,
         updateCanvas,
         rawTemplateDict,
         templateList);
      }();
   });
   var applyTemplateColor = F2(function (templateList,
   rawTemplateDict) {
      return function () {
         var updateColor = F2(function (templateColor,
         rawDict) {
            return function () {
               var options = templateColor.options;
               var colorInfo = templateColor.colorInfo;
               var templateId = {ctor: "_Tuple2"
                                ,_0: templateColor.id
                                ,_1: templateColor.container};
               var updatedRawDict = function () {
                  var _v46 = A2(Dict.get,
                  templateId,
                  rawDict);
                  switch (_v46.ctor)
                  {case "Just": return rawDict;
                     case "Nothing":
                     return A3(Dict.insert,
                       templateId,
                       Types.Intermediate.NoChange,
                       rawDict);}
                  _E.Case($moduleName,
                  "between lines 196 and 199");
               }();
               var raw = function () {
                  var _v48 = A2(Dict.getOrFail,
                  templateId,
                  updatedRawDict);
                  switch (_v48.ctor)
                  {case "NewStyle":
                     return _v48._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 199 and 202");
               }();
               var modifiedRaw = processBorderFromColor(colorInfo)(processFontColor(colorInfo)(_U.replace([["bg"
                                                                                                           ,processFill(colorInfo.bg)]],
               raw)));
               var paddedRaw = function () {
                  var _v50 = modifiedRaw.padding;
                  switch (_v50.ctor)
                  {case "Just":
                     return _U.replace([["padding"
                                        ,Maybe.Just(A2(processPadColor,
                                        colorInfo,
                                        _v50._0))]],
                       modifiedRaw);
                     case "Nothing":
                     return function () {
                          var coloredPad = A2(processPadColor,
                          colorInfo,
                          defaultRawPad);
                          return _U.eq(coloredPad,
                          defaultRawPad) ? modifiedRaw : _U.replace([["padding"
                                                                     ,Maybe.Just(coloredPad)]],
                          modifiedRaw);
                       }();}
                  _E.Case($moduleName,
                  "between lines 208 and 218");
               }();
               var optionModifiedRaw = A3(List.foldr,
               processOptions,
               paddedRaw,
               options);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(optionModifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 219 and 222");
                  }();
               };
               return A3(Dict.update,
               templateId,
               set,
               updatedRawDict);
            }();
         });
         return A3(List.foldr,
         updateColor,
         rawTemplateDict,
         templateList);
      }();
   });
   var applyTemplateFont = F2(function (templateList,
   rawTemplateDict) {
      return function () {
         var updateFont = F2(function (templateFont,
         rawDict) {
            return function () {
               var fontInfo = templateFont.fontInfo;
               var templateId = {ctor: "_Tuple2"
                                ,_0: templateFont.id
                                ,_1: templateFont.container};
               var updatedRawDict = function () {
                  var _v54 = A2(Dict.get,
                  templateId,
                  rawDict);
                  switch (_v54.ctor)
                  {case "Just": return rawDict;
                     case "Nothing":
                     return A3(Dict.insert,
                       templateId,
                       Types.Intermediate.NoChange,
                       rawDict);}
                  _E.Case($moduleName,
                  "between lines 231 and 234");
               }();
               var raw = function () {
                  var _v56 = A2(Dict.getOrFail,
                  templateId,
                  updatedRawDict);
                  switch (_v56.ctor)
                  {case "NewStyle":
                     return _v56._0;
                     case "NoChange":
                     return defaultRaw;}
                  _E.Case($moduleName,
                  "between lines 234 and 237");
               }();
               var modifiedRaw = A2(processFont,
               fontInfo,
               raw);
               var set = function (oldRaw) {
                  return function () {
                     switch (oldRaw.ctor)
                     {case "Just":
                        return Maybe.Just(Types.Intermediate.NewStyle(modifiedRaw));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 239 and 242");
                  }();
               };
               return A3(Dict.update,
               templateId,
               set,
               updatedRawDict);
            }();
         });
         return A3(List.foldr,
         updateFont,
         rawTemplateDict,
         templateList);
      }();
   });
   var applyTemplate = function (themeInfo) {
      return applyTemplateFont(themeInfo.templateFonts)(applyTemplateColor(themeInfo.templateColors)(A2(applyTemplateCanvas,
      themeInfo.templateCanvas,
      Dict.empty)));
   };
   _elm.PreProcess.RawThemeMaker.values = {_op: _op
                                          ,defaultRaw: defaultRaw
                                          ,defaultRawPad: defaultRawPad
                                          ,parentList: parentList
                                          ,rawParentList: rawParentList
                                          ,rawParentDict: rawParentDict
                                          ,applyTheme: applyTheme
                                          ,applyTemplate: applyTemplate
                                          ,applyCanvas: applyCanvas
                                          ,applyColor: applyColor
                                          ,applyFont: applyFont
                                          ,applyTemplateCanvas: applyTemplateCanvas
                                          ,applyTemplateColor: applyTemplateColor
                                          ,applyTemplateFont: applyTemplateFont
                                          ,processGradient: processGradient
                                          ,processFill: processFill
                                          ,processBorderFromCanvas: processBorderFromCanvas
                                          ,processBorderFromColor: processBorderFromColor
                                          ,processFont: processFont
                                          ,processFontColor: processFontColor
                                          ,processPadThickness: processPadThickness
                                          ,processPadColor: processPadColor
                                          ,convertAlpha: convertAlpha
                                          ,convertShape: convertShape
                                          ,processOptions: processOptions
                                          ,applyLayout: applyLayout
                                          ,processColumnInfo: processColumnInfo
                                          ,processInsertInfo: processInsertInfo
                                          ,getLayoutDetails: getLayoutDetails
                                          ,getLayout: getLayout
                                          ,defaultToc: defaultToc
                                          ,processTocString: processTocString
                                          ,getSectionSlideLayout: getSectionSlideLayout};
   return _elm.PreProcess.RawThemeMaker.values;
};Elm.SmartDisplay = Elm.SmartDisplay || {};
Elm.SmartDisplay.SmartList = Elm.SmartDisplay.SmartList || {};
Elm.SmartDisplay.SmartList.make = function (_elm) {
   "use strict";
   _elm.SmartDisplay = _elm.SmartDisplay || {};
   _elm.SmartDisplay.SmartList = _elm.SmartDisplay.SmartList || {};
   if (_elm.SmartDisplay.SmartList.values)
   return _elm.SmartDisplay.SmartList.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "SmartDisplay.SmartList";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.SmartDisplay = Elm.Types.SmartDisplay.make(_elm);
   var Utils = Utils || {};
   Utils.SmartDisplay = Elm.Utils.SmartDisplay.make(_elm);
   var _op = {};
   var getSmartDisplayFL = function (naive) {
      return function () {
         var level2ToText = function (itmList) {
            return A2(List.map,
            function (itm) {
               return Text.justified(Text.height(22)(Text.toText(itm.body)));
            },
            itmList);
         };
         var level1ToText = function (itmList) {
            return A2(List.map,
            function (x) {
               return Text.justified(Text.bold(Text.height(24)(Text.toText(x.body))));
            },
            itmList);
         };
         var w = naive.width - 8;
         var bodyW = w - 20;
         var headingW = w - 40;
         var items = naive.items;
         var level1texts = level1ToText(Utils.SmartDisplay.filterOutItems(items));
         var numLevel1Items = List.length(level1texts);
         var maxHHeading = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level1texts)) + 8;
         var headingBase = Utils.SmartDisplay.getBlockHeading({ctor: "_Tuple2"
                                                              ,_0: headingW
                                                              ,_1: maxHHeading});
         var headingHinBody = Basics.truncate(Basics.toFloat(maxHHeading + 8) / 2);
         var level1TextBlocks = A2(List.map,
         function (x) {
            return Graphics.Element.layers(_L.fromArray([headingBase
                                                        ,A4(Graphics.Element.container,
                                                        headingW,
                                                        maxHHeading,
                                                        A2(Graphics.Element.topLeftAt,
                                                        Graphics.Element.absolute(8),
                                                        Graphics.Element.absolute(4)),
                                                        x)]));
         },
         level1texts);
         var level2Items = A2(List.map,
         function (x) {
            return A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
            _L.fromArray([x]),
            items);
         },
         _L.range(1,numLevel1Items));
         var level2Texts = A2(List.map,
         level2ToText,
         level2Items);
         var bulletedLevel2Text = function () {
            var makeBullet = function (x) {
               return A2(List.map,
               Utils.SmartDisplay.insertBullet,
               x);
            };
            return A2(List.map,
            makeBullet,
            level2Texts);
         }();
         var level3Texts = A2(List.map,
         function (x) {
            return A2(List.map,
            function (y) {
               return level2ToText(A2(Utils.SmartDisplay.filterOutSubsubitemsOfSubitem,
               y.route,
               items));
            },
            x);
         },
         level2Items);
         var bulletedLevel3Text = function () {
            var makeBullet = function (x) {
               return A2(List.map,
               List.map(Utils.SmartDisplay.insertSubBullet),
               x);
            };
            return A2(List.map,
            makeBullet,
            level3Texts);
         }();
         var level3TextBlocks = A2(List.map,
         function (x) {
            return A2(List.map,
            function (y) {
               return A2(Graphics.Element.flow,
               Graphics.Element.down,
               y);
            },
            x);
         },
         bulletedLevel3Text);
         var level2TextBlocks = List.map(function (x) {
            return A4(Graphics.Element.container,
            w,
            Graphics.Element.heightOf(x) + 16 + headingHinBody,
            A2(Graphics.Element.topLeftAt,
            Graphics.Element.absolute(20),
            Graphics.Element.absolute(headingHinBody + 2)),
            x);
         })(List.map(Graphics.Element.flow(Graphics.Element.down))(List.map(function (x) {
            return A2(List.map,
            function (_v4) {
               return function () {
                  switch (_v4.ctor)
                  {case "_Tuple2":
                     return A2(Graphics.Element.flow,
                       Graphics.Element.down,
                       _L.fromArray([_v4._0,_v4._1]));}
                  _E.Case($moduleName,
                  "on line 311, column 59 to 77");
               }();
            },
            x);
         })(List.map(function (_v0) {
            return function () {
               switch (_v0.ctor)
               {case "_Tuple2":
                  return A2(List.zip,
                    _v0._0,
                    _v0._1);}
               _E.Case($moduleName,
               "on line 312, column 58 to 73");
            }();
         })(A2(List.zip,
         A2(List.map,
         function (x) {
            return A2(List.map,
            function (y) {
               return A4(Graphics.Element.container,
               bodyW,
               Graphics.Element.heightOf(y),
               Graphics.Element.midLeft,
               y);
            },
            x);
         },
         bulletedLevel2Text),
         A2(List.map,
         function (x) {
            return A2(List.map,
            function (y) {
               return A4(Graphics.Element.container,
               bodyW,
               Graphics.Element.heightOf(y),
               Graphics.Element.midLeft,
               y);
            },
            x);
         },
         level3TextBlocks))))));
         var $final = Graphics.Element.flow(Graphics.Element.down)(List.intersperse(A2(Graphics.Element.spacer,
         w,
         10))(List.map(function (_v8) {
            return function () {
               switch (_v8.ctor)
               {case "_Tuple2":
                  return Graphics.Element.layers(_L.fromArray([A4(Graphics.Element.container,
                                                              w,
                                                              Graphics.Element.heightOf(_v8._1) + (Graphics.Element.heightOf(_v8._0) / 2 | 0),
                                                              A2(Graphics.Element.topLeftAt,
                                                              Graphics.Element.absolute(0),
                                                              Graphics.Element.absolute(Graphics.Element.heightOf(_v8._0) / 2 | 0)),
                                                              _v8._1)
                                                              ,A4(Graphics.Element.container,
                                                              w,
                                                              Graphics.Element.heightOf(_v8._1) + (Graphics.Element.heightOf(_v8._0) / 2 | 0),
                                                              Graphics.Element.midTop,
                                                              _v8._0)]));}
               _E.Case($moduleName,
               "between lines 318 and 319");
            }();
         })(A2(List.zip,
         A2(List.map,
         function (x) {
            return A4(Graphics.Element.container,
            w,
            Graphics.Element.heightOf(x),
            A2(Graphics.Element.topLeftAt,
            Graphics.Element.absolute(30),
            Graphics.Element.absolute(0)),
            x);
         },
         level1TextBlocks),
         A2(List.map,
         function (x) {
            return Graphics.Element.layers(_L.fromArray([Utils.SmartDisplay.getFrameBody({ctor: "_Tuple2"
                                                                                         ,_0: w
                                                                                         ,_1: Graphics.Element.heightOf(x)})
                                                        ,x]));
         },
         level2TextBlocks)))));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayCL = function (naive) {
      return function () {
         var level2ToTypeNText = function (itmList) {
            return function () {
               var blockType = function (itm) {
                  return A2(String.startsWith,
                  "!",
                  itm.body);
               };
               var getStr = function (str) {
                  return A2(String.startsWith,
                  "!",
                  str) ? A2(String.dropLeft,
                  1,
                  str) : str;
               };
               var change = function (itm) {
                  return Text.centered(Text.toText(getStr(itm.body)));
               };
               return A2(List.map,
               function (itm) {
                  return {ctor: "_Tuple2"
                         ,_0: blockType(itm)
                         ,_1: change(itm)};
               },
               itmList);
            }();
         };
         var level1ToText = function (itmList) {
            return A2(List.map,
            function (x) {
               return Text.centered(Text.height(18)(Text.bold(Text.toText(x.body))));
            },
            itmList);
         };
         var w = naive.width;
         var items = naive.items;
         var level1texts = level1ToText(Utils.SmartDisplay.filterOutItems(items));
         var numLevel1Items = List.length(level1texts);
         var maxHHeading = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level1texts)) + 10;
         var level2TypeNText = A2(List.map,
         function (x) {
            return level2ToTypeNText(A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
            _L.fromArray([x]),
            items));
         },
         _L.range(1,numLevel1Items));
         var level2Texts = A2(List.concatMap,
         function (x) {
            return A2(List.map,
            Basics.snd,
            x);
         },
         level2TypeNText);
         var maxW = List.maximum(List.map(Graphics.Element.widthOf)(level2Texts));
         var blockW = maxW + 4;
         var maxWHeading = A2(Basics.max,
         List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         level1texts)),
         blockW);
         var level1Blocks = A2(List.map,
         function (x) {
            return A4(Graphics.Element.container,
            maxWHeading + 4,
            maxHHeading + 4,
            Graphics.Element.middle,
            x);
         },
         level1texts);
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level2Texts));
         var blockH = maxH + 4;
         var innerBlock = A3(Graphics.Element.container,
         blockW + 8,
         blockH + 8,
         Graphics.Element.middle)(Utils.SmartDisplay.getBlockBody({ctor: "_Tuple2"
                                                                  ,_0: blockW
                                                                  ,_1: blockH}));
         var placeText = function (_v12) {
            return function () {
               switch (_v12.ctor)
               {case "_Tuple2":
                  return function () {
                       var blo = _v12._0 ? Graphics.Element.opacity(0.4)(Graphics.Element.color(Color.blue)(innerBlock)) : innerBlock;
                       return Graphics.Element.layers(_L.fromArray([blo
                                                                   ,A4(Graphics.Element.container,
                                                                   Graphics.Element.widthOf(blo),
                                                                   Graphics.Element.heightOf(blo),
                                                                   Graphics.Element.middle,
                                                                   _v12._1)]));
                    }();}
               _E.Case($moduleName,
               "between lines 245 and 250");
            }();
         };
         var level2Blocks = A2(List.map,
         function (x) {
            return Graphics.Element.flow(Graphics.Element.down)(List.intersperse(A2(Graphics.Element.spacer,
            blockW,
            10))(A2(List.map,placeText,x)));
         },
         level2TypeNText);
         var maxHLevel2 = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level2Blocks));
         var outerBase = Graphics.Element.opacity(0.2)(Utils.SmartDisplay.getBlockHeading({ctor: "_Tuple2"
                                                                                          ,_0: maxWHeading + 8
                                                                                          ,_1: maxHLevel2 + maxHHeading + 8}));
         var inOuterBlock = A3(Graphics.Element.container,
         Graphics.Element.widthOf(outerBase) + 4,
         Graphics.Element.heightOf(outerBase) + 4,
         Graphics.Element.midTop);
         var $final = Graphics.Element.flow(Graphics.Element.right)(List.intersperse(A2(Graphics.Element.spacer,
         4,
         Graphics.Element.heightOf(outerBase)))(List.map(function (_v16) {
            return function () {
               switch (_v16.ctor)
               {case "_Tuple2":
                  return Graphics.Element.layers(_L.fromArray([inOuterBlock(outerBase)
                                                              ,inOuterBlock(A2(Graphics.Element.flow,
                                                              Graphics.Element.down,
                                                              _L.fromArray([_v16._0
                                                                           ,A4(Graphics.Element.container,
                                                                           Graphics.Element.widthOf(_v16._0),
                                                                           Graphics.Element.heightOf(_v16._1),
                                                                           Graphics.Element.middle,
                                                                           _v16._1)])))]));}
               _E.Case($moduleName,
               "between lines 261 and 263");
            }();
         })(A2(List.zip,
         level1Blocks,
         level2Blocks))));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayCC = function (naive) {
      return function () {
         var level2ToText = function (itmList) {
            return A2(List.map,
            function (itm) {
               return Text.justified(Text.height(24)(Text.toText(itm.body)));
            },
            itmList);
         };
         var level1ToText = function (itmList) {
            return A2(List.map,
            function (x) {
               return Text.centered(Text.bold(Text.height(26)(Text.toText(x.body))));
            },
            itmList);
         };
         var w = naive.width;
         var items = naive.items;
         var level1texts = level1ToText(Utils.SmartDisplay.filterOutItems(items));
         var numLevel1Items = List.length(level1texts);
         var maxHHeading = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level1texts)) + 8;
         var level2Texts = A2(List.map,
         function (x) {
            return level2ToText(A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
            _L.fromArray([x]),
            items));
         },
         _L.range(1,numLevel1Items));
         var bulletedLevel2Text = function () {
            var makeBullet = function (x) {
               return A2(List.map,
               Utils.SmartDisplay.insertCheckbox,
               x);
            };
            return A2(List.map,
            makeBullet,
            level2Texts);
         }();
         var maxW = List.maximum(List.map(Graphics.Element.widthOf)(_L.append(level1texts,
         List.concat(bulletedLevel2Text))));
         var blockW = maxW + 16;
         var dividingBar = A3(Graphics.Element.container,
         blockW,
         24,
         Graphics.Element.middle)(Graphics.Element.layers(_L.fromArray([Utils.SmartDisplay.getBlockHeading({ctor: "_Tuple2"
                                                                                                           ,_0: blockW
                                                                                                           ,_1: 20})
                                                                       ,A4(Graphics.Element.container,
                                                                       blockW,
                                                                       20,
                                                                       Graphics.Element.bottomLeft,
                                                                       Utils.SmartDisplay.checkbox)])));
         var level2TextBlocks = A2(List.map,
         Graphics.Element.flow(Graphics.Element.down),
         bulletedLevel2Text);
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level2TextBlocks));
         var blockH = maxH + 4;
         var $final = Graphics.Element.flow(Graphics.Element.right)(List.map(function (_v20) {
            return function () {
               switch (_v20.ctor)
               {case "_Tuple2":
                  return A2(Graphics.Element.flow,
                    Graphics.Element.down,
                    _L.fromArray([_v20._0
                                 ,dividingBar
                                 ,_v20._1]));}
               _E.Case($moduleName,
               "on line 207, column 34 to 63");
            }();
         })(A2(List.zip,
         A2(List.map,
         function (x) {
            return A4(Graphics.Element.container,
            blockW,
            maxHHeading,
            Graphics.Element.middle,
            x);
         },
         level1texts),
         A2(List.map,
         function (x) {
            return A4(Graphics.Element.container,
            blockW,
            maxH,
            Graphics.Element.topLeft,
            x);
         },
         level2TextBlocks))));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayPL = function (naive) {
      return function () {
         var level2ToText = function (itmList) {
            return A2(List.map,
            function (itm) {
               return Text.justified(Text.height(22)(Text.toText(itm.body)));
            },
            itmList);
         };
         var level1ToText = function (itm) {
            return function () {
               switch (itm.ctor)
               {case "Just":
                  return Text.centered(Text.height(26)(Text.bold(Text.toText(A2(String.join,
                    "\n",
                    String.words(itm._0.body))))));
                  case "Nothing":
                  return Graphics.Element.empty;}
               _E.Case($moduleName,
               "between lines 150 and 154");
            }();
         };
         var w = naive.width;
         var items = naive.items;
         var level1text = level1ToText(A2(Utils.SmartDisplay.getItemAt,
         1,
         items));
         var level2Texts = level2ToText(A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
         _L.fromArray([1]),
         items));
         var maxW = List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         level2Texts));
         var blockW = maxW + 16;
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level2Texts));
         var blockH = maxH + 16;
         var blockBase = A3(Graphics.Element.container,
         blockW,
         blockH,
         Graphics.Element.middle);
         var blocks = Graphics.Element.flow(Graphics.Element.down)(List.intersperse(Graphics.Element.opacity(0.7)(Utils.SmartDisplay.getHorizontalDivider(blockW)))(A2(List.map,
         function (x) {
            return A4(Graphics.Element.container,
            blockW,
            blockH,
            Graphics.Element.middle,
            x);
         },
         level2Texts)));
         var artHeading = function () {
            var headH = Graphics.Element.heightOf(blocks);
            var headW = Graphics.Element.widthOf(level1text) + 8;
            return A4(Graphics.Element.container,
            headW,
            headH,
            Graphics.Element.midTop,
            level1text);
         }();
         var finalBlock = A2(Graphics.Element.flow,
         Graphics.Element.right,
         _L.fromArray([artHeading
                      ,blocks]));
         var startBar = A3(Graphics.Element.container,
         Graphics.Element.widthOf(finalBlock),
         16,
         Graphics.Element.middle)(Utils.SmartDisplay.getHorizontalDivider(Graphics.Element.widthOf(finalBlock)));
         var $final = A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([startBar
                      ,finalBlock]));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayPM = function (naive) {
      return function () {
         var symbolDimension = 40;
         var plus = A2(Graphics.Element.fittedImage,
         symbolDimension,
         symbolDimension)(Utils.SmartDisplay.getImage("plus"));
         var minus = A3(Graphics.Element.container,
         symbolDimension,
         symbolDimension,
         Graphics.Element.middle)(A2(Graphics.Element.fittedImage,
         symbolDimension,
         10)(Utils.SmartDisplay.getImage("minus")));
         var level2ToText = function (itmList) {
            return A2(List.map,
            function (itm) {
               return Text.justified(Text.height(24)(Text.toText(itm.body)));
            },
            itmList);
         };
         var level1ToText = function (itm) {
            return function () {
               switch (itm.ctor)
               {case "Just":
                  return Text.centered(Text.height(30)(Text.bold(Text.toText(itm._0.body))));
                  case "Nothing":
                  return Graphics.Element.empty;}
               _E.Case($moduleName,
               "between lines 100 and 103");
            }();
         };
         var w = naive.width;
         var items = naive.items;
         var level1text = level1ToText(A2(Utils.SmartDisplay.getItemAt,
         1,
         items));
         var level2Texts = A2(List.map,
         function (x) {
            return level2ToText(A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
            _L.fromArray([x]),
            items));
         },
         _L.fromArray([1,2]));
         var bulletedLevel2Text = function () {
            var makeBullet = function (x) {
               return _U.eq(List.length(x),
               1) ? x : A2(List.map,
               Utils.SmartDisplay.insertBullet,
               x);
            };
            return A2(List.map,
            makeBullet,
            level2Texts);
         }();
         var maxW = List.maximum(List.map(Graphics.Element.widthOf)({ctor: "::"
                                                                    ,_0: level1text
                                                                    ,_1: List.concat(bulletedLevel2Text)}));
         var blockW = maxW + 10;
         var level2TextBlocks = A2(List.map,
         Graphics.Element.flow(Graphics.Element.down),
         bulletedLevel2Text);
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         level2TextBlocks));
         var blockH = maxH + 20;
         var blockBase = Utils.SmartDisplay.getBlockBody({ctor: "_Tuple2"
                                                         ,_0: blockW
                                                         ,_1: blockH});
         var blocks = Graphics.Element.flow(Graphics.Element.right)(List.intersperse(Utils.SmartDisplay.getVerticalDivider(blockH))(List.map(function (x) {
            return Graphics.Element.layers(_L.fromArray([blockBase
                                                        ,A4(Graphics.Element.container,
                                                        blockW,
                                                        blockH,
                                                        Graphics.Element.middle,
                                                        x)]));
         })(level2TextBlocks)));
         var artHeading = _U.eq(Graphics.Element.widthOf(level1text),
         0) ? Graphics.Element.empty : function () {
            var headH = Graphics.Element.heightOf(level1text) + 20;
            var headW = Graphics.Element.widthOf(blocks);
            return Graphics.Element.layers(_L.fromArray([Utils.SmartDisplay.getBlockHeading({ctor: "_Tuple2"
                                                                                            ,_0: headW
                                                                                            ,_1: headH})
                                                        ,A4(Graphics.Element.container,
                                                        headW,
                                                        headH,
                                                        Graphics.Element.middle,
                                                        level1text)]));
         }();
         var finalBlock = A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([artHeading
                      ,blocks]));
         var finalContainer = A2(Graphics.Element.container,
         Graphics.Element.widthOf(finalBlock) + symbolDimension,
         Graphics.Element.heightOf(finalBlock) + symbolDimension);
         var $final = Graphics.Element.layers(_L.fromArray([A2(finalContainer,
                                                           Graphics.Element.middle,
                                                           finalBlock)
                                                           ,A2(finalContainer,
                                                           Graphics.Element.topLeft,
                                                           plus)
                                                           ,A2(finalContainer,
                                                           Graphics.Element.topRight,
                                                           minus)]));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayPE = function (naive) {
      return function () {
         var itemToText = function (itm) {
            return function () {
               switch (itm.ctor)
               {case "Just":
                  return Text.centered(Text.height(30)(Text.toText(itm._0.body)));
                  case "Nothing":
                  return Text.centered(Text.toText(" "));}
               _E.Case($moduleName,
               "between lines 65 and 68");
            }();
         };
         var w = naive.width;
         var items = naive.items;
         var texts = A2(List.map,
         function (x) {
            return itemToText(A2(Utils.SmartDisplay.getItemAt,
            x,
            items));
         },
         _L.fromArray([1,2,3]));
         var maxW = List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         texts));
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         texts));
         var dimension = A2(Basics.max,
         maxW,
         maxH) + 8;
         var circleR = Basics.toFloat(dimension) / 2;
         var symbolDimension = Basics.truncate(circleR);
         var eq = A2(Graphics.Element.fittedImage,
         symbolDimension,
         symbolDimension)(Utils.SmartDisplay.getImage("equal"));
         var itemCircle = A3(Graphics.Collage.collage,
         dimension,
         dimension,
         _L.fromArray([Utils.SmartDisplay.getCircle(circleR)]));
         var toTextelem = function (txt) {
            return A4(Graphics.Element.container,
            dimension,
            dimension,
            Graphics.Element.middle,
            txt);
         };
         var plus = toTextelem(A2(Graphics.Element.fittedImage,
         symbolDimension,
         symbolDimension)(Utils.SmartDisplay.getImage("plus")));
         var levelItems = List.map(function (x) {
            return Graphics.Element.layers(_L.fromArray([itemCircle
                                                        ,x]));
         })(A2(List.map,
         toTextelem,
         texts));
         var leftPart = function () {
            var partList = _L.fromArray([List.head(levelItems)
                                        ,plus
                                        ,List.head(List.tail(levelItems))]);
            return function () {
               var _v30 = naive.sdType;
               switch (_v30.ctor)
               {case "PlusEqualHorizontal":
                  return A2(Graphics.Element.flow,
                    Graphics.Element.right,
                    partList);
                  case "PlusEqualVertical":
                  return A2(Graphics.Element.flow,
                    Graphics.Element.down,
                    partList);}
               _E.Case($moduleName,
               "between lines 82 and 85");
            }();
         }();
         var restContainer = A3(Graphics.Element.container,
         dimension,
         Graphics.Element.heightOf(leftPart),
         Graphics.Element.middle);
         var $final = A2(Graphics.Element.flow,
         Graphics.Element.right,
         _L.fromArray([leftPart
                      ,restContainer(eq)
                      ,restContainer(List.last(levelItems))]));
         return _U.cmp(Graphics.Element.widthOf($final),
         w) > 0 ? A2(Utils.SmartDisplay.scaleItem,
         w,
         $final) : $final;
      }();
   };
   var getSmartDisplayCircle = function (naive) {
      return function () {
         var toTextelem = F2(function (d,
         txt) {
            return A4(Graphics.Element.container,
            d,
            d,
            Graphics.Element.middle,
            txt);
         });
         var w = naive.width;
         var items = naive.items;
         var subItems = List.map(function (x) {
            return Text.centered(Text.toText(x.body));
         })(A2(Utils.SmartDisplay.filterOutSubitemsOfItem,
         _L.fromArray([1]),
         items));
         var mainItem = function () {
            var _v31 = A2(Utils.SmartDisplay.getItemAt,
            1,
            items);
            switch (_v31.ctor)
            {case "Just":
               return Text.centered(Text.toText(_v31._0.body));
               case "Nothing":
               return Text.centered(Text.toText(" "));}
            _E.Case($moduleName,
            "between lines 26 and 29");
         }();
         var texts = {ctor: "::"
                     ,_0: mainItem
                     ,_1: subItems};
         var maxW = List.maximum(A2(List.map,
         Graphics.Element.widthOf,
         texts));
         var maxH = List.maximum(A2(List.map,
         Graphics.Element.heightOf,
         texts));
         var dimension = A2(Basics.max,
         maxW,
         maxH) + 8;
         var circleR = Basics.toFloat(dimension) / 2;
         var distR = Basics.toFloat(w) / 3 - circleR;
         var xOriginMain = function () {
            var _v33 = naive.sdType;
            switch (_v33.ctor)
            {case "CircleCone":
               return 0 - 2 * circleR;
               case "CircleFull": return 0;
               case "CircleHalf": return 0;}
            _E.Case($moduleName,
            "between lines 36 and 40");
         }();
         var mainCircle = A3(Graphics.Collage.collage,
         2 * dimension,
         2 * dimension,
         _L.fromArray([Utils.SmartDisplay.getCircle(2 * circleR)]));
         var sideCircle = A3(Graphics.Collage.collage,
         dimension,
         dimension,
         _L.fromArray([Utils.SmartDisplay.getCircle(circleR)]));
         var secondlevelItems = List.map(function (x) {
            return Graphics.Collage.toForm(Graphics.Element.layers(_L.fromArray([sideCircle
                                                                                ,x])));
         })(A2(List.map,
         toTextelem(dimension),
         subItems));
         var distributionAngles = A2(Utils.SmartDisplay.getdistributionAngles,
         List.length(secondlevelItems),
         naive.sdType);
         var distributePoints = A2(Utils.SmartDisplay.getdistributePoints,
         distR,
         distributionAngles);
         var firstLevelItem = Graphics.Collage.toForm(Graphics.Element.layers(_L.fromArray([mainCircle
                                                                                           ,toTextelem(2 * dimension)(mainItem)])));
         var $final = A2(Graphics.Collage.collage,
         w,
         Basics.truncate(2 * (distR + circleR)))(_L.append(A2(Utils.SmartDisplay.drawLine,
         {ctor: "_Tuple2"
         ,_0: xOriginMain
         ,_1: 0},
         distributePoints),
         _L.append(_L.fromArray([A2(Graphics.Collage.moveX,
         xOriginMain,
         firstLevelItem)]),
         A2(Utils.SmartDisplay.distribute,
         distributePoints,
         secondlevelItems))));
         return $final;
      }();
   };
   var getSmartDisplay = function (naive) {
      return function () {
         var func = function () {
            var _v34 = naive.sdType;
            switch (_v34.ctor)
            {case "CheckBoxComparision":
               return getSmartDisplayCC;
               case "ContainerList":
               return getSmartDisplayCL;
               case "FramedList":
               return getSmartDisplayFL;
               case "ParagraphList":
               return getSmartDisplayPL;
               case "PlusEqualHorizontal":
               return getSmartDisplayPE;
               case "PlusEqualVertical":
               return getSmartDisplayPE;
               case "PlusMinus":
               return getSmartDisplayPM;}
            return getSmartDisplayCircle;
         }();
         return func(naive);
      }();
   };
   _elm.SmartDisplay.SmartList.values = {_op: _op
                                        ,getSmartDisplay: getSmartDisplay
                                        ,getSmartDisplayCircle: getSmartDisplayCircle
                                        ,getSmartDisplayPE: getSmartDisplayPE
                                        ,getSmartDisplayPM: getSmartDisplayPM
                                        ,getSmartDisplayPL: getSmartDisplayPL
                                        ,getSmartDisplayCC: getSmartDisplayCC
                                        ,getSmartDisplayCL: getSmartDisplayCL
                                        ,getSmartDisplayFL: getSmartDisplayFL};
   return _elm.SmartDisplay.SmartList.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.BaseMapping = Elm.Themes.BaseMapping || {};
Elm.Themes.BaseMapping.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.BaseMapping = _elm.Themes.BaseMapping || {};
   if (_elm.Themes.BaseMapping.values)
   return _elm.Themes.BaseMapping.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.BaseMapping";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var mapping = function () {
      var symbolList = _L.fromArray([{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "navigationalsymbols"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.GeneralSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "dimmednavigationalsymbols"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ShadedGeneralSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "modechangesymbols"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.GeneralSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "dimmedmodechangesymbols"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ShadedGeneralSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "current"
                                          ,_1: "miniframes"}
                                     ,_1: Types.Theme.MiniframeSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "currentsubsection"
                                          ,_1: "miniframes"}
                                     ,_1: Types.Theme.MiniframeSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "othersection"
                                          ,_1: "miniframes"}
                                     ,_1: Types.Theme.ShadedMiniframeSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "othersubsection"
                                          ,_1: "miniframes"}
                                     ,_1: Types.Theme.ShadedMiniframeSymbol}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "sectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "sectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "subsectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsubsectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "subsectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsubsectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "subsubsectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsubsubsectionprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "subsubsectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.SectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "shadedsubsubsectionprojection"
                                          ,_1: "toc"}
                                     ,_1: Types.Theme.ShadedSectionProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "itemizeitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ItemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "itemizesubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "itemizesubsubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubsubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "enumerateitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ItemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "enumeratesubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "enumeratesubsubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubsubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "descriptionitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.ItemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "descriptionsubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "descriptionsubsubitemprojection"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.SubsubitemProjection}
                                    ,{ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple2"
                                          ,_0: "button"
                                          ,_1: "none"}
                                     ,_1: Types.Theme.Button}]);
      var innerList = _L.fromArray([{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "block"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "framebox"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "imagebox"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "alertedblock"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "quiz"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "blocktitle"
                                         ,_1: "block"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "blocktitle"
                                         ,_1: "alertedblock"}
                                    ,_1: Types.Theme.AlertText}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "normal"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "highlight"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.HighlightText}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "alert"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.AlertText}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "itemizeitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Item}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "itemizesubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "itemizesubsubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subsubitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "enumerateitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Item}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "enumeratesubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "enumeratesubsubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subsubitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "descriptionitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Item}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "descriptionsubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "descriptionsubsubitem"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Subsubitem}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "caption"
                                         ,_1: "imagebox"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "captionnameandnumber"
                                         ,_1: "imagebox"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "toc"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Inner}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "section"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsection"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsubsection"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.InnerElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsection"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.PrimaryTocShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsection"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.SecondaryTocShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsubsection"
                                         ,_1: "toc"}
                                    ,_1: Types.Theme.TertiaryTocShading}]);
      var outerList = _L.fromArray([{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "headline"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "footline"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "leftsidebar"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "rightsidebar"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "miniframes"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "logo"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.Outer}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "title"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "title"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "title"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "title"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.QuaternarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subtitle"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subtitle"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subtitle"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subtitle"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.QuaternarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "author"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "author"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Primary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "author"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Primary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "author"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.TertiarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "date"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "date"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Secondary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "date"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Secondary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "date"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.TertiarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "institute"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "institute"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Tertiary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "institute"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Tertiary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "institute"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.TertiarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidenumber"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidenumber"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidenumber"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidenumber"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.QuaternarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "titlegraphic"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "sectiongraphic"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsectiongraphic"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.OuterElements}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidetitle"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "slidesubtitle"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "section"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "section"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Tertiary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "section"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Tertiary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "section"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.SecondarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsection"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsection"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsection"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsection"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.PrimarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsubsection"
                                         ,_1: "none"}
                                    ,_1: Types.Theme.TitleLike}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsubsection"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsubsection"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.Quaternary}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "subsubsection"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.PrimarySidebar}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsection"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.TertiaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsection"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.TertiaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsection"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.SecondarySidebarShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsection"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.QuaternaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsection"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.QuaternaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsection"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.PrimarySidebarShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsubsection"
                                         ,_1: "headline"}
                                    ,_1: Types.Theme.QuaternaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsubsection"
                                         ,_1: "footline"}
                                    ,_1: Types.Theme.QuaternaryShading}
                                   ,{ctor: "_Tuple2"
                                    ,_0: {ctor: "_Tuple2"
                                         ,_0: "shadedsubsubsection"
                                         ,_1: "sidebar"}
                                    ,_1: Types.Theme.PrimarySidebarShading}]);
      return {_: {}
             ,inner: Dict.fromList(innerList)
             ,outer: Dict.fromList(outerList)
             ,symbol: Dict.fromList(symbolList)};
   }();
   _elm.Themes.BaseMapping.values = {_op: _op
                                    ,mapping: mapping};
   return _elm.Themes.BaseMapping.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.GetTheme = Elm.Themes.GetTheme || {};
Elm.Themes.GetTheme.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.GetTheme = _elm.Themes.GetTheme || {};
   if (_elm.Themes.GetTheme.values)
   return _elm.Themes.GetTheme.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.GetTheme";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.InfoLines = Elm.Themes.Layouts.InfoLines.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.MiniFrames = Elm.Themes.Layouts.MiniFrames.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.SideBar = Elm.Themes.Layouts.SideBar.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Split = Elm.Themes.Layouts.Split.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Tree = Elm.Themes.Layouts.Tree.make(_elm);
   var Themes = Themes || {};
   Themes.Styles = Themes.Styles || {};
   Themes.Styles.Default = Elm.Themes.Styles.Default.make(_elm);
   var Themes = Themes || {};
   Themes.Styles = Themes.Styles || {};
   Themes.Styles.Sober = Elm.Themes.Styles.Sober.make(_elm);
   var Themes = Themes || {};
   Themes.Styles = Themes.Styles || {};
   Themes.Styles.Striking = Elm.Themes.Styles.Striking.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var layout = function (themeString) {
      return function () {
         switch (themeString)
         {case "infolines":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.InfoLines.infoLineLayoutInfo
                   ,_1: Themes.Layouts.InfoLines.changePalletteMapping};
            case "leftsidebar":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.SideBar.sideBarLayoutInfo(Types.Theme.LeftSidebar)
                   ,_1: Themes.Layouts.SideBar.changePalletteMapping};
            case "miniframes:authorinstitutetitle":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.MiniFrames.miniframesLayoutInfo(Types.Theme.AuthorInstituteTitle)
                   ,_1: Themes.Layouts.MiniFrames.changePalletteMapping};
            case "miniframes:authortitle":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.MiniFrames.miniframesLayoutInfo(Types.Theme.AuthorTitle)
                   ,_1: Themes.Layouts.MiniFrames.changePalletteMapping};
            case "miniframes:institutetitle":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.MiniFrames.miniframesLayoutInfo(Types.Theme.InstituteTitle)
                   ,_1: Themes.Layouts.MiniFrames.changePalletteMapping};
            case "miniframes:nofoot":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.MiniFrames.miniframesLayoutInfo(Types.Theme.NoFoot)
                   ,_1: Themes.Layouts.MiniFrames.changePalletteMapping};
            case "rightsidebar":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.SideBar.sideBarLayoutInfo(Types.Theme.RightSidebar)
                   ,_1: Themes.Layouts.SideBar.changePalletteMapping};
            case "split":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.Split.splitLayoutInfo
                   ,_1: Themes.Layouts.Split.changePalletteMapping};
            case "tree":
            return {ctor: "_Tuple2"
                   ,_0: Themes.Layouts.Tree.treeLayoutInfo
                   ,_1: Themes.Layouts.Tree.changePalletteMapping};}
         return {ctor: "_Tuple2"
                ,_0: Themes.Layouts.Default.defaultLayoutInfo
                ,_1: Themes.Layouts.Default.changePalletteMapping};
      }();
   };
   var style = function (themeString) {
      return function () {
         switch (themeString)
         {case "default":
            return Themes.Styles.Default.defaultTheme;
            case "sober":
            return Themes.Styles.Sober.defaultTheme;
            case "striking":
            return Themes.Styles.Striking.defaultTheme;}
         return Themes.Styles.Default.defaultTheme;
      }();
   };
   _elm.Themes.GetTheme.values = {_op: _op
                                 ,style: style
                                 ,layout: layout};
   return _elm.Themes.GetTheme.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.Tree = Elm.Themes.Layouts.Tree || {};
Elm.Themes.Layouts.Tree.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.Tree = _elm.Themes.Layouts.Tree || {};
   if (_elm.Themes.Layouts.Tree.values)
   return _elm.Themes.Layouts.Tree.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.Tree";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([]);
   var defLayOut = Themes.Layouts.Default.defaultLayoutInfo;
   var headlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.midLeft
                                                                   ,width: 1}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "title"}
                                                                  ,{_: {}
                                                                   ,column: 1
                                                                   ,id: "treesection"}
                                                                  ,{_: {}
                                                                   ,column: 1
                                                                   ,id: "treesubsection"}])});
   var treeLayoutInfo = _U.replace([["headline"
                                    ,headlineLayout]],
   defLayOut);
   _elm.Themes.Layouts.Tree.values = {_op: _op
                                     ,headlineLayout: headlineLayout
                                     ,defLayOut: defLayOut
                                     ,treeLayoutInfo: treeLayoutInfo
                                     ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.Tree.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.Split = Elm.Themes.Layouts.Split || {};
Elm.Themes.Layouts.Split.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.Split = _elm.Themes.Layouts.Split || {};
   if (_elm.Themes.Layouts.Split.values)
   return _elm.Themes.Layouts.Split.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.Split";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Quaternary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Quaternary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Primary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Primary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "section"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Quaternary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "section"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Quaternary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "subsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Primary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "subsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Primary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.QuaternaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.QuaternaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsubsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.PrimaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsubsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.PrimaryShading}]);
   var defLayOut = Themes.Layouts.Default.defaultLayoutInfo;
   var footlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.midRight
                                                                   ,width: 0.5}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 2
                                                                   ,placement: Graphics.Element.midLeft
                                                                   ,width: 0.5}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "section"}
                                                                  ,{_: {}
                                                                   ,column: 2
                                                                   ,id: "subsection"}])});
   var headlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.midRight
                                                                   ,width: 0.5}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 2
                                                                   ,placement: Graphics.Element.midLeft
                                                                   ,width: 0.5}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "sectionnavigationvertical"}
                                                                  ,{_: {}
                                                                   ,column: 2
                                                                   ,id: "subsectionnavigationvertical"}])});
   var splitLayoutInfo = _U.replace([["headline"
                                     ,headlineLayout]
                                    ,["footline",footlineLayout]],
   defLayOut);
   _elm.Themes.Layouts.Split.values = {_op: _op
                                      ,headlineLayout: headlineLayout
                                      ,footlineLayout: footlineLayout
                                      ,defLayOut: defLayOut
                                      ,splitLayoutInfo: splitLayoutInfo
                                      ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.Split.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.SideBar = Elm.Themes.Layouts.SideBar || {};
Elm.Themes.Layouts.SideBar.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.SideBar = _elm.Themes.Layouts.SideBar || {};
   if (_elm.Themes.Layouts.SideBar.values)
   return _elm.Themes.Layouts.SideBar.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.SideBar";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([]);
   var defLayOut = Themes.Layouts.Default.defaultLayoutInfo;
   var sidebarLayout = Types.Theme.Layout({_: {}
                                          ,columns: _L.fromArray([{_: {}
                                                                  ,colAlign: Types.Theme.TopAlign
                                                                  ,id: 1
                                                                  ,placement: Graphics.Element.midRight
                                                                  ,width: 1}])
                                          ,inserts: _L.fromArray([{_: {}
                                                                  ,column: 1
                                                                  ,id: "title"}
                                                                 ,{_: {}
                                                                  ,column: 1
                                                                  ,id: "author"}
                                                                 ,{_: {}
                                                                  ,column: 1
                                                                  ,id: "toc"}])});
   var sideBarLayoutInfo = function (side) {
      return function () {
         switch (side.ctor)
         {case "LeftSidebar":
            return _U.replace([["leftSidebar"
                               ,sidebarLayout]],
              defLayOut);
            case "RightSidebar":
            return _U.replace([["rightSidebar"
                               ,sidebarLayout]],
              defLayOut);}
         _E.Case($moduleName,
         "between lines 25 and 27");
      }();
   };
   _elm.Themes.Layouts.SideBar.values = {_op: _op
                                        ,sidebarLayout: sidebarLayout
                                        ,defLayOut: defLayOut
                                        ,sideBarLayoutInfo: sideBarLayoutInfo
                                        ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.SideBar.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.MiniFrames = Elm.Themes.Layouts.MiniFrames || {};
Elm.Themes.Layouts.MiniFrames.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.MiniFrames = _elm.Themes.Layouts.MiniFrames || {};
   if (_elm.Themes.Layouts.MiniFrames.values)
   return _elm.Themes.Layouts.MiniFrames.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.MiniFrames";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "section"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "section"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "subsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "subsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.TertiaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.TertiaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsubsection"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.SecondaryShading}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "shadedsubsection"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.SecondaryShading}]);
   var defLayOut = Themes.Layouts.Default.defaultLayoutInfo;
   var footlineLayout3 = Types.Theme.Layout({_: {}
                                            ,columns: _L.fromArray([{_: {}
                                                                    ,colAlign: Types.Theme.TopAlign
                                                                    ,id: 1
                                                                    ,placement: Graphics.Element.middle
                                                                    ,width: 0.331}
                                                                   ,{_: {}
                                                                    ,colAlign: Types.Theme.TopAlign
                                                                    ,id: 2
                                                                    ,placement: Graphics.Element.middle
                                                                    ,width: 0.33}
                                                                   ,{_: {}
                                                                    ,colAlign: Types.Theme.TopAlign
                                                                    ,id: 3
                                                                    ,placement: Graphics.Element.middle
                                                                    ,width: 0.33}])
                                            ,inserts: _L.fromArray([{_: {}
                                                                    ,column: 1
                                                                    ,id: "author"}
                                                                   ,{_: {}
                                                                    ,column: 2
                                                                    ,id: "title"}
                                                                   ,{_: {}
                                                                    ,column: 3
                                                                    ,id: "institute"}])});
   var footlineLayout2 = F2(function (id1,
   id2) {
      return Types.Theme.Layout({_: {}
                                ,columns: _L.fromArray([{_: {}
                                                        ,colAlign: Types.Theme.TopAlign
                                                        ,id: 1
                                                        ,placement: Graphics.Element.middle
                                                        ,width: 0.51}
                                                       ,{_: {}
                                                        ,colAlign: Types.Theme.TopAlign
                                                        ,id: 2
                                                        ,placement: Graphics.Element.middle
                                                        ,width: 0.51}])
                                ,inserts: _L.fromArray([{_: {}
                                                        ,column: 1
                                                        ,id: id1}
                                                       ,{_: {}
                                                        ,column: 2
                                                        ,id: id2}])});
   });
   var headlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.midLeft
                                                                   ,width: 1}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "navigation"}
                                                                  ,{_: {}
                                                                   ,column: 1
                                                                   ,id: "subsection"}])});
   var miniframesLayoutInfo = function (foot) {
      return function () {
         switch (foot.ctor)
         {case "AuthorInstituteTitle":
            return _U.replace([["headline"
                               ,headlineLayout]
                              ,["footline",footlineLayout3]],
              defLayOut);
            case "AuthorTitle":
            return _U.replace([["headline"
                               ,headlineLayout]
                              ,["footline"
                               ,A2(footlineLayout2,
                               "author",
                               "title")]],
              defLayOut);
            case "InstituteTitle":
            return _U.replace([["headline"
                               ,headlineLayout]
                              ,["footline"
                               ,A2(footlineLayout2,
                               "institute",
                               "title")]],
              defLayOut);
            case "NoFoot":
            return _U.replace([["headline"
                               ,headlineLayout]],
              defLayOut);}
         _E.Case($moduleName,
         "between lines 59 and 71");
      }();
   };
   _elm.Themes.Layouts.MiniFrames.values = {_op: _op
                                           ,headlineLayout: headlineLayout
                                           ,footlineLayout2: footlineLayout2
                                           ,footlineLayout3: footlineLayout3
                                           ,defLayOut: defLayOut
                                           ,miniframesLayoutInfo: miniframesLayoutInfo
                                           ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.MiniFrames.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.InfoLines = Elm.Themes.Layouts.InfoLines || {};
Elm.Themes.Layouts.InfoLines.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.InfoLines = _elm.Themes.Layouts.InfoLines || {};
   if (_elm.Themes.Layouts.InfoLines.values)
   return _elm.Themes.Layouts.InfoLines.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.InfoLines";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.Layouts = Themes.Layouts || {};
   Themes.Layouts.Default = Elm.Themes.Layouts.Default.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "author"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Tertiary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "title"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Secondary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "date"
                                                  ,_1: "headline"}
                                             ,_1: Types.Theme.Primary}
                                            ,{ctor: "_Tuple2"
                                             ,_0: {ctor: "_Tuple2"
                                                  ,_0: "date"
                                                  ,_1: "footline"}
                                             ,_1: Types.Theme.Primary}]);
   var defLayOut = Themes.Layouts.Default.defaultLayoutInfo;
   var headlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.midRight
                                                                   ,width: 0.5}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 2
                                                                   ,placement: Graphics.Element.midLeft
                                                                   ,width: 0.5}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "section"}
                                                                  ,{_: {}
                                                                   ,column: 2
                                                                   ,id: "subsection"}])});
   var footlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.middle
                                                                   ,width: 0.33}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 2
                                                                   ,placement: Graphics.Element.middle
                                                                   ,width: 0.331}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 3
                                                                   ,placement: Graphics.Element.midRight
                                                                   ,width: 0.17}
                                                                  ,{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 4
                                                                   ,placement: Graphics.Element.midRight
                                                                   ,width: 0.17}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "author"}
                                                                  ,{_: {}
                                                                   ,column: 2
                                                                   ,id: "title"}
                                                                  ,{_: {}
                                                                   ,column: 3
                                                                   ,id: "date"}
                                                                  ,{_: {}
                                                                   ,column: 4
                                                                   ,id: "slidenumberandtotal"}])});
   var infoLineLayoutInfo = _U.replace([["headline"
                                        ,headlineLayout]
                                       ,["footline",footlineLayout]],
   defLayOut);
   _elm.Themes.Layouts.InfoLines.values = {_op: _op
                                          ,footlineLayout: footlineLayout
                                          ,headlineLayout: headlineLayout
                                          ,defLayOut: defLayOut
                                          ,infoLineLayoutInfo: infoLineLayoutInfo
                                          ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.InfoLines.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Layouts = Elm.Themes.Layouts || {};
Elm.Themes.Layouts.Default = Elm.Themes.Layouts.Default || {};
Elm.Themes.Layouts.Default.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Layouts = _elm.Themes.Layouts || {};
   _elm.Themes.Layouts.Default = _elm.Themes.Layouts.Default || {};
   if (_elm.Themes.Layouts.Default.values)
   return _elm.Themes.Layouts.Default.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Layouts.Default";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changePalletteMapping = _L.fromArray([]);
   var defaulttocOptions = {_: {}
                           ,currentSection: Types.Theme.Show
                           ,currentSubsectionOfCurrentSection: Types.Theme.Show
                           ,otherSection: Types.Theme.Shade
                           ,otherSubsectionOfCurrentSection: Types.Theme.Show
                           ,pauseSections: false
                           ,pauseSubsections: false
                           ,subsectionOfOtherSection: Types.Theme.Hide};
   var modechangesymbolsLayout = Types.Theme.Layout({_: {}
                                                    ,columns: _L.fromArray([{_: {}
                                                                            ,colAlign: Types.Theme.TopAlign
                                                                            ,id: 1
                                                                            ,placement: Graphics.Element.middle
                                                                            ,width: 1}])
                                                    ,inserts: _L.fromArray([{_: {}
                                                                            ,column: 1
                                                                            ,id: "supportbin"}
                                                                           ,{_: {}
                                                                            ,column: 1
                                                                            ,id: "zoom"}
                                                                           ,{_: {}
                                                                            ,column: 1
                                                                            ,id: "scribble"}
                                                                           ,{_: {}
                                                                            ,column: 1
                                                                            ,id: "quiz"}])});
   var navigationalsymbolsLayout = Types.Theme.Layout({_: {}
                                                      ,columns: _L.fromArray([{_: {}
                                                                              ,colAlign: Types.Theme.TopAlign
                                                                              ,id: 1
                                                                              ,placement: Graphics.Element.middle
                                                                              ,width: 1}])
                                                      ,inserts: _L.fromArray([{_: {}
                                                                              ,column: 1
                                                                              ,id: "slidenavigation"}
                                                                             ,{_: {}
                                                                              ,column: 1
                                                                              ,id: "subsectionnavigation"}
                                                                             ,{_: {}
                                                                              ,column: 1
                                                                              ,id: "sectionnavigation"}
                                                                             ,{_: {}
                                                                              ,column: 1
                                                                              ,id: "backforward"}])});
   var titlePageLayout = Types.Theme.Layout({_: {}
                                            ,columns: _L.fromArray([{_: {}
                                                                    ,colAlign: Types.Theme.TopAlign
                                                                    ,id: 1
                                                                    ,placement: Graphics.Element.middle
                                                                    ,width: 1}])
                                            ,inserts: _L.fromArray([{_: {}
                                                                    ,column: 1
                                                                    ,id: "title"}
                                                                   ,{_: {}
                                                                    ,column: 1
                                                                    ,id: "subtitle"}
                                                                   ,{_: {}
                                                                    ,column: 1
                                                                    ,id: "author"}
                                                                   ,{_: {}
                                                                    ,column: 1
                                                                    ,id: "institute"}
                                                                   ,{_: {}
                                                                    ,column: 1
                                                                    ,id: "date"}
                                                                   ,{_: {}
                                                                    ,column: 1
                                                                    ,id: "image"}])});
   var footlineLayout = Types.Theme.Layout({_: {}
                                           ,columns: _L.fromArray([{_: {}
                                                                   ,colAlign: Types.Theme.TopAlign
                                                                   ,id: 1
                                                                   ,placement: Graphics.Element.topRight
                                                                   ,width: 1}])
                                           ,inserts: _L.fromArray([{_: {}
                                                                   ,column: 1
                                                                   ,id: "logo"}])});
   var defaultLayoutInfo = {_: {}
                           ,atBeginSectionSlide: {ctor: "_Tuple2"
                                                 ,_0: Types.Theme.Empty
                                                 ,_1: defaulttocOptions}
                           ,atBeginSubsectionSlide: {ctor: "_Tuple2"
                                                    ,_0: Types.Theme.Empty
                                                    ,_1: defaulttocOptions}
                           ,footline: footlineLayout
                           ,headline: Types.Theme.Empty
                           ,leftSidebar: Types.Theme.Empty
                           ,modechangeSymbols: modechangesymbolsLayout
                           ,navigationalSymbols: navigationalsymbolsLayout
                           ,rightSidebar: Types.Theme.Empty
                           ,titleSlide: titlePageLayout
                           ,tocSlide: {ctor: "_Tuple2"
                                      ,_0: Types.Theme.Empty
                                      ,_1: defaulttocOptions}};
   _elm.Themes.Layouts.Default.values = {_op: _op
                                        ,footlineLayout: footlineLayout
                                        ,titlePageLayout: titlePageLayout
                                        ,navigationalsymbolsLayout: navigationalsymbolsLayout
                                        ,modechangesymbolsLayout: modechangesymbolsLayout
                                        ,defaulttocOptions: defaulttocOptions
                                        ,defaultLayoutInfo: defaultLayoutInfo
                                        ,changePalletteMapping: changePalletteMapping};
   return _elm.Themes.Layouts.Default.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Styles = Elm.Themes.Styles || {};
Elm.Themes.Styles.Striking = Elm.Themes.Styles.Striking || {};
Elm.Themes.Styles.Striking.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Styles = _elm.Themes.Styles || {};
   _elm.Themes.Styles.Striking = _elm.Themes.Styles.Striking || {};
   if (_elm.Themes.Styles.Striking.values)
   return _elm.Themes.Styles.Striking.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Styles.Striking";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.MapStyling = Elm.Themes.MapStyling.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var defaultTheme = F4(function (fontFamily,
   normalFontSize,
   rawParentDict,
   mapping) {
      return function () {
         var slideBackground = {_: {}
                               ,normal: Types.Theme.SingleColored(Color.white)
                               ,section: Types.Theme.SingleColored(Color.white)
                               ,supportbin: Types.Theme.SingleColored(Color.white)
                               ,title: Types.Theme.SingleColored(Color.white)};
         var updatedMapping = mapping;
         var orangeBg = Types.Theme.SingleColored(Color.orange);
         var yellowBg = Types.Theme.SingleColored(Color.yellow);
         var darkBlue = A3(Color.rgb,
         0,
         0,
         204);
         var darkBlueBg = Types.Theme.SingleColored(darkBlue);
         var defaultSinglePad = {_: {}
                                ,fillcolor: Types.Theme.Transparent
                                ,thickness: 0};
         var defaultPadding = {_: {}
                              ,bottom: defaultSinglePad
                              ,left: defaultSinglePad
                              ,right: defaultSinglePad
                              ,top: defaultSinglePad};
         var defaultBackground = Types.Theme.SingleColored(Color.white);
         var defaultTextStyle = {_: {}
                                ,bold: false
                                ,color: Color.black
                                ,height: normalFontSize
                                ,italic: false
                                ,line: Maybe.Nothing
                                ,typeface: fontFamily};
         var defaultText = {_: {}
                           ,align: Text.justified
                           ,style: defaultTextStyle};
         var defaultStyling = {_: {}
                              ,background: defaultBackground
                              ,border: Types.Theme.None
                              ,padding: defaultPadding
                              ,text: defaultText};
         var defaultSymbol = {_: {}
                             ,general: defaultStyling
                             ,symbolAlpha: 1
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var setBgFb = F7(function (st,
         fgc1,
         fgc2,
         fgalpha,
         bgc1,
         bgc2,
         bgalpha) {
            return A3(Utils.Theme.blendTextColor,
            A2(Utils.Theme.setTextColor,
            A3(Utils.Theme.blendBackground,
            A2(Utils.Theme.setBackGround,
            st,
            bgc1),
            bgc2,
            bgalpha),
            fgc1),
            fgc2,
            fgalpha);
         });
         var updateSymbolWithRaw = Utils.Theme.getUpdatedSymbolStyler(rawParentDict);
         var updateWithRaw = Utils.Theme.getUpdatedStyler(rawParentDict);
         var inner = updateWithRaw("Inner")(A2(Utils.Theme.setTextColor,
         defaultStyling,
         Color.black));
         var innerElements = updateWithRaw("InnerElements")(inner);
         var shadingTocPallette = {_: {}
                                  ,primary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,quaternary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,secondary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,tertiary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)};
         var framebox = A2(Utils.Theme.setBorder,
         innerElements,
         Types.Theme.Border(Graphics.Collage.solid(Color.black)));
         var normalText = updateWithRaw("TitleLike")(inner);
         var alertText = updateWithRaw("AlertText")(A3(Utils.Theme.blendTextColor,
         A2(Utils.Theme.setTextColor,
         normalText,
         darkBlue),
         Color.yellow,
         0.8));
         var highlightText = updateWithRaw("HighlightText")(Utils.Theme.setTextBold(normalText));
         var item = updateWithRaw("Item")(innerElements);
         var setFontSize = F2(function (symbolicSize,
         s) {
            return A2(Utils.Theme.setTextSize,
            s,
            A2(Utils.Theme.getRealFontSize,
            symbolicSize,
            normalFontSize));
         });
         var outer = updateWithRaw("Outer")(setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
         defaultStyling,
         Color.black)));
         var headFootPallette = {_: {}
                                ,primary: A7(setBgFb,
                                outer,
                                darkBlue,
                                Color.black,
                                0.6,
                                yellowBg,
                                Color.orange,
                                0.85)
                                ,quaternary: A2(Utils.Theme.setTextColor,
                                A3(Utils.Theme.blendBackground,
                                A2(Utils.Theme.setBackGround,
                                outer,
                                yellowBg),
                                Color.orange,
                                0.2),
                                darkBlue)
                                ,secondary: A7(setBgFb,
                                outer,
                                darkBlue,
                                Color.black,
                                0.7,
                                yellowBg,
                                Color.orange,
                                0.6)
                                ,tertiary: A7(setBgFb,
                                outer,
                                Color.yellow,
                                Color.orange,
                                0.5,
                                darkBlueBg,
                                Color.black,
                                0.8)};
         var shadingPallette = {_: {}
                               ,primary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.primary,
                               0.4)
                               ,quaternary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.quaternary,
                               0.4)
                               ,secondary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.secondary,
                               0.4)
                               ,tertiary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.tertiary,
                               0.4)};
         var sidebarPallette = {_: {}
                               ,primary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               inner,
                               darkBlue),
                               Color.black,
                               0.1)
                               ,quaternary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               outer,
                               Color.yellow),
                               Color.orange,
                               0.1)
                               ,secondary: A2(Utils.Theme.setTextColor,
                               outer,
                               Color.white)
                               ,tertiary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               outer,
                               darkBlue),
                               Color.black,
                               0.5)};
         var shadingSidebarPallette = {_: {}
                                      ,primary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.primary,
                                      0.4)
                                      ,quaternary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.quaternary,
                                      0.4)
                                      ,secondary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.secondary,
                                      0.4)
                                      ,tertiary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.tertiary,
                                      0.4)};
         var sidebar = A2(Utils.Theme.setTextColor,
         A3(Utils.Theme.blendBackground,
         A2(Utils.Theme.setBackGround,
         outer,
         orangeBg),
         Color.white,
         0.75),
         darkBlue);
         var outerElements = updateWithRaw("OuterElements")(setFontSize(Types.Theme.Small)(outer));
         var generalSymbol = {_: {}
                             ,general: A2(Utils.Theme.setBackGround,
                             outerElements,
                             Types.Theme.Transparent)
                             ,symbolAlpha: 0.7
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var shadedGeneralSymbol = A2(Utils.Theme.setSymbolAlpha,
         generalSymbol,
         0.2);
         var miniframeSymbol = {_: {}
                               ,general: A2(Utils.Theme.setBackGround,
                               outerElements,
                               Types.Theme.Transparent)
                               ,symbolAlpha: 1
                               ,symbolFill: Types.Theme.SingleColored(Color.green)
                               ,symbolShape: Types.Theme.Circle};
         var shadedMiniframeSymbol = A2(Utils.Theme.setSymbolAlpha,
         miniframeSymbol,
         0.5);
         var titleLike = updateWithRaw("TitleLike")(setFontSize(Types.Theme.Large)(A2(Utils.Theme.setTextColor,
         A3(Utils.Theme.blendBackground,
         A2(Utils.Theme.setBackGround,
         outer,
         yellowBg),
         Color.orange,
         0.85),
         darkBlue)));
         var slideTitle = A3(Utils.Theme.blendBackground,
         A2(Utils.Theme.setBackGround,
         titleLike,
         yellowBg),
         Color.orange,
         0.9);
         var styleLists = {_: {}
                          ,inner: _L.fromArray([{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "framebox"
                                                     ,_1: "none"}
                                                ,_1: framebox}
                                               ,{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "slidetitle"
                                                     ,_1: "none"}
                                                ,_1: slideTitle}])
                          ,outer: _L.fromArray([{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "leftSidebar"
                                                     ,_1: "none"}
                                                ,_1: sidebar}
                                               ,{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "rightSidebar"
                                                     ,_1: "none"}
                                                ,_1: sidebar}])
                          ,symbol: _L.fromArray([])};
         var subitem = updateWithRaw("Subitem")(setFontSize(Types.Theme.Small)(item));
         var subsubitem = updateWithRaw("Subsubitem")(setFontSize(Types.Theme.FootnoteSize)(subitem));
         var itemProjection = updateSymbolWithRaw("ItemProjection")({_: {}
                                                                    ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                                                                    defaultStyling,
                                                                    Color.white))
                                                                    ,symbolAlpha: 1
                                                                    ,symbolFill: Types.Theme.SingleColored(item.text.style.color)
                                                                    ,symbolShape: Types.Theme.Triangle});
         var subitemProjection = updateSymbolWithRaw("SubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Square));
         var subsubitemProjection = updateSymbolWithRaw("SubsubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Circle));
         var sectionProjection = itemProjection;
         var shadedSectionProjection = A2(Utils.Theme.setSymbolAlpha,
         sectionProjection,
         0.5);
         var button = {_: {}
                      ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                      innerElements,
                      Color.white))
                      ,symbolAlpha: 1
                      ,symbolFill: function (_) {
                         return _.background;
                      }(A3(Utils.Theme.blendBackground,
                      innerElements,
                      innerElements.text.style.color,
                      0.4))
                      ,symbolShape: Types.Theme.Rectangle};
         var symbolBoard = {_: {}
                           ,button: button
                           ,generalSymbol: generalSymbol
                           ,miniframeSymbol: miniframeSymbol
                           ,sectionProjection: sectionProjection
                           ,shadedGeneralSymbol: shadedGeneralSymbol
                           ,shadedMiniframeSymbol: shadedMiniframeSymbol
                           ,shadedSectionProjection: shadedSectionProjection};
         var styleGuide = {_: {}
                          ,alertText: alertText
                          ,headFootPallette: headFootPallette
                          ,highlightText: highlightText
                          ,inner: inner
                          ,innerElements: innerElements
                          ,item: item
                          ,itemProjection: itemProjection
                          ,normalText: normalText
                          ,outer: outer
                          ,outerElements: outerElements
                          ,shadingPallette: shadingPallette
                          ,shadingSidebarPallette: shadingSidebarPallette
                          ,shadingTocPallette: shadingTocPallette
                          ,sidebarPallette: sidebarPallette
                          ,subitem: subitem
                          ,subitemProjection: subitemProjection
                          ,subsubitem: subsubitem
                          ,subsubitemProjection: subsubitemProjection
                          ,symbolBoard: symbolBoard
                          ,titleLike: titleLike};
         return Utils.Theme.updateStyleInfo(styleLists)(A3(Themes.MapStyling.toStyleInfo,
         styleGuide,
         updatedMapping,
         slideBackground));
      }();
   });
   _elm.Themes.Styles.Striking.values = {_op: _op
                                        ,defaultTheme: defaultTheme};
   return _elm.Themes.Styles.Striking.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Styles = Elm.Themes.Styles || {};
Elm.Themes.Styles.Sober = Elm.Themes.Styles.Sober || {};
Elm.Themes.Styles.Sober.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Styles = _elm.Themes.Styles || {};
   _elm.Themes.Styles.Sober = _elm.Themes.Styles.Sober || {};
   if (_elm.Themes.Styles.Sober.values)
   return _elm.Themes.Styles.Sober.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Styles.Sober";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.MapStyling = Elm.Themes.MapStyling.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var defaultTheme = F4(function (fontFamily,
   normalFontSize,
   rawParentDict,
   mapping) {
      return function () {
         var slideBackground = {_: {}
                               ,normal: Types.Theme.SingleColored(Color.white)
                               ,section: Types.Theme.SingleColored(Color.white)
                               ,supportbin: Types.Theme.SingleColored(Color.white)
                               ,title: Types.Theme.SingleColored(A3(Utils.Theme.blendColors,
                               Color.white,
                               Color.grey,
                               0.2))};
         var updatedMapping = mapping;
         var greyBg = Types.Theme.SingleColored(Color.darkGrey);
         var darkRed = A3(Color.rgb,
         204,
         0,
         0);
         var darkRedBg = Types.Theme.SingleColored(darkRed);
         var defaultSinglePad = {_: {}
                                ,fillcolor: Types.Theme.Transparent
                                ,thickness: 1};
         var defaultPadding = {_: {}
                              ,bottom: defaultSinglePad
                              ,left: defaultSinglePad
                              ,right: defaultSinglePad
                              ,top: defaultSinglePad};
         var defaultBackground = Types.Theme.SingleColored(Color.white);
         var defaultTextStyle = {_: {}
                                ,bold: false
                                ,color: Color.black
                                ,height: normalFontSize
                                ,italic: false
                                ,line: Maybe.Nothing
                                ,typeface: fontFamily};
         var defaultText = {_: {}
                           ,align: Text.justified
                           ,style: defaultTextStyle};
         var defaultStyling = {_: {}
                              ,background: defaultBackground
                              ,border: Types.Theme.None
                              ,padding: defaultPadding
                              ,text: defaultText};
         var defaultSymbol = {_: {}
                             ,general: defaultStyling
                             ,symbolAlpha: 1
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var setBgFb = F7(function (st,
         fgc1,
         fgc2,
         fgalpha,
         bgc1,
         bgc2,
         bgalpha) {
            return A3(Utils.Theme.blendTextColor,
            A2(Utils.Theme.setTextColor,
            A3(Utils.Theme.blendBackground,
            A2(Utils.Theme.setBackGround,
            st,
            bgc1),
            bgc2,
            bgalpha),
            fgc1),
            fgc2,
            fgalpha);
         });
         var updateSymbolWithRaw = Utils.Theme.getUpdatedSymbolStyler(rawParentDict);
         var updateWithRaw = Utils.Theme.getUpdatedStyler(rawParentDict);
         var inner = updateWithRaw("Inner")(A2(Utils.Theme.setTextColor,
         defaultStyling,
         Color.black));
         var innerElements = updateWithRaw("InnerElements")(inner);
         var shadingTocPallette = {_: {}
                                  ,primary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,quaternary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,secondary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,tertiary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)};
         var framebox = A2(Utils.Theme.setBorder,
         innerElements,
         Types.Theme.Border(Graphics.Collage.solid(Color.black)));
         var normalText = updateWithRaw("TitleLike")(inner);
         var alertText = updateWithRaw("AlertText")(A3(Utils.Theme.blendTextColor,
         A2(Utils.Theme.setTextColor,
         normalText,
         darkRed),
         Color.grey,
         0.8));
         var highlightText = updateWithRaw("HighlightText")(Utils.Theme.setTextBold(normalText));
         var item = updateWithRaw("Item")(innerElements);
         var setFontSize = F2(function (symbolicSize,
         s) {
            return A2(Utils.Theme.setTextSize,
            s,
            A2(Utils.Theme.getRealFontSize,
            symbolicSize,
            normalFontSize));
         });
         var outer = updateWithRaw("Outer")(setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
         defaultStyling,
         Color.black)));
         var headFootPallette = {_: {}
                                ,primary: A7(setBgFb,
                                outer,
                                darkRed,
                                Color.black,
                                0.6,
                                greyBg,
                                Color.white,
                                0.3)
                                ,quaternary: A2(Utils.Theme.setTextColor,
                                A3(Utils.Theme.blendBackground,
                                A2(Utils.Theme.setBackGround,
                                outer,
                                greyBg),
                                Color.white,
                                5.0e-2),
                                darkRed)
                                ,secondary: A7(setBgFb,
                                outer,
                                darkRed,
                                Color.black,
                                0.7,
                                greyBg,
                                Color.white,
                                0.15)
                                ,tertiary: A7(setBgFb,
                                outer,
                                Color.grey,
                                Color.white,
                                0.1,
                                darkRedBg,
                                Color.black,
                                0.8)};
         var shadingPallette = {_: {}
                               ,primary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.primary,
                               0.4)
                               ,quaternary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.quaternary,
                               0.4)
                               ,secondary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.secondary,
                               0.4)
                               ,tertiary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.tertiary,
                               0.4)};
         var sidebarPallette = {_: {}
                               ,primary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               inner,
                               darkRed),
                               Color.black,
                               0.1)
                               ,quaternary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               outer,
                               Color.grey),
                               Color.white,
                               0.1)
                               ,secondary: A2(Utils.Theme.setTextColor,
                               outer,
                               Color.white)
                               ,tertiary: A3(Utils.Theme.blendTextColor,
                               A2(Utils.Theme.setTextColor,
                               outer,
                               darkRed),
                               Color.black,
                               0.5)};
         var shadingSidebarPallette = {_: {}
                                      ,primary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.primary,
                                      0.4)
                                      ,quaternary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.quaternary,
                                      0.4)
                                      ,secondary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.secondary,
                                      0.4)
                                      ,tertiary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.tertiary,
                                      0.4)};
         var sidebar = A2(Utils.Theme.setTextColor,
         A3(Utils.Theme.blendBackground,
         A2(Utils.Theme.setBackGround,
         outer,
         greyBg),
         Color.white,
         0.15),
         darkRed);
         var styleLists = {_: {}
                          ,inner: _L.fromArray([{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "framebox"
                                                     ,_1: "none"}
                                                ,_1: framebox}])
                          ,outer: _L.fromArray([{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "leftSidebar"
                                                     ,_1: "none"}
                                                ,_1: sidebar}
                                               ,{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "rightSidebar"
                                                     ,_1: "none"}
                                                ,_1: sidebar}])
                          ,symbol: _L.fromArray([])};
         var outerElements = updateWithRaw("OuterElements")(setFontSize(Types.Theme.Small)(A2(Utils.Theme.setTextAlign,
         outer,
         Text.centered)));
         var generalSymbol = {_: {}
                             ,general: A2(Utils.Theme.setBackGround,
                             outerElements,
                             Types.Theme.Transparent)
                             ,symbolAlpha: 0.7
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var shadedGeneralSymbol = A2(Utils.Theme.setSymbolAlpha,
         generalSymbol,
         0.2);
         var miniframeSymbol = {_: {}
                               ,general: A2(Utils.Theme.setBackGround,
                               outerElements,
                               Types.Theme.Transparent)
                               ,symbolAlpha: 1
                               ,symbolFill: Types.Theme.SingleColored(Color.green)
                               ,symbolShape: Types.Theme.Circle};
         var shadedMiniframeSymbol = A2(Utils.Theme.setSymbolAlpha,
         miniframeSymbol,
         0.5);
         var titleLike = updateWithRaw("TitleLike")(setFontSize(Types.Theme.Large)(A2(Utils.Theme.setTextColor,
         A3(Utils.Theme.blendBackground,
         A2(Utils.Theme.setBackGround,
         outer,
         greyBg),
         Color.white,
         0.1),
         darkRed)));
         var subitem = updateWithRaw("Subitem")(setFontSize(Types.Theme.Small)(item));
         var subsubitem = updateWithRaw("Subsubitem")(setFontSize(Types.Theme.FootnoteSize)(subitem));
         var itemProjection = updateSymbolWithRaw("ItemProjection")({_: {}
                                                                    ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                                                                    defaultStyling,
                                                                    Color.white))
                                                                    ,symbolAlpha: 1
                                                                    ,symbolFill: Types.Theme.SingleColored(item.text.style.color)
                                                                    ,symbolShape: Types.Theme.Triangle});
         var subitemProjection = updateSymbolWithRaw("SubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Square));
         var subsubitemProjection = updateSymbolWithRaw("SubsubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Circle));
         var sectionProjection = itemProjection;
         var shadedSectionProjection = A2(Utils.Theme.setSymbolAlpha,
         sectionProjection,
         0.5);
         var button = {_: {}
                      ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                      innerElements,
                      Color.white))
                      ,symbolAlpha: 0.7
                      ,symbolFill: function (_) {
                         return _.background;
                      }(A3(Utils.Theme.blendBackground,
                      innerElements,
                      innerElements.text.style.color,
                      0.4))
                      ,symbolShape: Types.Theme.Rectangle};
         var symbolBoard = {_: {}
                           ,button: button
                           ,generalSymbol: generalSymbol
                           ,miniframeSymbol: miniframeSymbol
                           ,sectionProjection: sectionProjection
                           ,shadedGeneralSymbol: shadedGeneralSymbol
                           ,shadedMiniframeSymbol: shadedMiniframeSymbol
                           ,shadedSectionProjection: shadedSectionProjection};
         var styleGuide = {_: {}
                          ,alertText: alertText
                          ,headFootPallette: headFootPallette
                          ,highlightText: highlightText
                          ,inner: inner
                          ,innerElements: innerElements
                          ,item: item
                          ,itemProjection: itemProjection
                          ,normalText: normalText
                          ,outer: outer
                          ,outerElements: outerElements
                          ,shadingPallette: shadingPallette
                          ,shadingSidebarPallette: shadingSidebarPallette
                          ,shadingTocPallette: shadingTocPallette
                          ,sidebarPallette: sidebarPallette
                          ,subitem: subitem
                          ,subitemProjection: subitemProjection
                          ,subsubitem: subsubitem
                          ,subsubitemProjection: subsubitemProjection
                          ,symbolBoard: symbolBoard
                          ,titleLike: titleLike};
         return Utils.Theme.updateStyleInfo(styleLists)(A3(Themes.MapStyling.toStyleInfo,
         styleGuide,
         updatedMapping,
         slideBackground));
      }();
   });
   _elm.Themes.Styles.Sober.values = {_op: _op
                                     ,defaultTheme: defaultTheme};
   return _elm.Themes.Styles.Sober.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.Styles = Elm.Themes.Styles || {};
Elm.Themes.Styles.Default = Elm.Themes.Styles.Default || {};
Elm.Themes.Styles.Default.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.Styles = _elm.Themes.Styles || {};
   _elm.Themes.Styles.Default = _elm.Themes.Styles.Default || {};
   if (_elm.Themes.Styles.Default.values)
   return _elm.Themes.Styles.Default.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.Styles.Default";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.MapStyling = Elm.Themes.MapStyling.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var defaultTheme = F4(function (fontFamily,
   normalFontSize,
   rawParentDict,
   mapping) {
      return function () {
         var slideBackground = {_: {}
                               ,normal: Types.Theme.SingleColored(Color.white)
                               ,section: Types.Theme.SingleColored(Color.white)
                               ,supportbin: Types.Theme.SingleColored(Color.white)
                               ,title: Types.Theme.SingleColored(Color.white)};
         var updatedMapping = mapping;
         var blendedBlue = A3(Color.rgb,
         51,
         51,
         180);
         var defaultSinglePad = {_: {}
                                ,fillcolor: Types.Theme.Transparent
                                ,thickness: 5};
         var defaultPadding = {_: {}
                              ,bottom: defaultSinglePad
                              ,left: defaultSinglePad
                              ,right: defaultSinglePad
                              ,top: defaultSinglePad};
         var defaultBackground = Types.Theme.SingleColored(Color.white);
         var defaultTextStyle = {_: {}
                                ,bold: false
                                ,color: Color.black
                                ,height: normalFontSize
                                ,italic: false
                                ,line: Maybe.Nothing
                                ,typeface: fontFamily};
         var defaultText = {_: {}
                           ,align: Text.justified
                           ,style: defaultTextStyle};
         var defaultStyling = {_: {}
                              ,background: defaultBackground
                              ,border: Types.Theme.None
                              ,padding: defaultPadding
                              ,text: defaultText};
         var defaultSymbol = {_: {}
                             ,general: defaultStyling
                             ,symbolAlpha: 1
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var updateSymbolWithRaw = Utils.Theme.getUpdatedSymbolStyler(rawParentDict);
         var updateWithRaw = Utils.Theme.getUpdatedStyler(rawParentDict);
         var inner = updateWithRaw("Inner")(A2(Utils.Theme.setTextColor,
         defaultStyling,
         blendedBlue));
         var innerElements = updateWithRaw("InnerElements")(inner);
         var shadingTocPallette = {_: {}
                                  ,primary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,quaternary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,secondary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)
                                  ,tertiary: A2(Utils.Theme.shadeTextColor,
                                  innerElements,
                                  0.4)};
         var framebox = A2(Utils.Theme.setBorder,
         innerElements,
         Types.Theme.Border(Graphics.Collage.solid(Color.black)));
         var styleLists = {_: {}
                          ,inner: _L.fromArray([{ctor: "_Tuple2"
                                                ,_0: {ctor: "_Tuple2"
                                                     ,_0: "framebox"
                                                     ,_1: "none"}
                                                ,_1: framebox}])
                          ,outer: _L.fromArray([])
                          ,symbol: _L.fromArray([])};
         var normalText = updateWithRaw("TitleLike")(inner);
         var alertText = updateWithRaw("AlertText")(A2(Utils.Theme.setTextColor,
         normalText,
         Color.red));
         var highlightText = updateWithRaw("HighlightText")(Utils.Theme.setTextBold(normalText));
         var item = updateWithRaw("Item")(innerElements);
         var setFontSize = F2(function (symbolicSize,
         s) {
            return A2(Utils.Theme.setTextSize,
            s,
            A2(Utils.Theme.getRealFontSize,
            symbolicSize,
            normalFontSize));
         });
         var outer = updateWithRaw("Outer")(setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
         defaultStyling,
         blendedBlue)));
         var headFootPallette = {_: {}
                                ,primary: outer
                                ,quaternary: A2(Utils.Theme.setTextColor,
                                outer,
                                Color.black)
                                ,secondary: A3(Utils.Theme.blendTextColor,
                                outer,
                                Color.black,
                                0.75)
                                ,tertiary: A3(Utils.Theme.blendTextColor,
                                outer,
                                Color.black,
                                0.5)};
         var shadingPallette = {_: {}
                               ,primary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.primary,
                               0.4)
                               ,quaternary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.quaternary,
                               0.4)
                               ,secondary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.secondary,
                               0.4)
                               ,tertiary: A2(Utils.Theme.shadeTextColor,
                               headFootPallette.tertiary,
                               0.4)};
         var sidebarPallette = {_: {}
                               ,primary: inner
                               ,quaternary: outer
                               ,secondary: outer
                               ,tertiary: outer};
         var shadingSidebarPallette = {_: {}
                                      ,primary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.primary,
                                      0.4)
                                      ,quaternary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.quaternary,
                                      0.4)
                                      ,secondary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.secondary,
                                      0.4)
                                      ,tertiary: A2(Utils.Theme.shadeTextColor,
                                      sidebarPallette.tertiary,
                                      0.4)};
         var miniframeSymbol = {_: {}
                               ,general: outer
                               ,symbolAlpha: 1
                               ,symbolFill: Types.Theme.Transparent
                               ,symbolShape: Types.Theme.Circle};
         var shadedMiniframeSymbol = A2(Utils.Theme.setSymbolAlpha,
         miniframeSymbol,
         0.5);
         var outerElements = updateWithRaw("OuterElements")(setFontSize(Types.Theme.Small)(outer));
         var generalSymbol = {_: {}
                             ,general: outerElements
                             ,symbolAlpha: 0.7
                             ,symbolFill: Types.Theme.Transparent
                             ,symbolShape: Types.Theme.Circle};
         var shadedGeneralSymbol = A2(Utils.Theme.setSymbolAlpha,
         generalSymbol,
         0.2);
         var titleLike = updateWithRaw("TitleLike")(setFontSize(Types.Theme.Large)(outerElements));
         var subitem = updateWithRaw("Subitem")(setFontSize(Types.Theme.Small)(item));
         var subsubitem = updateWithRaw("Subsubitem")(setFontSize(Types.Theme.FootnoteSize)(subitem));
         var itemProjection = updateSymbolWithRaw("ItemProjection")({_: {}
                                                                    ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                                                                    defaultStyling,
                                                                    Color.white))
                                                                    ,symbolAlpha: 1
                                                                    ,symbolFill: Types.Theme.SingleColored(item.text.style.color)
                                                                    ,symbolShape: Types.Theme.Triangle});
         var subitemProjection = updateSymbolWithRaw("SubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Square));
         var subsubitemProjection = updateSymbolWithRaw("SubsubitemProjection")(A2(Utils.Theme.setSymbolShape,
         itemProjection,
         Types.Theme.Circle));
         var sectionProjection = itemProjection;
         var shadedSectionProjection = A2(Utils.Theme.setSymbolAlpha,
         sectionProjection,
         0.5);
         var button = {_: {}
                      ,general: setFontSize(Types.Theme.Tiny)(A2(Utils.Theme.setTextColor,
                      innerElements,
                      Color.white))
                      ,symbolAlpha: 1
                      ,symbolFill: function (_) {
                         return _.background;
                      }(A3(Utils.Theme.blendBackground,
                      innerElements,
                      innerElements.text.style.color,
                      0.4))
                      ,symbolShape: Types.Theme.Rectangle};
         var symbolBoard = {_: {}
                           ,button: button
                           ,generalSymbol: generalSymbol
                           ,miniframeSymbol: miniframeSymbol
                           ,sectionProjection: sectionProjection
                           ,shadedGeneralSymbol: shadedGeneralSymbol
                           ,shadedMiniframeSymbol: shadedMiniframeSymbol
                           ,shadedSectionProjection: shadedSectionProjection};
         var styleGuide = {_: {}
                          ,alertText: alertText
                          ,headFootPallette: headFootPallette
                          ,highlightText: highlightText
                          ,inner: inner
                          ,innerElements: innerElements
                          ,item: item
                          ,itemProjection: itemProjection
                          ,normalText: normalText
                          ,outer: outer
                          ,outerElements: outerElements
                          ,shadingPallette: shadingPallette
                          ,shadingSidebarPallette: shadingSidebarPallette
                          ,shadingTocPallette: shadingTocPallette
                          ,sidebarPallette: sidebarPallette
                          ,subitem: subitem
                          ,subitemProjection: subitemProjection
                          ,subsubitem: subsubitem
                          ,subsubitemProjection: subsubitemProjection
                          ,symbolBoard: symbolBoard
                          ,titleLike: titleLike};
         return Utils.Theme.updateStyleInfo(styleLists)(A3(Themes.MapStyling.toStyleInfo,
         styleGuide,
         updatedMapping,
         slideBackground));
      }();
   });
   _elm.Themes.Styles.Default.values = {_op: _op
                                       ,defaultTheme: defaultTheme};
   return _elm.Themes.Styles.Default.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.MapStyling = Elm.Themes.MapStyling || {};
Elm.Themes.MapStyling.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.MapStyling = _elm.Themes.MapStyling || {};
   if (_elm.Themes.MapStyling.values)
   return _elm.Themes.MapStyling.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.MapStyling";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var toStyleInfo = F3(function (stylingGuide,
   mapping,
   slideBG) {
      return function () {
         var button = stylingGuide.symbolBoard.button;
         var shadedSectionProjection = stylingGuide.symbolBoard.shadedSectionProjection;
         var sectionProjection = stylingGuide.symbolBoard.sectionProjection;
         var shadedGeneralSymbol = stylingGuide.symbolBoard.shadedGeneralSymbol;
         var generalSymbol = stylingGuide.symbolBoard.generalSymbol;
         var shadedMiniframeSymbol = stylingGuide.symbolBoard.shadedMiniframeSymbol;
         var miniframeSymbol = stylingGuide.symbolBoard.miniframeSymbol;
         var subsubitemProjection = stylingGuide.subsubitemProjection;
         var subitemProjection = stylingGuide.subitemProjection;
         var itemProjection = stylingGuide.itemProjection;
         var toSymbolStyle = function (parent) {
            return function () {
               switch (parent.ctor)
               {case "Button": return button;
                  case "GeneralSymbol":
                  return generalSymbol;
                  case "ItemProjection":
                  return itemProjection;
                  case "MiniframeSymbol":
                  return miniframeSymbol;
                  case "SectionProjection":
                  return sectionProjection;
                  case "ShadedGeneralSymbol":
                  return shadedGeneralSymbol;
                  case "ShadedMiniframeSymbol":
                  return shadedMiniframeSymbol;
                  case "ShadedSectionProjection":
                  return shadedSectionProjection;
                  case "SubitemProjection":
                  return subitemProjection;
                  case "SubsubitemProjection":
                  return subsubitemProjection;}
               _E.Case($moduleName,
               "between lines 104 and 117");
            }();
         };
         var subsubitem = stylingGuide.subsubitem;
         var subitem = stylingGuide.subitem;
         var item = stylingGuide.item;
         var highlightText = stylingGuide.highlightText;
         var alertText = stylingGuide.alertText;
         var normalText = stylingGuide.normalText;
         var quaternaryTocShading = stylingGuide.shadingTocPallette.quaternary;
         var tertiaryTocShading = stylingGuide.shadingTocPallette.tertiary;
         var secondaryTocShading = stylingGuide.shadingTocPallette.secondary;
         var primaryTocShading = stylingGuide.shadingTocPallette.primary;
         var quaternarySidebarShading = stylingGuide.shadingSidebarPallette.quaternary;
         var tertiarySidebarShading = stylingGuide.shadingSidebarPallette.tertiary;
         var secondarySidebarShading = stylingGuide.shadingSidebarPallette.secondary;
         var primarySidebarShading = stylingGuide.shadingSidebarPallette.primary;
         var quaternaryShading = stylingGuide.shadingPallette.quaternary;
         var tertiaryShading = stylingGuide.shadingPallette.tertiary;
         var secondaryShading = stylingGuide.shadingPallette.secondary;
         var primaryShading = stylingGuide.shadingPallette.primary;
         var quaternarySidebar = stylingGuide.sidebarPallette.quaternary;
         var tertiarySidebar = stylingGuide.sidebarPallette.tertiary;
         var secondarySidebar = stylingGuide.sidebarPallette.secondary;
         var primarySidebar = stylingGuide.sidebarPallette.primary;
         var quaternary = stylingGuide.headFootPallette.quaternary;
         var tertiary = stylingGuide.headFootPallette.tertiary;
         var secondary = stylingGuide.headFootPallette.secondary;
         var primary = stylingGuide.headFootPallette.primary;
         var titleLike = stylingGuide.titleLike;
         var innerElements = stylingGuide.innerElements;
         var outerElements = stylingGuide.outerElements;
         var inner = stylingGuide.inner;
         var outer = stylingGuide.outer;
         var toStyle = function (parent) {
            return function () {
               switch (parent.ctor)
               {case "AlertText":
                  return alertText;
                  case "HighlightText":
                  return highlightText;
                  case "Inner": return inner;
                  case "InnerElements":
                  return innerElements;
                  case "Item": return item;
                  case "NormalText":
                  return normalText;
                  case "Outer": return outer;
                  case "OuterElements":
                  return outerElements;
                  case "Primary": return primary;
                  case "PrimaryShading":
                  return primaryShading;
                  case "PrimarySidebar":
                  return primarySidebar;
                  case "PrimarySidebarShading":
                  return primarySidebarShading;
                  case "PrimaryTocShading":
                  return primaryTocShading;
                  case "Quaternary":
                  return quaternary;
                  case "QuaternaryShading":
                  return quaternaryShading;
                  case "QuaternarySidebar":
                  return quaternarySidebar;
                  case "QuaternarySidebarShading":
                  return quaternarySidebarShading;
                  case "QuaternaryTocShading":
                  return quaternaryTocShading;
                  case "Secondary":
                  return secondary;
                  case "SecondaryShading":
                  return secondaryShading;
                  case "SecondarySidebar":
                  return secondarySidebar;
                  case "SecondarySidebarShading":
                  return secondarySidebarShading;
                  case "SecondaryTocShading":
                  return secondaryTocShading;
                  case "Subitem": return subitem;
                  case "Subsubitem":
                  return subsubitem;
                  case "Tertiary":
                  return tertiary;
                  case "TertiaryShading":
                  return tertiaryShading;
                  case "TertiarySidebar":
                  return tertiarySidebar;
                  case "TertiarySidebarShading":
                  return tertiarySidebarShading;
                  case "TertiaryTocShading":
                  return tertiaryTocShading;
                  case "TitleLike":
                  return titleLike;}
               _E.Case($moduleName,
               "between lines 70 and 103");
            }();
         };
         return {_: {}
                ,inner: A2(Dict.map,
                toStyle,
                mapping.inner)
                ,outer: A2(Dict.map,
                toStyle,
                mapping.outer)
                ,slideBackground: slideBG
                ,symbol: A2(Dict.map,
                toSymbolStyle,
                mapping.symbol)};
      }();
   });
   _elm.Themes.MapStyling.values = {_op: _op
                                   ,toStyleInfo: toStyleInfo};
   return _elm.Themes.MapStyling.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.Content = Elm.Utils.Content || {};
Elm.Utils.Content.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.Content = _elm.Utils.Content || {};
   if (_elm.Utils.Content.values)
   return _elm.Utils.Content.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.Content";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var Utils = Utils || {};
   Utils.Theme = Elm.Utils.Theme.make(_elm);
   var _op = {};
   var rawColumnContentToColumnContent = F2(function (rawList,
   numCol) {
      return function () {
         var partList = F2(function (list,
         id) {
            return _U.cmp(id,
            numCol) > 0 ? _L.fromArray([_L.fromArray([])]) : function () {
               var convertToColElem = function (rawColElem) {
                  return function () {
                     var intermediate = _U.remove("inColumnnPos",
                     rawColElem);
                     return _U.remove("containerColumn",
                     intermediate);
                  }();
               };
               var partedList = A2(List.partition,
               function (x) {
                  return _U.eq(x.containerColumn,
                  id);
               },
               list);
               var colElemList = List.map(convertToColElem)(List.sortBy(function (_) {
                  return _.inColumnnPos;
               })(Basics.fst(partedList)));
               return _L.append(_L.fromArray([colElemList]),
               A2(partList,
               Basics.snd(partedList),
               id + 1));
            }();
         });
         return A2(partList,rawList,1);
      }();
   });
   var getSymbolStyling = F2(function (templateId,
   styleInfo) {
      return function () {
         var lookIn = function (dict) {
            return A2(Dict.getOrFail,
            templateId,
            dict);
         };
         return function () {
            var _v0 = Utils.Theme.getDictType(templateId);
            switch (_v0)
            {case "symbol":
               return lookIn(styleInfo.symbol);}
            _E.Case($moduleName,
            "between lines 25 and 26");
         }();
      }();
   });
   var getStyling = F2(function (templateId,
   styleInfo) {
      return function () {
         var lookIn = function (dict) {
            return A2(Dict.getOrFail,
            templateId,
            dict);
         };
         return function () {
            var _v1 = Utils.Theme.getDictType(templateId);
            switch (_v1)
            {case "inner":
               return lookIn(styleInfo.inner);
               case "outer":
               return lookIn(styleInfo.outer);}
            _E.Case($moduleName,
            "between lines 17 and 19");
         }();
      }();
   });
   _elm.Utils.Content.values = {_op: _op
                               ,getStyling: getStyling
                               ,getSymbolStyling: getSymbolStyling
                               ,rawColumnContentToColumnContent: rawColumnContentToColumnContent};
   return _elm.Utils.Content.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.Theme = Elm.Utils.Theme || {};
Elm.Utils.Theme.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.Theme = _elm.Utils.Theme || {};
   if (_elm.Utils.Theme.values)
   return _elm.Utils.Theme.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.Theme";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Themes = Themes || {};
   Themes.SizeSettings = Elm.Themes.SizeSettings.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Intermediate = Elm.Types.Intermediate.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var updateStyleInfo = F2(function (styleLists,
   styleInfo) {
      return function () {
         var changeSymbolStyle = F2(function (item,
         styleDict) {
            return function () {
               var newStyle = Basics.snd(item);
               var change = function (oldStyle) {
                  return function () {
                     switch (oldStyle.ctor)
                     {case "Just":
                        return Maybe.Just(newStyle);
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 518 and 521");
                  }();
               };
               var templateId = Basics.fst(item);
               return A3(Dict.update,
               templateId,
               change,
               styleDict);
            }();
         });
         var updateStyleDict = F2(function (list,
         dict) {
            return A3(List.foldr,
            changeSymbolStyle,
            dict,
            list);
         });
         var changeStyle = F2(function (item,
         styleDict) {
            return function () {
               var newStyle = Basics.snd(item);
               var change = function (oldStyle) {
                  return function () {
                     switch (oldStyle.ctor)
                     {case "Just":
                        return Maybe.Just(newStyle);
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 509 and 512");
                  }();
               };
               var templateId = Basics.fst(item);
               return A3(Dict.update,
               templateId,
               change,
               styleDict);
            }();
         });
         var updateDict = F2(function (list,
         dict) {
            return A3(List.foldr,
            changeStyle,
            dict,
            list);
         });
         return {_: {}
                ,inner: A2(updateDict,
                styleLists.inner,
                styleInfo.inner)
                ,outer: A2(updateDict,
                styleLists.outer,
                styleInfo.outer)
                ,slideBackground: styleInfo.slideBackground
                ,symbol: A2(updateStyleDict,
                styleLists.symbol,
                styleInfo.symbol)};
      }();
   });
   var innerList = _L.fromArray([{ctor: "_Tuple2"
                                 ,_0: "block"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "framebox"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "imagebox"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "alertedblock"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "quiz"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "blocktitle"
                                 ,_1: "block"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "blocktitle"
                                 ,_1: "alertedblock"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "normal"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "highlight"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "alert"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "itemizeitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "itemizesubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "itemizesubsubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "enumerateitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "enumeratesubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "enumeratesubsubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "descriptionitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "descriptionsubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "descriptionsubsubitem"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "caption"
                                 ,_1: "imagebox"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "captionnameandnumber"
                                 ,_1: "imagebox"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "toc"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "section"
                                 ,_1: "toc"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsection"
                                 ,_1: "toc"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsubsection"
                                 ,_1: "toc"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsection"
                                 ,_1: "toc"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsection"
                                 ,_1: "toc"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsubsection"
                                 ,_1: "toc"}]);
   var outerList = _L.fromArray([{ctor: "_Tuple2"
                                 ,_0: "headline"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "footline"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "leftsidebar"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "rightsidebar"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "miniframes"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "logo"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "title"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "title"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "title"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "title"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subtitle"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subtitle"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subtitle"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subtitle"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "author"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "author"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "author"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "author"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "date"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "date"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "date"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "date"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "institute"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "institute"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "institute"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "institute"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidenumber"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidenumber"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidenumber"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidenumber"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "titlegraphic"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "sectiongraphic"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsectiongraphic"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidetitle"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "slidesubtitle"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "section"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "section"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "section"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "section"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsection"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsection"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsection"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsection"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsubsection"
                                 ,_1: "none"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsubsection"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsubsection"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "subsubsection"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsection"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsection"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsection"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsection"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsection"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsection"
                                 ,_1: "sidebar"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsubsection"
                                 ,_1: "headline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsubsection"
                                 ,_1: "footline"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "shadedsubsubsection"
                                 ,_1: "sidebar"}]);
   var getDictType = function (templateId) {
      return function () {
         var anyInner = A2(List.any,
         function (t) {
            return _U.eq(t,templateId);
         },
         innerList);
         var anyOuter = A2(List.any,
         function (t) {
            return _U.eq(t,templateId);
         },
         outerList);
         return anyOuter ? "outer" : anyInner ? "inner" : "symbol";
      }();
   };
   var separateList = function (parentList) {
      return function () {
         var separateIn = function (str) {
            return A2(List.filter,
            function (item) {
               return _U.eq(getDictType(Basics.fst(item)),
               str);
            },
            parentList);
         };
         return {_: {}
                ,inner: separateIn("inner")
                ,outer: separateIn("outer")
                ,symbol: separateIn("symbol")};
      }();
   };
   var updateMapping = F2(function (mapping,
   parentList) {
      return function () {
         var separatedList = separateList(parentList);
         var changeParent = F2(function (item,
         mappingDict) {
            return function () {
               var newParent = Basics.snd(item);
               var change = function (oldParent) {
                  return function () {
                     switch (oldParent.ctor)
                     {case "Just":
                        return Maybe.Just(newParent);
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 490 and 493");
                  }();
               };
               var templateId = Basics.fst(item);
               return A3(Dict.update,
               templateId,
               change,
               mappingDict);
            }();
         });
         var updateDict = F2(function (list,
         dict) {
            return A3(List.foldr,
            changeParent,
            dict,
            list);
         });
         return {_: {}
                ,inner: A2(updateDict,
                separatedList.inner,
                mapping.inner)
                ,outer: A2(updateDict,
                separatedList.outer,
                mapping.outer)
                ,symbol: A2(updateDict,
                separatedList.symbol,
                mapping.symbol)};
      }();
   });
   var getRealFontSize = F2(function (fs,
   normal) {
      return function () {
         var changeBy = function (number) {
            return function () {
               switch (normal.ctor)
               {case "Just":
                  return Maybe.Just(normal._0 + number);
                  case "Nothing":
                  return Maybe.Nothing;}
               _E.Case($moduleName,
               "between lines 204 and 207");
            }();
         };
         return function () {
            switch (fs.ctor)
            {case "FootnoteSize":
               return changeBy(-8);
               case "Huge": return changeBy(6);
               case "Large":
               return changeBy(2);
               case "NormalSize":
               return changeBy(0);
               case "ScriptSize":
               return changeBy(-10);
               case "Small":
               return changeBy(-3);
               case "Tiny":
               return changeBy(-12);
               case "VeryLarge":
               return changeBy(4);
               case "VerySmall":
               return changeBy(-6);}
            _E.Case($moduleName,
            "between lines 208 and 217");
         }();
      }();
   });
   var getNormalFontSize = Themes.SizeSettings.normalFontSize;
   var setPaddingColor = F2(function (oldPadStyle,
   newColor) {
      return _U.replace([["fillcolor"
                         ,newColor]],
      oldPadStyle);
   });
   var setPaddingThickness = F2(function (oldPadStyle,
   newThickness) {
      return _U.replace([["thickness"
                         ,newThickness]],
      oldPadStyle);
   });
   var setBorderDashing = F2(function (oldStyle,
   newDashing) {
      return function () {
         var newBorder = function () {
            var _v9 = oldStyle.border;
            switch (_v9.ctor)
            {case "Border":
               return Types.Theme.Border(_U.replace([["dashing"
                                                     ,newDashing]],
                 _v9._0));
               case "None":
               return Types.Theme.Border(_U.replace([["dashing"
                                                     ,newDashing]],
                 Graphics.Collage.defaultLine));}
            _E.Case($moduleName,
            "between lines 180 and 185");
         }();
         return _U.replace([["border"
                            ,newBorder]],
         oldStyle);
      }();
   });
   var setBorderColor = F2(function (oldStyle,
   newColor) {
      return function () {
         var newBorder = function () {
            var _v11 = oldStyle.border;
            switch (_v11.ctor)
            {case "Border":
               return Types.Theme.Border(_U.replace([["color"
                                                     ,newColor]],
                 _v11._0));
               case "None":
               return Types.Theme.Border(_U.replace([["color"
                                                     ,newColor]],
                 Graphics.Collage.defaultLine));}
            _E.Case($moduleName,
            "between lines 169 and 174");
         }();
         return _U.replace([["border"
                            ,newBorder]],
         oldStyle);
      }();
   });
   var setBorderWidth = F2(function (oldStyle,
   newWidth) {
      return function () {
         var newBorder = function () {
            var _v13 = oldStyle.border;
            switch (_v13.ctor)
            {case "Border":
               return _U.eq(newWidth,
                 0) ? Types.Theme.None : Types.Theme.Border(_U.replace([["width"
                                                                        ,newWidth]],
                 _v13._0));
               case "None":
               return _U.eq(newWidth,
                 0) ? Types.Theme.None : Types.Theme.Border(_U.replace([["width"
                                                                        ,newWidth]],
                 Graphics.Collage.defaultLine));}
            _E.Case($moduleName,
            "between lines 155 and 162");
         }();
         return _U.replace([["border"
                            ,newBorder]],
         oldStyle);
      }();
   });
   var setBorder = F2(function (oldStyle,
   newBorder) {
      return _U.replace([["border"
                         ,newBorder]],
      oldStyle);
   });
   var setSymbolShape = F2(function (oldStyle,
   newShape) {
      return _U.replace([["symbolShape"
                         ,newShape]],
      oldStyle);
   });
   var setSymbolFill = F2(function (oldStyle,
   newFill) {
      return _U.replace([["symbolFill"
                         ,newFill]],
      oldStyle);
   });
   var setSymbolAlpha = F2(function (oldStyle,
   newAlpha) {
      return _U.replace([["symbolAlpha"
                         ,newAlpha]],
      oldStyle);
   });
   var setTextColor = F2(function (oldStyle,
   newColor) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["color"
                                                      ,newColor]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   });
   var setTextFont = F2(function (oldStyle,
   newFont) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["typeface"
                                                      ,newFont]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   });
   var setTextSize = F2(function (oldStyle,
   newFontSize) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["height"
                                                      ,newFontSize]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   });
   var adjustFontSize = F2(function (fontSizeList,
   styleInfo) {
      return function () {
         var separateIn = function (str) {
            return A2(List.filter,
            function (item) {
               return _U.eq(getDictType(Basics.fst(item)),
               str);
            },
            fontSizeList);
         };
         var setFontSize = F2(function (symbolicSize,
         s) {
            return A2(setTextSize,
            s,
            A2(getRealFontSize,
            symbolicSize,
            getNormalFontSize));
         });
         var changeFontSize = F2(function (item,
         styleDict) {
            return function () {
               var newSize = Basics.snd(item);
               var change = function (oldStyle) {
                  return function () {
                     switch (oldStyle.ctor)
                     {case "Just":
                        return Maybe.Just(A2(setFontSize,
                          newSize,
                          oldStyle._0));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 542 and 545");
                  }();
               };
               var templateId = Basics.fst(item);
               return A3(Dict.update,
               templateId,
               change,
               styleDict);
            }();
         });
         var updateDict = F2(function (list,
         dict) {
            return A3(List.foldr,
            changeFontSize,
            dict,
            list);
         });
         var changeSymbolFontSize = F2(function (item,
         styleDict) {
            return function () {
               var newSize = Basics.snd(item);
               var change = function (oldStyle) {
                  return function () {
                     switch (oldStyle.ctor)
                     {case "Just":
                        return Maybe.Just(_U.replace([["general"
                                                      ,A2(setFontSize,
                                                      newSize,
                                                      oldStyle._0.general)]],
                          oldStyle._0));
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 550 and 553");
                  }();
               };
               var templateId = Basics.fst(item);
               return A3(Dict.update,
               templateId,
               change,
               styleDict);
            }();
         });
         var updateSymbolDict = F2(function (list,
         dict) {
            return A3(List.foldr,
            changeSymbolFontSize,
            dict,
            list);
         });
         return {_: {}
                ,inner: A2(updateDict,
                separateIn("inner"),
                styleInfo.inner)
                ,outer: A2(updateDict,
                separateIn("outer"),
                styleInfo.outer)
                ,slideBackground: styleInfo.slideBackground
                ,symbol: A2(updateSymbolDict,
                separateIn("symbol"),
                styleInfo.symbol)};
      }();
   });
   var unsetTextItalic = function (oldStyle) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["italic",false]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   };
   var setTextItalic = function (oldStyle) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["italic",true]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   };
   var unsetTextBold = function (oldStyle) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["bold",false]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   };
   var setTextBold = function (oldStyle) {
      return function () {
         var oldTextStyle = oldStyle.text.style;
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["style"
                                         ,_U.replace([["bold",true]],
                                         oldTextStyle)]],
                            oldText)]],
         oldStyle);
      }();
   };
   var setTextAlign = F2(function (oldStyle,
   alignFunc) {
      return function () {
         var oldText = oldStyle.text;
         return _U.replace([["text"
                            ,_U.replace([["align"
                                         ,alignFunc]],
                            oldText)]],
         oldStyle);
      }();
   });
   var getBackgroundColor = function (style) {
      return function () {
         var _v19 = style.background;
         switch (_v19.ctor)
         {case "Grad": return _v19._1;
            case "SingleColored":
            return _v19._0;
            case "Transparent":
            return A4(Color.rgba,0,0,0,0);}
         _E.Case($moduleName,
         "between lines 37 and 40");
      }();
   };
   var setBackGround = F2(function (oldStyle,
   newbackground) {
      return _U.replace([["background"
                         ,newbackground]],
      oldStyle);
   });
   var combineRawAndStyle = F2(function (raw,
   styling) {
      return function () {
         var changeSinglePadColor = F2(function (c,
         padStyle) {
            return function () {
               switch (c.ctor)
               {case "Just":
                  return A2(setPaddingColor,
                    padStyle,
                    c._0);
                  case "Nothing":
                  return padStyle;}
               _E.Case($moduleName,
               "between lines 262 and 266");
            }();
         });
         var changeSinglePadThickness = F2(function (t,
         padStyle) {
            return function () {
               switch (t.ctor)
               {case "Just":
                  return A2(setPaddingThickness,
                    padStyle,
                    t._0);
                  case "Nothing":
                  return padStyle;}
               _E.Case($moduleName,
               "between lines 259 and 262");
            }();
         });
         var changeSinglePad = F3(function (padStyle,
         t,
         c) {
            return changeSinglePadThickness(t)(A2(changeSinglePadColor,
            c,
            padStyle));
         });
         var changePadding = function (style) {
            return function () {
               var _v27 = raw.padding;
               switch (_v27.ctor)
               {case "Just":
                  return function () {
                       var pad = style.padding;
                       var allPads = {_: {}
                                     ,bottom: A3(changeSinglePad,
                                     pad.bottom,
                                     _v27._0.bottomThick,
                                     _v27._0.bottomColor)
                                     ,left: A3(changeSinglePad,
                                     pad.left,
                                     _v27._0.leftThick,
                                     _v27._0.leftColor)
                                     ,right: A3(changeSinglePad,
                                     pad.right,
                                     _v27._0.rightThick,
                                     _v27._0.rightColor)
                                     ,top: A3(changeSinglePad,
                                     pad.top,
                                     _v27._0.topThick,
                                     _v27._0.topColor)};
                       return _U.replace([["padding"
                                          ,allPads]],
                       style);
                    }();
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 268 and 279");
            }();
         };
         var changeBG = function (style) {
            return function () {
               var _v29 = raw.bg;
               switch (_v29.ctor)
               {case "Just":
                  return A2(setBackGround,
                    style,
                    _v29._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 256 and 259");
            }();
         };
         var changeBorderDashing = function (style) {
            return function () {
               var _v31 = raw.borderDashing;
               switch (_v31.ctor)
               {case "Just":
                  return A2(setBorderDashing,
                    style,
                    _v31._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 253 and 256");
            }();
         };
         var changeBorderColor = function (style) {
            return function () {
               var _v33 = raw.borderColor;
               switch (_v33.ctor)
               {case "Just":
                  return A2(setBorderColor,
                    style,
                    _v33._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 250 and 253");
            }();
         };
         var changeBorderWidth = function (style) {
            return function () {
               var _v35 = raw.borderWidth;
               switch (_v35.ctor)
               {case "Just":
                  return A2(setBorderWidth,
                    style,
                    _v35._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 247 and 250");
            }();
         };
         var changeFontAlign = function (style) {
            return function () {
               var _v37 = raw.fontAlign;
               switch (_v37.ctor)
               {case "Just":
                  return A2(setTextAlign,
                    style,
                    _v37._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 243 and 247");
            }();
         };
         var changeFontItalic = function (style) {
            return function () {
               var _v39 = raw.fontItalic;
               switch (_v39.ctor)
               {case "Just":
                  return _v39._0 ? setTextItalic(style) : unsetTextItalic(style);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 238 and 243");
            }();
         };
         var changeFontBold = function (style) {
            return function () {
               var _v41 = raw.fontBold;
               switch (_v41.ctor)
               {case "Just":
                  return _v41._0 ? setTextBold(style) : unsetTextBold(style);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 234 and 238");
            }();
         };
         var changeFontSize = function (style) {
            return function () {
               var _v43 = raw.fontSize;
               switch (_v43.ctor)
               {case "Just":
                  return A2(setTextSize,
                    style,
                    A2(getRealFontSize,
                    _v43._0,
                    Maybe.Just(16)));
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 231 and 234");
            }();
         };
         var changeFontColor = function (style) {
            return function () {
               var _v45 = raw.fontColor;
               switch (_v45.ctor)
               {case "Just":
                  return A2(setTextColor,
                    style,
                    _v45._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 228 and 231");
            }();
         };
         var changeFont = function (style) {
            return function () {
               var _v47 = raw.font;
               switch (_v47.ctor)
               {case "Just":
                  return A2(setTextFont,
                    style,
                    _v47._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 225 and 228");
            }();
         };
         return changeFont(changeFontColor(changeFontSize(changeFontBold(changeFontItalic(changeFontAlign(changeBorderWidth(changeBorderColor(changeBorderDashing(changeBG(changePadding(styling)))))))))));
      }();
   });
   var combineRawAndSymbolStyle = F2(function (raw,
   symbolStyling) {
      return function () {
         var generalStyle = symbolStyling.general;
         var changeAlpha = function (style) {
            return function () {
               var _v49 = raw.shapeAlpha;
               switch (_v49.ctor)
               {case "Just":
                  return A2(setSymbolAlpha,
                    style,
                    _v49._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 294 and 297");
            }();
         };
         var changeFill = function (style) {
            return function () {
               var _v51 = raw.shapeFill;
               switch (_v51.ctor)
               {case "Just":
                  return A2(setSymbolFill,
                    style,
                    _v51._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 291 and 294");
            }();
         };
         var changeShape = function (style) {
            return function () {
               var _v53 = raw.shape;
               switch (_v53.ctor)
               {case "Just":
                  return A2(setSymbolShape,
                    style,
                    _v53._0);
                  case "Nothing": return style;}
               _E.Case($moduleName,
               "between lines 288 and 291");
            }();
         };
         return changeShape(changeFill(changeAlpha(_U.replace([["general"
                                                               ,A2(combineRawAndStyle,
                                                               raw,
                                                               generalStyle)]],
         symbolStyling))));
      }();
   });
   var getUpdatedSymbolStyler = F3(function (rawParentDict,
   parent,
   style) {
      return function () {
         var raw = A2(Dict.getOrFail,
         parent,
         rawParentDict);
         return function () {
            switch (raw.ctor)
            {case "NewStyle":
               return A2(combineRawAndSymbolStyle,
                 raw._0,
                 style);
               case "NoChange": return style;}
            _E.Case($moduleName,
            "between lines 316 and 318");
         }();
      }();
   });
   var mergeSymbolWithRaw = F2(function (rawTemplateDict,
   templateDict) {
      return function () {
         var styleAfterRaw = F3(function (templateId,
         style,
         tDict) {
            return function () {
               var rawStyle = function () {
                  var _v57 = A2(Dict.get,
                  templateId,
                  rawTemplateDict);
                  switch (_v57.ctor)
                  {case "Just": return _v57._0;
                     case "Nothing":
                     return Types.Intermediate.NoChange;}
                  _E.Case($moduleName,
                  "between lines 338 and 341");
               }();
               var newStyle = function () {
                  switch (rawStyle.ctor)
                  {case "NewStyle":
                     return A2(combineRawAndSymbolStyle,
                       rawStyle._0,
                       style);
                     case "NoChange": return style;}
                  _E.Case($moduleName,
                  "between lines 341 and 344");
               }();
               return A3(Dict.insert,
               templateId,
               style,
               tDict);
            }();
         });
         return A3(Dict.foldr,
         styleAfterRaw,
         Dict.empty,
         templateDict);
      }();
   });
   var getUpdatedStyler = F3(function (rawParentDict,
   parent,
   style) {
      return function () {
         var raw = A2(Dict.getOrFail,
         parent,
         rawParentDict);
         return function () {
            switch (raw.ctor)
            {case "NewStyle":
               return A2(combineRawAndStyle,
                 raw._0,
                 style);
               case "NoChange": return style;}
            _E.Case($moduleName,
            "between lines 308 and 310");
         }();
      }();
   });
   var mergeWithRaw = F2(function (rawTemplateDict,
   templateDict) {
      return function () {
         var styleAfterRaw = F3(function (templateId,
         style,
         tDict) {
            return function () {
               var rawStyle = function () {
                  var _v63 = A2(Dict.get,
                  templateId,
                  rawTemplateDict);
                  switch (_v63.ctor)
                  {case "Just": return _v63._0;
                     case "Nothing":
                     return Types.Intermediate.NoChange;}
                  _E.Case($moduleName,
                  "between lines 324 and 327");
               }();
               var newStyle = function () {
                  switch (rawStyle.ctor)
                  {case "NewStyle":
                     return A2(combineRawAndStyle,
                       rawStyle._0,
                       style);
                     case "NoChange": return style;}
                  _E.Case($moduleName,
                  "between lines 327 and 330");
               }();
               return A3(Dict.insert,
               templateId,
               style,
               tDict);
            }();
         });
         return A3(Dict.foldr,
         styleAfterRaw,
         Dict.empty,
         templateDict);
      }();
   });
   var blendColors = F3(function (color1,
   color2,
   blendAlpha) {
      return function () {
         var average = F2(function (num1,
         num2) {
            return Basics.truncate(Basics.toFloat(num1) * blendAlpha + Basics.toFloat(num2) * (1 - blendAlpha));
         });
         var c2 = Color.toRgb(color2);
         var c1 = Color.toRgb(color1);
         var newR = A2(average,
         c1.red,
         c2.red);
         var newG = A2(average,
         c1.green,
         c2.green);
         var newB = A2(average,
         c1.blue,
         c2.blue);
         var bewA = c1.alpha * blendAlpha + c2.alpha * (1 - blendAlpha);
         return A3(Color.rgb,
         newR,
         newG,
         newB);
      }();
   });
   var blendBackground = F3(function (oldStyle,
   secondColor,
   blendAlpha) {
      return function () {
         var newColor = A3(blendColors,
         getBackgroundColor(oldStyle),
         secondColor,
         blendAlpha);
         return _U.replace([["background"
                            ,Types.Theme.SingleColored(newColor)]],
         oldStyle);
      }();
   });
   var blendTextColor = F3(function (oldStyle,
   secondColor,
   blendAlpha) {
      return function () {
         var newColor = A3(blendColors,
         oldStyle.text.style.color,
         secondColor,
         blendAlpha);
         return A2(setTextColor,
         oldStyle,
         newColor);
      }();
   });
   var shadeTextColor = F2(function (oldStyle,
   blendAlpha) {
      return function () {
         var newColor = A3(blendColors,
         oldStyle.text.style.color,
         getBackgroundColor(oldStyle),
         blendAlpha);
         return A2(setTextColor,
         oldStyle,
         newColor);
      }();
   });
   _elm.Utils.Theme.values = {_op: _op
                             ,blendColors: blendColors
                             ,setBackGround: setBackGround
                             ,getBackgroundColor: getBackgroundColor
                             ,blendBackground: blendBackground
                             ,setTextAlign: setTextAlign
                             ,setTextBold: setTextBold
                             ,unsetTextBold: unsetTextBold
                             ,setTextItalic: setTextItalic
                             ,unsetTextItalic: unsetTextItalic
                             ,setTextSize: setTextSize
                             ,setTextFont: setTextFont
                             ,setTextColor: setTextColor
                             ,blendTextColor: blendTextColor
                             ,shadeTextColor: shadeTextColor
                             ,setSymbolAlpha: setSymbolAlpha
                             ,setSymbolFill: setSymbolFill
                             ,setSymbolShape: setSymbolShape
                             ,setBorder: setBorder
                             ,setBorderWidth: setBorderWidth
                             ,setBorderColor: setBorderColor
                             ,setBorderDashing: setBorderDashing
                             ,setPaddingThickness: setPaddingThickness
                             ,setPaddingColor: setPaddingColor
                             ,getNormalFontSize: getNormalFontSize
                             ,getRealFontSize: getRealFontSize
                             ,combineRawAndStyle: combineRawAndStyle
                             ,combineRawAndSymbolStyle: combineRawAndSymbolStyle
                             ,getUpdatedStyler: getUpdatedStyler
                             ,getUpdatedSymbolStyler: getUpdatedSymbolStyler
                             ,mergeWithRaw: mergeWithRaw
                             ,mergeSymbolWithRaw: mergeSymbolWithRaw
                             ,outerList: outerList
                             ,innerList: innerList
                             ,getDictType: getDictType
                             ,separateList: separateList
                             ,updateMapping: updateMapping
                             ,updateStyleInfo: updateStyleInfo
                             ,adjustFontSize: adjustFontSize};
   return _elm.Utils.Theme.values;
};Elm.Themes = Elm.Themes || {};
Elm.Themes.SizeSettings = Elm.Themes.SizeSettings || {};
Elm.Themes.SizeSettings.make = function (_elm) {
   "use strict";
   _elm.Themes = _elm.Themes || {};
   _elm.Themes.SizeSettings = _elm.Themes.SizeSettings || {};
   if (_elm.Themes.SizeSettings.values)
   return _elm.Themes.SizeSettings.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Themes.SizeSettings";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var changeFontSizingList = _L.fromArray([{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subtitle"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.NormalSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "title"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Huge}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "author"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.NormalSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "date"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.NormalSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "institute"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.ScriptSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "section"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.VeryLarge}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Large}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "section"
                                                 ,_1: "headline"}
                                            ,_1: Types.Theme.Large}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsection"
                                                 ,_1: "headline"}
                                            ,_1: Types.Theme.Large}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "slidesubtitle"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.FootnoteSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "section"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsection"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsubsection"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsection"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsection"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsubsection"
                                                 ,_1: "sidebar"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "sectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsubsectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsubsectionprojection"
                                                 ,_1: "none"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsubsection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.FootnoteSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsubsection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.FootnoteSize}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "sectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Small}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Small}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "subsubsectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Small}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Small}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "shadedsubsubsectionprojection"
                                                 ,_1: "toc"}
                                            ,_1: Types.Theme.Tiny}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "caption"
                                                 ,_1: "imagebox"}
                                            ,_1: Types.Theme.Small}
                                           ,{ctor: "_Tuple2"
                                            ,_0: {ctor: "_Tuple2"
                                                 ,_0: "captionnameandnumber"
                                                 ,_1: "imagebox"}
                                            ,_1: Types.Theme.Small}]);
   var normalFontSize = Maybe.Just(30);
   var componentSizeInfo = {_: {}
                           ,footlineHeight: 0.1
                           ,headlineHeight: 0.1
                           ,itemTab: 0.1
                           ,leftSidebarWidth: 0.2
                           ,navigationSymbolHeight: 5.0e-2
                           ,rightSidebarWidth: 0.2
                           ,slideTitleHeight: 1.0e-2
                           ,slideTitleWidth: 1
                           ,textWidth: 1};
   var button = {_: {}
                ,coverage: 0.5
                ,height: 10
                ,offset: 5.0e-2
                ,width: 10};
   var itemProjection = {_: {}
                        ,coverage: 0.4
                        ,height: 20
                        ,offset: 1.0e-2
                        ,width: 20};
   var sectionProjection = {_: {}
                           ,coverage: 0.3
                           ,height: 20
                           ,offset: 1.0e-3
                           ,width: 20};
   var miniFrameSizing = {_: {}
                         ,coverage: 0.3
                         ,height: 20
                         ,offset: 2
                         ,width: 20};
   var generalSymbolSizing = {_: {}
                             ,coverage: 0.5
                             ,height: 20
                             ,offset: 0.2
                             ,width: 20};
   var symbolSizeInfo = {_: {}
                        ,button: button
                        ,generalSymbol: generalSymbolSizing
                        ,itemProjection: itemProjection
                        ,miniframe: miniFrameSizing
                        ,sectionProjection: sectionProjection};
   _elm.Themes.SizeSettings.values = {_op: _op
                                     ,generalSymbolSizing: generalSymbolSizing
                                     ,miniFrameSizing: miniFrameSizing
                                     ,sectionProjection: sectionProjection
                                     ,itemProjection: itemProjection
                                     ,button: button
                                     ,symbolSizeInfo: symbolSizeInfo
                                     ,componentSizeInfo: componentSizeInfo
                                     ,normalFontSize: normalFontSize
                                     ,changeFontSizingList: changeFontSizingList};
   return _elm.Themes.SizeSettings.values;
};Elm.Types = Elm.Types || {};
Elm.Types.Context = Elm.Types.Context || {};
Elm.Types.Context.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.Context = _elm.Types.Context || {};
   if (_elm.Types.Context.values)
   return _elm.Types.Context.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.Context";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Graphics.Input || {};
   Graphics.Input.Field = Elm.Graphics.Input.Field.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var SlateContext = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return {_: {}
                                        ,currentSlideIndex: c
                                        ,currentTick: e
                                        ,mode: f
                                        ,mousePosition: h
                                        ,previousSlideIndex: d
                                        ,quizButton: i
                                        ,quizContent: j
                                        ,windowHeight: b
                                        ,windowWidth: a
                                        ,zoomElem: g};
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var SlideContext = F3(function (a,
   b,
   c) {
      return {_: {}
             ,current: a
             ,currentTick: c
             ,previous: b};
   });
   var InZoomMode = {ctor: "InZoomMode"};
   var BeginZoomMode = {ctor: "BeginZoomMode"};
   var ScribbleMode = {ctor: "ScribbleMode"};
   var SupportBinZoomMode = {ctor: "SupportBinZoomMode"};
   var BeginSupportBinMode = {ctor: "BeginSupportBinMode"};
   var QuizMode = {ctor: "QuizMode"};
   var NormalMode = {ctor: "NormalMode"};
   var Asyn = function (a) {
      return {ctor: "Asyn",_0: a};
   };
   var DecTick = {ctor: "DecTick"};
   var IncTick = {ctor: "IncTick"};
   var Dec = {ctor: "Dec"};
   var Inc = {ctor: "Inc"};
   _elm.Types.Context.values = {_op: _op
                               ,Inc: Inc
                               ,Dec: Dec
                               ,IncTick: IncTick
                               ,DecTick: DecTick
                               ,Asyn: Asyn
                               ,NormalMode: NormalMode
                               ,QuizMode: QuizMode
                               ,BeginSupportBinMode: BeginSupportBinMode
                               ,SupportBinZoomMode: SupportBinZoomMode
                               ,ScribbleMode: ScribbleMode
                               ,BeginZoomMode: BeginZoomMode
                               ,InZoomMode: InZoomMode
                               ,SlideContext: SlideContext
                               ,SlateContext: SlateContext};
   return _elm.Types.Context.values;
};Elm.Types = Elm.Types || {};
Elm.Types.Intermediate = Elm.Types.Intermediate || {};
Elm.Types.Intermediate.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.Intermediate = _elm.Types.Intermediate || {};
   if (_elm.Types.Intermediate.values)
   return _elm.Types.Intermediate.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.Intermediate";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var RawPad = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,bottomColor: g
             ,bottomThick: c
             ,leftColor: e
             ,leftThick: a
             ,rightColor: f
             ,rightThick: b
             ,topColor: h
             ,topThick: d};
   });
   var RawSinglePad = F2(function (a,
   b) {
      return {_: {}
             ,fill: b
             ,thickness: a};
   });
   var Raw = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return function (k) {
                                    return function (l) {
                                       return function (m) {
                                          return function (n) {
                                             return {_: {}
                                                    ,bg: j
                                                    ,borderColor: h
                                                    ,borderDashing: i
                                                    ,borderWidth: g
                                                    ,font: a
                                                    ,fontAlign: f
                                                    ,fontBold: d
                                                    ,fontColor: b
                                                    ,fontItalic: e
                                                    ,fontSize: c
                                                    ,padding: k
                                                    ,shape: m
                                                    ,shapeAlpha: l
                                                    ,shapeFill: n};
                                          };
                                       };
                                    };
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var NewStyle = function (a) {
      return {ctor: "NewStyle"
             ,_0: a};
   };
   var NoChange = {ctor: "NoChange"};
   _elm.Types.Intermediate.values = {_op: _op
                                    ,NoChange: NoChange
                                    ,NewStyle: NewStyle
                                    ,Raw: Raw
                                    ,RawSinglePad: RawSinglePad
                                    ,RawPad: RawPad};
   return _elm.Types.Intermediate.values;
};Elm.Types = Elm.Types || {};
Elm.Types.Naive = Elm.Types.Naive || {};
Elm.Types.Naive.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.Naive = _elm.Types.Naive || {};
   if (_elm.Types.Naive.values)
   return _elm.Types.Naive.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.Naive";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var Quiz = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,correctAns: e
             ,explanation: f
             ,id: a
             ,options: d
             ,qtype: b
             ,question: c};
   });
   var Supportbin = F2(function (a,
   b) {
      return {_: {}
             ,id: a
             ,slideContent: b};
   });
   var SmartItem = F2(function (a,
   b) {
      return {_: {},body: b,id: a};
   });
   var SmartList = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,animation: d
             ,items: c
             ,layout: a
             ,otherLife: e
             ,sdType: b};
   });
   var ListItem = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,body: d
             ,id: a
             ,itemInfo: c
             ,itemType: b
             ,otherLife: e};
   });
   var SlateList = F2(function (a,
   b) {
      return {_: {}
             ,items: b
             ,layout: a};
   });
   var Imagebox = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,animation: e
             ,caption: d
             ,imageFile: b
             ,imageOptions: c
             ,layout: a
             ,otherLife: f};
   });
   var Framebox = F3(function (a,
   b,
   c) {
      return {_: {}
             ,body: b
             ,layout: a
             ,otherLife: c};
   });
   var Block = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,body: d
             ,isAlerted: b
             ,layout: a
             ,otherLife: e
             ,title: c};
   });
   var SlideContent = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,blocks: a
             ,frameboxes: c
             ,imageboxes: d
             ,simpletextboxes: b
             ,slateLists: e
             ,smartLists: f};
   });
   var Slide = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,columns: h
             ,id: a
             ,partOf: c
             ,quiz: g
             ,slideContent: i
             ,slideSubtitle: e
             ,slideTitle: d
             ,slideType: b
             ,supportbin: f};
   });
   var Animation = function (a) {
      return {_: {},tickLife: a};
   };
   var SlateText = F3(function (a,
   b,
   c) {
      return {_: {}
             ,animation: c
             ,inlinestyle: b
             ,parts: a};
   });
   var ElementLayout = F2(function (a,
   b) {
      return {_: {}
             ,containerColumn: a
             ,inColumnnPos: b};
   });
   var SizeInfo = F3(function (a,
   b,
   c) {
      return {_: {}
             ,id: a
             ,placement: c
             ,size: b};
   });
   var InsertInfo = F2(function (a,
   b) {
      return {_: {}
             ,columnid: b
             ,name: a};
   });
   var TemplateLayout = F3(function (a,
   b,
   c) {
      return {_: {}
             ,columns: b
             ,id: a
             ,inserts: c};
   });
   var FontInfo = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,align: c
             ,family: d
             ,shape: b
             ,size: a};
   });
   var TemplateFont = F3(function (a,
   b,
   c) {
      return {_: {}
             ,container: b
             ,fontInfo: c
             ,id: a};
   });
   var ColorInfo = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,bg: a
             ,border: c
             ,bottompadding: g
             ,fg: b
             ,leftpadding: d
             ,rightpadding: e
             ,toppadding: f};
   });
   var TemplateColor = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,colorInfo: c
             ,container: b
             ,id: a
             ,options: d};
   });
   var Options = F2(function (a,
   b) {
      return {_: {}
             ,option: a
             ,value: b};
   });
   var Canvas = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,border: a
             ,borderstyle: b
             ,bottompadding: f
             ,leftpadding: c
             ,rightpadding: d
             ,toppadding: e};
   });
   var TemplateCanvas = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,canvas: c
             ,container: b
             ,id: a
             ,options: d};
   });
   var Themes = F3(function (a,
   b,
   c) {
      return {_: {}
             ,font: c
             ,layout: a
             ,style: b};
   });
   var ThemeInfo = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,guidingCanvas: b
             ,guidingColors: c
             ,guidingFonts: d
             ,templateCanvas: e
             ,templateColors: f
             ,templateFonts: g
             ,templateLayout: h
             ,themes: a};
   });
   var ColumnInfo = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,columnAlign: c
             ,id: a
             ,inColumnAlign: d
             ,width: b};
   });
   var Section = F3(function (a,
   b,
   c) {
      return {_: {}
             ,id: a
             ,longName: c
             ,shortName: b};
   });
   var PresInfo = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return {_: {}
                                        ,authors: c
                                        ,date: e
                                        ,institute: d
                                        ,logo: f
                                        ,presSubTitle: b
                                        ,presTitle: a
                                        ,sectionGraphic: h
                                        ,sections: j
                                        ,subsectionGraphic: i
                                        ,titleGraphic: g};
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var Presentation = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,presInfo: a
             ,quizes: e
             ,slides: c
             ,supportbin: d
             ,themeInfo: b};
   });
   _elm.Types.Naive.values = {_op: _op
                             ,Presentation: Presentation
                             ,PresInfo: PresInfo
                             ,Section: Section
                             ,ColumnInfo: ColumnInfo
                             ,ThemeInfo: ThemeInfo
                             ,Themes: Themes
                             ,TemplateCanvas: TemplateCanvas
                             ,Canvas: Canvas
                             ,Options: Options
                             ,TemplateColor: TemplateColor
                             ,ColorInfo: ColorInfo
                             ,TemplateFont: TemplateFont
                             ,FontInfo: FontInfo
                             ,TemplateLayout: TemplateLayout
                             ,InsertInfo: InsertInfo
                             ,SizeInfo: SizeInfo
                             ,ElementLayout: ElementLayout
                             ,SlateText: SlateText
                             ,Animation: Animation
                             ,Slide: Slide
                             ,SlideContent: SlideContent
                             ,Block: Block
                             ,Framebox: Framebox
                             ,Imagebox: Imagebox
                             ,SlateList: SlateList
                             ,ListItem: ListItem
                             ,SmartList: SmartList
                             ,SmartItem: SmartItem
                             ,Supportbin: Supportbin
                             ,Quiz: Quiz};
   return _elm.Types.Naive.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.TickTracker = Elm.Utils.TickTracker || {};
Elm.Utils.TickTracker.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.TickTracker = _elm.Utils.TickTracker || {};
   if (_elm.Utils.TickTracker.values)
   return _elm.Utils.TickTracker.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.TickTracker";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Slate = Elm.Types.Slate.make(_elm);
   var _op = {};
   var filterOutLevel = F2(function (levels,
   sectionList) {
      return A2(List.filter,
      function (x) {
         return A2(List.any,
         function (y) {
            return _U.eq(List.length(x),
            y);
         },
         levels);
      },
      sectionList);
   });
   var findSubtree = F2(function (rt,
   treeList) {
      return function () {
         var len = List.length(rt) + 1;
         var allchildren = A2(filterOutLevel,
         _L.fromArray([len]),
         treeList);
         return {ctor: "::"
                ,_0: rt
                ,_1: A2(List.filter,
                function (x) {
                   return _U.eq(List.take(len - 1)(x),
                   rt);
                },
                treeList)};
      }();
   });
   var addAtBegin = F3(function (k,
   v,
   d) {
      return function () {
         var fun = function (old) {
            return function () {
               switch (old.ctor)
               {case "Just":
                  return Maybe.Just({ctor: "::"
                                    ,_0: v
                                    ,_1: old._0});
                  case "Nothing":
                  return Maybe.Nothing;}
               _E.Case($moduleName,
               "between lines 76 and 79");
            }();
         };
         return A3(Dict.update,k,fun,d);
      }();
   });
   var insertMarkerSlides = F3(function (marker,
   sec,
   slideDict) {
      return A3(List.foldl,
      F2(function (x,d) {
         return A3(addAtBegin,
         x,
         marker,
         d);
      }),
      slideDict,
      sec);
   });
   var add = F3(function (k,v,d) {
      return function () {
         var func = function (old) {
            return function () {
               switch (old.ctor)
               {case "Just":
                  return Maybe.Just(_L.append(old._0,
                    v));
                  case "Nothing":
                  return Maybe.Nothing;}
               _E.Case($moduleName,
               "between lines 69 and 72");
            }();
         };
         return A3(Dict.update,k,func,d);
      }();
   });
   var getSectionTick = F2(function (sectionIdList,
   slideList) {
      return function () {
         var subsections = A2(filterOutLevel,
         _L.fromArray([2]),
         sectionIdList);
         var sections = A2(filterOutLevel,
         _L.fromArray([1]),
         sectionIdList);
         var firstTick = F2(function (rt,
         tickD) {
            return function () {
               var func = F2(function (v,
               old) {
                  return function () {
                     switch (old.ctor)
                     {case "Just":
                        return Maybe.Just(v);
                        case "Nothing":
                        return Maybe.Nothing;}
                     _E.Case($moduleName,
                     "between lines 47 and 50");
                  }();
               });
               var updateWith = function (v) {
                  return A3(Dict.update,
                  rt,
                  func(v),
                  tickD);
               };
               var subtreeOfrt = A2(findSubtree,
               rt,
               sectionIdList);
               var ticksOfsubtree = A2(List.map,
               function (x) {
                  return A2(Dict.getOrFail,
                  x,
                  tickD);
               },
               subtreeOfrt);
               var validTicksOfSubtree = A2(List.filter,
               function (x) {
                  return !_U.eq(x,-100);
               },
               ticksOfsubtree);
               return List.isEmpty(validTicksOfSubtree) ? updateWith(-100) : updateWith(List.head(validTicksOfSubtree));
            }();
         });
         var onlyFirstTick = function (tickList) {
            return List.isEmpty(tickList) ? -100 : List.head(tickList);
         };
         var sect = A2(List.zip,
         sectionIdList,
         A2(List.repeat,
         List.length(sectionIdList),
         _L.fromArray([])));
         var sectionwiseSlidesDict = A2(List.foldl,
         F2(function (_v6,d) {
            return function () {
               switch (_v6.ctor)
               {case "_Tuple2":
                  switch (_v6._0.ctor)
                    {case "_Tuple2": return A3(add,
                         _v6._0._0,
                         _L.fromArray([_v6._1]),
                         d);}
                    break;}
               _E.Case($moduleName,
               "on line 34, column 58 to 75");
            }();
         }),
         Dict.fromList(sect))(A2(List.zip,
         slideList,
         _L.range(0,
         List.length(slideList) - 1)));
         var tickDict = A2(Dict.map,
         onlyFirstTick,
         sectionwiseSlidesDict);
         return A3(List.foldl,
         firstTick,
         A3(List.foldl,
         firstTick,
         tickDict,
         subsections),
         sections);
      }();
   });
   var getTickList = F4(function (isMarkSection,
   isMarkSubsection,
   sectionIdList,
   slideList) {
      return function () {
         var toSeparatedSlideIndex = function (_v12) {
            return function () {
               switch (_v12.ctor)
               {case "_Tuple2":
                  return A2(List.zip,
                    A2(List.repeat,
                    List.length(_v12._1),
                    _v12._0),
                    _v12._1);}
               _E.Case($moduleName,
               "between lines 24 and 26");
            }();
         };
         var subsections = A2(filterOutLevel,
         _L.fromArray([2]),
         sectionIdList);
         var sections = A2(filterOutLevel,
         _L.fromArray([1]),
         sectionIdList);
         var sect = A2(List.zip,
         sectionIdList,
         A2(List.repeat,
         List.length(sectionIdList),
         _L.fromArray([])));
         var sectionwiseSlidesDict = A3(List.foldl,
         F2(function (_v16,d) {
            return function () {
               switch (_v16.ctor)
               {case "_Tuple2": return A3(add,
                    _v16._0,
                    _L.fromArray([_v16._1]),
                    d);}
               _E.Case($moduleName,
               "on line 12, column 51 to 66");
            }();
         }),
         Dict.fromList(sect),
         slideList);
         var sectionsInserted = isMarkSection ? A3(insertMarkerSlides,
         -1,
         sections,
         sectionwiseSlidesDict) : sectionwiseSlidesDict;
         var subsectionsInserted = isMarkSubsection ? A3(insertMarkerSlides,
         -2,
         sections,
         sectionsInserted) : sectionsInserted;
         return A2(List.concatMap,
         toSeparatedSlideIndex,
         Dict.toList(subsectionsInserted));
      }();
   });
   _elm.Utils.TickTracker.values = {_op: _op
                                   ,getTickList: getTickList
                                   ,getSectionTick: getSectionTick
                                   ,add: add
                                   ,addAtBegin: addAtBegin
                                   ,insertMarkerSlides: insertMarkerSlides
                                   ,filterOutLevel: filterOutLevel
                                   ,findSubtree: findSubtree};
   return _elm.Utils.TickTracker.values;
};Elm.Types = Elm.Types || {};
Elm.Types.Slate = Elm.Types.Slate || {};
Elm.Types.Slate.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.Slate = _elm.Types.Slate || {};
   if (_elm.Types.Slate.values)
   return _elm.Types.Slate.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.Slate";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var _op = {};
   var CurrentInfoForOuter = F3(function (a,
   b,
   c) {
      return {_: {}
             ,currentSlideNumber: b
             ,maxSlideNumber: c
             ,route: a};
   });
   var RawColumnContent = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,body: c
             ,containerColumn: a
             ,inColumnnPos: b
             ,otherLife: d};
   });
   var ConcreteSizeInfo = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,content: g
             ,footline: d
             ,headline: c
             ,leftSidebar: a
             ,navigationSymbol: e
             ,rightSidebar: b
             ,slideTitle: f};
   });
   var Quiz = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,correctAns: e
             ,explanation: f
             ,id: a
             ,options: d
             ,qtype: b
             ,question: c};
   });
   var Supportbin = F2(function (a,
   b) {
      return {_: {}
             ,content: b
             ,supportbinId: a};
   });
   var ContentElement = F2(function (a,
   b) {
      return {_: {}
             ,animation: b
             ,element: a};
   });
   var ColumnContent = F2(function (a,
   b) {
      return {_: {}
             ,body: a
             ,otherLife: b};
   });
   var Column = F2(function (a,b) {
      return {_: {}
             ,colAlign: a
             ,content: b};
   });
   var ContentSlide = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,partOf: c
             ,quiz: g
             ,slideContent: h
             ,slideId: a
             ,slideType: b
             ,subtitle: e
             ,supportbin: f
             ,title: d};
   });
   var NormalSlide = {ctor: "NormalSlide"};
   var SupportbinSlide = {ctor: "SupportbinSlide"};
   var TitleSlide = {ctor: "TitleSlide"};
   var SubsectionSlide = {ctor: "SubsectionSlide"};
   var SectionSlide = {ctor: "SectionSlide"};
   var PlainSlide = {ctor: "PlainSlide"};
   var Animation = function (a) {
      return {_: {},tickLife: a};
   };
   _elm.Types.Slate.values = {_op: _op
                             ,PlainSlide: PlainSlide
                             ,SectionSlide: SectionSlide
                             ,SubsectionSlide: SubsectionSlide
                             ,TitleSlide: TitleSlide
                             ,SupportbinSlide: SupportbinSlide
                             ,NormalSlide: NormalSlide
                             ,Animation: Animation
                             ,ContentSlide: ContentSlide
                             ,Column: Column
                             ,ColumnContent: ColumnContent
                             ,ContentElement: ContentElement
                             ,Supportbin: Supportbin
                             ,Quiz: Quiz
                             ,ConcreteSizeInfo: ConcreteSizeInfo
                             ,RawColumnContent: RawColumnContent
                             ,CurrentInfoForOuter: CurrentInfoForOuter};
   return _elm.Types.Slate.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.SmartDisplay = Elm.Utils.SmartDisplay || {};
Elm.Utils.SmartDisplay.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.SmartDisplay = _elm.Utils.SmartDisplay || {};
   if (_elm.Utils.SmartDisplay.values)
   return _elm.Utils.SmartDisplay.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.SmartDisplay";
   var Array = Elm.Array.make(_elm);
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.SmartDisplay = Elm.Types.SmartDisplay.make(_elm);
   var Utils = Utils || {};
   Utils.Naive = Elm.Utils.Naive.make(_elm);
   var _op = {};
   var getImage = function (str) {
      return function () {
         var fileName = function (x) {
            return _L.append("Symbols/SDSymbols/SD",
            _L.append(x,".gif"));
         };
         return function () {
            switch (str)
            {case "equal":
               return fileName("Equal");
               case "minus":
               return fileName("Minus");
               case "plus":
               return fileName("Plus");}
            _E.Case($moduleName,
            "between lines 172 and 175");
         }();
      }();
   };
   var checkbox = A3(Graphics.Collage.collage,
   20,
   20,
   _L.fromArray([Graphics.Collage.outlined(Graphics.Collage.solid(Color.charcoal))(Graphics.Collage.square(10))]));
   var insertCheckbox = function (elem) {
      return A2(Graphics.Element.flow,
      Graphics.Element.right,
      _L.fromArray([checkbox,elem]));
   };
   var subbullet = A3(Graphics.Collage.collage,
   30,
   10,
   _L.fromArray([Graphics.Collage.filled(Color.black)(Graphics.Collage.square(3))]));
   var insertSubBullet = function (elem) {
      return A2(Graphics.Element.flow,
      Graphics.Element.right,
      _L.fromArray([subbullet
                   ,A2(Graphics.Element.spacer,
                   5,
                   Graphics.Element.heightOf(elem))
                   ,elem]));
   };
   var bullet = A3(Graphics.Collage.collage,
   10,
   10,
   _L.fromArray([Graphics.Collage.filled(Color.black)(Graphics.Collage.circle(4))]));
   var insertBullet = function (elem) {
      return A2(Graphics.Element.flow,
      Graphics.Element.right,
      _L.fromArray([bullet
                   ,A2(Graphics.Element.spacer,
                   5,
                   Graphics.Element.heightOf(elem))
                   ,elem]));
   };
   var getRectangle = F2(function (_v1,
   funcGrad) {
      return function () {
         switch (_v1.ctor)
         {case "_Tuple2":
            return A3(Graphics.Collage.collage,
              _v1._0,
              _v1._1,
              _L.fromArray([Graphics.Collage.gradient(funcGrad(Basics.toFloat(_v1._0)))(A2(Graphics.Collage.rect,
              Basics.toFloat(_v1._0),
              Basics.toFloat(_v1._1)))]));}
         _E.Case($moduleName,
         "on line 145, column 3 to 80");
      }();
   });
   var getHorizontalDivider = function (w) {
      return Graphics.Element.color(Color.grey)(A2(Graphics.Element.spacer,
      w,
      4));
   };
   var getVerticalDivider = function (h) {
      return Graphics.Element.color(Color.black)(A2(Graphics.Element.spacer,
      2,
      h));
   };
   var getFrameBody = function (_v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return A3(Graphics.Collage.collage,
              _v5._0,
              _v5._1,
              _L.fromArray([Graphics.Collage.outlined(_U.replace([["width"
                                                                  ,10]
                                                                 ,["color"
                                                                  ,Color.darkGrey]],
              Graphics.Collage.defaultLine))(A2(Graphics.Collage.rect,
              Basics.toFloat(_v5._0),
              Basics.toFloat(_v5._1)))]));}
         _E.Case($moduleName,
         "between lines 126 and 127");
      }();
   };
   var lgrad2 = function (x) {
      return A3(Color.linear,
      {ctor: "_Tuple2",_0: x,_1: 0},
      {ctor: "_Tuple2",_0: x,_1: x},
      _L.fromArray([{ctor: "_Tuple2"
                    ,_0: 0
                    ,_1: A3(Color.rgb,174,188,191)}
                   ,{ctor: "_Tuple2"
                    ,_0: 0.47
                    ,_1: A3(Color.rgb,110,119,116)}
                   ,{ctor: "_Tuple2"
                    ,_0: 0.59
                    ,_1: A3(Color.rgb,10,14,10)}
                   ,{ctor: "_Tuple2"
                    ,_0: 1
                    ,_1: Color.black}]));
   };
   var getBlockHeading = function (_v9) {
      return function () {
         switch (_v9.ctor)
         {case "_Tuple2":
            return A2(getRectangle,
              {ctor: "_Tuple2"
              ,_0: _v9._0
              ,_1: _v9._1},
              lgrad2);}
         _E.Case($moduleName,
         "on line 132, column 3 to 28");
      }();
   };
   var lgrad1 = function (x) {
      return A3(Color.linear,
      {ctor: "_Tuple2",_0: x,_1: 0},
      {ctor: "_Tuple2",_0: x,_1: x},
      _L.fromArray([{ctor: "_Tuple2"
                    ,_0: 0
                    ,_1: Color.grey}
                   ,{ctor: "_Tuple2"
                    ,_0: 0.5
                    ,_1: A3(Color.rgb,105,99,99)}
                   ,{ctor: "_Tuple2"
                    ,_0: 0.55
                    ,_1: A3(Color.rgb,225,225,225)}
                   ,{ctor: "_Tuple2"
                    ,_0: 1
                    ,_1: Color.grey}]));
   };
   var getBlockBody = function (_v13) {
      return function () {
         switch (_v13.ctor)
         {case "_Tuple2":
            return A2(getRectangle,
              {ctor: "_Tuple2"
              ,_0: _v13._0
              ,_1: _v13._1},
              lgrad1);}
         _E.Case($moduleName,
         "on line 122, column 3 to 28");
      }();
   };
   var rgrad1 = function (x) {
      return A5(Color.radial,
      {ctor: "_Tuple2",_0: 0,_1: 0},
      x * 0.5,
      {ctor: "_Tuple2",_0: 0,_1: 10},
      x * 0.9,
      _L.fromArray([{ctor: "_Tuple2"
                    ,_0: 0
                    ,_1: Color.darkGrey}
                   ,{ctor: "_Tuple2"
                    ,_0: 0.8
                    ,_1: Color.grey}
                   ,{ctor: "_Tuple2"
                    ,_0: 1
                    ,_1: Color.darkGrey}]));
   };
   var getCircle = function (r) {
      return A2(Graphics.Collage.gradient,
      rgrad1(r),
      Graphics.Collage.circle(r));
   };
   var scaleItem = F2(function (w,
   elem) {
      return function () {
         var scaleFactor = Basics.toFloat(w) / Basics.toFloat(Graphics.Element.widthOf(elem));
         var newH = Basics.truncate(scaleFactor * Basics.toFloat(Graphics.Element.heightOf(elem)));
         return A3(Graphics.Collage.collage,
         w,
         newH,
         _L.fromArray([Graphics.Collage.scale(scaleFactor)(Graphics.Collage.toForm(elem))]));
      }();
   });
   var drawLine = F2(function (initial,
   finals) {
      return function () {
         var makeLine = function (f) {
            return Graphics.Collage.traced(Graphics.Collage.solid(Color.black))(A2(Graphics.Collage.segment,
            initial,
            f));
         };
         return A2(List.map,
         makeLine,
         finals);
      }();
   });
   var distribute = F2(function (distPoints,
   initial) {
      return List.map(function (_v17) {
         return function () {
            switch (_v17.ctor)
            {case "_Tuple2":
               return A2(Graphics.Collage.move,
                 _v17._0,
                 _v17._1);}
            _E.Case($moduleName,
            "on line 82, column 20 to 29");
         }();
      })(A2(List.zip,
      distPoints,
      initial));
   });
   var getdistributePoints = F2(function (r,
   distAngles) {
      return A2(List.map,
      function (a) {
         return {ctor: "_Tuple2"
                ,_0: r * Basics.cos(a)
                ,_1: r * Basics.sin(a)};
      },
      distAngles);
   });
   var getdistributionAngles = F2(function (n,
   sdType) {
      return function () {
         var extremePoint = Basics.truncate(Basics.toFloat(n) / 2);
         var distriPoints = List.reverse(_L.range(0 - extremePoint,
         extremePoint));
         var shift = _U.eq(A2(Basics.mod,
         n,
         2),
         0) ? 0.5 : 0;
         var completeAngle = function () {
            switch (sdType.ctor)
            {case "CircleCone": return 120;
               case "CircleFull": return 360;
               case "CircleHalf": return 180;}
            _E.Case($moduleName,
            "between lines 64 and 68");
         }();
         var dTheta = Basics.degrees(completeAngle / Basics.toFloat(n));
         return A2(List.map,
         function (x) {
            return (Basics.toFloat(x) - shift) * dTheta;
         },
         distriPoints);
      }();
   });
   var getLevelNumber = F2(function (level,
   route) {
      return _U.cmp(level,
      List.length(route)) > 0 ? -1 : List.last(A2(List.take,
      level,
      route));
   });
   var getItemFromRoute = function (route) {
      return A2(getLevelNumber,
      1,
      route);
   };
   var getSubitemFromRoute = function (route) {
      return A2(getLevelNumber,
      2,
      route);
   };
   var getSubsubitemFromRoute = function (route) {
      return A2(getLevelNumber,
      3,
      route);
   };
   var filterOutLevel = F2(function (levels,
   itemList) {
      return A2(List.filter,
      function (x) {
         return A2(List.any,
         function (y) {
            return _U.eq(List.length(x.route),
            y);
         },
         levels);
      },
      itemList);
   });
   var filterOutSubsubitems = function (itemList) {
      return A2(filterOutLevel,
      _L.fromArray([3]),
      itemList);
   };
   var filterOutSubsubitemsOfSubitem = F2(function (currentRoute,
   itemList) {
      return function () {
         var currentSubitem = getSubitemFromRoute(currentRoute);
         var currentItem = getItemFromRoute(currentRoute);
         return List.filter(function (x) {
            return _U.eq(getItemFromRoute(x.route),
            currentItem);
         })(List.filter(function (x) {
            return _U.eq(getSubitemFromRoute(x.route),
            currentSubitem);
         })(filterOutSubsubitems(itemList)));
      }();
   });
   var filterOutSubitems = function (itemList) {
      return A2(filterOutLevel,
      _L.fromArray([2]),
      itemList);
   };
   var filterOutSubitemsOfItem = F2(function (currentRoute,
   itemList) {
      return function () {
         var currentItem = getItemFromRoute(currentRoute);
         return List.filter(function (x) {
            return _U.eq(getItemFromRoute(x.route),
            currentItem);
         })(filterOutSubitems(itemList));
      }();
   });
   var filterOutItems = function (itemList) {
      return A2(filterOutLevel,
      _L.fromArray([1]),
      itemList);
   };
   var getItemAt = F2(function (ind,
   itemList) {
      return function () {
         var items = filterOutItems(itemList);
         return A2(Array.get,
         ind - 1,
         Array.fromList(items));
      }();
   });
   _elm.Utils.SmartDisplay.values = {_op: _op
                                    ,getItemAt: getItemAt
                                    ,filterOutItems: filterOutItems
                                    ,filterOutSubitems: filterOutSubitems
                                    ,filterOutSubsubitems: filterOutSubsubitems
                                    ,filterOutSubitemsOfItem: filterOutSubitemsOfItem
                                    ,filterOutSubsubitemsOfSubitem: filterOutSubsubitemsOfSubitem
                                    ,filterOutLevel: filterOutLevel
                                    ,getLevelNumber: getLevelNumber
                                    ,getItemFromRoute: getItemFromRoute
                                    ,getSubitemFromRoute: getSubitemFromRoute
                                    ,getSubsubitemFromRoute: getSubsubitemFromRoute
                                    ,getdistributionAngles: getdistributionAngles
                                    ,getdistributePoints: getdistributePoints
                                    ,distribute: distribute
                                    ,drawLine: drawLine
                                    ,scaleItem: scaleItem
                                    ,getCircle: getCircle
                                    ,rgrad1: rgrad1
                                    ,lgrad1: lgrad1
                                    ,lgrad2: lgrad2
                                    ,getBlockBody: getBlockBody
                                    ,getFrameBody: getFrameBody
                                    ,getBlockHeading: getBlockHeading
                                    ,getVerticalDivider: getVerticalDivider
                                    ,getHorizontalDivider: getHorizontalDivider
                                    ,getRectangle: getRectangle
                                    ,bullet: bullet
                                    ,insertBullet: insertBullet
                                    ,subbullet: subbullet
                                    ,insertSubBullet: insertSubBullet
                                    ,checkbox: checkbox
                                    ,insertCheckbox: insertCheckbox
                                    ,getImage: getImage};
   return _elm.Utils.SmartDisplay.values;
};Elm.Types = Elm.Types || {};
Elm.Types.SmartDisplay = Elm.Types.SmartDisplay || {};
Elm.Types.SmartDisplay.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.SmartDisplay = _elm.Types.SmartDisplay || {};
   if (_elm.Types.SmartDisplay.values)
   return _elm.Types.SmartDisplay.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.SmartDisplay";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var FramedList = {ctor: "FramedList"};
   var ContainerList = {ctor: "ContainerList"};
   var CheckBoxComparision = {ctor: "CheckBoxComparision"};
   var ParagraphList = {ctor: "ParagraphList"};
   var PlusMinus = {ctor: "PlusMinus"};
   var PlusEqualVertical = {ctor: "PlusEqualVertical"};
   var PlusEqualHorizontal = {ctor: "PlusEqualHorizontal"};
   var CircleCone = {ctor: "CircleCone"};
   var CircleHalf = {ctor: "CircleHalf"};
   var CircleFull = {ctor: "CircleFull"};
   var SmartItem = F2(function (a,
   b) {
      return {_: {}
             ,body: b
             ,route: a};
   });
   var SmartDisplay = F3(function (a,
   b,
   c) {
      return {_: {}
             ,items: c
             ,sdType: b
             ,width: a};
   });
   _elm.Types.SmartDisplay.values = {_op: _op
                                    ,CircleFull: CircleFull
                                    ,CircleHalf: CircleHalf
                                    ,CircleCone: CircleCone
                                    ,PlusEqualHorizontal: PlusEqualHorizontal
                                    ,PlusEqualVertical: PlusEqualVertical
                                    ,PlusMinus: PlusMinus
                                    ,ParagraphList: ParagraphList
                                    ,CheckBoxComparision: CheckBoxComparision
                                    ,ContainerList: ContainerList
                                    ,FramedList: FramedList
                                    ,SmartDisplay: SmartDisplay
                                    ,SmartItem: SmartItem};
   return _elm.Types.SmartDisplay.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.Displayer = Elm.Utils.Displayer || {};
Elm.Utils.Displayer.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.Displayer = _elm.Utils.Displayer || {};
   if (_elm.Utils.Displayer.values)
   return _elm.Utils.Displayer.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.Displayer";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Types = Types || {};
   Types.Theme = Elm.Types.Theme.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var getNthFromList = F2(function (n,
   _v0) {
      return function () {
         switch (_v0.ctor)
         {case "::": return function () {
                 var nmod = A2(Basics.mod,
                 n,
                 List.length({ctor: "::"
                             ,_0: _v0._0
                             ,_1: _v0._1}));
                 return _U.eq(nmod,
                 0) ? _v0._0 : A2(getNthFromList,
                 nmod - 1,
                 _v0._1);
              }();}
         _E.Case($moduleName,
         "between lines 10 and 12");
      }();
   });
   _elm.Utils.Displayer.values = {_op: _op
                                 ,getNthFromList: getNthFromList};
   return _elm.Utils.Displayer.values;
};Elm.Types = Elm.Types || {};
Elm.Types.Theme = Elm.Types.Theme || {};
Elm.Types.Theme.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   _elm.Types.Theme = _elm.Types.Theme || {};
   if (_elm.Types.Theme.values)
   return _elm.Types.Theme.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Types.Theme";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Dict = Elm.Dict.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var Section = F3(function (a,
   b,
   c) {
      return {_: {}
             ,longName: c
             ,route: a
             ,shortName: b};
   });
   var PresInfo = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,authors: c
             ,date: e
             ,institute: d
             ,logo: f
             ,presSubTitle: b
             ,presTitle: a
             ,sectionGraphic: h
             ,subsectionGraphic: i
             ,titleGraphic: g};
   });
   var Theme = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,componentSize: b
             ,layout: d
             ,style: a
             ,symbolSize: c};
   });
   var StyleInfo = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,inner: b
             ,outer: a
             ,slideBackground: d
             ,symbol: c};
   });
   var StyleLists = F3(function (a,
   b,
   c) {
      return {_: {}
             ,inner: b
             ,outer: a
             ,symbol: c};
   });
   var StyleGuide = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return function (k) {
                                    return function (l) {
                                       return function (m) {
                                          return function (n) {
                                             return function (o) {
                                                return function (p) {
                                                   return function (q) {
                                                      return function (r) {
                                                         return function (s) {
                                                            return function (t) {
                                                               return {_: {}
                                                                      ,alertText: l
                                                                      ,headFootPallette: f
                                                                      ,highlightText: m
                                                                      ,inner: b
                                                                      ,innerElements: d
                                                                      ,item: n
                                                                      ,itemProjection: q
                                                                      ,normalText: k
                                                                      ,outer: a
                                                                      ,outerElements: c
                                                                      ,shadingPallette: h
                                                                      ,shadingSidebarPallette: i
                                                                      ,shadingTocPallette: j
                                                                      ,sidebarPallette: g
                                                                      ,subitem: o
                                                                      ,subitemProjection: r
                                                                      ,subsubitem: p
                                                                      ,subsubitemProjection: s
                                                                      ,symbolBoard: t
                                                                      ,titleLike: e};
                                                            };
                                                         };
                                                      };
                                                   };
                                                };
                                             };
                                          };
                                       };
                                    };
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var SymbolBoard = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,button: g
             ,generalSymbol: c
             ,miniframeSymbol: a
             ,sectionProjection: e
             ,shadedGeneralSymbol: d
             ,shadedMiniframeSymbol: b
             ,shadedSectionProjection: f};
   });
   var Pallette = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,primary: a
             ,quaternary: d
             ,secondary: b
             ,tertiary: c};
   });
   var Mapping = F3(function (a,
   b,
   c) {
      return {_: {}
             ,inner: b
             ,outer: a
             ,symbol: c};
   });
   var SeparatedParentList = F3(function (a,
   b,
   c) {
      return {_: {}
             ,inner: b
             ,outer: a
             ,symbol: c};
   });
   var Button = {ctor: "Button"};
   var ShadedSectionProjection = {ctor: "ShadedSectionProjection"};
   var SectionProjection = {ctor: "SectionProjection"};
   var ShadedGeneralSymbol = {ctor: "ShadedGeneralSymbol"};
   var GeneralSymbol = {ctor: "GeneralSymbol"};
   var ShadedMiniframeSymbol = {ctor: "ShadedMiniframeSymbol"};
   var MiniframeSymbol = {ctor: "MiniframeSymbol"};
   var SubsubitemProjection = {ctor: "SubsubitemProjection"};
   var SubitemProjection = {ctor: "SubitemProjection"};
   var ItemProjection = {ctor: "ItemProjection"};
   var Subsubitem = {ctor: "Subsubitem"};
   var Subitem = {ctor: "Subitem"};
   var Item = {ctor: "Item"};
   var QuaternaryTocShading = {ctor: "QuaternaryTocShading"};
   var TertiaryTocShading = {ctor: "TertiaryTocShading"};
   var SecondaryTocShading = {ctor: "SecondaryTocShading"};
   var PrimaryTocShading = {ctor: "PrimaryTocShading"};
   var QuaternarySidebarShading = {ctor: "QuaternarySidebarShading"};
   var TertiarySidebarShading = {ctor: "TertiarySidebarShading"};
   var SecondarySidebarShading = {ctor: "SecondarySidebarShading"};
   var PrimarySidebarShading = {ctor: "PrimarySidebarShading"};
   var QuaternaryShading = {ctor: "QuaternaryShading"};
   var TertiaryShading = {ctor: "TertiaryShading"};
   var SecondaryShading = {ctor: "SecondaryShading"};
   var PrimaryShading = {ctor: "PrimaryShading"};
   var QuaternarySidebar = {ctor: "QuaternarySidebar"};
   var TertiarySidebar = {ctor: "TertiarySidebar"};
   var SecondarySidebar = {ctor: "SecondarySidebar"};
   var PrimarySidebar = {ctor: "PrimarySidebar"};
   var Quaternary = {ctor: "Quaternary"};
   var Tertiary = {ctor: "Tertiary"};
   var Secondary = {ctor: "Secondary"};
   var Primary = {ctor: "Primary"};
   var HighlightText = {ctor: "HighlightText"};
   var AlertText = {ctor: "AlertText"};
   var NormalText = {ctor: "NormalText"};
   var TitleLike = {ctor: "TitleLike"};
   var InnerElements = {ctor: "InnerElements"};
   var OuterElements = {ctor: "OuterElements"};
   var Inner = {ctor: "Inner"};
   var Outer = {ctor: "Outer"};
   var NoFoot = {ctor: "NoFoot"};
   var AuthorInstituteTitle = {ctor: "AuthorInstituteTitle"};
   var InstituteTitle = {ctor: "InstituteTitle"};
   var AuthorTitle = {ctor: "AuthorTitle"};
   var RightSidebar = {ctor: "RightSidebar"};
   var LeftSidebar = {ctor: "LeftSidebar"};
   var LayoutInfo = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return {_: {}
                                        ,atBeginSectionSlide: g
                                        ,atBeginSubsectionSlide: h
                                        ,footline: b
                                        ,headline: a
                                        ,leftSidebar: c
                                        ,modechangeSymbols: f
                                        ,navigationalSymbols: e
                                        ,rightSidebar: d
                                        ,titleSlide: j
                                        ,tocSlide: i};
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var TocOptions = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,currentSection: c
             ,currentSubsectionOfCurrentSection: e
             ,otherSection: d
             ,otherSubsectionOfCurrentSection: f
             ,pauseSections: a
             ,pauseSubsections: b
             ,subsectionOfOtherSection: g};
   });
   var Shade = {ctor: "Shade"};
   var Hide = {ctor: "Hide"};
   var Show = {ctor: "Show"};
   var Vertical = {ctor: "Vertical"};
   var Horizontal = {ctor: "Horizontal"};
   var Layout = function (a) {
      return {ctor: "Layout"
             ,_0: a};
   };
   var Empty = {ctor: "Empty"};
   var LayoutDetails = F2(function (a,
   b) {
      return {_: {}
             ,columns: a
             ,inserts: b};
   });
   var Insert = F2(function (a,b) {
      return {_: {}
             ,column: b
             ,id: a};
   });
   var Column = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,colAlign: d
             ,id: a
             ,placement: c
             ,width: b};
   });
   var CenterAlign = {ctor: "CenterAlign"};
   var BottomAlign = {ctor: "BottomAlign"};
   var TopAlign = {ctor: "TopAlign"};
   var Huge = {ctor: "Huge"};
   var VeryLarge = {ctor: "VeryLarge"};
   var Large = {ctor: "Large"};
   var NormalSize = {ctor: "NormalSize"};
   var Small = {ctor: "Small"};
   var VerySmall = {ctor: "VerySmall"};
   var FootnoteSize = {ctor: "FootnoteSize"};
   var ScriptSize = {ctor: "ScriptSize"};
   var Tiny = {ctor: "Tiny"};
   var ComponentSizeInfo = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,footlineHeight: d
             ,headlineHeight: c
             ,itemTab: i
             ,leftSidebarWidth: a
             ,navigationSymbolHeight: e
             ,rightSidebarWidth: b
             ,slideTitleHeight: g
             ,slideTitleWidth: f
             ,textWidth: h};
   });
   var SymbolSizeInfo = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,button: e
             ,generalSymbol: a
             ,itemProjection: d
             ,miniframe: b
             ,sectionProjection: c};
   });
   var SymbolSizing = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,coverage: c
             ,height: b
             ,offset: d
             ,width: a};
   });
   var Sizing = F2(function (a,b) {
      return {_: {}
             ,placement: b
             ,width: a};
   });
   var SlideBackground = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,normal: c
             ,section: b
             ,supportbin: d
             ,title: a};
   });
   var SymbolStyling = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,general: a
             ,symbolAlpha: d
             ,symbolFill: c
             ,symbolShape: b};
   });
   var Rectangle = {ctor: "Rectangle"};
   var Tick = {ctor: "Tick"};
   var Triangle = {ctor: "Triangle"};
   var Square = {ctor: "Square"};
   var Circle = {ctor: "Circle"};
   var PaddingStyle = F2(function (a,
   b) {
      return {_: {}
             ,fillcolor: b
             ,thickness: a};
   });
   var AllPaddingStyle = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,bottom: d
             ,left: a
             ,right: b
             ,top: c};
   });
   var Grad = F2(function (a,b) {
      return {ctor: "Grad"
             ,_0: a
             ,_1: b};
   });
   var SingleColored = function (a) {
      return {ctor: "SingleColored"
             ,_0: a};
   };
   var Transparent = {ctor: "Transparent"};
   var TextStyle = F2(function (a,
   b) {
      return {_: {}
             ,align: b
             ,style: a};
   });
   var None = {ctor: "None"};
   var Border = function (a) {
      return {ctor: "Border"
             ,_0: a};
   };
   var Styling = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,background: c
             ,border: a
             ,padding: d
             ,text: b};
   });
   _elm.Types.Theme.values = {_op: _op
                             ,Border: Border
                             ,None: None
                             ,Transparent: Transparent
                             ,SingleColored: SingleColored
                             ,Grad: Grad
                             ,Circle: Circle
                             ,Square: Square
                             ,Triangle: Triangle
                             ,Tick: Tick
                             ,Rectangle: Rectangle
                             ,Tiny: Tiny
                             ,ScriptSize: ScriptSize
                             ,FootnoteSize: FootnoteSize
                             ,VerySmall: VerySmall
                             ,Small: Small
                             ,NormalSize: NormalSize
                             ,Large: Large
                             ,VeryLarge: VeryLarge
                             ,Huge: Huge
                             ,TopAlign: TopAlign
                             ,BottomAlign: BottomAlign
                             ,CenterAlign: CenterAlign
                             ,Empty: Empty
                             ,Layout: Layout
                             ,Horizontal: Horizontal
                             ,Vertical: Vertical
                             ,Show: Show
                             ,Hide: Hide
                             ,Shade: Shade
                             ,LeftSidebar: LeftSidebar
                             ,RightSidebar: RightSidebar
                             ,AuthorTitle: AuthorTitle
                             ,InstituteTitle: InstituteTitle
                             ,AuthorInstituteTitle: AuthorInstituteTitle
                             ,NoFoot: NoFoot
                             ,Outer: Outer
                             ,Inner: Inner
                             ,OuterElements: OuterElements
                             ,InnerElements: InnerElements
                             ,TitleLike: TitleLike
                             ,NormalText: NormalText
                             ,AlertText: AlertText
                             ,HighlightText: HighlightText
                             ,Primary: Primary
                             ,Secondary: Secondary
                             ,Tertiary: Tertiary
                             ,Quaternary: Quaternary
                             ,PrimarySidebar: PrimarySidebar
                             ,SecondarySidebar: SecondarySidebar
                             ,TertiarySidebar: TertiarySidebar
                             ,QuaternarySidebar: QuaternarySidebar
                             ,PrimaryShading: PrimaryShading
                             ,SecondaryShading: SecondaryShading
                             ,TertiaryShading: TertiaryShading
                             ,QuaternaryShading: QuaternaryShading
                             ,PrimarySidebarShading: PrimarySidebarShading
                             ,SecondarySidebarShading: SecondarySidebarShading
                             ,TertiarySidebarShading: TertiarySidebarShading
                             ,QuaternarySidebarShading: QuaternarySidebarShading
                             ,PrimaryTocShading: PrimaryTocShading
                             ,SecondaryTocShading: SecondaryTocShading
                             ,TertiaryTocShading: TertiaryTocShading
                             ,QuaternaryTocShading: QuaternaryTocShading
                             ,Item: Item
                             ,Subitem: Subitem
                             ,Subsubitem: Subsubitem
                             ,ItemProjection: ItemProjection
                             ,SubitemProjection: SubitemProjection
                             ,SubsubitemProjection: SubsubitemProjection
                             ,MiniframeSymbol: MiniframeSymbol
                             ,ShadedMiniframeSymbol: ShadedMiniframeSymbol
                             ,GeneralSymbol: GeneralSymbol
                             ,ShadedGeneralSymbol: ShadedGeneralSymbol
                             ,SectionProjection: SectionProjection
                             ,ShadedSectionProjection: ShadedSectionProjection
                             ,Button: Button
                             ,Styling: Styling
                             ,TextStyle: TextStyle
                             ,AllPaddingStyle: AllPaddingStyle
                             ,PaddingStyle: PaddingStyle
                             ,SymbolStyling: SymbolStyling
                             ,SlideBackground: SlideBackground
                             ,Sizing: Sizing
                             ,SymbolSizing: SymbolSizing
                             ,SymbolSizeInfo: SymbolSizeInfo
                             ,ComponentSizeInfo: ComponentSizeInfo
                             ,Column: Column
                             ,Insert: Insert
                             ,LayoutDetails: LayoutDetails
                             ,TocOptions: TocOptions
                             ,LayoutInfo: LayoutInfo
                             ,SeparatedParentList: SeparatedParentList
                             ,Mapping: Mapping
                             ,Pallette: Pallette
                             ,SymbolBoard: SymbolBoard
                             ,StyleGuide: StyleGuide
                             ,StyleLists: StyleLists
                             ,StyleInfo: StyleInfo
                             ,Theme: Theme
                             ,PresInfo: PresInfo
                             ,Section: Section};
   return _elm.Types.Theme.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.Naive = Elm.Utils.Naive || {};
Elm.Utils.Naive.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   _elm.Utils.Naive = _elm.Utils.Naive || {};
   if (_elm.Utils.Naive.values)
   return _elm.Utils.Naive.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils.Naive";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var getNamedColor = function (str) {
      return function () {
         switch (str)
         {case "black":
            return Color.black;
            case "blue": return Color.blue;
            case "brown":
            return Color.brown;
            case "charcoal":
            return Color.charcoal;
            case "darkblue":
            return Color.darkBlue;
            case "darkbrown":
            return Color.darkBrown;
            case "darkcharcoal":
            return Color.darkCharcoal;
            case "darkgreen":
            return Color.darkGreen;
            case "darkgrey":
            return Color.darkGrey;
            case "darkorange":
            return Color.darkOrange;
            case "darkpurple":
            return Color.darkPurple;
            case "darkred":
            return Color.darkRed;
            case "darkyellow":
            return Color.darkYellow;
            case "green":
            return Color.green;
            case "grey": return Color.grey;
            case "lightblue":
            return Color.lightBlue;
            case "lightbrown":
            return Color.lightBrown;
            case "lightcharcoal":
            return Color.lightCharcoal;
            case "lightgreen":
            return Color.lightGreen;
            case "lightgrey":
            return Color.lightGrey;
            case "lightorange":
            return Color.lightOrange;
            case "lightpurple":
            return Color.lightPurple;
            case "lightred":
            return Color.lightRed;
            case "lightyellow":
            return Color.lightYellow;
            case "orange":
            return Color.orange;
            case "purple":
            return Color.purple;
            case "red": return Color.red;
            case "white":
            return Color.white;
            case "yellow":
            return Color.yellow;}
         _E.Case($moduleName,
         "between lines 40 and 69");
      }();
   };
   var concreteInt = function (x) {
      return function () {
         switch (x.ctor)
         {case "Just": return x._0;
            case "Nothing": return 0;}
         _E.Case($moduleName,
         "between lines 18 and 20");
      }();
   };
   var toConcreteInt = function (str) {
      return function () {
         var _v3 = String.toInt(str);
         switch (_v3.ctor)
         {case "Just": return _v3._0;
            case "Nothing": return 0;}
         _E.Case($moduleName,
         "between lines 12 and 14");
      }();
   };
   var toConcreteFloat = function (str) {
      return function () {
         var _v5 = String.toFloat(str);
         switch (_v5.ctor)
         {case "Just": return _v5._0;
            case "Nothing": return 0;}
         _E.Case($moduleName,
         "between lines 8 and 10");
      }();
   };
   var buildColorFromCode = function (str) {
      return function () {
         var substrList = A2(String.split,
         ":",
         str);
         var intList = A2(List.map,
         toConcreteInt,
         List.tail(substrList));
         var floatList = A2(List.map,
         toConcreteFloat,
         List.tail(substrList));
         return function () {
            var _v7 = List.head(substrList);
            switch (_v7)
            {case "hsl":
               return A3(Color.hsl,
                 List.head(floatList),
                 List.head(List.tail(floatList)),
                 List.last(floatList));
               case "hsla":
               return A4(Color.hsla,
                 List.head(floatList),
                 List.head(List.tail(floatList)),
                 List.last(A2(List.take,
                 3,
                 floatList)),
                 List.last(floatList));
               case "rgb": return A3(Color.rgb,
                 List.head(intList),
                 List.head(List.tail(intList)),
                 List.last(intList));
               case "rgba":
               return A4(Color.rgba,
                 List.head(intList),
                 List.head(List.tail(intList)),
                 List.last(A2(List.take,
                 3,
                 intList)),
                 List.last(floatList));}
            _E.Case($moduleName,
            "between lines 29 and 35");
         }();
      }();
   };
   var processColor = function (str) {
      return A2(String.contains,
      ":",
      str) ? buildColorFromCode(str) : getNamedColor(str);
   };
   _elm.Utils.Naive.values = {_op: _op
                             ,toConcreteFloat: toConcreteFloat
                             ,toConcreteInt: toConcreteInt
                             ,concreteInt: concreteInt
                             ,buildColorFromCode: buildColorFromCode
                             ,getNamedColor: getNamedColor
                             ,processColor: processColor};
   return _elm.Utils.Naive.values;
};