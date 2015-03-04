//获取样式
function getStyle(obj,name){
	
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,null)[name];	
	}

}

function startMove(obj,styleJson,fn){
		 clearInterval(obj.timer);
 		 obj.timer = setInterval(function(){
			 
			  	var bStop = true;
				for(var i in styleJson){
					 var attr= i;
					 var iTarget = styleJson[i];
					 bStop = doSomething(obj,attr,iTarget,bStop)	 
				}
				
				if(bStop){
					 clearInterval(obj.timer);
					 if(fn)fn();
				}	 
		 },30);
}


function doSomething(obj,attr,iTarget,bStop){
				var _bStop = bStop;
 			 	var cur = 0; 
				
 			 	if(attr == "opacity"){
					cur = Math.round(parseFloat(getStyle(obj,attr))*100);
				}else{
			 		cur = parseInt(getStyle(obj,attr));
				}
				
 				var speed = (iTarget - cur)/3;
					speed = speed > 0 ? Math.ceil(speed) :Math.floor(speed);
				
				if(cur != iTarget){
					_bStop = false;	
				}
				
			
				if(attr == "opacity"){
					obj.style.filter="alpha(opcity:"+ (cur+speed) +")";
					obj.style.opacity = (cur+speed)/100;
				}else{
					obj.style[attr] = cur+ speed + "px";	

				}
 				
				return _bStop;	 
			 
 }