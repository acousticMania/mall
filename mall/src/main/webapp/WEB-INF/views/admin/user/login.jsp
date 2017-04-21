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
    <script src="/js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    
	<script type="text/javascript">
		$(document).ready(function (){
			$("#login").on("click", function(e) {
				e.preventDefault();
				fn_validation();
			});

			$("#form input").keypress(function (key) {
				if(key.keyCode == 13) {
					fn_validation();
				}
			});
			
			var height = 500;
			var width = 400;
			var top = (screen.availHeight - height) / 2;
		    var left = (screen.availWidth - width) / 2;	
			
			$("#join").attr("href", "<c:url value='/admin/user/doJoin' />");
			$("#findId").on("click", function(e) {
				window.open("/admin/user/findIdView","findIdView","width="+width+",height="+height+",left="+left+",top="+top);
			});
			$("#findPwd").on("click", function(e) {
				window.open("/admin/user/findPwdView","findPwdView","width="+width+",height="+height+",left="+left+",top="+top);
			});
			
		});
		
		function fn_validation() {
			if($("#login_id").val() == "") {
				alert("로그인 아이디를 입력해주세요");
				$("#login_id").focus();	
			} else if($("#password").val() == "") {
				alert("로그인 비밀번호를 입력해주세요");
				$("#password").focus();
				
			}
			
			var form = $("#form")[0];
			form.action = "<c:url value='/j_spring_security_check' />";
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
                        <h3 class="panel-title"><img class="img-thumbnail" width="80px" src="/images/logo.png" alt="" ></h3>
                        <a href="#" id="join">회원가입</a>&nbsp;/&nbsp;<a href="#" id="findId">아이디 찾기</a>&nbsp;/&nbsp;<a href="#" id="findPwd">비밀번호 찾기</a>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                            <fieldset>
                            <!-- 추후에 회원가입 로직 완료 시 LOGIN_ID로 변경 -->
                                <div class="form-group">
                                    <input class="form-control" placeholder="login_id" id="login_id" name="login_id" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" id="password" name="password" type="password">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me">저장하기
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <a href="#" class="btn btn-lg btn-success btn-block" id="login">로그인</a>
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
