var aop=function(e,t){return function(){var n=Array.prototype.slice.call(arguments);return n.unshift(e),t.apply(this,n)}};