package com.mall.admin.user.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class UserDao extends QueryMapper{
	
	private String namespace = "com.mall.admin.user.UserDao.";
	
	public Object insertUser(Map<String, String> paramMap) {
		return this.insert(namespace + "insertUser", paramMap);
	}

}
