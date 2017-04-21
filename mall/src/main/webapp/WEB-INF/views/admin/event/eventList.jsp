<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script type="text/javascript">
Ext.onReady(function() {
// 	Ext.Msg.alert("Chapter 1", "Hello World!!!");
	
	Ext.define('User', {
	    extend: 'Ext.data.Model',
	    fields : [ 'name', 'email', 'phone' ]
	});
	
	var userStore = Ext.create('Ext.data.Store', {
	    model : 'User',
	    data: [
	            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
	                { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
	                { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
	                { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
	     ]
	});
	
	Ext.create('Ext.grid.Panel', {
        renderTo: 'binding-example',
        frame: true,
        title: 'Book List',
        store: userStore,
        width: 1550,
        height: 400,
        layout: 'border',
        columns: [
            {
                text:'Name',
                width: 100,
                sortable: false,
                hideable: false,
                dataIndex : 'name'
            }, {
                text: 'Email Address',
                width: 150,
                dataIndex : 'email',
                hidden: true
            },{
                text:'Phone Number',
                flex:1,
                dataIndex:'phone'
            }
       ]
    });
});
</script>
<!-- page-wrapper -->
<div id="page-wrapper" style="height: 1000px;">
	<!-- container-fluid -->
	<div class="container-fluid">
		<!-- Page Heading -->
		<div class="row">
			<div class="col-lg-12">
				<ol class="breadcrumb">
					<li class="active"><i class="fa fa-user"></i>이벤트</li>
					<li class="active">이벤트관리</li>
				</ol>
			</div> 
		</div>
		<!-- //Page Heading -->
		<div class="row">
			<div class="col-lg-12 col-md-6">
				<h3 class="page-header">이벤트리스트</h3>
				<!-- 검색조건 -->
				<form name="frm" action="/admin/manage/product/tax_list.php" method="get">
					<div class="form-inline">
						<label for="pwd">진행상태 : </label>
						<label class="radio-inline"><input type="radio" name="optradio">전체</label>
						<label class="radio-inline"><input type="radio" name="optradio">작동</label>
						<label class="radio-inline"><input type="radio" name="optradio">중지</label> 
					</div>
					<div class="form-inline">
						<label for="pwd">이벤트기간 : </label>
						<input type="text" name="srh_prev" id="srh_prev" size="15" value="2017-02-03"> ~ 
						<input type="text" name="srh_next" id="srh_next" size="15" value="2017-04-04">
						<button type="button" class="btn">오늘</button>
						<button type="button" class="btn">어제</button>
						<button type="button" class="btn">1주일</button>
						<button type="button" class="btn">1개월</button>
						<button type="button" class="btn">6개월</button>
						<button type="button" class="btn">1년</button>
					</div>
					<div class="form-inline">
						<label for="pwd">이벤트명 : </label>
						<input type="text" class="form-control" id="usr">
					</div>
	
	
					<div class="form-inline" align="center">
						<button type="button" class="btn btn-info"> 검색</button>
						<button type="button" class="btn btn-info">전체목록</button>
					</div>
				</form>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-9">
				<span>총 이벤트 : <strong id="total_prd_cnt">1</strong> , 검색결과 : <strong id="total_prd_cnt">1</strong></span>
			</div>
			<div class="col-md-2">
				<select class="form-control input-sm">
					<option value="10">10개씩출력</option>
					<option value="20" selected="selected">20개씩 출력</option>
					<option value="30">30개씩 출력</option>
					<option value="50">50개씩 출력</option>
					<option value="70">70개씩 출력</option>
					<option value="100">100개씩 출력</option>
				</select>
			</div>
			<div class="col-md-1">
				<button type="button" class="btn btn-primary">이벤트등록</button>
			</div>
		</div>
		<div class="row">
			<div id="binding-example">
			</div>
		</div>
		<div class="row">
			<div>
				<button type="button" class="btn btn-primary">선택삭제</button>
			</div>
		</div>
		<div class="page-footer">
			<ul id="PAGE_NAVI" class="pagination pagination-lg pagination-sm"></ul>
			<input type="hidden" id="PAGE_INDEX" name="PAGE_INDEX" />
		</div>
	</div>
	<!-- //container-fluid -->
</div>
<!-- //page-wrapper -->