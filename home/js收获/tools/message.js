(function(e) {
    var t = {
        receiver: "",
        fns: {},
        connect: function() {},
        send: function(e, t, n, r) {//向扩展内的其它listeners发送一个请求，本扩展内页面中的sogouExplorer.extension.onRequest事件将会被触发。
        //e:请求的地址（接收者）   t：待相应的事件（事件名称）

            return n = n || {}, r = r || function() {}, n.receiver = e, n.eventName = t, typeof e == "string" ? sogouExplorer.extension.sendRequest(n, r) : typeof e == "number" && sogouExplorer.tabs.sendRequest(e, n, r), this
        },
        on: function(e, t) {  //e: 事件名称  t 事件方法
            return this.fns[e] = this.fns[e] || [], this.fns[e].push(t), this
        },
        trigger: function(e, t, n, r) {
            var i = this.fns[e];
            i && i.every(function(e) {
                return e(t, n, r) === !1 ? !1 : !0
            })
        }
    };
    sogouExplorer.extension.onRequest.addListener(function(e, n, r) {   //每当从扩展进程或者content script得到请求的时候，这个事件将会被触发。

     //e:发送过来的请求 （json对象{}）  n：包含了脚本上下文信息的对象 r：回调函数

	/*
		console.log("e:");
		console.dir(e);
		console.log("n:");
		console.dir(n);
		console.log("r:");
		console.dir(r);
	*/

        var i = e.receiver;   //请求过来的接收对象名字
        (i === "all" || i === t.receiver) && t.trigger(e.eventName, e, n, r)  //当 messagejs 加载完毕后执行 该事件
    });
    var n = util.getScriptParamVal("receiver", function(e) {   //返回 script 属性 receiver 的值 [bg/popup]
    	//console.log(e);
    	//console.dir(e);
        return e.dataset.jsModule === "message"
    });
    n && (t.receiver = n), e.Message = t
})(this);