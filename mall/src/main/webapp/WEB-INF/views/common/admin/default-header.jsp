<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse"  data-target=".navbar-ex1-collapse">
          <span class="sr-only">Toggle navigation</span> <span    class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/admin/main/main"><img class="img-thumbnail" width="80px" src="/images/logo.png" alt="" ></a>
      </div>
      <!-- Top Menu Items -->
      <ul class="nav navbar-right top-nav">
        <li><a href="#"><i class="fa fa-fw fa-user"></i> 회원<span  class="badge">0</span></a></li>
        <li><a href="#"><i class="fa fa-fw fa-envelope"></i> 게시물<span   class="badge">2</span></a></li>
        <li><a href="#"><i class="fa fa-fw fa-shopping-cart"></i> 주문<span class="badge">102</span></a></li>
        <li class="divider"></li>
        <li><a href="#"><i class="fa fa-fw fa-power-off"></i> Log Out</a></li>
      </ul>
      <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
      <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav side-nav">
          <li class="active">  <!-- class="active" --> 
            <a href="javascript:;"  data-toggle="collapse" data-target="#site-config"><i class="fa fa-fw fa-cog"></i> 설정<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="site-config" class="collapse">
              <li><a href="#">그룹관리</a></li>
              <li><a href="#">권한관리</a></li>
            </ul>
          </li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#member"><i class="fa fa-fw fa-user"></i> 회원<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="member" class="collapse">
              <li><a href="/admin/member/member">회원관리</a></li>
              <li><a href="#">블랙리스트관리</a></li>
              <li><a href="#">현재접속중회원관리</a></li>
              <li><a href="#">탈퇴리스트관리</a></li>
              <li><a href="#">문자발송관리</a></li>
              <li><a href="#">문자대량발송관리</a></li>
              <li><a href="#">이메일발송관리</a></li>
              <li><a href="#">이메일대량발송관리</a></li>
            </ul></li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#goods"><i class="fa fa-fw fa-leaf"></i> 상품<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="goods" class="collapse">
              <li><a href="./goodsReg">상품등록 설정</a></li>
              <li><a href="/admin/goods/catalog">일반상품</a></li>
              <li><a href="./package">패키지상품</a></li>
            </ul></li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#order"><i class="fa fa-fw fa-shopping-cart"></i>  주문<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="order" class="collapse">
              <li><a href="/admin/order/orderList">주문리스트</a></li>
              <li><a href="#">개인결제리스트</a></li>
              <li><a href="#">자동입금확인리스트</a></li>
              <li><a href="#">매출리스트</a></li>
            </ul></li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#board"><i class="fa fa-fw fa-edit"></i> 게시판<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="board" class="collapse">
              <li><a href="#">문의게시판</a></li>
              <li><a href="#">통합게시판</a></li>
            </ul></li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#event"><i class="fa fa-fw fa-tags"></i> 이벤트/쿠폰<i  class="fa fa-fw fa-caret-down"></i></a>
            <ul id="event" class="collapse">
              <li><a href="#">할인쿠폰</a></li>
              <li><a href="#">할인코드</a></li>
              <li><a href="#">할인유입경로</a></li>
              <li><a href="#">할인이벤트</a></li>
              <li><a href="#">사은품이벤트</a></li>
              <li><a href="#">출석체크이벤트</a></li>
            </ul></li>
          <li><a href="javascript:;" data-toggle="collapse" data-target="#statistics"><i class="fa fa-fw fa-bar-chart-o"></i> 통계<i class="fa fa-fw fa-caret-down"></i></a>
            <ul id="statistics" class="collapse">
              <li><a href="#">일별정산</a></li>
              <li><a href="#">월별정산</a></li>
            </ul></li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </nav>