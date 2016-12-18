<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ include file="/WEB-INF/views/common/sample/include-header.jsp" %> --%>
<script>

	/* $(document).ready(function(){
	    $("#write").on("click", function(e){ //글쓰기 버튼
	        e.preventDefault();
	        fn_openBoardWrite();
	    }); 
	     
	    $("a[name='title']").on("click", function(e){ //제목 
	        e.preventDefault();
	        fn_openBoardDetail($(this));
	    });
	});
	
	function fn_openBoardWrite(){
        var comSubmit = new ComSubmit();
        comSubmit.setUrl("<c:url value='/sample/openBoardWrite' />");
        comSubmit.submit();
    }
     
    function fn_openBoardDetail(obj){
        var comSubmit = new ComSubmit();
        comSubmit.setUrl("<c:url value='/sample/openBoardDetail' />");
        comSubmit.addParam("IDX", obj.parent().find("#IDX").val());
        comSubmit.submit();
    } */
    
var mainApp = angular.module('mainApp', ['ui.bootstrap']);

mainApp.controller('BoardCtrl', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window){
	//게시판 객체를 생성
	$scope.boardList = {};
	$scope.selectBoardList = function() {
	 	//서버에 게시판 제목을 요청
	 	$http({
	 		method:'GET',
	 		url: '/sample/selectNgBoardList' 
	 	})
	 	
	 	.success(function(data, status, headers, config) {
	 		//서버로부터 받아온 사용자 이름을 모델에 할당!
	  		$scope.boardList.list = data.list;
	 	})
	 	
	 	.error(function (data, status, headers, config) {
	 	//이런 먼가잘못되었음!	
	 	});
	}
	
	$scope.openWrite = function () {
		$window.location.href = '/sample/openNgBoardWrite';
	}
	
	//on button click
//   	$scope.submitForm = $scope.submitQuery;
	$scope.submitForm = function () {
		$scope.submitQuery();
	}
	
	$scope.submitQuery = function (e) {
		debugger;
		var formElement = angular.element(e.target);
        formElement.attr("action", "/sample/openNgBoardDetail");
        formElement.submit();
    };
    
	
    
	angular.element(document).ready(function () {
        $scope.selectBoardList();
    });
	
}]);
    
</script>
</head>
<body>
<div class="table" ng-app="boardApp">
	<h4>게시판 목록</h4>
	<div class="table-responsive" ng-controller="BoardCtrl">
		<form id="commonForm" name="commonForm" ng-submit="submitQuery($event)">
			<table class="table">
			    <colgroup>
			        <col width="10%"/>
			        <col width="*"/>
			        <col width="15%"/>
			        <col width="20%"/>
			    </colgroup>
			    <thead>
			        <tr>
			            <th scope="col">글번호</th>
			            <th scope="col">제목</th>
			            <th scope="col">조회수</th>
			            <th scope="col">작성일</th>
			        </tr>
			    </thead>
			    <tbody>
			        
	            <tr ng-repeat="list in boardList.list">
	                <td>{{list.BOARD_IDX}}</td>
	                <td class="title">
	                	<a href="" name="title"  ng-click="submitForm()">{{list.TITLE}}</a>
	                	<input type="hidden" name="IDX" value="{{list.BOARD_IDX}}">
	               	</td>
	                <td>{{list.HIT_CNT}}</td>
	                <td>{{list.REG_DATE}}</td>
	            </tr>
			        
	<!--             <tr> -->
	<!--                 <td colspan="4">조회된 결과가 없습니다.</td> -->
	<!--             </tr> -->
			    </tbody>
			</table>
		</form>
		<div style="text-align: center;"><button type="button" class="btn btn-success" ng-click="openWrite()">글쓰기</button></div>
	</div>
</div>
<!-- <a href="#this" id="write" class="btn btn-success">글쓰기</a> -->
<%-- <%@ include file="/WEB-INF/views/common/sample/include-body.jsp" %> --%>
