<%
String browserIeYn = com.naon.util.HttpUtil.getIeYn(request);
%>

<c:choose>
	<c:when test="${WAS=='weblogic'}"></c:when>
	<c:otherwise>
	<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java"%>
	</c:otherwise>
</c:choose>
		<script language="javascript">
		<!--
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;

		if (month < 10) {
			month = "0" + month;
		}
		var day = date.getDate();
		if (day < 10) {
			day = "0" + day;
		}

		var NFU_App_Width           = "572";
		var NFU_App_Height          = "185"; //초기치높이:75, 높이가 75이면 1행, 높이가 85이면 2행, 3행부터:높이85에서 20씩 증가시킬것.
		var NFU_ActiveX_Width       = "572";
		var NFU_ActiveX_Height      = "185";

		if("${OBJECT_WIDTH}" != ""){
			NFU_App_Width = "${OBJECT_WIDTH}";
			NFU_ActiveX_Width = "${OBJECT_WIDTH}";
		}

		if("${OBJECT_HEIGHT}" != ""){
			NFU_App_Height = "${OBJECT_HEIGHT}";
			NFU_ActiveX_Height = "${OBJECT_HEIGHT}";
		}

		var NFU_QuotaCheckYn = 'N';
		if("${QUOTA_CHECK_YN}" != ""){
			NFU_QuotaCheckYn = "${QUOTA_CHECK_YN}";
		}

		//activeX
		var NFU_ActiveX_Mode        = "activeXUpload";
		var NFU_Codebase            = "${BASE_COMPONENT}/upload/XOfficeMail.cab#version=1,0,1,39";

		//flex
		var NFU_Flex_Mode           = "flexUpload";
		var NFU_AppUploader_Id      = "FileUploadApp";
		var NFU_ProgressUploader_Id = "FileUploadProgress";
		var NFU_Flex_FileFilter          = "모든파일|:|*.*";
		var NFU_AppFlash_Url        = "${BASE_ROOT}/flexfileupload/com/flexdev/file/FileUploadApp.swf";
		var NFU_ProgressFlash_Url   = "${BASE_ROOT}/flexfileupload/com/flexdev/file/FileUploadProgress.swf";
		var NFU_Math_Random         = Math.random();
		var NFU_Progress_Width      = "430";
		var NFU_Progress_Height     = "290";
		var NFU_Grid_View_Count     = (parseInt(NFU_App_Height)-85) / 20 + 2;
		var NFU_App_Css_Url        	= "${BASE_ROOT}/flexfileupload/com/flexdev/file/css/blue_style.swf";
		var NFU_Progress_Css_Url   	= "${BASE_ROOT}/flexfileupload/com/flexdev/file/css/blue_style.swf";
		var NFU_Lang                = "${USER_LOCALE}";
		var NFU_ResourceUrl         = "${BASE_ROOT}/flexfileupload/com/flexdev/file/asfile/locale/resource/resource_"+NFU_Lang+".xml";
		var NFU_Docdomain_YN        = "N"; //메일서비스인 경우만 'Y',  그외 서비스는 'N'
		//common
		var NFU_UploadUrl           = "${EKP_URL}/nfuUpload";
		var NFU_FileFilter          = "모든파일|:|*.*|:|이미지(*.jpg)|:|*.jpg|:|*.jpg;*.gif;*.png;*.bmp|:|*.jpg;*.gif;*.png;*.bmp|:|*.avi;*.mpg;*.mpeg;*.asf;*.swf;*.wmv;*.mov|:|*.avi;*.mpg;*.mpeg;*.asf;*.swf;*.wmv;*.mov";
		var NFU_DataFieldName       = "nfuupload";
		var NFU_ModuleName          = "${ATTACH_MODULE}";
		var NFU_FileUrl             = year + "/" + month + "/" + day;
		var NFU_Filebox_Use_YN      = "${FILEBOX_UPLOAD_USE_YN}";
		var NFU_MaxTotalFileSize    = "${ATTACH_MAX_SIZE}";
		var NFU_MaxFileCount        = "${ATTACH_CNT}";
		var NFU_File_Overwrite      = "false";
		var NFU_Limit_Ext           = "${ATTACH_LIMIT_EXT}";
		var NFU_TimeStamp           = "";
		var NFU_MaxEachFileSize     = "${ATTACH_MAX_EACH_SIZE}";
		var NFU_Port                = "${BASE_PORT}";
		var NFU_Service_Parameter   = "${ATTACH_SERVICE_PARAM}";
		var NFU_CONTEXT = "${BASE_ROOT}";

		if(NFU_ModuleName == 'filebox'){
			NFU_Filebox_Use_YN = 'N';
		}

		//flex
		var FxUpload = new FXUpload({
			fx_app_uploader_id : NFU_AppUploader_Id,
			fx_progress_uploader_id : NFU_ProgressUploader_Id,
			fx_upload_url : NFU_UploadUrl,
			fx_file_filter : NFU_Flex_FileFilter,
			fx_data_field_name : NFU_DataFieldName,
			fx_app_flash_url : NFU_AppFlash_Url,
			fx_progress_flash_url : NFU_ProgressFlash_Url,
			fx_module_name : NFU_ModuleName,
			fx_mode : NFU_Flex_Mode,
			fx_Docdomain_yn:NFU_Docdomain_YN,
			fx_file_url : NFU_FileUrl,
			fx_app_width : NFU_App_Width,
			fx_app_height : NFU_App_Height,
			fx_progress_width : NFU_Progress_Width,
			fx_progress_height : NFU_Progress_Height,
			fx_app_css_url : NFU_App_Css_Url,
			fx_Progress_css_url : NFU_Progress_Css_Url,
			fx_filebox_use_yn : NFU_Filebox_Use_YN,
			fx_max_total_file_size : NFU_MaxTotalFileSize,
			fx_max_file_count : NFU_MaxFileCount,
			fx_file_overwrite : NFU_File_Overwrite,
			fx_limit_ext : NFU_Limit_Ext,
			fx_timestamp : NFU_TimeStamp,
			fx_max_each_file_size : NFU_MaxEachFileSize,
			fx_resource_url : NFU_ResourceUrl,
			fx_lang : NFU_Lang,
			fx_service_parameter : NFU_Service_Parameter,
			fx_grid_view_count : NFU_Grid_View_Count,
			fx_math_random : NFU_Math_Random
		});

		function flexUploadComplete(){
			var uploadFileInfo = decodeJSON(completeJson);
			initJson();
			fnUploadComplete(uploadFileInfo);
		}

		function decodeJSON(jsonString){
			var json = Ext.util.JSON.decode("["+jsonString+"]");

			var fileInfo = "";
			if (json.size() > 0) {
				for (var i = 0; i < json.size(); i++) {
					fileInfo += json[i].NFU_RealFileName + ":";
					fileInfo += json[i].NFU_LocalFileName + ":";
					fileInfo += json[i].NFU_FileUrl + ":";
					fileInfo += json[i].NFU_FileSize;
					fileInfo += "|";
				}
			}

			return fileInfo;
		}

		var XbigmailError = new Array();
			XbigmailError[4001] = common_alert_uploadInitialError;
			XbigmailError[4002] = common_alert_httpSessionError;
			XbigmailError[4003] = common_alert_httpConnectionError;
			XbigmailError[4004] = common_alert_httpConnectinReattemptError;
			XbigmailError[4005] = common_alert_httpRequestError;
			XbigmailError[4006] = common_alert_httpHeaderAddError;
			XbigmailError[4007] = common_alert_httpHeaderItemError;
			XbigmailError[4008] = common_alert_httpSendginError;
			XbigmailError[4009] = common_alert_httpEndingError;
			XbigmailError[4010] = common_alert_httpHeaderSendingError;
			XbigmailError[4011] = common_alert_httpDataSendingError;
			XbigmailError[4012] = common_alert_httpTailSendingError;
			XbigmailError[4013] = common_alert_uploadFileOpenError;
			XbigmailError[4014] = common_alert_uploadFileReadError;
			XbigmailError[4015] = common_alert_memoryQuotaError;
			XbigmailError[4016] = common_alert_sendingMailCancelled;
			XbigmailError[4018] = common_alert_webpageInputFieldAddError;
			XbigmailError[4019] = common_alert_webpageFooterAddError;
			XbigmailError[4020] = common_alert_uploadFileWriteError;
			XbigmailError[4021] = common_alert_httpEndingError;

		//activeX
		var AxUpload = new AXUpload({
			ax_upload_url : NFU_UploadUrl,
			ax_file_filter : NFU_FileFilter,
			ax_data_field_name : NFU_DataFieldName,
			ax_module_name : NFU_ModuleName,
			ax_mode : NFU_ActiveX_Mode,
			ax_file_url : NFU_FileUrl,
			ax_docdomain_yn : NFU_Docdomain_YN,
			ax_filebox_use_yn : NFU_Filebox_Use_YN,
			ax_max_total_file_size : NFU_MaxTotalFileSize,
			ax_max_file_count : NFU_MaxFileCount,
			ax_file_overwrite : NFU_File_Overwrite,
			ax_limit_ext : NFU_Limit_Ext,
			ax_timestamp : NFU_TimeStamp,
			ax_max_each_file_size : NFU_MaxEachFileSize,
			ax_lang : NFU_Lang,
			ax_port : NFU_Port,
			ax_service_parameter : NFU_Service_Parameter,
			ax_codebase : NFU_Codebase,
			ax_width : NFU_ActiveX_Width,
			ax_height : NFU_ActiveX_Height,
			ax_context : NFU_CONTEXT
		});

		function callUploadStart(msg){
			$('flexLayer1').style.display	= "block";

			if( $("flexTab").className == "selected"){
				if(getFileCount() != 0){
					// 첨부파일시 메시지 표시
					if(msg)alert(msg);
					if(NFU_QuotaCheckYn == 'Y'){
						checkSize(NFU_ModuleName,getFileSizes());
					}else{
						FxUpload.callFlexUploadStart();
					}
				}else{
					fnUploadComplete("");
				}
			}else{
				if(NFU_QuotaCheckYn == 'Y'){
					/**
					 *  $("XOfficeMail").GetFileList()의 리턴 형태
					 *  파일사이즈^파일이름^파일아이디|파일사이즈^파일이름^파일아이디|...
					 */
					var totalFileSize = 0;
					var s = $("XOfficeMail").GetFileList();
					var fileInfoList = s.split('|');
					var fileInfoListSize = fileInfoList.size() - 1;
					for(var i = 0 ; i < fileInfoListSize  ; i++){
						// 첨부파일시 메시지 표시

						var fileInfo = fileInfoList[i].split('^');
						totalFileSize += fileInfo;
					}
					if(i > 0 && msg)alert(msg);
					checkSize(NFU_ModuleName,totalFileSize);
				}else{
					//AxUpload.callActiveXUploadStart();
					AxUpload.callSaveForModify();
				}
			}
		}

		/**
		 * 서버의 남은 모듈별 사용량의 잔여량과 현재사이즈를 비교하여 업로드 여부를 결정한다.
		 */
		function checkSize(moduleName,fileSize){
			var url = CONTEXT_ROOT + "quota.do?cmd=getUploadCheck";
			var data = "moduleName=" + moduleName;
			data += "&fileSize=" + fileSize;
			var ajaxObjects = new Ajax.Request(url, {
				method : 'post',
				parameters : data,
				onComplete : checkSizeResponse
			});
			function checkSizeResponse(ajaxObjects){
				var ret = ajaxObjects.responseText.evalJSON();
				if(ret == 'ERROR'){
					alert(common_alert_error);
				}else{
					if (ret.success){
						if( $("flexTab").className == "selected"){
							FxUpload.callFlexUploadStart();
						}else{
							//AxUpload.callActiveXUploadStart();
							AxUpload.callSaveForModify();
						}
					}else{
						/*
						var msg = '용량이 초과하였습니다.\n모듈명:'+ ret.moduleName;
						msg += '\n업로드파일크기:'+ret.fileSize;
						msg += '\n잔여용량:'+ret.remainSize;
						*/
						var msg = common_alert_spaceNotEnough;
						alert(msg);
					}
				}

			}

		}

		function callAxUploadStart(){
			AxUpload.callActiveXUploadStart();
		}

		function callFxUploadStart(){
			if(getFileCount() != 0){
				FxUpload.callFlexUploadStart();
			}else{
				fnUploadComplete("");
			}
		}

		function addFileInfo(fileInfo){
			if($("mode")!=null && $F("mode")=="gappAttach"){
				addAttachFileBox(fileInfo);
			}
			
			if( $("flexTab").className == "selected"){
				flashPlayer.flexAddFileInfo(fileInfo);
			}else{				
				$("XOfficeMail").AddFileBox(fileInfo);
			}
		}

		function getSessionId(){
			return "<%=request.getRequestedSessionId()%>";
		}

		function openWindow(param){
			var url = "${BASE_ROOT}/filebox/fileboxFront.do?cmd=commonFilebox&from=nfuUpload&domainyn="+param;
			fnPopupXP2(url, 'mailWin', 800,430);
		}

		function openFilebox(param){
			openWindow(param);
		}

		function checkDeleteAttachFile(chkListEle, fileId) {

			var checkListElement;
			if($("flexTab").className == "selected"){
				checkListElement = $("flexFileList").getElementsByTagName("input");
			}else if($("activexTab").className == "selected"){
				checkListElement = $("activexFileList").getElementsByTagName("input");
			}

			if (typeof(checkListElement) == 'undefined') {
			} else if (typeof(checkListElement.length) == 'undefined') {
			} else {
				for (i = 0; i < checkListElement.length; i++) {
					if (checkListElement[i].value == fileId){
						checkListElement[i].checked = true;
					}
				}
			}
		}


		function initCheckbox(parent){
			var childList = parent.getElementsByTagName("input");
			for (i=0; i<childList.length; i++){
				if(childList[i].getAttribute("type") == 'checkbox'){
					childList[i].checked = false;
				}
			}
		}

		var checkboxName = "";
		function fnOpenFile(objName,downloadUrl,fileId,fileName,fileSize){
			checkboxName = objName;
			//var downloadUrl = "http://${BASE_HOST}${BASE_BOARD}/updn.do?cmd=download&fileSeq=" + fileId;
			$("XOfficeMail").DownForModify(downloadUrl, fileId, fileName, fileSize);
		}
		
		//파일 드래그드롭, 또는 삭제 시 파밀명|파일명|파일명... 을 반환한다.
		function fnSetFileList(FileList){
			if(typeof addAttachFileSort != 'undefined'){
				addAttachFileSort(FileList);	//순서변경
			}
		}

		//-->
		</script>

		<script for="XOfficeMail" event="UploadEnd(UpFileList)" language="javascript">
		// NORMAL_ATTACH_UPLOADED : 일반첨부파일 업로드 완료시
		// EMPTY_FILE : 첨부파일 없는 경우
		// UPLOAD_USER_CANCEL : 사용자가 취소한 경우
			var errorcode = parseInt(UpFileList);

			if(errorcode != NaN && errorcode == 4016) {
				alert(XbigmailError[errorcode]);
				return;
			} else if(errorcode != NaN && errorcode >= 4001 && errorcode <= 4021) {
				alert(XbigmailError[errorcode]);
				return;
			} else {
				UpFileList = decodeURIComponent(UpFileList);
				var retCode = UpFileList.substr(0,1);
				if(retCode == 0){//success
					var uploadFileInfo = decodeJSON(UpFileList.substr(1,UpFileList.length));
					fnUploadComplete(uploadFileInfo);
				}else if(retCode == 1){//fail
					alert(UpFileList.substr(1,UpFileList.length));
				}
			}
		</script>

		<script for="XOfficeMail" event="OpenFileBox(param)" language="javascript">
			openWindow(param);
		</script>

		<script for="XOfficeMail" event="DeleteFileForModify(fileId)" language="javascript">
			checkDeleteAttachFile(checkboxName,fileId);
		</script>
		
		<script for="XOfficeMail" event="FileList(FileList)" language="javascript">
			fnSetFileList(FileList);
		</script>

		<div id="flexLayer1" class="uloadState" style="display:none; <c:if test ="${NOLEFT == 'Y' }"> left : 380px </c:if>">
			<script language="javascript">
				FxUpload.getProgressFlashTag();
			</script>
		</div>
		<iframe id="flexFrame" class="uloadState_ie6"></iframe>

		<c:if test="${'activex' eq UPLOAD_MODE}">
			<div class="multiUploader">
				<ul id="tab" class="tabBox_01">
					<li id="flexTab"></li>
					<li id="activexTab" class="selected"></li>
				</ul>
				<div id="activex" class="tabContent">
					<script language="javascript">
						AxUpload.getActiveXObjectTag();
					</script>
				</div>
			</div>
		</c:if>

		<c:if test="${'flex' eq UPLOAD_MODE}">
			<div class="multiUploader">
				<ul id="tab" class="tabBox_01">
					<li id="flexTab" class="selected"></li>
					<li id="activexTab"></li>
				</ul>
				<div id="flex" class="tabContent">
					<script language="javascript">
						FxUpload.getAppFlashTag();
						detectFlashPlayer();
					</script>
				</div>
			</div>
		</c:if>

		<c:if test="${'activex&flex' eq UPLOAD_MODE}">
			<c:choose>
				<c:when test="${UPLOAD_SELECTED_TAB == 'flex'}">
					<div class="multiUploader">
						<ul id="tab" class="tabBox_01">
							<li id="flexTab" class="selected"><a href="#" rel="flex" onfocus="this.blur();">FLEX</a></li>
							<%if(browserIeYn.equals("Y")){%>
							<li id="activexTab"><a href="#" rel="activex" onfocus="this.blur();">ActiveX</a></li>
							<%}%>
						</ul>
						<div id="flex" class="tabContent">
							<script language="javascript">
								FxUpload.getAppFlashTag();
								detectFlashPlayer();
							</script>
						</div>
						<div id="activex" class="tabContent" style="display:none;">
							<script language="javascript">
								AxUpload.getActiveXObjectTag();
							</script>
						</div>
						<script type="text/javascript">
							initializetabcontent("tab");
						</script>
					</div>
				</c:when>
				<c:otherwise>
					<div class="multiUploader">
						<ul id="tab" class="tabBox_01">
						    <%if(browserIeYn.equals("Y")){%>
							<li id="activexTab" class="selected"><a href="#" rel="activex" onfocus="this.blur();">ActiveX</a></li>							
							<li id="flexTab" style="display:none;"><a href="#" rel="flex" onfocus="this.blur();">FLEX</a></li>
							<%}else{%>
							<li id="flexTab" class="selected"><a href="#" rel="flex" onfocus="this.blur();">FLEX</a></li>
							<%}%>
						</ul>
						<div id="flex" class="tabContent" <%if(browserIeYn.equals("Y")){%>style="display:none;"<%}%>>
							<script language="javascript">
								FxUpload.getAppFlashTag();
								detectFlashPlayer();
							</script>
						</div>
						<div id="activex" class="tabContent" <%if(browserIeYn.equals("N")){%>style="display:none;"<%}%>>
							<script language="javascript">
								AxUpload.getActiveXObjectTag();
							</script>
						</div>
						<script type="text/javascript">
							initializetabcontent("tab");
						</script>
					</div>
				</c:otherwise>
			</c:choose>
		</c:if>