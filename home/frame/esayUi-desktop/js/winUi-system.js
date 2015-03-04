//系统文件 

//工具函数 

var Tools = {
    //对象比较
    object_equals: function(obj1, obj2) {
        if (obj1 == obj2)
            return true;
        if (typeof(obj2) == "undefined" || obj2 == null || typeof(obj2) != "object")
            return false;
        var length = 0;
        var length1 = 0;
        for (var ele in obj1) {
            length++;
        }
        for (var ele in obj2) {
            length1++;
        }
        if (length != length1)
            return false;
        if (obj2.constructor == obj1.constructor) {
            for (var ele in obj1) {
                if (typeof(obj1[ele]) == "object") {
                    if (!this.object_equals(obj1[ele], obj2[ele]))
                        return false;
                } else if (typeof(obj1[ele]) == "function") {
                    if (!this.object_equals(obj1[ele].toString(), obj2[ele].toString()))
                        return false;
                } else if (obj1[ele] != obj2[ele])
                    return false;
            }
            return true;
        }
        return false;
    },

    //数组查找
    array_search: function(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (this.object_equals(arr[i], val)) return i;
        }
        return -1;
    },

    //数组删除
    array_remove: function(arr, val) {
        var index = this.array_search(arr, val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

}


//主要负责ui的自动化处理

var Sys = {
    desktop: $("#desktop"),

    menuManage: {
        aOpenedWin: [],
        removeWin: function(win) {
            Tools.array_remove(this.aOpenedWin, win);
        },
        addWin: function(win) {
            this.aOpenedWin.push(win);
        },
        closeAllWin: function() {
            for (var i = this.aOpenedWin.length - 1; i >= 0; i--) {
                this.aOpenedWin[i].window("close");
            };
        }
    },

    iniDesktop: function() {
        //桌面图标
        $(".u-iconBox").dblclick(function() {
            var $menu = $(this);
            var options = {
                title: "系统菜单",
                width: 200,
                height: 500,
                top: 10,
                left: $(document.body).width() - 210,
                href: $menu.attr("url"),
                onLoad: function() {
                    Sys.iniMenuWin();
                },
                onBeforeClose: function() {
                    var $win = $(this);
                    Msg.confirm('系统推出提示', '您确定要离开系统吗？', function() {
                        Sys.menuManage.closeAllWin();
                        $win.window("close", true);
                        Msg.msgShow('EsayUI-Windows', '：）欢迎下次光临.', 1000);
                    });
                    return false;
                }
            }

            Win.creatWindow($menu, options);
        });
        this.iniRightMenu();
        this.iniIcon();

        this.desktop.panel({
            onResize: function(w, h) {
                Sys.iniIcon(Sys.desktop);
            }
        })
    },

    iniMenuWin: function() {
        //系统菜单
        var $u_menu = $("#u_menu_1");
        $u_menu.find(".u-menu a").click(function() {
            var $menu = $(this);
            var uid = $menu.attr("uid");
            var _width = $menu.attr("win_w"),
                _height = $menu.attr("win_h");

            var options = {
                title: $menu.text(),
                width: _width,
                height: _height,
                top: parseInt(($(document.body).height() - _height - 100) / 2),
                left: parseInt(($(document.body).width() - _width) / 2),
                href: $menu.attr("url"),
                onLoad: function() {
                    $win = $(this);
                    eval("load_" + uid)($win, $menu);
                    Sys.menuManage.addWin($win);
                },
                onBeforeClose: function() {
                    $win = $(this);
                    eval("close_" + uid)($win, $menu);
                    Sys.menuManage.removeWin($win);
                }
            };

            Win.creatWindow($menu, options);
            return false;
        });

    },
    iniRightMenu: function() {

        var html = '<div id="mm" class="easyui-menu">'
        html += '<div name="open">打开</div>'
        html += '<div class="menu-sep"></div>'
        html += '<div name="exit">退出</div>'
        html += '</div>'
        var $menu = $(html).appendTo("body").menu();
        $("body").data("right_menu", $menu);
    },
    iniIcon: function() {

        var $aA = this.desktop.find("a");
        var parentHeight = this.desktop.height();
        var left = 0,
            top = -100;
        var interval = 100;

        $aA.each(function() {
            left = left;
            top += interval;
            if (parentHeight < top + 100) {
                top = 0;
                left += interval;
            }
            $(this).css({
                'left': left,
                'top': top
            });
        });
    }
};

$(function() {
    Sys.iniDesktop();
    $("#footer").dblclick(function() {
        Sys.iniIcon(Sys.desktop);
    })

});