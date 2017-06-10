
$.widget("ui.twestUpload", {
	uploadManager : null,
	totalSize : 0,
	totalNumberOfFile : 0,
	uploadComponentName : 'uploadComponent', 
	
	options : {
		dialogName : 'twestUploadLayer_',
		uploadComponentNameSpace : 'uploadComponentTarget_',
		allowId : '',
		type : 1,
		buttonType : 'default',		
		uploadUrl: '',
		module: '',
		subModule: 'file',
		allowedExtension: 'doc,xls,ppt,docx,xlsx,pptx,jpg,jpeg,png,gif',
		maxNumberOfFiles: 1,
		maxFileSize: 30 * 1024 * 1024,
		maxTotalFileSize: 30 * 1024 * 1024,
		uploadType: 'file',
		fileInfo: [],
		imageInfo: [],
		showStateBar : true,
		uploadedCallback : function(){},
		attBtnId : '',
		imgBtnId : '',
		filebox_upload_use_yn: 'Y', //(frameworkProperties && frameworkProperties.fileboxUploadUseYn=='Y' ? 'Y' : 'N'),
		galleryPluginOption : {		// 이미지 타입의 갤러리 플러그인 옵션을 설정 할 수 있다.
			indicatorViewCnt : 10
        }
	},

	_create: function() {
		var instance = $(this.element).data('uploadComponent');
		
		if(instance){
			this.refresh();
		}else{
			this.init();
		}
	},
	
	init : function(){
		// 접속한 웹브라우저가 IE9이하일 경우 파일첨부 드래그 안내글 숨김.
		if(!window._uploadIeVerChecked) {
			var ieVer = twest.util.ieVersion();

			if (ieVer > 0 && ieVer < 10) {
				if($('body')) $('body').addClass('ie');
			}
			window._uploadIeVerChecked = true;
		}
		if(this.options.allowId == ''){
			this.uploadManager = UploadManager.instance();
			this.uploadManager.init();
		}else{
			try{
				this.uploadManager = $('#'+this.options.allowId).twestUpload('getUploadManager');
			}catch(e){
				this.uploadManager = UploadManager.instance();
				this.uploadManager.init();
			}			
		}
		
		switch(this.options.type){
		case 1 :
		case 2 :
			this.innerType();
			break;
		case 3 :
		case 4 :
			this.layerType();
			break;
		case 5 :
			this.doubleType();
			break;
		case 6 :
			this.doubleType();
			break;
		default :
			this.innerType();
			break;
		}
		
		$(this.element).data('uploadComponent',this);
	},
	
	/**
	 * 화면상에서 바로 파일을 선택 하는 경우
	 */
	innerType : function(){
		var me = this;
		var isIeVerChecked = false;
		var ieVer = twest.util.ieVersion();
		if (ieVer > 0 && ieVer < 10) {
			isIeVerChecked = true;
		}
		this.uploadComponentName = $(this.element).attr('id');
		
		$(this.element).html(Mustache.render(this.template.innerType, {
			isSingleType : this.options.type == 2 ? true : false,
			isFileType : this.options.uploadType == 'file' ? true : false,
			showStateBar : this.options.showStateBar,
			filebox_upload_use_yn : this.options.filebox_upload_use_yn == 'Y' ? true : false,
			isIeVerChecked : isIeVerChecked
		}));
		
		//파일함 버튼 이벤트
		$(this.element).find('.fileupload-buttonbar > #filebox').click(function() {
			me.popupFileBox();
		});

		//파일업로드 생성
		this.createUploadComponent(this.uploadComponentName, this.options);
	},
	
	/**
	 * 레이어에서 파일을 선택하고 화면에 정보를 넘겨주는 경우
	 */
	layerType : function(){
		var me = this;
		this.uploadComponentName = this.options.uploadComponentNameSpace + $(this.element).attr('id');
		
		if(this.options.fileInfo.length > 0){
			for(var i=0; i < this.options.fileInfo.length; i++){
				this.totalSize += this.options.fileInfo[i].fileSize;
				this.totalNumberOfFile++;
			}
		}
		
		var param = {
				isSingleType : this.options.type == 4 ? true : false,
				isImageType : this.options.uploadType == 'image' ? true : false,
				isFileType : this.options.uploadType == 'file' ? true : false,		
				isDefaultBtnType : this.options.buttonType == 'default' ? true : false, 
				existFile : this.options.fileInfo.length > 0 ? true : false,
				existImage : this.options.fileInfo.length > 0 ? true : false,
				totalSize : this.formatFileSize(this.totalSize),
				maxSize : this.formatFileSize(this.options.maxTotalFileSize),
				totalCount : this.totalNumberOfFile,
				maxCount : this.options.maxNumberOfFiles,
				id : $(this.element).attr('id'),
				dialogName : this.options.dialogName + $(this.element).attr('id'),
				uploadComponentName : this.uploadComponentName,
				showStateBar : this.options.showStateBar,
				filebox_upload_use_yn : this.options.filebox_upload_use_yn == 'Y' ? true : false
		};
		
		//버튼 아이디를 인자로 받아서 처리
		if(this.options.attBtnId){
			$(this.element).html(Mustache.render(this.template.noBtnLayerType, param));
		}else{
			$(this.element).html(Mustache.render(this.template.layerType, param));
		}

		// 갤러리 영역 추가
		if(this.options.uploadType == 'image' && !this.options.galleryPluginOption.container){
			var gallaryTempl = Mustache.render(this.template.galleryTemplate, param);
			$(this.element).append(gallaryTempl);
		}
		
		// 레이어 타입일 때 기존에 있던 파일목록이 업로드 레이어 보여지지 않도록 컴포넌트 생성 시 파일 목록을 제거 한다.
		var options = $.extend(true, {}, this.options);
		delete options['fileInfo'];
		
		//파일함 버튼 이벤트
		$(this.element).find('.fileupload-buttonbar > #filebox').click(function(){
			me.popupFileBox();
		});

		this.createUploadComponent(this.uploadComponentName, options);
		this.layerTypeBind();
		
		//버튼에 툴팁 표시 이벤트 등록
		if(this.options.buttonType == 'small'){
			$(this.element).find('.btn_bar').tooltip({ selector: "button" });
		}
		
		if(this.options.type == 4){
			this.showStatebar('hide');
			$(this.element).find('.attach_del_all').addClass('mgt');
		}		
	},
	
	doubleType : function(){
		
		this.uploadComponentName = this.options.uploadComponentNameSpace + $(this.element).attr('id');
		var files = [];
		var images = [];
		
		if(this.options.fileInfo.length > 0){
			for(var i=0; i < this.options.fileInfo.length; i++){
				this.totalSize += this.options.fileInfo[i].fileSize;
				this.totalNumberOfFile++;
			}
		}
		
		if(this.options.imageInfo.length > 0){
			for(var i=0; i < this.options.imageInfo.length; i++){
				this.totalSize += this.options.imageInfo[i].fileSize;
				this.totalNumberOfFile++;
			}
		}
		
		var param = {
				isSingleType : this.options.type == 6 ? true : false,
				isImageType : true,
				isFileType : true,		
				isDefaultBtnType : this.options.buttonType == 'default' ? true : false, 
				existFile : this.options.fileInfo.length > 0 ? true : false,
				existImage : this.options.imageInfo.length > 0 ? true : false,
				totalSize : this.formatFileSize(this.totalSize),
				maxSize : this.formatFileSize(this.options.maxTotalFileSize),
				totalCount : this.totalNumberOfFile,
				maxCount : this.options.maxNumberOfFiles,
				id : $(this.element).attr('id'),
				dialogName : this.options.dialogName + $(this.element).attr('id'),
				uploadComponentName : this.uploadComponentName,
				files : files,
				images : images,
				showStateBar : this.options.showStateBar
		};
		
		//버튼 아이디를 인자로 받아서 처리
		if(this.options.type == 6){
			$(this.element).html(Mustache.render(this.template.noBtnLayerType, param));
		}else{
			$(this.element).html(Mustache.render(this.template.layerType, param));
		}
		
		// 갤러리 영역 추가
		if(!this.options.galleryPluginOption.container){
			var gallaryTempl = Mustache.render(this.template.galleryTemplate, param);
			$(this.element).append(gallaryTempl);
		}
		this.doubleTypeBind();
		
		//버튼에 툴팁 표시 이벤트 등록
		if(this.options.buttonType == 'small'){
			$(this.element).find('.btn_bar').tooltip({ selector: "button" });
		}
	},
	
	/**
	 * 파일과 이미지를 같이 사용하는 방식을 제외한 레어를 사용하는 경우의 이벤트를 걸어주는 함수입니다.
	 */
	layerTypeBind : function(){
		var self = this;
		
		//파일 추가
		if(this.options.fileInfo.length > 0){
			for(var i=0; i < this.options.fileInfo.length; i++){
				var file = this.options.fileInfo[i];
				var param = {
						//fileUrl : '/gw/upload'+file.fileUrl,
						fileUrl : frameworkProperties.context+'/inc/file/fileView?fileUrl='+file.fileUrl+'&fileName='+file.localFileName,
						fileName : file.localFileName,
						name : file.realFileName,
						size : this.formatFileSize(file.fileSize),
						showStateBar : this.options.showStateBar,
						extension : file.realFileName.substring(file.realFileName.lastIndexOf('.')+1, file.realFileName.length).toLowerCase() 
				};
				
				var newEl = null;
				
				if(this.options.uploadType == 'image'){
					newEl = $(Mustache.render(this.template.imageItemTemplate, param));
				}else{
					newEl = $(Mustache.render(this.template.fileItemTemplate, param));
				}
				
				$(newEl).data(file);
				
				$(newEl).find('button').click(function(){
					var obj = $(this).closest('li');				
					self.deleteItem($(obj).data());
					$(obj).remove();
				});
				//이미지의 경우 클릭 하면 갤러리 플러그인으로 표시
				if(!(this.options.uploadType == 'image' && $(this.element).naonGallery)){
					$(newEl).find('a').click(function(event){
						event.preventDefault();
						var obj = $(this).closest('li');
						var data = $(obj).data();
						self.download({
							fileUrl : data.fileUrl,
							fileName : data.fileName,
							realFileName : data.realFileName,
							mimeType : data.type
						});
						
						return false;
					});
				}
				
				if(this.options.uploadType == 'image'){
					$('#'+$(this.element).attr('id') + '_imageList').append(newEl);
				}else{
					$('#'+$(this.element).attr('id') + '_attachList').append(newEl);
				}
			}
			//이미지의 경우 클릭 하면 갤러리 플러그인으로 표시
			if(this.options.uploadType == 'image' && $(this.element).naonGallery){
				if(!this.options.galleryPluginOption.container){
					this.options.galleryPluginOption.container = '#'+$(this.element).attr('id')+'_blueimp-gallery';
				}				
				$('#'+$(this.element).attr('id') + '_imageList').naonGallery(this.options.galleryPluginOption);
			}
			
			this.checkFileCntAndSize();
		}

		var attBtn;

		if(this.options.attBtnId){	//버튼 아이디를 인자로 받아서 처리		
			attBtn = $('#'+this.options.attBtnId);
		}else{
			attBtn = $(this.element).find('.btn_bar > button');
		}

		attBtn.click(function(){
			//self.options
			//업로드 dialog 팝업.
			self.openDialog(function(ui, event){
				$(this).dialog('destroy');
			});
			//기존에 첨부된 파일 목록 삭제
			$('#'+self.uploadComponentName).find('[type="reset"]').trigger('click');	//업로드 되지 않았으나 선택한 파일 목록을 지운다.
			$('#'+self.uploadComponentName).find('.files > .template-download').find('.btn_sml').each(function(){
				var template = $(this).closest('.template-download');
				var data = template.data('data');
				$.each(data.result, function(index, file){
					file.cud = 1;
				});
			});
			$('#'+self.uploadComponentName).find('.fileupload-buttonbar > .delete').trigger('click');	//업로드가 완료된 목록을 지운다.
		});
		
		$('#'+this.options.dialogName + $(this.element).attr('id')+'_closeBtn').click(function(){
			self.closeDialog();
		});
		
		$('#'+this.options.dialogName + $(this.element).attr('id')+'_submitBtn').click(function(){
			
			var totalCount = Number($(this).closest('.btn_area').siblings('.multi_upload_box').find('.total-count').text());
			var maxCount = Number($(this).closest('.btn_area').siblings('.multi_upload_box').find('.max-count').text());
			
			if(maxCount < totalCount){
				alert(uploadMessage.errors.maxNumberOfFiles);
				return;
			}
			
			//업로드 호출.
			self.uploadManager.upload(function(){
				if(!self._checkValidFileSize()) {
					return false;
				}
				self.options.uploadedCallback();
				self.afterCallback();
				self.closeDialog();
			}, undefined);
		});
		
		$(this.element).find('.attach_del_all').find('.close').click(function(){
			if(self.options.uploadType == 'image'){
				$('#'+$(self.element).attr('id') + '_imageList').html('');
			}else{
				$('#'+$(self.element).attr('id') + '_attachList').html('');
			}
			self.totalSize = 0;
			self.totalNumberOfFile = 0;
			self.showTotalStatus();
			self.showStatebar('hide');
			$(self.element).find('.attach_del_all').hide();
		});
	},
	
	/**
	 * 파일과 이미지를 같이 사용하는 방식의 이벤트를 걸어주는 함수입니다.
	 */
	doubleTypeBind : function(){
		var self = this;
		
		if(this.options.fileInfo.length > 0 || this.options.imageInfo.length > 0){
			for(var i=0; i < this.options.fileInfo.length; i++){
				var file = this.options.fileInfo[i];				
				var param = {
						fileUrl : frameworkProperties.context+'/file/upload'+file.fileUrl,
						fileName : file.localFileName,
						name : file.realFileName,
						size : this.formatFileSize(file.fileSize),
						showStateBar : this.options.showStateBar,
						extension : file.realFileName.substring(file.realFileName.lastIndexOf('.')+1, file.realFileName.length).toLowerCase()
				};
				
				var newEl = $(Mustache.render(this.template.fileItemTemplate, param));
				
				$(newEl).data(file);
				
				$(newEl).find('button').click(function(){
					var obj = $(this).closest('li');				
					self.deleteItem($(obj).data());
					$(obj).remove();
				});
				
				if(!(this.options.uploadType == 'image' && $(this.element).naonGallery)){
					$(newEl).find('a').click(function(event){
						event.preventDefault();
						var obj = $(this).closest('li');
						var data = $(obj).data();
						self.download({
							fileUrl : data.fileUrl,
							fileName : data.fileName,
							realFileName : data.realFileName,
							mimeType : data.type						
						});
						
						return false;
					});
				}
				
				$(this.element).find('.file > ul').append(newEl);
			}
			
			for(var i=0; i < this.options.imageInfo.length; i++){
				var file = this.options.imageInfo[i];
				var param = {
						//fileUrl : '/gw/upload'+file.fileUrl,
						fileUrl : frameworkProperties.context+'/inc/file/fileView?fileUrl='+file.fileUrl+'&fileName='+file.localFileName,
						fileName : file.localFileName,
						name : file.realFileName,
						size : this.formatFileSize(file.fileSize)
				};
				
				var newEl = $(Mustache.render(this.template.imageItemTemplate, param));
				
				$(newEl).data(file);
				
				$(newEl).find('button').click(function(){
					var obj = $(this).closest('li');				
					self.deleteItem($(obj).data());
					$(obj).remove();
				});
				
				if(!(this.options.uploadType == 'image' && $(this.element).naonGallery)){
					$(newEl).find('a').click(function(event){
						event.preventDefault();
						var obj = $(this).closest('li');
						var data = $(obj).data();
						self.download({
							fileUrl : data.fileUrl,
							fileName : data.fileName,
							realFileName : data.realFileName,
							mimeType : data.type						    
						});
						
						return false;
					});
				}
				
				$(this.element).find('.img_lst > ul').append(newEl);
			}
			
			//이미지의 경우 클릭 하면 갤러리 플러그인으로 표시			
			if(this.options.uploadType == 'image' && $(this.element).naonGallery){
				if(!this.options.galleryPluginOption.container){
					this.options.galleryPluginOption.container = '#'+$(this.element).attr('id')+'_blueimp-gallery';
				}
				$('#'+$(this.element).attr('id') + '_imageList').naonGallery(this.options.galleryPluginOption);
			}
			this.checkFileCntAndSize();
		}
		
		var attBtn;
		var imgBtn;
	
		if(this.options.type == 6){	//버튼 아이디를 인자로 받아서 처리		
			attBtn = $('#'+this.options.attBtnId);
			imgBtn = $('#'+this.options.imgBtnId);
		}else{
			attBtn = $(this.element).find('.btn_bar').find('.ico_atch').parent();
			imgBtn = $(this.element).find('.btn_bar').find('.ico_camera').parent();
		}
		
		attBtn.click(function(){
			self.createUploadComponent(self.uploadComponentName, {
				uploadUrl: self.options.uploadUrl,
				module: self.options.module,
				subModule: 'file',
				allowedExtension: self.options.allowedExtension,
				maxNumberOfFiles: self.options.maxNumberOfFiles,
				maxFileSize: self.options.maxFileSize,
				maxTotalFileSize: self.options.maxTotalFileSize,
				uploadType: 'file',
				fileInfo:  []
			});
			$('#'+self.uploadComponentName).find('.files').html('');
			self.openDialog(function(ui, event){
				$(this).dialog('destroy');
				$('#'+self.uploadComponentName).find('[type="reset"]').trigger('click');	//업로드 되지 않았으나 선택한 파일 목록을 지운다.
				$('#'+self.uploadComponentName).find('.fileupload-buttonbar > .delete').trigger('click');	//업로드가 완료된 목록을 지운다.
				self.uploadManager.destroy(self.uploadComponentName);
			});			
		});
		
		imgBtn.click(function(){
			self.createUploadComponent(self.uploadComponentName, {
				uploadUrl: self.options.uploadUrl,
				module: self.options.module,
				subModule: 'image',
				allowedExtension: 'jpg,jpeg,png,gif',
				maxNumberOfFiles: self.options.maxNumberOfFiles,
				maxFileSize: self.options.maxFileSize,
				maxTotalFileSize: self.options.maxTotalFileSize,
				uploadType: 'image',
				fileInfo: []
			});
			
			$('#'+self.uploadComponentName).find('.files').html('');
			self.openDialog(function(ui, event){
				$(this).dialog('destroy');
				$('#'+self.uploadComponentName).find('[type="reset"]').trigger('click');	//업로드 되지 않았으나 선택한 파일 목록을 지운다.
				$('#'+self.uploadComponentName).find('.fileupload-buttonbar > .delete').trigger('click');	//업로드가 완료된 목록을 지운다.
				self.uploadManager.destroy(self.uploadComponentName);
			});
		});
		
		$('#'+this.options.dialogName + $(this.element).attr('id')+'_closeBtn').click(function(){
			self.closeDialog();
		});
		
		$('#'+this.options.dialogName + $(this.element).attr('id')+'_submitBtn').click(function(){
			//업로드 호출.
			self.uploadManager.upload(function(){
				if(!self._checkValidFileSize()) {
					return false;
				}
				self.options.uploadedCallback();
				self.afterCallbackOfDoubleType();
			});
		});
		
		$(this.element).find('.attach_file').find('.close').click(function(){
			$(self.element).find('.file > ul').html('');
			self.totalSize = 0;
			$(self.element).find('.img_lst > ul').children().each(function(){
				var data = $(this).data();
				self.totalSize += data.size;
			});
			
			self.totalNumberOfFile = $(self.element).find('.img_lst > ul').children().length;
			self.showTotalStatus();
			
			if(self.totalNumberOfFile == 0){
				self.showStatebar('hide');
			}
			
			$(self.element).find('.attach_file').hide();
		});
		
		$(this.element).find('.attach_img').find('.close').click(function(){
			$(self.element).find('.img_lst > ul').html('');
			self.totalSize = 0;
			
			$(self.element).find('.file > ul').children().each(function(){
				var data = $(this).data();
				self.totalSize += data.size;
			});
			
			self.totalNumberOfFile = $(self.element).find('.file > ul').children().length;
			self.showTotalStatus();
			
			if(self.totalNumberOfFile == 0){
				self.showStatebar('hide');
			}
			
			$(self.element).find('.attach_img').hide();
		});
	},
	
	/**
	 * 업로드 컴포넌트를 생성하는 함수입니다.
	 * @param id target 엘리먼트 아이디
	 * @param opt 옵션
	 */
	createUploadComponent : function(id, opt){
		//파일업로드 생성
		opt.byUiWidget = true;
		this.uploadManager.createUpload(id, opt);
	},
	
	/**
	 * 다이얼로그를 생성하고 띄우는 함수입니다. 이 함수는 레이어형에만 사용되는 함수이며
	 * 다이얼로그를 띄울때 다이얼로그를 초기화 하는 로직을 포함하고 있습니다.
	 */
	openDialog : function(closeCallBack, beforeCloseCallBack){
		//다이얼로그 생성
		$('#'+this.options.dialogName + $(this.element).attr('id')).dialog({
			autoOpen: true,
			resizable: false,
			show: "fade",
			hide: "fade",
			width: "750",
			close : closeCallBack,
			beforeClose : !!beforeCloseCallBack ? beforeCloseCallBack : function(){}
		});

		//기존에 업로드된 파일 사이즈를 제외한 나머지만큼을 최대 사이즈로 잡아 준다.
		var maxSize = this.options.maxTotalFileSize - this.totalSize;
		//기존에 업로드된 파일 개수를 제외한 나머지 만큼을 최대 파일개수로 잡아 준다.
		var maxNumberOfFile = this.options.maxNumberOfFiles - this.totalNumberOfFile; 
		
		//변경된 최대 사이즈 및 최대 개수를 업로드 컴포넌트에 적용한다.
		this.uploadManager.ajustStatus(this.uploadComponentName, maxSize, maxNumberOfFile);
	},
	
	/**
	 * 다이얼로그를 닫는다. 이 함수는 레이어형에만 사용되는 함수이다.
	 */
	closeDialog : function(){
		$('#'+this.options.dialogName + $(this.element).attr('id')).dialog('close');
	},
	
	/**
	 * 레이어형에서 레이어에서 업로드가 완료된 파일 항목을 화면에 표시 하도록 하는 로직이다.
	 */
	afterCallback : function(){
		//업로드가 완료된 파일 목록을 구한다.
		var fileList = this.uploadManager.getFileInfos(this.uploadComponentName);
		//console.log(fileList);
		var removeFileList = [];
		var self = this;
		
		for(var i=0; i < fileList.length; i++){
			// cud가 1이 아닐경우 추가가 아니므로 화면에 표시 하지 않는다.
			if(fileList[i].cud != 1) {
				if(fileList[i].cud == 3) removeFileList.push(fileList[i]);
				//파일함에서 추가시킨 파일을 첨부하기 위해 0도 제외
				if(fileList[i].cud != 0) continue;
			}
			
			var param = {
					//fileUrl : '/gw/upload'+fileList[i].fileUrl,
					fileUrl : frameworkProperties.context+'/inc/file/fileView?fileUrl='+fileList[i].fileUrl+'&fileName='+fileList[i].localFileName,
					fileName : fileList[i].localFileName,
					name : fileList[i].realFileName,
					size : this.formatFileSize(fileList[i].fileSize),
					extension : fileList[i].realFileName.substring(fileList[i].realFileName.lastIndexOf('.')+1, fileList[i].realFileName.length).toLowerCase()
			};
			
			var newEl = null;
			
			if(this.options.uploadType == 'image'){
				newEl = $(Mustache.render(this.template.imageItemTemplate, param));
			}else{
				newEl = $(Mustache.render(this.template.fileItemTemplate, param));
			}
			
			$(newEl).data(fileList[i]);
			
			$(newEl).find('button').click(function(){
				var obj = $(this).closest('li');				
				self.deleteItem($(obj).data());
				$(obj).remove();
			});
			
			if(!(this.options.uploadType == 'image' && $(this.element).naonGallery)){
				$(newEl).find('a').click(function(event){
					event.preventDefault();
					var obj = $(this).closest('li');
					var data = $(obj).data();
					self.download({
						fileUrl : data.fileUrl,
						fileName : data.fileName,
						realFileName : data.realFileName,
						mimeType : data.type						
					});
					
					return false;
				});
			}
			
			if(this.options.uploadType == 'image'){
				$('#'+$(this.element).attr('id') + '_imageList').append(newEl);
			}else{
				$('#'+$(this.element).attr('id') + '_attachList').append(newEl);
			}
			
			this.totalSize += fileList[i].fileSize;
		}
		
		//이미지의 경우 클릭 하면 갤러리 플러그인으로 표시
		if(this.options.uploadType == 'image' && $(this.element).naonGallery){
			if(!this.options.galleryPluginOption.container){
				this.options.galleryPluginOption.container = '#'+$(this.element).attr('id')+'_blueimp-gallery';
			}
			$('#'+$(this.element).attr('id') + '_imageList').naonGallery(this.options.galleryPluginOption);
		}
		
		// 삭제된 파일 제거
		for(var i=0; i<removeFileList.length; i++) {
			rFileName = removeFileList[i].fileName;
			
			$(this.element).find('.attach_file').find('ul').children().each(function(){
				if($(this).data().fileName == rFileName)
					$(this).remove();
			});
		}
		
		if($(this.element).find('.attach_file').find('ul').children().length != 0) {
			$(this.element).find('.attach_del_all').show();
		} else {
			$(this.element).find('.attach_del_all').hide();
		}
		
		if(this.options.uploadType == 'image'){
			this.totalNumberOfFile = $('#'+$(this.element).attr('id') + '_imageList').children().length;
		}else{
			this.totalNumberOfFile = $('#'+$(this.element).attr('id') + '_attachList').children().length;
		}
		
		this.showTotalStatus();
	},
	
	/**
	 * 파일과 이미지 둘다 보여주는 형식에 화면 표시 콜백 함수이다.
	 */
	afterCallbackOfDoubleType : function(){
		var fileuploadObj = this.uploadManager.uploaders[this.uploadComponentName].data('fileupload');
		var fileList = this.uploadManager.getFileInfos(this.uploadComponentName);
		var self = this;
		
		for(var i=0; i < fileList.length; i++){
			if(fileList[i].cud != 1) continue;
			
			var param = {
					//fileUrl : '/gw/upload'+fileList[i].fileUrl,
					fileUrl : frameworkProperties.context+'/inc/file/fileView?fileUrl='+fileList[i].fileUrl+'&fileName='+fileList[i].localFileName,
					fileName : fileList[i].localFileName,
					name : fileList[i].realFileName,
					size : this.formatFileSize(fileList[i].fileSize),
					extension : fileList[i].realFileName.substring(fileList[i].realFileName.lastIndexOf('.')+1, fileList[i].realFileName.length).toLowerCase()
			};
			
			var newEl = null;
			
			if(fileuploadObj.options.uploadType == 'image'){
				newEl = $(Mustache.render(this.template.imageItemTemplate, param));
			}else{
				newEl = $(Mustache.render(this.template.fileItemTemplate, param));
			}
			
			$(newEl).data(fileList[i]);
			
			$(newEl).find('button').click(function(){
				var obj = $(this).closest('li');				
				self.deleteItem($(obj).data());
				
				if($(this).closest('ul').children().length == 1){
					$(this).closest('.attach_del_all').hide();
				}
				
				$(obj).remove();
			});
			
			if(!(this.options.uploadType == 'image' && $(this.element).naonGallery)){
				$(newEl).find('a').click(function(event){
					event.preventDefault();
					var obj = $(this).closest('li');
					var data = $(obj).data();
					self.download({
						fileUrl : data.fileUrl,
						fileName : data.fileName,
						realFileName : data.realFileName,
						mimeType : data.type						
					});
					
					return false;
				});
			}
			
			if(fileuploadObj.options.uploadType == 'image'){
				$(this.element).find('.img_lst > ul').append(newEl);
			}else{
				$(this.element).find('.file > ul').append(newEl);
			}
			
			this.totalSize += fileList[i].fileSize;
		}
		
		//이미지의 경우 클릭 하면 갤러리 플러그인으로 표시
		if(fileuploadObj.options.uploadType == 'image' && $(this.element).naonGallery){
			if(!this.options.galleryPluginOption.container){
				this.options.galleryPluginOption.container = '#'+$(this.element).attr('id')+'_blueimp-gallery';
			}
			$('#'+$(this.element).attr('id') + '_imageList').naonGallery(this.options.galleryPluginOption);
		}
		
		if(fileuploadObj.options.uploadType == 'image'){
			$(this.element).find('.attach_img').show();
		}else{
			$(this.element).find('.attach_file').show();
		}
		
		this.totalNumberOfFile = $(this.element).find('.file > ul').children().length + $(this.element).find('.img_lst > ul').children().length;
		
		this.showTotalStatus();
		
		this.closeDialog();
	},
	
	/**
	 * 화면에 현재 업로드 상태를 표시하는 부분을 수정하는 함수이다.
	 */
	showTotalStatus : function(){
		var statebar = $(this.element).find('.innerStatusbar');
		//첨부 용량 업데이트
		statebar.find('.total-size').text(this.formatFileSize(this.totalSize));
		//전체 개수 업데이트
		statebar.find('.total-count').text(this.totalNumberOfFile);
		
		this.showStatebar('show');
		this.checkFileCntAndSize();
	},
	
	/**
	 * 레이어형 업로드 컴포넌트에 최대 사이즈 및 최대 개수를 조정하는 함수이다.
	 * @param fileCnt
	 */
	adjustMaxNumberOfFiles : function(fileCnt){
		var fileuploadObj = this.uploadManager.uploaders[this.uploadComponentName].data('fileupload');
		fileuploadObj._adjustMaxNumberOfFiles(-fileCnt);
		fileuploadObj.options.maxFileSize = this.options.maxTotalFileSize - this.totalSize;
	},
	
	/**
	 * 현재 파일 개수 및 사이즈를 체크 하여 업로드 파일을 활성화 할지 여부를 결정하는 함수이다.
	 */
	checkFileCntAndSize : function(){
		if(this.options.maxNumberOfFiles <= this.totalNumberOfFile || this.options.maxTotalFileSize <= this.totalSize){
			$(this.element).find('.btn_bar > button').attr('disabled', true);
		}else{
			$(this.element).find('.btn_bar > button').attr('disabled', false);
		}
	},

	/** 파일사이즈가 허용크기안에 있는지 여부를 반환. */
	validFileSize: function() {
		return this.uploadManager.validFileSize();
	},

	_checkValidFileSize: function() {
		if(!this.uploadManager.validFileSize()) {
			alert(uploadMessage.errors.maxTotalFileSize);
			return false;
		}
		return true;
	},
	/**
	 * 파일이나 이미지를 삭제 했을 때 호출되는 함수로 업로드 상태를 변경하고 총 파일 사이즈와 파일 개수를 갱신한다.
	 * @param fileInfo
	 */
	deleteItem : function(fileInfo){
		this.totalSize = this.totalSize - fileInfo.size;
		--this.totalNumberOfFile;
		this.showTotalStatus();
		
		if(this.totalNumberOfFile == 0){
			$(this.element).find('.attach_del_all').hide();
			this.showStatebar('hide');
		}
		if(fileInfo.cud != 1) {
			var delFiles = this.delFiles;
			if(!delFiles) {
				delFiles = [];
				this.delFiles = [];
			}
			fileInfo.cud = 3;
			delFiles.push(fileInfo);
		}
	},
	
	/**
	 * 업로드 상태를 표시하는 부분에 화면에 표시 할지 여부를 변경하는 함수이다.
	 * 
	 * @param status show : 표시, hide : 미표시
	 */
	showStatebar : function(status){
		if(this.options.showStateBar && status == 'show'){
			if(this.options.type != 4){
				$(this.element).find('.innerStatusbar').show();
			}
		}else{
			$(this.element).find('.innerStatusbar').hide();
		}
	},
	
	/**
	 * 파일 사이즈 포맷을 변경하는 함수
	 * jQuery fileupload 플러그인 안에 정의 되어 있는 함수 같다.
	 * @param bytes
	 * @returns {String}
	 */
	formatFileSize: function (bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }
        if (bytes >= 1073741824) {
            return (bytes / 1073741824).toFixed(2) + ' GB';
        }
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        }
        return (bytes / 1024).toFixed(2) + ' KB';
    },

    /**
     * 화면에서 바로 파일을 선택하는 경우에는 폼 전송 시 업로드가 이루어져야 한다.
     * 이 함수가 호출되면 파일을 업로드 하고 사용자가 정의한 콜백 함수를 호출한다.
     */
    upload : function(){
    	//업로드 호출.
    	var self = this;
		this.uploadManager.upload(function() {
			if(!self._checkValidFileSize()) {
				return false;
			}
			self.options.uploadedCallback();
		});
    },
    
    /**
     * 업로드된 파일 목록을 리턴한다.
     * @returns
     */
    getFileInfos : function(){
    	var files = [];
    	
    	if(this.options.type == 3 || this.options.type == 4 || this.options.type == 5 || this.options.type == 6){
    		files = this.getOnlyFileInfos();
    		
    		$.each(this.getOnlyImageInfos(), function(){
    			files.push(this);
    		});    		
    	}else{
    		var tmpFiles = this.uploadManager.getFileInfos(this.uploadComponentName);
        	
        	for(var i=0; i < tmpFiles.length; i++){
        		if(tmpFiles[i].cud != 3){
        			files.push(tmpFiles[i]);
        		}
        	}
    	}
    	
    	return files;
    },

    /**
     * 삭제된 파일를 포함한 파일 목록을 리턴한다.
     * @returns
     */
	getFileInfosWithDeleted: function() {
		var files = null;

		if(this.options.type == 3 || this.options.type == 4 || this.options.type == 5 || this.options.type == 6){
			files = this.getOnlyFileInfos().concat(this.getOnlyImageInfos()).concat(this.delFiles || []);
		} else {
			files = this.uploadManager.getFileInfos(this.uploadComponentName);
		}
		return files;
	},

    /**
     * 파일과 이미지 둘다 표시되는 형일 경우에 파일 목록을 리턴한다. 이미지 목록은 여기서 리턴되지 않는다.
     * @returns {Array}
     */
    getOnlyFileInfos : function(){
    	var files = [];
		
		
		$(this.element).find('.attach_file').find('ul').children().each(function(){
			files.push($(this).data());
		});
		
		return files;
    },
    
    /**
     * 파일과 이미지 둘다 표시되는 형일 경우에 이미지 목록을 리턴한다. 파일 목록은 여기서 리턴되지 않는다.
     * @returns {Array}
     */
    getOnlyImageInfos : function(){
    	var images = [];
    	
    	$(this.element).find('.attach_img').find('ul').children().each(function(){
			images.push($(this).data());
		});
    	
    	return images;
    },
    
    download : function(fileInfo){
    	
    	var options = {
    			url : '/inc/file/download',
    			data : fileInfo,
    			sendDataType : 'string',
    			dataType : 'file', //<<<<<<< 다른 옵션은 동일하며 dataType에 ‘file’을 지정합니다.
    			target : document.body,
    			type : 'post',
    			success : function() {},
    			error: function() {
    				// TODO : 다국어 처리해야함 
    				//alert('다운로드 시 오류가 발생 하였습니다. 관리자에 문의하여 주세요.');
    			}
    		};
    		naon.http.ajax(options);
    		return false;
    	
    },
	 // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
      // _super and _superApply handle keeping the right this-context
      this._superApply( arguments );
      this.refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
      this._super( key, value );
      this.refresh();
    },
    
    _destroy: function() {
    	if(this.options.type != 5){
    		this.uploadManager.destroy(this.uploadComponentName);
    	}
    	
    	if(this.options.type === 3 || this.options.type === 4 || this.options.type === 5){
    		try{
    			this.closeDialog();
    		}catch(e){    			
    		}
    	}
    	
    	$(this.element).html('');    	
    },
     
     refresh: function() {
    	this._destroy();
    	this.totalSize = 0, this.totalNumberOfFile = 0;
    	this.init();
     },
     
     appendFiles: function(data) {
    	 this.uploadManager.appendFiles(this.uploadComponentName,data);
     },

	popupFileBox: function() {
		UploadManager.popupFileBox(this.uploadManager, this.uploadComponentName, this.options);
	},

    /**
     * 공통 업로드 템플릿이다.
     */
    template : {
    	innerType :  '<div class="fileupload-buttonbar">'
					+'	<div class="btn fileinput-button">'
					+'		{{#isFileType}}<i class="ico ico_atch">{{/isFileType}}{{^isFileType}}<i class="ico ico_camera">{{/isFileType}}</i> <span>' + common_button_myPC/*내 PC*/ + '</span>'
					+'		<input type="file" name="files[]" {{^isSingleType}}multiple{{/isSingleType}} title = "' + common_button_myPC/*내 PC*/ + '">'
					+'	</div> '
					/*+'	{{#filebox_upload_use_yn}}<button type="button" title="' + common_button_fileBox/*파일함*/ /*+ '" class="btn" id="filebox"><span>' + common_button_fileBox /*파일함*/ /*+ '</span></button> {{/filebox_upload_use_yn}}'
					/*+'	<button type="button" class="btn">구글 드라이브</button>'*/
					+'	<button type="reset" title="' + common_button_reset/*초기화*/ + '" class="btn cancel"><i class="ico ico_rfsh"><span>취소</span></i></button>'
					+'	<button type="button" title="삭제" class="btn delete" style="display:none;"><i class="ico ico_rfsh"><span>삭제</span></i></button>'
					+'	<span class="fileupload-loading"></span>'
					+'</div>'
					+'<div class="fileupload-statebar" {{#isSingleType}}{{^showStateBar}}style="display:none;"{{/showStateBar}}{{/isSingleType}}>'
					+'		<span class="file_upload_info">'
					+'			<span>' + common_text_attachedCapacity/*첨부용량*/ + '</span>'
					+'			<span class="total-size"></span> /'
					+'			<span class="max-size"></span>,'
					+'			<span>' + common_text_attachedNumber/*첨부개수*/ + '</span>'
					+'			<span class="total-count"></span>' + common_text_piece/*개*/ + ' /'
					+'			<span class="max-count"></span>' + common_text_piece/*개*/ + ''
					+'		</span>'
					+'		<span id="eml_file_change" style="display:none; float:right;">'
					+'			<span>'+ common_text_sendComplete +'</span>'
					+'		</span>'					
					+'</div>'
					+'<div class="attach_guide_box" {{#isSingleType}}style="display:none;"{{/isSingleType}}{{#isIeVerChecked}}style="display:none;"{{/isIeVerChecked}}>'
					+'	<span class="tip">첨부할 파일을 선택하세요.</span>'
					+'	<span class="drag_tip"><i class="ico"></i> ' + common_text_dragFileAttach/*첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.*/ + '</span>'
					+'</div>'
					+'<table role="presentation" class="attach_file_tbl">'
					+'	<tbody class="files"></tbody>'
					+'</table>',
    	
    	layerType :  '	<div class="btn_bar">'
					+'		{{#isFileType}}{{#isDefaultBtnType}}<button type="button" class="btn"><i class="ico ico_atch"></i> 파일 첨부</button>{{/isDefaultBtnType}}'
					+'		{{^isDefaultBtnType}}<button type="button" class="btn" title="파일 첨부"><i class="ico ico_atch"><span>파일 첨부</span></i></button>{{/isDefaultBtnType}}{{/isFileType}}'
					+'		{{#isImageType}}{{#isDefaultBtnType}}<button type="button" class="btn"><i class="ico ico_camera"></i> 이미지 첨부</button>{{/isDefaultBtnType}}'
					+'		{{^isDefaultBtnType}}<button type="button" class="btn" title="이미지 첨부"><i class="ico ico_camera"><span>이미지 첨부</span></i></button>{{/isDefaultBtnType}}{{/isImageType}}'
					+'	</div>'
					+'	<div class="fileupload-statebar innerStatusbar" style="{{^existFile}}display:none;{{/existFile}}{{#existFile}}{{^showStateBar}}display:none;{{/showStateBar}}{{/existFile}}">'
					+'		<div class="fl">'
					+'			<span class="file_upload_info">'
					+'				<span>' + common_text_attachedCapacity/*첨부용량*/ + '</span>'
					+'				<span class="total-size">{{totalSize}}</span> /' 
					+'				<span class="max-size">{{maxSize}}</span>,'
					+'				<span>' + common_text_attachedNumber/*첨부개수*/ + '</span>'
					+'				<span class="total-count">{{totalCount}}</span> ' + common_text_piece/*개*/ + ' /' 
					+'				<span class="max-count">{{maxCount}}</span> ' + common_text_piece/*개*/ + ''
					+'			</span>'
					+'		</div>'
					+'	</div>'
					+'	{{#isFileType}}<div class="attach_file attach_del_all" {{^existFile}}style="display:none;"{{/existFile}}>'	
					+'		<div class="tit hide"><strong>기존 첨부 파일</strong></div>'
					+'		<button type="button" title="모두 삭제" class="close"><span>모두 삭제</span></button>'
					+'		<div class="file">'
					+'			<ul id="{{id}}_attachList">'				
					+'			</ul>'
					+'		</div>'
					+'	</div>{{/isFileType}}'
					+'	{{#isImageType}}<div class="attach_img attach_del_all mgt" {{^existImage}}style="display:none;"{{/existImage}}>'
					+'		<div class="tit hide"><strong>기존 첨부 이미지</strong></div>'
					+'		<button type="button" title="모두 삭제" class="close"><span>모두 삭제</span></button>'
					+'		<div class="img_lst">'
					+'			<ul id="{{id}}_imageList">'
					+'			</ul>'
					+'		</div>'
					+'	</div>{{/isImageType}}'
					+'<div id="{{dialogName}}" title="파일 첨부" style="display:none;">'
					+'	<div class="tit_bar hide">'
					+'		<h3>파일 첨부</h3>'
					+'	</div>'
					+'	<div class="file_upload_popup">'
					+'		<div class="multi_upload_box">'
					+'			<!-- jQuery File Upload -->'
					+'			<div id="{{uploadComponentName}}" class="fileupload_manger">'
					+'				<div class="fileupload-buttonbar">'
					+'					<div class="btn fileinput-button">'
					+'						{{#isFileType}}<i class="ico ico_atch">{{/isFileType}}{{^isFileType}}<i class="ico ico_camera">{{/isFileType}}</i> <span>' + common_button_myPC/*내 PC*/ + '</span>'
					+'						<input type="file" name="files[]" {{^isSingleType}}multiple{{/isSingleType}}>'
					+'					</div> '
					+'					{{#filebox_upload_use_yn}}<button type="button" title="' + common_button_fileBox/*파일함*/ + '" class="btn" id="filebox"><span>' + common_button_fileBox/*파일함*/ + '</span></button> {{/filebox_upload_use_yn}}'
					/*+'					<button type="button" class="btn">구글 드라이브</button>'*/
					+'					<button type="reset" title="' + common_button_reset/*초기화*/ + '" class="btn cancel"><i class="ico ico_rfsh"><span>취소</span></i></button>'
					+'					<button type="button" title="삭제" class="btn delete" style="display:none;"><i class="ico ico_rfsh"><span>삭제</span></i></button>'
					+'					<span class="fileupload-loading"></span>'
					+' 				</div>'
					+' 				<div class="fileupload-statebar">'
					+'					<div class="fl">'
					+'						<span class="file_upload_info">'
					+'							<span>' + common_text_attachedCapacity/*첨부용량*/ + '</span>'
					+'							<span class="total-size"></span> /'
					+'							<span class="max-size"></span>,'
					+'							<span>' + common_text_attachedNumber/*첨부개수*/ + '</span>'
					+'							<span class="total-count"></span>' + common_text_piece/*개*/ + ' /'
					+'							<span class="max-count"></span>' + common_text_piece/*개*/ + ''
					+'						</span>'
					+'					</div>'
					+'					<div class="fr">'
					+'						<div class="size-progress" style="display:none;">'
					+'							<div class="prgsbar" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
					+'								<div class="bar" style="width:0%;"></div>'
					+'							</div>'
					+'						</div>'
					+'						<div class="fileupload-progress fade">'
					+'							<div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
					+'								<div class="bar" style="width:0%;"></div>'
					+'							</div>'
					+'							<div class="progress-extended">&nbsp;</div>'
					+'						</div>'
					+'					</div>'
					+'				</div>'
					+'				<div class="attach_guide_box">'
					+'					<span class="tip">첨부할 파일을 선택하세요.</span>'
					+'					<span class="drag_tip"><i class="ico"></i> 첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.</span>'
					+'				</div>'
					+'				<table role="presentation" class="attach_file_tbl">'
					+'					<tbody class="files"></tbody>'
					+'				</table>'
					+'			</div>'
					+'			<!--// jQuery File Upload -->'
					+'		</div>'
					+'		<div class="btn_area">'
					+'			<button id="{{dialogName}}_submitBtn" type="submit" class="btn btn_med btn_pri"><strong>저장</strong></button>'
					+'			<button id="{{dialogName}}_closeBtn" type="button" class="btn btn_med">닫기</button>'
					+'		</div>'
					+'	</div>',
		noBtnLayerType : '	{{#isFileType}}<div class="attach_file attach_del_all" {{^existFile}}style="display:none;"{{/existFile}}>'	
					+'		<div class="tit hide"><strong>기존 첨부 파일</strong></div>'
					+'		<button type="button" title="모두 삭제" class="close"><span>모두 삭제</span></button>'
					+'		<div class="file">'
					+'			<ul id="{{id}}_attachList">'				
					+'			</ul>'
					+'		</div>'
					+'	</div>{{/isFileType}}'
					+'	{{#isImageType}}<div class="attach_img attach_del_all mgt" {{^existImage}}style="display:none;"{{/existImage}}>'
					+'		<div class="tit hide"><strong>기존 첨부 이미지</strong></div>'
					+'		<button type="button" title="모두 삭제" class="close"><span>모두 삭제</span></button>'
					+'		<div class="img_lst">'
					+'			<ul id="{{id}}_imageList">'
					+'			</ul>'
					+'		</div>'
					+'	</div>{{/isImageType}}'
					+'<div id="{{dialogName}}" title="파일 첨부" style="display:none;">'
					+'	<div class="tit_bar hide">'
					+'		<h3>파일 첨부</h3>'
					+'	</div>'
					+'	<div class="file_upload_popup">'
					+'		<div class="multi_upload_box">'
					+'			<!-- jQuery File Upload -->'
					+'			<div id="{{uploadComponentName}}" class="fileupload_manger">'
					+'				<div class="fileupload-buttonbar">'
					+'					<div class="btn fileinput-button">'
					+'						{{#isFileType}}<i class="ico ico_atch">{{/isFileType}}{{^isFileType}}<i class="ico ico_camera">{{/isFileType}}</i> <span>' + common_button_myPC/*내 PC*/ + '</span>'
					+'						<input type="file" name="files[]" {{^isSingleType}}multiple{{/isSingleType}}>'
					+'					</div> '
					+'					{{#filebox_upload_use_yn}}<button type="button" title="' + common_button_fileBox/*파일함*/ + '" class="btn" id="filebox"><span>' + common_button_fileBox/*파일함*/ + '</span></button> {{/filebox_upload_use_yn}}'
					/*	+'					<button type="button" class="btn">구글 드라이브</button>'*/
					+'					<button type="reset" title="' + common_button_reset/*초기화*/ + '" class="btn cancel"><i class="ico ico_rfsh"><span>취소</span></i></button>'
					+'					<button type="button" title="삭제" class="btn delete" style="display:none;"><i class="ico ico_rfsh"><span>삭제</span></i></button>'
					+'					<span class="fileupload-loading"></span>'
					+' 				</div>'
					+' 				<div class="fileupload-statebar">'
					+'					<div class="fl">'
					+'						<span class="file_upload_info">'
					+'							<span>' + common_text_attachedCapacity/*첨부용량*/ + '</span>'
					+'							<span class="total-size"></span> /'
					+'							<span class="max-size"></span>,'
					+'							<span>' + common_text_attachedNumber/*첨부개수*/ + '</span>'
					+'							<span class="total-count"></span>' + common_text_piece/*개*/ + ' /'
					+'							<span class="max-count"></span>' + common_text_piece/*개*/ + ''
					+'						</span>'
					+'					</div>'
					+'					<div class="fr">'
					+'						<div class="size-progress" style="display:none;">'
					+'							<div class="prgsbar" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
					+'								<div class="bar" style="width:0%;"></div>'
					+'							</div>'
					+'						</div>'
					+'						<div class="fileupload-progress fade">'
					+'							<div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100">'
					+'								<div class="bar" style="width:0%;"></div>'
					+'							</div>'
					+'							<div class="progress-extended">&nbsp;</div>'
					+'						</div>'
					+'					</div>'
					+'				</div>'
					+'				<div class="attach_guide_box">'
					+'					<span class="tip">첨부할 파일을 선택하세요.</span>'
					+'					<span class="drag_tip"><i class="ico"></i> 첨부할 파일을 마우스로 끌어서 추가할 수 있습니다.</span>'
					+'				</div>'
					+'				<table role="presentation" class="attach_file_tbl">'
					+'					<tbody class="files"></tbody>'
					+'				</table>'
					+'			</div>'
					+'			<!--// jQuery File Upload -->'
					+'		</div>'
					+'		<div class="btn_area">'
					+'			<button id="{{dialogName}}_submitBtn" type="submit" class="btn btn_med btn_pri"><strong>저장</strong></button>'
					+'			<button id="{{dialogName}}_closeBtn" type="button" class="btn btn_med">닫기</button>'
					+'		</div>'
					+'	</div>',			
		fileItemTemplate : 
					 '				<li>'
					+'					<button type="button" title="삭제" class="ico ico_trash"><span>삭제</span></button>'
					+'					<i class="fico fico_{{extension}}"></i>'
					+'					<a href="{{fileUrl}}/{{fileName}}">{{name}}</a> <span class="size">{{size}}</span>'
					+'				</li>',
		imageItemTemplate : 
					 '				<li>'
					+'					<div class="thmb">'
					+'						<div class="hvr_tool"><button type="button" title="삭제" class="btn_del"><span>삭제</span></button></div>'
					//+'						<a href="#"><img src="{{fileUrl}}/{{fileName}}" width="120" alt="{{name}}"></a>'
					+'						<a href="{{fileUrl}}" class="gallery" title="{{name}}" onclick="javascript:return false;"><img src="{{fileUrl}}" width="120" alt="{{name}}"></a>'
					+'					</div>'
					+'				</li>',
		galleryTemplate : 
					'	<div id="{{id}}_blueimp-gallery" class="blueimp-gallery" style="display:none;">'
					+'		<div class="slides"></div>'
					+'		<div class="title"></div>'
					+'		<a class="prev">‹</a>'
					+'		<a class="next">›</a>'
					+'		<a class="close">×</a>'
					+'		<a class="play-pause"></a>'
					+'		<ol class="indicator"></ol>'
					+'	</div>'
    }
});