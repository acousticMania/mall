<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<title>그룹코드 추가</title>
	
	<!-- Bootstrap Core CSS -->
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- Custom CSS -->
	<link href="/css/admin.css" rel="stylesheet">
	
	<!-- Custom Fonts -->
	<link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- favicon -->
	<link rel="shortcut icon" href="/resources/images/favicon.ico" />
	
	<!-- jQuery -->
    <script src="/resources/js/jquery/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="/resources/js/validation/jquery.validate.min.js"></script>
	
	<script src="/resources/mall/admin/system/code/writeGrpCodePop.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">그룹코드 추가</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                            <table class="table">
                            	<tr>
                            		<td style="width: 30%;">시스템구분</td>
                            		<td style="width: 70%;">
                            			<select id="sys_type" name="sys_type">
                            				<c:forEach var="sys_type" items="${sys_type}">
												<option value="${sys_type.cd}" ${sys_type.cd==codeInfo.sys_type?"selected:'selected'":""} >${sys_type.cd_name}</option>
            								</c:forEach>
                            				
                            			</select> 
                            		</td>
                            	</tr>
                            	<tr>
                            		<td>그룹코드</td>
                            		<td><input style="width: 99%;" type="text" id="grp_cd" name="grp_cd" ${codeInfo.editMode=="add"?"":"disabled='disabled'"} value="${codeInfo.grp_cd}"></td>
                            	</tr>
                            	<tr>
                            		<td>그룹코드명</td>
                            		<td><input style="width: 99%;" type="text" id="grp_cd_nm" name="grp_cd_nm" value="${codeInfo.grp_cd_nm}"></td>
                            	</tr>
                            	<tr>
                            		<td>설명</td>
                            		<td><input style="width: 99%;" type="text" id="description" name="description" value="${codeInfo.description}"></td>
                            	</tr>
                            	<tr>
                            		<td>사용여부</td>
                            		<td><span style="margin-right: 10px;"><input type="radio" id="use_yn" name="use_yn" value="Y" ${codeInfo.use_yn=="Y"?"checked='checked'":""} checked="checked">사용</span><span><input type="radio" id="use_yn" name="use_yn" value="N" ${codeInfo.use_yn=="N"?"checked='checked'":""}>미사용</span></td>
                            	</tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div title="버튼영역"  align="center">
        	<span><input style='margin-right: 10px;' type="button" value="저장"   ${codeInfo.editMode=="add"?"onclick='addGrpCode();'":"onclick='editGrpCode();'"}   ></span><span><input style="margin-right: 10px;"  type="button" value="취소" onclick="closePop()"></span>
			
		</div>
    </div>
</body>
</html>
