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
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	    <![endif]-->
	<!-- jQuery -->
    <script src="/js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    
	<script type="text/javascript">
		$(document).ready(function (){
			$("#join").on("click", function(e) {
				e.preventDefault();
				fn_validation();
// 				fn_exeLogin();
			});

			$("#form input").keypress(function (key) {
				if(key.keyCode == 13) {
					fn_validation();
				}
			});
		});
		
		function fn_exeLogin() {
			
			var form = $("#form")[0];
			form.action = "<c:url value='/admin/user/doLogin' />";
			form.method = "post";
			form.submit();
		}
		
		function fn_validation() {
			if($("LOGIN_ID").val() == "") {
				alert("아이디를 입력해주세요");
				$("#LOGIN_ID").focus();
			} else if($("#EMAIL").val() == "") {
				//다국어 적용할지 고민해봐야함 일단 한글적용 
				//by 명석
				alert("로그인 이메일를 입력해주세요");
				$("#EMAIL").focus();	
			} else if($("#PASSWD").val() == "") {
				alert("로그인 비밀번호를 입력해주세요");
				$("#PASSWD").focus();
				
			}
			
			var form = $("#form")[0];
// 			form.action = "<c:url value='/admin/main/main' />";
// 			form.action = "<c:url value='/admin/main/login' />";
			form.action = "<c:url value='/admin/user/insertUser' />";
// 			form.action = "<c:url value='/admin/main/dologin' />";
			form.method = "post";
			form.submit();
		}
		
			
		function addrPop(){
			var pop = window.open("/sample/jusoPopup","pop","width=570,height=420, scrollbars=yes"); //경로는
		}
		function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd,rnMgtSn, bdMgtSn){
			 //2017년 2월 제공항목이 확대되었습니다. 원하시는 항목을 추가하여 사용하시면 됩니다.
			document.form.addr1.value = roadAddrPart1;
			document.form.addr2.value = roadAddrPart2;
			document.form.zipocde.value = zipNo;
		}
		
		function idDupChk(){
			jQuery.ajax({
				url : "/user/ajaxDupIdChk",
				type : "post",
				dataType : "json",
				data : {
					
					LOGIN_ID : jQuery("#LOGIN_ID").val()
				},
				success : function(data){
					if(data.result >= 0){
						alert("중복된 로그인아이디 입니다.");
					}else{
						alert("사용가능한 아이디 이니다.");
					}
				},
				error : function(){
					//alert('ajax call error!');
				}
			});
		}
	
	</script>


</head>

<body>
	<input type="hidden" id ="pwCheck" name="pwCheck" value="${pwCheck }">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4" style="width: 650px;" >
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">회원가입</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                        	<table style="width: 600px; border-collapse: collapse; border-spacing: 0px;" >
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
                                <a href="#" class="btn btn-lg btn-success btn-block" id="join">회원가입</a>
                        </form>
                        <c:if test="${not empty param.fail}">
                        	<div>
                        		<font color="red">
                        			<label>Your login attemp was ont successful, try again.</label>
                        			<label>Reason : ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</label>
                        		</font>
                        		<c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
                        	</div>
                        </c:if>
                    </div>
                </div>
            </div>
        </div>
    </div>

   

</body>

</html>
