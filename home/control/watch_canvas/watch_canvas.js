/**
     * [Watch 虚拟表盘]
     */
    var Watch = function(opt) {
        var oParent = document.getElementById(opt.id);
        var size = opt.size || oParent.offsetWidth;
        var oCanvas = document.createElement("canvas");
        oCanvas.width = size;
        oCanvas.height = size;

        oParent.appendChild(oCanvas);
        this.oC = oCanvas;
        this.oGc = this.oC.getContext('2d');

        this.x = size / 2;
        this.y = size / 2;
        this.r = size / 2.5;
        var me = this;
        setInterval(function() {
            me.toDraw();
        }, 1000);

        window.onresize = function() {
        	if(oParent.offsetWidth == size)return;
            size = oParent.offsetWidth;
            oCanvas.width = size;
            oCanvas.height = size;
            me.x = size / 2;
            me.y = size / 2;
            me.r = size / 2.5;
        }
    }

    Watch.prototype = {
        /**
         * [watchHand 设置指针]
         * @param  {[type]} height [设置指针的线条]
         * @param  {[type]} width  [设置指针的长度]
         * @param  {[type]} val    [这只指针的步长]
         */
        watchHand: function(height, width, val) {
            var oGc = this.oGc;
            var x = this.x;
            var y = this.y;
            var r = this.r;

            oGc.lineWidth = height;
            oGc.beginPath();
            oGc.moveTo(x, y);
            oGc.arc(x, y, r * width, val, val, false);
            oGc.closePath();
            oGc.stroke();
        },
        /**
         * [watchMark 设置刻度]
         * @param  {[type]} size [刻度的线条宽带]
         * @param  {[type]} num  [刻度的间隔]
         */
        watchMark: function(size, num) {

            var oGc = this.oGc;
            var x = this.x;
            var y = this.y;
            var r = this.r;
            var n = 360 / num;

            oGc.beginPath();
            oGc.lineWidth = size;
            for (var i = 0; i < num; i++) {
                oGc.moveTo(x, y);
                oGc.arc(x, y, r, n * i * Math.PI / 180, n * (i + n) * Math.PI / 180, false);
            }
            oGc.closePath();
            oGc.stroke();
        },
        /**
         * [watchDial 设置表盘]
         * @param  {[type]} size  [表盘的大小]
         * @param  {[type]} color [表盘的颜色]
         */
        watchDial: function(size, color) {
            var oGc = this.oGc;
            var x = this.x;
            var y = this.y;
            var r = this.r;

            oGc.beginPath();
            oGc.fillStyle = color || "white";
            oGc.arc(x, y, r * size / 20, 0, 360 * Math.PI / 180, false);
            oGc.closePath();
            oGc.fill();
        },
        /**
         * [toDraw 绘制刷新]
         */
        toDraw: function() {

            var oGc = this.oGc;
            var oC = this.oC;
            var x = this.x;
            var y = this.y;
            var r = this.r;

            var oDate = new Date();
            var oHours = oDate.getHours();
            var oMin = oDate.getMinutes();
            var oSen = oDate.getSeconds();

            var oHoursVal = (-90 + oHours * 30 + oMin / 2) * Math.PI / 180;
            var oMinVal = (-90 + oMin * 6) * Math.PI / 180;
            var oSenVal = (-90 + oSen * 6) * Math.PI / 180;

            oGc.clearRect(0, 0, oC.width, oC.height);
           
            //表盘分刻度
            this.watchMark(2, 60);

            //分刻度白色遮挡层
            this.watchDial(19);

            //表盘时刻度
            this.watchMark(3, 12);

            //时刻度白色遮挡层
            this.watchDial(18);
            
            //表中心
            this.watchDial(0.8, "black");
            this.watchDial(0.2, "white");
            
            //时表针
            this.watchHand(5, 12 / 20, oHoursVal);

            //分针
            this.watchHand(3, 15 / 20, oMinVal);

            //秒针
            this.watchHand(2, 18 / 20, oSenVal);

        }

    }