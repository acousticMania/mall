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