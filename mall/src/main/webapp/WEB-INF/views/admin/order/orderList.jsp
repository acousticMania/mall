<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

        <div id="page-wrapper" style="height: 1000px;">
            <div class="container-fluid">
 
                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <ol class="breadcrumb">
                            <li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main</li>
                            <li class="active">네비게이션: <i class="fa fa-dashboard"></i> Main</li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                <div class="row">
                    <div class="col-lg-12 col-md-6">
                        <h1 class="page-header">주문리스트</h1>
                        <!-- 조회조건 -->
                        <form>
                            <div class="form-inline">
                                <label style="margin-right: 10px">통합검색</label>
                                <select style="height: 28px;width: 100px; margin-right: 10px">
                                    <option>주문번호</option>
                                    <option>주문자명</option>
                                    <option>입금자명</option>
                                    <option >아이디</option>
                                </select>
                                <input type="text" class="form-control" >
                            </div>
                            <div class="form-group">
                                <select style="height: 28px;width: 100px">
                                    <option >주문일</option>
                                    <option>결제일</option>
                                </select>
                                <input type="date" id="datePicker" min='2010-01-01' max='2020-01-01' value="2016-11-26" style="height: 28px; margin-left: 10px;padding-left: 10px;">&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                                <input type="date" id="datePicker" min='2010-01-01' max='2020-01-01' value="2016-11-26" style="height: 28px; padding-left: 10px;">
                            </div>
                            <div class="form-group">
                                <label for="pwd">주문상태 :</label>
                                <input type="checkbox" style="margin-left: 10px"> 주문접수
                                <input type="checkbox" style="margin-left: 10px"> 결제확인
                                <input type="checkbox" style="margin-left: 10px"> 상품준비
                                <input type="checkbox" style="margin-left: 10px"> 출고준비
                                <input type="checkbox" style="margin-left: 10px"> 결제취소
                                <input type="checkbox" style="margin-left: 10px"> 출고완료                              
                                <input type="checkbox" style="margin-left: 10px"> 주문접수
                                <input type="checkbox" style="margin-left: 10px"> 배송중
                                <input type="checkbox" style="margin-left: 10px"> 배송완료
                            </div>
                            <div class="form-group">
                                <label for="pwd">결제수단 :</label>
                                <input type="checkbox" style="margin-left: 10px"> 무통장
                                <input type="checkbox" style="margin-left: 10px"> 카드
                                <input type="checkbox" style="margin-left: 10px"> 휴대폰
                                <input type="checkbox" style="margin-left: 10px"> 계좌이체
                                <input type="checkbox" style="margin-left: 10px"> 포인트결제                             
                                <input type="checkbox" style="margin-left: 10px"> 주문접수
                                <input type="checkbox" style="margin-left: 10px"> 배송중
                                <input type="checkbox" style="margin-left: 10px"> 배송완료
                            </div>
                            <div class="row" style="padding-left: 10px">
                            <button type="button" class="btn btn-primary btn-sm" style="float: right;">조회</button>
                            </div>
                        </form>
                        <!-- 버튼 -->
                        <!-- <div class="row" style="padding: 10px">
                        <button type="button" class="btn btn-primary btn-sm" style="float: right;">조회</button>
                        </div> -->
                        <!-- 리스트 -->
                        <div class="row">
                        <table class="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th style="text-align: center">선택</th>
                                <th style="text-align: center">중요</th>
                                <th style="text-align: center">번호</th>
                                <th style="text-align: center">주문일시</th>
                                <th style="text-align: center">주문번호</th>
                                <th style="text-align: center">주문상품</th>
                                <th style="text-align: center">갯수</th>
                                <th style="text-align: center">출고</th>
                                <th style="text-align: center">받는분 / 주문자</th>
                                <th style="text-align: center">결제수단/일시</th>
                                <th style="text-align: center">결제금액</th>
                                <th style="text-align: center">처리상태</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style="text-align: center"><input type="checkbox" name="selectchk" value=""></td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">1</td>
                                <td style="text-align: center">16-11-26 04:34</td>
                                <td style="text-align: center">2016112614522517533</td>
                                <td>STRIPE TEE / 세인트 단가라</td>
                                <td style="text-align: center">3</td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">배윤정 / 배윤정</td>
                                <td style="text-align: center">일반결제</td>
                                <td style="text-align: center">24,410</td>
                                <td style="text-align: center">주문접수</td>
                              </tr>
                              <tr>
                                <td style="text-align: center"><input type="checkbox" name="selectchk" value=""></td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">2</td>
                                <td style="text-align: center">16-11-26 04:34</td>
                                <td style="text-align: center">2016112614522517533</td>
                                <td>씨큐 8구 멀티 안마기 CQ-108</td>
                                <td style="text-align: center">1</td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">홍준석 / 홍준석</td>
                                <td style="text-align: center">포인트결제</td>
                                <td style="text-align: center">82,000</td>
                                <td style="text-align: center">결제확인</td>
                              </tr>
                              <tr>
                                <td style="text-align: center"><input type="checkbox" name="selectchk" value=""></td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">3</td>
                                <td style="text-align: center">16-11-26 04:34</td>
                                <td style="text-align: center">2016112614522517533</td>
                                <td>국내 제작 따뜻한 넥워머/머플러</td>
                                <td style="text-align: center">1</td>
                                <td style="text-align: center"></td>
                                <td style="text-align: center">김희선 / 김희선</td>
                                <td style="text-align: center">카카오페이</td>
                                <td style="text-align: center">30,500</td>
                                <td style="text-align: center">상품준비</td>
                              </tr>
                            </tbody>
                        </table>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->