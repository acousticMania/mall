
package com.mall.admin.user.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.LoginDao;

@Service
public class LoginService {
	
	@Resource
	private LoginDao loginDao;
	
	public Map<String, String> selectUserInfo(Map<String, String> paramMap) {
		return loginDao.selectUserInfo(paramMap);
	}

}
