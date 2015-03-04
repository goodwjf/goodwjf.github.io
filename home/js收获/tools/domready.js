(function(global){
	var readyList=[],
		domReady=false,
		listening=false,
		queue=function(fn){
			readyList.push(fn);
		},
		listenReady=function(){
			if(!listening){//如果还没有监听
				listening=true;//正在监听中，避免重复监听
				
				if(document.readyState==='complete'||(document.readyState!=='loading'&&document.addEventListener)){
					// Handle it asynchronously to allow scripts the opportunity to delay ready
					setTimeout(handleReady,1);
				}else if(document.addEventListener){//for modern browser 正在监听domReady事件何时触发
					document.addEventListener('DOMContentLoaded',function(){
						document.removeEventListener('DOMContentLoaded',arguments.callee,false);
						handleReady && handleReady();
					},false);
					window.addEventListener('load',handleReady,false);
				
				}else if(document.attachEvent){//for ie 正在监听domReady事件何时触发
					document.attachEvent('onreadystatechange',function(){
						if(document.readyState==='complete'){
							document.detachEvent('onreadystatechange',arguments.callee);
							handleReady && handleReady();
						}
					});
					window.attachEvent('onload',handleReady);
					
					//for ie when the following script is not in the frame
					var top = false;  
	  
					try{
						//判断文档是否处于最顶层  
						top=window.frameElement==null&&document.documentElement;  
					}catch(e){}
					
					if(top&&top.doScroll){
						(function doScrollCheck(){
							if(!domReady){
								try{
									top.doScroll('left');
								}catch(e){
									return setTimeout(doScrollCheck,50);
								}
								
								handleReady && handleReady();
							}
						})();
					}	
				}
			}
		},
		handleReady=function(){
			if(!domReady){
				domReady=true;
				listening=false;
				
				var fn;
				while(fn=readyList.shift()){
					fn();
				}
				
				readyList=queue=listenReady=handleReady=null;
			}
		};

	var domReady = function(fn){//对外的绑定ready事件的函数
		if(domReady){
			fn();
		}else{
			queue(fn);
			listenReady();
		}
	};
	
	if(!global.sogou){global.sogou = {};}
	if(!global.sogou.extension){global.sogou.extension = {};}
	if(!global.sogou.extension.reader){global.sogou.extension.reader = {};}
	
	global.sogou.extension.reader.domReady = domReady;
}(this));