

function fn_validation() {
			if($("#login_id").val() == "") {
				alert("로그인 아이디를 입력해주세요");
				$("#login_id").focus();	
			} else if($("#password").val() == "") {
				alert("로그인 비밀번호를 입력해주세요");
				$("#password").focus();
			}
			
			var form = $("#form")[0];
			form.action = "/j_spring_security_check";
			form.method = "post";
			form.submit();
		}
	