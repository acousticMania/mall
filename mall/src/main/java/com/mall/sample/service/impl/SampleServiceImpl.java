package com.mall.sample.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mall.common.spring.framework.service.FileUtil;
import com.mall.sample.dao.SampleDao;
import com.mall.sample.service.SampleService;

@Service
public class SampleServiceImpl implements SampleService{

	private static final Logger logger = LoggerFactory.getLogger(SampleServiceImpl.class);
	
	@Resource
	private SampleDao sampleDao;
	
	@Resource
	private FileUtil fileUtil;
	
	
	public List<Map<String, String>> selectMemberList() {
		logger.debug("MemberListTest!!!!");
		return sampleDao.selectMemberList();
	};
	
	@Override
	public List<Map<String, Object>> selectBoardList(Map<String, Object> map) {
		return sampleDao.selectBoardList(map);
	}
	
	@Transactional
	@Override
	public void insertBoard(Map<String, Object> map, HttpServletRequest request) {
		sampleDao.insertBoard(map);
		
		List<Map<String, Object>> list = fileUtil.parseInsertFileInfo(map, request);
		for(int i=0; i < list.size(); i++) {
			sampleDao.insertFile(list.get(i));
		}
				
	}
	
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	@Override
	public Map<String, Object> selectBoardDetail(Map<String, String> map) throws Exception {
		//TransactionTest
		logger.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Transaction Test");
		logger.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ update");
		sampleDao.updateHitCnt(map);

		logger.debug("---------------------------------------------------------- insert");
//		if(map != null) {
//			throw new Exception();
//		}
//		sampleDao.insertTest(map);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, String> tempMap = sampleDao.selectBoardDetail(map);
		resultMap.put("map", tempMap);
		
		List<Map<String, String>> list = sampleDao.selectFileList(map);
		resultMap.put("list", list);
		return resultMap;
	}
	
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	@Override
	public void updateBoard(Map<String, Object> map, HttpServletRequest request) {
		sampleDao.updateBoard(map); 
		
		sampleDao.deleteFileList(map);
		List<Map<String, Object>> list = fileUtil.parseInsertFileInfo(map, request);
		Map<String, Object> tempMap = null;
		for(int i=0; i < list.size(); i++) {
			tempMap = list.get(i);
			if(tempMap.get("IS_NEW").equals("Y")) {
				sampleDao.insertFile(tempMap);
			} else {
				sampleDao.updateFile(tempMap);
			}
		}
		
	}

	@Override
	public void deleteBoard(Map<String, String> map) {
		sampleDao.deleteBaord(map);
	}

	@Override
	public Map<String, Object> selectFileInfo(Map<String, Object> map) {
		return sampleDao.selectFileInfo(map);
	}
	
}
