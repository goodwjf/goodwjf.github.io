KindEditor.lang({
	sign: '签名',
	time: '添加日期',
	template: '信纸' 
});


 
//容器获得焦点
KindEditor.plugin('focusBorder', function(K) { 
  var editor = this;
	if (!editor.isFocusBorder) {
		return;
	}
	editor.afterCreate(function(){
		var edit_cont = editor.edit.win;	
			//editor.edit.win.document.body.style.height = "90%"//parseInt(editor.edit.height) - 10 +"px";
			edit_cont.onfocus= function(){editor.container.addClass("focusBorder")}
			edit_cont.onblur= function(){editor.container.removeClass("focusBorder")}
	});
});



//插入当前时间
KindEditor.plugin('time', function(K) {
    var editor = this,
        name = 'time';
    // 点击图标时执行
    editor.clickToolbar(name, function() {
        editor.insertHtml(curentTime());
    });
});

//获取当前时间

function curentTime() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}





//*******************************************************************************
// 使用信纸
KindEditor.plugin('template', function(K) {
    var editor = this;
    var name = 'template';
    editor.cur_template = 3;
	editor.cur_content="";

    // 点击图标时执行
    editor.clickToolbar(name, function() {

        var menuList = ['冬天童话', '笔记', '欢乐颂', '取消信纸']
        var _menu = createMenu(K, this, name, menuList, function(n) {
            useTemplate(K, editor, n)
            hideMenu(_menu);
        });

        K(this.edit.doc, document).mousedown(function() {
            hideMenu(_menu);
        });

    });
});

//使用信纸

function useTemplate(K, editor, n) {
    var _doc = K(editor.edit.doc).get(0);
    var _sign = _doc.getElementById('sign');
    var signHtml = "";

    if (_sign) {
        signHtml = "<div id='sign'>" + _sign.innerHTML + "</div>";
        _sign.parentNode.removeChild(_sign);
    }
	 
	if( editor.cur_template == 3){
 		editor.cur_content = editor.html();
 	}else{
 		editor.cur_content = _doc.getElementById('edit_cont').innerHTML;
	} 
	
     editor.html(getTemplate(n,editor.cur_content));
    if (signHtml !== "") {
        editor.appendHtml(signHtml);
    }
}


//获取基本路径
function basePath () {
        var els = document.getElementsByTagName('script'),
            src;
        for (var i = 0, len = els.length; i < len; i++) {
            src = els[i].src || '';
            if (/webEditor[\w\-\.]*\.js/.test(src)) {
                return src.substring(0, src.lastIndexOf('/') + 1);
            }
        }
        return '';
}


//获取信纸模版

function getTemplate(n,content) {
 	var path = basePath()+"myPlugins/";
    var t1 = '<table name="tpl" style="background-color:#DEEEF7" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="font-size:0;line-height:0" align="right" height="132"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td>&nbsp;</td><td background="'+path+'image/winter_b_pic.jpg" height="132" width="479">&nbsp;</td></tr></tbody></table></td></tr><tr><td style="background-repeat:no-repeat;background-position:right top;font-size:0;line-height:0" background="'+path+'image/winter_b_bg1.jpg"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="35"><div style="width:35px"></div></td><td style="color:#58788A;line-height:35px;font-size:14px;padding:0 5px" background="'+path+'image/winter_b_bg2.png" height="223" valign="top" id="edit_cont">' + content + ' </td><td width="35"><div style="width:35px"></div></td></tr></tbody></table></td></tr><tr><td style="font-size:0;line-height:0" height="45">&nbsp;</td></tr></tbody></table>';

    var t2 = '<table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="line-height:0;font-size:0"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr height="59"><td style="background-position:top right; background-repeat:no-repeat;" background="'+path+'image/note_seem_01.jpg" width="41"><p style="width:40px;"></p></td><td background="'+path+'image/note_seem_02.jpg">&nbsp;</td><td style="background-position:top right; background-repeat:no-repeat;" background="'+path+'image/note_seem_03.jpg" width="114"><p style="width:113px;"></p></td></tr></tbody></table></td></tr><tr><td style="line-height:0;font-size:0"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="'+path+'image/note_seem_04.jpg" width="41"><p style="width:40px;"></p></td><td style="color:#626262;font-size:14px;line-height:36px;padding:0 40px 0 20px;" height="300" background="'+path+'image/note_seem_05.jpg" valign="top" id="edit_cont"> '+ content + ' </td></tr></tbody></table></td></tr><tr><td style="line-height:0;font-size:0"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr height="41"><td style="background-position:top right; background-repeat:no-repeat;" background="'+path+'image/note_seem_06.jpg" width="41"><p style="width:40px;"></p></td><td background="'+path+'image/note_seem_02.jpg">&nbsp;</td><td style="background-position:top right; background-repeat:no-repeat;" background="'+path+'image/note_seem_07.jpg" width="150"><p style="width:149px;"></p></td></tr></tbody></table></td></tr></tbody></table>';

    var t3 = '<table name="tpl" style="background-color:#89C1B9" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="background-repeat:repeat-x;padding:120px 40px 30px" background="'+path+'image/christmas_b_top.png"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="color:#2B4C43;line-height:2.1;font-size:12px;padding:0 5px" height="152" background="'+path+'image/christmas_b_bg.png" valign="top" id="edit_cont"> ' + content + '</td></tr></tbody></table></td></tr><tr><td style="font-size:0;line-height:0" background="'+path+'image/christmas_b_bottom.png"><table name="tpl" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td height="74">&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td height="24"  width="120">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>';


    var _template = [t1, t2, t3, content]

    return _template[n];
}

//创建菜单

function createMenu(K, context, toolName, menuList, callBack) {

    var knode = context.toolbar.get(toolName);
    var pos = knode.pos();
    var menu = K.menu({
        width: 200,
        x: pos.x,
        y: pos.y + knode.height(),
        z: context.options.zIndex,
        centerLineMode: false
    });

    K.each(menuList, function(i, val) {
        menu.addItem({
            title: '<span style="font-size:12px;">' + val + '</span>',
            click: function() {
                callBack(i);
                context.cur_template = i;
            },
            checked: i === context.cur_template
        });
    });
    return menu;
}

//隐藏菜单

function hideMenu(menu) {
    menu.hide()
    menu = null;
}



//*******************************************************************************
// 使用签名
KindEditor.plugin('sign', function(K) { 
    var editor = this;
    var name = 'sign';
    var listArr = ["安得广厦千万间，大庇天下寒士俱欢颜。", "百川东到海，何时复西归？少壮不努力，老大徒伤悲。", "博学之，审问之，慎思之，明辨之，笃行之。", "不傲才以骄人，不以宠而作威。", "不责人小过，不发人隐私，不念人旧恶。三者可以养德，亦可以远害。", "操千曲而后晓声，观千剑而后识器。", "长风破浪会有时，直挂云帆济沧海。", "不可乘喜而轻诺，不可因醉而生嗔，不可乘快而多事，不可因倦而鲜终。", "国忧今未释，何用慰平生！", "欲速则不达，见小利则大事不成。", "志当存高远。", "竹直心虚乃吾友，水淡性泊是我师！", "安能摧眉折腰事权贵，使我不得开心颜。"];

    // 点击图标时执行
    editor.clickToolbar(name, function() {
        var dialog = K.dialog({
            width: 500,
            title: '签名',
            body: getSignList(listArr),
            closeBtn: {
                name: '关闭',
                click: function(e) {
                    dialog.remove();
                }
            }
        });

        K(".signList a").click(function() {
            useSign(K, editor, K(this).text())
            dialog.remove();
        });

    });
});

//使用签名

function useSign(K, editor, text) {
    var _doc = K(editor.edit.doc).get(0);
    var _sign = _doc.getElementById('sign');
	
 	var _text = text.replace(/\d+、/,"");
    if (_sign) {
        _sign.innerHTML = "<br><br><br><br>--<br>" + _text;
    } else {
        editor.appendHtml("<div id='sign'><br><br><br><br>--<br>" + _text + "</div>");
    }
}

//获取签名列表

function getSignList(dataArr) {
    var _signList = '<div class="signList"><ul>';
    for (var i = 0; i < dataArr.length; i++) {
        _signList += '<li><a href="javascript:;"><span>' +(i+1)+'、</span>'+ dataArr[i] + '</a></li>'
    }
    _signList += '</ul></div>';
    return _signList;
}

 
