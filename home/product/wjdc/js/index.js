$(function(){
	//级联菜单数据
 	  var selectoptions = {
    		"选题2": {
    	         "key" : 10,
                 "defaultvalue" : 111,
    	         "values" : {
                     "子选题1": 110,
                     "子选题2": 111,
                     "子选题3": 112
                     }
              },
            "选题1": {
                 "key" : 20,
                 "defaultvalue" : 212,
                 "values" : {
                     "子选题1": 210,
                     "子选题2": 211,
                     "子选题3": 212,
                     "子选题4": 213
                     }
              }
    };
	//级联菜单实现
	    $('#first').doubleSelect('second', selectoptions);
	
	
	//鼠标经过li的效果
	
		$("li").hover(
			function () {
				$(this).addClass("hover");
			},
			function () {
				$(this).removeClass("hover");
			}
		);
		$('#star').raty();
		
	//页面提交	
		$('#submit1').click(function(){
			// verification();
		});
		
	//皮肤切换	
		$(".colorBar a").click(function(){
				$("body").attr("class",$(this).attr("myStyle"));
		});
		
	//排序	
 	$('#buttonToUp').click(function(){    
  		moveOption('Selgroup',function(i){
                $(this).prev().before($(this)); 
         })
    });
	
    $('#buttonToDown').click(function(){  
 		moveOption('Selgroup',function(i){
                $(this).next().after($(this)); 
               // $(this).insertAfter($(this).next());  //下移
        })
    });	
		
 	$('#buttonToFirst').click(function(){    
  		moveOption('Selgroup',function(i){
                $(this).siblings().first().before($(this)); 
         })
    });
	
    $('#buttonToLast').click(function(){  
 		moveOption('Selgroup',function(i){
                $(this).siblings().last().after($(this)); 
         })
    });		
	
	var $aCheckBox = $("input[name='CheckboxGroup1']");
	
	$aCheckBox.click(function(){
		var $aOption = $("select[name='Selgroup']");

		if($(this).prop("checked")){
				addOption($aOption,$(this))			
		}else{
				removeOption($aOption,$(this) )			
 		}	
	})
	
	
 	//第一题 选题事件
	$("input[name='radio1']").click(function(){
			//josn 说明
			/*
			@value: 选题的值用以验证的那些题目需要隐藏那些题目需要显示
			@showObj：需要显示的题目 数组列表
			@hideObj：需要隐藏的题目 数组列表		
			*/
			
			var josn = [
						{value:1, showObj:["qId2","qId3"], hideObj:["qId5","qId6","qId4"]},
						{value:2, showObj:["qId4","qId5","qId6"], hideObj:["qId2","qId3"]}
					   ];
			
			filter($(this).val(),josn);		   
 	});
		
		
});

//自定义方法

//添加Option
function addOption(oTarget,one){
 	 var v =one.val();
	 var t = one.parent().text();
   	 oTarget.append($("<option value="+v+">"+t+"</option>"));
}

//删除Option
function removeOption(oTarget,one){
	oTarget.find("option").each(function(){
				if($(this).val() == one.val()){ 
					$(this).remove();
					return false;
				}
	});

}

//移动Option
function moveOption(selName,fun){
	
	    if($("select[name="+selName+"] option:selected").length>0){               
            $("select[name="+selName+"] option:selected").each(function(i){
				fun.call(this,i)
             });
         }
}

//表单自定义验证
function verification(){
		$(".question-choice-tips").hide();
	 	if(!isChecked(1,"radio1")){
			goTo("Q1");
			return false;
 		} 
		if(!isChecked(1,"radio2")){
			goTo("Q2");
 			 return false;
		}
	 	if(!isChecked(1,"radio3")){
			goTo("Q3");
			 return false;
		}
 	 	if(!isChecked(2,"checkbox4")){
			goTo("Q4");
			 return false;
		}
	 
 	 	if($("#textarea1").val() == ""){
			goTo("Q5");
		    return false;
		}
		
 		
 	 	if($('#star').raty('score') == undefined){
			goTo("Q6");
			 return false;
		}
		
		
		
}

//单选复选 检测
function isChecked(type,name){
	 
	 switch(type){
		 case 1: 
		 		var $obj = $('input:radio[name='+name+']:checked');
			   return   $obj.val() == null ? false : true;
		 case 2:
		 		var $obj = $('input:checkbox[name='+name+']:checked');
			   return   $obj.length == 0 ? false : true;
	 }
} 

//页面回滚到错误提示
function goTo(id){
 	   var _targetTop = $("#"+id).show().offset().top;  
        $("html,body").animate({scrollTop:_targetTop-50},500);
	  
}

//隐藏显示相应题目
function filter(v,josn){
	 for(var i = 0; i< josn.length; i++){
				var obj = josn[i];
				if(obj.value == v){
					var showArr = obj.showObj;
					var hideArr = obj.hideObj;
					for(var j = 0; j< showArr.length; j++){
							$("#"+showArr[j]).show(500); 	
					}
					
					for(var k = 0; k< hideArr.length; k++){
							$("#"+hideArr[k]).hide(500); 	
					}
 				}
 	 }
}