<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

		<div id="page-wrapper" style="height: 1000px;">

			<div class="container-fluid">
 
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<ol class="breadcrumb">
							<li class="active">네비게이션: <i class="fa fa-dashboard"></i> 주문</li>
							<li class="active">네비게이션: <i class="fa fa-dashboard"></i> 주리스</li>
						</ol>
					</div> 
				</div>
				<!-- /.row -->

				<div class="row">
					<div class="col-lg-12 col-md-6">
					
            <h1 class="page-header">
              제목: <img class="img-thumbnail" width="80px" src="/images/logo.png" alt="" >쇼핑몰 관리자 페이지 <small>이렇게 구성하자</small>
            </h1>
						본문 들어가는 부분
						
						tiles2 적용
						
						아이콘 적용: http://www.w3schools.com/icons/fontawesome_icons_webapp.asp
						
						bootstrap: http://www.w3schools.com/bootstrap/default.asp
						
						1. 개발 및 기획 방향 : 화면 퍼블리싱을 먼저 진행을 하고 
						
						<script>
						/* 디버그 */
						function debug(text){
						  var debugLayerObj = $("#debug-layer")[0];

						  text = var_dump(text);
						  
						  if(!debugLayerObj){
						    var debugLayerWrapObj = $("<div class='relative' style='z-index:1000'><div id='debug-layer'></div></div>").prependTo('body');
						    debugLayerObj = $("#debug-layer")[0];

						    $(debugLayerObj)
						    .css({
						      'color'   : 'red',
						      'font-size' : '11px',
						      'padding' : '10px',
						      'z-index' : '1000'
						    })
						    .dialog({
						      'title':'Javascript Debug',
						      'width'   : '400',
						      'height'  : '200',
						      'position'  : 'center'
						    });
						  }

						  var nowTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

						  $(debugLayerObj).dialog('open').html('[' + nowTime + ']<pre> ' + text + '</pre><br />' + debugLayerObj.innerHTML);
						}
						/* var_dump */
						function var_dump(variable, maxdepth, _depth){
						  var type = _gettype(variable);
						  var length_str = type == 'Array' || type == 'String' ? '(' + variable.length + ')' : '';
						  var indents = '';
						  _depth = _depth ? _depth : 0;
						  var return_str = type + length_str + ' ';
						  if(maxdepth && maxdepth == _depth){
						    try{
						      if(type == 'String'){
						        return_str += '"' + _addslashes(variable) + '"';
						      }
						      else if(type == 'Null'){
						        return_str += 'null';
						      }
						      else{
						        return_str += variable.toString();
						      }
						    }
						    catch(e){
						      try{
						        return_str += variable;
						      }
						      catch(e){
						        return_str += "[ERROR]" + e.name + ' : ' + e.message;
						        return_str = return_str.replace(/\s*$/,'');
						      }
						    }
						    return return_str;
						  }
						  for(var i=0; i<_depth+1; i++){
						    indents += '\t';
						  }
						  if(type == 'Object' || (type != 'Null' && type != 'String' && type != 'Boolean' && type != 'Array' && type != 'Number' && type != 'Function')){
						    return_str += '{\n';
						    var tmp_prop = new Array();
						    for(var prop in variable){
						      tmp_prop.push(prop);
						    }
						    for(var i=0; i<tmp_prop.length; i++){
						      return_str += indents + '["' + _addslashes(tmp_prop[i]) + '"] => ';
						      try{
						        return_str += var_dump(variable[tmp_prop[i]], maxdepth, _depth + 1) + "\n";
						      }
						      catch(e){
						        return_str += "[ERROR]" + e.name + ' : ' + e.message;
						        return_str = return_str.replace(/\s*$/,'\n');
						      }
						    }
						    return_str += indents.substr(1) + '}';
						  }
						  else if(type == 'Array'){
						    return_str += '{\n';
						    for(var i=0; i<variable.length; i++){
						      return_str += indents + '['+i+'] => ';
						      try{
						        return_str += var_dump(variable[i], maxdepth, _depth + 1) + "\n";
						      }
						      catch(e){
						        return_str += "[ERROR]" + e.name + ' : ' + e.message;
						        return_str = return_str.replace(/\s*$/,'\n');
						      }
						    }
						    return_str += indents.substr(1) + '}';
						  }
						  else if(type == 'String'){
						    return_str += '"' + _addslashes(variable) + '"';
						  }
						  else if(type == 'Null'){
						    return_str += 'null';
						  }
						  else{
						    return_str += variable.toString();
						  }
						  return return_str;
						}
						debug("000");
						</script>
					</div>
				</div>

			</div>
			<!-- /.container-fluid -->

		</div>
		<!-- /#page-wrapper -->