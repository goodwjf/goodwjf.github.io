// JavaScript Document

 (function($){     
 		$.fn.iniFormSelectBox = function(n){
 			return this.each(function() {    
						$this = $(this);
						$this.find("input:checkbox").prop("checked",false);	
						$this.delegate("label", "click", function() {
							$this = $(this);
							$this.toggleClass('selected');
							if($this.hasClass('selected')){
							 
									$this.find("input:checkbox").prop("checked",true);	
							}else{
									$this.find("input:checkbox").prop("checked",false);	
							}
							return false; 
						});
			    }); 
 		};
 		
 	 })(jQuery); 
 