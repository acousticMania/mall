<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ page import="com.naon.biz.common.bean.PropertyConstants"%> --%>
<%@ page import="java.util.regex.*" %>
<%
	String ua = request.getHeader("User-Agent");
	boolean ieVerChk = false;
	if(ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0) {
		Pattern p = Pattern.compile("(^*[0-9].[0-9])");
		Matcher match = p.matcher(ua.substring(ua.indexOf("Trident")));
		if (match.find()) {
			if ((int)Float.parseFloat(match.group()) >= 6) {
				ieVerChk = true;
			} else {
				ieVerChk = false;
			}
		}
	} else {
		ieVerChk = true;
	}
%>

<script type="text/javascript">
	function addFileInfo(fileInfo){
		var arrayFileInfo = fileInfo.split("|");

		var fileInfoList = [];
		for (var i=0; i<arrayFileInfo.length; i++){
			var name = arrayFileInfo[i].split(";")[0];
			var fileName = arrayFileInfo[i].split(";")[1];
			var url = arrayFileInfo[i].split(";")[2];
			var size = arrayFileInfo[i].split(";")[3];

			fileInfoList.push({
				fileName: fileName,
				fileSize: Number(size),
				fileUrl: url,
				localFileName: fileName,
				name: fileName,
				realFileName: name,
				size: Number(size),
				url: url
			});
		}

		var uri = '${BASE_URI}';

		if (uri.indexOf('appEditByFormlet.jsp') != -1 || uri.indexOf('appChgByFormlet.jsp') != -1) {
			jQuery('#fileupload1').twestUpload('appendFiles', fileInfoList);
		} else {
			jQuery('#fileupload1').twestUpload('appendFiles', fileInfoList);
		}
	}

	function ieVerChk(){
		var _ua = navigator.userAgent;
		var rv = -1;

		//IE 11,10,9,8
		var trident = _ua.match(/Trident\/(\d.\d)/i);
		if (trident != null) {
			if (Number(trident[1]) >= 6) {
				return true;
			} else {
				return false;
			}
		}

		//IE 7...
		if (navigator.appName == 'Microsoft Internet Explorer') return false;

		//other
		return true;
	}
</script>
