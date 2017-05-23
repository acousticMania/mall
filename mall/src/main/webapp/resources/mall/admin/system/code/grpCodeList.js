
var height = 600;
var width = 500;
var top = (screen.availHeight - height) / 2;
var left = (screen.availWidth - width) / 2;	

//그룹코드 추가 화면
function writeGrpCode(){
	
	var url = "/admin/system/code/writeGrpCode?";
	
	var params = {
		editMode : "add" //에디터 모드 구분 값
	};
	url += jQuery.param(params);
	
	window.open(url,"writeGrpCode","width="+width+",height="+height+",left="+left+",top="+top);
		
}


//그룹코드 상세보기
function viewGrpCode(grp_cd){
	
	var url = "/admin/system/code/viewGrpCodePop?";
	
	var params = {
			grp_cd : grp_cd
		
	};
	url += jQuery.param(params); 
	
	window.open(url,"viewGrpCode","width="+width+",height="+height+",left="+left+",top="+top);
}

//그룹코드 수정화면 이동
function editGrpCodePop(){
	var form = $("#form")[0];
	form.action = "/admin/system/code/writeGrpCodePop";
	form.method = "post";
	form.submit();
}

//검색
function search(){
	query($("#searchKeyword").val(),$("#searchTrg").val());
}

//onReady
function init(){
	$("#searchKeyword").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#onsearch").click();
	    }
	});
	query('','grp_cd');
}

//그룹코드 리스트 조회 쿼리
function query(searchKeyword,searchTrg){

	$.jgrid.gridUnload('#grpCodeTable');
	$("#grpCodeTable").jqGrid({
		// data를 가져올 url
		url : "/admin/system/ajaxGrpCodeList",
        datatype: "json",
        //그리드 높이
        height: 250,
        postData : {
        	searchTrg     : searchTrg,
        	searchKeyword : searchKeyword
        },
        jsonReader:{
			page: "page", 
			root: "grpCodeList",			// 리스트 파라미터, 컨트롤러에서 넘어옴
			total: "TOTAL_PAGE",	// 총 페이지 수, 컨트롤러에서 넘어옴
			records: "TOTAL",		// 총 레코드 수, 컨트롤러에서 넘어옴
// 			repeatitems: true, 		//
// 			cell: "cell", 
			id: "grp_cd"			// unique column
				
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
//  		loadonce:true,//페이지를 넘길 수 있음
		mtype : "POST", //데이터 요청방식 post
        multiselect : false,//체크박스 사라짐
        cellEdit : true,//셀의 값변경을 정함 트루하면 바껴짐
        pager : '#grpPager',// 밑에 페이저 달 div 아이디
        emptyrecords : "Nothing to display",
//         sortname : 'ORD_NO',
//         sortorder : 'DESC',
        gridview : true, // 속도 향상, 대신 treeGrid, subGrid, or the afterInsertRow 옵션 사용 불가
        afterSaveCell : function(rowid,name,val,iRow,ICol){ // 로우 데이터 변경하고 엔터치거나 다른 셀 클릭했을때 발동
            alert(rowid+val+name);
        },
        onCellSelect: function (rowId, index, contents, event){
        	var cm = $(this).jqGrid	('getGridParam','colModel');
        	viewGrpCode($("#grpCodeTable").jqGrid('getRowData', rowId).grp_cd);
        }
    });
	
	resizeJqGridWidth('grpCodeTable', 'grid_wrap', $('#grid_wrap').width(), true);
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

//팝업 닫기
function closePop(){
	window.close();
}


