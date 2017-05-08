var daum_editor = {
	create : function(formName , module , width , height){
		var config = {
			txHost: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
			txPath: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
			txService: 'sample', /* 수정필요없음. */
			txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
			initializedId: "", /* 대부분의 경우에 빈문자열 */
			wrapper: "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
			form: formName+"", /* 등록하기 위한 Form 이름 */
			txIconPath: "/resources/editor/daumeditor/images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
			txDecoPath: "/resources/editor/daumeditor/images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */

			canvas: {
				styles: {
					color: "#123456", /* 기본 글자색 */
					fontFamily: "굴림", /* 기본 글자체 */
					fontSize: "10pt", /* 기본 글자크기 */
					backgroundColor: "#fff", /*기본 배경색 */
					lineHeight: "1.5", /*기본 줄간격 */
					padding: "8px" /* 위지윅 영역의 여백 */
				},
				newlinepolicy: 'br',	/* 글내용에 엔터부분을 <br>로 처리 기본은 <p>&nbsp;</p> */
					//bogus_html: '<br>',	
				customCssText:
					'p {margin-top: 0; margin-bottom: 0;}'+
					'.appPathContainer {*zoom:1; padding:15px 0;float:left;}'+
					'.appPathContainer:after {content:"clear"; display:block; clear:both; height:0; visibility:hidden;}'+
					'.appPathContainer .appPathBox {float:left; width:auto; border-left:1px solid #D2D2D2;}'+
					'.appPathContainer .appPathBox dl {float:left; width:84px; border-top:1px solid #D2D2D2; border-bottom:1px solid #D2D2D2; border-right:1px solid #D2D2D2;}'+
					'.appPathContainer .appPathBox dl dt {padding:3px; border-bottom:1px solid #D2D2D2; text-align:center; background:#F5F5F5;}'+
					'.appPathContainer .appPathBox dl dd {padding:3px; margin:0px; text-align:center;}'+
					'.appPathContainer .appPathBox dl dd.name {height:50px; padding-top:5px;}'+
					'.appPathContainer .appPathBox dl dd.state,'+
					'.appPathContainer .appPathBox dl dd.date {height:15px; padding:0 3px 3px 3px;}'+
					'.appPathContainer .appPathBox dl dd.date {font:11px tahoma;}'+
					'.mcinput { border:1px solid #D2D2D2; margin:1px; display:block; min-height:15px;};',
				initHeight : (height)?height:600,
				showGuideArea: false
			},
			events: {
				preventUnload: false
			},
			sidebar: {
				attachbox: {
				//	show: true
				},
				attacher: {
					'image' : {
						features: {left:250, top:65, width:450, height:400},
//						popPageUrl: '/common/editor/imgUpload'
						popPageUrl: '/common/editor/imgUpload?editorType=old'
//						popPageUrl: frameworkProperties.context + 'views/common/upload/image_daumEdit.jsp'
//						popPageUrl: '/common/upload/image_daumEdit'
					}
				}
			},
			size: {
				//아래 코드의 값(780)에 맞춰서 본문영역을 중앙에 오도록 계산해서 배치함. 브라우저 사이즈와 비교해서 아래 width 만큼 본문영역을 설정하고 좌우로 여백 div를 만듬.
				//일단, 본문영역 넓이는 설정하지 않도록 주석.
				//contentWidth: (width)?width:780 /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
			}
		};

		EditorJSLoader.ready(function(Editor) {
			new Editor(config);
			if (window._afterInitEditor) {
				Editor.onPanelLoadComplete(_afterInitEditor);
			}
		});
		
		this._editor = Editor;
		
		//if(contents!=""){ this._editor.modify({"content": contents}); }
	},
	/**
	 * 에디터의 본문 내용을 가져온다,
	 * @returns
	 */
	getHtml: function(){
		return this._editor.getContent();
	},
	/**
	 * 원래는 Editor.save()를 호출한 경우 데이터가 유효한지 검사하기 위해 부르는 콜백함수로
	 * 상황에 맞게 수정하여 사용한다.
	 * 모든 데이터가 유효할 경우에 true를 리턴한다.
	 * @param msg 출력메세지 문자
	 * @returns {Boolean} 모든 데이터가 유효할 경우에 true
	 */
	validForm: function(msg) {
		// Place your validation logic here
		// sample : validate that content exists
		var validator = new Trex.Validator();
		var content = this._editor.getContent();
		if (!validator.exists(content)) {
			alert(msg);
			return false;
		}
		return true;
	},
	/**
	 * 글을 수정할때 저장된 글을 불러온다.
	 * @param sHtml
	 */
	setHtml: function(sHtml){
		//2붙이는 lt,gt 수정  by editorForFormUser.jsp 참고 기존그룹웨어에서 저장할때 바꿔서처리하는듯..
		sHtml = sHtml.replace(/&lt;/gi,"<");
		sHtml = sHtml.replace(/&gt;/gi,">");
		sHtml = sHtml.replace(/&quot;/gi,"\"");
		sHtml = sHtml.replace(/&amp;/gi,"&");
		sHtml = sHtml.replace(/&2l2t2;/gi,"&lt;");
		sHtml = sHtml.replace(/&2g2t2;/gi,"&gt;");
		this._editor.modify({
			"content": sHtml /* 내용 문자열, 주어진 필드(textarea) 엘리먼트 */
		});
	},
	/**
	 * 내용을 덧붙쳐서 입력하는 메소드
	 * @param sHtml
	 */
	insertContent :function(sHtml){
		this._editor.getCanvas().pasteContent(sHtml);
	},
	/**
	 * 다음에디터는 텍스트만 추출하여 가져온다.
	 * @returns
	 */
	getText: function(){
		//다음에디터는 텍스트만 호출하는 함수가 업음
		var str = this._editor.getContent();
		var objStrip = new RegExp(); 
		objStrip = /[<][^>]*[>]/gi; 
		return str.replace(objStrip, ""); 
	},
	/**
	 * 에디터에서 특정id의 요소를 가져온다.
	 * @param id
	 * @returns
	 */
	getElementById: function(id){
		var canvas = this._editor.getCanvas();
		var doc = canvas.panels[canvas.mode].getDocument();
		return doc.getElementById(id);
	},
	/**
	 * 에디터의 특정id의 요소에 html을 지정한다.
	 * @param id
	 * @param sHtml
	 * @returns 세팅여부
	 */
	setElementHtml: function(id, sHtml){
		var obj = this.getElementById(id);
		if (obj) {
			obj.innerHTML = sHtml;
			return true;
		}
		return false;
	},
	/**
	 * 에디터의 document객체를 가져온다.
	 * @returns
	 */
	getDocument: function(){
		var canvas = this._editor.getCanvas();
		return canvas.panels[canvas.mode].getDocument();
	},
	/**
	 * 다음에디터에 본문내용을 save한다.(일단은 사용 안함)
	 * @param msg 출력메세지 문자 
	 */
	saveContent: function(msg){
		if(confirm(msg)) this._editor.save();
	},

	/**
	 * 다음에디터에 사이즈를 변경한다.
	 * @param width 폭 height 넓이 
	 */
	resizeTo : function(width, height){
		$('tx_trex_container').style.width = width;
		$('tx_trex_container').style.height = height;
		this._editor.getCanvas().setCanvasSize({'height' : (height-113)});
	},

	/**
	 * 원래는 Editor.save()를 호출한 경우 validForm callback 이 수행된 이후
	 * 실제 form submit을 위해 form 필드를 생성, 변경하기 위해 부르는 콜백함수로
	 * 각자 상황에 맞게 적절히 응용하여 사용한다.(일단은 사용 안함)
	 * @returns {Boolean} 정상적인 경우에 true
	 */
	setForm: function() {
		var formGenerator = this._editor.getForm();
		var content = this._editor.getContent();
		formGenerator.createField(
				tx.textarea({
					'id': "tx_content",
					'name': "tx_content", // 본문 내용을 필드를 생성하여 값을 할당하는 부분
					'style': { 'display': "none" }
				}, content)
		);
		/* 아래의 코드는 첨부된 데이터를 필드를 생성하여 값을 할당하는 부분으로 상황에 맞게 수정하여 사용한다.
		 첨부된 데이터 중에 주어진 종류(image,file..)에 해당하는 것만 배열로 넘겨준다. */
		var images = this._editor.getAttachments('image');
		for (var i = 0, len = images.length; i < len; i++) {
			// existStage는 현재 본문에 존재하는지 여부
			if (images[i].existStage) {
				// data는 팝업에서 execAttach 등을 통해 넘긴 데이터
				alert('attachment information - image[' + i + '] \r\n' + JSON.stringify(images[i].data));
				formGenerator.createField(
						tx.input({
							'type': "hidden",
							'id': 'tx_attach_image',
							'name': 'tx_attach_image',
							'value': images[i].data.imageurl // 예에서는 이미지경로만 받아서 사용
						})
				);
			}
		}
		var files = this._editor.getAttachments('file');
		for (var i = 0, len = files.length; i < len; i++) {
			alert('attachment information - file[' + i + '] \r\n' + JSON.stringify(files[i].data));
			formGenerator.createField(
					tx.input({
						'type': "hidden",
						'id': 'tx_attach_file',
						'name': 'tx_attach_file',
						'value': files[i].data.attachurl
					})
			);
		}
		return true;
	}
}
