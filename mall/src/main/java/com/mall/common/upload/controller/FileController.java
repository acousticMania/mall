package com.mall.common.upload.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.mall.common.upload.service.FileService;

@Controller
public class FileController {
	
	private static final String filePath = "D:\\project\\file\\";
	
	@Autowired
	private MessageSourceAccessor msAccessor;
	
	@Autowired
	private FileService fileService;
	
	
	@RequestMapping("/common/upload/image_daumEdit")
	public String viewDaumEdit() {
		return "/common/upload/image_daumEdit";
	}

	@RequestMapping("/common/editor/imgUpload")
	public String imgUpload() {
//		return "/common/editor/daumImgUploadBootstrap";
		return "/common/editor/daumImgUploadVerSix";
	}

	@RequestMapping("/common/editor/upload")
	public ResponseEntity upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		
		// 파일정보
		Map<String, MultipartFile> fileMap = request.getFileMap();
		
		// 파일저장
		List<Map<String, Object>> fileList = fileService.saveFileToTempDir(request, fileMap);
		
		
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "text/plain; charset=UTF-8");
		
		return new ResponseEntity(fileList, responseHeaders, HttpStatus.CREATED);
	}
	
	@RequestMapping("/common/editor/fileView")
	public @ResponseBody byte[] fileView(HttpServletRequest request, HttpServletResponse response) throws IOException {
		InputStream in = null;
		String module = request.getParameter("module");
		String fileUrl = request.getParameter("fileUrl");
		String fileName = request.getParameter("fileName");
		
		String root = filePath;
		
		if(!fileUrl.matches(".*temp.*")){
			// 서버의 실제 경로에서 읽어옮
		}
		
		String filePath = fileUrl+File.separator+fileName;
		
		// //..// 패턴이 들어올경우 제외
		if(!fileService.patternMatch(filePath)) {
			try {
				in = new FileInputStream(new File(root+fileUrl+File.separator+fileName));
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException(e);
			}
		} else {
			throw new RuntimeException(msAccessor.getMessage("file.exception.notAcceptDir"));
		}
		
		return IOUtils.toByteArray(in);
	}
	
}
