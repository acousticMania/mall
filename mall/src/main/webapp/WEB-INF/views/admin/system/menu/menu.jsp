<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>	

<!-- Extjs js -->
<script src="/resources/js/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="/resources/js/validation/jquery.validate.min.js"></script>
<link href="/resources/js/ext-6.2.1/build/classic/theme-classic/resources/theme-classic-all.css" rel="stylesheet">
<link href="/resources/js/ext-6.2.1/build/classic/theme-classic/resources/theme-classic-all_1.css" rel="stylesheet">
<link href="/resources/js/ext-6.2.1/build/classic/theme-classic/resources/theme-classic-all_2.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/resources/extjs//theme-classic/resources/theme-classic-all.css"/>
<script type="text/javascript" src="/resources/extjs/theme-classic/theme-classic.js"></script>
<script type="text/javascript" src="/resources/js/ext-6.2.1/build/ext-all.js"></script>

	<!-- Bootstrap Core CSS -->
	<link href="/resources/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- Custom CSS -->
	<link href="/resources/css/admin.css" rel="stylesheet">
	
	<!-- Custom Fonts -->
	<link href="/resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<script src="/resources/mall/admin/system/menu/menu.js"></script>
    
		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active">메뉴관리 관리</li>
						</ol>
					</div> 
				</div>
				<h1 class="page-header">메뉴 관리</h1>
				<div class="login-panel panel panel-default" style="width: 100%; position: relative;">
					<div style="width: 49%; position: absolute;" id="menuTreeDiv">
						<div class="row" style="width: 100%;">
							<body></body>
			            </div>
					</div>
					<div  style="width: 49%; position: absolute; left: 50%;" >
					
					<!-- 상단 버튼영역 시작 -->
					<div style="margin-bottom: 10px; display: none;" title="버튼영역" id="btnTopDiv">
						<table style="width: 100%; " >
							<tr>
								<td align="left" width="70%"></td>
								<td align="right" width="30%"><span style="margin-right: 5px; "><input style="margin-top:10px;" class="btn btn-lg btn-success" type="button" value="메뉴삭제" onclick="deleteMenu()" ></span><span style="margin-right: 20px;"><input style="margin-top:10px;" class="btn btn-lg btn-success" type="button" value="메뉴추가" data-target="#layerpop" data-toggle="modal" ></span></td>
							</tr>
						</table>
					</div>
					<!-- 상단 버튼영역 끝 -->
					<!-- 메뉴상세 영역 시작 -->
					<div class="login-panel panel panel-default" style="display: none;" id="menuDiv">
						<div class="panel-heading">
	                        <h3 class="panel-title">메뉴상세</h3>
	                    </div>
						<div class="panel-body" id="menuDetailDiv">
							<form role="form" id="form" name="form">
							</form>
			            </div>
			        </div>
			     	<!-- 메뉴상세 영역 끝 -->
			        <!-- 하단 버튼영역 시작 -->
					<div style="margin-bottom: 10px; display: none;" title="버튼영역" id="btnButtomDiv">
						<table style="width: 100%; " >
							<tr>
								<td align="left" width="70%"></td>
								<td align="right" width="30%"><span style="margin-right: 20px;"><input class="btn btn-lg btn-success btn-success" type="button" value="저장" onclick="editMenu()"></span></td>
							</tr>
						</table>
					</div>
					<!-- 하단 버튼영역 끝 -->
					
					</div>
				</div>
			</div>
		</div>
		
<!-- 모달영역 시작 -->	
 <div class="modal fade" id="layerpop"  >
 	<div class="modal-dialog">
       <div class="login-panel panel panel-default">
           <div class="panel-heading">
               <h3 class="panel-title">메뉴 추가</h3>
           </div>
           <div class="panel-body">
               <form role="form" id="addForm" name="addForm">
                   <table class="table">
                   	<tr>
                   		<td style="width: 30%;">메뉴아이디</td>
                   		<td style="width: 70%;"><input style="width: 99%;" type="text" id="menu_id" name="menu_id"  value=""></td>
                   	</tr>
                   	<tr>
                   		<td>메뉴명</td>
                   		<td><input style="width: 99%;" type="text" id="menu_name" name="menu_name"  value=""></td>
                   	</tr>
                   	<tr>
                   		<td>설명</td>
                   		<td><input style="width: 99%;" type="text" id="description" name="description" value=""></td>
                   	</tr>
                   	<tr>
                   		<td>액션URL</td>
                   		<td><input style="width: 99%;" type="text" id="action_url" name="action_url" value=""></td>
                   	</tr>
                   	<tr>
                   		<td>메뉴타입</td>
                   		<td>
							<span style="margin-right: 10px;"><input type="radio" id="menu_kind" name="menu_kind" value="LEFT"  checked="checked">좌측메뉴</span>
							<span><input type="radio" id="menu_kind" name="menu_kind" value="TOP" >탑메뉴</span> 
						</td>
                   	</tr>
                   	<tr>
                   		<td>사용여부</td>
                   		<td>
							<span style="margin-right: 10px;"><input type="radio" id="use_yn" name="use_yn" value="Y"  checked="checked">사용</span>
							<span><input type="radio" id="use_yn" name="use_yn" value="N" >미사용</span> 
						</td>
                   	</tr>
                   	<tr>
                   		<td>순번</td>
                   		<td><input style="width: 99%;" type="text" id="sort_no" name="sort_no" value=""></td>
                   	</tr>
                   	<tr>
                   		<td>기타파라미터1</td>
                   		<td><input style="width: 99%;" type="text" id="etc_param1" name="etc_param1" value="" ></td>
                   	</tr>
                   	<tr>
                   		<td>기타파라미터2</td>
                   		<td><input style="width: 99%;" type="text" id="etc_param2" name="etc_param2" value="" ></td>
                   	</tr>
                   	<tr>
                   		<td>기타파라미터3</td>
                   		<td><input style="width: 99%;" type="text" id="etc_param3" name="etc_param3" value="" ></td>
                   	</tr>
                   </table>
                   <div title="버튼영역"  align="center">
    				<span style='margin-right: 10px; width: 80px;' class="btn btn-lg btn-success" onclick="addMenu()" >저장</span><span style="margin-right: 10px; width: 80px;" class="btn btn-lg btn-success" onclick="closePop()" >취소</span>
					</div>
                 </form>
             </div>
         </div>
     </div>
</div>		
<!-- 모달영역 끝 -->