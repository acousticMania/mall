;(function($, window) {

	'use strict';

	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}

	/** 업로드를 관리하는 객체이다.*/
	var UploadManager = {
		instance: function() {
			var manager = Object.create(this.prototype);
			return manager;
		},
		prototype: {
			init: function() {
				this.uploaders = {};
				this.o = $({});
				return this;
			},
			createUpload : function(id, option) {
				var me = this;
				var uploader = $('#' + id);
				uploader.attr('data-url', option.uploadUrl || frameworkProperties.context + '/service/file/upload');
	//			var template = option.template || 'default';

				if(!option.byUiWidget) {
					uploader.append(
							$('			<div class="fileupload-buttonbar">'
									+ '		<div class="btn fileinput-button">'
									+ '			<i class="ico ico_atch"></i> <span>내 PC</span>'
									+ '			<input type="file" name="files[]" multiple>'
									+ '		</div> '
									/*+ '		<button type="button" class="btn">파일함</button>'*/
									/*+ '		<button type="button" class="btn">구글 드라이브</button>'*/
									+ '		<button type="reset" title="초기화" class="btn cancel"><i class="ico ico_rfsh"><span>취소</span></i></button>'
									+ '		<button type="button" title="삭제" class="btn delete" style="display:none;"><i class="ico ico_rfsh"><span>삭제</span></i></button>'
									+ '		<span class="fileupload-loading"></span>'
									+ ' </div>'
									+ ' <div class="fileupload-statebar">'
									+ '		<div class="fl">'
									+ '			<span class="file_upload_info">'
									+ '				<span>첨부용량</span>'
									+ '				<span class="total-size"></span> /'
									+ '				<span class="max-size"></span>,'
									+ '				<span>첨부개수</span>'
									+ '				<span class="total-count"></span>개 /'
									+ '				<span class="max-count"></span>개'
									+ '			</span>'
									+ '		</div>'
									+ '		<div class="fr">'
									+ '			<div class="size-progress" style="display:none;">'
									+ '				<div class="prgsbar" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
									+ '					<div class="bar" style="width:0%;"></div>'
									+ '				</div>'
									+ '			</div>'
									+ '			<div class="fileupload-progress fade">'
									+ '				<div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
									+ '					<div class="bar" style="width:0%;"></div>'
									+ '				</div>'
									+ '				<div class="progress-extended">&nbsp;</div>'
									+ '			</div>'
									+ '		</div>'
									+ '	</div>'
									+ '	<div class="attach_guide_box">'
									+ '		<span class="tip">첨부할 파일을 선택하세요.</span>'
									+ '		<span class="drag_tip"><i class="ico"></i> 첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.</span>'
									+ '	</div>'
									+ '	<table role="presentation" class="attach_file_tbl">'
									+ '		<tbody class="files"></tbody>'
									+ '	</table>'
							)
					);
				}

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
					destroyed: function(e, data) {
						if (option.onDelete) {
							option.onDelete(e, data);
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
					//replace가 첫번째만 동작하여 gi를 추가하여 해당 패턴에 대해 모두 replace되도록 수정 
					'allowedExtension': option.allowedExtension && option.allowedExtension.replace(/;/gi, ','),
					'limitedExtension': option.limitedExtension && option.limitedExtension.replace(/;/gi, ','),
					'maxNumberOfFiles': option.maxNumberOfFiles,
					'maxFileSize': option.maxFileSize,
					'maxTotalFileSize': option.maxTotalFileSize,
					'formData': {module: option.module, subModule: option.subModule, uploadType: option.uploadType},
					'dropZone': option.dropZone || uploader.find('.attach_guide_box'),
					'uploadType': option.uploadType,
					'userUploadable': option.userUploadable
				});
				uploader.fileupload('option', 'uploadComplete', function(){
					me.o.trigger('finish', this.id);
				});
				// 이 콜백 함수를 추가한 이유는 파일 업로드 레이어 타입일 때 레이어 초기화를 위해 업로드된 파일은 
                // 파일 목록에서 삭제 해주는데 download 목록으로 바뀌기 전에는 파일이 정상적으로 삭제되지 않아 이 부분을 추가함
				uploader.fileupload('option', 'afterRenderDownload', function(){
					me.o.trigger('afterRenderDownload', this.id);
				});
				uploader.fileupload('showLimitOption');
				uploader.fileupload('appendFileInfo', option.fileInfo);
				
				//uploader 등록.
				this.uploaders[id] = uploader;
			},
			getFileInfos: function(id) {
				return this.uploaders[id] ?  this.uploaders[id].fileupload('getFileInfos') : [];
			},
			getFileCount: function(id) {
				return this.uploaders[id] ?  this.uploaders[id].fileupload('getFileCount') : [];
			},
			upload: function(finishCallback, context, afterRenderCallback) {
				this.o.off();
				this.o.on('finish', $.proxy(this.finish, this));
				this.o.on('finishAll', $.proxy(finishCallback, context || this));
				this.o.on('afterRenderDownload', $.proxy(afterRenderCallback || function(){}, context || this));
				var uploaderCnt = 0;
				for (var i in this.uploaders) {
					this.uploaders[i].uploadState = 'started';
					this.uploaders[i].fileupload('startUpload');
					uploaderCnt ++;
				}
				if (uploaderCnt == 0) {
					this.o.trigger('finishAll');
				}
			},
			validFileSize: function() {
				for (var i in this.uploaders) {
					if(!this.uploaders[i].fileupload('validFileSize')) {
						return false;
					}
				}
				return true;
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
			},
			afterRenderDownload : function(e, id) {
				this.o.trigger('afterRenderDownload');
			},
			
			/*addFiles : function(id, e, files){				
				var that = this.uploaders[id].data('fileupload');				
				that._adjustMaxNumberOfFiles(-files.length);
				files.valid = that._validate(files);
				
				if(!files.valid) {
                    that._adjustMaxNumberOfFiles(files.length);
//                    if (that.options.errorOnAdd) {
                        that._trigger('errorOnAdd', e, {
                            errorCd: files[0].error,
                            file: files[0]
                        });
//                    } else {
//                        alert(files[0].error);
//                    }
                    return;
                }
                that._showTotalStatus({files : files}, 1);
                
                $.each(files, function(){
                	$('#'+id).find('.files').append('<tr class="template-upload fade in">'
    						+'<td class="preview"><span class="fade"></span></td>'
    						+'<td class="name"><span>'+ this.name +'</span></td>'
    						+'<td class="size"><span>'+ that._formatFileSize(this.size) +'</span></td>'
    						+'<td class="progress"><div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bar" style="width:0%;"></div></div></td><td class="start"><button class="btn btn_sml" style="display:none"><span>업로드</span></button></td>'
    						+'<td class="cancel"><button class="btn btn_sml"><span>취소</span></button></td></tr>');
                });
			},*/
			
			ajustStatus : function(id, size, numberOfFile){
				var that = this.uploaders[id].data('fileupload');
				var uploadInfo = this.uploaders[id].find('.file_upload_info');
				that.options.maxNumberOfFiles = numberOfFile;
				that.options.maxFileSize = size;
				that.options.maxTotalFileSize = size;
				//첨부 용량 업데이트
				uploadInfo.find('.max-size').text(that._formatFileSize(size));
				//전체 개수 업데이트
				uploadInfo.find('.max-count').text(numberOfFile);
			},
			
			// 파일 컴포넌트에 파일 목록을 추가할 수 있는 함수 추가
			appendFiles : function(id, files){
				var uploader = this.uploaders[id];
				$(uploader).fileupload('appendFileInfo', files);
			},
			
			destroy : function(id){
				var uploader = this.uploaders[id];
				$(uploader).fileupload('destroy');
				delete this.uploaders[id];
			}
		},

		popupFileBox: function(uploadMgr, id, options) {
			this.fbUploadManager = uploadMgr;
			this.fbUploaderId = id;
			this.fbOptions = options;

			var module = options.module;
			var uploadType = options.uploadType;						
			var allowedExtension = '';			
			if(uploadType == 'movie'){
				allowedExtension = options.allowedExtension;
			}		
			var url = frameworkProperties.context+"/filebox/fileboxFront.do?cmd=commonFilebox&from=nfuUpload&domainyn=N&module="+module+"&uploadType="+uploadType+"&allowedExtension="+allowedExtension;
			
			if($.popupWindow) {
				$.popupWindow({
					windowName : 'mailWin',
					centerBrowser : 1,
					width :  '800px',
					height : '430px',
					resizable : 0,
					windowURL : url
				});
			} else {
				fnPopupXP2(url, 'mailWin', 800,430);
			}
		},

		addFilesByFileBox: function(filesInfo) {
			var me = window.UploadManager;
			var fileList = [];

			if(!$.trim(filesInfo)) {
				return;
			}

			$.each(filesInfo.split('|'), function(i, fileInfo){
				var fArr = fileInfo.split(';');
				var file = {
					cud: 1,
					realFileName: fArr[0],
					localFileName: fArr[1].substring(fArr[1].lastIndexOf('/')+1),
					fileUrl: fArr[2],
					fileSize: Number(fArr[3])
				};
				fileList.push(file);

				if (me.fbOptions.onAddFile) {
					me.fbOptions.onAddFile(null, {files: [file]});
				}
			});

			me.fbUploadManager.appendFiles(me.fbUploaderId, fileList);
		}
	};

//	UploadManager.init();
	window.UploadManager = UploadManager;

})(jQuery, window);
