<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active"><i class="fa fa-user"></i> 상품</li>
							<li class="active">일반상품</li>
						</ol>
					</div> 
				</div>
				<!-- /.row -->

                
				<div class="row">
					<div class="col-lg-12 col-md-12">
			            <h1 class="page-header">
			              일반상품 리스트
			            </h1>
			            <div class="row">
			                <div class="col-xs-3">
			                    <input class="form-control">
			                </div>
			                <button type="button" class="btn btn-info">검색</button>
			            </div>
			            <div class="panel panel-default">
			            <div class="row">
                            <div class="col-sm-1" style="text-align:center;">
                                <label>카테고리</label>
                            </div>
                            <div class="col-sm-11">
                                <div class="col-xs-3">
                                    <select class="form-control input-sm">
                                      <option>1차분류</option>
                                      <option>스킨케어</option>
                                      <option>메이크업</option>
                                      <option>바디케어</option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <select class="form-control input-sm">
                                      <option>2차분류</option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <select class="form-control input-sm">
                                      <option>3차분류</option>
                                    </select>
                                </div>
                            </div>
                        </div>
			            <div class="row">
                            <div class="col-sm-1" style="text-align:center;">
                                <label>브랜드</label>
                            </div>
                            <div class="col-sm-11">
                                <div class="col-xs-3">
	                                <select class="form-control input-sm">
	                                  <option>1차분류</option>
	                                  <option>국내브랜드</option>
	                                  <option>해외브랜드</option>
	                                </select>
                                </div>
                                <div class="col-xs-3">
	                                <select class="form-control input-sm">
	                                  <option>2차분류</option>
	                                </select>
                                </div>
                                <div class="col-xs-3">
	                                <select class="form-control input-sm">
	                                  <option>3차분류</option>
	                                </select>
                                </div>
                            </div>
                        </div>
			            <div class="row">
                            <div class="col-sm-1" style="text-align:center;">
                                <label>날짜</label>
                            </div>
                            <div class="col-sm-11">
                                <div class="col-xs-3">
                                    <select class="form-control input-sm">
                                      <option>등록일</option>
                                      <option>수정일</option>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="toPrice">
                                </div><div style="float:left;">-</div>
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="fromPrice">
                                </div>
                            </div>
                        </div>
			            <div class="row">
                            <div class="col-sm-1" style="text-align:center;">
                                <label>가격</label>
                            </div>
                            <div class="col-sm-2">
	                            <div class="col-xs-3">
	                                <select class="form-control input-sm">
	                                  <option>정상가</option>
	                                  <option>할인가</option>
	                                </select>
	                            </div>
	                            <div class="col-xs-2">
	                                <input class="form-control input-sm" id="fromPrice">
	                            </div><div style="float:left;">-</div>
	                            <div class="col-xs-2">
	                                <input class="form-control input-sm" id="toPrice">
	                            </div>
                            </div>
                            <div class="col-sm-1" style="text-align:center;">
                                <label>페이지뷰</label>
                            </div>
                            <div class="col-sm-1">
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="fromPageView">
                                </div><div style="float:left;">-</div>
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="toPageView">
                                </div>
                            </div>
                            <div class="col-sm-1" style="text-align:center;">
                                <label>재고</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="fromStock">
                                </div><div style="float:left;">-</div>
                                <div class="col-xs-2">
                                    <input class="form-control input-sm" id="toStock">
                                </div>
                            </div>
                        </div>
			            <div class="row">
                            <div class="col-sm-1" style="text-align:center;">
                                <label>상태</label>
                            </div>
                            <div class="col-sm-3">
                                <div class="checkbox">
                                    <label class="checkbox-inline"><input type="checkbox" value="">정상</label>
                                    <label class="checkbox-inline"><input type="checkbox" value="">품절</label>
                                    <label class="checkbox-inline"><input type="checkbox" value="">재고확보중</label>
                                    <label class="checkbox-inline"><input type="checkbox" value="">판매중지</label>
                                </div>
                            </div>
                            <div class="col-sm-1" style="text-align:center;">
                                <label>노출</label>
                            </div>
                            <div class="col-sm-4">
                                <div class="checkbox">
                                    <label class="checkbox-inline"><input type="checkbox" value="">노출</label>
                                    <label class="checkbox-inline"><input type="checkbox" value="">미노출</label>
                                </div>
                            </div>
                        </div>
						 </div>
					</div>
					</div>
				<div class="row">
	<div class="col-lg-12 col-md-12">
	<div><p>총 318개</p></div>
    <table class="table table-bordered table-hover">
	    <thead>
	        <tr>
	            <th style="text-align:center;"><input type="checkbox" value=""></th>
	            <th style="text-align:center;">번호</th>
	            <th style="text-align:center;">상품명</th>
	            <th style="text-align:center;">정가</th>
	            <th style="text-align:center;">할인가</th>
	            <th style="text-align:center;">재고/가용</th>
	            <th style="text-align:center;">배송비</th>
	            <th style="text-align:center;">구매</th>
	            <th style="text-align:center;">페이지뷰</th>
	            <th style="text-align:center;">등록일/수정일</th>
	            <th style="text-align:center;">상태</th>
	            <th style="text-align:center;">노출</th>
	            <th style="text-align:center;">관리</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td><input type="checkbox" value=""></td>
	            <td>1</td>
	            <td><a>옵티마이저 부스팅 로션 안티-링클</a></td>
	            <td>48,335</td>
	            <td>36,000</td>
	            <td>99/100</td>
	            <td>2,500</td>
	            <td><a>조회</a></td>
	            <td>16</td>
	            <td>2016-01-01 16:20:07<br>2016-11-25 08:37:54</td>
	            <td>정상</td>
	            <td>노출</td>
	            <td><button>수정</button><button>복사</button></td>
	        </tr>
	        <tr>
	            <td><input type="checkbox" value=""></td>
	            <td>2</td>
	            <td><a>리-뉴트리브 소프트닝 로션</a></td>
	            <td>68,376</td>
	            <td>54,320</td>
	            <td>87/230</td>
	            <td>2,500</td>
	            <td><a>조회</a></td>
	            <td>10</td>
	            <td>2016-01-01 16:20:07<br>2016-11-25 08:37:54</td>
	            <td>정상</td>
	            <td>노출</td>
	            <td><button>수정</button><button>복사</button></td>
	        </tr>
	        <!-- <tr>
	            <th scope="row">2</th>
	            <td>Danny</td>
	            <td>Collins</td>
	            <td>@dennis</td>
	            <td>
	                <a class="blue-text"><i class="fa fa-user"></i></a>
	                <a class="teal-text"><i class="fa fa-pencil"></i></a>
	                <a class="red-text"><i class="fa fa-times"></i></a>
	            </td>
	        </tr>
	        <tr>
	            <th scope="row">3</th>
	            <td>Clara</td>
	            <td>Ericson</td>
	            <td>@claris</td>
	            <td>
	               <a class="blue-text"><i class="fa fa-user"></i></a>
	                <a class="teal-text"><i class="fa fa-pencil"></i></a>
	                <a class="red-text"><i class="fa fa-times"></i></a>
	            </td>
	        </tr> -->
	
	    </tbody>
    </table>

			</div>
			</div>
				
		</div>
			<!-- /.container-fluid -->

		</div>
		<!-- /#page-wrapper -->