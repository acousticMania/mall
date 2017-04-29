
package com.mall.admin.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mall.admin.user.dao.UserDao;
import com.mall.admin.user.vo.UserDetailsVO;
import com.mall.common.util.QueryMapper;

@Service
public class UserAuthenticationService extends QueryMapper implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserAuthenticationService.class);
	
	@Resource
	private UserDao userDao;
	
	public UserAuthenticationService() {
		super();
		// TODO Auto-generated constructor stub
	}
	


	/**
	 * 사용자 접근권한 설정
	 */
	@Override
	public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
		
		Map<String, Object> user = userDao.selectUser(loginId);
		if(user == null) throw new UsernameNotFoundException(loginId);
		logger.info(user.toString());
		boolean bol = user.get("status").equals("R");
		String userKind = (String)user.get("userKind");
		
		// 권한별 권한 리스트 추가
		List<GrantedAuthority> gaList = new ArrayList<GrantedAuthority>();
		if(userKind.equals("ADMIN")){
			gaList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}else if(userKind.equals("SELLER")){
			gaList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}else{
			gaList.add(new SimpleGrantedAuthority("permitAll"));
		}
		
		// 사용자에 따라 권한 리스트 추가
		return new UserDetailsVO(user.get("loginId").toString(), user.get("password").toString(), bol, true, true, true, gaList);
	}

}
