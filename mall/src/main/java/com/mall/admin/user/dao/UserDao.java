package com.mall.admin.user.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class UserDao extends QueryMapper{
	
	private String namespace = "com.mall.admin.user.UserDao.";
	
	public Object insertUser(Map<String, String> paramMap) {
		return this.insert(namespace + "insertUser", paramMap);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectUser(String username) {
		return (Map<String, Object>) this.selectOne(namespace + "selectUser", username);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectUserAll() {
		return (List<Map<String, Object>>) this.selectList(namespace + "selectUserAll");
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> checkLoginId(Map<String, String> paramMap) {
		return (Map<String, Object>) this.selectOne(namespace + "checkLoginId" ,paramMap);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectLoginId(Map<String, String> paramMap) {
		return (List<Map<String, Object>>) this.selectList(namespace + "findLoginId" ,paramMap);
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPassWd(Map<String, String> paramMap) {
		return (Map<String, Object>) this.selectOne(namespace + "findPassWd" ,paramMap);
	}
	
	@SuppressWarnings("unchecked")
	public void updatePassWd(Map<String, String> paramMap) {
		this.update(namespace + "updatePassWd" ,paramMap);
	}
	
	
	
}
