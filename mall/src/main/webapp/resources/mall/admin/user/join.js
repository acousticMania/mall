$(function(){ 
	$("#form").validate({ 
		onfocusout: true,
		rules: { // id , name 은 폼태그내에 존재하는 name명이다. 
					login_id : {required : true}, 
					user_name : {required : true}, 
					passwd : {required : true}, 
					passwd_check : {required : true, equalTo : "#passwd"}, 
					email : {required : true, email : true}, 
					question : {required : true}, 
					answer : {required : true}
				}, 
		messages: { 
					// id , name 은 폼태그내에 존재하는 name명이다. 
					// alert에 들어가는 문자내용 
					// 하지만 text로만 화면에 보여진다는 것! 
					login_id: {required: "아이디를 입력하세요"}, 
					user_name: {required: "이름을 입력하세요"},
					passwd: {required: "비밀번호를 입력하세요"},
					passwd_check: {required: "비밀번호 확인을 해주세요.",equalTo: "비밀번호와 다릅니다."},
					email: {required: "이메일을을 입력하세요", email : "이메일 형식이 잘못되었습니다."},
					question: {required: "질문을 입력하세요"},
					answer: {required: "답변을 입력하세요"}
					
				}, 
				//검증이 끝난후에 작업할 부분 (submit??) 
		submitHandler: function() { 
					
					if($("#dupChk").val() == "N"){
						alert("아이디 중복체크를 해주세요.");
						return;
					}
					
					var form = $("#form")[0];
					form.action = "/admin/user/insertUser";
					form.method = "post";
					form.submit();
					alert("가입이 완료되었습니다.!!");
				} 
	}); 
});


function insertUser() {
	
/*	$("#form").validate({ 
		onfocusout: false,
		rules: { // id , name 은 폼태그내에 존재하는 name명이다. 
					login_id : {required : true}, 
					user_name : {required : true}, 
					passwd : {required : true}, 
					passwd_check : {required : true}, 
					email : {required : true}, 
					question : {required : true}, 
					answer : {required : true} 
				}, 
		messages: { 
					// id , name 은 폼태그내에 존재하는 name명이다. 
					// alert에 들어가는 문자내용 
					// 하지만 text로만 화면에 보여진다는 것! 
					login_id: {required: "아이디를 입력하세요"}, 
					user_name: {required: "이름을 입력하세요"},
					passwd: {required: "비밀번호를 입력하세요"},
					passwd_check: {required: "비밀번호 확인을 해주세요."},
					email: {required: "이메일을을 입력하세요"},
					question: {required: "질문을 입력하세요"},
					answer: {required: "답을 입력하세요"}
				}, 
				//검증이 끝난후에 작업할 부분 (submit??) 
		submitHandler: function() { 
					alert("성공!!");
					var form = $("#form")[0];
					form.action = "<c:url value='/admin/user/insertUser' />";
					form.method = "post";
					form.submit();
				} 
	}) */
	
	/*alert(212)
	
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
		form.submit();*/
	
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