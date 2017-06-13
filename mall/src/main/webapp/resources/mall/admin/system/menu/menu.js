Ext.onReady(function(){

		// 팝업 위치조정
	    var layerpop = $("#layerpop");
	    layerpop.offset({top:200});

	    // validation 체크
	    $('#addForm').validate({
	        rules: {
	            menu_id: { required: true},
	            menu_name: { required: true }
	        },
	        messages: {
	        	menu_id: { required: "코드를 입력하시오." },
	        	menu_name: { required: "코드명을 다시 확인하세요." }
	        }
	    });

	    //트리생성 시작
	    var store =  Ext.create('Ext.data.TreeStore',{
			 root : {
				    text: '메뉴관리',
				    expanded: true,
				    //added
				    id : '*'
			 },
			 proxy: {
		        type: 'ajax',
		        //json file url change
		        url: '/admin/system/menu/selectMenuTree',
		        reader: {
		        	
		            type: 'json',
		            root: 'children'
		        }
	    	}
		});
	
		Ext.create('Ext.tree.Panel', {
		    title: 'Simple Tree',
		    width: 500,
		    height: 600,
		    x : 300,
		    y : -820,
		    store: store,
		    rootVisible: true,
		    renderTo: Ext.getBody(),
		    listeners: {
		        itemclick: function(view,record,item,index,e) {
		        		if(index > 0){
		                var jsonData = $.parseJSON(record.data.result);
		                var leaf = record.data.leaf; //하위노드 있으면 false
		                $("#btnButtomDiv").show();
		                $("#btnTopDiv").show();
		                $("#menuDiv").show();
		                $("#form").html("");
		                $("#up_tree_id").val(jsonData.tree_id);
		                var use_y = "";
		                var use_n = "";
		                var menu_kind_left = "";
		                var menu_kind_top = "";
		                if(jsonData.use_yn=="Y"){
		                	use_y = "checked='checked'";
		                }else{
		                	use_n = "checked='checked'";
		                }
		                if(jsonData.menu_kind=="TOP"){
		                	menu_kind_top = "checked='checked'";
		                }else{
		                	menu_kind_left = "checked='checked'";
		                }
		                var headerHtml ="";
		                headerHtml += "<table class='table'>";
		                headerHtml += "<input type='hidden' id='up_tree_id' name='up_tree_id' value='"+jsonData.tree_id+"'>"
		                headerHtml += "<input type='hidden' id='menu_id' name='menu_id' value='"+jsonData.menu_id+"'>"
		                headerHtml += "<input type='hidden' id='leaf' name='leaf' value='"+leaf+"'>"
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>메뉴아이디</th>";
						headerHtml += "<th width='400' height='27px;'>"+jsonData.menu_id+"</th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>메뉴명</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='menu_name' name='menu_name' value='"+jsonData.menu_name+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>순번</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='sort_no' name='sort_no' value='"+jsonData.sort_no+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>DEPTH</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='sort_no' name='sort_no' disabled=disabled value='"+jsonData.depth+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>액션URL</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='action_url' name='action_url' value='"+jsonData.action_url+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>메뉴타입</th>";
						headerHtml += "<th width='400' height='27px;'><span style='margin-right: 10px;'><input type='radio' id='menu_kind' name='menu_kind' value='LEFT'  "+menu_kind_left+">좌측메뉴</span><span><input type='radio' id='menu_kind' name='menu_kind' value='TOP' "+menu_kind_top+" >탑메뉴</span></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>사용여부</th>";
						headerHtml += "<th width='400' height='27px;'><span style='margin-right: 10px;'><input type='radio' id='use_yn' name='use_yn' value='Y'  "+use_y+">사용</span><span><input type='radio' id='use_yn' name='use_yn' value='N' "+use_n+" >미사용</span></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>설명</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='description' name='description' value='"+jsonData.description+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr style='display:none;' >";
						headerHtml += "<th width='200' height='27px;'>디폴트메뉴</th>";
						headerHtml += "<th width='400' height='27px;'><select id='default_menu_id' name='default_menu_id'><option value='1'></option</select></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>기타파라미터1</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='etc_param1' name='etc_param1' value='"+jsonData.etc_param1+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>기타파라미터2</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='etc_param2' name='etc_param2' value='"+jsonData.etc_param2+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "<tr>";
						headerHtml += "<th width='200' height='27px;'>기타파라미터3</th>";
						headerHtml += "<th width='400' height='27px;'><input type='text' class='form-control' id='etc_param3' name='etc_param3' value='"+jsonData.etc_param3+"'></th>";
						headerHtml += "</tr>";
						headerHtml += "</table>";
						
		                $("#form").html(headerHtml);
		                
		        		}else{
		        			$("#btnTopDiv").show();
		        			$("#menuDiv").show();
		        			$("#form").html("");
			                var headerHtml ="";
							headerHtml += "<input type='hidden' id='up_tree_id' name='up_tree_id' value='*'>";
							$("#form").html(headerHtml);
		        		}
		        }
		    }
		});
		
		//트리생성 끝
	
	}); 
	
/**
 * 메뉴추가
 */
function addMenu(){
	
	//validation 체크
	if($('#addForm').valid() == false){
		alert("필수값을 입력해 주세요.");
		return;
	}
	
	//menuId 중복체크
	if(!checkValidationMenuId()){
		alert("메뉴아이디가 존재합니다.");
		return;
	}
	
	
	 jQuery.ajax({
		url : "/admin/system/menu/insertMenu",
		type : "post",
		dataType : "json",
		async:false,
		data : {
			menu_id : $('form[name="addForm"]').find("#menu_id").val(),
			menu_name : $('form[name="addForm"]').find("#menu_name").val(),
			sort_no : $('form[name="addForm"]').find("#sort_no").val(),
			description : $('form[name="addForm"]').find("#description").val(),
			use_yn : $('form[name="addForm"]').find(":input:radio[name=use_yn]:checked").val(),
			menu_kind : $('form[name="addForm"]').find(":input:radio[name=menu_kind]:checked").val(),
			up_tree_id :  $("#up_tree_id").val(),
			action_url : $('form[name="addForm"]').find("#action_url").val(),
			etc_param1 : $('form[name="addForm"]').find("#etc_param1").val(),
			etc_param2 : $('form[name="addForm"]').find("#etc_param2").val(),
			etc_param3 : $('form[name="addForm"]').find("#etc_param3").val()
			
		},
		success : function(data){
			Ext.ComponentQuery.query('treepanel')[0].getStore().reload();
			$(".modal").find("input").val('').end();	
			$(".modal").modal("hide");
			alert("메뉴가 추가되었습니다.")
		},
		error : function(){
			alert('ajax call error!');
		}
	}); 
}

/**
 * 메뉴수정
 */
function editMenu(){
	jQuery.ajax({
		url : "/admin/system/menu/updateMenu",
		type : "post",
		dataType : "json",
		async:false,
		data : {
			menu_id : $("#menu_id").val(),
			menu_name : $("#menu_name").val(),
			description : $("#description").val(),
			use_yn : $(":input:radio[name=use_yn]:checked").val(),
			menu_kind : $(":input:radio[name=menu_kind]:checked").val(),
			sort_no : $("#sort_no").val(),
			action_url : $("#action_url").val(),
			etc_param1 : $("#etc_param1").val(),
			etc_param2 : $("#etc_param2").val(),
			etc_param3 : $("#etc_param3").val()
		},
		success : function(data){
           alert("저장되었습니다.")
           Ext.ComponentQuery.query('treepanel')[0].getStore().reload();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
	
}

/**
 * modal창 닫기
 */
function closePop(){
	$(".modal").find("input").val('').end();//modal창 데이터 초기화	
	$(".modal").modal("hide");//modal창 닫기
}


/**
 * menuId validation 체크
 *
*/
function checkValidationMenuId(){
	var validateResult;
	jQuery.ajax({
		url : "/admin/system/menu/checkValidationMenuId",
		type : "post",
		dataType : "json",
		async:false,
		data : {
			menu_id : $('form[name="addForm"]').find("#menu_id").val()
		},
		success : function(data){
          validateResult =  data.validateMenuId;
		},
		error : function(){
			alert('ajax call error!');
		}
	});
	
	return validateResult;
}

/**
 * 메뉴삭제
*/


function deleteMenu(){
	
	if($("#menu_id").val() =="" || $("#menu_id").val() == undefined){
		alert("메뉴를 선택해주세요.");
		return;
	}
	if($("#leaf").val()=="true"){
		if(!confirm("삭제하시 겠습니까?")){
			return;
		}
	}else{
		if(!confirm("하위메뉴가 존재하여 하위메뉴까지 모두 삭제됩니다.\n삭제하시 겠습니까?")){
			return;
		}
	}
	
	
	jQuery.ajax({
		url : "/admin/system/menu/deleteMenu",
		type : "post",
		dataType : "json",
		async:false,
		data : {
			menu_id : $("#menu_id").val()
		},
		success : function(data){
           alert("메뉴가 삭제되었습니다.");
           $("#form").html("");
           var headerHtml ="";
			headerHtml += "<input type='hidden' id='up_tree_id' name='up_tree_id' value='*'>";
			$("#form").html(headerHtml);
           Ext.ComponentQuery.query('treepanel')[0].getStore().reload();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
}