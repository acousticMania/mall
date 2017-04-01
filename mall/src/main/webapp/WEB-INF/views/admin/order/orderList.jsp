<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" media="screen" href="/css/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/plugins/jqgrid/ui.jqgrid.css" />
<script src="/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script>
$(function(){
    //jqGrid껍데기 생성
    $("#list").jqGrid({
//         datatype: "json",
        //그리드 높이
//         height: 250,
        //컬럼명들
        colNames:['주문번호','주문자ID', '주문자명', '등록일'],
        //컬럼모델
        colModel:[
            {name:'ORD_NO'},
            {name:'ORDERER_ID'},
            {name:'ORDERER_NM'},
            {name:'REG_DATE'},
        ],
        //그리드타이틀
//         caption: "주문 목록"
    });
    fn_selectOrderList(1);
    resizeJqGridWidth('list', 'grid_wrap', $('#grid_wrap').width(), true);
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
    	console.log("total length : " + total);
    	$("#list").empty();
    	// 스크립트 변수에 담겨있는 json데이터의 길이만큼 
        for(var i=0;i<Number(total);i++){
            //jqgrid의 addRowData를 이용하여 각각의 row에 gridData변수의 데이터를 add한다
        	$("#list").jqGrid('addRowData',i+1,data.list[i]);
        }
   		var params = {
   			divId : "PAGE_NAVI",
   			pageIndex : "PAGE_INDEX",
   			totalCount : total,
   			eventName : "fn_selectBoardList"
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