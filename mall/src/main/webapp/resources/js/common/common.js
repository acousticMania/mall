	/* jQuery Custom Plugin Functions */

	/**
	 * Checkbox 체크 여부를 리턴
	 */
	$.fn.isChecked = function() {
		var result = false;
		
		this.each(function() {
			if(this.checked) {
				result = true;
				return false;
			}
		});
		
		return result;
	};
	
	// 상태 관리를 위한 global 변수
	var G_COMMON = {};
	
	/**
	 * Companion.JS와 연동하여 디버깅 로그를 출력, Companion.JS 적용을 위해 파일 인코딩을 반드시 UTF-8로 설정
	 * 
	 * @param obj 출력하고자 하는 Object
	 * @return void
	 */
	function gfnDebug(obj) {
		if(window.console) {
			console.debug(obj);
		}
	}
	
	/**
	 * event를 발생시킨 Event Source를 리턴
	 * 
	 * @param evt event
	 */
	function gfnGetEventSource(evt) {
		if(evt) {
			if(evt.target) return evt.target;
			else return evt.srcElement;
		}
	};
	
	/**
	 * 클릭 이벤트 발생 위치를 리턴
	 * @param evt event
	 */
	function gfnGetClickPosition(evt) {
		if(!evt) {
			return {left:0, top:0};
		}
		
		var x = 0, y = 0;
		var obj = gfnGetEventSource(evt);
		
		if(evt.pageX) {
			// alert("other: " + evt.pageX);
			x = evt.pageX - obj.offsetLeft;
			y = evt.pageY - obj.offsetTop;
		} else if(evt.clientX) {
			// alert("ie: " + evt.clientX);
			x = evt.clientX + document.body.scrollLeft - document.body.clientLeft - obj.offsetLeft;
			y = evt.clientY + document.body.scrollTop - document.body.clientTop - obj.offsetTop;
		} else {
			alert("none");
		}
		
		if(document.body.parentElement && document.body.parentElement.clientLeft) {
			var b = document.body.parentElement;
			x += b.scrollLeft - b.clientLeft;
			y += b.scrollTop - b.clientTop;
		}
		
		// alert(x + "," + y);
		
		return {left:x, top:y};
	}
	
	function gfnSetClientXy(event) {
	    G_COMMON.clientX = event.clientX;
	    G_COMMON.clientY = event.clientY;
	}
	
	// AJAX Callback 함수를 위한 변수
	var ajaxCallback;
	var ajaxSessionTimeoutMsgShowed = false;
	
	/**
	 * AJAX Submit
	 * 
	 * @param targetUrl Target URL
	 * @param params Parameters
	 * @param callback Callback function
	 * @param options options
	 * @return void
	 */
	function gfnAjaxSubmit(targetUrl, params, callback, options) {
		/*
		if(showImage!=false) {
			var position = gfn_getEventPosition(G_COMMON.lastEvent);
			var style = "position:absolute;left:" + position.left + "px;top:" + position.top + "px;";
			
			$("#ajaxLoaderImageDiv").remove();
			$("body").append("<div id='ajaxLoaderImageDiv' style='" + style + "'><img id='ajaxLoaderImage' src='/static/images/ajax-loader.gif' /></div>");
		}
		*/
		
		var async = true;
		var showProgress = true;
		
		if(options) {
			if(options.showProgress==false) {
				showProgress = false;
			}
			if(options.disable!=false) {
				G_COMMON.ajaxSourceObject = gfnGetEventSource(G_COMMON.lastEvent);
				$(G_COMMON.ajaxSourceObject).attr("disabled", true);
			}
			if(options.sync==true) {
				async = false;
			}
		}
		
		if(showProgress) {
			var progressDiv = "<div id='progressDiv' style='position:absolute; top:0; left:0; width:100%; height:100%; background-color:#777; opacity:0.5; filter:alpha(opacity=50);'></div>";
			
			$("body").append(progressDiv);
			$("body").css("cursor", "wait");
		}
		
		params["AJAX_PARAM"] = "ajax";
		ajaxCallback = callback;
		G_COMMON.ajaxUrl = targetUrl;
		
		$.ajax({
			url:targetUrl,
			type:'POST',
			data:params,
			dataType:'xml',
			timeout:0,
			error:gfnAjaxSubmitErrorHandler,
			success:gfnAjaxSubmitCallback,
			async:async
		});
	}

	/**
	 * AJAX Callback function
	 * 
	 * @param xml 서버에서 수신한 XML 데이터
	 * @return void
	 */
	function gfnAjaxSubmitCallback(xml) {
		$("#progressDiv").remove();
		$("body").css("cursor", "default");
		
		// $("#ajaxLoaderImageDiv").remove();
		$(G_COMMON.ajaxSourceObject).attr("disabled", false);
		
		var exceptionOccured = false;
		
		$(xml).find("xmlView > exception").each(function() {
			exceptionOccured = true;
			
			var exceptionType = $(this).find("type").text();
			
			if(exceptionType=="SessionExpiredException") {
				if(!ajaxSessionTimeoutMsgShowed) {
					ajaxSessionTimeoutMsgShowed = true;
					alert("세션이 만료되어 로그인 페이지로 이동합니다.");
				}
				
				if(opener) {
					opener.top.location.href = "/toter";
					self.close();
				} else {
					top.location.href = "/toter";
				}
				
				return;
			} else if(exceptionType=="Exception") {
				var exceptionId = $(this).find("id").text();
				
				alert("에러가 발생하였습니다. 서버에서 에러를 확인하십시오.\n\nError ID : " + exceptionId);
				
				return;
			}
		});
		
		if(exceptionOccured) return;
		
		ajaxCallback(xml);
	}

	/**
	 * AJAX Error Handler
	 * 
	 * @param XMLHttpRequest XMLHttpRequest
	 * @param textStatus Status
	 * @param errorThrown Error
	 * @return void
	 */
	function gfnAjaxSubmitErrorHandler(XMLHttpRequest, textStatus, errorThrown) {
		$("#progressDiv").remove();
		$("body").css("cursor", "default");
		
		// $("#ajaxLoaderImageDiv").remove();
		$(G_COMMON.ajaxSourceObject).attr("disabled", false);

		// Session Refresh인 경우 처리하지 않음
		if(G_COMMON.ajaxUrl.indexOf("sessionRefresh.jsp")!=-1) return;
		
		// alert("서버에서 에러(" + textStatus + ", " + errorThrown + ")가 발생하였습니다. 관리자에게 문의하십시오.");
		alert("서버에서 에러가 발생하였습니다. 관리자에게 문의하십시오.");
	}
	
	/**
	 * AJAX 호출 결과 XML을 Select Box Option에 추가
	 * 
	 * @param objId Select Box ID
	 * @param xml XML Data
	 * @param nameAndValue Name, Value로 사용할 Element Name
	 * @param selectedValue 선택된 값
	 */
	function gfnSetSelectBox(objId, xml, nameAndValue, selectedValue) {
		var obj = $("#" + objId);
		
		var nameAndValueArr = nameAndValue.split(",");
		var nameElementName = nameAndValueArr[0];
		var valueElementName = nameAndValueArr[1];
		
		// option 삭제
		obj.empty();

		// option 추가
		$(xml).find("item").each(function() {
			var item = $(this);

       		//cfDebug($("value", item).text() + "/" + $("text", item).text());
			
			// 조회조건 유지
			var selected = "";
			
			if(selectedValue && selectedValue==$(valueElementName, item).text()) {
				selected = "selected";
			}
			
       		var option = "<option value='" + $(valueElementName, item).text() + "' " + selected + ">"
       		           + $(nameElementName, item).text()
                       + "</option>";
       		
			obj.append(option);
		});
	}

	/**
	 * Cookie 설정
	 */
	function gfnSetCookie(name, value, expires, path, domain, secure) {
		var today = new Date();
		today.setTime(today.getTime());
		
		if(expires) {
			expires = expires * 1000 * 60 * 60 * 24; // x number of days
		}
		
		var expiresDate = new Date(today.getTime() + expires);
		
		document.cookie = name + "=" + escape(value)
		                + ( expires ? ";expires="+expiresDate.toGMTString() : "" )
		                + ( path ? ";path="+path : "" )
		                + ( domain ? ";domain="+domain : "" )
		                + ( secure ? ";secure" : "" );
	}
	
	/**
	 * Cookie 가져오기
	 */
	function gfnGetCookie(name) {
		var bInx = document.cookie.indexOf(name);
		var eInx = 0;
		
		if(bInx==-1) return "";
		
		bInx = bInx + name.length + 1;
		eInx = document.cookie.indexOf(";", bInx);
		
		if(eInx==-1) eInx = document.cookie.length;
		
		var result = document.cookie.substring(bInx, eInx);
		
		return unescape(result);
	}
	 
	/**
	 * URL로부터 File Name을 리턴
	 */
	function gfnGetFileNameFromUrl(url) {
		var fileName = url.substring(url.lastIndexOf("/") + 1);
		return fileName;
	}
	
	/**
	 * 페이지 로드 시 초기화 함수
	 */
	$(document).ready(function() {
		$(document).bind("click", function(event) {
			G_COMMON.clickEvent = event;
			G_COMMON.lastEvent = event;
		});
		$(document).bind("keydown", function(event) {
			G_COMMON.keydownEvent = event;
			G_COMMON.lastEvent = event;
		});
		
		// gfn_applyStyleListTable();
	});
	
	/**
	 * null처리
	 * @param str
	 * @returns
	 */
	function gfn_isNull(str) {
	    if (str == null) return true;
	    if (str == "NaN") return true;
	    if (new String(str).valueOf() == "undefined") return true;    
	    var chkStr = new String(str);
	    if( chkStr.valueOf() == "undefined" ) return true;
	    if (chkStr == null) return true;    
	    if (chkStr.toString().length == 0 ) return true;   
	    return false; 
	}
	 
	/**
	 * form submit
	 * @param opt_formId
	 * @returns
	 */
	function ComSubmit(opt_formId) {
	    this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	    this.url = "";
	    
	    if(this.formId == "commonForm"){
	        $("#commonForm")[0].reset();
	    }
	     
	    this.setUrl = function setUrl(url){
	        this.url = url;
	    };
	     
	    this.addParam = function addParam(key, value){
	        $("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
	    };
	     
	    this.submit = function submit(){
	        var frm = $("#"+this.formId)[0];
	        frm.action = this.url;
	        frm.method = "post";
	        frm.submit();   
	    };
	}
	
	
	var gfv_ajaxCallback = "";
	function ComAjax(opt_formId) {
		this.url = "";
		this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
		this.param = "";
		
		if(this.formId == "commonForm") {
			var frm = $("#commonForm");
			if(frm.length >0) {
				frm.remove();
			}
			var str = "<form id='commonForm' name='commonForm'></form>";
			$('body').append(str);
		}
		
		this.setUrl = function setUrl (url) {
			this.url = url;
		};
		
		this.setCallback = function setCallback (callBack) {
			fv_ajaxCallback = callBack;
		}
		
		this.addParam = function addParam(key, value) {
			this.param = this.param + "&" + key + "=" + value;
		}
		
		this.ajax = function ajax() {
			if(this.formId != "commonForm"){
				this.param += "&" + $("#" + this.formId).serialize();
			}
			$.ajax({
				url : this.url,
				type : "POST",
				data : this.param,
				async : false,
				success : function(data, status) {
					if(typeof(fn_ajaxCallback) == "function") {
						fv_ajaxCallback(data);
					} else {
						eval(fv_ajaxCallback+ "(data);");
					}
				}
				
			});
		}
	}
	
	var gfv_pageIndex = null;
	var gfv_eventName = null;
	