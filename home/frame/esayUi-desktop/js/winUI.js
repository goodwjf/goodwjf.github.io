//windowUi 文件说明 所有系统控件的封装

var Win = {

    currentWin: "",
    /*
     ** setCurrentWin 设置当前窗口
     ** @$win window对象
     */

    setCurrentWin: function($win) {

        if (Win.currentWin) {
            Win.currentWin.data("but").removeClass("action");
        }
        $win.data("but").addClass("action");
        this.currentWin = $win;
    },
    /*
     ** creatWindow window 在桌面创建一个window窗口
     ** @$href 上下文 这里指打开window窗口的链接
     ** @options 配置json
     ** @event 自定义事件
     */

    creatWindow: function($href, options, event) {

        if ($href.data("win")) {
            this.restoreMinWin($href.data("win"));
            return false;
        }

        var opt = {
            minimizable: true,
            cache: true,
            inline: true,
            onClose: function() {
                Win.destroyWin($href);
            },
        };

        if (options) {
            $.extend(opt, options);
        }

        //结构构建

        var $win = $('<div></div>').appendTo("#desktop").window(opt);
        var $but = $('<a href="#" class="f-minSize">' + $win.window("options").title + '</a>').appendTo("#footer").click(function() {
            Win.restoreMinWin($win, $(this));
            Win.setCurrentWin($win);
        }).bind('contextmenu', function(e) {
            $butOffSet = $(this).offset();
            var $menu = $("body").data("right_menu");
            e.preventDefault();
            $menu.menu({
                onClick: function(item) {

                    switch (item.name) {
                        case 'open':
                            $win.window('open');
                            break;
                        case 'exit':
                            $win.window('close');
                            break;
                    }
                }
            });
            $menu.menu('show', {
                left: $butOffSet.left,
                top: $butOffSet.top - 4
            });

        });

        $win.window("header").mousedown(function() {
            Win.setCurrentWin($win);
        })

        //对象绑定（建立对象链）
        $win.data("but", $but);
        $href.data("win", $win);
        Win.setCurrentWin($win);
    },


    /*
     ** restoreMinWin window从最小化状态回复原有状态
     ** @$win window对象
     */

    restoreMinWin: function($win) {



        $win.window('open');



        //$win.window('options').minimized = false;
        //$win.window('panel').show();

    },

    /*
     ** destroyMinWin 销毁最小化window
     ** @$href 上下文 这里指打开window窗口的链接
     */
    destroyWin: function($href) {
        //移除绑定 销毁对象
        var $win = $href.data("win");

        $win.data("but").remove();
        $win.removeData("but");
        $href.removeData("win");
        $win.window("destroy");
        Win.currentWin = "";
    },


    /*
     ** getWinBody 获取win内部对象宽高
     ** @$win window对象
     */

    getWinBody: function($win) {

        $win.window("body");
        return {
            width: $winBody.width(),
            height: $winBody.height()
        }

    }

};

//----------------------------------------------

var Msg = {
    msgShow: function(tit, msg, time) {
        $.messager.show({
            title: tit,
            msg: msg,
            timeout: time,
            showType: 'slide'
        });
    },
    confirm: function(tit, msg, fun) {
        $.messager.confirm('系统推出提示', '您确定要离开系统吗？', function(r) {
            if (r) {
                fun();
            }
        });
    }

}




//----------------------------------------------



var Grid = {
    /*
     ** createGrid 创建dataGrid
     ** @id 被渲染的对象
     ** @$win 上下文对象 这里指装在grid的window窗口
     ** @options 配置json
     */

    createGrid: function(id, $win, options) {
        var $grid = $(id);
        //合并配置
        var opt = Config.getOptions(id, "datagrid");
        if (options) {
            $.extend(opt, options);
        }

        $grid.datagrid(opt);
        $grid.datagrid("getPanel").css("border", "0");
        $win.data("grid", $grid)
    },

    /*
     ** rowActionFromat 表格操作项
     ** @value：字段的值。
     ** @rowData：行数据。
     ** @rowIndex：行索引。
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    rowActionFromat: function(value, rowData, rowIndex, id) {
        if (rowData.editing) {
            var s = '<a href="#" class="u-lb" onclick="Grid.saverow(this,\'' + id + '\')">保 存</a>| ';
            var c = '<a href="#" class="u-lb" onclick="Grid.cancelrow(this,\'' + id + '\')">取 消</a>';
            return s + c;
        } else {
            var e = '<a href="#" class="u-lb" onclick="Grid.editrow(this,\'' + id + '\')">修 改</a>| ';
            var d = '<a href="#" class="u-lb" onclick="Grid.deleterow(this,\'' + id + '\')">删 除</a>';
            return e + d;
        }
    },


    /*
     ** event 事件对象
     ** @rowData：行数据。
     ** @rowIndex：行索引。
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    event: {
        //当用户开始编辑一行时触发
        onBeforeEdit: function(rowIndex, rowData, id) {
            rowData.editing = true;
            Grid.updateActions(rowIndex, $(id));
        },
        //当用户编辑完成时触发
        onAfterEdit: function(rowIndex, rowData, id) {
            rowData.editing = false;
            Grid.updateActions(rowIndex, $(id));
        },
        //当用户取消编辑行时触发
        onCancelEdit: function(rowIndex, rowData, id) {
            rowData.editing = false;
            Grid.updateActions(rowIndex, $(id));
        }
    },


    /*
     ** updateActions 更新指定的行
     ** @index：要更新的行索引
     ** //@rowData：新的行数据
     ** @#grid 被调用的对象 （这里指 dataGrid）
     */

    updateActions: function(index, $grid) {
        $grid.datagrid('updateRow', {
            index: index,
            row: {} //新的行数据
        });
    },

    /*
     ** getRowIndex 返回 指定对象所在的行序列
     ** @target 指定的对象 这里指 编辑按钮 a
     */

    getRowIndex: function(target) {
        var tr = $(target).closest('tr.datagrid-row');
        return parseInt(tr.attr('datagrid-row-index'));
    },


    /*
     ** editrow 修改行
     ** @target 指定的对象 这里指 编辑按钮 a
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    editrow: function(target, id) {
        $(id).datagrid('beginEdit', Grid.getRowIndex(target));
    },

    /*
     ** deleterow 删除行
     ** @target 指定的对象 这里指 编辑按钮 a
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    deleterow: function(target, id) {
        $.messager.defaults = {
            ok: "是",
            cancel: "否"
        };
        $.messager.confirm('删除提示', '您确定要删除吗?', function(r) {
            if (r) {
                $(id).datagrid('deleteRow', Grid.getRowIndex(target));
            }
        });
    },

    /*
     ** saverow 保存行
     ** @target 指定的对象 这里指 编辑按钮 a
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    saverow: function(target, id) {
        $(id).datagrid('endEdit', Grid.getRowIndex(target));
    },

    /*
     ** cancelrow 取消
     ** @target 指定的对象 这里指 编辑按钮 a
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    cancelrow: function(target, id) {
        $(id).datagrid('cancelEdit', Grid.getRowIndex(target));
    },

    /*
     ** insert 插入行
     ** @target 指定的对象 这里指 编辑按钮 a
     ** @id 被调用的对象 （这里指 dataGrid）
     */

    insert: function(id) {
        var row = $(id).datagrid('getSelected');
        if (row) {
            var index = $(id).datagrid('getRowIndex', row);
        } else {
            index = 0;
        }
        $(id).datagrid('insertRow', {
            index: index,
            row: {
                status: 'P'
            }
        });
        $(id).datagrid('selectRow', index);
        $(id).datagrid('beginEdit', index);
    }
}