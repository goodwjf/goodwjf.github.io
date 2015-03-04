 //闪烁
  function twinkle(obj, time, callBack) {
      var i = 0;
      var t = setInterval(function() {
          if (i == time) {
              clearInterval(t);
              callBack();
          }
          if (i % 2 == 0) {
              obj.style.textShadow = "2px 2px 3px orange";
          } else {
              obj.style.textShadow = "2px 2px 3px black";
          }

          i++;

      }, 300);
  }


//设置css3属性
  function setCss3(obj, attrObj) {
      for (var i in attrObj) {
          var newi = i;
          if (newi.indexOf("-") > 0) {
              var num = newi.indexOf("-");
              newi = newi.replace(newi.substr(num, 2), newi.substr(num + 1, 1).toUpperCase());
          }
          obj.style[newi] = attrObj[i];
          newi = newi.replace(newi.charAt(0), newi.charAt(0).toUpperCase());
          obj.style["webkit" + newi] = attrObj[i];
          obj.style["moz" + newi] = attrObj[i];
          obj.style["o" + newi] = attrObj[i];
          obj.style["ms" + newi] = attrObj[i];
      }
  }


//阻止浏览器的冒泡
  function stopBubble(e) {
      //如果提供了事件对象，则这是一个非IE浏览器
      if (e && e.stopPropagation)
      //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
      else
      //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;
  }
   //阻止浏览器的默认行为

  function stopDefault(e) {
      //阻止默认浏览器动作(W3C)
      if (e && e.preventDefault)
          e.preventDefault();
      //IE中阻止函数器默认动作的方式
      else
          window.event.returnValue = false;
      return false;
  }

 
//动画兼容封装
 var Animation = {
     
      action: function(obj,className) {
          obj.cname = className;
          obj.classList.add(className);
      },
      remove: function(obj,className) {
           obj.classList.remove(obj.cname);
      },
      start: function(obj, callBack) {
          obj.addEventListener('animationstart', function(e) {
              callBack();
          });
          obj.addEventListener('webkitAnimationStart', function(e) {
              callBack();
          });
      },
      iteration: function(obj, callBack) {
          obj.addEventListener('animationiteration', function(e) {
              callBack();
          });
          obj.addEventListener('webkitAnimationIteration', function(e) {
              callBack();
          });
      },
      end: function(obj, callBack) {

          obj.addEventListener('animationend', function(e) {
              callBack(e);
          });
          obj.addEventListener('webkitAnimationEnd', function(e) {
              callBack(e);
          });
      }


  }
