jQuery.ComboBox  = function(divselectid,inputselectid,callBack) {
	var inputselect = $(inputselectid);
	$(divselectid+" cite").click(function(){
		var ul = $(divselectid+" ul");
		if(ul.css("display")=="none"){
			ul.slideDown("fast");
 		}else{
 			ul.slideUp("fast");
		}
		return false;
	});
	$(divselectid+" ul li a").click(function(){
		var txt = $(this).text();
		$(divselectid+" cite").html(txt);
		var value = $(this).attr("selectid");
		inputselect.val(value);
		if(callBack){callBack(txt)};
		$(divselectid+" ul").hide();
 	});
	
	$(document).click(function(){
		$(divselectid+" ul").hide();
	});
};

 
