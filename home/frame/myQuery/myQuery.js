function myAddEvent(obj, sEv, fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+sEv, function (){
			fn.call(obj);
		});
	}else{
 		obj.addEventListener(sEv, fn, false);
	}
}

function getElementByClass(str){
	var aArr = [];
	var aEle = document.getElementsByTagName("*");
	var ergExp = new RegExp("\\b"+str+"\\b",i);
		for(var i = 0; i< aEle.length; i++){
  				if(ergExp.test(aEle[i].className)){
					aArr.push(aEle[i]);					
				}
		}
  	return aArr;	
		
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}


function myQuery(vArg){
  		this.element = [ ];
 		switch (typeof vArg){
				case  "function" :
 					myAddEvent(window,"load",vArg);
				break;	
				case "string":
					switch(vArg.charAt(0)){
						case "#":
							var obj = document.getElementById(vArg.substring(1));
							this.element.push(obj);
						break;
						case ".":
 							this.element = getElementByClass(vArg.substring(1));
  						break;
						
						default:
							var aEle = document.getElementsByTagName(vArg);	
 							this.element = aEle;
					}
					break;
				case "object":
 					this.element.push(vArg);
 		
		}
  }

var $ = function(vArg){
 	return new myQuery(vArg);
}

myQuery.prototype.size = function(){
  	return this.element.length;
}

myQuery.prototype.eq = function(i){
	return $(this.element[i]);	
}

myQuery.prototype.each =  function(fn){ 
	var aEle = this.element;
   	for(var i = 0; i< aEle.length; i++){
		fn.call(aEle[i],i,aEle);
	}	
}

function _each(arr,fn){
	 	for(var i =0; i< arr.length;i++){
				fn(arr[i]);
		}
}

myQuery.prototype.attr = function(){
	var _arguments =arguments;
	var aEle = this.element;
 	if(_arguments.length ==2){
   		_each(aEle,function(obj){
			obj.setAttribute([_arguments[0]] ,_arguments[1]);
		});
 	}else{
 		return aEle[0].getAttribute([_arguments[0]]);
 	}
	return this;
}



myQuery.prototype.css = function(){
	var _arguments =arguments;
	var aEle = this.element;
	if(_arguments.length ==2){
  		_each(aEle,function(obj){
			obj.style[_arguments[0]] = _arguments[1];
		});
 	}else{
		if(typeof _arguments[0] == "object"){
				_each(aEle,function(obj){
					for(var j in _arguments[0])
					{
						obj.style[j]=_arguments[0][j];	
 					}
 				});
  		}else{
			return getStyle(aEle[0],_arguments[0]);
 		}
		
	}
	return this;
}