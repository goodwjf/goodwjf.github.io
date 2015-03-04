    // 创建一个闭包    
    (function($) {
        // 插件的定义    
        $.fn.scrollNav = function(options) {
            //debug(this);    
            // build main options before element iteration    
            var opts = $.extend({}, $.fn.scrollNav.defaults, options);
            // iterate and reformat each matched element    
            return this.each(function() {



                //dom 对象
                var $this = $(this);
                var autoOpt = $.fn.scrollNav.getAutoOpt($this);
                var $ul = autoOpt.ul;
                var $left = autoOpt.left;
                var $right = autoOpt.right;

                // build element specific options    
                // var o = $.meta ? $.extend({}, opts, $this.data()) : opts;


                //所有项
                var aItem = autoOpt.items;
                //现实的宽度
                var show_width = autoOpt.box_show_width;
                //可滚动长度
                var all_width = autoOpt.box_width;



                //选项按钮事件
                aItem.click(function() {
                    if ($this.data("sel")) {
                        $this.data("sel").removeClass("f-sel");
                    }
                    $(this).addClass("f-sel");
                    $this.data("sel", $(this));
                })

                //左右滚动事

                var _step = function(now, fx) {
                    var $this = $(fx.elem);
                    if ($this.position().left >= 0) {
                        $this.stop(true, false).animate({
                            left: 0
                        });
                        setState(all_width, show_width, $ul, $right, $left);
                    }
                }

                $left.click(function() {

                    var autoOpt = $.fn.scrollNav.getAutoOpt($this);
                    var show_width = autoOpt.box_show_width;

                    if ($ul.position().left < 0 && !$ul.is(":animated")) {

                        $ul.stop(true, false).animate({
                            left: '+=' + show_width
                        }, {
                            step: _step,
                            complete: function() {
                                setState(all_width, show_width, $ul, $right, $left);
                            }
                        });
                    }
                });

                $right.click(function() {
                    var autoOpt = $.fn.scrollNav.getAutoOpt($this);
                    var show_width = autoOpt.box_show_width;
                    if (Math.abs($ul.position().left) < all_width - show_width && !$ul.is(":animated")) {
                        $ul.stop(true, false).animate({
                                left: '-=' + show_width
                            }, "",
                            function() {
                                setState(all_width, show_width, $ul, $right, $left);
                            }
                        );
                    }
                });

                $(window).resize(function() {

                    $.fn.scrollNav.refresh($this);

                });

                $.fn.scrollNav.refresh($this);

            });

        };

        // 私有函数：debugging    

        function debug($obj) {
            if (window.console && window.console.log)
                window.console.log('scrollNav selection count: ' + $obj.size());
        };

         //设置状态
        function setState(all_width, show_width, $ul, $right, $left) {
            var remain_width = all_width - Math.abs($ul.position().left);
             


                if (remain_width <= show_width) {
                    $left.hasClass("f-disable") & $left.removeClass("f-disable");
                    $right.addClass("f-disable");
                } else {
                    $right.hasClass("f-disable") & $right.removeClass("f-disable");
                     
                }
          

                if (remain_width >= all_width) {
                    $right.hasClass("f-disable") & $right.removeClass("f-disable");
                    $left.addClass("f-disable");
                } else {
                    $left.hasClass("f-disable") & $left.removeClass("f-disable");
                }
           
        }

        //主体参数
        $.fn.scrollNav.getAutoOpt = function($this) {

            //dom 对象
            var $ul = $this.find("ul").eq(0);
            var $left = $this.find(".u-leftB").eq(0);
            var $right = $this.find(".u-rightB").eq(0);
            //所有项
            var aItem = $this.find("li>a");

            //单个长度
            //（12 = margin + border） 
            var one_width = aItem.eq(0).width() + 12;
            //容器的宽度
            //(86 = 左右按钮的 width+border+margin + $this.parent()的border)
            var container_width = $this.parent().width() - 120;
            //能显示的项目数
            var show_n = parseInt(container_width / one_width);
            //显示区的宽度
            var show_width = show_n * one_width;
            //可滚动长度
            var all_width = one_width * aItem.length;

            return {
                ul: $ul,
                left: $left,
                right: $right,
                items: aItem,
                item_width: one_width,
                item_count: show_n,
                box_show_width: show_width,
                box_width: all_width,

            }
        };

        //刷新
        $.fn.scrollNav.refresh = function($this) {
            var autoOpt = $.fn.scrollNav.getAutoOpt($this);
            //显示区的宽度
            $this.find(".u-nav").width(autoOpt.box_show_width);
            //实际宽度
            $this.find("ul").width(autoOpt.box_width);

            $this.find("p").width(autoOpt.box_show_width + 86);

            setState(autoOpt.box_width, autoOpt.box_show_width, autoOpt.ul, autoOpt.right, autoOpt.left);
        }

       
        // 插件的defaults    
        $.fn.scrollNav.defaults = {

        };
        // 闭包结束    
    })(jQuery);