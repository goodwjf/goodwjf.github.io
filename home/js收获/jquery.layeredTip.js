// 创建一个闭包    
(function($) {
    // 插件的定义    
    var TIMER = 0;
    $.fn.LayerTip = function(options) {
        debug(this);
        // build main options before element iteration    
        var opts = $.extend({}, $.fn.LayerTip.defaults, options);
        var $tip = "",
            style,
            $tipInner, $tipBar;
        if (!$tip) { 
            if (opts.trigon == "left") {
                style = "tip_bar tip_bar_position";
            } else {
                style = "tip_bar";
            }

            $tipInner = $('<div class="tip_inner "></div>');
            $tipBar = $('<div class="' + style + '"></div>');
            $tip = $('<div class="tip"></div>');
            $tip.append($tipInner).append($tipBar);
            $(document.body).append($tip);
            $tip.mouseenter(function(e) {
                if (TIMER) {
                    window.clearTimeout(TIMER);
                    TIMER = null;
                }
                $(this).show();
            });
            $tip.mouseleave(function(e) {
                $(this).hide();
            });
        }
        // iterate and reformat each matched element    
        return this.each(function() {
            $this = $(this);
            bindEvent($tip, $tipInner, $this);
        });
    };
    // 私有函数：debugging    
    function debug($obj) {
        if (window.console && window.console.log) window.console.log('LayerTip selection count: ' + $obj.size());
    };

    function bindEvent($tip, $tipInner, $o) {
        $o.mouseenter(function(e) {
            $tipInner.html($("#" + $(this).attr("contentId")).html() || 'Please specify the corresponding  contentId');
            position($tip, $o);
            $tip.show();
        });
        $o.mouseleave(function(e) {
            TIMER = window.setTimeout(function() {
                $tip.hide();
            }, 100);
        });
    };

    function position($tip, $o) { //定位
        var offset = $o.offset();
        $tip.css({
            left: offset.left,
            top: offset.top - $tip.height() - 5
        });
    };
    // 定义暴露format函数    
    $.fn.LayerTip.format = function(txt) {
        return '<strong>' + txt + '</strong>';
    };
    // 插件的defaults    
    $.fn.LayerTip.defaults = {
        trigon: "left"
    };
    // 闭包结束    
})(jQuery);