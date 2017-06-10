<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div id="page-wrapper" style="height: 1200px;">
	<div class="container-fluid">
		<!-- Page Heading -->
		<div class="row">
			<div class="col-lg-12">
				<ol class="breadcrumb">
					<li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main
					</li>
					<li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main
					</li>
				</ol>
			</div>
		</div>

		<h1 class="page-header">주문상세</h1>
		<div class="col-md-12">
			<fieldset class="for-panel">
				<legend>-주문상품목록</legend>
			</fieldset>
			<div class="row">
				<table class="table table-bordered table-hover">
					<thead>
						<tr class="active">
							<th style="text-align: center;">상품코드</th>
							<th style="text-align: center;">이미지</th>
							<th style="text-align: center;">상품명</th>
							<th style="text-align: center;">상품단가</th>
							<th style="text-align: center;">옵션</th>
							<th style="text-align: center;">수량</th>
							<th style="text-align: center;">적립금</th>
							<th style="text-align: center;">합계</th>
							<th style="text-align: center;">기능</th>
						</tr>
					</thead>
					<c:forEach var="RselectGoodslist" items="${selectGoodslist}">
						<tbody>

							<tr>
								<td>${RselectGoodslist.ORD_GOODS_ID}</td>
								<td>${RselectGoodslist.ORD_GOODS_ID}</td>
								<td>${RselectGoodslist.ORD_GOODS_NM}</td>
								<td>${RselectGoodslist.ORD_GOODS_PRICE}</td>
								<td>${RselectGoodslist.ORD_OPT_NM}</td>
								<td>${RselectGoodslist.ORD_AMOUNT}</td>
								<td>${RselectGoodslist.ORD_GOODS_ID}</td>
								<td>${RselectGoodslist.ORD_PRICE}</td>
								<td>${RselectGoodslist.ORD_DATE}</td>
							</tr>
						</tbody>
					</c:forEach>

				</table>
			</div>
		</div>

		<div class="col-md-12">
			<div class="row">
				<fieldset class="for-panel">
					<legend>-주문 정보</legend>
					<div class="row" style="text-align: center;">
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">주문번호
									:</label>
								<p class="form-control-static">${selectOrderDetail.ORD_NO }
								</p>
								<label class="col-xs-5  label-default" style="color: white;">주문일시
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORD_DATE }</p>
								<label class="col-xs-5  label-default" style="color: white;">입금계좌
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_ACCOUNT}</p>
								<label class="col-xs-5  label-default" style="color: white;">출금계좌
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_ACCOUNT}</p>
								<label class="col-xs-5  label-default" style="color: white;">운송장번호
									: </label>
								<p class="form-control-static">${selectOrderDetail.WAYBILL_NO}</p>
								<label class="col-xs-5  label-default" style="color: white;">발송일자
									: </label>
								<p class="form-control-static">${selectOrderDetail.WAYBILL_NO}</p>
								<label class="col-xs-5  label-default" style="color: white;">처리상태별
									처리시간 : </label>
								<p class="form-control-static">Home</p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">결제방법
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_METHOD}</p>
								<label class="col-xs-5  label-default" style="color: white;">결제일시
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_METHOD}</p>
								<label class="col-xs-5  label-default" style="color: white;">입급인
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_METHOD}</p>
								<label class="col-xs-5  label-default" style="color: white;">에스크로여부
									: </label>
								<p class="form-control-static">${selectOrderDetail.PAY_METHOD}</p>
								<label class="col-xs-5  label-default" style="color: white;">배송업체
									: </label>
								<p class="form-control-static">${selectOrderDetail.DELVR_COM_NM}</p>
								<label class="col-xs-5  label-default" style="color: white;">처리상태
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORD_STATUS}</p>
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
		
		<p></p>
		
		<div class="col-md-12">
			<div class="row">
				<fieldset class="for-panel">
					<legend>-주문자 정보</legend>
					<div class="row" style="text-align: center;">
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">주문자명
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_NM}</p>
								<label class="col-xs-5  label-default" style="color: white;">전화번호
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_PHONE}</p>
								<label class="col-xs-5  label-default" style="color: white;">우편번호
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_POST_CODE}</p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">이메일
									: </label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_EMAIL}</p>
								<label class="col-xs-5  label-default" style="color: white;">휴대폰
									:</label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_CELLPHONE}</p>
								<label class="col-xs-5  label-default" style="color: white;">주소
									:</label>
								<p class="form-control-static">${selectOrderDetail.ORDERER_ADDR}</p>
							</div>
						</div>
					</div>
				</fieldset>
			</div>

		</div>

		<p></p>

		<div class="col-md-12">
			<div class="row">
				<fieldset class="for-panel">
					<legend>-수취인 정보</legend>
					<div class="row" style="text-align: center;">
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">수취인명
									: </label>
								<p class="form-control-static">${selectOrderDetail.RECV_NM}</p>
								<label class="col-xs-5  label-default" style="color: white;">전화번호
									: </label>
								<p class="form-control-static">${selectOrderDetail.RECV_PHONE}</p>
								<label class="col-xs-5  label-default" style="color: white;">우편번호
									: </label>
								<p class="form-control-static">${selectOrderDetail.RECV_POST_CODE}</p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">이메일
									: </label>
								<p class="form-control-static">${selectOrderDetail.RECV_POST_CODE}</p>
								<label class="col-xs-5  label-default" style="color: white;">휴대폰
									:</label>
								<p class="form-control-static">${selectOrderDetail.RECV_CELLPHONE}</p>
								<label class="col-xs-5  label-default" style="color: white;">주소
									:</label>
								<p class="form-control-static">${selectOrderDetail.RECV_ADDR}</p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">요청사항
									: </label>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<p class="form-control-static">${selectOrderDetail.RECV_REQ}</p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">추문취소
									사유 :</label>
							</div>
						</div>
						<div class="col-sm-6" style="text-align: left;">
							<div class="form-horizontal">
								<p class="form-control-static"></p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">교환요청
									사유 :</label>
							</div>
						</div>
						<div class="col-sm-6" style="text-align: left;">
							<div class="form-horizontal">
								<p class="form-control-static"></p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-horizontal">
								<label class="col-xs-5  label-default" style="color: white;">관리자
									메모 :</label>
							</div>
						</div>
						<div class="col-sm-6" style="text-align: left;">
							<div class="form-horizontal">
								<p class="form-control-static">${selectOrderDetail.ADMIN_MEMO}</p>
							</div>
						</div>
					</div>
				</fieldset>
			</div>

		</div>
	</div>
	<!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->