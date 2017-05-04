<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java"%>
<%@ include file="/common/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><bean:message bundle="common" key="common.title.imagUplod"/></title>
	<link type="text/css" href="${BASE_CSS}/basic.css" rel="stylesheet" />
	<style type="text/css">
	<!--
	@import url("${SKIN_CSS_CSS}");
	@import url("${SKIN_CSS_BUTTON}");
	-->
	.tabContent {margin-bottom:8px; background:url(${BASE_IMG}/bg_gray100b.gif) repeat-x bottom;}
	.videoLink {padding-bottom:15px;}
	.videoPreview {padding-top:15px; text-align:center; border-top:1px dotted #D2D2D2;}
	.imageUploader {height:200px; margin-top:-1px; padding:15px; background:#F7F8FD;}
	.imageUploader .priview {float:left; width:150px; margin-right:20px; margin-top:5px;}
	.imageUploader .priview img {padding:3px; border:1px solid #BEC0CD; background:#FFF;}
	.imageUploader .priview .link {padding-bottom:5px;}
	.imageUploader .priview .link .input {height:16px;}
	.imageUploader .option {float:left; width:150px;}
	.imageUploader .option .fileAdd {border-bottom:1px solid #CED4EF;}
	.imageUploader .option .fileAdd img {padding:3px; border:1px solid #BEC0CD; background:#FFF;}
	.imageUploader .option .fileAdd .upload {width:150px; padding:5px 0;}
	.imageUploader .option .fileAdd .guide {width:150px; padding:5px 3px; font:11px 돋움, dotum;}
	.imageUploader .option .imageSize {padding:10px 4px 4px 4px;}
	.imageUploader .option .imageBorder {padding:4px;}
	.imageUploader .option .imageSize h2,
	.imageUploader .option .imageBorder h2 {padding:6px 0 2px 0; font-size:12px;}
	.imageUploader .option .imageSize th,
	.imageUploader .option .imageBorder th {padding:1px 10px 1px 0; font-weight:normal; text-align:left;}
	.imageUploader .option .imageSize td,
	.imageUploader .option .imageBorder td {padding:1px 0;}
	.imageUploader .option .imageAlt {padding:4px;}
	.imageUploader .option .imageAlt h2 {padding:6px 0 2px 0; font-size:12px;}
	</style>
	<script type="text/javascript" src="${BASE_JS}/lib/prototype.js" charset="utf-8"></script>
	<script type="text/javascript" src="${BASE_JS}/common/global.js"></script>
	<script type="text/javascript" src="${BASE_JS}/i18n/cmmbrd/common.js"></script>
	<script type="text/javascript" src="${BASE_JS}/i18n/${USER_LOCALE}/resource/commonMessages.js"></script>
	<script type="text/javascript">
		function fnChangeTab(nIndex, liObj) {
			var liList = liObj.parentNode.getElementsByTagName("li");
			for( var i=0; i<liList.length; i++){
				if((i+1) == nIndex){
					liList[i].className = "selected";
					$('tabPage' + (i+1)).show();
				}else{
					liList[i].className = "";
					$('tabPage' + (i+1)).hide();
				}
			}
		}

		function fnUploadImage(){			
		    var str="";
			var f=document.imgForm;
		    var src = $("image.attachImg").value;
		    if(!src.match(/\.(gif|jpg|png)$/i)) { 
		    	alert(imageupload_alert_selectImageOnlyJpgGifPng); return; }
		    f.action = CONTEXT_ROOT + "image.do";
		    f.submit();

		}

		function _setImageInfo(fileFullUrl,realFileName,fileName,fileUrl,fileSize){
			$("upPreview").src ='${IMAGE_URL}' + fileFullUrl + "/" + realFileName;
			$("upPreview").width="150";
			$("upPreview").height="150";
			$("imgInfo").value = realFileName + "|" + fileName + "|" + fileUrl + "|" + fileSize;
		}

		var linkChanged= true;
		function fnPreviewLinkChange(){
			linkChanged = true;
		}

		function fnPreviewLinkImg(){
			var url = $F("linkUrl");
			if(url == ''){
				alert(imageupload_alert_inputPath);
				$("linkUrl").focus();
				return;
			}
		    if(! url.match(/\.(gif|jpg|png)$/i)) { alert(imageupload_alert_onlySupportJpgGifPng); return; }

			if(url.indexOf("http://") != 0)	url = "http://" + url;
			try{
				$("linkPreview").src =url;
				$("linkPreview").width="150";
				$("linkPreview").height="150";				
				linkChanged = false;
			}catch(e){}
		}

		function fnAddImage(){
			if($("tab1").className=="selected"){
				if($F("imgInfo") == ''){
					alert(imageupload_alert_selectImage);
					$("image.attachImg").focus();
					return;
				}
				var docMode = opener.docMode;
				if(!docMode){
					alert(imageupload_alert_setDocMode);
					return;
				}
				if(!_isValidWidth("upImgWidth")) return;
				
				var docPage;
				if(opener && opener.imgMode && opener.imgMode=='brd') docPage = CONTEXT_ROOT + "board/updn.do";
				else if(opener && opener.imgMode && opener.imgMode=='frmbrd') docPage = CONTEXT_ROOT + "forum/updn.do";
				else docPage = CONTEXT_ROOT + "image.do";
				_ajaxRequest( "cmd=insertImage&image.imgInfo=" +$F("imgInfo") + "&image.docMode=" + docMode,
				               docPage, _responseSelectImage); 
			}else{
				var url = $F("linkUrl");
				if(url == ''){
					alert(imageupload_alert_inputPath);
					$("linkUrl").focus();
					return;
				}
				if(linkChanged){
					alert(imageupload_alert_firstPreview);
					return;
				}
				if(url.indexOf("http://") != 0)	url = "http://" + url;
				if(!_isValidWidth("linkImgWidth")) return;
				var vDim = _getValidImageDim($('linkPreview').src, $F("linkImgWidth"), $F("linkImgHeight"));
				opener._addImageToDaumEditor('',url,
				                    		 vDim.width,
				                   			 vDim.height,
				                    		 $F("linkImgBorder"),
				                             $F("linkImgAlt"));
				self.close();
			}
		}

		function _isValidWidth(objNm){
			if($F(objNm) !=''){
				if(parseInt($F(objNm))>600){
					alert(imageupload_alert_limitImageWidth600);
					$(objNm).focus();
					return false;
				}
			}
			return true;
		}

		function _getImageDim(path){
			var x=new Image;
			x.src=path;
			var iw=x.width;
			var ih=x.height;
			return 	{width:iw,height:ih};
		}

		function _getValidImageDim(path, inW, inH){
			var vW=inW;
			var vH=inH;
			var iDim = _getImageDim(path);
			if(vW =='') vW = iDim.width;
			if(vH =='') vH = iDim.height;
			if(opener && !opener.isOrginalSizeUse && vW>600){
				vH = parseInt(vH) * 600/parseInt(vW);
				vW = 600;
			}
			return {width:vW,height:vH};
		}

		function _responseSelectImage(ajaxObjects){
			var ret = ajaxObjects.responseText.evalJSON() ;
			_showReturnMessage(ret.message);
			if(_isSuccessful(ret.code)){
				var vDim = _getValidImageDim($('upPreview').src, $F("upImgWidth"), $F("upImgHeight"));
				opener._addImageToDaumEditor(ret.imgSeq, '${IMAGE_URL}' + ret.fileFullUrl + ret.realFileName,
						 vDim.width,
						 vDim.height,
						 $F("upImgBorder"),
						 $F("upImgAlt")); 
				self.close();
			}
		}
	</script>
<!-- 팝업사이즈 560*320 -->
</head>
<body>
<form name="imgForm" method="post" target="hiddenFrm" enctype="multipart/form-data" style="margin:0">
<input type="hidden" name="cmd" value="uploadImage"/>
<input type="hidden" name="imgInfo" id="imgInfo"/>
<div id="wrapPop">
	<div class="title">
		<h3>
		<img width="19px" height="19px" src="${BASE_COMPONENT}/daum_editor/images/icon/editor/image_icon.png"/>
		<bean:message bundle="common" key="common.title.imagUplod"/></h3>		
	</div>
	<hr class="hide" />
	<div class="tabMenu_01">
		<ul>
			<li id="tab1" class="selected" onclick="fnChangeTab(1,this);"><span><a href="#"><bean:message bundle="common" key="common.lable.selectImage"/></a></span></li>
			<li id="tab2" onclick="fnChangeTab(2,this);"><span><a href="#"><bean:message bundle="common" key="common.lable.linkOutside"/></a></span></li>
		</ul>
	</div>
	<hr class="hide" />
	<div id="tabPage1" class="tabContent">
		<div class="imageUploader">
			<div>
				<input name="image.attachImg" id="image.attachImg" type="file" class="input" style="width:320px" onchange="fnUploadImage()"/>
			</div>
			<div class="priview">
				<img id="upPreview" name="upPreview" width="150" height="150" src="${BASE_COMPONENT}/daum_editor/images/icon/editor/preview.png"/>
				<div class="fileAdd">
					<div class="guide">
							<bean:message bundle="common" key="common.text.supportFile"/>
					</div>
				</div>					
			</div>
			<div class="option">
				<div class="imageSize">
					<h2><bean:message bundle="common" key="common.title.imageSize"/></h2>
					<table>
						<tr>
							<th><bean:message bundle="common" key="common.lable.width"/></th>
							<td><input id="upImgWidth" name="upImgWidth" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
						<tr>
							<th><bean:message bundle="common" key="common.lable.height"/></th>
							<td><input id="upImgHeight" name="upImgHeight" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
						<tr>
							<th><bean:message bundle="common" key="common.lable.layout"/></th>
							<td><input id="upImgBorder" name="upImgBorder" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
					</table>
				</div>
				<div class="imageAlt">
					<h2><bean:message bundle="common" key="common.title.balloonGuide"/></h2>
					<input id="upImgAlt" name="upImgAlt" type="text" class="input" style="width:130px;ime-mode:active" />
				</div>
			</div>
		</div>
	</div>
	<div id="tabPage2" class="tabContent" style="display:none;">
		<div class="imageUploader">
			<div>
				<input id="linkUrl" name="linkUrl" name="linkImg" type="text" class="input" style="width:270px; height:23px" onchange="fnPreviewLinkChange()"/>
				<span class="btn"><input type="button" value="미리보기" onclick="fnPreviewLinkImg()"/></span>
			</div>
			<div class="priview">
				<img id="linkPreview" name="linkPreview" src="${BASE_COMPONENT}/daum_editor/images/icon/editor/preview.png" width="150" height="150"/>
			<div class="fileAdd">
					<div class="guide">
							<bean:message bundle="common" key="common.text.supportFile"/>
					</div>
				</div>	
			</div>
			<div class="option">
				<div class="imageSize">
					<h2><bean:message bundle="common" key="common.title.imageSize"/></h2>
					<table>
						<tr>
							<th><bean:message bundle="common" key="common.lable.width"/></th>
							<td><input id="linkImgWidth" name="linkImgWidth" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
						<tr>
							<th><bean:message bundle="common" key="common.lable.height"/></th>
							<td><input id="linkImgHeight" name="linkImgHeight" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
						<tr>
							<th><bean:message bundle="common" key="common.lable.layout"/></th>
							<td><input id="linkImgBorder" name="linkImgBorder" type="text" class="input" style="width:50px;ime-mode:disabled;" /> px</td>
						</tr>
					</table>
				</div>
				<div class="imageAlt">
					<h2><bean:message bundle="common" key="common.title.balloonGuide"/></h2>
					<input id="linkImgAlt" name="linkImgAlt" type="text" class="input" style="width:130px;ime-mode:active" />
				</div>
			</div>
		</div>
	</div>
	<hr class="hide" />
	<div class="btnBox">
		<a href="javascript:fnAddImage()" class="btn b"><span><i class="ico_or"><bean:message bundle="common" key="button.label.submit"/></i></span></a>
		<a href="javascript:void(0)" class="btn" onclick="self.close()"><span><bean:message bundle="common" key="button.label.cancel"/></span></a>
	</div>
	<iframe name="hiddenFrm" id="hiddenFrm" width="0" height="0"></iframe>
</div>
</form>
</body>
</html>
