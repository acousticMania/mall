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


	<!-- Bootstrap Core CSS -->
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- Custom CSS -->
	<link href="/css/admin.css" rel="stylesheet">
	
	<!-- Custom Fonts -->
	<link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- favicon -->
	<link rel="shortcut icon" href="/resources/images/favicon.ico" />
	
	<script src="/resources/mall/admin/system/code/codeList.js"></script>
	
	<script>
		$(document).ready(function(){
			
			init();
			
		});
	</script>
    <!-- Bootstrap Core JavaScript -->
    <script src="/js/bootstrap.min.js"></script>
    
		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active">일반코드 관리</li>
						</ol>
					</div> 
				</div>
				<h1 class="page-header">일반코드 관리</h1>
				<div style="width: 100%; position: relative;">
					<div style="width: 49%; position: absolute;" id="grp_cd_div">
						<div class="row" style="width: 100%;">
							<div class="col-lg-12 col-md-6">
					            <table class="table table-bordered table-hover" id="grpCdTable">
					           
					            </table>
					            <div id="grpPager"></div>
				            </div>
			            </div>
						<!-- <iframe id="leftFrame" name="leftFrame" src="/admin/system/leftCodeList" width="100%" height="100%" frameborder="0" scrolling="auto" ></iframe> -->
					</div>
					<div style="width: 49%; position: absolute; left: 50%;" id="cd_div">
					<!-- 버튼영역 시작 -->
					<div style="margin-bottom: 10px; display: none; " title="버튼영역" id="cdListBtn">
						<table style="width: 100%; " >
							<tr>
								<td align="left" width="70%"></td>
								<td align="right" width="30%"><span style="margin-right: 40px;"><input type="button" value="일반코드추가" onclick="writeCodePop()"></span></td>
							</tr>
						</table>
					</div>
					<!-- 버튼영역 끝 -->
						<div class="row">
							<div class="col-lg-12 col-md-6">
								<input type="hidden" id="grp_cd" name="grp_cd">
					            <table class="table table-bordered table-hover" id="cdTable">
					            </table>
					            <div id="cdPager"></div>
				            </div>
			            </div>
					</div>
				</div>
			</div>
		</div>