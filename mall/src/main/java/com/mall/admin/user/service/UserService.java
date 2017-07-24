package com.mall.admin.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.UserDao;

@Service
public class UserService {
	
	@Resource
	private UserDao userDao;
	
	/**
	 * @설명 			: 관리자 등록
	 * @author 			: Seo Myeongseok(sirosms@gmail.com)
	 * @date			: 2017. 1. 10. 오전 10:32:23
	 * @Method Name		: insertUser
	 * @param paramMap
	 */
	public void insertUser(Map<String, String> paramMap) {
		userDao.insertUser(paramMap);
	}
	
	public List<Map<String, Object>> selectUserAll(){
		
		return userDao.selectUserAll();
	}
	
	public int checkLoginId(Map<String, String> paramMap){
		
		int resultVal;
		Map<String, Object> sqlData= userDao.checkLoginId(paramMap);
		resultVal = sqlData != null?sqlData.size():0;
		return resultVal;
	}
	
	public List<Map<String, Object>> selectLoginId(Map<String, String> paramMap){
		
		return userDao.selectLoginId(paramMap);
	}
	
	public Map<String, Object> selectPassWd(Map<String, String> paramMap){
		
		return userDao.selectPassWd(paramMap);
	}

	
	public void updatePassWd(Map<String, String> paramMap){
		
		userDao.updatePassWd(paramMap);
	}
}
