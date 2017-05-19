<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %>
<%@ include file="/WEB-INF/views/common/uploadbrowserChk.jsp"%>
<!-- i18n -->
<%-- <script type="text/javascript" src="${BASE_JS}/i18n/${USER_LOCALE}/resource/commonMessages.js"></script> --%>
<script type="text/javascript" src="/resources/i18n/ko/commonMessages.js"></script>

<%-- 파일업로드 관련 --%>
<% if (ieVerChk) { %>
<link rel="stylesheet" href="/resources/component/html5upload/css/jquery.fileupload-ui.css"></link>
<script type="text/javascript" src="/resources/js/mustache/mustache.js"></script>
<!-- <script type="text/javascript" src="/resources/framework/naon.js"></script> -->
<script type="text/javascript" src="/resources/framework/twest.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/vendor/jquery.ui.widget.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/load-image.min.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.fileupload.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/jquery.fileupload-ui-custom.js"></script>
<script type="text/javascript" src="/resources/component/html5upload/js/message_ko.js"></script>
<script type="text/javascript" src="/resources/framework/upload/upload3.js"></script>
<script type="text/javascript" src="/resources/framework/upload/upload-ui.js"></script>
<% } %>

<c:set var="CONTEXT_ROOT" value="${pageContext.request.contextPath}" />

<script type="text/javascript">
var frameworkProperties = {
	context: '${CONTEXT_ROOT}'
}
</script>

<script type="text/javascript">

	var count = 1;

	$(document).ready(function(){
		// 부트스트랩
		$(":file").filestyle({classButton: "btn btn-primary"});
		
	    $("#list").on("click", function(e){ //목록으로 버튼
	        e.preventDefault();
	        fn_openBoardList();
	    });
	     
	    $("#write").on("click", function(e){ //작성하기 버튼
	        e.preventDefault();
	        fn_insertBoard();
	    });
	    
	    $("#addFile").on("click", function(e) {	//파일 추가 버튼
	    	e.preventDefault();
	    	fn_addFile();
	    });
	    
	    $("a[name='delete']").on("click", function(e) {	//삭제 버튼
	    	e.preventDefault();
	    	fn_deleteFile($(this));
	    });
	});
	 
	function fn_openBoardList(){
	    var comSubmit = new ComSubmit();
	    comSubmit.setUrl("<c:url value='/sample/openBoardList' />");
	    comSubmit.submit();
	}
	 
	function fn_insertBoard(){
		if (!_editorLoad) {
			$("#contents").value = _getTxtaContent();
			return;
		}
		
		var sHtml = _getEditorHtml();
		if (sHtml == '') return;
		if (editorMode != 'tagfree' && editorMode != 'script')
//			_getImgSeqList(sHtml);
		$("#contents").val(sHtml);
		
	    var comSubmit = new ComSubmit("frm");
	    comSubmit.setUrl("<c:url value='/sample/insertBoard' />");
	    comSubmit.submit();
	}
	
	function fn_addFile() {
		var str = "<div class='col-lg-11 col-md-11'><input type='file' name='file_"+ count++ +"' class='filestyle' data-classButton='btn btn-primary'></div>";
		str += "<div class='col-lg-1 col-md-1'><p><a href='#this' class='btn btn-primary' id='delete' name='delete'>삭제</a></p></div>";
		$("#fileDiv").append(str);
		$("a[name='delete']").on("click", function(e) {
			e.preventDefault();
			fn_deleteFile($(this));
		});
		$(":file").filestyle({classButton: "btn btn-primary"});
	}
	
	function fn_deleteFile(obj) {
		obj.parent().parent().prev().remove();
		obj.parent().parent().remove();
	}
</script>
<div class="container">
    <form id="frm" name="frm" enctype="multipart/form-data">
    <div class="panel panel-success">
    	<div class="panel-body">
    		<span>제목</span>
    		<input type="text" id="TITLE" name="TITLE" class="form-control"></input>
    	</div>
    	<div class="panel-body">
    		<span>작성자</span>
    		<input type="text" id="REG_ID" name="REG_ID" class="form-control"></input>
    	</div>
    	<div class="panel-body">
    		<span>내용</span>
<!--     		<textarea title="내용" id="CONTENTS" name="CONTENTS" rows="20" cols="100" class="form-control" ></textarea> -->
			<c:set var="EDITOR_MODULE" value="daumEditor" />
			<c:set var="EDITOR_HEIGHT" value="150" />
			<c:set var="EDITOR_CONTENT" value="" />
			
			
			<input type="hidden" id="contents" name="contents" value=""/>
			<%@ include file="/resources/editor/daumeditor/editor.jsp"%>
    	</div>
        <div class="panel-body">
        	<div id="fileDiv" class="row">
        		<div class="col-lg-11 col-md-11">
	      			<input type="file" name="file_0" class="filestyle" data-classButton="btn btn-primary">
        		</div>
        		<div class="col-lg-1 col-md-1">
	      			<p><a href="#this" class="btn btn-primary" id="delete" name="delete">삭제</a><p>
        		</div>
        	</div>
      	</div>
    </div>
    <div class="container" style="text-align: right;">
        <div class="btn-group">
        	<a href="#this" class="btn btn-primary" id="addFile">파일 추가</a>
	        <a href="#this" class="btn btn-primary" id="write" >작성하기</a>
	        <a href="#this" class="btn btn-primary" id="list" >목록으로</a>
        </div>
    </div>
    </form>
</div>
    <%@ include file="/WEB-INF/views/common/sample/include-body.jsp" %>
