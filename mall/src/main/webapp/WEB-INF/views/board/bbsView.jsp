<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="daus" uri="/WEB-INF/tld/study.tld" %>
<div class="container">
    <script>
    function del(){
      if (confirm("삭제하시겠습니까?")) document.form.submit();
    }
    </script>
    
    <form id="form" name="form" method="post" action="./retrieveBoardDelete">
      <input type="hidden" id="idx" name="idx" value="${object.idx}" />
    </form>
    <div class="panel panel-success">
		    <div class="panel-heading">${object.subject}</div>    
		    <div class="panel-body">${object.content}</div>		    
		    <div class="panel-footer">
		    <p>작성자 : ${object.user_name}</p>
		    <p>등록일 : ${object.reg_datetime}</p>
		    </div>
    </div>
    <div class="container" style="text-align: right;">
	    <div class="btn-group" style="text-align:center;">
				<button type="button" class="btn btn-primary" onclick="del()">삭제</button>
				<button type="button" class="btn btn-primary" onclick="location.href='./retrieveBoardWrite/?idx=${object.idx}'">수정</button>
				<button type="button" class="btn btn-primary" onclick="location.href='./retrieveBoardList'">목록</button>
			</div>
		</div>
</div>