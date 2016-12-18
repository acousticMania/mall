package com.mall.sample.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface SampleService {
	
	List<Map<String, String>> selectBoardList(Map<String, String> map);

	List<Map<String, String>> selectMemberList();

	void insertBoard(Map<String, Object> map, HttpServletRequest request);

	Map<String, Object> selectBoardDetail(Map<String, String> map) throws Exception;

	void updateBoard(Map<String, Object> map, HttpServletRequest request);

	void deleteBoard(Map<String, String> map);
	
	Map<String, Object> selectFileInfo(Map<String, Object> map);
}
