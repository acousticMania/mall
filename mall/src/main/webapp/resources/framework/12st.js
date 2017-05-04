/*
 * twest Inc., Software License, Version 1.0
 *
 * Copyright (c) 2012 twest Inc.,
 * All rights reserved.
 *
 * DON'T COPY OR REDISTRIBUTE THIS SOURCE CODE WITHOUT PERMISSION.
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <<twest Inc.>> OR ITS
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 * USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 * For more information on this product, please see
 * <<www.twest.com>>
 *
 * @author myeongseok, Seo(sirosms@gmail.com)
 * @description
 *    twest  표준 라이브러리 입니다. jQuery Plugin은 아니고 jQuery를 사용하였습니다.
 */



(function($) {

	/*
	 * @deprecated
	 * 중복된 history를 생성하는 버그,특정상황에서만 쓸수있는 제약 조건,제한된 히스토리 저장 갯수 문제가 있어서 필요한 페이지만 별도로 구현
		$(window).hashchange(function(evt){
			twest.http.history.hashChange(evt);
		}).unload(function(evt){
			twest.http.history.historyLocalSave();
		}).load(function(){
			twest.http.history.restoreLocalSave();
			if (twest.http.history.state.length > 0) {
				twest.http.history.state[twest.http.history.state.length - 1].restore = true;
				location.hash = twest.http.history.state[twest.http.history.state.length - 1].hash;
			}
		});
	*/

    /**
     * Javascript가 로드된후 javascript를 호출해야 한다. 자바스크립트가 로드될 때까지 기다린후 화면제어
     * 로직을 처리하는 스크립트의 init 함수를 호출한다.
     */
    var ScriptInvoker = function(scriptName)  {
        /** 실행할 스크립트 객체명    */
        this.scriptName = scriptName;
        /** timeout 이벤트의 참조 변수 */
        this.timeVar   =  'undefined';
        /** 객체에 전달할 데이터 값 */
        this.attrValue =  'undefined';
        /** 객체에 생성할 데이터 */
        this.attrName;
        /**
         * script에 전달할 데이터를 설정합니다.
         * @param attrName  변수명
         * @param attrValue 데이터, Object, string, int 아무거나
         */
        this.setAttribute = function(attrName, attrValue) {
            this.attrName   = attrName;
            this.attrValue  = attrValue;
        };
        /**
         * script의 init를 호출합니다.
         */
        this.invoke = function() {
            var self = this;
            this.timeVar = setTimeout(function() {
                var func = window[self.scriptName];
                if(func) {
                    if(self.attrName) {
                        func[self.attrName] = self.attrValue;
                    }
                    func.init();
                    self.clearTime();
                }else {
                    self.invoke();
                }
            });
        };
        /**
         * 타입아웃을 해제
         */
        this.clearTime = function() {
            clearTimeout(this.timeVar);
        };
    };




    //var twest = (function() {

       /**
        * 나온 패키지
        */
        var twest = function() {
            //return new twest.fn.init();
        };
//
//        twest.fn = twest.prototype = {
//            init : function() {
//                return this;
//            }
//        };

        // ---------------------------------------------------------------------- String Section
        /**
         * 문자열 처리 클래스
         */
        twest.string = {
        		
        	/**
             * 배열 split 구분자
            */
        	sep : [",", "|", "▒", "▤", "▩", "＾", "｜", "＆"],
            
        	/**
             * 패딩문자로 문자열을 채웁니다. Oracle LPAD 함수를 생각하면 됩니다.
             *
             * <pre>
             *
             * 다음은 문자열을 padding하는 예제입니다.
             *
             * var src = "111";
             * var paddedStr = twest.string.lpad(src, 10, '0');
             *
             * paddedStr의 값은 다음과 같습니다.
             *
             * '0000000111'
             *
             * </pre>
             *
             * @param src 원본문자열
             * @param length 문자열의 제한 길이
             * @param pad 채울 문자
             * @returns
             *      패딩된 문자열
             */
            lpad : function(src, length, pad) {
                if (!this.hasText(src))
                    return "";

                var buffer = [];
                for ( var i = 0; i < length - src.length; i++) {
                    buffer.push(pad);
                }
                src = buffer.join("") + src;
                return src.substring(0, length);
            },
            /**
             * 문자열의 앞뒤를 공백을 제거합니다. 오라클의 trim을 생각하면 됩니다.
             * <pre>
             * 다음은 trim을 사용하는 예제입니다.
             *
             * var src = "abcde   ";
             * var trimedString = twest.sring.trim(src);
             *
             * trimedString의 값은 다음과 같습니다.
             *
             *  'abcde'
             *
             * </pre>
             * @param str  문자열
             *      트림된 문자열
             */
            trim : function(str) {
            	str = str.toString();
            	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            },
            /**
             * 공백을 제외한 문자열을 가지고 있는지 확인합니다.
             * @param str 체크할 문자열
             * @return
             *      true : 문자열의 길이가 > 0 이면 , 그밖에 false
             */
            hasText : function(str) {
                if (!str)
                    return false;
                str = this.trim(str);
                if (str == "")
                    return false;
                return true;
            },
            /**
             * 주어진 문자열이 null 이나 "" 인지 확인
             * @param 비교할 문자열
             * @return
             * 		true : null 이나 "", , 그밖에 false
             */
            isEmpty : function(str) {
                return (str == null || str == "") ? true: false;
            },

            /**
             * 주어진 문자열이 null 이나 "" 인지 확인
             * @param 비교할 문자열
             * @return
             * 		false : null 이나 "", , 그밖에 true
             */
            isNotEmpty : function(str) {
                return (str == null || str == "") ? false: true;
            },


            /**
             * 주어진 문자열이 null 혹은 "" 혹은 undefined 인지 확인
             * @param 비교할 문자열
             * @return
             * 		true : null 이나 "", , 그밖에 false
             */
            isBlank : function(str) {
                return (str == null || str == "" || str == "undefined") ? true: false;
            },

            /**
             * 주어진 문자열이 null 혹은 "" 혹은 undefined 인지 확인
             * @param 비교할 문자열
             * @return
             * 		false : null 이나 "", , 그밖에 true
             */
            isNotBlank : function(str) {
                return (str == null || str == "" || str == "undefined") ? false: true;
            },
            
            /**
             * 주어진 문자열이 json 문자열인지 확인
             * @param 비교할 문자열
             * @return false , true
             */
            isJsonString : function(str) {
            	if(str == null || str == "" || str == undefined){
            		return false;
            	}else if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
            			replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            			replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            		return true;
            	}
                return false;
            },

            /**
             * 문자열이 널이면 널스트링("")을 반환
             * @param str 원본문자열
             * @returns
             *      변환된 문자열
             */
            nvls : function(str) {
                if (!str)
                    return "";
                else
                    return str;
            },

            /**
             * Oracle의 decode 참조. "1,한글,2,영어,기타" 와 같은 문자열을 decodeString
             * 에 설정하고 expr1에 '2' 값을 설정하면  "영어"를 반환합니다. 주어진 값이
             * 없으면 마지막 기타를 반환합니다.
             *
             *
             * <pre>
             * 다음은 decode를 사용하는 예제입니다.
             *
             * var  deStr = "1,사과,2,배,감자";
             * var  decodedString = twest.string.decode("2", deStr);
             *
             * decodeStgring의 값은  "배"가 됩니다.
             *
             *
             * </pre>
             *
             * @param expr1 찾을 문자열
             * @param decodeString 해석할 문자열
             *  @return 검색된 결과 문자열
             */
            decode : function(expr1, decodeString) {
                decodeString = this.trim(decodeString);
                var strs = decodeString.split(',');
                return this.decode_internal(expr1, strs);
            },
            /**
             * decode의 내부에서 사용합니다. 실제의 decode 처리를 합니다.
             * @param expr1  디코드할 문자열
             * @param exprs 디코드 값
             * @returns
             *      결과 값
             */
            decode_internal : function(expr1, exprs) {
                var i = 0;
                var hasElseValue = false;
                var isMatch = false;
                var expr = this.nvls(expr1);

                hasElseValue = (exprs.length % 2) == 1 ? true : false;
                for (i = 0; i < exprs.length; i++) {
                    if ((i % 2) == 0 && expr == exprs[i])
                        return exprs[i + 1];
                    i++;
                }// for

                if (!isMatch && hasElseValue)
                    rv = exprs[exprs.length - 1];
                return rv;
            },
            /**
             * 문자열을 치환합니다.
             *
             * <pre>
             *
             * var src = "Once or twice";
             * var replacedStr = twest.string.replace(src, "twice");
             *
             * replacedStr의 값은 다음과 같습니다.
             *
             * "Once or "
             *
             * </pre>
             *
             * @param str 원본문자열
             * @param findStr 찾을 문자열
             * @param replaceStr 치환할 문자열
             *
             */
            replace : function(str, findStr, replaceStr) {
                if (!str)
                    return str;
                return str.replace(new RegExp(findStr, "g"), replaceStr);
            },
            /**
             * 문자열의끝에서 주어진 길이만큼 분리합니다.
             *
             * <pre>
             *
             * var src = "123456789";
             * var rightedString = twest.string.right(src, 5);
             *
             * 결과는 다음과 같습니다.
             *
             * "56789"
             *
             * </pre>
             *
             * @param str 원본 문자열
             * @param length 길이
             * @returns
             * 		 변환된 문자열
             */
            right : function(str, length) {
                if (!str)
                    return "";
                return (str.length >= length) ? str.substring(str.length - length) : str;
            },
            /**
             * 문자열의 시작부분을 잘라냅니다.
             *
             * <pre>
             *
             * var src = "123456789":
             * var leftedString = twest.string.left(src, 5);
             *
             * 결과는 다음과 같습니다.
             *
             *
             * "12345"
             *
             * </pre>
             *
             * @param str  원본 문자열
             * @param length  길이
             * @returns
             * 		변환된 문자열
             */
            left : function(str, length) {
                if (!str)
                    return "";
                return str.length >= length ? str.substring(0, length) : str;
            },
            /**
             * 날자형식으로 변환합니다.
             *
             * <pre>
             * var str = "20120101";
             * var formatedStr = twest.string.formatDate(str, '/');
             *
             * 결과는 다음과 같습니다.
             * "2012/01/01"
             *
             * </pre>
             *
             * @param str  원본 문자열
             * @param ch  구분자
             * @returns
             *      변환된 문자열
             */
            formatDate : function(str, ch) {
                if (str == null)
                    return "";
                if (str.length < 5)
                    return str;
                else if (str.length > 4 && str.length < 7) {
                    return this.left(str, 4) + ch + str.substring(4);
                } else {
                    return this.left(str, 4) + ch + str.substring(4, 6) + ch + str.substring(6);
                }
            },
            /**
             * 주민번호 형식으로 변환합니다.(750123-21111111)
             *
             * <pre>
             *
             * var str = "7501232111111";
             * var formatedStr = twest.string.formatResidentId(str);
             *
             * 결과는 다음과 같습니다.
             *
             * "750123-2111111"
             *
             *
             * </pre>
             * @param str 문자열
             * @returns
             * 		변환된 문자열
             */
            formatResidentId : function(str) {
                if (str == null)
                    return "";
                str = this.replace(str, "-", "");
                if (str.length < 7)
                    return str;
                return this.left(str, 6) + "-" + str.substring(6);
            },
            /**
             *  우편번호 형식으로 문자열을 변환합니다.
             *
             *  <pre>
             *
             *  var str = "132123";
             *  var formatedStr = twest.string.formatZipCode(str);
             *
             *  결과는 다음과 같습니다.
             *
             *  "132-123"
             *
             *  </pre>
             *
             * @param str 원본 문자열
             * @returns
             * 		변환된 문자열
             */
            formatZipCode : function(str) {
                if (str == null)
                    return "";
                str = this.replace(str, "-", "");
                if (str.length < 4)
                    return str;
                return this.left(str, 3) + "-" + str.substring(3);
            },

            /**
             * 입력된 숫자형식의 문자열에 콤마를 넣습니다.
             *
             * <pre>
             *
             * var str = "123123";
             * var formatedStr = naopn.string.formatComma(str);
             *
             * 결과는 다음과 같습니다.
             *
             * "123,123"
             *
             * </pre>
             *
             * @param str 원본 문자열
             * @returns
             * 		변환된 문자열
             */
            formatComma : function(str) {
                str += '';
                x = str.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            },
            /**
             * 전화번호 형식으로 변환합니다
             *
             * <pre>
             * var str = "023030101";
             * var formatedStr = twest.string.formatTelephone(str);
             *
             * 결과는 다음과 같습니다.
             *
             * "02-303-0101";
             * </pre>
             *
             * @param str 원본  문자열
             * @returns
             * 		변환된 문자열
             */
            formatTelephone : function(str) {
                if (!str)
                    return "";
                if (str.length < 3)
                    return str;
                else if (str.length >= 3 & str.length < 5) {
                    return str.replace(/(^0(?:2|[0-9]{2}))([0-9]+$)/, "$1-$2");
                } else if (str.length >= 5 & str.length < 8) {
                    return str.replace(/(^0(?:2|[0-9]{2}))([0-9]{3,4})([0-9]+$)/, "$1-$2-$3");
                }
                //            	else {
                //            		return str.replace(/(^0(?:2|[0-9]{2}))([0-9]+)([0-9]{4}$)/, "$1-$2-$3");
                //            	}
            },
            /**
             * 문자열이 통화형식(123,222.22) 형식인지 확인합니다.
             * @param str 문자열
             * @returns
             * 		형식이 맞으년 true, 아니면 false
             */
            isCurrency : function(str) {
                return !str.match(/[^0-9,\.]{1,}/);
            },
            /**
             * 문자열이 정수형(1234455)인지 확인하빈다.
             * @param str 문자열
             * @returns
             * 		형식이 맞으년 true, 아니면 false
             */
            isInteger : function(str) {
                return !str.match(/[^0-9]{1,}/);
            },
            /**
             * 문자열이 정수형과 대쉬(-)만 있는지 체크
             * @param str 문자열
             * @returns
             *    형식이 맞으년 true, 아니면 false
             */
            isNumberDash : function(str) {
                return !str.match(/[^0-9\-]{1,}/);
            },
            /**
             * 바이트로 환산한 문자열의 길이값 반환
             *
             * <pre>
             *
             * var str = "한글a";
             * var len = twestb.string.getBytesLength(str);
             *
             * 결과는 7 입니다.
             * 오라클 기준으로 한글은 3byte 로 계산 되었습니다.
             * </pre>
             *
             * @param str 문자열
             * @returns
             * 		integer : 문자열 길이
             */
            getBytesLength : function(str) {
                str_len = str.length;
                byte_cnt = 0;
                if (str_len != escape(str).length) {
                    for (i = 0; i < str_len; i++) {
                        byte_cnt++;
                        if (this.isUnicode(str.charAt(i))) {
                            byte_cnt = byte_cnt + 2;                            
                        }
                    }
                } else
                    byte_cnt = str_len;
                return byte_cnt;
            },
            
            /**
             * 입력받은 글자 byte길이로 자르기
             * */
            getBytesCut :  function(str, len) {
            	var l = 0;
            	for (var i=0; i<str.length; i++) {
            	       l += (str.charCodeAt(i) > 128) ? 3 : 1;
            	       if (l > len) return str.substring(0,i);
            	}
            	return str;
        	},

            /**
             * 문자가 유니코드인지 확인
             * @param chr 문자
             * @returns {Boolean}
             * 		true 유니코드, false 유니코드 아님
             */
            isUnicode : function(chr) {
                return (escape(chr).length == 6);
            }
        };

    	/**
    	 * 다국어 처리 클래스
    	 */
    	twest.i18n = {
    		/**
    		 * 다국어 처리시 인자가 있는 경우 치환
    		 *
    		 *
    		 */
    		msgFormat : function() {
    			var arg = arguments;
    			if (arg.length == 0)
    				return '';
    			if (arg.length == 1)
    				return arg[0];

    			var fn = function(w, g) {
    				if (isNaN(g))
    					return '';
    				var idx = parseInt(g) + 1;
    				if (idx >= arg.length)
    					return '';
    				return arg[parseInt(g) + 1];
    			};
    			return arg[0].replace(/\{([0-9]*)\}/g, fn);
    		},

            /**
             * 설정 파일에서 언어셋을 읽어 다국어 UI를 구성
             * @param i18nDivId 다국어 UI가 들어갈 DivId
             * @param i18nColName 다국어 컬럼명
             * @param alwaysEn 조직관리의 경우 Y, 기타 N
             * @param uiStyle 'simple이면 한줄형태로 나옴. 그외 여러줄형태로.
             *
             * 설정파일
             * #언어셋
             * langSet=한국어$ko*English$en*日本語$ja*中國語$zh
             * #기본언어
             * defaultLang=ko
             *
             * <div class="lang" id=”divDeptName”>
             * </div>
             *
             * twest.i18n. formatI18nUI(“divDeptName”,”deptName”) 호츌후
             *
             * <div class="lang" id=”divDeptName”>
             * <dl>
             * 	<dt>한국어<span class="req">*</span></dt>
             * 	<dd><input id="deptName_ko" name="deptName_ko" type="text" data-lang="KO" class="input_txt"></dd>
             * </dl>
             * <dl>
             * 	<dt>English</dt>
             * 	<dd><input id="deptName_en" name="deptName_en"  type="text" data-lang="EN" class="input_txt"></dd>
             * </dl>
             * <dl>
             * 	<dt>日本語</dt>
             * 	<dd><input id="deptName_ja" name="deptName_ja"  type="text" data-lang="JA" class="input_txt"></dd>
             * </dl>
             * <dl>
             * 	<dt>中國語</dt>
             * 	<dd><input id="deptName_zh" name="deptName_zh"  type="text" data-lang="ZH" class="input_txt"></dd>
             * </dl>
             * </div>
             *
             * twest.i18n. formatI18nUI(“divDeptName”,”deptName”, 'N', 'simple') 호츌후
             * <div class="lang" id=”divDeptName”>
             *	<input name="deptName_ko" type="text" placeholder="한국어*" class="input_txt">
             *	<input name="deptName_en" type="text" placeholder="English" class="input_txt">
             * </div>
             *
             */
			formatI18nUI : function(i18nDivId,i18nColName,alwaysEn,uiStyle) {
				var template = uiStyle === 'simple' ? this.getSimpleI18nTmplt() : this.getI18nTmplt();
				var langSetArr = this.getLangSetArr();

				if (alwaysEn == "Y" && !this.existsEn) {
					
					var existEn = false;
					
					//이미 영문이 있을경우 추가하지 않는다.
					$.map(langSetArr, function(value, key) {
						if(value.langCd == 'en'){
							existEn = true;
						} 
					});
					
					if(!existEn){
						langSetArr.push({
							langName: 'English',
							langCd: 'en',
							defaultLang: false
						});
					}
				}
				var html = Mustache.to_html(template, {keyPrefix: i18nColName + '_', langSet: langSetArr});
				$('#'+i18nDivId).html(html);
			},
			/** 한줄형태의 다국어 템플릿 */
			getSimpleI18nTmplt: function() {
				if (!this.simpleI18nTmplt) {
					this.simpleI18nTmplt = '{{#langSet}}\r\n' +
						'<input id="{{keyPrefix}}{{langCd}}" name="{{keyPrefix}}{{langCd}}" type="text" placeholder="{{langName}}{{#defaultLang}}*{{/defaultLang}}" data-lang="{{langCd}}" title="{{langName}}" class="input_txt">\r\n' +
						'{{/langSet}}';
				}
				return this.simpleI18nTmplt;
			},
			/** 다국어 템플릿 */
			getI18nTmplt: function() {
				if (!this.i18nTmplt) {
					this.i18nTmplt = "{{#langSet}}<dl>\r\n" +
						"<dt>{{langName}}{{#defaultLang}}<span class=\"req\">*</span>{{/defaultLang}}</dt>\r\n" +
						"<dd><input id=\"{{keyPrefix}}{{langCd}}\" name=\"{{keyPrefix}}{{langCd}}\" data-lang=\"{{langCd}}\" type=\"text\" class=\"input_txt\"></dd>\r\n" +
		 				"</dl>{{/langSet}}";
				}
				return this.i18nTmplt;
			},
			/** 언어셋 배열을 반환한다.
			 *  @keyPrefix key prefix
			 */
			getLangSetArr : function() {
				if (!this.langSetArr) {
					this.langSetArr = $.map(frameworkProperties.langSet.split("*"), function(value, key) {
						var lang = value.split("$");
						var langSet = {
								langName: lang[0],
								langCd: lang[1],
								defaultLang: frameworkProperties.defaultLang == lang[1]
							};
						if(lang[1] === 'en') {
							twest.i18n.existsEn = true;
						}
						return langSet;
					});
				}
				return this.langSetArr;
			}
		};



        // ------------------------------------------------------------------------------- invoker
        /**
         * Javscript 함수 실행
         */
        twest.invoker = {
                /**
                 * Javascript가 로드될 때 까지 기다린후 javascript object가 유효하면 script의
                 * init function을 호출한다. 화면개발가이드 참조하세요.
                 * @param scriptName  javascript 객체이름
                 * @param varName  객체에 추가할 변수이름
                 * @param jsonStr 객체에 담을 변수, Object or primitive type
                 */
                invoke : function(scriptName, varName, jsonStr) {
                    var invoker = new ScriptInvoker(scriptName);
                    invoker.setAttribute(varName, jsonStr);
                    invoker.invoke();
                }
        };




        // ------------------------------------------------------------------------------- doc

        // javascript two patterns 

        //<\s*script[^><]*src=".*[^>]">\s*<\/\s*script\s*>
        
        
        
        
        
        /**
         * document 처리
         */
        twest.doc =  {

        		/**
        		 * jQuery의 append, html과 동작이 같아서 jQuery를 그대로 쓰려고 함. 
        		 * 다만, title, meta는 제거함. 
        		 */
        		getHtml: function(htmlRes) {
        			var result = "";
        			var re = /<\s*meta[^<>]*>/ig;
        			result = htmlRes.replace(re, "");
        			re = /<\s*title\s*>[^<>]*<\s*\/title\s*>/ig;
        			result = result.replace(re, ""); 
        			return result; 
        		},
                /**
                 * html을 파싱하여 script 파일과, css 파일은 헤더에 추가하고 나머지는
                 * 다시 html을 만들어 되돌린다.
                 * HTML을 분해하여 HEAD에 javascript, css 를 추가한다.

                 */
//                getHtml : function(htmlRes) {
//                    var targetHead =  document.getElementsByTagName("HEAD")[0];
//                    debugger
//                    // import javascript
//                    // src 속성이 있는 자바스크립트를 분리
//                    var re = /<\s*script[^><]*src="*(.*[\w\.\s/])"*>\s*<\/\s*script\s*>/ig
//                    var r;
//                    while(r = re.exec(htmlRes)) {
//                        var scriptStr = r[0].toString();
//                        var scriptElement = document.createElement('script')
//                        var scriptElement =   targetHead.appendChild(document.createElement('script'));
//                        scriptElement.type = 'text/javascript';
//                        scriptElement.src = twest.string.replace(r[1].toString(),"/","\/")  + "?_=" + new Date().getTime();
//                        targetHead.appendChild(scriptElement);
//                    }// while
//                    
//                    
//                    
//                    // import style  User style
//                    // href 속성이 있는 외부 스타일 시트를 불러온다.
//                    var re2 = /<link\s*[^<>]*href=\s*"?([\w\s\./]*)"?\s*[^<>]*\s*>/ig
//                    //var re = new RegExp(regexpStr1);  //Create regular expression object.
//                    var r2;
//                    while(r2 = re2.exec(htmlRes)) {
//                        var linkStr = r2[0].toString();
//
//                        //var linkElement=targetHead.appendChild(document.createElement('link'));
//                        var linkElement= document.createElement('link');
//                        linkElement.type = 'text/css';
//                        linkElement.rel = "StyleSheet";
//                        linkElement.href = twest.string.replace(r2[1].toString(),"/","\/") + "?_=" + new Date().getTime();
//                        targetHead.appendChild(linkElement);
//                    }
//                    
//                    
//                    
//                    // body
//                    var sHtml = "";
//                    var regexpStr3 = /<body[^>]*?>/im
//                    re = new RegExp(regexpStr3);  //Create regular expression object.
//                    r = re.exec(htmlRes);
//                    if(r != null){
//                        var sInBody = RegExp.rightContext;
//                        regexpStr3 = /<\/body>/im
//                        re = new RegExp(regexpStr3);  //Create regular expression object.
//                        r = re.exec(sInBody);
//                        sHtml = RegExp.leftContext;
//                    }
//                    //var nHtml = "<html><head>" + sScript + "</head><body>" + sHtml + "</body>";
//
//                    //$("#" + divId).html(sHtml+sScript);
//                    //document.getElementById(divId).insertAdjacentHTML("beforeEnd", sHtml+sScript);
//
//                    var replRe = /<\s*script[^><]*src="*.*[\w\.\s/]"*>\s*<\/\s*script\s*>/;
//                    var retStr =  sHtml.replace(replRe, "");
//                    return retStr; 
//                    
//                },
                writeOuterHtml:function(htmlRes, divId) {
                     var nHtml = twest.doc.getHtml(htmlRes);
                     $("#" + divId).outerHTML(nHtml);
                },
                /**
                 * HTML을 분해하여 HEAD에 javascript, css 를 추가한다.
                 */
                writeHtml : function(htmlRes, divId) {
                    var nHtml = twest.doc.getHtml(htmlRes);
                    $("#" + divId).html(nHtml);

                }// writeHtml
        };




        // ----------------------------------------------------------------------// Util Section
        /**
         * Utility 객체
         */
        twest.util = {
                /**
                 * 최소값을 반환한다.
                 * <pre>
                 *
                 * var a = 10;
                 * var b = 20;
                 * var c = twest.util.min(a, b);
                 *
                 * c의 값은  10 이다.
                 *
                 * </pre>
                 *
                 * @param val1  값 1
                 * @param val2  값 2
                 */
            min : function(val1, val2) {
                if (val1 < val2)
                    return val1;
                else
                    return val2;
            },
            /**
             * 입력값에 최소값을 반환한다.
             *
             * <pre>
             * var a = 10;
             * var b = 20;
             * var c = twest.util.max(a,b );
             *
             * 결과값은 20  이다.
             *
             * </pre>
             * @param val1   값 1
             * @param val2   값 2
             */
            max : function(val1, val2) {
                if (val1 < val2)
                    return val2;
                else
                    return val1;
            },
            /**
             *
             * 숫자값을 반올림한다.
             * TODO : 테스트하고 주석처리할 것
             *
             * @param num
             * @param dec
             */
            max : function(num, dec) {
                var temp = twest.util.decToDigit(dec);
                num = num * temp;
                num = Math.round(num);
                num = num / temp;
                return num;
            },
            decToDigit : function(dec) {
                var temp = 1;
                if (dec >= 1) {
                    for ( var i = 0; i < dec; i++) {
                        temp = temp * 10;
                    }
                } else if (dec < 1) {
                    for ( var i = dec; i < 0; i++) {
                        temp = temp / 10;
                    }
                }
                return temp;
            },


            /**
             * 컬렉션이 비어있는지 확인한다.
             *
             * @param collection 배열
             */
            isEmpty : function(collection) {
                if (!collection)
                    return true;
                if (collection.length == 0)
                    return true;
                return false;
            },

            /**
             * 날자객체를 문자열로 되돌립니다.
             *
             * @date    날자 객체
             * @concatChar 연결문자
             */
            getDateString : function(date, concatChar) {
                return date.getFullYear() + concatChar
                        + twest.string.lpad("" + (date.getMonth() + 1), 2, '0') + concatChar
                        + twest.string.lpad("" + date.getDate(), 2, '0') ;
                ;
            },


            /**
             * 날자를 yyyyMMdd 형식으로 되돌린다.
             * 예)  20121010
             *
             */
            getStringFromDate : function(date) {
                var today = date;
                var year  = today.getFullYear();
                var month = today.getMonth() + 1;
                var date  = today.getDate();
                return year.toString() + twest.string.lpad(month.toString(), 2, '0')
                        +  twest.string.lpad(date.toString(), 2, '0');
            },
            cloneDate : function(date) {
                return new Date(date.getTime());
            },
            /**
             * 날자를 더하거나 뺀다.
             *
             * @date  Date Object
             * @field  1. Year, 2. Month, 3. date
             * @val 음수값(-)이 들어오면 이전, 양수값이 들어오면 이후
             *
             */
            addDate : function(date, field, val) {
                if(field == 1) {
                    date.setFullYear( date.getFullYear() + val);
                }else if(field == 2) {
                    date.setMonth(date.getMonth() +  val);
                }else if(field == 3) {
                    date.setDate(date.getDate() + val);
                }
                return date;
            },
            /**
             * 입력된 문자열이 날자 타입이 맞는지 확인한다.
             * @param dateStr 날자 문자열
             *
             */
            validateDate : function(dateStr) {
                dateStr = twest.string.replace(dateStr, "-", "");

                var month = parseInt(dateStr.substring(4,6), 10);
                var year  = parseInt(twest.string.left(dateStr, 4), 10);
                var date  = parseInt(twest.string.right(dateStr, 2), 10);

                if(year < 1970) {
                    return false;
                }

                if(month < 1 || month > 12) {
                    return false;
                }

                if(date < 1 || date > 31) {
                    return false;
                }else {
                    var days = twest.util.daysInMonth(month, year) ;
                    //alert(days);
                    if(date > days) {
                       return false;
                    }
                }
                return true;
            },
            setTime : function(date, hour, minute, second) {
                date.setHours(hour);
                date.setMinutes(minute);
                date.setSeconds(second);
                return date;
            },
            /**
             * 해당 년월의 마지막 일자를 구한다.
             * @param month  월
             * @param year  년
             * @returns
             *      마지막 일자
             */
            daysInMonth: function(month, year) {
                var dd = new Date(year, month, 0);
                return dd.getDate();
            },

            /**
             * GET으로 전달받은 인자와 값을 JSON으로 반환
             *
             * Ex)
             * http://www.example.com/?me=myValue&name2=SomeOtherValue
             *
             * {
    		 *	"me"    : "myValue",
    		 *	"name2" : "SomeOtherValue"
    		 *  }
    		 *
    		 *  var first = twest.util.getUrlVars()["me"];
    		 *
    		 *
             *
             */
            getUrlVars : function() {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            },

            /**
             *  조건에 맞는 조직 스트링을 만든다.
             *  Ex)twest.util.cnvOrgString("twest",1) --> (twest)
             *
             *
             *  @param str 조직명
             *  @param type 조직유형
             *     1 : (회사명)
             *     2 : {부서명}
             *     3 : 사원은 별도의 규칙
             *     4 : #직위명#
             *     5 : $직책명$
             *     6 : !직무명!
             *     7 : %사용자 그룹명%
             *
             */
            cnvOrgString : function(str,type) {
            	var ret = null;

            	switch (type) {
            		case 1 : // 회사
            			ret = "(" + str + ")";
            			break;
            		case 2 : // 부서
            			ret = "{" + str + "}";
            			break;
            		case 4 : // 직위
            			ret = "#" + str + "#";
            			break;
            		case 5 : // 직책
            			ret = "$" + str + "$";
            			break;
            		case 6 : // 직무
            			ret = "!" + str + "!";
            			break;
            		case 7 : // 사용자그룹
            			ret = "%" + str + "%";
            			break;
            	}

            	return ret;
            },
            /**
             * 페이지가 모두 로드되어있는걸 체크하고 다시 리사이징 한다.
             */
            setResizeIframe : function(iframeId, targetId) {

            	var check = window.setInterval(function(){
            		if (twest.util.isImgLoaded()){
            			twest.util.resizeIframe(iframeId, targetId);
            			window.clearInterval(check);
            		}
            	},50);
            },
            /**
             * 해당 아이프레임을 리사이징 한다.
             * 아이프레임의 하단 내용에서 페이지가 로드될때 실행해야 한다.
             *
             */
            resizeIframe : function(iframeId, targetId) {
            	var body = document.body;

            	var height;
            	var width;

            	if(targetId) {
            		height = document.getElementById(targetId).scrollHeight;
            		width = document.getElementById(targetId).scrollWidth;

            	} else {
            		// TODO : 브라우저에 맞게 계산하는 로직 필요
            		// firefox height
            		if (navigator.userAgent.toLowerCase().indexOf('gecko') > -1 ) {
            			height = window.document.documentElement.scrollHeight;
            			if (height < body.scrollHeight) {
            				height = body.scrollHeight;
            			}
            			width = window.document.documentElement.scrollWidth;

            			if (width < body.scrollWidth) {
            				width = body.scrollWidth;
            			}

            		} else {
            			height = body.scrollHeight;
            			width = body.scrollWidth;

            		}

            	}


            	if(!iframeId ) {
            		if(!parent) {
            			alert("부모창이 존재하지 않습니다.");
            			return;
            		}


            		// id를 몰라도 자동으로 찾아서 설정할 수 있는 방법이 없을까
            		var url = location.href;

            		var iframes = parent.document.getElementsByTagName("iframe");

            		for (var i = 0; i < iframes.length; i++) {
            			// id파라미터가 없다면 현재 페이지와 부모창의 iframe중 src경로가 같은 경우에 해당 id가 맞는거라고 처리
            			if(iframes[i].src == url) {
            				iframeId = iframes[i].id;
            				break;
            			}
            		}
            	}


            	var iframe = parent.document.getElementById(iframeId);

            	if (!iframe) {
            		alert("iframe을 찾을 수 없습니다.");
            		return;
            	}

            	if(height > 0) {
            		iframe.height = height + "px";
            	}
            	if(width > 0) {
            		iframe.width = width + "px";
            	}
            },
            /**
             * 페이지의 이미지가 모두 로딩이 완료 했는지 체크한다.
             */
            isImgLoaded : function() {
            	var imgs = document.getElementsByTagName("img");

            	for (var i = 0; i < imgs.length; i++) {
            		if (!imgs[i].complete) {
            			if (navigator.userAgent.indexOf('MSIE') > -1) {
            				if(imgs[i].readyState == "uninitialized") {
            					continue;
            				}
            			}
            			return false;
            		}
            	}

            	return true;
            },
            /**
             * iframe영역만 프린트한다.
             */
            printIframe : function(iframeId) {
            	frames[iframeId].focus();
            	frames[iframeId].print();
            },
            /** dummy function */
            dummy : function() {
                // not used
            },
            cleanXSSByBlockingTag : function(value) {
    			if(value != '') {
    				value = twest.string.replace(value, "<" , "&lt;");
    				value = twest.string.replace(value, ">" , "&gt;");
    				value = twest.string.replace(value, "\"" , "&quot;");
    				value = twest.string.replace(value, "," , "."); //57155 이름명에 쉼표들어가는 오류수정
    				//value = twest.string.replace(value, " ", "&nbsp;");
    			}
    			return value;
    		},
    		/**
    		 *
    		 */
    		strNumToFileSize : function(num, fixed) {
    			var ret = "";
    			var bias = 1024;
    			num = parseInt(num,10);
    			if (num < bias) {
    				ret = num.toFixed(fixed) + "Byte";
    			} else if (num >= bias && num < (bias * bias)) {
    				ret = (num / bias).toFixed(fixed) + "KB";
    			} else if (num >= (bias * bias) && num < (bias * bias * bias)) {
    				ret = (num / (bias * bias)).toFixed(fixed) + "MB";
    			} else if (num >= (bias * bias * bias) && num < (bias * bias * bias * bias)) {
    				ret = (num / (bias * bias * bias)).toFixed(fixed) + "GB";
    			}

    			return ret;
    		},
    		strNumToSize : function(num, fixed) {
    			var ret = "";
    			var bias = 1024;

    			if (num < bias) {
    				ret = num.toFixed(fixed) + "Byte";
    			} else if (num >= bias && num < (bias * bias)) {
    				ret = (num / bias).toFixed(fixed) + "KB";
    			} else if (num >= (bias * bias) && num < (bias * bias * bias)) {
    				ret = (num / (bias * bias)).toFixed(fixed) + "MB";
    			} else if (num >= (bias * bias * bias) && num < (bias * bias * bias * bias)) {
    				ret = (num / (bias * bias * bias)).toFixed(fixed) + "GB";
    			}

    			return ret;
    		},
    		/**
    		 * 확장자 체크
    		 * @param val 체크할 확장자명
    		 * @param limitExtArr 허용된 확장자 배열
    		 */
    		chkExt : function (val,limitExtArr) {
    		    var len = limitExtArr.length;
    		    for (var i=0; i < len; i++) {
    		        if (limitExtArr[i] == val) return true;
    		    }
    		    return false;
    		},

    		/**
    		 * ie버전을 반환.
    		 * ie가 아니면 -1반환.
    		 */
			ieVersion: function(){
				if(typeof this.ieVer != 'undefined') {
					
					return this.ieVer;
				}
				var rv = -1;
				if (navigator.appName == 'Microsoft Internet Explorer')
				{
					var ua = navigator.userAgent;
					var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) {
						rv= parseFloat( RegExp.$1 );
					}
				} else if (navigator.appName == 'Netscape') {
					var ua = navigator.userAgent;
					var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) {
						rv = parseFloat( RegExp.$1 );
					}
				}
				this.ieVer = rv;

				return rv;
			}
        };

        // -------------------------------------------------------------------------- JSON Section
        /**
         * JSON 처리
         */
        twest.json = {
            /**
             * 데이타 객체를 쿼리스트링으로 변환합니다.
             *
             * <pre>
             *
             * var json = { name : "kim", age : 10 };
             * var str = twest.json.toQueryString(json);
             *
             * 결과값은 다음과 같다.
             *
             * "&name=kim&age=10"
             *
             * </pre>
             * @param dataObject 데이타 객체
             */
            toQueryString : function(dataObject) {
                var result = "";
                for ( var prop in dataObject) {
                    result += "&" + prop + "=" + dataObject[prop];
                }//for
                return result;
            },
            /**
             *
             * JSON 객체를 문자열로 변환한다.
             *
             * <pre>
             *
             * var jsonObject = new Object();
             * jsonObject.name = "kim";
             * jsonObject.age = 10;
             *
             * var convertedString = twest.json.getJSONString(jsonObject);
             *
             * 결과값은 다음과 같다.
             *
             * {name:"kim", age : 10 }
             *
             * </pre>
             *
             *  @param object
             */
            getJSONString : function(object) {
            	//return $.toJSON(object);
                return JSON.stringify(object);  // 객체를 JSON 문자열로 반환 
            },
            /** dummy function */
            dummy : function() {
                // not used
            }
        };

        // -------------------------------------------------------------------------- HTTP Section
        twest.http = {

            /**
             *    AJAX 통신 함수, jQuery의 $.ajax() 함수의 래핑 함수입니다.  호출방법은 아래와 같습니다.
             *
             *   var options = {
             *            url : "/inc/guide/guideUserList",
             *            sendDataType : "json", // default
             *            contentType:"application/json", 
             *            dataType : "html",
             *            target : document.body, // loading bar 표시위치
             *            type : "post",
             *            success : function(htmlRes, statusText) {
             *                    twest.doc.writeHtml(htmlRes, "userListDiv");
             *            }// success
             *   }; // optionsuide
             *
             *   twest.http.ajax(options);
             *
             *   자세한 사용방법은 화면개발가이드를 참조하세요.
             *
             *
             *    호출할때 파라미터로 넘기는 파라미터는 { } 표기법을 사용하여 넘기면 됩니다. 파라미터는 jQuery의
             * 파라미터 이름을 사용하고 추가적으로 정의된 파라미터가 존재합니다. 아래는 파라미터에 대한 설명입니다.
             *
             *    acceepts
             *       어떤 응답을 보낼지 서버에게 알리기 위해 Request Header에 보내는 content type이다.
             *       accetps setting의 수정이 필요하면, $.ajaxSetup()을 메소드를 사용한다.
             *    async
             *       디폴트로, 모든 요청은 비동기로 보내진다. 디폴트로 true 값이 설정된다.  동기식 요청을 보내고
             *       싶으면 false 값을 설정한다.  Cross-domain 요청과 dataType:"jsonp" 요청은 동기식을 지원하지
             *       않는다.
             *
             *    beforeSend(jqXHR, settings)
             *        요청전 callback function은 그것이 전송되기 전에  jqXHR을 수정할 수 있다.
             *    cache
             *        기본값은 true 이다. dataType 'script'와  'jsonp'을 위해서는 false을 설정한다.  false로
             *        설정하면 브라우져는 cache를 하지 않는다.
             *    complete(jqXHR, textStatus)
             *        요청이 완료되었을 때 실행되는 함수이다. success와 error callback들이 실행된 이후에 실행
             *        된다. textStatus에 전달되는 값은 다음과 같다.
             *        "success", "notmodified", "error", "timeout", "abort", or "parsererror"
             *
             *    contents
             *        string/정규식 쌍의 map이다. 이것은 jQuery가 response을 그것에 주어진 content type으로 파싱
             *        하는 방법을 결정한다.
             *    contentType
             *        데이터가 서버로 전송될 때 content-type이 사용된다.  기본값은 "application/x-www-form-urlencoded"
             *        인 데, 그것은 대부분의 경우에 좋다. 데이터는 항상 UTF-8 charset을 사용해서 서버로 전송된다.
             *        적절히 서버에서 decode 해야 한다.
             *        
             *        서버에 queryString이 아닌 JSON 문자열을 그대로 보내고 싶은 경우에는 
             *        application/json으로 설정한다. 
             *    context
             *        설명을 나중에 추가
             *    converters
             *       기본값 : {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}
             *       응답의 값을 변경하기 위한 함수를 반환한다.
             *
             *    crossDomain
             *       생략
             *    data
             *       서버로 전송될 데이터.
             *    dataFilter(data, type)
             *        생략.
             *    dataType (※주의 : $.ajax에서 사용하는 option을 제어할수는 없다.)
             *       서버로 부터 되돌려 받을 데이터 타입. 값이 정해지지 않으면 MIME 타입을 이용한다.
             *       다음의 값을 사용할 수 있다. xml,"html","script","json","jsonp""text", "file"
             *    error(jqXHR, textStatus, errorThrown)
             *       요청이 실패하면 호출되는 함수이다. textStatus에 허용되는 값은 null을 포함하여
             *       "timeout", "error", "abort", "parsererror" 이다. HTTP error가 발생하면 errorThrown은
             *       HTTP의 문자열 상태값 "Not Found", "Internal Server Error" 와 같은 값을 받는다.
             *    global
             *       생략.
             *    headers
             *        key/value 쌍의 맵. 요청과 함께 서버로 보내진다.  beforeSend 함수가 호출되기 전에 설정된다.
             *    ifModified
             *        생략
             *    isLocal
             *        생략
             *    jsonp
             *        jsonp 요청에서 jsonp callback function 이름을 오버라이드 한다.  추가적인 설명 필요 .
             *    jsonpCallback
             *        JSONP 요청에 대한 callback function 이름을 명시한다.
             *    mimeType
             *        XHR mime thype을 오버라이드 할 mime type.
             *    password
             *        HTTP access authentication 요청에서 사용되는 패스워드.
             *    processData
             *        생략.
             *    scriptCharset
             *        생략.
             *    statusCode
             *        numeric HTTP code들의 맵이다.
             *
             *        $.ajax({
             *            statusCode: {
             *               404: function() {
             *                    alert('page not found');
             *               }
             *           }
             *        });
             *
             *    success(data, textStatus, jqXHR)
             *       요청이 성공했을 때 호출되는 함수이다.
             *    timeout
             *       요청에 대한 타임아웃을 밀리세컨드로 설정한다.
             *    traditional
             *       생략.
             *    type
             *        디폴트는 GET이다.  POST 또는 GET으로 설정. 다른 메소드인  PUT , DELETE도 여기서 사용될 수
             *        있다.
             *    url
             *        요청을 보낼 URL.
             *    username
             *        HTTTP access authentication 요청에서 사용할 사용자 이름.
             *    xhr
             *       XMLHttpRequest 객체를 생성할 콜백.
             *    xhrFields
             *       생략.
             *    target
             *       로딩이미지가 표시될 영역이 될 요소를 정의한다. document.body 처럼 요소를 직접써도 되고,
             *       jQuery의 selector를 사용할 수 있다.  예를들어 .contents 는  class=".contents" 가 적용된
             *       요소를 선택한다.
             *    errorProcType
             *       에러 처리 방법. 에러가 발생하면 alert로 띄울지 아니면 html을 되돌릴지를 결정한다. 사용자
             *       정의 callback에는 별도로 처리하고 시스템에서 처리하는 방법을 명시.
             *
             *       시험중.
             *
             */
            ajax : function(opts) {
                // default options
                var settings = {
                    url : "",
                    target : document.body,
                    errorProcType : "alert", // 에러처리 방식 alert, html
                    data : {}, // 요청 데이터
                    success : function() {
                    }, // 응답성공시 실행할 함수
                    error : function(xhr, statusText) {
                       //alert($.toJSON(xhr));

                    }, // 에러발생시 실행할 함수
                    dataType : "json",                 //  응답데이터 유형  json, xml, html, script, json, jsonp, text, file
                    type : "post",                       // 전송방법 기본값  post, (get/post),  
                    sendDataType : "undefined",
                    contentType : "undefined",     //default: application/x-www-form-urlencoded;charset=UTF-8
                                                           // contentType="application/json"인 경우에는 type:"post"로 설정해야 함.
                    blind : false, // '잠시만 기다려 주세요' 표시 유무, 기본은 보여 줌.  커스텀 옵션
                    modal : false, //반투명한 검은색 레이어 표시
                    showLoadingImg : true //로딩 이미지 표시 유무
                };

            	var dns = document.location.href; //<-- 현재 URL 얻어온다
        	    var arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
        	    //현재 도메인
        	    var _nowDomain = arrDns[1].substring(0,arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다 
        	    
                // history에 해당 값 추가
                if(opts.history && opts.url && opts.url.indexOf("insert") == -1 && opts.url.indexOf("update") == -1) {
                	twest.http.history.addHistory(opts);
                }

                $.extend(settings, opts);

//                if(settings.contentType!="undefined"){
//                	settings.url = frameworkProperties.context + twest.string.trim(settings.url);
//                }else

                // 서버 프레임워크에서 에러발생시 처리방법을 결정하기 위해 _REQ_DATA_TYPE_  에
                // dataType을 값을 설정함.
                // 서버에서 useWrappedObject가 true인 경우에는 ResponseData.class를 사용하여 오류정보를 반환함.
                // 브라우져에서 REQ_DATA_TYPE, USE_WRAPPED_OBJECT의 값을 전달하면 
                // 에러처리에 대한 공통 로직을 사용할 수 있음.
                // jquery plugin 중에서 dynatree 혹은 다른 plugin에서 자체적으로 ajax 통신을 하는 경우에는
                // 이 두개의 파라미터 값이 없으므로 에러처리 공통 로직을 사용하지 않음. 
                settings.url = frameworkProperties.context + twest.string.trim(settings.url);

                //settings.url +=  "&ajax=true";
                //alert(settings.url);
                //alert(settings.async);

                
                // make the request data.
                // setttings.data == "object"이면 JSON 객체임.  JSON객체를 문자열로 변환해야 함.   JSON.stringify를 사용하는 것으로 통일
                // JSON 객체는 문자열로 변환하여야 함.   twest.json.getJSONString() 함수를 사용함.
                // 나머지는 변환하지 않고 $.ajax()에 넘겨 줌.
             
                var sendData;
                if(settings.contentType!="undefined"){
                    sendData = (typeof settings.data == "object")  ? twest.json.getJSONString(settings.data) : settings.data;
                } else if (settings.sendDataType == "json") {
                    sendData = (typeof settings.data == "object")  ? twest.json.getJSONString(settings.data) : settings.data;
                    sendData = "__REQ_JSON_OBJECT__=" + encodeURIComponent(sendData);
                } else {
                    sendData = settings.data;
                }
                
                // make the default timeout value.
                var timeoutValue = (settings.timeout) ? settings.timeout : 60000; // default 10초
                // make a loading image
                var ctime = new Date().getTime();
                var randomVal = Math.floor(Math.random() * 100) + 1;
                var divId = "DIV" + ctime + "_" + randomVal;

                //####### file download의 경우 #############
                if (settings.dataType == 'file') {
                    $.fileDownload(frameworkProperties.context + opts.url,
                    	{
                    		data: sendData,
                    		httpMethod: settings.type,
                    		successCallback: function (url) {
                    			if (opts.success) {
                    				opts.success();
                    			}
                    		},
                    		failCallback: function (html, url) {
                    			if (opts.error) {
                    				opts.error();
                    			}
                    		},
                    		failMessageHtml: common_twestjs_message_download //"다운로드에 실패했습니다."
                    	}
                    );
                    return;
                }
                //####### download가 아닌 경우 #############
                var options = {
                    url : settings.url, // 요청URL
                    async : settings.async, // 동기식
                    data : sendData,
                    // -------------------------------------------------------------beforeSend
                    beforeSend : function(xhr) {
                    	if(settings.beforeSend) {
                    		settings.beforeSend(xhr);
                    	}
                    	var target = (typeof settings.target == "string") ? $(settings.target).get(0) : settings.target;
                    	
                    	if($(target).length == 0){
                        	target = document.body;
                        }
                    	
                    	
                    	xhr.setRequestHeader("twestAjax",settings.dataType); //서버에서 ajax통신중 발생하는 오류를 인식하기 위해
                        // before sending a request, display the loading image.                       
                        var newDiv = document.createElement("div");
                        newDiv.id = divId;
                        
                        $(target).append(newDiv);                                         
                        $("#" + divId).addClass("loading_lyr");                                                
                        
                        var html = "";
                        if(settings.blind){
                        	html = "<div class=\"msg_box\">"	
           					 + "  <span>"  + common_twestjs_message_wait + "</span>" // 잠시만 기다려 주세요
           			         + "</div>"
           			         + "<div class=\"blind\"></div>";
                        }else if(settings.modal){
                        	html = "<div class=\"blind\"></div>";
                        }else if(settings.showLoadingImg){
                        	html = "<div class=\"img_box\"><span>"+ common_twestjs_message_wait + "</span></div>";
                        }
                        
                        $("#" + divId).append(html);
                                                                     
                        /*var target = (typeof settings.target == "string") ? $(settings.target).get(
                                0) : settings.target;
                        var rect = twest.ui.getBounds(target);
                        var offset = $(target).offset();
                        
                        $("#" + divId).css("visibility", "visible");
                        $("#" + divId).css("top", offset.top);
                        $("#" + divId).css("left", offset.left);
                        $("#" + divId).css("position", "absolute");
                        // added by
                        $("#" + divId).css("width", rect.width);
                        $("#" + divId).css("height", rect.height);
                        $("#" + divId).css("text-align", "center");
                        // TODO : 이미지 경로?
                        $("#" + divId).css(
                                {
                                    backgroundImage : "url('"+frameworkProperties.context +"/resources/biz/common/img/loading.gif')",
                                    backgroundRepeat : "no-repeat",
                                    backgroundPosition : "50% 50%"
                                });*/                        
                    }, // the end of beforeSend
                    // ------------------------------------------------------------- success
                    success : function(responseData, statusText) {
                	    
                        $("#" + divId).remove(); // delete the loading image.
                        
                        if (!responseData) {
                            return;
                        }// 응답데이타가 없다면 아무것도 하지 않음. 어떻게 하지?

                        var resObject = responseData;

                        //server framework에서 반환하는 구조확인
                        if (resObject.responseCode) {
                        	if (parseInt(resObject.responseCode) == 0) {
                        		if (settings.success) {
                        			settings.success(resObject, statusText);
                                }
                            } else if (parseInt(resObject.responseCode) == 999) { //세션없다면
                            		
                            	var goUrl = "";
                            	if(_nowDomain == frameworkProperties.mobileDomain) {
                            		goUrl = frameworkProperties.context +"/common/error/mobileLoginFail.jsp";
                            	} else{
                            		goUrl = frameworkProperties.context +"/common/error/loginFail.jsp";
                            	}
                                	
                            	if(opener){
                            		document.location.href = goUrl;
                            	}else if(parent){
                            		parent.document.location.href = goUrl;
                            	}else{
                            		document.location.href = goUrl;
                            	}
                                	
                            	return;
                            	//BaseMultiActionController => @ExceptionHandler 를 거쳐서 여기로 옴
                            } else if (parseInt(resObject.responseCode) <= 900 && parseInt(resObject.responseCode) >= 600) { //커스텀 에러 처리
                            	var param = "";
                            	if(resObject.responseText.indexOf("|")>-1){
                            		param = resObject.responseText.split("|")[1];
                            	}
                            	var goUrl = frameworkProperties.context +"/common/error/"+resObject.responseText+".jsp"+param;
                                	
                            	if(opener){
                            		document.location.href = goUrl;
                            	}else if(parent){
                            		parent.document.location.href = goUrl;
                            	}else{
                            		document.location.href = goUrl;
                            	}
                                	
                            	return;
                            } else if (parseInt(resObject.responseCode) == 500) {
                            	if (settings.errorProcType == "alert") {
                            		//alert("시스템 오류입니다.\n" + resObject.systemError);    // TODO :다국어 처리 필요
                            		if(_nowDomain == frameworkProperties.mobileDomain) { //모바일 페이지라면
                            			document.location.href =  frameworkProperties.context +"/common/error/error.jsp";
                            		} else{
                            			twest.ui.showAjaxError(resObject);
                            			settings.error(resObject, statusText);
                            		}
                            	}
                            } else {
                            	if (settings.errorProcType == "alert") {
                            		if(_nowDomain == frameworkProperties.mobileDomain) { //모바일 페이지라면
                            			document.location.href =  frameworkProperties.context +"/common/error/error.jsp";
                            		} else{
                            			twest.ui.showAjaxError(resObject);
                            			settings.error(resObject, statusText);
                            		}
                            	}
                            }
                        }else {
                        	settings.success(responseData, statusText); // callback 함수 직접 호출
                        }
                    },
                    // 통신오류
                    error : function(xhr, statusText) {

                    	$("#" + divId).remove();
                    	
                    	//ajax 호출중 페이지 이동시 오류창 표시안해야 됨 (리턴값: status값 0,statusText값이 error),호출취소시 오류표시 안함.
                    	if(xhr.readyState == 0 && xhr.status == 0 && (statusText == 'error' || statusText == 'abort' )){
                    		return;
                    	}

                        if (settings.error) {
                            if (settings.errorProcType == "alert") {
                                //alert("statusText=====::::=" + statusText);


                                //alert("xhr.status=" + xhr.status);


                                var errCode = xhr.status;
                                var errMsg = "";
                                // TODO : 다국어 처리
                                switch (xhr.status) {
                                //문제점 : 서버 접속이 안될 경우와 ajax호출중 페이지 이동시 동일한 응답(status:0)이 오므로 메세지 처리가 불가능
                                //case 0:
                                //    errMsg = "서버에 접속할 수 없습니다."; 
                                //    break;
                                case 404:
                                    errMsg = common_twestjs_message_404; // "요청하신 페이지를 찾을 수 없습니다.";
                                    break;
                                case 500:
                                    errMsg = common_twestjs_message_500; //"서버에서 오류가 발생했습니다.";
                                    break;
                                case 408:
                                    errMsg = common_twestjs_message_408; //"서버로 부터 응답이 없습니다(Timeout).";
                                    break;
                                default:
                                    errMsg = common_twestjs_message_unknown; //"알수없는 오류가 발생했습니다.";
                                    break;
                                }
                                
                                switch (xhr.statusText) {
                                case 'timeout':
                                	errMsg = common_twestjs_message_timeout //"지정된 응답 시간을 초과했습니다. ("+timeoutValue/1000+"초)";
                                	break;
                                }
                                
                                var resObject = {
                                    reqURL : settings.url,
                                    responseCode : errCode,
                                    responseText : errMsg,
                                    systemError : '수신된 서버의 오류 메시지가 없습니다.'
                                };

                                if(_nowDomain == frameworkProperties.mobileDomain) { //모바일 페이지라면
                                	document.location.href = frameworkProperties.context +"/common/error/error.jsp";
                            	} else{
                            		twest.ui.showAjaxError(resObject);
                                    settings.error(xhr, statusText);
                            	}                      
                            }
                        }
                    },
                    type : settings.type, // POST / GET
                    timeout : timeoutValue,
                    complete : function(xhr) {
                        // 호출이 안되는 이유는???
                    }
                };


                //alert("url=" + settings.url);
                if(settings.contentType!="undefined"){
                	var addOption = {"contentType":settings.contentType};
                	$.extend(options,addOption);
                }
                
                if(settings.complete){
                	var addOption = {"complete":settings.complete};
                	$.extend(options,addOption);
                }

                return $.ajax(options);
            },
            /**
             * ajax에 대한 history를 관리한다.
             */
            history : {
            	state : [],
            	/**
            	 * 신규 히스토리를 추가한다.
            	 */
            	addHistory : function(opts) {
            		this.makeHash(opts);
        			location.hash = opts.hash;
        			// 맥시멈 히스토리 숫자는 50으로 제한한다.
        			if (this.state.length >= 50) {
        				this.state.shift();
        			}
        			if (opts.data) {
        				// parameter data call by address 방지
        				opts.data = $.extend({}, opts.data);
        			}
        			this.state.push(opts);
            	},
            	/**
            	 * 주소내 hash url이 변경될시 동작하는 이벤트
            	 */
            	hashChange : function(evt) {
            		// 히스토리 내에서 데이터 검색
            		if (evt && (!location.hash || location.hash == "#")) {
            			evt.preventDefault();
            		}

            		var opts = this.findHistory(location.hash);
            		// TODO : 새로고침인경우 히스토리를 찾아낼 수 있는 로직 필요
            		if (opts && (opts.restore || (opts.hash != this.state[this.state.length - 1].hash))) {
            			opts.history = false; // 무한루프 방지
            			opts.restore = false;
            			this.moveLastOrder(opts);

            			// 다이얼로그 열려있으면 모두 닫음
            			try{
            				$(".ui-dialog .ui-dialog-content").dialog("close");
            			} catch(e) {
            				//console.info("닫다가 에러났어요" + e.message);
            			}

            			twest.http.ajax(opts);

            			var ifName = opts.callName;
            			if (!ifName) {
            				var ifNameArr = opts.url.split("/");
            				ifName = ifNameArr[ifNameArr.length - 1];
            			}

            			var param = {type : ifName, data : opts, evt : evt};
            			// 사용자 커스터마이징 이벤트 호출
            			ObserverControl.notifyObservers(param);
            		}
            	},
            	/**
            	 * 히스토리를 구분할 키를 생성한다.
            	 */
            	makeHash : function(opts) {
            		var hash = "#" + encodeURIComponent(opts.url) + "!" + Date.now();
            		opts.hash = hash;
            	},
            	/**
            	 * 모든 히스토리를 초기화한다.
            	 */
            	removeHistory : function() {
            		this.state = [];
            	},
            	/**
            	 * 히스토리 오브젝트를 찾아서 리턴한다.
            	 */
            	findHistory : function(hashCode) {
            		for (var i = 0; i < this.state.length; i ++) {
            			if (this.state[i].hash == hashCode) {
            				return this.state[i];
            			}
            		}
            	},
            	/**
            	 * 히스토리를 쿠키 및 스토리지에 저장해놓는다
            	 */
            	historyLocalSave : function() {
            		var stateList = [];
            		for (var i = 0; i < this.state.length; i++) {
            			var state = this.state[i];
            			// function string으로 치환 해서 저장
            			state.success = this.state[i].success.toString();
            			stateList.push(state);
            		}
            		if (typeof(Storage) !== "undefined") {
            			// html5 localStorage 저장
            			sessionStorage.state = JSON.stringify(stateList);
            		} else {
            			// cookie 저장
            			// cookie max size가 4kb여서 history 데이터가 잘릴 가능성이 매우 큼.
            			twest.http.setCookie("state", JSON.stringify(stateList));
            		}
            	},
            	/**
            	 * 스토리지 및 쿠키에 저장되있는 히스토리 정보를 복원시킨다.
            	 */
            	restoreLocalSave : function() {
            		var stateList = [];

            		if (typeof(Storage) !== "undefined") {
            			// html5 localStorage 저장
            			if(sessionStorage.state){
            				stateList = JSON.parse(sessionStorage.state);
            			}
            		} else {
            			// cookie
            			stateList = JSON.parse(twest.http.getCookie("state"));
            		}

            		for (var i = 0; i < stateList.length; i++) {
            			// function string을 다시 function으로 변환
            			eval("stateList[" + i + "].success = " + stateList[i].success);
            		}

            		twest.http.history.state = stateList;
            	},
            	/**
            	 * 현재 히스토리 오브젝트를 맨 마지막 순위로 변경시킨다. 로직 재호출 방지용.
            	 */
            	moveLastOrder : function(opts) {
            		for (var i = 0; i < this.state.length; i ++) {
            			if (this.state[i].hash == opts.hash) {
            				this.state.splice(i, 1);
            				this.state.push(opts);
            			}
            		}
            	}
            },
            /**
             * cookie 값을 설정한다.
             *
             * <pre>
             *
             * 1) 쿠키값만 설정할 경우
             *     twest.http.setCookie('myCookie", 1111);
             *
             * 2) 쿠키값 및 만료일을 설정할 경우
             *
             *     var expDate = new Date();
             *     // 현재시간 + 1일로 만료시간 설정
             *     expDate.setTime(ExpDate.getTime() * 1000 * 60 * 60 * 24);
             *     twest.http.setCookie('myCookie', 1111, expDate);
             *
             * </pre>
             *
             * @param name     쿠키이름
             * @param value    쿠키값
             * @param expries  쿠키설정무효화 시간(생략가능)
             *                  millisecond 이므로 계산하기 쉽게 1000을 곱하면 됨.
             *                  (하루는 24시간) * (1시간은 60분) * (1분은 60초) * (밀리세컨 1000)
             *                  1) 1시간을 설정
             *                      1 * 60 * 60 * 1000
             *                  2) 하루를 설정
             *                      24 * 60 * 60 * 1000
             *
             * @param path     쿠키경로(생략가능)
             *                  문서의 경로명 설정. 설정하지 않으면 현재 Cookie를 보내는 문서의
             *                  URL 상의 경로(도메인 명 제외)
             * @param domain   도메인(생략가능)
             *                 웹 서버의 도메인 설정. 설정하지 않으면 Cookie를 보내는 문서가 속한
             *                 도메인 명으로 설정된다.
             * @param secure   보안여부(생략가능)
             *                 HTTPS Server와 같은 Secure server에서 Cookie를 보낼대 이 값을 설정
             */
            setCookie : function(name, value, expires, path, domain, secure) {
                // Set-Cookie 구조
                // name=value;expires=date;path=path domain=domain_name;secure
                // example>
                //
                // set time, it's in milliseconds
                var today = new Date();
                today.setTime(today.getTime());

                /*
                 if the expires variable is set, make the correct
                 expires time, the current script below will set
                 it for x number of days, to make it for hours,
                 delete * 24, for minutes, delete * 60 * 24
                 */
                if (expires) {
                    expires = expires * 1000 * 60 * 60 * 24;
                }
                var expires_date = new Date(today.getTime() + (expires));

                document.cookie = name + "=" + escape(value)
                        + ((expires) ? ";expires=" + expires_date.toGMTString() : "")
                        + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "")
                        + ((secure) ? ";secure" : "");
            },
            /**
             * 쿠키값을 읽어 옵니다.
             *
             *  @param cookieName 쿠키의 이름
             */
            getCookie : function(cookieName) {
                var i, x, y;
                var cookies = document.cookie.split(";");

                for (i = 0; i < cookies.length; i++) {
                    x = cookies[i].substr(0, cookies[i].indexOf("="));
                    y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == cookieName) {
                        return unescape(y);
                    }
                }
            },
            /**
             * 쿠키값을 제거합니다.
             *
             *  @param name 쿠키의 이름
             *  @param path 경로 (생략가능)
             *  @param domain 도메인(생략가능)
             */
            deleteCookie : function(name, path, domain) {
                if (twest.http.getCookie(name))
                    document.cookie = name + "=" + ((path) ? ";path=" + path : "")
                            + ((domain) ? ";domain=" + domain : "")
                            + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
            },

            /** dummy function */
            dummy : function() {
                // not used
            }
        };

        // ----------------------------------------------------------------------- Data Section
        /**
         * HTML Form 처리
         */
        twest.data = {

            /**
             * 입력된 JSON 객체의 값을 html element에 채웁니다.
             *
             * <pre>
             *
             * HTML Form의 input 요소를 다음과 같이 작성했다. 언더스코어(_) 까지는 namespace로 사용
             * 하는 접두사이다.  실제의 객체의 필드는 userId 라고 생각하면 된다.
             *
             * <input type="text" name="UserInfo_userId" value="" />
             * <input type="text" name="UserInfo_userName" value="" />
             *
             *
             *  서버로 부터 응답으로 받은 JSON은  다음과 같다.
             *  { userId : "happy", userName: "Kim " }
             *
             *  이것을 이용하여 form의 요소에 값을 채우는 방법은 다음과 같다.
             *
             *  twest.data.setForm(json, "UserInfo_");
             *
             *  필드 이름과 같은 이름의 폼 요소를 찾아서 값을 설정한다.
             *
             * </pre>
             *
             *  @param jsonObj   JSON  객체
             *  @param namespace  이름이 충돌되지 않도록 Domain Class의 필드앞에 붙인 접두사.
             *  @param baseJqObject 특정 jquery object하위만 찾을 때 지정하며 지정하지 않으면 문서전체탐색.
             */
            setForm : function(jsonObj, namespace, baseJqObject) {
                this.setFormRecursive("", jsonObj, namespace, baseJqObject);
            },
            /**
             * setForm의 내부적인 함수 입니다.
             *
             * @para`"m parentElementName  부모객체의 이름
             * @param jsonObj   json 객체
             * @param namespace  이름공간
             * @param baseJqObject 탐색을 시작할 jquery object
             */
            setFormRecursive : function(parentElementName, jsonObj, namespace, baseJqObject) {
                //alert('ok');
                var prefix = (parentElementName == "") ? "" : parentElementName + ".";
                for ( var key in jsonObj) {
                    //var srchKey = prefix + key;
                    var srchKey = prefix + namespace + key;
                    //var eArr = $("*[data-name='" + srchKey + "']");  // html element 검색
                    var eArr = $("*[name='" + srchKey + "']", baseJqObject); // html element 검색
                    if (!eArr)
                        continue; //  엘리먼트가 없으면 skip
                    var propValue = jsonObj[key];
                    if(!propValue)
                        continue;
                    var e = eArr[0];
                    if (typeof propValue == "object") {
                        // 배열
                        if (propValue.constructor.toString().indexOf("Array") > -1) {
                            // 배열일 경우에는 checkbox, select multiple 처리
                            if (!e)
                                continue;
                            if (e.type == "checkbox") {
                                for ( var j = 0; j < eArr.length; j++) {
                                    eArr[j].checked = false; // initialize
                                }
                                for ( var i = 0; i < propValue.length; i++) {
                                    for ( var j = 0; j < eArr.length; j++) {
                                        if (propValue[i] == eArr[j].value) {
                                            eArr[j].checked = true;
                                        }
                                    }// for j
                                }//for i
                            } else if (e.type == "select-multiple") {
                                for ( var i = 0; i < e.options.length; i++) {
                                    var opt = e.options[i];
                                    opt.selected = false;
                                }
                                for ( var i = 0; i < e.options.length; i++) {
                                    var opt = e.options[i];
                                    for ( var j = 0; j < propValue.length; j++) {
                                        if (propValue[j] == opt.value) {
                                            opt.selected = true;
                                        }
                                    }
                                }// for
                            }
                        } else {
                            // JSON Object
                            //this.setFormRecursive(prefix + key, propValue);
                            this.setFormRecursive(prefix + key, propValue, namespace, baseJqObject);
                        }
                    } else {

                        if (!e) {
                            continue;
                        } // element가 없으면 skip
                        if (e.type) {
                            if (e.type == "text") {
                                if ($(e).hasClass("comma")) {
                                    e.value = twest.string.formatComma(propValue);
                                } else if ($(e).hasClass("residentId")) {
                                    e.value = twest.string.formatResidentId(propValue);
                                } else if ($(e).hasClass("telephone")) {
                                    e.value = twest.string.formatTelephone(propValue);
                                } else if ($(e).hasClass("zipcode")) {
                                    e.value = twest.string.formatZipCode(propValue);
                                } else {
                                    e.value = propValue;
                                }
                            } else if (e.type == "hidden" || e.type == "password"
                                    || e.type == "textarea") {
                                e.value = propValue;
                            } else if (e.type == "checkbox") {
                                for ( var i = 0; i < eArr.length; i++) {
                                    eArr[i].checked = false;
                                    if (eArr[i].value == propValue) {
                                        eArr[i].checked = true;
                                    }
                                }// for
                            } else if (e.type == "radio") {
                                for ( var i = 0; i < eArr.length; i++) {
                                    eArr[i].checked = false;
                                    if (eArr[i].value == propValue) {
                                        eArr[i].checked = true;
                                        break;
                                    }
                                }// for
                            } else if (e.type == "select-one") {
                                for ( var i = 0; i < e.options.length; i++) {
                                    var opt = e.options[i];
                                    opt.selected = false;
                                    if (opt.value == propValue) {
                                        opt.selected = true;
                                        break;
                                    }
                                }// for
                            } else if (e.type == "select-multiple") {
                                for ( var i = 0; i < e.options.length; i++) {
                                    var opt = e.options[i];
                                    opt.selected = false;
                                    if (opt.value == jo) {
                                        opt.selected = true;
                                    }
                                }// for
                            }
                        } else {
                            //
                            e.innerHTML = propValue;
                        }
                    }
                }// for
            },
            setJSONMember : function(rootObject, e) {
                //                var dataName = $(e).attr('data-name');
                var dataName = $(e).attr('name');
                //alert(dataName);
                if(!dataName) return;

                if (/* 객체안의 객체 */dataName.indexOf(".") > 0) {
                    var names = dataName.split(".");
                    var jsonMember = null;

                    for ( var i = 0; i < names.length - 1; i++) {
                        if (i == 0) {
                            if (!rootObject[names[i]])
                                rootObject[names[i]] = {};
                            jsonMember = rootObject[names[i]];
                        } else {
                            if (!jsonMember[names[i]])
                                jsonMember[names[i]] = {};
                            jsonMember = jsonMember[names[i]];
                        }
                    }// for
                    if (e.type) {
                        twest.data.setJSONMemberByValue(jsonMember, names[names.length - 1], e);
                    } else {
                        jsonMember[names[names.length - 1]] = $(e).html();
                    }

                } else {
                    // e : form element
                    if (e.type) {
                        twest.data.setJSONMemberByValue(rootObject, dataName, e);
                    } else {
                        rootObject[dataName] = $(e).html();
                    }
                }
                return rootObject;
            },
            /** JSON 객체의 속성값을 채운다. */
            setJSONMemberByValue : function(fld /* { } --> 즉, JSON Object */, name, e) {

                // fld[name]은  object.field와 같은 의미.
                switch (e.type) {
                case "radio":
                    if (e.checked) {
                        fld[name] = e.value;
                    }
                    break;
                case "select-multiple":
                    fld[name] = [];
                    var arr = fld[name];
                    for ( var j = 0; j < e.options.length; j++) {
                        if (e.options[j].selected) {
                            arr.push(e.options[j].value);
                        }
                    }// for
                    break;
                case "select-one":
                    fld[name] = e.options[e.selectedIndex].value;
                    break;
                case "checkbox":
                    //var  dataName = $(e).attr('data-name');
                    var dataName = $(e).attr('name');
                    //var  ele = $('*[data-name='  + dataName +  ']');
                    var ele = $('*[name=' + dataName.replace(/\./g, '\\.') + ']');
                    if (ele.length == 1) {// Checkbox 가 1개인경우 객체로 생성
                        if (e.checked) {
                            fld[name] = e.value;
                        } else {
                            fld[name] = '';
                        }
                        break;
                    }
                    // Array
                    if (!fld[name])
                        fld[name] = [];
                    var chkbox = fld[name];
                    if (e.checked) {
                        chkbox.push(e.value);
                    }

                    break;
                case "text":
                case "hidden":
                case "password":
                    fld[name] = e.value;
                    break;
                case "textarea":
                    //fld[name] = twest.string.replace(e.value, "\r\n", "\\n");
                    fld[name] = e.value;
                    break;
                }
            },
            /**
             * HTML FORM으로부터 JSON 생성한다.
             *
             * <pre>
             *
             * var jsonObj = twest.data.createJSONFromForm("form1");
             *
             *
             * </pre>
             *
             * @param formName HTML FORM이름
             * @returns
             *      JSON Object
             */
            createJSONFromForm : function(formName) {
                var model = {};
                //var eArr = $("*[data-name]");
                //var eArr = $("form[name=" + formName + "]" + " *[name]");
                //var eArr = $("form[name=" + formName + "] :input").not("[type=image],[type=submit], [type=button]");
                var eArr = $("form[name=" + formName + "]").find(":input , textarea").not("[type=image],[type=submit], [type=button]");
                if (!eArr)
                    return;
                for ( var i = 0; i < eArr.length; i++) {
                    twest.data.setJSONMember(model, eArr[i]);
                }// for
                return model;
            },
            /**
             * HTML FORM으로부터  JSON을 생성.  createJSONFromForm과 같은 JSON 객체를 되돌리지만
             * 폼 요소간의 이름충돌을 방지하기 위해서 접두사를 사용했으면 접두사를 제거하고 원래의
             * 도메인 객체의 필드명을 만들기 위해서 사용한다.
             *
             * @param formName  form 이름
             * @param strToRemove 제거할 문자
             * @returns
             *      JSON Object
             */
            createJSON : function(formName, strToRemove) {
                var jsonStr = twest.data.createJSONString(formName, strToRemove);
                return  window["eval"]("(" + jsonStr + ")");
            },
            /**
             * HTML FORM으로부터 JSON 문자열을 생성. createJSONFromForm과 같은 JSON 객체를 되돌리지만
             * 폼 요소간의 이름충돌을 방지하기 위해서 접두사를 사용했으면 접두사를 제거하고 원래의
             * 도메인 객체의 필드명을 만들기 위해서 사용한다.
             *
             * @param formName 폼이름
             * @param strToRemove 제거할 문자
             * @returns
             */
            createJSONString : function(formName, strToRemove) {
                var jsonObj = twest.data.createJSONFromForm(formName);
                var jsonStr =  twest.json.getJSONString(jsonObj);
                return  twest.string.replace(jsonStr, strToRemove , "");
            },

            /**
             * form element의 option 값을 가지고 옵션이 선택이 되도록
             *
             * @param selector jQuery selector
             * @param optionValue  option 태그와 비교할 값
             */
            setSelect : function(selector, optionValue) {
                $(selector).each(function() {
                    if (this.value == optionValue) {
                        this.selected = true;
                    } else {
                        this.selected = false;
                    }
                });
            },
            /**
             * multiple 속성을 가진 select 옵션 선택하게 만들기
             * @param selector jQuery selector
             * @parma checkValues :  [] 형태의 값
             */
            setSelectMultiple : function(selector, optionValues) {
                $(selector).each(function() {
                    for ( var i = 0; i < optionValues.length; i++) {
                        if (optionValues[i] === this.value) {
                            this.selected = true;
                        }
                    }
                });
            },
            /**
             * input=radio 의 값 설정합니다.
             *
             * @param selector jQuery selector
             * @param radioVlalue 비교할 값
             */
            setRadio : function(selector, radioValue) {
                $(selector).each(function() {
                    if (this.value == radioValue) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                });
            },
            /** checkbox  값 설정합니다.
             * @param selector jQuery selector
             * @parma checkValues :  [] 형태의 값
             */
            setCheckbox : function(selector, checkValues) {
                $(selector).each(function() {
                    this.checked = false;
                });
                $(selector).each(function() {
                    for ( var i = 0; i < checkValues.length; i++) {
                        if (this.value == checkValues[i]) {
                            this.checked = true;
                        }
                    }
                });
            },
            /** dummy function */
            dummy : function() {
                // not used
            }
        };

        // ----------------------------------------------------------------------- twest.ui section
        /**
         * 화면처리
         */
        twest.ui = {
            /**
             *  modal dialog를  표시한다. jquery.ui.dialog 를 참조한다. 다른 점이 있다면
             *  selector를 옵션에 추가적으로 정의한다. twest.js 내부에서만 사용한다.
             *  { selector :"#dialog-modal" }
             *  @parma opt  json object, jquery.ui.dialog의 option 참조
             */
            showModal : function(opts) {
                var opts2 = $.extend({}, opts, {
                    modal : true
                });
                return $(opts.selector).dialog(opts2);
            },
            /**
             * dialog를 표시한다. twest.js 내부적으로만 사용함
             * @param opts 모달창 옵션
             */
            showDialog : function(opts) {
                return $(opts.selector).dialog(opts);
            },
            /**
             * twest.js에서만 사용하는 에러표시 창.
             */
            showAjaxError : function(opts) {
                var ctime = new Date().getTime();
                var randomVal = Math.floor(Math.random() * 100) + 1;
                var divId = "DIV" + ctime + "_" + randomVal;

                var html = "<table  style='border:1px black solid;border-collapse:collapse'>"
                        + "<tr>" + "<td style='border:1px black solid;'>에러코드</td>"
                        + "<td style='border:1px black solid;'>" + opts.responseCode + "</td>"
                        + "</tr>" + "<tr>" + "<td style='border:1px black solid;'>에러메시지</td>"
                        + "<td>" + opts.responseText + "</td>" + "</tr>" + "<tr>"
                        + "<td style='border:1px black solid;'>시스템오류메시지</td>"
                        + "<td style='border:1px black solid;'>" + opts.systemError + "</td>"
                        + "</tr>" + "</table>";

                var errMsg  =opts.responseText;
                var errCode = common_twestjs_message_syserr ;// "시스템 오류가 발생하였습니다.";
                if( opts.responseCode == 500) {
                   errCode = common_twestjs_message_syserr;//  "시스템 오류가 발생되었습니다.";
                   errMsg =  common_twestjs_message_inquire; // "자세한 사항은 시스템 관리자에게 문의하세요(admin@twest.com)";
                } else {
                	 errCode = common_twestjs_message_notice + "(" + common_twestjs_message_code + ":" + opts.responseCode  + ")";  //errCode = "알림(코드:" + opts.responseCode  + ")";
                    errMsg = opts.responseText;
                }
                
                
html = ""
+  "<div class='fx_dialog'>"
+  "<div class='fx_dialog_lyr'>"
+  "<div class='fx_dialog_titbar'>"
+  "<h3 class='tit'>에러!!!</h3>"
+  "</div>"
+  "<div class='fx_dialog_cont'>"                 
+  "<div class=\"system_msg_box\" style=\"width:auto; height:338px; margin:0;\">     "
+  "    <div class=\"img_side\"><img src=\"" + frameworkProperties.image_server + "/resources/common/img/img_alert.png\" alt=\"\"></div>                                                       "
+  "    <div class=\"txt_side\">  "
+  "            <div class=\"tit\">      "
+  "                    <strong>" +  errCode + "</strong> "
+  "            </div> "
+  "            <div class=\"desc\">   "
+  errMsg
+  "      <!- Put a system error message here. but hide it. -->  "
+  "<!-- "
+  opts.systemError
+ " --!>"
+  "            </div>   "
+  "            <div class=\"btn_box\">"
+  "                <!-- put a button to contain an action here !-->    "
+  "            </div>"
+  "    </div> "
+  "</div> "
+  "</div> "
+  "</div> "
+  "</div> "
+ "<iframe frameborder='0' scrolling='no' class='ie_fixed' title=''></iframe>";
					                                
                
                var newDiv = document.createElement("div");
                newDiv.id = divId;
                newDiv.className = "iefix_dialog";
                document.body.appendChild(newDiv);
                $("#" + divId).html(html);

                var defaultSettings = {
                    selector : "#" + divId,
                    dialogClass: "iefix_dialog_lyr",
                    height : 400,
                    width : 600,
                    modal : false,
                    show : "slide",
                    title : "ERROR"
                };
                this.showModal(defaultSettings);
            },
            /**
             * 이미지를 마우스 오버/아웃시 스왑합니다.
             *
             * @param src jQuery selector
             * @param overImage  mouse over 시 표시할 이미지 경로
             * @param outImage  mouse out 시 표시할 이미지 경로
             */
            swapImage : function(src, overImage, outImage) {
                $(src).mouseover(function() {
                    this.src = overImage;
                }).mouseout(function() {
                    this.src = outImage;
                })
            },
            /**
             * iframe을 구한다. cross browser 지원
             * @param iframeId  iframe's ID
             * @return
             *      iframe 요소.
             */
            getIframe : function(iframeId) {
                return document.getElementById(iframeId).contentWindow || document.frames[iframeId];
            },

            /**
             *  팝업윈도우를 중앙에 위치시키기 위한 좌표 계산
             *  <pre>
             *  var dimension = twest.ui.getCenterXY(448,366);
             *  window.open(url,'postalCode','width=448,height=366,top=' + dimension.Y + ',left=' + dimension.X);
             *  </pre>
             *
             *  @param w  팝업창의 width
             *  @param h  팝업창의 height
             *  @return   좌표객체 (.X : 좌측위치, .Y : 위쪽 위치 )
             *
             */
            getCenterXY : function(w, h) {
                var dimension = {};
                dimension.X = (screen.availWidth / 2) - (w / 2);
                dimension.Y = (screen.availHeight / 2) - (h / 2) - 40;
                return dimension;
            },
            /**
             * 태그의 좌표와 width, height를 반환
             * @param selector 요소 selector
             */
            getBounds : function(selector) {
                // 일단 jquery를 사용하는 것으로 바꿈.  검증 필요.
                /* var ret = { left:0, top:0, width:0,height:0 };
                if(document.getBoxObjectFor) {
                    var box = document.getBoxObjectFor(tag);
                    ret.left = box.x;
                    ret.top = box.y;
                    ret.width = box.width;
                    ret.height = box.height;
                } else if(tag.getBoundingClientRect)  { // IE, FF3
                    var rect = tag.getBoundingClientRect();
                    ret.left = rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft);
                    ret.top  = rect.top + (document.documentElement.scrollTop || document.body.scrollTop);
                    ret.width = rect.right - rect.left;
                    ret.height = rect.bottom - rect.top;
                }
                 */
                // 좀더 검증을 해 봐야 함.
                var ret = {
                    left : $(selector).offset().left,
                    top : $(selector).offset().top,
                    height : $(selector).outerHeight(),
                    width : $(selector).outerWidth()
                }
                return ret;
            },
            /**
             * div를 이벤트가 발생한 엘리먼트의 아래에 표시합니다.
             *
             * Example)
             *  Html codes:
             *     <input type="text" id="test" value="" />
             *
             *     <div id="layer1">Contents here </div>
             *
             *  Javascript Codes:
             *     $("#test").click(function() {
             *          twest.ui.showLayer("layer1", this);
             *     });
             *
             * @param  selector : selector. a div shows  below this targer element.
             * @param  source      : event source element
             */
            showLayer : function(selector, source) {
                //var position = $(source).position();
                var offset = $(source).offset();
                var height = $(source).outerHeight();
                var width = $(source).outerWidth();

                return $(selector).css("left", offset.left).css("top", offset.top + height).css(
                        "position", "absolute").css("visibility", "visible");
            },
            hello : function() {
                alert('hello');
            },

            /**
             * 위치 변경 레이어에서 항목을 선택 했을 때 li 태그에 색을 변경 한다.
             *
             * Exzmple)
             * 	Javascript Codes:
             * 		$('#test > li').click(function(event){twest.ui.selectItem(event, $('#test'))});
             * @param e 이벤트 객체
             * @param ulObj ul 태그 객체
             */
            selectItem : function(e, ulObj){
            	$(ulObj).children().each(function(index){
            		$(this).removeClass('ui-sortable-helper');
            		$(this).removeClass('active');
            	});
            	$(e.target).addClass('ui-sortable-helper');
            	$(e.target).addClass('active');
            },
            /**
             * 선택한 항목에 위치를 아래로 한칸 이동 시킨다.
             *
             * Exzmple)
             * 	Javascript Codes:
             * 		$('#test').click(function(){twest.ui.itemMoveDown($('#test'));});
             * @param ulObj ul 태그 객체
             */
            itemMoveDown : function(ulObj){
            	var current = $(ulObj).children('.ui-sortable-helper');
            	current.next().after(current);
            },
            /**
             * 선택한 항목에 위치를 위로 한칸 이동 시킨다.
             *
             * Exzmple)
             * 	Javascript Codes:
             * 		$('#test').click(function(){twest.ui.itemMoveUp($('#test'));});
             * @param ulObj ul 태그 객체
             */
            itemMoveUp : function(ulObj){
            	var current = $(ulObj).children('.ui-sortable-helper');
            	current.prev().before(current);
            },
            /**
             * 선택한 항목에 위치를 맨 위로 이동 시킨다.
             *
             * Exzmple)
             * 	Javascript Codes:
             * 		$('#test').click(function(){twest.ui.itemMoveTop($('#test'));});
             * @param ulObj ul 태그 객체
             */
            itemMoveTop : function(ulObj){
            	var firstEl = $(ulObj).children().first();
            	var current = $(ulObj).children('.ui-sortable-helper');
            	if(!firstEl.hasClass('ui-sortable-helper')) firstEl.before(current);
            },
            /**
             * 선택한 항목에 위치를 맨 아래로 이동 시킨다.
             *
             * Exzmple)
             * 	Javascript Codes:
             * 		$('#test').click(function(){twest.ui.itemMoveBottom($('#test'));});
             * @param ulObj ul 태그 객체
             */
            itemMoveBottom : function(ulObj){
            	var lastEl = $(ulObj).children().last();
            	var current = $(ulObj).children('.ui-sortable-helper');
            	if(!lastEl.hasClass('ui-sortable-helper')) lastEl.after(current);
            },

        	contents : {
        		appendContentsIframe: function(contents, targetId, callbackAfterLoad) {
        			var that = this;
        			$('<iframe name="contentsFrame" src="' + frameworkProperties.context + '/inc/editor/contentsView" marginwidth="0" marginheight="0" frameBorder="0" width="100%" height="100px" scrolling="auto"></iframe>')
        			.load(function() {
        				var $iframe = $(this);
        				var frameBody = $iframe.contents().find('body');
        				var doc = this.contentDocument || this.contentWindow.document;
        				frameBody
        				.append(contents)
        				.find('img')
        				.load(function() {
        					$iframe.css({/*width: that.getDocWidth(doc),*/ height: that.getDocHeight(doc) + 18});
        				});
        				$iframe.css({/*width: that.getDocWidth(doc),*/ height: that.getDocHeight(doc) + 18});

        				if (callbackAfterLoad) {
        					callbackAfterLoad(frameBody);
        				}
        			}).appendTo($('#' + targetId));
        		},
        		getDocHeight: function (doc) {
        			var db = doc.body, de = doc.documentElement;
        			return Math.max(
        				Math.max(db.scrollHeight, de.scrollHeight),
        				Math.max(db.offsetHeight, de.offsetHeight),
        				Math.max(db.clientHeight, de.clientHeight)
        			);
        		},
        		getDocWidth: function (doc) {
        			var db = doc.body, de = doc.documentElement;
        			return Math.max(
        				Math.max(db.scrollWidth, de.scrollWidth),
        				Math.max(db.offsetWidth, de.offsetWidth),
        				Math.max(db.clientWidth, de.clientWidth)
        			);
        		}
        	}
        };





        // ---------------------------------------------------------------------------------- Paging
        /**
         * 페이지 목록을 처리하는 클래스.
         */
        twest.paging =  {

                //    처음    이전    (1) 2 3 4 5 6 7 8 9 10   다음   마지막
                //    First   Prev    Select                   Next    Last
                options : {
                    divId: "paging",
                    pageObject: "",
                    funcName: "",    // 링크 클릭시 호출할 함수 이름
                    pageNo : 1,        // 현재 선택된 페이지 번호
                    listBlock : 10,    // 목록의 출력 갯수
                    pageBlock: 10,     // 페이지 목록의 수
                    totalCount:0,      // 전체 데이터 행의 수
                    tempNo:0,
                    showImage: true    // 이미지 표시여부( default : true)
                },



                /**
                 * 페이지의 항목 목록의 시작번호를 구한다.
                 * @pageNo  페이지 번호
                 * @listBlock 페이지에 출력할 목록 번호
                 */

                getStartNum : function(pageNo, listBlock) {
                    return (pageNo * listBlock) - listBlock + 1;
                },// getStartNum
                /** 전체 페이지 수 */
                getTotalPageCnt : function(options) {

                    var t = options.totalCount / options.listBlock;
                    var i = Math.floor(t);
                    if(options.totalCount % options.listBlock  > 0) {
                        i++;
                    }
                    return i;
                },
                /**
                 * @deprecated twest.string로 이동함
                 */
                isEmpty : function(str) {
                    return (str == null || str == "") ? true: false;
                },
                getNavigator : function(settings, flag) {

                    var opts = $.extend(twest.paging.options, settings);
                    var html = "";
                    // pageBlockNo은 0 부터 시작
                    // page block은  "1 2 3 4 5 6 7 8 9 10"과 같이 표시할 페이지 목록의 갯수를 묶는 단위로
                    // 10개씩 페이지 블럭을 묶으면  전체 페이지가 13개라고 하면 2대의 page block이 생긴다.
                    // 첫번째 페이지 블럭은 0, 그다음은 1이다.
                    //
                    var totalPageCnt = twest.paging.getTotalPageCnt(opts);         // 전체 페이지수
                    var pageBlockNo = Math.floor(opts.pageNo / opts.pageBlock);   // 선택페이지의 블럭 번호
                    var lastPageBlockNo = Math.floor( totalPageCnt / opts.pageBlock); // 마지막 페이지블럭 번호
                    
                    if(opts.pageNo % opts.pageBlock == 0) pageBlockNo = pageBlockNo - 1;
                    
                    if(flag == 2){ //메일 편지지 관리에서 사용
                    	html = "<ul>";
                    	var liPrev = '<li><a class="page_prev"  href="javascript:{{funcName}}({{pageNo}}); return false;" ><span class="hide">Prev</span></a></li>';
                    	var liNext = '<li><a class="page_next"  href="javascript:{{funcName}}({{pageNo}}); return false;" ><span class="hide">Next</span></a></li>';
                    	
                    	var prevPage = 0;
                    	if(opts.pageNo <= 1){
                    		prevPage = 1;
                    	}else{
                    		prevPage = opts.pageNo-1;
                    	}                    	
                    	var formatData = {
                                funcName  : opts.funcName,
                                pageNo    : prevPage
                            };                    
                        html +=  Mustache.to_html(liPrev, formatData);
                        
                        var nextPage = 0;
                    	if(opts.pageNo >= totalPageCnt){
                    		nextPage = totalPageCnt;
                    	}else{
                    		nextPage = opts.pageNo+1;
                    	}
                    	var formatData = {
                                funcName  : opts.funcName,
                                pageNo    : nextPage
                            };
                    	html +=  Mustache.to_html(liNext, formatData);
                    	html += "</ul>";
                    } else if(flag == 3){ //모바일 용
	                    var liPrev       = '<a  href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="prev">{{displayNm}}</span></a>';
	                    var liActivePage = ' <a href="javascript:void(0);" class="on">{{pageNo}}</a>';
	                    var liPage       = ' <a href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;">{{pageNo}}</a>';
	                    var liNext       = ' <a href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="next">{{displayNm}}</span></a>';
	
	                    // 이전
	                    if(!opts.autoHideAdjacent || pageBlockNo > 0 ){
	
	                       var prevPageBlock = pageBlockNo -1;  // 이전 페이지 블럭
	                       var prevPageNo    = prevPageBlock *  opts.pageBlock + 1; // 이전 페이지 블럭의 첫 페이지
	                       if(prevPageNo < 1) prevPageNo = 1;
	                          var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : prevPageNo,
	                                    displayNm : opts.prevDisplayNm  == undefined ? "Prev" : opts.prevDisplayNm 
	                                };
	                          //html += $.format(liPrev, formatData);
	                          html +=  Mustache.to_html(liPrev, formatData);
	                    }//

	                    // 페이지 영역
	                    for(var i= pageBlockNo * opts.pageBlock +1; i <= pageBlockNo * opts.pageBlock + opts.pageBlock; i++) {
	                        if(i > totalPageCnt) break;
	                        if(i == opts.pageNo) {
	                            var formatData = {
	                                    pageNo : i
	                                };
	                            //html += $.format(liActivePage, formatData);
	                            html +=  Mustache.to_html(liActivePage, formatData);
	                        }else {
	                            var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : i
	                                };
	                            //html += $.format(liPage, formatData);
	                            html +=  Mustache.to_html(liPage, formatData);
	                        }
	                    }// for
	
	
	                    // 다음
	                    if(!opts.autoHideAdjacent ||   pageBlockNo < lastPageBlockNo ) {
	                    	var nextPageBlockNo = pageBlockNo + 1;	                        
	                    	var nextPageNo = (nextPageBlockNo * opts.pageBlock) + 1;
	                   	                    	
	                        if(totalPageCnt == 0){
	                        	nextPageNo = 1;
	                        }else if(nextPageNo > totalPageCnt) {
	                            nextPageNo = totalPageCnt;
	                        }
	
	                            var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : nextPageNo,
	                                    displayNm : opts.nextDisplayNm == undefined ? "Next" : opts.nextDisplayNm              
	                                };
	                                //html += $.format(liNext, formatData);
	                                html +=  Mustache.to_html(liNext, formatData);
	                    }// 다음
	
                    } else {
	                    var liFirst      = '<li><a class="page_frst" href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="hide">First</span></a></li>';
	                    var liPrev       = '<li><a class="page_prev"  href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="hide">Prev</span></a></li>';
	                    var liActivePage = '<li class="active"><span>{{pageNo}}</span></li>';
	                    var liPage       = '<li><a href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;">{{pageNo}}</a></li>';
	                    var liNext       = '<li><a class="page_next"  href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="hide">Next</span></a></li>';
	                    var liLast       = '<li><a class="page_last"  href="javascript:void(0);" onclick="javascript:{{funcName}}({{pageNo}}); return false;"><span class="hide">Last</span></a></li>';
	
	                    html = "<ul>";
	                    // 처음
	                    if(!opts.autoHideAdjacent || pageBlockNo > 0)  {
	                        var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : 1
	                                };
	                            //html +=  $.format(liFirst, formatData);
	                            html +=  Mustache.to_html(liFirst, formatData);
	                    }// autoHideAdjacent
	
	
	
	                    // 이전
	                    if(!opts.autoHideAdjacent || pageBlockNo > 0 ){
	
	                       var prevPageBlock = pageBlockNo -1  // 이전 페이지 블럭
	                       var prevPageNo    = prevPageBlock *  opts.pageBlock + 1; // 이전 페이지 블럭의 첫 페이지
	                       if(prevPageNo < 1) prevPageNo = 1;
	                          var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : prevPageNo
	                                };
	                          //html += $.format(liPrev, formatData);
	                          html +=  Mustache.to_html(liPrev, formatData);
	                    }//

	                    // 페이지 영역
	                    for(var i= pageBlockNo * opts.pageBlock +1; i <= pageBlockNo * opts.pageBlock + opts.pageBlock; i++) {
	                        if(i > totalPageCnt) break;
	                        if(i == opts.pageNo) {
	                            var formatData = {
	                                    pageNo : i
	                                };
	                            //html += $.format(liActivePage, formatData);
	                            html +=  Mustache.to_html(liActivePage, formatData);
	                        }else {
	                            var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : i
	                                };
	                            //html += $.format(liPage, formatData);
	                            html +=  Mustache.to_html(liPage, formatData);
	                        }
	                    }// for
	
	
	                    // 다음
	                    if(!opts.autoHideAdjacent ||   pageBlockNo < lastPageBlockNo ) {
	                    	var nextPageBlockNo = pageBlockNo + 1;	                        
	                    	var nextPageNo = (nextPageBlockNo * opts.pageBlock) + 1;
	                   	                    	
	                        if(totalPageCnt == 0){
	                        	nextPageNo = 1;
	                        }else if(nextPageNo > totalPageCnt) {
	                            nextPageNo = totalPageCnt;
	                        }
	
	                            var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : nextPageNo
	                                };
	                                //html += $.format(liNext, formatData);
	                                html +=  Mustache.to_html(liNext, formatData);
	                    }// 다음
	
	
	                    // 마지막
	                    if(!opts.autoHideAdjacent || ( pageBlockNo < lastPageBlockNo)) {
	
	                        var totalCnt = twest.paging.getTotalPageCnt(opts);
	                        var formatData = {
	                                    funcName  : opts.funcName,
	                                    pageNo    : opts.totalCount>0?twest.paging.getTotalPageCnt(opts):1
	                                };
	                            //html += $.format(liLast, formatData);
	                            html +=  Mustache.to_html(liLast, formatData);
	                    }// 마지막
	
	                    html += "</ul>";
                    }

              /*
                    var pagingDiv = '<div id="{divId:s}" class="pagination">{navi:s}</div>';
                    var fmtData = {
                        navi       : html,
                        divId      :   opts.divId
                    }
                    return   $.format(pagingDiv, fmtData);
                    */
                    return  html;

                },// getNavigator
                /**
                 * 다음 페이지 번호를 구한다.
                 * @param settings
                 */
                getNextPageNo : function(settings) {

                    var opts = $.extend(twest.paging.options, settings);
                    var totalPageCnt = twest.paging.getTotalPageCnt(opts);         // 전체 페이지수
                    var data = {};
                	var nextPage = 0;
                	if(opts.pageNo >= totalPageCnt){
                		nextPage = totalPageCnt;
                	}else{
                		nextPage = opts.pageNo+1;
                	}
                	
                	data.nextPage = nextPage;
                	data.lastPage = opts.totalCount>0?totalPageCnt:1;
                	return data;
                }
        };

		// ------------------------------------------------------------------------ openUi
		/**
		 * 공개된 ui를 제공하는 클래스.
		 */
		twest.openUi = {
			/** 게시판 글등록 팝업. */
			brdAtclRegPopup: function(data) {
				this.callPopup(data, 'brdAtclRegPopup', '/view/board/article/brdAtclRegPopup', 830, 700, 1);
			},

			/** 메일등록 팝업. */
			emlMailRegPopup: function(data) {
				this.callPopup(data, 'emlMailRegPopup', '/view/eml/emlMailRegPopup', 830, 700, 1);
			},
			/**쪽지등록 팝업. */
			notNoteRegPopup: function(data) {
				this.callPopup(data, 'notNoteRegPopup', '/view/not/notNoteRegPopup', 830, 700, 1);
			},
			/**일정등록 팝업. */
			scdScheduleRegPopup: function(data) {
				this.callPopup(data, 'notNoteRegPopup', '/view/schedule/scd/scdInsertSchedulePopup', 830, 700, 1);
			},
			/**포틀릿추가 팝업**/
			ptlMyPortletRegPopup: function(data) {
				this.callPopup(data, 'ptlMyPortletRegPopup', '/view/myPortlet/ptlMyPortletRegPopup', 500, 440, 1);
			},
			/**그룹웨어 알림 팝업**/
			homGwPushPopup: function(data) {
				var date = new Date();
				this.callPopup2(data, 'homGwPushPopup'+date.getTime(), '/view/home/homGwPushPopup', 350, 190, 0, 0, 0);
			},
			/** popup을 호출. */
			callPopup: function(data, popName, url, w, h, s) {
				var f = $('#openUi_callForm'),
					iArr= [],
					name = null;

				if (!f.length) {
					f = $('<form id="openUi_callForm" name="openUi_callForm" method="post" onsubmit="return false;"/>');
					f.appendTo(document.body);
				}

				if(data) {
					for (name in data) {
						if(data.hasOwnProperty(name)){
							iArr.push('<input type="hidden" name="'+name+'" value="' +(data[name] || '')+ '"/>');
						}
					}
				}
				f.html(iArr.join(''));

				$.popupWindow({
					windowURL: 'about:blank',
					windowName: popName,
					width: w,
					height: h,
					centerScreen: 1,
					scrollbars: s
				});

				f[0].target = popName;
				f[0].action = frameworkProperties.context+url;
				f[0].submit();
			},
			
			/** popup을 호출. */
			callPopup2: function(data, popName, url, w, h, t, l, s) {
				var f = $('#openUi_callForm'),
					iArr= [],
					name = null;

				if (!f.length) {
					f = $('<form id="openUi_callForm" name="openUi_callForm" method="post" onsubmit="return false;"/>');
					f.appendTo(document.body);
				}

				if(data) {
					for (name in data) {
						if(data.hasOwnProperty(name)){
							iArr.push('<input type="hidden" name="'+name+'" value="' +(data[name] || '')+ '"/>');
						}
					}
				}
				f.html(iArr.join(''));

				$.popupWindow({
					windowURL: 'about:blank',
					windowName: popName,
					width: w,
					height: h,
					top: t,
					left: l,
					scrollbars: s
				});

				f[0].target = popName;
				f[0].action = frameworkProperties.context+url;
				f[0].submit();
			}
		},


        // ----------------------------------------------------------------------- Sample Object
        twest.hello = {
            aa : function() {
                alert('aaa');
                twest.hello.bb();
            },
            bb : function() {
                alert('bb');
            }
        }

//        return twest;
//    })();

        //Expose twest to the global object
    window.twest = twest;

})(jQuery);






/**
 * window에 속한 객체로 LayoutManager를 사용할 경우 화면 제어 클래스가 이미 로드되어 있는지 확인하기
 * 위해서 사용한다. 메인화면에서 VIEW 화면을 다시 로드할지를 체크하기 위한 용도로 사용한다. VIEW는
 * 화면에 로드될 때 자신을 등록한다. init function에 ViewController의 enroll 함수를 호출하여 등록
 * 한다.
 *
 * var ArticleView = {
 *    name : "ArticleView",
 *    init : function() {
 *           ViewController.enroll(ArticleView.name);
 *    }
 *
 * };
 *
 *
 * 메인 클래스에서  ViewController의 exists 함수를 호출하여 ArticleView를 다시 로드할지를 결정한다.
 *
 * if(ViewController.exists("ArticelView")) {
 *     return;   // ArticleView가 존재하면 다시 로드할 필요가 없어서  return 처리한다.
 * }
 *
 *
 */
var ViewController = {
     /** 현재 VIEW의 클래스 명 */
     currentViewClass : "",
     /**
      * VIEW 화면에서 자신을 등록할 때 사용한다.
      * @param viewClassName  제어로직의 클래스명
      */
     enroll: function(viewClassName) {
        if(ViewController.currentViewClass != "") {
            window[ViewController.currentViewClass] = null;
        }
        ViewController.currentViewClass = viewClassName;
     },

     /**
      * 해당 제어로직 클래스가 등록이 되어 있는지 확인한다.
      * @param viewClassName  제어로직 클래스 명
      * @return
      *     true : 이미 로드되어 있음
      *     false: 로드되어 있지 않음.
      *
      */
     exists : function(viewClassName) {
         return (ViewController.currentViewClass == viewClassName) ? true: false;
     }
};








/**
 *   관찰자 객체에게 변경사항을 통지하는 역할을 합니다.  obervers 필드에 관찰자(Observer)를 가지고
 *   있고, View에서 notifyObservers 함수를 호출하면 순환하면서 관찰자의 update 메서드를 호출합니다.
 *   관찰자는 update 함수를 구현해야 합니다.
 *
 *   이 객체는 Observer Pattern의 응용입니다.  Observer Pattern에서는 관찰자와 Subject가 있습니다.
 *   주체(Subject)는 이 객체가 해당됩니다.  Subject는 Observer를 담고 있고, 어떤 객체에서 Subect에게
 *   변경을 통지하면, Subject가 Observer의 update 메서드를 호출하여 변경사항을 적용하도록 합니다.
 *
 *    관찰자(Observer)가 되는 객체는 update 함수를 반드시 구현해야 합니다. update 함수에는 관찰정보
 *    가 전달됨니다. 이것은 JSON 객체입니다. 이 객체의  첫번째 필드는 관찰정보에 대한 구분값으로
 *    type이며 이 타입을 이용하여 처리 방법을 분기합니다. 두번째 인자는 전달할 데이터입니다.
 *
 *    아래는 Observer 구현체의 예입니다. param.type의 값이 USER_INF_CHASNGED이면 변경사항을 처리하는
 *    코드 입니다. init 함수에서 ObserverControl에 자기 자신을 등록합니다.
 *
 *    var  ConcreteObjserver = {
 *         init : function( )  {
 *              ObserverControl.addObserver(this);
 *         },
 *         fn : {
 *             update : function(param) {
 *                 if(param.type = "USER_INFO_CHANGED") {
 *                    doSomthing();
 *                 }
 *             }
 *         }
 *     };
 *
 *
 *    아래의 코드는 ObserverControl에게 변경사항을 전달하는 코드입니다. 변경사항이 발생했을 때 다른
 *    Observer들에게 변경사항을 통지하도록 하는 예제 입니다.
 *
 *    var OtherLogicObject = {
 *
 *        fn :  {
 *           selectUser : function(pUserId) {
 *                var options = { type : "USER_INFO_CHANGED", data : { userId : pUserId}};
 *                ObserverControl.notifyObservers(options);
 *           }
 *        }
 *    }
 *
 *
 *   @author myeongseok, Seo(sirosms@gmail.com)
 */
var ObserverControl = {
    /**
     * Observer Collection
     */
    observers : [],
    /**
     * 옵져버를 등록합니다.
     * @param observer 관찰자
     */
    addObserver : function(observer) {
        // 동일한 객체가 여러개 등록되는 현상을 방지
        if(!ObserverControl.containsObserver(observer)) {
            ObserverControl.observers.push(observer);
        }else {
        	var observerIndex = ObserverControl.indexOf(observer);

        	// 현재 저장되어있는 옵저버를 새로 날라온 파라미터로 교체함(테스트 코드)
        	ObserverControl.observers[observerIndex] = observer;
        	/*

        	if(!!window[observer.name]) {
        		window[observer.name] = observer;
        	}*/
        }

        //test code
        /*
        if(observer.fn) $.extend(observer, observer.fn);

        if(observer.init) observer.init();
        if(obsever.beforeBind) observer.beforeBind();
        if(obsever.bind) observer.bind();
        if(observer.afterBind) observer.afterBind();
         */
    },
    /**
     * 관찰자를 삭제합니다.
     * @param observer 관찰자
     */
    deleteObserver : function(observer) {
        var tempObservers = [];
        for ( var i = 0; i < ObserverControl.observers.length; i++) {
            // argument에 전달된 observer를 제외하고 모아놓고 다시
        	var obj = ObserverControl.observers[i];
            if(!ObserverControl.equals(obj, observer)) {
                tempObservers.push(obj);
            }
        }
        ObserverControl.observers = tempObservers;
        // 로드되어있는 스크립트를 지움
        window[observer.name] = null;
    },
    /**
     * 관찰자에게 변경정보를 통지합니다. 변경정보는 JSON을 작성합니다.  VIEW 객체가 이 함수를 호출
     * 하는 코드는 아래와 같습니다.
     *
     *  var options  = { type:"USER_INFO_CHANGE", data : { userId: "appletree", userDept:"1022" }};
     *  ObserverControl.notifyObservers(options);
     *
     * @param param 통지할 정보, JSON Object
     */
    notifyObservers : function(param) {
        for ( var i = 0; i < ObserverControl.observers.length; i++) {
            var obj = ObserverControl.observers[i];
            if(obj.fn && obj.fn.update) obj.fn.update(param);
        }// for
    },
    /**
     * 관찰자에게 변경정보를 통지합니다. 변경정보는 JSON을 작성합니다.  VIEW 객체가 이 함수를 호출
     * 하는 코드는 아래와 같습니다.
     *
     *  var options  = { type:"USER_INFO_CHANGE", data : { userId: "appletree", userDept:"1022" }};
     *  ObserverControl.notifyObservers(options);
     *
     * @param param 통지할 정보, JSON Object
     */
    opennerNotifyObservers : function(param){
    	var len = 0;
    	if(opener){
    		if(opener.ObserverControl){
    			len = opener.ObserverControl.observers.length;
    		}
    	}
    	for ( var i = 0; i < len; i++) {
            var obj = opener.ObserverControl.observers[i];
            if(obj.fn && obj.fn.update) obj.fn.update(param);
        }// for
    },
    /**
     * Observer array 에서 이미 등록된 동일한 객체가 있는지 판단한다
     * @param observer
     * @returns {Boolean}
     */
    containsObserver : function(observer) {
        for(var i = 0; i < ObserverControl.observers.length; i++) {
            var obj = ObserverControl.observers[i];

            if(ObserverControl.equals(obj, observer)) {
                return true;
            }
        }
        return false;
    },
    /**
     * Observer array에서 해당 observer가 몇번째 위치에 속해있는지 판단한다.
     */
    indexOf : function(observer) {
        for(var i = 0; i < ObserverControl.observers.length; i++) {
            var obj = ObserverControl.observers[i];

            if(ObserverControl.equals(obj, observer)) {
                return i;
            }
        }
        return -1;
    },
    /**
     * Page Object 2개가 동일한 Object인지 비교한다.
     * @param obj1
     * @param obj2
     * @returns {Boolean}
     */
    equals : function(obj1, obj2){
        /*
        for(var i in obj1) {
            if(obj1.hasOwnProperty(i)) {
                if (!obj2.hasOwnProperty(i)) return false;
                if (obj1[i] != obj2[i]) return false;
            }
        }
        for(var i in obj2) {
            if(obj2.hasOwnProperty(i)) {
                if (!obj1.hasOwnProperty(i)) return false;
                if (obj1[i] != obj2[i]) return false;
            }
        }
        return true;
        */
        // 펑션은 연산자로 동일여부를 비교할 수 없어 그냥 다음과 같은 방식으로 비교하였음
        /*
        if(obj1.name == obj2.name && obj1.mode == obj2.mode && obj1.menu == obj2.menu) {
            return true;
        } else {
            return false;
        }
        */
        if(obj1.name == obj2.name) {
           return true;
        }
        return false;
    }
};
/**
 * 해당 객체는 다음영역을 담당한다.
 * - 페이지 전체에 해당하는 공통된 함수 및 변수 (혹은 status)
 * - Layout 제어 및 모드 변경
 * - Observer객체에 등록된 Object 체크
 */
var LayoutManager = {
        name : 'LayoutManager',
        bodyLayer : {},         // 전체(body) 레이아웃 객체를 가지고 있는다.
        outerCenterLayer : {},  // 페이지의 바깥영영 레이아웃 객체를 가지고 있는다.
        middleLayer : {},       // 가운데 컨텐츠 영역 해당 레이어의 north영역은 검색바고 center영역은 본문영역이다. view는 모드에 따라서 위치가 변경된다.
        options : {				// 레이아웃 매니저에서 사용하고 있는 기본 설정이다.
        	saveState : 'Y',		// 해당 레이아웃을 쿠키에 저장해놓고 상태를 유지한다. 기본은 Y
        	mode : 'normal',		// normal, vertical, horizontal
        	menu : 'default'		// 현재 메뉴 setLayout시에 해당 메뉴명을 변경함

        },

        LAYOUT_NORMAL : "normal",
        LAYOUT_VERTICAL : "vertical",
        LAYOUT_HORIZONTAL : "horizontal",

        templateOptions : {             // 각 메뉴별 레이아웃 옵션들을 모아놓는다.
            atcl : {
                outer : {
                    center__paneSelector:   ".outer-center",
                    west__paneSelector:     ".outer-west",
                    west__size:             200,
                    west__minSize:          200,
                    west__maxSize:          350,
                    spacing_open:           8,
                    spacing_closed:         8,
                    //north__spacing_open:  0,
                    //south__spacing_open:  0,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0,
                    south__closable:        false,
                    south__resizable:       false,
                    south__spacing_open:    0
                }
                , middle : {
                    center__paneSelector:   ".middle-center",
                    west__paneSelector:     ".middle-west",
                    west__size:             0,
                    spacing_open:           8,
                    spacing_closed:         8
                }
                , inner : {
                    center__paneSelector:   ".inner-center",
                    west__paneSelector:     ".inner-west",
                    east__paneSelector:     ".inner-east",
                    west__size:             "50%",
                    east__size:             "50%",
                    south__size:            "50%",
                    spacing_open:           8,
                    spacing_closed:         8,
                    west__spacing_closed:   8,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0
                }
            }
            , calendar : {
                outer : {
                    center__paneSelector:   ".outer-center",
                    west__paneSelector:     ".outer-west",
                    west__size:             200,
                    west__minSize:          200,
                    west__maxSize:          250,
                    spacing_open:           8,
                    spacing_closed:         8,
                    //north__spacing_open:  0,
                    //south__spacing_open:  0,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0,
                    south__closable:        false,
                    south__resizable:       false,
                    south__spacing_open:    0,
                    west__togglerLength_open:   '100%',
                    west__togglerLength_closed: '100%'
                }
                , middle : {
                    center__paneSelector:   ".middle-center",
                    west__paneSelector:     ".middle-west",
                    west__size:             0,
                    spacing_open:           8,
                    spacing_closed:         8
                }
                , inner : {
                    center__paneSelector:   ".inner-center",
                    west__paneSelector:     ".inner-west",
                    east__paneSelector:     ".inner-east",
                    west__size:             "",
                    east__size:             200,
                    east__minSize:          200,
                    east__maxSize:          300,
                    spacing_open:           8,
                    spacing_closed:         8,
                    west__spacing_closed:   8,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0
                }
            }
            , 'default' : {
                outer : {
                    center__paneSelector:   ".outer-center",
                    west__paneSelector:     ".outer-west",
                    west__size:             200,
                    west__minSize:          200,
                    west__maxSize:          350,
                    spacing_open:           8,
                    spacing_closed:         8,
                    //north__spacing_open:  0,
                    //south__spacing_open:  0,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0,
                    south__closable:        false,
                    south__resizable:       false,
                    south__spacing_open:    0
                }
                , middle : {
                    center__paneSelector:   ".middle-center",
                    west__paneSelector:     ".middle-west",
                    west__size:             0,
                    spacing_open:           8,
                    spacing_closed:         8
                }
                , inner : {
                    center__paneSelector:   ".inner-center",
                    west__paneSelector:     ".inner-west",
                    east__paneSelector:     ".inner-east",
                    west__size:             "50%",
                    east__size:             "50%",
                    south__size:            "50%",
                    spacing_open:           8,
                    spacing_closed:         8,
                    west__spacing_closed:   8,
                    north__closable:        false,
                    north__resizable:       false,
                    north__spacing_open:    0
                }
            }
        },
        /**
         * 함수들을 모아놓습니다.
         */
        fn : {
            /**
             * 페이지에 jquery layout을 세팅한다.
             * ex)
             *  // default형태의 레이아웃 형식 세팅
             * LayoutManager.fn.setLayout();
             * // 전자결재 레이아웃 형식 세팅
             * LayoutManager.fn.setLayout('eapp');
             * // 전자결재 레이아웃 형식 세팅 하고 두번째 arguments로 layout 세부설정 파라미터 추가
             * LayoutManager.fn.setLayout('eapp', {outer:{...}, inner :{...}, middle:{...}});
             *  // eapp의 모듈을 세팅하고 현재 스테이터스를 쿠키에 저장해놓지는 않는다.
             * LayoutManager.fn.setLayout({mode:'eapp',saveState : 'N'});
             *
             */
            setLayout : function(option, template) {

            	if(typeof(option) == 'string') {
            		LayoutManager.options.menu = option;
            	} else if(typeof(option) == 'object') { // 파라미터가 json형식이면 기본설정을 엎어침
            		$.extend(LayoutManager.options, option);
            	} else {
            		// undefined or ...
            	}

                if(LayoutManager.templateOptions[LayoutManager.options.menu]) {
                	// template 파라미터가 존재한다면 템플릿을 엎어쓴다.
                	if(template) {
                		if(template.outer) {
                			$.extend(LayoutManager.templateOptions[LayoutManager.options.menu].outer, template.outer);
                		}

                		if(template.middle) {
                			$.extend(LayoutManager.templateOptions[LayoutManager.options.menu].middle, template.middle);
                		}

                		if(template.inner) {
                			$.extend(LayoutManager.templateOptions[LayoutManager.options.menu].inner, template.inner);
                		}
                	}

                    with(LayoutManager.templateOptions[LayoutManager.options.menu]) {
                    	// stateLoadYn 파라미터가 Y로 넘어오면 레이아웃 화면 설정을 쿠키에 저장한다.
                    	if(LayoutManager.options.saveState == 'Y') {
                    		$.extend(outer, {
                    			stateManagement__enabled:	true,		// 자동상태저장 on
                    			stateManagement__includeChildren: true, // 하위 저장 여부
                    			stateManagement__cookie__name : 'Layout_' + LayoutManager.options.menu // 저장할 쿠키명. 해당 쿠키명을 메뉴별로 선언하여 메뉴별 쿠키설정을 따로 저장함
                    		});
                    	}

                        LayoutManager.bodyLayer = $('body').layout(outer);
                        LayoutManager.outerCenterLayer = $('div.outer-center').layout(middle);

                    	if(LayoutManager.options.saveState == 'Y') {
                    		$.extend(inner, {
                    			stateManagement__enabled:	true,		// 자동상태저장 on
                    			stateManagement__includeChildren: true, // 하위 저장 여부
                    			stateManagement__cookie__name : 'Layout_inner_' + LayoutManager.options.menu // 저장할 쿠키명. 해당 쿠키명을 메뉴별로 선언하여 메뉴별 쿠키설정을 따로 저장함
                    		});
                    	}

                        LayoutManager.middleLayer = $('div.middle-center').layout(inner);

                        LayoutManager.fn.setModeLayer();

                    }
                }
            },
            /**
             * 모드에 따라서 현재 보이지 않는 레이어를 숨긴다.
             * @param mode normal, vertical, horizontal
             */
            setModeLayer : function(mode) {
                mode = mode || LayoutManager.options.mode;

                if (mode == 'normal') {
                    LayoutManager.middleLayer.hide('east');
                    LayoutManager.middleLayer.hide('south');
                } else if (mode == 'vertical') {
                    LayoutManager.middleLayer.hide('south');
                } else if (mode == 'horizontal') {
                    LayoutManager.middleLayer.hide('east');
                }
            },
            getList : function() {
                return LayoutManager.fn.getObject('List');
            },
            getView : function() {
                return LayoutManager.fn.getObject('View');
            },
            getObject : function(modeName) {
                var obj = {};
                $(ObserverControl.observers).each(function(){
                    if(this.mode == modeName) {
                        obj = this;
                        return false;
                    }
                });
                return obj;
            },
            /**
             * 메뉴의 해당페이지의 레이아웃모드를 변경한다.
             * @param mode 'normal' : 기본모드, 'horizontal' : 가로분할모드, 'vertical' : 세로분할모드
             */
            changeLayerMode : function(mode) {
                // 레이아웃을 변경하려면 현재 레이아웃을 부수고 다시 만드는게 제일 편함
                if(LayoutManager.options.mode != mode){
                    LayoutManager.middleLayer.destroy();
                    // 해당 모드에 따라 스타일을 변경함
                    LayoutManager.fn.changeViewClass(mode);

                    // 다시 레이아웃 적용
                    LayoutManager.fn.setLayout();
                }
            },
            /**
             * 메뉴 스타일에 따라 영역의 클래스명을 조절한다.
             * @param mode  'normal' : 기본모드, 'horizontal' : 가로분할모드, 'vertical' : 세로분할모드
             */
            changeViewClass : function(mode) {
            	/**
            	 * 모드에 따라서 Layout이 동작하는데 이상을 주지 않도록 클래스를 스위칭함
            	 */
            	if (mode == "vertical") {
                    $("#viewLayer").removeClass().addClass("inner-east");
                    $("#contentLayer").removeClass("inner-center-bak").addClass("inner-center");
                } else if (mode == "horizontal") {
                    $("#viewLayer").removeClass().addClass("ui-layout-south");
                    $("#contentLayer").removeClass("inner-center-bak").addClass("inner-center");
                } else if (mode == "view") {

                } else { // normal mode
                	$("#viewLayer").hide().removeClass().addClass("inner-center");
                	$("#contentLayer").show();
                }

                // 변경한 모드를 매니저에 세팅
                LayoutManager.options.mode = mode;
            },

            // 리스트 페이지를 감추고 뷰 페이지를 본문 컨텐츠영역으로 설정한다.
            showViewLayer : function() {
                if(LayoutManager.options.mode == "normal") {
                    $("#viewLayer").show();
                    $("#contentLayer").hide();

                    // 정령 뿌시고 다시 만드는거밖엔 방법이 없나
                    LayoutManager.middleLayer.destroy();
                    // 기존 클래스명을 변경시켜놓는다. 그러므로 List영역이 center로 처리되는것을 방지한다
                    $("#contentLayer").removeClass("inner-center").addClass("inner-center-bak");
                    // 다시 레이아웃을 세팅한다.
                    LayoutManager.fn.setLayout();
                }
            },
            /**
             * List레이어를 보여주고 View레이어를 숨긴다.
             * 본문영역을 설정하기 위하여 다시 레이아웃을 세팅한다.
             */
            showListLayer : function() {
                if(LayoutManager.options.mode == "normal") {
                	// 레이아웃을 제거한다.
                    LayoutManager.middleLayer.destroy();
                    // 뷰영역을 숨긴다.
                    $("#viewLayer").hide();

                    // defaultViewLayer가 있으면 기본 뷰 페이지로 변경시킨다. defaultViewLayer를 만들지 않으면 그냥 viewContent가 보여진다.
                    // var viewContent = $("#viewLayer").children('.ui-layout-content');
                    // viewContent.html($("#defaultViewLayer").html());

                    // content영역을 다시 보이게 하고 원래의 class로 원복시킨다.
                    $("#contentLayer").show()
                        .removeClass("inner-center-bak")
                        .addClass("inner-center");

                    // 다시 레이아웃을 세팅한다.
                    LayoutManager.fn.setLayout();
                }
            },
			changeToDefaultView: function() {
				$("#viewLayer").html($("#defaultViewLayer").html());
			},
            /**
             * 상단 메뉴바를 숨긴다.
             */
            hideTopMenuLayer : function() {
            	LayoutManager.bodyLayer.hide('north');
            },
            /**
             * 하단 카피라이트 영역을 숨긴다.
             */
            hideFooterLayer : function() {
            	LayoutManager.bodyLayer.hide('south');
            }
        }
};








//---------------------------------------------------------------------------------- Validation
(function( $ ){


 /**
  * HTMLT FORM 요소를 검증하기 위한 객체이다.
  */
 twest.validation =  {


         checkPattern : function(node) {
             var patternStr = $(node).attr("pattern");
             if(!patternStr) return true;

             var nodeVal = $(node).val();
             if(!nodeVal) return true;

             var reg = new RegExp(patternStr);
             var testRes = reg.test(nodeVal);
             if(!testRes) {
                 var msg = $(node).data("validation-pattern-message");
                 if(msg) { alert(msg); }
                 $(node).focus();
                 return false;
             }
             return testRes;

         },  // checkPattern
         checkNumber: function(node) {

             if($(node).data("validation-type") != "number") return true;

             var nodeVal = $(node).val();
             if(!nodeVal) return true;

             if(!twest.string.isCurrency(nodeVal)) {
                 var msg = $(node).data("validation-number-message");
                 if(msg) { alert(msg); }
                 $(node).focus();
                 return false;
             }
             nodeVal = nodeVal.replace(new RegExp(",", "g"), "");
             var thisMin = $(node).attr("min");
             if(thisMin) {
                 var fMin = parseFloat(thisMin);
                 var fVal = parseFloat(nodeVal);
                 if(fVal < fMin) {
                     var msg = $(node).data("validation-min-message");
                     if(msg) { alert(msg); }
                     $(node).focus();
                     return false;
                 }
             } // thisMin
             var thisMax = $(node).attr("max");
             if(thisMax) {
                 var fMax = parseFloat(thisMax);
                 var fVal = parseFloat(nodeVal);
                 if(fVal > fMax) {
                     var msg = $(node).data("validation-max-message");
                     if(msg) { alert(msg); }
                     $(node).focus();
                     return false;
                 }
             }// thisMax

             return true;

         }, // checkNumber
         checkURL: function(node) {

             if($(node).data("validation-type") == "url") {
                 var filter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                 var nodeVal = $(node).val();
                 if(!nodeVal) return true;
                 if(!filter.test(nodeVal)) {
                     var msg = $(node).data("validation-url-message");
                     if(msg) { alert(msg); }
                     $(node).focus();
                     return false;
                 }
                 return true;
             }
             return true;

         }, // checkURL

         checkEmail: function(node) {
             if($(node).data("validation-type") != "email") return true;

             var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             var nodeVal = $(node).val();
             if(!nodeVal) return true;
             if(!filter.test(nodeVal)) {
                 var msg = $(node).data("validation-email-message");
                 if(msg) { alert(msg); }
                 $(node).focus();
                 return false;
             }

             return true;

         }, // checkEmail
         match : function(node) {
             var matchTarget = $(node).data("validation-match-match");
             if(!matchTarget)  return true;

             if($(node).attr("type") == "text"){

                 if(!$(matchTarget)) return true;

                 var targetVal =  $(matchTarget).val();
                 if(!targetVal) {
                     var msg = $(node).data("validation-match-message");
                     if(msg) alert(msg);
                     $(node).focus();
                     return false;
                 }else {
                     if(targetVal == $(node).val()) {
                         return true;
                     }
                     var msg = $(node).data("validation-match-message");
                     if(msg) alert(msg);
                     $(node).focus();
                     return false;
                 }
             } // type == text
             return true;
         },
         
         checkPeriod : function(node) {
        	 if($(node).data("validation-type") != "date") return true;
        	 
        	 var filter = "\D";
        	 var nodeVal = $(node).val();
        	 if(!nodeVal) return true;
        	 nodeVal = nodeVal.replace(new RegExp(filter, "g"), '');
        	 
        	 var thisMin = $(node).attr("min").replace(new RegExp(filter, "g"), '');
        	 if(thisMin) {
        		 var IMin = parseInt(thisMin,10);
        		 var IVal = parseInt(nodeVal,10);
        		 if(IVal < IMin) {
        			 var msg = $(node).data("validation-min-message");
        			 if(msg) { alert(msg); }
        			 $(node).focus();
        			 return false;
        		 }
        	 } // thisMin
        	 
        	 var thisMax = $(node).attr("max").replace(new RegExp(filter, "g"), '');
        	 if(thisMax) {
        		 var IMax = parseInt(thisMax,10);
        		 var IVal = parseInt(nodeVal,10);
        		 if(IVal > IMax) {
        			 var msg = $(node).data("validation-max-message");
        			 if(msg) { alert(msg); }
        			 $(node).focus();
        			 return false;
        		 }
        	 }// thisMax
        	 
        	 return true;
         },
         /**
          * HTML FORM의 input 요소의 값을 검증한다. 이 함수는 폼 요소를 서버로 전송하기 전에
          * 폼 요소에 정의되어 있는 속성값을 기준으로 폼 요소의 입력값을 검증한다.  오류가 있으면
          * alert창을 표시하고 false를 리턴한다. true이면 서버로 전송하면 된다.
          *
          * 아래의 코드는 모든 INPUT 요소를 검증한다. 오류가 있으면  더이상 진행하지 않도록 작성되
          * 었다.
          *
          *    if(!twest.validation.validate(":input") {
          *       return;
          *    }
          *
          *
          *  폼 요소에 사용할 속성값은 다음과 같다.
          *
          *  1. 필수값 체크
          *     required   : 이 속성이 기술되면 필수 값이다.
          *     data-validation-required-message : 필수값이 없을 때 표시되는 메시지
          *
          *     예)
          *         <input type="text" id="userId"
          *              required
          *              data-validation-required-messagege="ID 값이 필요합니다."
          *          />
          *
          *  2. 날자 입력값 체크
          *     data-validation-type : date
          *     data-validation-date-message : 입력값이 없을 때 나타내는 메시지
          *
          *     예)
          *
          *        <input type="text" id="registDate"
          *               required
          *               data-validation-required-message="등록일은 필수 값입니다."
          *               data-validation-type="date"
          *               data-validation-date-message="입력값이 잘못 되었습니다." />
          *
          *  3. 두 요소의 값이 일치하는지 체크(Match)
          *      data-validation-match-match : 비교할 요소의 아이디
          *      data-validation-match-message : 입력값이 서로 다를 때 표시할 메시지
          *
          *              <spring:message code="input.label.password1" text="패스워드1" />
          *              <input type="text" id="ErrorStat_password1"
          *                 required
          *                 data-validation-required-message="<spring:message
          *                 code="validation.empty" text="값이 비었습니다"  />"
          *                 data-validation-type="string"
          *                 placeHolder="<spring:message  code="input.label.password"
          *                 text="패스워드"  />"
          *              />
          *
          *            <spring:message code="input.label.password2" text="패스워드2" />
          *            <input type="text" id="ErrorStat_password2"
          *                    required
          *                    data-validation-required-message="<spring:message
          *                    code="validation.empty"
          *                    text="값이 비었습니다"  />"
          *                    data-validation-type="string"
          *                    data-validation-match-match="#ErrorStat_password1"
          *                    data-validation-match-message="값이 서로 다릅니다."
          *                    placeHolder="<spring:message  code="input.label.password"  text="패스워드"  />"
          *
          *  4. 숫자값의 최소값, 최대값 확인
          *      data-validation-type : 데이터 형식(default: number)
          *      data-validation-number-message: 데이터 형식이 다를 때 표시할 메지시
          *      min : 최소값
          *      max : 최대값
          *      data-validation-min-message: min값 보다 적을 때 표시할 메시지
          *      data-valiadtion-max-message: max값 보다 적을 때 표시할 메시지
          *
          *    예)
          *      <input type="text" id="age"
          *           data-validation-type="number"
          *           min="30"
          *           max="80"
          *           data-validation-min-message="입력값이 너무 작습니다. "
          *           data-validation-max-message="입력값이 너무 큽니다."  />
          *
          *  5. 패턴을 이용한 입력값 검증
          *       pattern : 패턴을 입력하기 위한 속성
          *       data-validation-type  : 데이터 형식( default : pattern)
          *       data-validation-pattern-message: 패턴과 맞지 않을 때 표시할 메시지
          *
          *     예)
          *        <input type="text" id="userId"
          *            pattern="ab+c"
          *            data-validation-type="pattern"
          *            data-validation-pattern-message="입력값은 ab로 시작하고 c로 끝나야 합니다."
          *            />
          *
          *
          * @select  jQuery의 Selector
          */
         validate: function(selector) {

             var checkStatus = true;
             $(selector).not("[type=image],[type=submit], [type=button]").each(function() {

                 // Check the required attribute
                 if($(this).attr("required") != undefined) {
                     if($(this).val() == null || $(this).val() == "") {
                         var msg = $(this).data("validation-required-message");
                         if(msg) {alert(msg);}
                         $(this).focus();
                         checkStatus = false;
                         return false;
                     }
                 }

                 // Check the validation type which is the date
                 if($(this).data("validation-type") != undefined) {
                     var validType = $(this).data("validation-type");
                     if(validType =="date") {
                         if(!twest.util.validateDate( $(this).val() ))  {
                             if($(this).data("validation-date-message")) {
                                alert($(this).data("validation-date-message"));
                             }
                             $(this).focus();
                             checkStatus = false;
                             return false;
                         }
                     }// validType == date
                 }// if

                 if(!twest.validation.match(this))   {
                     checkStatus = false;
                     return false;
                 }
                 if(!twest.validation.checkEmail(this))  {
                     checkStatus = false;
                     return false;
                 }
                 if(!twest.validation.checkURL(this)) {
                     checkStatus = false;
                     return false;
                 }
                 if(!twest.validation.checkNumber(this)) {
                     checkStatus = false;
                     return false;
                 }
                 if(!twest.validation.checkPattern(this)) {
                     checkStatus = false;
                     return false;
                 }
                 if(!twest.validation.checkPeriod(this)) {
                	 checkStatus = false;
                	 return false;
                 }

             });  // each

             // Everything is OK.
             return checkStatus;

         },// validate

         realTimeIdCheck : function(target){
        	 var obj = null;
        	 if($.type(target) == 'object'){
        		 obj = $(target);
        	 }else if($.type(target) == 'string'){
        		 obj = $('#'+target);
        	 }else{
        		 return ;
        	 }

        	 obj.blur(function(){
        		 if($.trim($(this).val()) == ''){
        			twest.validation.printErrorMsg($(this), '아이디를 입력해 주세요.');
        		 }
        	 });

        	 obj.keyup(function(){
        		 if(!(/^[0-9a-zA-Z]+$/).test($(this).val())){
        			 twest.validation.printErrorMsg($(this), '아이디는 영문과 숫자만 입력 가능합니다.');
        			 return;
        		 }

        		 //if()
        	 });
         },

         realTimePwCheck : function(target){
        	 var obj = null;
        	 if($.type(target) == 'object'){
        		 obj = $(target);
        	 }else if($.type(target) == 'string'){
        		 obj = $('#'+target);
        	 }else{
        		 return ;
        	 }

        	 obj.blur(function(){
        		 $(obj).siblings('.validation_msg').css('display', 'none');
            	 $(obj).removeClass('field_invalid');
        	 });

        	 obj.focus(function(){
        		 if($(this).val().length < 6){
        			 twest.validation.printErrorMsg($(this), '사용 불가');
        			 return;
        		 }else if($(this).val().length > 12){
        			 twest.validation.printErrorMsg($(this), '사용 불가');
        			 return;
        		 }

        		 for(var i=0; i < $(this).val().length; i++){
 			        var chr=$(this).val().substr(i,1);
 			        if(!(chr < 'ㄱ' || chr > '힣'  )){
 			        	twest.validation.printErrorMsg($(this), '사용 불가');
 	        			return;
 			        }
 			     }


        		 twest.validation.printErrorMsg($(this), '사용 가능');
        		 $(this).removeClass('field_invalid');
        		 $(this).siblings('.validation_msg').addClass('msg_valid');
        		 $(this).siblings('.validation_msg').removeClass('msg_invalid');
        	 });

        	 obj.keyup(function(){
        		 if($(this).val().length < 6){
        			 twest.validation.printErrorMsg($(this), '사용 불가');
        			 return;
        		 }else if($(this).val().length > 12){
        			 twest.validation.printErrorMsg($(this), '사용 불가');
        			 return;
        		 }

        		 for(var i=0; i < $(this).val().length; i++){
 			        var chr=$(this).val().substr(i,1);
 			        if(!(chr < 'ㄱ' || chr > '힣'  )){
 			        	twest.validation.printErrorMsg($(this), '사용 불가');
 	        			return;
 			        }
 			     }


        		 twest.validation.printErrorMsg($(this), '사용 가능');
        		 $(this).removeClass('field_invalid');
        		 $(this).siblings('.validation_msg').addClass('msg_valid');
        		 $(this).siblings('.validation_msg').removeClass('msg_invalid');

        	 });
         },

         printErrorMsg : function(obj, msg){
        	 if($(obj).siblings('.validation_msg').length == 0){
        		 $('<span class="validation_msg"></span>').insertAfter(obj);
        	 }

        	 var errorMsgEl = $(obj).siblings('.validation_msg');

        	 errorMsgEl.html(msg);
        	 errorMsgEl.css('display', 'inline');
        	 $(obj).addClass('field_invalid');
        	 errorMsgEl.addClass('msg_invalid');
        	 errorMsgEl.removeClass('msg_valid');
         }

 }; // twest.validation


 /*
  * twest paletee 생성 추가
  * @param : rootNode - 팔레트가 위치할 node
  * @param : callback - 색상 선택시 색상값을 받을 콜백함수
  */
	twest.palette = function(rootNode, callback) {
		return new palette(rootNode, callback);
	}

	 /*
	  * paletee object
	  * @param : rootNode - 팔레트가 위치할 node
	  * @param : callback - 색상 선택시 색상값을 받을 콜백함수
	  */
    var palette = function(rootNode, callback){

    	// 객체 참조
    	var t = this;

    	// 기본색상정보
    	t.paletteoption = this.paletteoption = {
    			divNode : $('<div class="cal_plt unhidden">'),
    			labels : {
    				       '#ac725e' : $('<label id="1" style="background-color:#ac725e;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#ac725e" fgcolor="#ffffff" class="input_rdo"><span>#ac725e</span></label>'),
    				       '#d06b64' : $('<label id="2" style="background-color:#d06b64;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#d06b64" fgcolor="#ffffff" class="input_rdo"><span>#d06b64</span></label>'),
    			           '#f83a22' : $('<label id="3" style="background-color:#f83a22;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#f83a22" fgcolor="#ffffff" class="input_rdo"><span>#f83a22</span></label>'),
    		  	           '#fa573c' : $('<label id="4" style="background-color:#fa573c;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#fa573c" fgcolor="#ffffff" class="input_rdo"><span>#fa573c</span></label>'),
    			           '#ff7537' : $('<label id="5" style="background-color:#ff7537;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#ff7537" fgcolor="#ffffff" class="input_rdo"><span>#ff7537</span></label>'),
    			           '#ffad46' : $('<label id="6" style="background-color:#ffad46;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#ffad46" fgcolor="#ffffff" class="input_rdo"><span>#ffad46</span></label>'),
    			           '#42d692' : $('<label id="7" style="background-color:#42d692;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#42d692" fgcolor="#ffffff" class="input_rdo"><span>#42d692</span></label>'),
    			           '#16a765' : $('<label id="8" style="background-color:#16a765;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#16a765" fgcolor="#ffffff" class="input_rdo"><span>#16a765</span></label>'),
    			           '#7bd148' : $('<label id="9" style="background-color:#7bd148;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#7bd148" fgcolor="#ffffff" class="input_rdo"><span>#7bd148</span></label>'),
    			           '#b3dc6c' : $('<label id="10" style="background-color:#b3dc6c;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#b3dc6c" fgcolor="#466216" class="input_rdo"><span>#b3dc6c</span></label>'),
    			           '#fbe983' : $('<label id="11" style="background-color:#fbe983;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#fbe983" fgcolor="#584514" class="input_rdo"><span>#fbe983</span></label>'),
    		 	           '#fad165' : $('<label id="12" style="background-color:#fad165;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#fad165" fgcolor="#584514" class="input_rdo"><span>#fad165</span></label>'),
    			           '#92e1c0' : $('<label id="13" style="background-color:#92e1c0;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#92e1c0" fgcolor="#245d45" class="input_rdo"><span>#92e1c0</span></label>'),
    			           '#9fe1e7' : $('<label id="14" style="background-color:#9fe1e7;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#9fe1e7" fgcolor="#1e5d63" class="input_rdo"><span>#9fe1e7</span></label>'),
    			           '#9fc6e7' : $('<label id="15" style="background-color:#9fc6e7;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#9fc6e7" fgcolor="#244b6c" class="input_rdo"><span>#9fc6e7</span></label>'),
    			           '#4986e7' : $('<label id="16" style="background-color:#4986e7;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#4986e7" fgcolor="#ffffff" class="input_rdo"><span>#4986e7</span></label>'),
    			           '#9a9cff' : $('<label id="17" style="background-color:#9a9cff;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#9a9cff" fgcolor="#ffffff" class="input_rdo"><span>#9a9cff</span></label>'),
    			           '#b99aff' : $('<label id="18" style="background-color:#b99aff;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#b99aff" fgcolor="#ffffff" class="input_rdo"><span>#b99aff</span></label>'),
    			           '#c2c2c2' : $('<label id="19" style="background-color:#c2c2c2;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#c2c2c2" fgcolor="#444444" class="input_rdo"><span>#c2c2c2</span></label>'),
    			           '#cabdbf' : $('<label id="20" style="background-color:#cabdbf;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#cabdbf" fgcolor="#4f3e41" class="input_rdo"><span>#cabdbf</span></label>'),
    			           '#cca6ac' : $('<label id="21" style="background-color:#cca6ac;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#cca6ac" fgcolor="#ffffff" class="input_rdo"><span>#cca6ac</span></label>'),
    		 	           '#f691b2' : $('<label id="22" style="background-color:#f691b2;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#f691b2" fgcolor="#ffffff" class="input_rdo"><span>#f691b2</span></label>'),
    			           '#cd74e6' : $('<label id="23" style="background-color:#cd74e6;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#cd74e6" fgcolor="#ffffff" class="input_rdo"><span>#cd74e6</span></label>'),
    			           '#a47ae2' : $('<label id="24" style="background-color:#a47ae2;"><input name="'+rootNode.attr('id')+'plt" type="radio" value="#a47ae2" fgcolor="#ffffff" class="input_rdo"><span>#a47ae2</span></label>')
    					}
    	};


        var newdivNode = t.paletteoption.divNode;
    	t.htmlNode = newdivNode;
    	t.getHtml = getHtml;
    	t.setColor = setColor;
    	t.selectColor = '';
    	t.selectColorObj = null;
    	t.checkedColorID = checkedColorID;
    	t.checkedColorVal = checkedColorVal;

    	// 각 색상 input box 선택값이 변경되었을때 change event 삽입
		$.each(this.paletteoption.labels, function(key,obj){
			var tObj = $(obj); 
			tObj.children(':first').change(function(){
				var thisObj =  $(this);
			    t.setColor(thisObj.val());
				if(callback){
					callback(thisObj.val(), thisObj.attr('fgcolor'));
				}
			});
			newdivNode.append(tObj);
		});

		// rootnode 존재시 해당 노드에 붙임
		if(rootNode){
			rootNode.append(t.htmlNode);
		}

		// 색상선택 지정
		function setColor(color){

    		t.selectColor = color;
    		$.each(t.paletteoption.labels, function(key,obj){
    			if(color==key){
    				obj.addClass('selected');
    				obj.children(':first').attr('checked',true);
    				t.selectColorObj = obj;
    			}else{
    				obj.removeClass('selected');
    				obj.children(':first').attr('checked',false);
    			}

			});

    	}

		function checkedColorID(){
			return t.selectColorObj.attr('id');
		}

		function checkedColorVal(){
			return t.selectColorObj.children(':first').val();
		}
		function checkedFgColorVal(){
			return t.selectColorObj.children(':first').attr('fgcolor');
		}
		// 팔레트 htmlnode 반환
		function getHtml(){
			return t.htmlNode;
		}

		return t;
    };

    /*
     * 사용자 정보를 정해진 정책에 따른 fomat 으로 리턴함.     
     *
     */
    twest.getTextFomatFromUser = function(username, posName, deptName, cmpName, loginCmpId, targetCmpid){
    	
    	var text = "";
    	
    	text +=  username && username!=''? username+' ':'';
    	text +=  posName && posName!=''? posName : '';
    	
    	// 로그인한 본인과 다른 계열사의 경우에 회사명을 출력한다.
    	if((deptName && deptName!='') && (cmpName && cmpName!='') && (loginCmpId!=targetCmpid)){
    		text +=  '('+deptName+':'+cmpName+')';
    	}else if(deptName && deptName!=''){
    		text +=  deptName? '('+deptName+')' : '';    		
    	}
    	
    	return text;
    	
    };

    /*
     * datepicker, timepicker 공통
     *  - 날짜, 시간 포멧 체크
     *  - 시작일자/시간, 종료일자/시간 간격 체크 조정
     */
    twest.dateTimepicker = function(startEle, startOption, endEle, endOption, startTimeEle, startTimeOption, endTimeEle, endTimeOption){
    	
    	var defaultNmask =  {type:'fixed',mask:'9999-99-99'};
    	var defaultTimeNmask = {type:'fixed',mask:'99:99'};    	
    	var defaultOption = {changeMonth: true, changeYear: true, yearSuffix: '&nbsp;'};
    	var regional = $.datepicker.regional[frameworkProperties.locale];
		$.extend(defaultOption, regional);
    	var defaultTimeOption = {'step':10, 'timeFormat': 'H:i', 'forceRoundTime': false, 'scrollDefaultNow': true};
    	
    	var isIE = 0 < $('html.old-ie').length;
    	
    	var m_startOption = {
    			/* fix buggy IE focus functionality */
	            fixFocusIE: false,
	            
	            /* blur needed to correctly handle placeholder text */
	            onSelect: function(dateText, inst) {
	                  this.fixFocusIE = true;
	                  //$('.input_date').focusout();
	                 //$(this).blur().change().focus();
	            },
	            onClose: function(dateText, inst) {
	                  this.fixFocusIE = true;
	            },
	            beforeShow: function(input, inst) {
	            	//IE에서 발생하는 jquery 오류 패치
	            	/*var result = true;
	            	if(this.fixFocusIE){
		                  if (twest.util.ieVersion() > -1 ){
		                    //msg = "You are using IE " + ver;
		                	  result = !this.fixFocusIE;
		                  }else{
		                	  result = true;
		                  }
	            	}
	                  this.fixFocusIE = false;
	                  return result;*/
	            	var result = isIE ? !this.fixFocusIE : true;
	                this.fixFocusIE = false;
	                return result;
	            }};
    	var m_endOption = {
    			/* fix buggy IE focus functionality */
	            fixFocusIE: false,
	            
	            /* blur needed to correctly handle placeholder text */
	            onSelect: function(dateText, inst) {
	                  this.fixFocusIE = true;
	                  //$('.input_date').focusout();
	                  //$(this).blur().change().focus();
	            },
	            onClose: function(dateText, inst) {
	                  this.fixFocusIE = true;
	            },
	            beforeShow: function(input, inst) {
	            	//IE에서 발생하는 jquery 오류 패치
	            	/*var result = true;
	            	if(this.fixFocusIE){
		                  if (twest.util.ieVersion() > -1 ){
		                    //msg = "You are using IE " + ver;
		                	  result = !this.fixFocusIE;
		                  }else{
		                	  result = true;
		                  }
	            	}
	                  this.fixFocusIE = false;
	                  return result;*/ 
	            	var result = isIE ? !this.fixFocusIE : true;
	                this.fixFocusIE = false;
	                return result;
	            }};    	 
    	var m_startTimeOption = {};
    	var m_endTimeOption = {};
        
        var _isTimeFormat = function(d) {
        	var df = /[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/;
        	return d.match(df);
        };
    	
    	// 시작일자 객체
    	if(startEle && startEle.length>0){
    		
    		startEle.data('diffTime', 0);
    		startEle.nMask(defaultNmask); 
    		
    		if(startOption==undefined || startOption==null){    		
    			$.extend(m_startOption, defaultOption);
    		}else{
    			$.extend(m_startOption, startOption);
    		}
    		
    		startEle.datepicker(m_startOption);
    		
    		startEle.datepicker("option", "onClose", 
		    		function(dateText, inst){
		    			
		  		   	    var setdate;
		  		   	   
		  			   // 입력된 값의 길이가 10보다 작을경우 이전값으로 세팅한다.
		  			   if(inst.input.val().length<10){		    				

		  				   if(inst.lastVal){
		      					setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.lastVal, $.datepicker._getFormatConfig(inst));
		  						if(setdate){
		  							$(this).datepicker('setDate', setdate);		    																		
		  						}
		  					}
		  				   return;
		
		  			   }else{

		  				   try {	
		  					   setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input.val(), $.datepicker._getFormatConfig(inst));	    							   
		  				   }
		  				   catch (err) {
		  					   if(inst.lastVal.replace(/\s/g,"").replace(/\-/g, '')){	
		  						   setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.lastVal, $.datepicker._getFormatConfig(inst));
		  						   if(setdate){
		  							   $(this).datepicker('setDate', setdate);		    																		
		  						   }
		  					   }
		  				   }
		  			   }
		  			   			   
		    		   // 시작일자가 변경되면 종료일자와 시간을 재조정한다.
		  			   twest.DatetimeResetChecker('start', startEle, endEle, startTimeEle, endTimeEle);
		  			   $(this).blur(function() {
		  				   var elem = $(this);
		  				   setTimeout(function() {
		  				   },100);
		  			   });
//		  			   $(this).blur(); //dialog에서 datepicker focus남아있는 오류 패치
		      	    }
    		);
    		
    	}
    	
    	// 종료일자 객체
    	if(endEle && endEle.length>0){
    		
    		endEle.nMask(defaultNmask); 
    		
    		endEle.focus(function(){
    			var tobj = $(this); 
    			tobj.attr('lastVal', tobj.val());
    		});
    		
    		if(endOption==undefined || endOption==null){    		
    			$.extend(m_endOption, defaultOption);
    		}else{
    			$.extend(m_endOption, endOption);
    		}
    		
    		endEle.datepicker(m_endOption);    		
    		
    		endEle.datepicker("option", "onClose", 
		    		function(dateText, inst){
		    			
		    			var setdate;
		    			
		    			// 입력된 값의 길이가 10보다 작을경우 이전값으로 세팅한다.
		    			if(inst.input.val().length<10){		    				
		    				
		    				if(inst.lastVal){	
		    					setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.lastVal, $.datepicker._getFormatConfig(inst));
		    					if(setdate){
		    						$(this).datepicker('setDate', setdate);		    																		
		    					}
		    				}
		    				
		    			}else{    				
		    				try {	
		    					setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input.val(), $.datepicker._getFormatConfig(inst));	    							   
		    				}
		    				catch (err) {
		    					if(inst.input.attr('lastVal').replace(/\s/g,"").replace(/\-/g, '')){
		    						setdate = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input.attr('lastVal'), $.datepicker._getFormatConfig(inst));
		    						if(setdate){
		    							$(this).datepicker('setDate', setdate);																	
		    						}
		    					}
		    					
		    				}
		    			}
		    			
		     		   // 시작일자가 변경되면 종료일자와 시간을 재조정한다.
		    			twest.DatetimeResetChecker('end', startEle, endEle, startTimeEle, endTimeEle);
		    			$(this).blur(function() {
		    				var elem = $(this);
		    				setTimeout(function() {
		    				},100);
		    			});
//		    			$(this).blur(); //dialog에서 datepicker focus남아있는 오류 패치
		    		}    				
    		
    		);
    		
    	}
    	
    	// 시작시간 객체
    	if(startTimeEle && startTimeEle.length>0){
    		    		
    		startTimeEle.nMask(defaultTimeNmask); 
    		
    		if(startTimeOption==undefined || startTimeOption==null){    		
    			$.extend(m_startTimeOption, defaultTimeOption);
    		}else{
    			$.extend(m_startTimeOption, startTimeOption);
    		}
    		
    		startTimeEle.timepicker(m_startTimeOption);
    		
    		if(m_startTimeOption['changeTime']){    			
	        	startTimeEle.on('changeTime', m_startTimeOption['changeTime']);    			
    			
    		}else{
        		startTimeEle.on('changeTime', function() {	    		   
       			 twest.DatetimeResetChecker('start', startEle, endEle, startTimeEle, endTimeEle);
   	    		   
       		});    			
    		}
    		
    		startTimeEle.focus(function(){
    			tobj = $(this);
    			tobj.attr('lastVal', tobj.val());
    		});
    		
    		startTimeEle.focusout(function() {
    			if(!_isTimeFormat(startTimeEle.val())){
    				tobj = $(this);
	    			tobj.val(tobj.attr('lastVal'));
	    		}
    		});
    		
    		startTimeEle.blur(function(){	    		   
    			if(!_isTimeFormat(startTimeEle.val())){
    				tobj = $(this);
    				tobj.val(tobj.attr('lastVal'));
    			}
    			twest.DatetimeResetChecker('start', startEle, endEle, startTimeEle, endTimeEle);
	    	});
    		
    	}
    	
    	// 종료시간 객체
    	if(endTimeEle && endTimeEle.length>0){
    		
    		endTimeEle.nMask(defaultTimeNmask); 
    		
    		if(endTimeOption==undefined || endTimeOption==null){    		
    			$.extend(m_endTimeOption, defaultTimeOption);
    		}else{
    			$.extend(m_endTimeOption, endTimeOption);
    		}
    		
    		endTimeEle.timepicker(m_endTimeOption);
    		
    		if(m_endTimeOption['changeTime']){
        		endTimeEle.on('changeTime', m_endTimeOption['changeTime']);
    		}else{
        		endTimeEle.on('changeTime', function() {	    			
        			twest.DatetimeResetChecker('end', startEle, endEle, startTimeEle, endTimeEle);
    	    		   
        		});	
    		}    	
    		
    		endTimeEle.focus(function(){
    			tobj = $(this);
    			tobj.attr('lastVal', tobj.val());
    		});
    		
    		endTimeEle.focusout(function() {
    			if(!_isTimeFormat(endTimeEle.val())){
    				tobj = $(this);
	    			tobj.val(tobj.attr('lastVal'));
	    		}
    		});
    		
    		endTimeEle.blur(function(){	    		   
	    		if(!_isTimeFormat(endTimeEle.val())){
	    			tobj = $(this);
	    			tobj.val(tobj.attr('lastVal'));
	    		}
	    		twest.DatetimeResetChecker('end', startEle, endEle, startTimeEle, endTimeEle);
	    	});
    		
    	}
    	
    	/*
    	 * 시작일자+시작시간 - 종료일자+종료시간 간격 유효성 체크 
    	 */
    	twest.DatetimeResetChecker = function(eventType, startEle, endEle, startTimeEle, endTimeEle){
    		
  		   var startDate = null;
  		   var endDate   = null;
     	   if(startEle && startEle.length>0 && startEle.val().replace(/\s/g,"").replace(/\-/g, '')){
     		   if(startTimeEle && startTimeEle.length>0){
     			   var startTime = startTimeEle.timepicker('getTime');
     			   startDate = new Date($.datepicker.formatDate('yy/mm/dd', startEle.datepicker('getDate'))+' '+startTime.getHours()+':'+startTime.getMinutes());
     		   }else{
     			   startDate = new Date($.datepicker.formatDate('yy/mm/dd', startEle.datepicker('getDate')));    			   
     		   }
     	   }
     	   
     	   if(endEle && endEle.length>0 && endEle.val().replace(/\s/g,"").replace(/\-/g, '')){
     		   if(endTimeEle && endTimeEle.length>0){
     			   var endTime   = endTimeEle.timepicker('getTime');
     			   endDate = new Date($.datepicker.formatDate('yy/mm/dd', endEle.datepicker('getDate'))+' '+endTime.getHours()+':'+endTime.getMinutes());
     		   }else{
     			   endDate = new Date($.datepicker.formatDate('yy/mm/dd', endEle.datepicker('getDate')));    			   
     		   }
     	   }

     	   if(startDate && endDate){
  
 			   var tmp_startDt = startEle.datepicker('getDate');
 			   var tmp_endDt   = endEle.datepicker('getDate'); 
     		   
         	   if(startDate.getTime()>=endDate.getTime()){
             	           		   
         		   if(eventType=='start'){        			   
         			   endEle.datepicker('setDate', new Date(startEle.datepicker('getDate').getTime()+startEle.data('diffTime')));        			   
         		   }else if(eventType=='end'){
         			   startEle.datepicker('setDate', tmp_endDt);
         		   }

         		   // 재세팅된 값을 다시 가져온다.
     			   tmp_startDt = startEle.datepicker('getDate');
     			   tmp_endDt   = endEle.datepicker('getDate');        		   
         		   
   				   // 시간정보가 있을때
   				   if(startTimeEle && startTimeEle.length>0 && endTimeEle && endTimeEle.length>0){  
   					   
   					   // 시작일자와 종료일자가 같을경우 
   					   if(tmp_startDt.getTime()==tmp_endDt.getTime()){
   						  
   						    // 시작시간과 종료시간을 비교하여 재세팅해준다.
   						    var tmpstartTime =  startTimeEle.val().split(':');
   						    var tmpendTime   =  endTimeEle.val().split(':');
   						    tmpstartTime[0]  =  parseInt(tmpstartTime[0]);
   						    tmpendTime[0]    =  parseInt(tmpendTime[0]);
   						    
 					    	// 시작시간이 종료시간보다 더크거나 같을 경우 종료시간에 +1해준다.
   						    if(tmpstartTime[0]>=tmpendTime[0]){  	  						    	
   						    	tmpstartTime[0] = tmpstartTime[0]+1;
   						    	
   						    	if(tmpstartTime[0]>24){
   						    		tmpstartTime[0] = 24;
   						    	}
   						    	
   						    	tmpstartTime[0] = twest.string.lpad(tmpstartTime[0]+'',2,'0');
   						    	
   	  		    				endTimeEle.timepicker('setTime', tmpstartTime.join(':'));
   	  		    				//endTimeEle.timepicker('option','minTime', tmpstartTime.join(':'));
   						    }
   						    
   					   }else if(tmp_startDt.getTime()<tmp_endDt.getTime()){  		  				   
   			  				// 종료일자가 시작일자보다 클때는 시간선택에 제한이 없다.
 			  				endTimeEle.timepicker('option','minTime', null);  					 
   			  		   }
   				   }
         	   }else{
         		   startEle.data('diffTime', tmp_endDt.getTime()-tmp_startDt.getTime());
         	   }
     	   }
     	};
    	
    	
    };

})( jQuery );