package com.mall.sample.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ExcelService {

	void excelFileUpload(MultipartFile excelFile);

	List<Map<String, String>> excelFileDownload();

}
