<%@ page language="java" contentType="text/html; charset=utf-8"
 	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%-- <%@ taglib prefix="naon" uri="http://gw.naonsoft.com/jsp/gwtl/naon"%> --%>
<%-- <%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %> --%>
<!DOCTYPE html>
<html>
<head>
<title>에디터 이미지 업로드</title>
<link rel="stylesheet" href="/resources/component/html5upload/css/jquery.fileupload-ui.css"></link>
<link rel="stylesheet" href="/resources/framework/css/basic.css"></link>

<script type="text/javascript" src="/resources/js/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="/resources/i18n/ko/commonMessages.js"></script>

<script type="text/javascript" src="/resources/js/mustache/mustache.js"></script>
<script type="text/javascript" src="/resources/framework/twest.js"></script>
<!-- <script type="text/javascript" src="/resources/framework/naon.js"></script> -->
<script type="text/javascript" src="/resources/component/html5upload/js/vendor/jquery.ui.widget.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/load-image.min.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.fileupload.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.fileupload-ui-custom.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/message_ko.js"></script>
<script type="text/javascript" src="/resources/framework/upload/upload3.js"></script>
<script type="text/javascript" src="/resources/framework/upload/upload-ui.js"></script>
<script src="/resources/editor/daumeditor/js/popup.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" defer="defer">
/*5.2와 6.0 통합버전*/
$(function() {
	debugger;
	var pageType = '${param.editorType}';
	var editorName = '${param.editorName}';
	if(pageType=="old"){
		 // 접속한 웹브라우저가 IE일 경우 class 추가 (파일첨부 드래그 안내글 처리)
		    if (navigator.userAgent.indexOf("MSIE") > 0) {
		     $('body').addClass('ie');
		     }
		    $('#editorImgUpload').naonUpload({
				type : 1,
				buttonType : 'default',
				uploadUrl: '${pageContext.request.contextPath}/common/editor/upload',
				module: opener.imgMode,
				subModule: 'image',
				allowedExtension: 'jpg,jpeg,png,gif',
				maxNumberOfFiles: 3,
				maxFileSize: 30 * 1024 * 1024,
				maxTotalFileSize: 30 * 1024 * 1024,
				uploadType: 'image',
				fileInfo:  [],
				uploadedCallback : function(){
					var htmls = [];
					var fileList  = $('#editorImgUpload').naonUpload('getFileInfos');
					for(var i=0 ; i <fileList.length;i++){
						var file = fileList[i];				
						var afileUrl = frameworkProperties.serverUrl+"${pageContext.request.contextPath}/service/file/fileView?module="+opener.imgMode+"&fileUrl="+file.fileUrl+"&fileName="+file.localFileName;
						if(opener.imgMode == 'brd'){
							 opener.addImageInfo({
								localFileName: file.localFileName,
								realFileName: file.realFileName,
								fileUrl: file.fileUrl,
								fileSize: file.fileSize,
								cud: file.cud
							}); 
						}
						htmls.push('<img src="' + afileUrl + '">');
					}
					//에디터 내로 삽입
					opener._addHtmlToEditor(htmls.join(''));
					window.close();
				}
			});
			//업로드버튼 binding
			// Cancels the form's submit action.

			//업로드 호출.
			$('#uploadBtn').click(function(){
				$('#editorImgUpload').naonUpload('upload');
			});
			$('#daumImgUpload_close').click(function(){
				self.close();
			});
	}else{
			var _opener = typeof PopupUtil != 'undefined' ? PopupUtil.getOpener() : opener;
		    if (!_opener) {
		        alert('잘못된 경로로 접근하셨습니다.');
		        return;
		    }
		 // 접속한 웹브라우저가 IE일 경우 class 추가 (파일첨부 드래그 안내글 처리)
		    if (navigator.userAgent.indexOf("MSIE") > 0) {
		     $('body').addClass('ie');
		     }
		    var peditor = _opener._getNgwEditor(editorName);
		    $('#editorImgUpload').naonUpload({
				type : 1,
				buttonType : 'default',
				uploadUrl: '${pageContext.request.contextPath}/service/file/upload',
				module: peditor.attr.module,
				subModule: 'image',
				allowedExtension: 'jpg,jpeg,png,gif',
				maxNumberOfFiles: 3,
				maxFileSize: 30 * 1024 * 1024,
				maxTotalFileSize: 30 * 1024 * 1024,
				uploadType: 'image',
				fileInfo:  [],
				uploadedCallback : function(){
					var htmls = [];
					var fileList  = $('#editorImgUpload').naonUpload('getFileInfos');
					for(var i=0 ; i <fileList.length;i++){
						var file = fileList[i];				
						var afileUrl = frameworkProperties.serverUrl+"${pageContext.request.contextPath}/service/file/fileView?module="+peditor.attr.module+"&fileUrl="+file.fileUrl+"&fileName="+file.localFileName;		
						peditor.addImageInfo({
							localFileName: file.localFileName,
							realFileName: file.realFileName,
							fileUrl: file.fileUrl,
							fileSize: file.fileSize,
							cud: file.cud
						});
						htmls.push('<img src="' + afileUrl + '">');
					}
					//에디터 내로 삽입
					peditor.insertHtml(htmls.join(''));
					window.close();
				}
			});
			//업로드버튼 binding
			// Cancels the form's submit action.

			//업로드 호출.
			$('#uploadBtn').click(function(){
				$('#editorImgUpload').naonUpload('upload');
			});
			$('#daumImgUpload_close').click(function(){
				self.close();
			});
	}
});
</script>
</head>
<body class="skin_grid3">
	<div class="wrap_popup">
		<div class="popup_header">
			<h1 class="tit">파일 첨부</h1>
			<button type="button" title="닫기" class="btn_close"
				id="daumImgUpload_close">
				<span>닫기</span>
			</button>
		</div>
		<div id="popup_content" class="popup_content" style="overflow: aoto; height: 758;">
			<div class="multi_upload_box" style="padding: 20px">
				<div id="editorImgUpload" class="fileupload_manger"></div>
				<div class="btn_area">
					<button id="uploadBtn" type="submit" class="btn btn_med btn_pri">
						<strong>업로드</strong>
					</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>