<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jquery-ui/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jquery-ui/jquery-ui.structure.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jquery-ui/jquery-ui.theme.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jqgrid/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jqgrid/ui.jqgrid-bootstrap-ui.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jqgrid/ui.jqgrid-bootstrap.css" />
<script src="/js/plugins/jqgrid/i18n/grid.locale-en.js"></script>
<script src="/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
<script src="/js/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="/resources/js/common/common.js"></script>

<script>
$(function(){
	$("#list").jqGrid({
		// data를 가져올 url
		url : "/admin/order/orderListJson",
        datatype: "json",
        //그리드 높이
        height: 250,
        jsonReader:{
            page :'page', // 페이징을 위한
            total:'TOTAL', 
            root:'list' // map에 "list",list 넣으면 그 키값 써줘야 데이터 뿌려짐
        },
        //컬럼명들
        colNames:['주문번호', '주문상품', '주문자명', '주문경로', '결제수단', '금액', '주문일시', '처리상태'],
        //컬럼모델
        colModel:[
            {name:'ORD_NO'},
            {name:'ORD_PRODUCT_NM'},
            {name:'ORDERER_NM'},
            {name:'ORD_ROUTE'},
            {name:'PAY_METHOD_NM'},
            {name:'TOT_PRICE'},
            {name:'ORD_DATE'},
            {name:'ORD_STATUS_NM', editable:true, edittype:"select", editoptions:{value:"Y:등록;N:미등록"}}
        ],
//         viewrecords:false,
        caption:'주문 목록', // 그리드 왼쪽 위에 캡션
        // rownumWidth:40,//말그대로 로우넘의 가로길이
        // rowNum:10,// 그리드에 보여줄 데이터의 갯수,-1하면 무한으로 보여준단다..
        // width:1600,//그리드의 총 가로길이
		rownumbers: true, /* 행 순번 */
        rowList:[10,20,30],//몇개식 보여줄건지 선택가능하다, 배열형식이라 5,10,15,20,,,가능
        multiboxonly : true,
 		//loadonce:true,//페이지를 넘길 수 있음
		mtype : "POST", //데이터 요청방식 post
        multiselect : true,//체크박스 사라짐
        cellEdit : true,//셀의 값변경을 정함 트루하면 바껴짐
        pager : '#PAGE_NAVI',// 밑에 페이저 달 div 아이디
        gridview : true, // 속도 향상, 대신 treeGrid, subGrid, or the afterInsertRow 옵션 사용 불가
        editurl :'/admin/order/orderListJson',//값 수정후 엔터치면 지정된 url로 날라감
//         cellsubmit : 'clientArray' //clientArray 랑 remote가 있는데 지금 설정은 특정이벤트를 해야함 전부 저장, remote로 하면 셀 수정시 바로바로 저장함
//         shrinkToFit : true,
//         forceFit : true,
        afterSaveCell : function(rowid,name,val,iRow,ICol){ // 로우 데이터 변경하고 엔터치거나 다른 셀 클릭했을때 발동
            alert(rowid+val+name);
        },
//         onCellSelect: function(rowid,name,val,iRow,iCol){ // 해당로우의 각 셀마다이벤트 걸림

//         },
//         beforeProcessing:function(data){ // 그리드 뿌리기전에
//         	boardBean = data.bean; // 제이슨타입을 쓰기 때문에 비어있는 bean형태를 받아옴
//         },
//         onSelectRow: function(rowid, status, e) {
//         	if(status==true){
//         		$("#list1").jqGrid("setCell",rowid,"status","delete"); // 체크했으면 딜리트
//         	}
//         	else{
//         		$("#list1").jqGrid("setCell",rowid,"status","normal"); // 체크 풀면 다시 노말 상태로 돌림
//         	}
//         }
    });
	resizeJqGridWidth('list', 'grid_wrap', $('#grid_wrap').width(), true);
	
    //jqGrid껍데기 생성
//     $("#list").jqGrid({
//         datatype: "local",
//         //그리드 높이
//         // height: 250,
//         //컬럼명들
//         colNames:['주문번호','주문자ID', '주문자명', '등록일'],
//         //컬럼모델
//         colModel:[
//             {name:'ORD_NO'},
//             {name:'ORDERER_ID'},
//             {name:'ORDERER_NM'},
//             {name:'REG_DATE'}
//         ],
//         //그리드타이틀
//         // caption: "주문 목록"
//     });
//     fn_selectOrderList(1);
//     resizeJqGridWidth('list', 'grid_wrap', $('#grid_wrap').width(), true);
});


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

function fn_selectOrderList(pageNo) {
    	var comAjax = new ComAjax();
//     	comAjax.setUrl("<c:url value='orderListJson'/>");
    	comAjax.setUrl("orderListJson");
    	comAjax.setCallback("fn_selectOrderListCallback");
    	comAjax.addParam("PAGE_INDEX", pageNo);
    	comAjax.addParam("PAGE_ROW", 15);
    	comAjax.ajax();
    }
    
function fn_selectOrderListCallback(data) {
	var total = data.TOTAL;
	// console.log("total length : " + total);
	console.log("data length : " + data.list.length);
	console.log("total : " + total);
	$("#list").clearGridData();
	// 스크립트 변수에 담겨있는 json데이터의 길이만큼 
    for(var i=0;i<data.list.length;i++){
        //jqgrid의 addRowData를 이용하여 각각의 row에 gridData변수의 데이터를 add한다
    	$("#list").jqGrid('addRowData',i+1,data.list[i]);
    }
	var params = {
		divId : "PAGE_NAVI",
		pageIndex : "PAGE_INDEX",
		totalCount : total//,
		// eventName : "fn_selectOrderList"
	};
	gfn_renderPaging(params);
}
</script>


	<div id="page-wrapper" style="height: 1000px;">
	    <div class="container-fluid">
	
	        <!-- Page Heading -->
	        <div class="row">
	            <div class="col-lg-12">
	                <ol class="breadcrumb">
	                    <li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main</li>
	                    <li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main</li>
	                </ol>
	            </div>
	        </div>
	        <!-- /.row -->
	
	        <div class="row">
	            <div class="col-lg-12 col-md-6">
	                <h1 class="page-header">주문리스트</h1>
	                <!-- 조회조건 -->
	                <form>
	                    <div class="form-inline">
	                        <select style="height: 28px;width: 100px; margin-right: 10px">
	                            <option>주문번호</option>
	                            <option>주문자명</option>
	                            <option>입금자명</option>
	                            <option >아이디</option>
	                        </select>
	                        <input type="text" class="form-control" >
	                    </div>
	                    <div class="form-group">
	                        <select style="height: 28px;width: 100px">
	                            <option >주문일</option>
	                            <option>결제일</option>
	                        </select>
	                        <input type="date" id="datePicker" min='2010-01-01' max='2020-01-01' value="2016-11-26" style="height: 28px; margin-left: 10px;padding-left: 10px;">&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
	                        <input type="date" id="datePicker" min='2010-01-01' max='2020-01-01' value="2016-11-26" style="height: 28px; padding-left: 10px;">
	                    </div>
	                    <div class="form-group">
	                        <label for="pwd">주문상태 :</label>
	                        <input type="checkbox" style="margin-left: 10px"> 주문접수
	                        <input type="checkbox" style="margin-left: 10px"> 결제확인
	                        <input type="checkbox" style="margin-left: 10px"> 상품준비
	                        <input type="checkbox" style="margin-left: 10px"> 출고준비
	                        <input type="checkbox" style="margin-left: 10px"> 결제취소
	                        <input type="checkbox" style="margin-left: 10px"> 출고완료
	                        <input type="checkbox" style="margin-left: 10px"> 주문접수
	                        <input type="checkbox" style="margin-left: 10px"> 배송중
	                        <input type="checkbox" style="margin-left: 10px"> 배송완료
	                    </div>
	                    <div class="form-group">
	                        <label for="pwd">결제수단 :</label>
	                        <input type="checkbox" style="margin-left: 10px"> 무통장
	                        <input type="checkbox" style="margin-left: 10px"> 카드
	                        <input type="checkbox" style="margin-left: 10px"> 휴대폰
	                        <input type="checkbox" style="margin-left: 10px"> 계좌이체
	                        <input type="checkbox" style="margin-left: 10px"> 포인트결제
	                        <input type="checkbox" style="margin-left: 10px"> 주문접수
	                        <input type="checkbox" style="margin-left: 10px"> 배송중
	                        <input type="checkbox" style="margin-left: 10px"> 배송완료
	                    </div>
	                    <div class="row" style="padding-left: 10px">
	                    	<button type="button" class="btn btn-primary btn-sm" style="float: right;" onclick="fn_selectOrderList(1);">조회</button>
	                    </div>
	                </form>
	                <!-- 리스트 -->
	                <div class="table-responsive" id="grid_wrap">
<!-- 						<table class="table table-bordered table-hover" id="list"> -->
						<table id="list">
						</table>
					</div>
					<!-- 페이징 -->
					<div class="page-footer">
						<ul id="PAGE_NAVI" class="pagination pagination-lg pagination-sm"></ul>
						<input type="hidden" id="PAGE_INDEX" name="PAGE_INDEX" />
					</div>
				</div>
			</div>
		</div>
	    <!-- /.container-fluid -->
	</div>
	<!-- /#page-wrapper -->