 var CenterBox = {
     getStyle: function(elem, styleName) {
         if (elem.style[styleName]) { //内联样式
             return elem.style[styleName];
         } else if (elem.currentStyle) { //IE
             return elem.currentStyle[styleName];
         } else if (document.defaultView && document.defaultView.getComputedStyle) { //DOM
             styleName = styleName.replace(/([A-Z])/g, '-$1').toLowerCase();
             var s = document.defaultView.getComputedStyle(elem, '');
             return s && s.getPropertyValue(styleName);
         } else { //other,for example, Safari
             return null;
         }
     },
     //获取a标签里宽度最大的那个
     getMaxWidth: function(aArr) {
         var wArr = [];
         var padding = 0;
         var border = 0;
         for (var i = 0; i < aArr.length; i++) {
             var A = aArr[i];
             // wArr.push(A.offsetWidth);
             console.log(this.getStyle(A, "width"));
             wArr.push(parseInt(this.getStyle(A, "width")));
         }
         wArr.sort(function(a, b) {
             return b - a
         });
         return wArr[0];
     },
     //统一设置按钮宽度 width : margin =  6 : 1
     setButtonWidth: function(aArr, obj) {
         var width = obj.width || 100,
             border = obj.border || 0,
             padding = obj.padding || 0,
             margin = parseInt(obj.width / 6);
         for (var i = 0; i < aArr.length; i++) {
             var A = aArr[i];

             A.style.width = width + "px";
             A.style.margin = margin + "px";
             A.style.padding = padding + "px";
             A.style.borderWidth = border + "px";
         }
     },
     //获取用来居中容器的宽度
     getInnerWidth: function(obj, buttonLength, outerWidth) {
         var buttonWidth = obj.width || 100,
             buttonMargin = parseInt(buttonWidth / 6), //按钮的margin
             buttonBorder = obj.border || 0,
             buttonPadding = obj.padding || 0,
             //一个按钮的总长度 (2个margin 2个padding 2个border 1个width)
             oneButWidth = buttonWidth + (buttonMargin + buttonPadding + buttonBorder) * 2,
             allButWidth = oneButWidth * buttonLength; //所有按钮长度之和
         if (allButWidth >= outerWidth) {
             var excess = outerWidth % oneButWidth; //余下多少
             if (excess === 0) {
                 return outerWidth;
             } else {
                 return outerWidth - excess;
             }
         } else {
             return allButWidth;
         }
     },
     refresh: function() {
         var innerDiv = document.getElementById("inner"),
             outerDiv = document.getElementById("outer"),
             aArr = innerDiv.getElementsByTagName("a"),
             aArrLength = aArr.length;
         var outerDivWidth = parseInt(CenterBox.getStyle(outerDiv, "width"));
         var aMaxWidth = CenterBox.getMaxWidth(aArr);
         var obj = {
             width: aMaxWidth,
             border: 1,
             padding: 3
         };
         CenterBox.setButtonWidth(aArr, obj);
         innerDiv.style.width = CenterBox.getInnerWidth(obj, aArrLength, outerDivWidth) + "px";
     }
 };