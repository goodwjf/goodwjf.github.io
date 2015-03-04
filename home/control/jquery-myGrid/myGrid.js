var myGrid = function(_obj){
		
		extend(this,_obj);
		
		//扩充属性
		function extend(destination,source){
			 for(var property in source){
				  destination[property] = source[property];
			 }
			 return destination;
		} 
		
		//创建表格
		if(typeof myGrid._initialized=="undefined"){
		  myGrid.prototype.createTable = function(_data){
			    var _arrayFirstCells = _data.title;
				var _arrayCells = _data.content;
				var table = document.createElement("table");
					table.className = "_table";
					//table.setAttribute("cellspacing","0");
					table.cellSpacing = 0;
 					table.setAttribute("border","0");
  				
				function insertRows(_table,_arrayCells,_indexRows){
					var row = _table.insertRow(_indexRows);
					var j = 0;
						for(var i  in  _arrayCells){
							var cell = row.insertCell(j);
  							var text = document.createElement("span");
 								text.innerHTML =  _arrayCells[i] ;
								cell.appendChild(text);	
							if(j === 0 && _indexRows !== 0){
 								var inner = "[ <a href='javascript:alert(\" 预览:"+_arrayCells[i]+"\")'>预览</a> |"
											+ " <a href='javascript:alert(\" 下载:"+_arrayCells[i]+"\")'>下载</a> |"
											+ " <a href='javascript:alert(\" 备注:"+_arrayCells[i]+"\")'>备注</a> ]";
								var span = document.createElement("span");
									span.className = "span_a";
 									span.style.display = "none";
									span.innerHTML = inner;
								var ico = document.createElement("b");
								 ico.className = "ico";
  								cell.insertBefore(ico,text);	
   								cell.appendChild(span);
 							}
								j++;
						}
					return row;	
				}
				
				insertRows(table,_arrayFirstCells,0);
				
				for(var i = 0, len = _arrayCells.length; i < len; i++){
 						var row = insertRows(table,_arrayCells[i],i+1);
						(function(){
							var span =  row.firstChild.childNodes[2];
								row.onmouseover = function(){this.className = "moveover";span.style.display = "";}
								row.onmouseout = function(){this.className = "";span.style.display = "none";}
						})()
				}
				
				
				return table;
		}
				 myGrid._initialized=true;
	}
		
 			
		var me = this;
		(function(){
   				var box = document.getElementById(me.id);
				var table = me.createTable(me.data);
					box.appendChild(table);
 		})()
	
}

