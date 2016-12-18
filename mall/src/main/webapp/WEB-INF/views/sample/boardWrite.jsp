<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %>
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
    		<textarea title="내용" id="CONTENTS" name="CONTENTS" rows="20" cols="100" class="form-control" ></textarea>
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
