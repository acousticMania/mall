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