<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script>
var mainApp = angular.module('mainApp', ['ui.bootstrap']);

mainApp.controller('boardCtrl', ['$scope', '$http', function($scope, $http)
{
    
    $scope.boardList = [];
    $scope.getBoardList = function()
    {
        $scope.boardList = [];

        var postData = "";

        var request = $http({
            method: 'post',
            url: "${pageContext.request.contextPath}/getList",
            data: postData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        });

        request.success(function (data, status, headers, config) {
            console.log(data);

            $scope.boardList = data.list;
        });
    };
    
    $scope.write = [];
    $scope.idx = null;
    $scope.getBoardList = function()
    {
    	$scope.write = [];
	    var postData = "";
	
	    var request = $http({
	        method: 'post',
	        url: "${pageContext.request.contextPath}/getList",
	        data: postData,
	        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
	    });
    }
    
    angular.element(document).ready(function () {
        $scope.getBoardList();
    });
    //$scope.message = msg;
}]);

</script>
<div class="container" ng-controller="boardCtrl">
  <h1>${message}</h1>
  
  <div class="table-responsive">
  <table class="table">
      <colgroup>
    <col width="10%"><col width="55%"><col width="15%"><col width="*">
    </colgroup>
    <thead>
      <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">등록일</th>
      </tr>
      </thead>

      <tbody>
      <!-- 목록이 반복될 영역 -->
      <tr ng-cloak ng-repeat="item in boardList">
          <td>{{item.idx}}</td>
          <td data-toggle="modal" data-target="#writeFormModal"><a href="/{{item.idx}}">{{item.subject}}</a></td>
          <td>{{item.user_name}}</td>
          <td>{{item.reg_datetime}}</td>
      </tr>

      </tbody>

  </table>
  </div>
  <div style="text-align: center;"><button type="button" class="btn btn-success" onclick="location.href='./retrieveBoardWrite'">글쓰기</button></div>
   <!-- 모달창 -->
    <div class="modal" id="writeFormModal">
        <div class="modal-dialog modal-lg">
            <form id="writeForm" name="writeForm" method="post">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"><span ng-bind="write.title"></span></h4>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon">제목</span>
                                <input ng-model="write.subject" type="text" class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon">등록일시</span>
                                <input ng-model="write.reg_date" type="text" class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group form-inline">
                            <div class="input-group">
                                <span class="input-group-addon">내용</span>
                                <textarea name="content" id="content"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" style="text-align:center;">
									        <button type="button" class="btn btn-primary" onclick="del()">삭제</button>
									        <button type="button" class="btn btn-primary" onclick="location.href='./retrieveBoardWrite/?idx=${object.idx}'">수정</button>
									        <button type="button" class="btn btn-primary" onclick="location.href='./retrieveBoardList'">목록</button>
									      </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>