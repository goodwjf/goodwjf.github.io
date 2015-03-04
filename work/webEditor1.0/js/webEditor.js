// WebEditor 封装 
(function(win) {

    if (win.WebEditor) {
        return;
    }

    win.$C = win.WebEditor = function(_opt) {

        var K = KindEditor;
        var options = {
            obj: undefined,
            parent: "body"
        }
        var opt = {
            items: [
                'source', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough',
                '|', 'image', 'table', 'hr', 'emoticons', 'link', 'unlink', '|', 'sign', 'time', 'template', '/',
                'undo', 'redo', '|', 'formatblock', 'fontname', 'fontsize',
                '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', '|', 'indent', 'outdent', 'lineheight',
                'insertorderedlist', 'insertunorderedlist',
            ],
            simple_items: [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'emoticons', 'image', 'link'
            ],
            type: "",
            style: "width:800px;height:400px;visibility:hidden;",
            K_options: {
                htmlTags: {
                    font: ['color', 'size', 'face', '.background-color'],
                    span: [
                        '.color', '.background-color', '.font-size', '.font-family', '.background',
                        '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
                    ],
                    div: [
                        'align', '.border', '.margin', '.padding', '.text-align', '.color', 'id',
                        '.background-color', '.font-size', '.font-family', '.font-weight', '.background',
                        '.font-style', '.text-decoration', '.vertical-align', '.margin-left'
                    ],
                    table: [
                        'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor', 'background', 'name',
                        '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
                        '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
                        '.width', '.height', '.border-collapse'
                    ],
                    'td,th': [
                        'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'background', 'id', 'style',
                        '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight', '.background-repeat',
                        '.font-style', '.text-decoration', '.vertical-align', '.background', '.border', '.background-position'
                    ],
                    a: ['href', 'target', 'name'],
                    embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
                    img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
                    'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': [
                        'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
                        '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
                    ],
                    pre: ['class'],
                    hr: ['class', '.page-break-after'],
                    'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del': []
                },
                allowFileManager: false,
                autoHeightMode: false,
                isFocusBorder: true,
                useContextmenu: true,
                afterCreate: function() {
                    var self = this;
                    var form = self.edit.textarea.get(0).form;
                    var submit_form = function() {
                        self.sync();
                        if (form) {
                            form.submit();
                        }
                    }
                    K.ctrl(document, 13, submit_form);
                    K.ctrl(self.edit.doc, 13, submit_form);
                }
            }
        };

        this.extend(options, _opt);
        //设置TextArea
        var expr = options.obj;
        if (expr === undefined || expr === null) {
            expr = document.createElement("textarea");
            expr.style.cssText = opt.style;
            K(options.parent || opt.parent).append(expr);
        }

        //初始化
        var _type = options.type || opt.type;
        this.opt = opt;
        this.extend(opt.K_options, options);
        this.extend(opt.K_options, {
            items: (_type == "simple" ? opt.simple_items : opt.items)
        });
        this.textarea = expr;
        this.editor = K.create(expr, opt.K_options);

        if (_type !== "simple") {
            var toolbar = this.editor.toolbar.div.get(0);
            this.tb_html = toolbar.innerHTML;
            this.tb_sim_html = getToolbar.call(this, "simple");
            this.iniBut(_type);
        }



        //私有方法 

        function getToolbar(type) {
            var toolbar = this.editor.toolbar.div.get(0);

            var opt_items = (type == "simple" ? this.opt.simple_items : this.opt.items);
            var items = toolbar.children;
            var len = items.length;

            var newArr = [];
            var opt_arr = delRepeat(opt_items);



            // 检索需要的icon
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < opt_arr.length; j++) {
                    var item = items[i];
                    if (item.getAttribute("data-name") == opt_arr[j]) {
                        newArr.push({
                            id: item.getAttribute("data-name"),
                            html: item.outerHTML
                        });
                    }
                }
            }


            var temp_html = "";
            for (var i = 0; i < opt_items.length; i++) {
                var flag = false;
                for (var j = 0; j < newArr.length; j++) {
                    var item = newArr[j];
                    if (item.id == opt_items[i]) {
                        temp_html += item.html;
                        flag = true;
                    }
                }
                if (!flag) {
                    if (type != "simple" && i == 19) {
                        temp_html += '<div class="ke-hr"></div>';
                    } else {
                        temp_html += '<span class="ke-inline-block ke-separator"></span>';
                    }
                }
            }
            return temp_html;
        }

        //数组去重

        function delRepeat(arr) {
            var newArray = new Array();
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                for (var j = i + 1; j < len; j++) {
                    if (arr[i] == arr[j]) {
                        ++i;
                    }
                }
                newArray.push(arr[i]);
            }
            return newArray;
        }

    };

    win.WebEditor.prototype = {
        getHtml: function() {
            return this.editor.html();
        },
        extend: function(destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
        },
        iniBut: function(_type) {
            var toolbar = this.editor.toolbar.div.get(0);
            var but = document.createElement("a");

            if (_type == "simple") {
                but.className = "but_sim";
                toolbar.appendChild(but);
            } else {
                but.className = "but";
                var reforeNode = toolbar.getElementsByTagName("div")[0];
                toolbar.insertBefore(but, reforeNode);
            }
            var me = this;
            but.onclick = function() {
                if (but.className == "but") {
                    but.className = "but_sim";
                    me.setToolbar("simple");
                } else {
                    but.className = "but";
                    me.setToolbar("all");
                }
            };
        },
        setToolbar: function(type) {
            var toolbar = this.editor.toolbar.div.get(0);
            if (type !== "simple") {
                toolbar.innerHTML = this.tb_html;
            } else {

                toolbar.innerHTML = this.tb_sim_html;
            }
            this.iniBut(type);

        }
    };

    win.WebEditor.getEl = function(el) {
        return win.KindEditor(el)
    };

})(window);



function isCon(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].getAttribute("data-name") == val)
            return true;
    }
    return false;
}
