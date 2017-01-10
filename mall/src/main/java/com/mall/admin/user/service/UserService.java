package com.mall.admin.user.service;

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

}
