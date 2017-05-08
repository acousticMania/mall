package com.mall.common.upload;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class FileController {
	
	@RequestMapping("/common/upload/image_daumEdit")
	public String viewDaumEdit() {
		return "/common/upload/image_daumEdit";
	}

	@RequestMapping("/common/editor/imgUpload")
	public String imgUpload() {
		return "/common/editor/daumImgUploadVerSix";
	}

	@RequestMapping("/common/editor/upload")
	public ResponseEntity upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "text/plain; charset=UTF-8");
		
		return new ResponseEntity("", responseHeaders, HttpStatus.CREATED);
	}
	
}
