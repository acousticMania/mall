
package com.mall.admin.user.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class LoginDao extends QueryMapper{

	private String namespace = "com.study.admin.user.LoginDao.";
	
	@SuppressWarnings("unchecked")
	public Map<String, String> selectUserInfo(Map<String, String> paramMap) {
		return (Map<String, String>) this.selectOne(namespace + "selectUserInfo", paramMap);
	}

}
