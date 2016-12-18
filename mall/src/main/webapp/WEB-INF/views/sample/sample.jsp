<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<div class="container">
	<h1>
		Hello world!  
	</h1>
	
	<P>  The time on the server is ${serverTime}. </P>
	<p><button type="button" class="btn btn-danger" onclick="location.href='./retrieveBoardList'">게시판 Go!!!</button></p>
	<p><button type="button" class="btn btn-success" onclick="location.href='./retrieveNgBoardList'">앵귤러 게시판 Go!!!</button></p>
	<p><button type="button" class="btn btn-warning" onclick="location.href='./sample/openBoardList'">jQuery 게시판 Go!!!</button></p>
</div>
