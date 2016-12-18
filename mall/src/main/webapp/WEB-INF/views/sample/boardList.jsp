<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %>
<script type="text/javascript">
	$(document).ready(function(){
		// 부트스트랩
		$(":file").filestyle({classButton: "btn btn-primary"});
		
		
	    $("#write").on("click", function(e){ //글쓰기 버튼
	        e.preventDefault();
	        fn_openBoardWrite();
	    }); 
	     
	    $("a[name='title']").on("click", function(e){ //제목 
	        e.preventDefault();
	        fn_openBoardDetail($(this));
	    });
	    
	    $("#excelUpload").on("click", function(e){
	    	e.preventDefault();
	    	fn_excelFileUpload();
	    });
	    
	    $("#excelDownload").on("click", function(e){
	    	e.preventDefault();
	    	fn_excelFileDownload();
	    });
	});
	
	function fn_openBoardWrite(){
        var comSubmit = new ComSubmit();
        comSubmit.setUrl("<c:url value='/sample/openBoardWrite' />");
        comSubmit.submit();
    }
     
    function fn_openBoardDetail(obj){
        var comSubmit = new ComSubmit();
        comSubmit.setUrl("<c:url value='/sample/openBoardDetail' />");
        comSubmit.addParam("BOARD_IDX", obj.parent().find("#BOARD_IDX").val());
        comSubmit.submit();
    }
    
    function fn_excelFileUpload(){
    	$('#excelForm').attr({action:'/sample/excelFileUpload', method:'post'}).submit();
    }
    
    function fn_excelFileDownload() {
    	var comSubmit = new ComSubmit();
    	comSubmit.setUrl("<c:url value='/download.xls' />");
    	comSubmit.submit();
    }
    
    
</script>
</head>
<div class="container">
	<div class="page-header" >
		<p class="h3">게시판 목록</p>
	</div>
	<div class="table-responsive">
		<table class="table">
		    <colgroup>
		        <col width="10%"/>
		        <col width="*"/>
		        <col width="15%"/>
		        <col width="20%"/>
		    </colgroup>
		    <thead>
		        <tr>
		            <th scope="col">글번호</th>
		            <th scope="col">제목</th>
		            <th scope="col">조회수</th>
		            <th scope="col">작성일</th>
		        </tr>
		    </thead>
		    <tbody>
		        <c:choose>
		            <c:when test="${fn:length(list) > 0}">
		                <c:forEach items="${list }" var="row">
		                    <tr>
		                        <td>${row.BOARD_IDX }</td>
		                        <td class="title">
		                        	<a href="#this" name="title">${row.TITLE }</a>
		                        	<input type="hidden" id="BOARD_IDX" value="${row.BOARD_IDX}">
		                       	</td>
		                        <td>${row.HIT_CNT }</td>
		                        <td>${row.REG_DATE }</td>
		                    </tr>
		                </c:forEach>
		            </c:when>
		            <c:otherwise>
		                <tr>
		                    <td colspan="4">조회된 결과가 없습니다.</td>
		                </tr>
		            </c:otherwise>
		        </c:choose>
		    </tbody>
		</table>
	</div>
	<br/>
	<div class="page-footer">
		<div style="float: left; margin: 0 auto;">
			<a href="#this" id="write" class="btn btn-success">글쓰기</a>
		</div>
		<div style="float: right; margin: 0 auto;">
			<button type="button" class="btn btn-warning" data-target="#layerpop" data-toggle="modal" >excel 업로드</button>
			<button id="excelDownload" type="button" class="btn btn-danger">excel 다운로드</button>
		</div>
	</div>
</div>

<!-- 모달팝업 -->
<div class="modal fade" id="layerpop" >
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- header -->
      <div class="modal-header">
        <!-- 닫기(x) 버튼 -->
        <button type="button" class="close" data-dismiss="modal">×</button>
        <!-- header title -->
        <h4 class="modal-title">엑셀업로드</h4>
      </div>
      <!-- body -->
      <div class="modal-body">
      	<form id="excelForm" name="excelForm" enctype="multipart/form-data">
	      	<div class="form-group">
	      		<input name="file" type="file" class="filestyle" data-classButton="btn btn-primary">
	      	</div>
      	</form>
      </div>
      <!-- Footer -->
      <div class="modal-footer">
        <button id="excelUpload" type="button" class="btn btn-default">업로드</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>
<!-- //모달팝업 -->
<%@ include file="/WEB-INF/views/common/sample/include-body.jsp" %>
