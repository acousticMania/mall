<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %>
<script type="text/javascript">
	console.log(${fn:length(list)+1});
	var count = '${fn:length(list)+1}';

	$(document).ready(function () {
		// 부트스트랩
		$(":file").filestyle({classButton: "btn btn-primary"});
		
		$("#list").on("click", function(e) {
			e.preventDefault();
			fn_openBoardList();
		});
		
		$("#update").on("click", function(e) {
			e.preventDefault();
			fn_updateBoard();
		});

		$("#delete").on("click", function(e) {
			e.preventDefault();
			fn_deleteBoard();
		});
		
		$("#addFile").on("click", function(e) {	//파일 추가 버튼
	    	e.preventDefault();
	    	fn_addFile();
	    });
	    
	    $("a[name^='delete']").on("click", function(e) {	//삭제 버튼
	    	e.preventDefault();
	    	fn_deleteFile($(this));
	    });
	});
	
	function fn_openBoardList() {
		var comSubmit = new ComSubmit();
		comSubmit.setUrl("<c:url value='/sample/openBoardList'/>");
		comSubmit.submit();		
	}
	
	function fn_updateBoard() {
		var comSubmit = new ComSubmit("frm");
		comSubmit.setUrl("<c:url value='/sample/updateBoard'/>");
		comSubmit.submit();
	}
	
	function fn_deleteBoard() {
		var comSubmit = new ComSubmit();
		comSubmit.setUrl("<c:url value='/sample/deleteBoard'/>");
		comSubmit.addParam("BOARD_IDX", $("#BOARD_IDX").val());
		comSubmit.submit();		
	}
	
	function fn_addFile() {
		var str = "<div class='col-lg-11 col-md-11'><input type='file' name='file_"+ (count) +"' class='filestyle' data-classButton='btn btn-primary'></div>";
		str += "<div class='col-lg-1 col-md-1'><p><a href='#this' class='btn btn-primary' id='delete_" + (count) + "' name='delete_" + (count) + "''>삭제</a></p></div>";
		$("#fileDiv").append(str);
		$("#delete_"+(count++)).on("click", function(e) {
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
    	<div class="panel-heading">
    		<div class="row">
	    		<div class="col-lg-6 col-md-6">
		    		<strong>글번호 : </strong>${map.BOARD_IDX }
		    		<input type="hidden" id="BOARD_IDX" name="BOARD_IDX" value="${map.BOARD_IDX }" >
	    		</div>
	    		<div class="col-lg-6 col-md-6">
	    			<strong>조회수 : </strong>${map.HIT_CNT }
	    		</div>
    		</div>
    	</div>
    	<div class="panel-heading">
    		<div class="row">
    			<div class="col-lg-6 col-md-6">
    				<strong>작성자 : </strong>${map.REG_ID }
    				<input type="hidden" name="REG_ID" value="${map.REG_ID }">
    			</div>
    			<div class="col-lg-6 col-md-6">
    				<strong>작성시간 : </strong>${map.REG_DATE }
    			</div>
    		</div>
    	</div>
    	<div class="panel-body">
    		<span>제목</span>
    		<input type="text" id="TITLE" name="TITLE" value="${map.TITLE }" class="form-control"></input>
    	</div>
    	<div class="panel-body">
    		<span>내용</span>
    		<textarea title="내용" id="CONTENTS" name="CONTENTS"  rows="20" cols="100" class="form-control" >${map.CONTENTS }</textarea>
    	</div>
        <div class="panel-body">
	       	<div id="fileDiv" class="row">
	        	<c:forEach var="row" items="${list}" varStatus="var">
		       		<div class="col-lg-11 col-md-11">
		      			<input type="hidden" id="FILE_IDX" name="FILE_IDX_${var.index }" value="${row.FILE_IDX}"/>
		      			<span>${row.REAL_FILE_NAME}	</span>
		      			<input type="file" id="file_${var.index}" name="file_${var.index}" value="${row.REAL_FILE_NAME}" class="filestyle" data-classButton="btn btn-primary">
			      		(${row.FILE_SIZE}kb)
		       		</div>
		       		<div class="col-lg-1 col-md-1">
		       			<span>&nbsp; </span>
			      		<p><a href="#this" class="btn btn-primary" id="delete_${var.index}" name="delete_${var.index}">삭제</a></p>
		       		</div>
	   	    	</c:forEach>
	       	</div>
      	</div>
   	</div>
	</form>
	<div class="btn-group">
		<a href="#this" class="btn btn-primary" id="addFile">파일 추가</a>
		<a href="#this" class="btn btn-primary" id="list">목록으로</a>
		<a href="#this" class="btn btn-primary" id="update">저장히기</a>
		<a href="#this" class="btn btn-primary" id="delete">삭제하기</a>
	</div>
	<%@ include file="/WEB-INF/views/common/sample/include-body.jsp" %>
</div>