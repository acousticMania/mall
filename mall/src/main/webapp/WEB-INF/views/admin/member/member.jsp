<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active"><i class="fa fa-user"></i> 회원</li>
							<li class="active"> 회원관리</li>
						</ol>
					</div> 
				</div>
				
				<!-- /.row -->				
        <div class="row">          
          <div class="col-lg-12 col-md-6"> 
            <h1 class="page-header">
              회원관리
            </h1>
              <div class="form-group form-inline">
                  <form class="form-inline">
                      <div class="form-group has-success has-feedback">
                          <div class="input-group">
                              <div class="input-group-btn">
                                  <button class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                                      <span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu" role="menu" aria-labelledby="single-button">
                                      <li>
                                          <a href="javascript:;">전체</a></li>
                                      </li>
                                      <li>
                                          <a href="javascript:;">손님</a></li>
                                      </li>
                                      <li>
                                          <a href="javascript:;">준회원</a></li>
                                      </li>
                                      <li>
                                          <a href="javascript:;">정회원</a></li>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <input type="text" class="form-control">
                          <button class="btn btn-default btn-danger" >검색</button>
                      </div>
                  </form>
              </div>
          </div>
        </div>
				<div class="row">
				  
					<div class="col-lg-12 col-md-6">
						<table class="table table-bordered table-hover">
					    <thead>
					      <tr>
					        <th><input type="checkbox"></th>
					        <th>번호</th>
					        <th>승인</th>
                  <th>등급</th>					        
                  <th>유형</th>					        
                  <th>아이디</th>               
                  <th>이름</th>               
                  <th>이메일</th>               
                  <th>핸드폰</th>               
                  <th>가입일/최종방문</th>	                
                  <th>적립금</th>                
                  <th>포인트</th>				        
					      </tr>
					    </thead>
					    <tbody>
					      <tr>
					        <td><input type="checkbox"></td>
                  <td>1</td>
                  <td>대기</td>
                  <td>손님</td>                 
                  <td>개인</td>                 
                  <td>aa1</td>               
                  <td>홍길동</td>               
                  <td>jupiter@naver.com</td>               
                  <td>010-2020-2020</td>               
                  <td>2015-05-06<br/>2016-06-19</td>                 
                  <td>10,000</td>                
                  <td>1,000</td>        
					      </tr>
					      <tr>
                  <td><input type="checkbox"></td>
                  <td>2</td>
                  <td>완료</td>
                  <td>준회원</td>                 
                  <td>개인</td>                 
                  <td>aa2</td>               
                  <td>홍길동2</td>               
                  <td>jupiter2@naver.com</td>               
                  <td>010-1020-2020</td>               
                  <td>2015-07-06<br/>2016-06-19</td>                 
                  <td>20,000</td>                
                  <td>1,000</td>        
					      </tr>
					    </tbody>
					  </table>
					</div>
				</div>
				<div class="row">
          <div class="col-lg-12 col-md-6">
						<ul class="pagination pagination-sm">
						  <li><a href="#">&lt;</a></li>
						  <li><a href="#">1</a></li>
						  <li><a href="#">2</a></li>
						  <li><a href="#">3</a></li>
						  <li><a href="#">4</a></li>
						  <li><a href="#">5</a></li>
						  <li><a href="#">&gt;</a></li>
						</ul>
					</div>
				</div>

			</div>
			<!-- /.container-fluid -->

		</div>
		<!-- /#page-wrapper -->