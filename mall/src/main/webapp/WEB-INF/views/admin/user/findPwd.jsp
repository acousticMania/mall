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
			$("#findPwd").on("click", function(e) {
				findPwd();
			});

			$("#form input").keypress(function (key) {
				if(key.keyCode == 13) {
					findPwd();
				}
			});
		});
		
		
		//아이디 찾기
		function findPwd(){
			
			if($("login_id").val() == "") {
				alert("아이디를 입력해주세요");
				$("#login_id").focus();
			} else if($("#email").val() == "") {
				alert("이메일을 입력해주세요");
				$("#email").focus();	
			} else if($("#answer").val() == "") {
				alert("답변을 입력해주세요");
				$("#answer").focus();
			}
			
			jQuery.ajax({
				url : "/admin/user/findPwd",
				type : "post",
				dataType : "json",
				data : {
					login_id : jQuery("#login_id").val(),
					email : jQuery("#email").val(),
					answer : jQuery("#answer").val()
				},
				success : function(data){
					if(data.result == "ok"){
						alert("메일로 발송하였습니다.");
						window.open("about:blank","_self").close();
					}else{
						alert("정보가 일치하지 않습니다.");
					}
				},
				error : function(){
					alert('ajax call error!');
				}
			});
		}
	
	</script>


</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">비밀번호 찾기</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="아이디" id="login_id" name="login_id" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="이메일" id="email" name="email" type="email">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="답" id="answer" name="answer" type="text">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <a href="#" class="btn btn-lg btn-success btn-block" id="findPwd">비밀번호찾기</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
