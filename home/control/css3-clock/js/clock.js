 var Clock = function(id, callBack) {
     this.oClock = document.getElementById(id);
     this.ini();
     this.oClock.startGo = callBack;

 }

 Clock.prototype = {

     drawMark: function() {
         var oClock = this.oClock;
         for (var i = 0; i < 60; i++) {
             var oMark = document.createElement("div");
             oMark.className = "mark";
             if (i % 5 == 0) {
                 // oMark.style.height = "4px";
                 oMark.style.width = "3px";
             }
             setCss3(oMark, {
                 transform: "rotate(" + i * 6 + "deg)"
             })
             oClock.appendChild(oMark);
         }
         var oPanel = document.createElement('div');
         oPanel.className = "centerPanel"
         oClock.appendChild(oPanel);

     },
     drawPoint: function(w, h) {
         var oClock = this.oClock;
         var oPoint = document.createElement('div');
         oPoint.className = "point";
         oPoint.style.width = w + "px";
         oPoint.style.height = h + "px";
         oPoint.style.display = "none";
         oClock.appendChild(oPoint);

         return oPoint;
     },
     drawPointRunner: function(w, h) {
         var oClock = this.oClock;
         var oPoint = document.createElement('div');
         var oRunner = document.createElement('div');
         oRunner.style.display = "none";
         oRunner.className = "runner";

         oPoint.className = "run";
         oPoint.style.width = w + "px";
         oPoint.style.height = h + "px";
         oPoint.style.display = "none";
         oPoint.runner = oRunner;
         oPoint.appendChild(oRunner);
         oClock.appendChild(oPoint);

         return oPoint;
     },
     drawMask: function() {
         var clockMask = document.createElement('div');
         //clockMask.style.top = this.oClock.offsetTop - 1 + "px";
         //clockMask.style.left = this.oClock.offsetLeft - 1 + "px";
         clockMask.className = "clockMask"
         this.oClock.appendChild(clockMask);
         return clockMask;
     },
     ini: function() {

         this.drawMark();

         var oH_point = this.drawPoint(50, 3);
         var oM_point = this.drawPoint(60, 2);
         var oS_point = this.drawPointRunner(130, 0);
         var oRunner = oS_point.runner;

         var clock = this.oClock;
         var clockMask = this.drawMask();
         clock.parentNode.appendChild(clockMask);
         setTimeout(function() {
             if (oRunner.style.display == "none") {
                 oH_point.style.display = "block";
                 oM_point.style.display = "block";
                 oS_point.style.display = "block";
 
                 setCss3(clockMask, {
                     "animation": "bounceInDown-clockMask 1s .2s forwards"
                 });

                 setCss3(clock, {
                     "animation": "bounceInDown-clock 3s .2s forwards"
                 });

                 clockMask.addEventListener("webkitAnimationEnd", function() {
                     setCss3(clock, {
                         "box-shadow": " 0 0 150px 1px yellow"
                     });

                 });

                 clockMask.addEventListener("animationend", function() {
                     setCss3(clock, {
                         "box-shadow": " 0 0 150px 1px yellow"
                     });
                      
                 });

                 

                 clock.addEventListener("transitionend", function() {
                     clock.startGo();
                     oRunner.style.display = "block";
                 });


             }

         }, 3600);



         setInterval(function() {

             var oTime = new Date();
             var oH = oTime.getHours();
             var oM = oTime.getMinutes();
             var oS = oTime.getSeconds();
             setCss3(oH_point, {
                 transform: "rotate(" + (oH * 30 + oM * 6 / 12 - 90) + "deg)"
             });
             setCss3(oM_point, {
                 transform: "rotate(" + (oM * 6 - 90) + "deg)"
             })
             setCss3(oS_point, {
                 transform: "rotate(" + (oS * 6 - 90) + "deg)"
             })

         }, 1000);
     }
 }

