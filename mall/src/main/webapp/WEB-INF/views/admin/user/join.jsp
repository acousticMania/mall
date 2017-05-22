<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="12번가 쇼핑몰">
	<meta name="author" content="silrim_study">
	
	<title>12번가 쇼핑몰 관리자</title>
	
	<!-- Bootstrap Core CSS -->
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- Custom CSS -->
	<link href="/css/admin.css" rel="stylesheet">
	
	<!-- Custom Fonts -->
	<link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- favicon -->
	<link rel="shortcut icon" href="/resources/images/favicon.ico" />

	<!-- jQuery -->
	<link rel="stylesheet" href="/resources/js/validation/css/screen.css" />
    <script src="/js/jquery.js"></script>
	<script type="text/javascript" src="/resources/js/validation/jquery.validate.min.js"></script>
	
    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    
    <script src="/resources/mall/admin/user/join.js"></script>
</head>
<body>
<<<<<<< HEAD
	<input type="hidden" id ="pwCheck" name="pwCheck" value="${pwCheck }">
    <div class="container">
        <div class="row"> 
            <div class="col-md-4 col-md-offset-4">
=======
	<input type="hidden" id="dupChk" name="" value="N">
            <div class="col-md-4 col-md-offset-4" style="width: 650px; margin-top: 20px;" >
>>>>>>> refs/remotes/origin/develop-1.0
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">회원가입</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                        	<table style="width: 600px; border-collapse: collapse; border-spacing: 0px;" >
<<<<<<< HEAD
                        		<tr >
                        			<th style="width: 150px;  vertical-align: middle; min-height: 28px; font-weight: bold;">로그인 아이디</th>
                        			<td style="width: 450px;; padding: 10px;" ><input style="margin-right: 10px; width: 200px;" id="LOGIN_ID" name="LOGIN_ID" type="text" autofocus><input style="width: 80px;" type="button" id="findAddrFn" name="findAddrFn" onclick="idDupChk()" value="중복체크"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">사용자 이름</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="USER_NAME" name="USER_NAME" type="text"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="PASSWD" name="PASSWD" type="password"></td>	
                        		</tr>
                        		
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호 확인</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="PASSWD_CHECK" name="PASSWD_CHECK" type="password"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">주민등록번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="RES_NO" name="RES_NO" type="password"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이메일</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="EMAIL" name="EMAIL" type="text"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이동전화</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="CELLPHONE_NO" name="CELLPHONE_NO" type="number" min="7" max="11" ></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">질문</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="QUESTION" name="QUESTION" type="text"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">답</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="ANSWER" name="ANSWER" type="text"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">우편번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input style="margin-right: 10px; width: 100px;"  id="zipocde" name="zipocde" type="text"><input style="width: 40px;" type="button" id="findAddrFn" name="findAddrFn" onclick="addrPop()" value="주소찾기"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">주소</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="addr1" name="addr1" type="text"></td>	
                        		</tr>
                        		<tr >
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">상세주소</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="addr2" name="addr2" type="text"></td>	
                        		</tr>
                        	</table>
                                <!-- Change this to a button or input when using this as a form -->
                                <a href="#" class="btn btn-lg btn-success btn-block" id="join">join</a>
                            </fieldset>
=======
                        		<tr>
                        			<th style="width: 150px;  vertical-align: middle; min-height: 28px; font-weight: bold;">로그인 아이디</th>
                        			<td style="width: 450px;; padding: 10px;" ><input class="form-control" placeholder="아이디를 입력해주세요." style="margin-right: 10px; padding-left:10px; width: 180px;" id="login_id" name="login_id" type="text" onchange="chgLoginId()" autofocus><input style="width: 80px; margin-left: 10px;" type="button" id="findAddrFn" name="findAddrFn" onclick="idDupChk()" value="중복체크"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">사용자 이름</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="user_name" placeholder="이름을 입력해주세요." name="user_name" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" placeholder="비밀번호를 입력해주세요." id="passwd" name="passwd" type="password"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호 확인</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" placeholder="비밀번호를 다시한번 입력해주세요." id="passwd_check" name="passwd_check" type="password"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이메일</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" placeholder="이메일을 입력해주세요." id="email" name="email" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이동전화</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="cellphone_no" name="cellphone_no" placeholder="휴대폰 번호(-제외)" type="text" maxlength="11" ></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">질문</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" placeholder="질문을 입력해주세요." id="question" name="question" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">답</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" placeholder="답변을 입력해주세요." id="answer" name="answer" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">우편번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" style="margin-right: 10px; width: 100px;"  id="zipocde" name="zipocde" type="text"><input style="width: 60px; margin-left: 10px;" type="button" id="findAddrFn" name="findAddrFn" onclick="addrPop()" value="주소찾기"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">주소</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="addr1" name="addr1" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">상세주소</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="addr2" name="addr2" type="text"></td>	
                        		</tr>
                        	</table>
                                <input class="btn btn-lg btn-success btn-block" type="submit" id="join" value="회원가입">
>>>>>>> refs/remotes/origin/develop-1.0
                        </form>
                    </div>
                </div>
            </div>
</body>
</html>
