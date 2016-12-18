<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="container">
  <h1>${message}</h1>
	<form id="form" method="post" action="/write_ok">
	<input type="hidden" name="idx" id="idx" value="${object.idx}" />

	<div class="panel panel-success">
	  <div class="panel-body">
		<span>제목</span>
		<input type="text" id="subject" name="subject" class="form-control"  value="${object.subject}" />
		</div>
		<div class="panel-body">
		<span>작성자</span>
		<input type="text" id="user_name" name="user_name" class="form-control"  value="${object.user_name}" />
		</div>
		<div class="panel-body">
		<span>내용</span>
		<textarea id="content" name="content" class="form-control"  rows="10" cols="20">${object.content}</textarea>
		</div>
	</div>
	<div class="container" style="text-align: right;">
		<div class="btn-group" >
		     <button type="submit" class="btn btn-primary">완료</button>
		     <button type="button" class="btn btn-primary" onclick="location.href='/retrieveBoardList'">목록</button>
		</div>
	</div>
	</form>
</div>