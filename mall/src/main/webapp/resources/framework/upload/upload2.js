;(function($, window) {

	'use strict';

	/** 업로드를 관리하는 객체이다.*/
	var UploadManager = {
		init: function() {
			this.uploaders = {};
			this.o = $({});
			return this;
		},
		createUpload : function(id, option) {
			var uploader = $('#' + id);
			uploader.attr('data-url', option.uploadUrl || frameworkProperties.context + '/service/upload/upload.do');
//			var template = option.template || 'default';

			uploader.append(
					$('<div id="file_upload_layer" title="파일 첨부">'
							+ '<div class="tit_bar hide">'
							+ '	<h3>파일 첨부</h3>'
							+ '</div>'
							+ '<div class="multi_upload_box">'
							+ '	<div class="tabbable">'
							+ '		<ul class="nav nav_tabs">'
							+ '			<li class="active"><a href="#tab1_1" data-toggle="tab">내 PC</a></li>'
							+ '			<li><a href="#tab1_2" data-toggle="tab">파일함</a></li>'
							+ '			<li><a href="#tab1_3" data-toggle="tab">구글 드라이브</a></li>'
							+ '		</ul>'
							+ '		<div class="tab_cont">'
							+ '	 		<div id="tab1_1" class="tab_pane fade in active">'
							+ '				<!-- jQuery File Upload -->'
							+ '				<form id="fileupload" action="server/php/" method="POST" enctype="multipart/form-data">'
							+ '					<div class="file_upload_manger">'
							+ '						<div class="fileupload-buttonbar">'
							+ '							<div class="fl">'
							+ '								<span class="btn fileinput-button">'
							+ '									<i class="ico ico_atch"></i>'
							+ '									<span>파일 선택</span>'
							+ '									<input type="file" name="files[]" title="파일첨부" multiple>'
							+ '								</span>'
							+ '								<span class="file_upload_info">'
							+ '									<span>첨부용량</span>'
							+ '									<span class="total-size"></span> / '
							+ '									<span class="max-size"></span> ,'
							+ '									<span>첨부개수</span>'
							+ '									<span class="total-count"></span> 개 / '
							+ '									<span class="max-count"></span> 개'
							+ '								</span>'
							+ '							</div>'
							+ '							<div class="fr fileupload-progress fade">'
							+ '								<div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
							+ '									<div class="bar" style="width:0%;"></div>'
							+ '								</div>'
							+ '								<div class="progress-extended"><!--316.08 kbite/s | 00:00:14 | 17.41% | 98.16 KB / 563.67 KB--></div>'
							+ '							</div>'
							+ '						</div>'
							+ '						<!-- The table listing the files available for upload/download -->'
							+ '						<table role="presentation" class="attach_file_tbl"><tbody class="files" data-toggle="modal-gallery" data-target="#modal-gallery"></tbody></table>'
							+ '					</div>'
							+ '				</form>'							
							+ '				<div class="attach_guide_box">'
							+ '					<span class="tip">첨부할 파일을 선택하세요.</span>'
							+ '					<span class="drag_tip"><i class="ico"></i> 첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.</span>'
							+ '				</div>'
							+ '			</div>'
							+ '			<div id="tab1_2" class="tab_pane fade">파일함에서 선택</div>'
							+ '			<div id="tab1_3" class="tab_pane fade">구글 드라이브에서 선택</div>'
							+ '		</div>'
							+ '	</div>'
							+ '</div>'
							+ '<div class="btn_area">'
							+ '	<button id="uploadBtn" type="submit" class="btn btn_med btn_pri"><strong>저장</strong></button>'
							+ '	<button type="button" onclick="closeDialog(\'file_upload_layer\')" class="btn btn_med">닫기</button>'
							+ '</div>'
							+ '</div>'
					)
			);

			uploader.fileupload({
				change: function (e, data) {
					uploader.errors = [];
					return true;
				},
				drop: function (e, data) {
					uploader.errors = [];
					return true;
				},
				copy: function (e, data) {
					uploader.errors = [];
					return true;
				},
				added: function(e, data) {
					if (option.onAddFile) {
						option.onAddFile(e, data);
					}
				},
				failed: function(e, data) {
					if (option.onCancel) {
						option.onCancel(e, data);
					}
				},
				//파일추가시 에러발생시 에러 보여주는 방식처리
				errorOnAdd: function (e, data) {
					uploader.errors = uploader.errors || [];
					if ($.inArray(data.errorCd, uploader.errors) == -1) {
						uploader.errors.push(data.errorCd);
						//alert대신 다른 형태로 표시 ?
						alert(uploadMessage.errors[data.errorCd]);
					}
				}
			});
			if (option.uploadType === 'image') {
				option.allowedExtension = 'jpg,jpeg,gif,png';
			}
			uploader.fileupload('option', {
				'allowedExtension': option.allowedExtension && option.allowedExtension.replace(/;/, ','),
				'limitedExtension': option.limitedExtension && option.limitedExtension.replace(/;/, ','),
				'maxNumberOfFiles': option.maxNumberOfFiles,
				'maxFileSize': option.maxFileSize,
				'maxTotalFileSize': option.maxTotalFileSize,
				'formData': {module: option.module, subModule: option.subModule, uploadType: option.uploadType},
				'dropZone': uploader,
				'uploadType': option.uploadType,
				'userUploadable': option.userUploadable
			});
			uploader.fileupload('option', 'uploadComplete', function(){				
				UploadManager.o.trigger('finish', this.id);
			});
			uploader.fileupload('showLimitOption');
			uploader.fileupload('appendFileInfo', option.fileInfo);			
			//uploader 등록.
			this.uploaders[id] = uploader;
		},
		getFileInfos: function(id) {
			return this.uploaders[id].fileupload('getFileInfos');
		},
		upload: function(finishCallback, context) {
			this.o.off();
			this.o.on('finish', $.proxy(this.finish, this));
			this.o.on('finishAll', $.proxy(finishCallback, context || this));
			for (var i in this.uploaders) {
				this.uploaders[i].uploadState = 'started';
				this.uploaders[i].fileupload('startUpload');
			}
		},
		finish: function(e, id) {				
			this.uploaders[id].uploadState = 'finished';

			if(this.isFinished()) {
				this.o.trigger('finishAll');
			}
		},
		isFinished: function() {
			for (var i in this.uploaders) {
				if(this.uploaders[i].uploadState != 'finished') {
					return false;
				}
			}
			return true;
		}
	};

	UploadManager.init();
	window.UploadManager = UploadManager;

})(jQuery, window);
