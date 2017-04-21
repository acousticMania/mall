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
			$("#findId").on("click", function(e) {
				findId();
			});
		});
		
		/* function findId() {
			if($("USER_NAME").val() == "") {
				alert("이름을 입력해주세요");
				$("#USER_NAME").focus();
			} else if($("#EMAIL").val() == "") {
				alert("이메일을 입력해주세요");
				$("#EMAIL").focus();	
			}
			
			var form = $("#form")[0];
			form.action = "<c:url value='/admin/user/findId' />";
			form.method = "post";
			form.submit();
		} */
		
		//아이디 찾기
		function findId(){
			
			if($("USER_NAME").val() == "") {
				alert("이름을 입력해주세요");
				$("#USER_NAME").focus();
				return;
			} else if($("#EMAIL").val() == "") {
				alert("이메일을 입력해주세요");
				$("#EMAIL").focus();
				return;
			}
			
			jQuery.ajax({
				url : "/admin/user/findId",
				type : "post",
				dataType : "json",
				data : {
					user_name : jQuery("#user_name").val(),
					email : jQuery("#email").val()
				},
				success : function(data){
					if(data.result == "ok"){
						alert("메일로 발송하였습니다.");
						window.open("about:blank","_self").close();
					}else{
						alert("존재하는 아이디가 없습니다.");
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
                        <h3 class="panel-title">아이디 찾기</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="이름" id="user_name" name="user_name" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="이메일" id="email" name="email" type="email">
                                </div>
                                <a href="#" class="btn btn-lg btn-success btn-block" id="findId">아이디찾기</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
