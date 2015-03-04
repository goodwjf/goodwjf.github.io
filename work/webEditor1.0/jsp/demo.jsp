<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("UTF-8");
String htmlData = request.getParameter("content1") != null ? request.getParameter("content1") : "";
%>
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>webEditor JSP</title>
     
    
<link href="../js/kindeditor/themes/default/default.css" rel="stylesheet">
<link href="../js/myPlugins/myPlugins.css" rel="stylesheet">
<script src="../js/kindeditor/kindeditor.js" charset="utf-8"></script> 
<script charset="utf-8" src="../js/webEditor.js"></script>
<script src="../js/kindeditor/lang/zh_CN.js" charset="utf-8"></script>
<script src="../js/myPlugins/myPlugins.js" charset="utf-8"></script>

<script>
      window.onload = function() {
  
			var editor = new $C({
				obj: "#test1",
 				uploadJson : '../jsp/upload_json.jsp',
				height: '400px'//,
				//type:"simple" 
			});
			
			
	 
			 
 			$C.getEl("#getHtml").click(function() {
				alert(editor.getHtml());
			});
			
  	 }
</script>

    
</head>
<body>
 <h3>jsp动态功能测试</h3>
	<%=htmlData%>
	<form name="example" method="post" action="demo.jsp">
		<textarea name="content1" id = "test1" cols="100" rows="8" style="width:700px;height:200px;visibility:hidden;"><%=htmlspecialchars(htmlData)%></textarea>
		<br />
		<input type="submit" name="button" value="提交内容" /> (提交快捷键: Ctrl + Enter)
	</form>
 
</body>
</html>
<%!
private String htmlspecialchars(String str) {
	str = str.replaceAll("&", "&amp;");
	str = str.replaceAll("<", "&lt;");
	str = str.replaceAll(">", "&gt;");
	str = str.replaceAll("\"", "&quot;");
	return str;
}
%>