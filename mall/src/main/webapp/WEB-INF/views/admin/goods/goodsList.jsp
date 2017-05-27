<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/admin/include-header.jsp" %>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/mall/admin/goods/goodsList.js"></script>

<script>
$(function() {
	$(document).ready(function(){
		init();
	});
});
</script>

<div id="page-wrapper" style="height: 1000px;">
	<div class="container-fluid">
		<!-- Page Heading -->
		<div class="row">
			<div class="col-lg-12">
				<ol class="breadcrumb">
					<li class="active"><i class="fa fa-user"></i> 상품</li>
					<li class="active">일반상품</li>
				</ol>
			</div>
		</div>
		<form class="form-horizontal">
		<!-- row -->
		<div class="row">
			<div class="col-lg-12 col-md-12">
				<h3 class="page-header">일반상품 리스트</h3>
				<div class="panel panel-default">
					<div class="row"><br>
						<div class="col-sm-6" style="text-align: center;padding-right: 0px;">
							<div class="col-sm-3">
								<label>상품분류</label>
							</div>
							<div class="col-sm-4">
								<select id="god_grp1" name="god_grp1" class="form-control input-sm">
									<c:forEach var="list" items="${listGodGrp}">
										<option value="<c:out value="${list.GD_GRP_NM}"/>">1차분류</option>
									</c:forEach>
								</select>
							</div>
							<div class="col-sm-4">
								<select id="god_grp2" name="god_grp2" class="form-control input-sm">
									<option>2차분류</option>
								</select>
							</div>
						</div>
						<div class="col-sm-6" style="text-align: center;padding-right: 0px;">
							<div class="col-sm-4">
								<select id="god_grp3" name="god_grp3" class="form-control input-sm">
									<option>3차분류</option>
								</select>
							</div>
							<div class="col-sm-4">
								<select id="god_grp4" name="god_grp4" class="form-control input-sm">
									<option>4차분류</option>
								</select>
							</div>
						</div>
					</div><br>
					<div class="row">
						<div class="col-sm-6" style="text-align: center;">
							<div class="col-sm-3">
								<label>검색조건</label>
							</div>
							<div class="col-sm-3">
								<select class="form-control input-sm">
									<option>상품명</option>
								</select>
							</div>
							<div class="col-sm-4">
								<input class="form-control input-sm"/>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="col-sm-3">
								<label>쿠폰적용</label>
							</div>
							<div class="col-sm-4">
								<select class="form-control input-sm">
									<option>선택</option>
								</select>
							</div>
						</div>
					</div><br>
					<div class="row">
						<div class="col-sm-6" style="text-align: center;">
							<div class="col-sm-3">
								<label>재고여부</label>
							</div>
							<div class="col-sm-3">
								<select class="form-control input-sm">
									<option>재고여부</option>
								</select>
							</div>
							<div class="col-sm-3">
								<input class="form-control input-sm"/>
							</div>
							<div class="col-sm-2" style="text-align: left;">
							<label class="control-label">개 이하</label>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="col-sm-3">
								<label>진열여부</label>
							</div>
							<div class="col-sm-4">
								<select class="form-control input-sm">
									<option>선택</option>
								</select>
							</div>
						</div>
					</div><br>
					<div class="row">
						<div class="col-sm-6" style="text-align: center;">
							<div class="col-sm-3">
								<label>그룹</label>
							</div>
							<div class="col-sm-4">
								<select class="form-control input-sm">
									<option>그룹선택</option>
								</select>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="col-sm-3">
								<label>브랜드</label>
							</div>
							<div class="col-sm-4">
								<select class="form-control input-sm">
									<option>브랜드선택</option>
								</select>
							</div>
						</div>
					</div><br>
				</div>
			</div>
		</div>
		<!-- ./row -->
		</form>
		<div class="row" style="text-align: center;;">
			<button type="button" class="btn btn-info">검색</button>
		</div>
        <!-- jqGrid -->
        <div class="table-responsive" id="goods_div">
			<table id="goodsTable">
			</table>
			<div id="pager"></div>
		</div>
		<!-- ./jqGrid -->
	</div>
	<!-- /.container-fluid -->
</div>