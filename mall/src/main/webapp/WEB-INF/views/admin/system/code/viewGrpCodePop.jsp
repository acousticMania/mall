<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<title>일반코드 추가</title>
	
	<!-- Bootstrap Core CSS -->
	<link href="/resources/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- Custom CSS -->
	<link href="/resources/css/admin.css" rel="stylesheet">
	
	<!-- Custom Fonts -->
	<link href="/resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- favicon -->
	<link rel="shortcut icon" href="/resources/images/favicon.ico" />
	
	<!-- jQuery -->
    <script src="/resources/js/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="/resources/js/validation/jquery.validate.min.js"></script>
	
	<script src="/resources/mall/admin/system/code/grpCodeList.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/resources/js/bootstrap.min.js"></script>
    
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">일반코드 추가</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                        	<input type="hidden" id="grp_cd" name="grp_cd" value="${codeInfo.grp_cd}">
                        	<input type="hidden" id="grp_cd_nm" name="grp_cd_nm" value="${codeInfo.grp_cd_nm}">
                        	<input type="hidden" id="description" name="description" value="${codeInfo.description}">
                        	<input type="hidden" id="use_yn" name="use_yn" value="${codeInfo.use_yn}">
                        	<input type="hidden" id="sys_type" name="sys_type" value="${codeInfo.sys_type}">
                            <table class="table">
                            	<tr>
                            		<td>시스템구분</td>
                            		<td>${codeInfo.sys_type}</td>
                            	</tr>
                            	<tr>
                            		<td style="width: 30%;">그룹코드</td>
                            		<td style="width: 70%;"><font style="font-weight: bold;">${codeInfo.grp_cd}</font></td>
                            	</tr>
                            	<tr>
                            		<td>그룹코드명</td>
                            		<td>${codeInfo.grp_cd_nm}</td>
                            	</tr>
                            	<tr>
                            		<td>설명</td>
                            		<td>${codeInfo.description}</td>
                            	</tr>
                            	<tr>
                            		<td>사용여부</td>
                            		<td><span style="margin-right: 10px;"><input type="radio" id="use_yn" name="use_yn"  disabled="disabled"  ${codeInfo.use_yn=="Y"?"checked='checked'":""} >사용</span><span><input type="radio" id="use_yn" name="use_yn" value="N" disabled="disabled" ${codeInfo.use_yn=="N"?"checked='checked'":""}>미사용</span></td>
                            	</tr>
                            </table>
                            <div title="버튼영역"  align="center">
					        	<span><input style="margin-right: 10px;" class="btn btn-lg btn-success" type="button" value="수정" id="edit" onclick="editGrpCodePop();" ></span><span><input class="btn btn-lg btn-success" style="margin-right: 10px;"  type="button" value="취소" onclick="closePop()"></span>
							</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
