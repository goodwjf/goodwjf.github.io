// JavaScript Document

(function($) {
    if (!Array.prototype.indexOf){
				 Array.prototype.indexOf = function(item, i) {  
 					i || (i = 0);  
					var length = this.length;  
					if (i < 0) i = length + i;  
					for (; i < length; i++)  
					if (this[i] === item) return i;  
					return -1;  
				};  
	}
  	Array.prototype.remove = function(b) {
			var a = this.indexOf(b);
			$.inArray(this,b);
			if (a >= 0) {
				this.splice(a, 1);
				return true;
			}
			return false;
	}; 
	$.fn.mySlider = function(settings) {
 		    var settings = $.extend({}, $.fn.mySlider.defaults, settings);
 			var $arr=[];
			var $objB = this
			$objB.each(function(i){	 
								var $timer = $(this)
								var $left = $timer.find(".leftD");
								var $right = $timer.find(".rightD");
								var $center = $timer.find(".centerOuter");
								var $center2 = $timer.find(".centerInner");
								var itemDiv = $center2.find("div");
								var step = settings.itemWidth+8;
								var center2Width = itemDiv.length * step ; 
								var scrollLenth = center2Width - settings.width; 				
									$center2.css("width",center2Width);
									$center.css("width",settings.width);
					//滚动 				
								function setState(v){
										var bgLeft = v <= 0 ? "left_gray" : "left_red";
										$left.css("background","url(img/"+bgLeft+".png) no-repeat");
										var bgRight = v >= scrollLenth ? "right_gray" :"right_red";
										$right.css("background","url(img/"+bgRight+".png) no-repeat");
								}
								setState( $center.scrollLeft());
								$left.click(function(){
										var v = $center.scrollLeft()-step;											    //$center.scrollLeft($center.scrollLeft()-step);
										$center.animate({scrollLeft : v},"fast");
										setState(v);
								});
								$right.click(function(){
										var v = $center.scrollLeft()+step;												//$center.scrollLeft($center.scrollLeft()+step);
										$center.animate({scrollLeft : v},"fast");
										setState(v);
								});
								
					//子项			
								var arr = settings.isMultiple ? [] : "";
								var tempObj = "";
					
								itemDiv.css("width",settings.itemWidth);
								 
								if(!settings.isMultiple){ 
											 itemDiv.click(function(){
															if(tempObj == $(this)){
																	tempObj.removeClass("selected");
															}else{
																	if(tempObj !== ""){
																		tempObj.removeClass("selected");
																	}	
																	arr = $(this).html();
																	$(this).addClass("selected");
																	tempObj = $(this); 
															}
											});
											itemDiv.eq(settings.selectIndex).click()
																	
								}else{
											itemDiv.toggle(
														   function(){
															   arr.push($(this).html());
															   $(this).addClass("selected"); 
														   },
														   function(){
															   var v= $(this).html();
															   arr.remove(v);
															   $(this).removeClass("selected");
														   }
											); 
											
											$timer.isHaveValue = function(){
												return arr.length == 0 ? false :true;	
											}	 
											
								}
								
								if(itemDiv.length < settings.width/settings.itemWidth){$left.hide();$right.hide()}
					//调用			
								$timer.getValue = function (){
									return arr;
								}
								$arr.push($timer);
								
			
			
			});
			
			var n = 0;
			
			n++;
			
			console.log('Hello');
			console.log(n);
			return  $arr;
			
	}
	$.fn.mySlider.defaults = {width:433,itemWidth:100,isMultiple:false,selectIndex:1};
 
	
})(jQuery);