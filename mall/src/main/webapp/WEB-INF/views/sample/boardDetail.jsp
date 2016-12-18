<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %>
<script type="text/javascript">
	$(document).ready(function () {
		$("#list").on("click", function(e) {
			e.preventDefault();
			fn_openBoardList();
		});
		
		$("#update").on("click", function(e) {
			e.preventDefault();
			fn_openBoardUpdate();
		});
		
		$("a[name='file']").on("click", function(e) {
			e.preventDefault();
			fn_downloadFile($(this));
		});
	});
	
	function fn_openBoardList() {
		var comSubmit = new ComSubmit();
		comSubmit.setUrl("<c:url value='/sample/openBoardList'/>");
		comSubmit.submit();		
	}
	
	function fn_openBoardUpdate() {
		var idx = "${map.BOARD_IDX}";
		var comSubmit = new ComSubmit();
		comSubmit.setUrl("<c:url value='/sample/openBoardUpdate'/>");
		comSubmit.addParam("BOARD_IDX", idx);
		comSubmit.submit();
	}
	
	function fn_downloadFile(obj) {
		var idx = obj.parent().find("#FILE_IDX").val();
		var comSubmit = new ComSubmit();
		comSubmit.setUrl("<c:url value='/sample/downloadFile'/>");
		comSubmit.addParam("IDX", idx);
		comSubmit.submit();
	}
</script>

<div class="container">
    <div class="panel panel-success">
    	<div class="panel-heading">
    		<div class="row">
	    		<div class="col-lg-6 col-md-6">
		    		<strong>글번호 : </strong>${map.BOARD_IDX }
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
    			</div>
    			<div class="col-lg-6 col-md-6">
    				<strong>작성시간 : </strong>${map.REG_DATE }
    			</div>
    		</div>
    	</div>
    	<div class="panel-body"><strong>제목 : </strong>${map.TITLE }</div>
    	<div class="panel-body">${map.CONTENTS }</div>
    	<div class="panel-footer">
  			<c:forEach var="row" items="${list}">
				<p>
					<span class="glyphicon glyphicon-download"></span>
					<input type="hidden" id="FILE_IDX" value="${row.FILE_IDX}">
					<a href="#this" name="file">${row.REAL_FILE_NAME}</a>
					(${row.FILE_SIZE}kb)
				</p>
			</c:forEach>
    	</div>
   	</div>
	<div class="container">
		<div class="btn-group">
			<a href="#this" class="btn btn-primary" id="list" target="_self" ng-non-bindable>목록으로</a>
			<a href="#this" class="btn btn-primary" id="update" target="_self" ng-non-bindable>수정하기</a>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/common/sample/include-body.jsp" %>
</div>
