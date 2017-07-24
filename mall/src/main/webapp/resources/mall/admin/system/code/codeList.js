
var height = 600;
var width = 500;
var top = (screen.availHeight - height) / 2;
var left = (screen.availWidth - width) / 2;	

// 화면 로딩시 실행function
function init(){
	

		$("#grpCdTable").jqGrid({
			// data를 가져올 url
			url : "/admin/system/selectGrpCodeList",
	        datatype: "json",
	        //그리드 높이
	        height: 250,
	        jsonReader:{
				page: "page", 
				root: "grpCodeList",			// 리스트 파라미터, 컨트롤러에서 넘어옴
				total: "TOTAL_PAGE",	// 총 페이지 수, 컨트롤러에서 넘어옴
				records: "TOTAL",		// 총 레코드 수, 컨트롤러에서 넘어옴
//	 			repeatitems: true, 		//
//	 			cell: "cell", 
				id: "grp_cd",			// unique column
	        },
	        //컬럼명들
	        colNames:['그룹코드', '그룹코드명', '사용여부', '시스템구분'],
	        //컬럼모델
	        colModel:[
	            {name:'grp_cd'},
	            {name:'name'},
	            {name:'use_yn'},
	            {name:'sys_type'}
	        ],
	        viewrecords:true,
	        caption:'그룹코드', // 그리드 왼쪽 위에 캡션
	        // rownumWidth:40,//말그대로 로우넘의 가로길이
	        rowNum:10,// 그리드에 보여줄 데이터의 갯수,-1하면 무한으로 보여준단다..
	        rowList:[10,20,30],//몇개식 보여줄건지 선택가능하다, 배열형식이라 5,10,15,20,,,가능
	        // width:1600,//그리드의 총 가로길이
			rownumbers: true,  //행 순번 
	        multiboxonly : true,
//	  		loadonce:true,//페이지를 넘길 수 있음
			mtype : "POST", //데이터 요청방식 post
	        multiselect : false,//체크박스 사라짐
	        cellEdit : true,//셀의 값변경을 정함 트루하면 바껴짐
	        pager : '#grpPager',// 밑에 페이저 달 div 아이디
	        emptyrecords : "Nothing to display",
//	         sortname : 'ORD_NO',
//	         sortorder : 'DESC',
	        gridview : true, // 속도 향상, 대신 treeGrid, subGrid, or the afterInsertRow 옵션 사용 불가
	        afterSaveCell : function(rowid,name,val,iRow,ICol){ // 로우 데이터 변경하고 엔터치거나 다른 셀 클릭했을때 발동
	            alert(rowid+val+name);
	        },
	        onCellSelect: function (rowId, index, contents, event){
	        	var cm = $(this).jqGrid	('getGridParam','colModel');
	        	if(cm[index].name = "grp_cd"){
	        		listCode($("#grpCdTable").jqGrid('getRowData', rowId).grp_cd);
	        		
	        	}
	        },
	    });
		
		resizeJqGridWidth('grpCdTable', 'grp_cd_div', $('#grp_cd_div').width(), true);
		
}

//일반코드 조회
function listCode(grp_cd){
	
	$.jgrid.gridUnload('#cdTable');
	$("#cdListBtn").show();
	$("#grp_cd").val(grp_cd);
	$("#cdTable").jqGrid({
		// data를 가져올 url
		url : "/admin/system/selectCodeList",
        datatype: "json",
        //그리드 높이
        height: 250,
        postData  : {
        	grp_cd : grp_cd
        },
        jsonReader:{
			page: "page", 
			root: "codeList",			// 리스트 파라미터, 컨트롤러에서 넘어옴
			total: "TOTAL_PAGE",	// 총 페이지 수, 컨트롤러에서 넘어옴
			records: "TOTAL",		// 총 레코드 수, 컨트롤러에서 넘어옴
// 			repeatitems: true, 		//
// 			cell: "cell", 
			id: "cd",			// unique column
        },
        //컬럼명들
        colNames:['코드', '코드명', '사용여부','그룹코드'],
        //컬럼모델
        colModel:[
            {name:'cd'},
            {name:'cd_name'},
            {name:'use_yn'},
            {name:'grp_cd',hidden : true}
        ],
        viewrecords:true,
        caption:'일반코드', // 그리드 왼쪽 위에 캡션
        // rownumWidth:40,//말그대로 로우넘의 가로길이
        rowNum:10,// 그리드에 보여줄 데이터의 갯수,-1하면 무한으로 보여준단다..
        rowList:[10,20,30],//몇개식 보여줄건지 선택가능하다, 배열형식이라 5,10,15,20,,,가능
        // width:1600,//그리드의 총 가로길이
		rownumbers: true,  //행 순번 
        multiboxonly : true,
//  		loadonce:true,//페이지를 넘길 수 있음
		mtype : "POST", //데이터 요청방식 post
        multiselect : false,//체크박스 사라짐
        cellEdit : true,//셀의 값변경을 정함 트루하면 바껴짐
        pager : '#cdPager',// 밑에 페이저 달 div 아이디
        emptyrecords : "Nothing to display",
//         sortname : 'ORD_NO',
//         sortorder : 'DESC',
        gridview : true, // 속도 향상, 대신 treeGrid, subGrid, or the afterInsertRow 옵션 사용 불가
        afterSaveCell : function(rowid,name,val,iRow,ICol){ // 로우 데이터 변경하고 엔터치거나 다른 셀 클릭했을때 발동
            alert(rowid+val+name);
        },
        onCellSelect: function (rowId, index, contents, event){
        	var cm = $(this).jqGrid	('getGridParam','colModel');
        	if(cm[index].name = "cd"){
        		viewCode($("#cdTable").jqGrid('getRowData', rowId).cd,$("#cdTable").jqGrid('getRowData', rowId).grp_cd);
        		
        	}
        },
    });
	
	resizeJqGridWidth('cdTable', 'cd_div', $('#cd_div').width(), true);
	
}

//일반코드 상세보기
function viewCode(cd,grp_cd){
	
	var url = "/admin/system/code/viewCodePop?";
	
	var params = {
			grp_cd : grp_cd,
			cd : cd
		
	};
	url += jQuery.param(params); 
	
	window.open(url,"viewCode","width="+width+",height="+height+",left="+left+",top="+top);
}


//일반코드 추가 팝업
function writeCodePop(){
	
	var url = "/admin/system/code/writeCodePop?";
	
	var params = {
		grp_cd : jQuery("#grp_cd").val(),
		editMode : "add"
		
	};
	url += jQuery.param(params); 
	
	window.open(url,"writeCodePop","width="+width+",height="+height+",left="+left+",top="+top);
	
}

//수정화면 이동
function editCodePop(){
	var form = $("#form")[0];
	form.action = "/admin/system/code/writeCodePop";
	form.method = "post";
	form.submit();
}


//그룹코드 추가
function addCode(){
	
	if($('#form').valid() == false){
		alert("필수값을 입력해 주세요.")
		return;
	}
	
	jQuery.ajax({
		url : "/admin/system/code/insertCode",
		type : "post",
		dataType : "json",
		async:false,
		data : {
			grp_cd : $("#grp_cd").val(),
			cd : $("#cd").val(),
			cd_name : $("#cd_name").val(),
			description : $("#description").val(),
			use_yn : $(":input:radio[name=use_yn]:checked").val()
		},
		success : function(data){
			
			$("#"+data.codeList[0].grp_cd+" td",opener.document)[1].click({ grp_cd : data.codeList[0].grp_cd });
			
			window.close();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
}

//일반코드 수정 
function editCode(){
	
	//필수값 체크
	if($('#form').valid() == false){
		alert("필수값을 입력해 주세요.")
		return;
	}
	
	jQuery.ajax({
		url : "/admin/system/code/updateCode",
		type : "post",
		dataType : "json",
		data : {
			grp_cd : $("#grp_cd").val(),
			cd : $("#cd").val(),
			cd_name : $("#cd_name").val(),
			description : $("#description").val(),
			use_yn : $(":input:radio[name=use_yn]:checked").val(),
			cd_sys_id : $("#cd_sys_id").val()
		},
		success : function(data){
			
			$("#"+data.codeList[0].grp_cd+" td",opener.document)[1].click({ grp_cd : data.codeList[0].grp_cd });
			
			window.close();
		},
		error : function(){
			alert('ajax call error!');
		}
	});
	
}

/*
* @param string grid_id 사이즈를 변경할 그리드의 아이디
* @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
* @param string width 그리드의 초기화 width 사이즈
 * @param boolean tf 그리드의 리사이즈 여부(true/false)
*/
function resizeJqGridWidth(grid_id, div_id, width, tf){

   	// window에 resize 이벤트를 바인딩 한다. 
   	$(window).bind('resize', function() {

		var resizeWidth = $('#' + div_id).width()-33; //jQuery-ui의 padding 설정 및 border-width값때문에 넘치는 걸 빼줌.

       	// 그리드의 width 초기화
       	$('#' + grid_id).setGridWidth( resizeWidth, tf);

       	// 그리드의 width를 div 에 맞춰서 적용
       	$('#' + grid_id).setGridWidth( resizeWidth , tf); //Resized to new width as per window. 

    }).trigger('resize');
}


//취소
function closePop(){
	window.close();
}
