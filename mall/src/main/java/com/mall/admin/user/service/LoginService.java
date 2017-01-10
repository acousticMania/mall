
package com.mall.admin.user.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.LoginDao;

@Service
public class LoginService {
	
	@Resource
	private LoginDao loginDao;
	
	/**
	 * @설명 			: 사용자 정보를 가져온다.
	 * @author 			: Seo Myeongseok(sirosms@gmail.com)
	 * @date			: 2017. 1. 10. 오전 10:31:57
	 * @Method Name		: selectUserInfo
	 * @param paramMap
	 * @return
	 */
	public Map<String, String> selectUserInfo(Map<String, String> paramMap) {
		return loginDao.selectUserInfo(paramMap);
	}

}
