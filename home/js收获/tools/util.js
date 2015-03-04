var util = {
    text: function (e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.innerText || t.textContent
    }, decodeHtmlStr: function (e) {
        return e.replace(/&nbsp;/g, " ").replace(/&alt;/g, "<")
    }, aop: function (e, t) {
        return function () {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.apply(this, n)
        }
    }, addStyleRule: function (e, t) {
        t = t || document;
        var n = t.styleSheets[0], r;
        n || (r = document.createElement("style"), t.getElementsByTagName("head")[0].appendChild(r), n = r.sheet || r.styleSheet),
        n.insertRule(e, 0)
    }, trigger: function (e, t) {
        var n = document.createEvent("Event");
        n.initEvent(e, !1, !1), t.dispatchEvent(n)
    }, getParamObj: function (e) {
        var t, n, r = {};
        return questionMarkPos = e.indexOf("?"), questionMarkPos > -1 && (t = e.substr(questionMarkPos + 1)), t !== "" && (n = t.split("&")), n.forEach(function (e) {
            var t = e.split("="), n = t[0], i = t[1];
            r[n] = i
        }), r
    }, getScriptParamVal: function (e, t) {
        var n = document.querySelectorAll("script"), r;
        return Array.prototype.slice.call(n).every(function (n) {
            var i;
            return !t || t(n) ? (i = this.getParamObj(n.src), r = i[e], !1) : !0
        }.bind(this)), r
    }, getCurrentScript: function () {
    }
};