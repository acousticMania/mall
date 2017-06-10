
$(document).ready(function() {
	$("#form").validate({ 
		rules: { // id , name 은 폼태그내에 존재하는 name명이다. 
					grp_cd : {required : true}, 
					grp_cd_nm : {required : true} 
					
				}, 
		messages: { 
					grp_cd: {required: "그룹코드를 입력하세요"}, 
					grp_cd_nm: {required: "그룹코드명을 입력하세요"}
				}
	}); 
});

//그룹코드 추가
function addGrpCode(){
	
	if($('#form').valid() == false){
		alert("필수값을 입력해 주세요.")
		return;
	}
	
	jQuery.ajax({
		url : "/admin/system/code/ajaxAddGrpCode",
		type : "post",
		dataType : "json",
		data : {
			grp_cd : $("#grp_cd").val(),
			sys_type : $("#sys_type").val(),
			grp_cd_nm : $("#grp_cd_nm").val(),
			description : $("#description").val(),
			use_yn : $(":input:radio[name=use_yn]:checked").val()
		},
		success : function(data){
			
			$("#onsearch",opener.document).click();
			
			window.close();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
}

//그룹코드 수정 
function editGrpCode(){
	
	if($('#form').valid() == false){
		alert("필수값을 입력해 주세요.")
		return;
	}
	
	jQuery.ajax({
		url : "/admin/system/code/ajaxEditGrpCode",
		type : "post",
		dataType : "json",
		data : {
			grp_cd : $("#grp_cd").val(),
			sys_type : $("#sys_type").val(),
			grp_cd_nm : $("#grp_cd_nm").val(),
			description : $("#description").val(),
			use_yn : $(":input:radio[name=use_yn]:checked").val()
		},
		success : function(data){
			
			$("#onsearch",opener.document).click();
			
			window.close();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
	
}



//취소
function closePop(){
	window.close();
}