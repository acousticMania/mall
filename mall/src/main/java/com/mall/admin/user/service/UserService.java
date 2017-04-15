package com.mall.admin.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.UserDao;
import com.mall.admin.user.vo.UserDetailsVO;

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
		resultVal = sqlData.size();
		return resultVal;
	}

}
