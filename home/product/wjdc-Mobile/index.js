
//初始化 
var $arr = $("#sort15").find("select"); 
var iArr = new Array($arr.length);
var sOpts = $arr.eq(0).html();
var counter =0;
  
  
//记录选择项
function setiArr($o){
		var index = $o.parent().parent().index();
		if($o.val() != 0){
         	iArr[index] = $o.val();
		}
}

//清除记录选项
function clearArr(){
	for(var i =0; i< iArr.length; i++){
		delete iArr[i];		
	}
}
  

//设置隐藏的option
function setHide($o){
	$o.html(sOpts);
	var acurOpt = $o.find("option");
 	for(var i = 0; i < iArr.length; i++){
		for(var j = 0; j< acurOpt.length; j++){
  			var $curOpt = acurOpt.eq(j);
   			if(iArr[i] == $curOpt.val()){
  				$curOpt.remove();
			}		
		}
	}

}

//设置自动选中项
function setAutoSelected($sel){ 
		 var opt = $sel.find("option");
 		 if(opt.length == 1){
   			 opt.eq(0).attr("selected","");
 			$sel.selectmenu( "refresh" );
			setiArr($sel);
   		 }
}

 
//选项改变时触发的事件
$arr.change(function(){
	var $cur = $(this);
	setiArr($cur); 
 	$arr.each(function(index, element) {
		var $th = $(this);
 		if($cur[0].id != $th[0].id){
			setHide($th);	
		}  
    });
 	if(!$cur.attr("cag")){
 		counter++;	
	}
	$cur.attr("cag",true);
 	//锁定最后一个剩余项
	if(counter == $arr.length - 1){
 		$arr.each(function(index, element) {
				if(!$(this).attr("cag")){
					setAutoSelected($(this));
				}
         });	
	}
 });

//page15页面初始化方法 
function page15Init(){
		$arr.each(function(index, element) {
 	 		$(this).selectmenu(); 
			$(this)[0].selectedIndex = 0;
			$(this).selectmenu( "refresh" );
			
		});
}
 
//页面初始化
$("#page15").on("pagebeforecreate", function( event ) { 
		page15Init();
});

//表单重置
$("#reset").on("click",function(){
 		$arr.each(function(index,element){
			$(this).selectmenu(); 
			$(this).html(sOpts);
			$(this).selectmenu( "refresh",true );	
		})
		page15Init();
 		clearArr();
 		counter = 0;
});
