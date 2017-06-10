/*
 * jQuery File Upload User Interface Plugin 6.11
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, URL, webkitURL, FileReader */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            'load-image',
            './jquery.fileupload-fp'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl,
            window.loadImage
        );
    }
}(function ($, tmpl, loadImage) {
    'use strict';

    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            //----------------------
            uploadTemplate: function (o) {
                var i, file, rowArray = [];
                for (i=0; file=o.files[i]; i++) {
                    rowArray.push('<tr class="template-upload ">');
                    rowArray.push('<td class="preview"><span></span></td>');
                    rowArray.push('<td class="name"><span>'+ file.name +'</span></td>');
                    rowArray.push('<td class="size"><span>'+ o.formatFileSize(file.size) + '</span></td>');
            
                    if(file.error) {
                        //에러표시
                        rowArray.push('<td class="error" colspan="2"><span class="label label-important">Error</span> ' + uploadMessage.errors[file.error] + '</td>');
                    } else if (o.files.valid && !i) {
                        //프로그레스바
                        rowArray.push('<td class="progress"><div class="prgsbar prgs_stripe active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bar" style="width:0%;"></div></div></td>');
                        //시작버튼
                        if (! o.options.autoUpload) {
                            rowArray.push('<td class="start');
                            if (!o.options.userUploadable) {
                                rowArray.push(' startDisuse');
                            }
                            rowArray.push('"><button class="btn btn_sml"><span>업로드</span></button></td>');
                        } else {
                            rowArray.push('<td class="start"></td>');
                        }
                    } else {
                        rowArray.push('<td colspan="2"></td>');
                    }
                    //취소버튼
                    if (!i) {
                        rowArray.push('<td class="cancel"><button type="button" class="btn btn_sml_ico cancel"><i class="ico ico_trash"><span>취소</span></i></button></td>');
                    } else {
                        rowArray.push('<td class="cancel"></td>');
                    }
                    
                    rowArray.push('</tr>');
                    return rowArray.join('');
                }
            },
            downloadTemplate: function (o) {
                var i, file, rowArray = [], that = this, imgUrl;
                for (i=0; file=o.files[i]; i++) {
                    rowArray.push('<tr class="template-download ">');
                    if (o.options.uploadType === 'image') {
                        imgUrl = file.thumbUrl || ('/common/editor/fileView?fileUrl='+ file.url + '&fileName=' + file.fileName);
                        rowArray.push('<td class="preview"><img src="'+ imgUrl +'" width="80" height="60"></td>');
                    } else {
                        rowArray.push('<td class="preview"></td>');
                    }
                    rowArray.push('<td class="name"><span>'+ file.name +'</span></td>');
                    rowArray.push('<td class="size"><span>'+ o.formatFileSize(file.size) + '</span></td>');
                    if(file.error) {
                        //에러표시
                        rowArray.push('<td class="error" colspan="2"><span class="label label-important">Error</span> ' + file.error + '</td>');
                    } else {
                        rowArray.push('<td colspan="2"></td>');
                    }
                    //삭제버튼
                    rowArray.push('<td class="delete">' +
                        '<button class="btn btn_sml_ico cancel" data-type="' + file.delete_type + '" data-url="' + file.delete_url + '">' +
                        '<i class="ico ico_trash"><span>삭제</span></i></button>' + 
//                      '<input type="checkbox" name="delete" value="1">' +
                        '</td>'
                    );
                    rowArray.push('</tr>');
                    return rowArray.join('');
                }
            },
            userEachUpload: false,
            addedFileCount: 0,
            addedFileSize: 0,
            allowedextension: '',
            limitedExtension: '',
            fileboxUploadYn: '',
//            arrayFileName: [],
            
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The following option limits the number of files that are
            // allowed to be uploaded using this widget:
            maxNumberOfFiles: undefined,
            // The maximum allowed file size:
            maxFileSize: undefined,
            // The minimum allowed file size:
            minFileSize: undefined,
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes:  /.+$/i,
            // The regular expression to define for which files a preview
            // image is shown, matched against the file type:
            previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            // The maximum file size of images that are to be displayed as preview:
            previewSourceMaxFileSize: 5000000, // 5MB
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // By default, preview images are displayed as canvas elements
            // if supported by the browser. Set the following option to false
            // to always display preview images as img elements:
            previewAsCanvas: true,
            // The ID of the upload template:
            uploadTemplateId: null,
            // The ID of the download template:
            downloadTemplateId: null,
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                var that = $(this).data('fileupload'),
                    options = that.options,
                    files = data.files;
                
                //파일 중복처리를 위해 업로드목록에 같은이름의 파일이 있다면 추가하지 않는다
//                var idx = [];
//                $.each(files, function(index, value){
//                	if(options.arrayFileName.indexOf(value.name) != -1){
//                		idx.push(index);
//                	}else{
//                		options.arrayFileName.push(value.name);
//                	}
//                });
//                
//                $.each(idx, function(index, value){
//                	files.splice(value,1);
//                });
//                
//                if(files.length == 0){
//                	return;
//                }
                
                
                $(this).fileupload('process', data).done(function () {
                    that._adjustMaxNumberOfFiles(-files.length);
                    data.maxNumberOfFilesAdjusted = true;
                    data.files.valid = data.isValidated = that._validate(files);

                    if(!data.files.valid) {
                        that._adjustMaxNumberOfFiles(files.length);
//                        if (that.options.errorOnAdd) {
                            this._trigger('errorOnAdd', e, {
                                errorCd: files[0].error,
                                file: data.files[0]
                            });
//                        } else {
//                            alert(files[0].error);
//                        }
                        return;
                    }
                    that._showTotalStatus(data, 1);

                    data.context = that._renderUpload(files).data('data', data);
                    options.filesContainer[
                        options.prependFiles ? 'prepend' : 'append'
                    ](data.context);
                    //이미지형태의 업로드이면 '미리보기' 활성화.
                    if(options.uploadType === 'image') {
                        that._renderPreviews(files, data.context);
                    }
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            if ((that._trigger('added', e, data) !== false) &&
                                    (options.autoUpload || data.autoUpload) &&
                                    data.autoUpload !== false && data.isValidated) {
                                data.submit();
                            }
                        }
                    );
                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                var that = $(this).data('fileupload');
                if (!data.isValidated) {
                    if (!data.maxNumberOfFilesAdjusted) {
                        that._adjustMaxNumberOfFiles(-data.files.length);
                        data.maxNumberOfFilesAdjusted = true;
                    }
                    if (!that._validate(data.files)) {
                        return false;
                    }
                }
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .find('.bar').css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                var that = $(this).data('fileupload'),
                    template;
                if (data.context) {
                    data.context.each(function (index) {
                        var file = ($.isArray(data.result) &&
                                data.result[index]) ||
                                    {error: 'emptyResult'};
                        if (file.error) {
                            that._adjustMaxNumberOfFiles(1);
                        }
                        if (!file.error) {
                        	delete file.error;
                            that._appendUploadedFileInfo(file);
                            if (data.dataType && data.dataType.substr(0, 6) === 'iframe') {
                            	that.options.addedFileSize += file.size;
                            	data.context.data('data').files[index].size = file.size;
                            	that.showLimitOption();
                            }
                        }
                        that._transition($(this)).done(
                            function () {
                                var node = $(this);
                                template = that._renderDownload([file])
                                    .replaceAll(node)
                                    .data('data', data);
                                that._forceReflow(template);
                                that._transition(template).done(
                                    function () {
                                        data.context = $(this);
                                        that._trigger('completed', e, data);
                                        // 다운로드가 완료 된 후 upload 할 파일 목록이 download 파일 목록으로 바뀐 후 호출 하는 콜백 함수를 추가
                                        // 이 콜백 함수를 추가한 이유는 파일 업로드 레이어 타입일 때 레이어 초기화를 위해 업로드된 파일은 
                                        // 파일 목록에서 삭제 해주는데 download 목록으로 바뀌기 전에는 파일이 정상적으로 삭제되지 않아 이 부분을 추가함
                                        that._trigger('afterRenderDownload');
                                    }
                                );
                            }
                        );
                    });
                } else {
                    if ($.isArray(data.result)) {
                        $.each(data.result, function (index, file) {
                            if (data.maxNumberOfFilesAdjusted && file.error) {
                                that._adjustMaxNumberOfFiles(1);
                            } else if (!data.maxNumberOfFilesAdjusted &&
                                    !file.error) {
                                that._adjustMaxNumberOfFiles(-1);
                            }
                            if (!file.error) {
                                that._appendUploadedFileInfo(file);
                            }
                        });
                        data.maxNumberOfFilesAdjusted = true;
                    }
                    template = that._renderDownload(data.result)
                        .appendTo(that.options.filesContainer);
                    that._forceReflow(template);
                    that._transition(template).done(
                        function () {
                            data.context = $(this);
                            that._trigger('completed', e, data);
                        }
                    );
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                var that = $(this).data('fileupload'),
                    template;
                if (data.maxNumberOfFilesAdjusted) {
                    that._adjustMaxNumberOfFiles(data.files.length);
                }
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                true;
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                        }
                                    );
                                }
                            );
                        } else {
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)
                        .appendTo(that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (data.context) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    data.context.find('.progress')
                        .attr('aria-valuenow', progress)
                        .find('.bar').css(
                            'width',
                            progress + '%'
                        );
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                var $this = $(this),
                    progress = parseInt(data.loaded / data.total * 100, 10),
                    globalProgressNode = $this.find('.fileupload-progress'),
                    extendedProgressNode = globalProgressNode
                        .find('.progress-extended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        $this.data('fileupload')._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .find('.bar').css(
                        'width',
                        progress + '%'
                    );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                var that = $(this).data('fileupload');
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                var that = $(this).data('fileupload');
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', '0')
                            .find('.bar').css('width', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        that._trigger('stopped', e);
                    }
                );
				if(that._isAllUploaded()){
					that._trigger('uploadComplete');
				}
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                var that = $(this).data('fileupload');
                if (data.url && data.url !== 'undefined') {	// 업로드 후 url 값이 없어 undefined 문자열이 들어가게 되는데 불 필요한 요청을 막기 위해 && data.url !== 'undefined' 추가
                    $.ajax(data);
                }
                that._adjustMaxNumberOfFiles(1);
                that._transition(data.context).done(
                    function () {
                        $(this).remove();
                        that._trigger('destroyed', e, data);
                    }
                );
            }
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (err) {}
            });
        },

        _adjustMaxNumberOfFiles: function (operand) {
            if (typeof this.options.maxNumberOfFiles === 'number') {
                this.options.maxNumberOfFiles += operand;
                if (this.options.maxNumberOfFiles < 1) {
                    this._disableFileInputButton();
                } else {
                    this._enableFileInputButton();
                }
            }
        },

        _formatFileSize: function (bytes) {
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

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1073741824) {
                return (bits / 1073741824).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1048576) {
                return (bits / 1048576).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1024) {
                return (bits / 1024).toFixed(2) + ' kbit/s';
            }
            return bits + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = parseInt(seconds / 86400, 10);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _hasError: function (file) {
            if (file.error) {
                return file.error;
            }
            // The number of added files is subtracted from
            // maxNumberOfFiles before validation, so we check if
            // maxNumberOfFiles is below 0 (instead of below 1):
            if (this.options.maxNumberOfFiles < 0) {
                return 'maxNumberOfFiles';
            }
            // Files are accepted if either the file type or the file name
            // matches against the acceptFileTypes regular expression, as
            // only browsers with support for the File API report the type:
            if (!(this.options.acceptFileTypes.test(file.type) ||
                    this.options.acceptFileTypes.test(file.name))) {
                return 'acceptFileTypes';
            }
            //확장자 체크
            if (this.options.allowedExtension) {
                if(!this.options.allowedExtRegex){
                    this.options.allowedExtRegex = new RegExp('\.(' + $.map(this.options.allowedExtension.split(","), $.trim).join('|') + ')$', 'i');
                }
                if(!this.options.allowedExtRegex.test(file.name)) {
                    return 'allowedExtension';
                }
            }
            if (this.options.limitedExtension) {
                if(!this.options.limitedExtRegex){
                    this.options.limitedExtRegex = new RegExp('\.(' + $.map(this.options.limitedExtension.split(","), $.trim).join('|') + ')$', 'i');
                }
                if(this.options.limitedExtRegex.test(file.name)) {
                    return 'limitedExtension';
                }
            }

            //파일 사이즈 체크
            if (this.options.maxFileSize &&
                    file.size > this.options.maxFileSize) {
                return 'maxFileSize';
            }
            if (typeof file.size === 'number' &&
                    file.size < this.options.minFileSize) {
                return 'minFileSize';
            }
            //전체 파일사이즈 체크
            if ((file.size || 0) + this.options.addedFileSize > this.options.maxTotalFileSize) {
                return 'maxTotalFileSize';
            }
            return null;
        },

        _validate: function (files) {
            var that = this,
                valid = !!files.length;
            $.each(files, function (index, file) {
                file.error = that._hasError(file);
                if (file.error) {
                    valid = false;
                }
            });
            return valid;
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreview: function (file, node) {
            var that = this,
                options = this.options,
                dfd = $.Deferred();
            return ((loadImage && loadImage(
                file,
                function (img) {
                    node.append(img);
                    that._forceReflow(node);
                    that._transition(node).done(function () {
                        dfd.resolveWith(node);
                    });
                    if (!$.contains(that.document[0].body, node[0])) {
                        // If the element is not part of the DOM,
                        // transition events are not triggered,
                        // so we have to resolve manually:
                        dfd.resolveWith(node);
                    }
                },
                {
                    maxWidth: options.previewMaxWidth,
                    maxHeight: options.previewMaxHeight,
                    canvas: options.previewAsCanvas
                }
            )) || dfd.resolveWith(node)) && dfd;
        },

        _renderPreviews: function (files, nodes) {
            var that = this,
                options = this.options;
            nodes.find('.preview span').each(function (index, element) {
                var file = files[index];
                if (options.previewSourceFileTypes.test(file.type) &&
                        ($.type(options.previewSourceMaxFileSize) !== 'number' ||
                        file.size < options.previewSourceMaxFileSize)) {
                    that._processingQueue = that._processingQueue.pipe(function () {
                        var dfd = $.Deferred();
                        that._renderPreview(file, $(element)).done(
                            function () {
                                dfd.resolveWith(that);
                            }
                        );
                        return dfd.promise();
                    });
                }
            });
            return this._processingQueue;
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest('.template-upload'),
                data = template.data('data');
            if (data && data.submit && !data.jqXHR && data.submit()) {
                button.prop('disabled', true);
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(e.currentTarget).closest('.template-upload'),
                data = template.data('data') || {};
                
            if (!data.jqXHR) {
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
                this._showTotalStatus(data, -1);
            } else {
                data.jqXHR.abort();
            }
            
          //파일 중복 처리를 위해 파일이름 저장한것을 취소버튼 누를시 저장된 파일이름 삭제
//            var idx = [];
//            var tempFileName = this.options.arrayFileName;
//            $.each(tempFileName, function(index, value){
//            	if(data.files[0].name == value){
//            		idx.push(index);
//            	}
//            });
//            
//            $.each(idx, function(index, value){
//            	tempFileName.splice(value,1);
//            });
//            
//            this.options.arrayFileName = tempFileName;
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest('.template-download'),
                data = template.data('data') || {},
                that = this;
            this._showTotalStatus(data, -1);
            $.each(data.files, function (index, file) {
                that._removeUploadedFileInfo((data.result && index <data.result.length && data.result[index]) || file);
            });

            this._trigger('destroy', e, $.extend({
                context: button.closest('.template-download'),
                type: 'DELETE',
                dataType: this.options.dataType,
                files: data.files
            }, button.data()));
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },

        _initButtonBarEventHandlers: function () {
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer;
            this._on(fileUploadButtonBar.find('.start'), {
                click: function (e) {
                    e.preventDefault();
                    if(filesList.find('.start button').click().size()==0){
						if(that._isAllUploaded()){
							that._trigger('uploadComplete');
						}
                    }
                }
            });
            this._on(fileUploadButtonBar.find('.cancel'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.cancel button').click();
                }
            });
            this._on(fileUploadButtonBar.find('.delete'), {
                click: function (e) {
                    e.preventDefault();
                    // 나온에서는 체크박스를 사용하지 않으므로 체크박스 확인을 제거 합니다.
                    /*filesList.find('.delete input:checked')
                        .siblings('button').click();
                    fileUploadButtonBar.find('.toggle')
                        .prop('checked', false);*/
                    filesList.find('.delete').find('button').click();
                }
            });
            this._on(fileUploadButtonBar.find('.toggle'), {
                change: function (e) {
                    filesList.find('.delete input').prop(
                        'checked',
                        $(e.currentTarget).is(':checked')
                    );
                }
            });
        },

        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('.fileupload-buttonbar button'),
                'click'
            );
            this._off(
                this.element.find('.fileupload-buttonbar .toggle'),
                'change.'
            );
        },

        _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                'click .start button': this._startHandler,
                'click .cancel button': this._cancelHandler,
                'click .delete button': this._deleteHandler
            });
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
            this.element.find('.fileupload-buttonbar > #filebox').removeClass('disabled');
            this.element.find('.fileupload-buttonbar > #filebox').prop('disabled', false)
            
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
            this.element.find('.fileupload-buttonbar > #filebox').addClass('disabled');
            this.element.find('.fileupload-buttonbar > #filebox').prop('disabled', true)
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = this.document[0].createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _stringToRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _initRegExpOptions: function () {
            var options = this.options;
            if ($.type(options.acceptFileTypes) === 'string') {
                options.acceptFileTypes = this._stringToRegExp(
                    options.acceptFileTypes
                );
            }
            if ($.type(options.previewSourceFileTypes) === 'string') {
                options.previewSourceFileTypes = this._stringToRegExp(
                    options.previewSourceFileTypes
                );
            }
        },

        _initSpecialOptions: function () {
            this._super();
            this.options.orginalMaxNumberOfFiles = this.options.maxNumberOfFiles;
            this._initFilesContainer();
            this._initTemplates();
            this._initRegExpOptions();
        },

        _create: function () {
            this._super();
            this._refreshOptionsList.push(
                'filesContainer',
                'uploadTemplateId',
                'downloadTemplateId'
            );
            if (!this._processingQueue) {
                this._processingQueue = $.Deferred().resolveWith(this).promise();
                this.process = function () {
                    return this._processingQueue;
                };
            }
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            this._super();
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            this._super();
        },

///////////////////////////////////////////////////////////////////////
        startUpload: function () {
            var filesList = this.options.filesContainer;

            if(filesList.find('.start button').click().size()==0){
				if(this._isAllUploaded()){
					this._trigger('uploadComplete');
				}
            }
        },

        showLimitOption : function () {
            this.element.find('.max-count').text(this.options.orginalMaxNumberOfFiles);
            this.element.find('.max-size').text(this._formatFileSize(this.options.maxTotalFileSize));
            this.element.find('.total-count').text(this.options.addedFileCount);
            this.element.find('.total-size').text(this._formatFileSize(this.options.addedFileSize));
        },

        getFileCount: function () {
        	return this.options.addedFileCount;
        },

        getFileSize: function () {
        	return this.options.addedFileSize;
        },

        getFileInfos: function () {
			var files = [],
				file = null,
			    uploadedFiles = this._uploadedFiles || {},
			    i = null;
			for (i in uploadedFiles) {
				if(uploadedFiles.hasOwnProperty(i)){
                var file = $.extend({}, uploadedFiles[i]);
                file.realFileName = file.name;
                file.localFileName = file.fileName;
                file.fileUrl = file.url;
                file.fileSize = file.size;
                file.fileExtsn = file.type;	// 파일 타입
				files.push(file);
				}
			}
            return files;
        },

        _showTotalStatus : function (data, operand) {
            var options = this.options;
            // 파일 및 첨부용량
            this.options.addedFileCount += operand * data.files.length;

            $.each(data.files, function (index, file) {
            	if (file.size) {
            		options.addedFileSize += operand * file.size;
            	}
            });

            this.element.find('.total-count').text(this.options.addedFileCount);
            this.element.find('.total-size').text(this._formatFileSize(this.options.addedFileSize));
        },

        _appendUploadedFileInfo : function(file) {
            this._uploadedFiles = this._uploadedFiles || {};
            this._uploadedFiles[file.fileName] = ($.extend({cud: 1}, file));
        },

        _removeUploadedFileInfo : function(file) {
			var uploadedFile = this._uploadedFiles[file.fileName];

			if(uploadedFile) {
				if (uploadedFile.cud && uploadedFile.cud === 1) {
					delete this._uploadedFiles[file.fileName];
				} else {
					uploadedFile.cud = 3;
				}
			}
        },

        appendFileInfo: function(files) {
            var that = this,
                template,
                data;
            if (!files || !files.length) {
                return;
            }
            
            data = {files: []};
            $.each(files, function (index, file) {
                var newFile = $.extend({cud: 0}, file);
                newFile.name = file.realFileName;
                newFile.fileName = file.localFileName;
                newFile.url = file.fileUrl;
                newFile.size = file.fileSize;
                data.files.push(newFile);
                
                // 파일을 추가 할때 첨부 파일 개수가 최대 파일 개수를 초과 하면 버튼이 비활성화 되어야 하는데 
                // 비활성화 되지 않고 있어 이부분을 수정 하였습니다. that._adjustMaxNumberOfFiles(1) --> that._adjustMaxNumberOfFiles(-1) 변경 
                that._adjustMaxNumberOfFiles(-1);
                that._appendUploadedFileInfo(newFile);
            });
            that._showTotalStatus(data, 1);
            $.each(data.files, function (index, file) {
                template = that._renderDownload([file])
                    .appendTo(that.options.filesContainer)
                    .addClass('in')
                    .data('data', {files: [file]});
                that._forceReflow(template);
            });
        },

        validFileSize: function() {
			return this.options.maxTotalFileSize >= this.getFileSize();
		},

        _isAllUploaded : function() {
           var uploadedSize = 0,
               uploadedCount = 0,
               key;

           for(key in this._uploadedFiles) {
               if (this._uploadedFiles[key].cud != 3) {
                   uploadedCount ++;
                   uploadedSize += this._uploadedFiles[key].size;
              }
           }
           if(this.options.debugMode) {
               console.log('-- uploadedCount=' + uploadedCount);
               console.log('-- addedFileCount=' + this.options.addedFileCount);
               console.log('-- uploadedSize=' + uploadedSize);
               console.log('-- addedFileSize=' + this.options.addedFileSize);
           }

           return uploadedCount === this.options.addedFileCount &&
                    (this.options.addedFileSize == 0 || uploadedSize === this.options.addedFileSize);
        }
    });

}));
