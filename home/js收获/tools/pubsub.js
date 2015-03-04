var PubSub = function() {
    this._custom_listeners = {}  //监听
};
PubSub.prototype = {
    constructor: PubSub,   //指定构造函数 
    pub: function(e) {
        var t, n = this,  //t : 所有监听 n:当前对象
         r = Array.prototype.slice.call(arguments, 1); // r: 去掉第一个参数 用对象本身代替（首参数）
         r.unshift(this),
         t = (t = this._custom_listeners) && t && t[e];   // 该事件方法
        if (!t || t.length !== +t.length || t.length === 0) return;
        return t.forEach(function(e, t) {
            e.apply(n, r) //执行事件方法 并 植入参数 r【为pubsub自身】
        }), this
    },
    sub: function(e, t) { 	  //e: 事件方法名  t:传入的方法体
        var n = this._custom_listeners;
        return n[e] = n[e] || [], n[e].push(t), this
    }
};