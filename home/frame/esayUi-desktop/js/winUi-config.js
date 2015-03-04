// 文件说明 此文件主要用来描述系统控件的基本配置信息

var Config = {

    /*
     ** getOptions 获取控件的基本配置信息
     ** @id 被渲染的对象id
     ** @type 需要渲染的类型
     */

    getOptions: function(id, type) {

        var options;
        switch (type) {
            case "datagrid":

                options = {
                    fitColumns: true,
                    singleSelect: true,
                    rownumbers: true,
                    onBeforeEdit: function(index, row) {
                        Grid.event.onBeforeEdit(index, row, id)
                    },
                    onAfterEdit: function(index, row) {
                        Grid.event.onAfterEdit(index, row, id)
                    },
                    onCancelEdit: function(index, row) {
                        Grid.event.onCancelEdit(index, row, id)
                    },
                    columns: Config.getColumns(id),
                    pagination: true,
                    pageSize: 10,
                    pageNumber: 1
                    //  displayMsg: '显示 {from} 到 {to} 共 {total} 条'
                }

                break;
        }

        return options;

    },

    /*
     ** getColumns 获取datagrid字段
     ** @id 被渲染的对象id （datagrid id）
     */

    getColumns: function(id) {

        return eval("Config." + id.substring(1) + "_field")
    },

    /*
     ** mergeOptions 合并配置
     ** @opt1  配置json1
     ** @opt2  配置json2
     */

    mergeOptions: function(opt1, opt2) {

        return $.extend({}, opt1, opt2);

    }



}