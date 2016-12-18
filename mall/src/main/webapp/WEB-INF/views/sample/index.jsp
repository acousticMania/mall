<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<div class="container">
	<h1>
		Hello world!  
	</h1>
	
	<P>  The time on the server is ${serverTime}. </P>
	<p><button type="button" class="btn btn-success btn-lg" onclick="location.href='/admin/main/login'">admin Go</button></p>
	<p><button type="button" class="btn btn-warning btn-lg" onclick="location.href='/sample'">sample Go!!!</button></p>
</div>
