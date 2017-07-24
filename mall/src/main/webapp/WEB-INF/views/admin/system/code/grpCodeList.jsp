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
<script src="/resources/mall/admin/system/code/grpCodeList.js"></script>
    
    <script>
    $(document).ready(function(){
		init();
	});
    </script>
    
    <form id="form" name="form" role="form">
		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active">그룹코드 관리</li>
						</ol>
					</div> 
				</div>
				<h1 class="page-header">그룹코드 관리</h1>
				<div align="center">
					<span style="margin-right: 10px; width: 100px;">
						<%-- <select id="searchTrg" name="searchTrg" style="width: 100px;">
                     	<c:forEach var="sys_type" items="${sys_type}">
							<option value="${sys_type.cd}">${sys_type.cd_name}</option>
     					</c:forEach>
                     	</select> --%>
                     	<select id="searchTrg" name="searchTrg" style="width: 100px; height: 27px;">
                     		<option value="grp_cd">그룹코드</option>
                     		<option value="name">코드명</option>
                     	</select>
					</span>
					<span style="margin-right: 10px; width: 200px;"><input style="width: 200px; height: 27px;" type="text" id="searchKeyword" name="searchKeyword"></span>
					<span style="width: 100px;"><input class="btn btn-lg btn-success"  type="button" value="검색" onclick="search()" id="onsearch" name="onsearch"></span>
				</div>
				<div class="row">
					<div style="margin-bottom: 20px;" title="버튼영역">
						<table style="width: 100%;" >
							<tr>
								<td align="left" width="70%"></td>
								<td align="right" width="30%"><span style="margin-right: 50px;"><input class="btn btn-lg btn-success"  type="button" value="그룹코드추가" onclick="writeGrpCode()"></span></td>
							</tr>
						</table>
					</div>
					<div class="col-lg-12 col-md-6" id="grid_wrap">
			            <table class="table table-bordered table-hover" id="grpCodeTable">
			            </table>
			            <div id="grpPager"></div>
					</div>
				</div>

			</div>

		</div>
		</form>