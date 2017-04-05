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
			if($("USER_ID").val() == "") {
				alert("아이디를 입력해주세요");
				$("#USER_ID").focus();
			} else if($("#EMAIL").val() == "") {
				//다국어 적용할지 고민해봐야함 일단 한글적용 
				//by 명석
				alert("로그인 이메일를 입력해주세요");
				$("#EMAIL").focus();	
			} else if($("#USER_PWD").val() == "") {
				alert("로그인 비밀번호를 입력해주세요");
				$("#USER_PWD").focus();
				
			}
			
			var form = $("#form")[0];
// 			form.action = "<c:url value='/admin/main/main' />";
// 			form.action = "<c:url value='/admin/main/login' />";
			form.action = "<c:url value='/admin/user/insertUser' />";
// 			form.action = "<c:url value='/admin/main/dologin' />";
			form.method = "post";
			form.submit();
		}
		
			
	
	</script>


</head>

<body>
	<input type="hidden" id ="pwCheck" name="pwCheck" value="${pwCheck }">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">회원가입</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="ID" id="USER_ID" name="USER_ID" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" id="EMAIL" name="EMAIL" type="email">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" id="USER_PWD" name="USER_PWD" type="password">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <a href="#" class="btn btn-lg btn-success btn-block" id="join">join</a>
                            </fieldset>
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
