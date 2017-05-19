package com.mall.common.upload.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.mall.common.spring.framework.service.FileUtil;
import com.mall.common.util.CommonUtil;
import com.naon.framework.util.StringUtil;

@Service
public class FileService {

	private static final String filePath = "D:\\project\\file\\";
	private static final String BASE_DIR = "uploadDir";
	private static final String TEMP_DIR = "temp";
	private static final String PATTERN = "\\"+File.separator+"\\.\\.\\"+File.separator;
	
	

	public List<Map<String, Object>> saveFileToTempDir(MultipartHttpServletRequest request,
			Map<String, MultipartFile> fileMap) {
		
		String tempDirectory = filePath;
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		MultipartFile multipartFile = null;
		String localFileName = null;
		String fileExtsn = null;
		String originalFileName = null;
		
		File file = new File(filePath);
		if(file.exists() == false) {
			file.mkdirs();
		}
		
		for (Map.Entry<String, MultipartFile> entry : fileMap.entrySet()) {
			multipartFile = entry.getValue();
			fileExtsn = FileUtil.getFileType(multipartFile.getOriginalFilename());
			localFileName = CommonUtil.getRandomString() + "." + fileExtsn;
			originalFileName = StringUtil.nullToString(multipartFile.getOriginalFilename());
			
			Map<String, Object> nFileMap = new HashMap<String, Object>();
			// 스크립트에서 업로드된 파일 목록을 표시 할 때 오류가 발생하여 replace 해준다.
			nFileMap.put("name", StringUtil.replace(StringUtil.replace(originalFileName, "'", "`"), "\"'", "＂"));
			nFileMap.put("fileName", localFileName);
			nFileMap.put("type", multipartFile.getContentType());
			nFileMap.put("size", multipartFile.getSize());
			nFileMap.put("url", tempDirectory);
			
			// 비허용확장장체크
			if(badFileExt(originalFileName)) {
				nFileMap.put("error", "limitedExtension");
				nFileMap.put("size", 0);
				fileList.add(nFileMap);
				continue;
			}
			
			try {
				FileCopyUtils.copy(multipartFile.getBytes(), new FileOutputStream(tempDirectory+File.separator+localFileName));
				fileList.add(nFileMap);
			}  catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		return fileList;
	}
	
	/**
	 * 비허용확장자여부체크
	 *
	 * @param fileName
	 *            the file name
	 * @return true, if successful
	 */
	public boolean badFileExt(String fileName) {
		String badPattern = "^\\S+.(?i)(asp|php|aspx|jsp|js|jspf|html|htm|cgi|perl|pl)$";
		return Pattern.matches(badPattern, fileName);
	}
	
	
	/**
	 * Pattern match.
	 *
	 * @param filePath
	 *            the file path
	 * @return true, if successful
	 */
	public boolean patternMatch(String filePath) {
		Pattern p = Pattern.compile(PATTERN);
		Matcher m = p.matcher(filePath);
		
		if(m.find()){
			return true;
		}
		
		return false;
	}

}
