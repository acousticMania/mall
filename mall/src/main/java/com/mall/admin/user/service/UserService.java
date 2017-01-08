package com.mall.admin.user.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.UserDao;

@Service
public class UserService {
	
	@Resource
	private UserDao userDao;
	
	public void insertUser(Map<String, String> paramMap) {
		userDao.insertUser(paramMap);
	}

}
