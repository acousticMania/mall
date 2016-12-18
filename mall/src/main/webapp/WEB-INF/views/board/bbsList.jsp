<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script>
/* Ext.onReady(function(){
  Ext.Msg.alert("Chapter1", "HelloWorld");
}) */
</script>
<div class="container">
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
      <c:forEach var="item" items="${list}" varStatus="status">
      <tr>
          <td>${item.idx}</td>
          <td><a href="./${item.idx}">${item.subject}</a></td>
          <td>${item.user_name}</td>
          <td>${item.reg_datetime}</td>
      </tr>
      </c:forEach>

      </tbody>

  </table>
  </div>
  <div style="text-align: center;"><button type="button" class="btn btn-success" onclick="location.href='./retrieveBoardWrite'">글쓰기</button></div>
</div>