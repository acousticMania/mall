<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
	
	
					<br>
					<table width="100%" cellspacing="1" cellpadding="3" border="0">
						<tbody>
						<tr>
							<td align="center">
								<input type="submit" value="검색" class="search_btn2">&nbsp;
								<input type="button" value="전체목록" class="search_default" onclick="location.href='/admin/manage/product/tax_list.php?tax_type=T&amp;menucode=PRODUCT'">
							</td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>

<br>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tbody><tr>
		<td><span class="title_msg">총 세금계산서 : <strong id="total_prd_cnt">1</strong> , 검색결과 : <strong id="total_prd_cnt">1</strong></span></td>
		<td align="right">
		<form>
			<select name="tmp_rows" onchange="location.href='?status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows=&amp;tax_type=T&amp;tmp_rows='+this.value" class="select">
				<option value="10">10개씩 출력</option>
				<option value="20" selected="">20개씩 출력</option>
				<option value="30">30개씩 출력</option>
				<option value="50">50개씩 출력</option>
				<option value="70">70개씩 출력</option>
				<option value="100">100개씩 출력</option>
			</select> 
			<input type="button" value="엑셀파일저장" class="btnExcel" onclick="excelDown();">
		</form>
		</td>
	</tr>
	<tr><td height="5"></td></tr>
</tbody></table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<form></form>
	<tbody><tr><td class="t_rd" colspan="20"></td></tr>
	<tr class="t_th">
		<th width="3%"><input type="checkbox" name="select_tmp" onclick="onSelect(this.form)"></th>
		<th width="10%">주문번호</th>
		<th>품 명</th>
		<th width="8%">발급일</th>
		<th width="8%">발급완료일</th>
		<th width="8%">공급가액</th>
		<th width="8%">세액</th>
		<th width="15%">처리상태</th>
		<th width="10%">기능</th>
	</tr>
	<tr><td class="t_rd" colspan="20"></td></tr>

	<form action="order_save.php" name="170315014135479" method="get"></form>
	<input type="hidden" name="mode" value="tax_status">
	<input type="hidden" name="page" value="1">
	<input type="hidden" name="orderid" value="170315014135479">
	<input type="hidden" name="tmp_tax_pub" value="N">

	<input type="hidden" name="status" value="">
	<input type="hidden" name="srh_prev" value="">
	<input type="hidden" name="srh_next" value="">
	<input type="hidden" name="searchopt" value="">
	<input type="hidden" name="searchkey" value="">

	<input type="hidden" name="tax_type" value="T">
	<input type="hidden" name="menucode" value="PRODUCT">

	<tr>
		<td align="center" height="27"><input type="checkbox" name="select_checkbox"></td>
		<td align="center"><a href="order_info.php?orderid=170315014135479&amp;page=1&amp;status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows=">170315014135479</a></td>
		<td align="center">제품명이 들어갑니다.... </td>
		<td align="center">2017-03-15</td>
		<td align="center"></td>
		<td align="center">17,272원</td>
		<td align="center">1,728원</td>
		<td align="center">
			<table cellpadding="2">
				<tbody><tr>
					<td bgcolor="ED1C24">
						<select name="tax_pub" style="width:90" class="select">
							<option value="N" selected="">발급대기</option>
							<option value="Y">발급완료</option>
						</select>
					</td>
					<td><input type="image" src="../image/btn_apply_s.gif"></td>
				</tr>
			</tbody></table>
		</td>
		<td align="center">
			<img src="../image/btn_view_s.gif" style="cursor:pointer" align="absmiddle" onclick="viewTax('170315014135479')">
			<!--<img src="../image/btn_print_s.gif" style="cursor:pointer" align="absmiddle" onClick="printTax('170315014135479')">-->
		</td>
	</tr>
	<tr><td colspan="20" class="t_line"></td></tr>
	<tr bgcolor="#FFFFFF" id="ccontent_170315014135479" style="display:none">
		<td height="30" colspan="10" style="padding:3px">
						<table bgcolor="C8C8C8" width="100%" border="0" cellspacing="1" cellpadding="2">
				<tbody><tr>
					<td width="15%" height="25" bgcolor="#F9F9F9">&nbsp; 사업자 번호</td><td width="35%" bgcolor="#FFFFFF">11</td>
					<td width="15%" bgcolor="#F9F9F9">&nbsp; 상 호</td><td bgcolor="#FFFFFF">11</td>
				</tr>
				<tr>
					<td height="25" bgcolor="#F9F9F9">&nbsp; 대표자</td><td width="30%" bgcolor="#FFFFFF">123</td>
					<td bgcolor="#F9F9F9">&nbsp; 사업장 소재지</td><td bgcolor="#FFFFFF">11</td>
				</tr>
				<tr>
					<td height="25" bgcolor="#F9F9F9">&nbsp; 업 태</td><td bgcolor="#FFFFFF">11</td>
					<td bgcolor="#F9F9F9">&nbsp; 종 목</td><td bgcolor="#FFFFFF">123</td>
				</tr>
				<tr>
					<td height="25" bgcolor="#F9F9F9">&nbsp; 전화번호</td><td bgcolor="#FFFFFF">11-22-33</td>
					<td bgcolor="#F9F9F9">&nbsp; 이메일</td><td bgcolor="#FFFFFF">123</td>
				</tr>
				<tr>
					<td height="25" bgcolor="#F9F9F9">&nbsp; 세금세산서번호</td><td bgcolor="#FFFFFF"></td>
					<td bgcolor="#F9F9F9">&nbsp; </td><td bgcolor="#FFFFFF">&nbsp;</td>
				</tr>
			</tbody></table>
					</td>
	</tr>
	
	</tbody></table>

<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tbody><tr><td height="5"></td></tr>
	<tr>
		<td width="33%">
			<input type="button" value="선택삭제" class="btnListchk" onclick="taxDelete()">
			<input type="button" value="상태일괄변경" class="btnListchk" onclick="batchStatus()">
		</td>
		<td width="33%">    <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="center">      <table border="0" cellspacing="0" cellpadding="0">        <tbody><tr>          <td width="27"><a href="?ptype=&amp;page=1&amp;&amp;status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows="><img src="/admin/manage/image/btn_prev2.gif" align="absmiddle" border="0'"></a></td>          <td width="27"><a href="?ptype=&amp;page=1&amp;&amp;status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows="><img src="/admin/manage/image/btn_prev.gif" align="absmiddle" border="0'"></a></td>          <td align="center">&nbsp; <b>1</b> /           &nbsp; </td>          <td width="27" align="right"><a href="?ptype=&amp;page=1&amp;&amp;status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows="><img src="/admin/manage/image/btn_next.gif" align="absmiddle" border="0"></a></td>          <td width="27" align="right"><a href="?ptype=&amp;page=1&amp;&amp;status=&amp;srh_prev=&amp;srh_next=&amp;searchopt=&amp;searchkey=&amp;menucode=PRODUCT&amp;tax_type=T&amp;tmp_rows="><img src="/admin/manage/image/btn_next2.gif" align="absmiddle" border="0"></a></td>        </tr>      </tbody></table>    </td></tr></tbody></table></td>
		<td width="33%"></td>
	</tr>
</tbody></table>


	</div>
	<!-- //container-fluid -->
</div>
<!-- //page-wrapper -->