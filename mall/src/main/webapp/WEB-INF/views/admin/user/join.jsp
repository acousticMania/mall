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
			$("#join").on("click", function(e) {
				insertUser();
			});
		});
		
		function insertUser() {
			
			if($("#login_id").val() == "") {
				alert("아이디를 입력해주세요");
				$("#login_id").focus();
				return;
			}else if($("#passwd").val() == "") {
				alert("로그인 비밀번호를 입력해주세요");
				$("#passwd").focus();
				return;
			}else if($("#user_name").val() == "") {
				alert("사용자명을 입력해주세요");
				$("#user_name").focus();
				return;
			}else if($("#email").val() == "") {
				alert("이메일을 입력해주세요");
				$("#email").focus();
				return;
			}
			
			if($("#dupChk").val() == "N"){
				alert("아이디 중복체크를 해주세요.");
				return;
			}
			
			if($("#res_no").val().length < 13){
				alert("주민등록번호를 정확히 입력해주세요.");
				$("#res_no").focus();
				return;
			}
			
			if($("#res_no").val().length < 13){
				alert("주민등록번호를 정확히 입력해주세요.");
				$("#res_no").focus();
				return;
			}
			
			if($("#passwd").val() != $("#passwd_check").val()){
				alert("비밀번호가 다릅니다.");
				return;
			}
			
			var form = $("#form")[0];
			form.action = "<c:url value='/admin/user/insertUser' />";
			form.method = "post";
			form.submit();
			
		}
		
		
		//주소입력 팝업
		function addrPop(){
			var pop = window.open("/sample/jusoPopup","pop","width=570,height=420, scrollbars=yes"); //경로는
		}
		
		//주소입력 콜백함수
		function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd,rnMgtSn, bdMgtSn){
			 //2017년 2월 제공항목이 확대되었습니다. 원하시는 항목을 추가하여 사용하시면 됩니다.
			document.form.addr1.value = roadAddrPart1;
			document.form.addr2.value = addrDetail;
			document.form.zipocde.value = zipNo;
		}
		
		//로그인아이디 중복체크
		function idDupChk(){
			jQuery.ajax({
				url : "/user/ajaxDupIdChk",
				type : "post",
				dataType : "json",
				data : {
					
					login_id : jQuery("#login_id").val()
				},
				success : function(data){
					if(data.result > 0){
						alert("중복된 로그인아이디 입니다.");
					}else{
						alert("사용가능한 아이디 이니다.");
						$("#dupChk").val("Y");
					}
				},
				error : function(){
					alert('ajax call error!');
				}
			});
		}
		
		function chgLoginId(){
			$("#dupChk").val("N");
		}
	
	</script>
</head>
<body>
	<input type="hidden" id="dupChk" name="" value="N">
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
                        		<tr>
                        			<th style="width: 150px;  vertical-align: middle; min-height: 28px; font-weight: bold;">로그인 아이디</th>
                        			<td style="width: 450px;; padding: 10px;" ><input style="margin-right: 10px; width: 200px;" id="login_id" name="login_id" type="text" onchange="chgLoginId()" autofocus><input style="width: 80px;" type="button" id="findAddrFn" name="findAddrFn" onclick="idDupChk()" value="중복체크"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">사용자 이름</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="user_name" name="user_name" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="passwd" name="passwd" type="password"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">비밀번호 확인</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="passwd_check" name="passwd_check" type="password"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">주민등록번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="res_no" name="res_no" type="text" maxlength="13"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이메일</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="email" name="email" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">이동전화</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="cellphone_no" name="cellphone_no" type="text" maxlength="11" ></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">질문</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="question" name="question" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">답</th>
                        			<td style="width: 450px;; padding: 10px;"><input class="form-control" id="answer" name="answer" type="text"></td>	
                        		</tr>
                        		<tr>
                        			<th style="width: 150px; vertical-align: middle; min-height: 28px; font-weight: bold;">우편번호</th>
                        			<td style="width: 450px;; padding: 10px;"><input style="margin-right: 10px; width: 100px;"  id="zipocde" name="zipocde" type="text"><input style="width: 40px;" type="button" id="findAddrFn" name="findAddrFn" onclick="addrPop()" value="주소찾기"></td>	
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
                                <a href="#" class="btn btn-lg btn-success btn-block" id="join">회원가입</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
