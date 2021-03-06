package com.mall.common.spring.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**
 * @설명			: 스프링 시큐리티 인증 성공 후 처리
 * @작성일		: 2017. 1. 10. 오전 10:35:34
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

public class UserLoginSuccessHandler implements AuthenticationSuccessHandler{
	
	private static final Logger logger = LoggerFactory.getLogger(UserLoginSuccessHandler.class);
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		logger.info(authentication.getName());
		logger.info(authentication.getAuthorities().toString());
		logger.info(authentication.getDetails().toString());
		logger.info(authentication.getPrincipal().toString());
		for(GrantedAuthority authority : authentication.getAuthorities()) {
			logger.info(authority.getAuthority());
		}
		
		UserDetails user = (UserDetails) authentication.getPrincipal();
		
		logger.info(String.valueOf(user.isAccountNonExpired()));
		logger.info(String.valueOf(user.isAccountNonLocked()));
		logger.info(String.valueOf(user.isCredentialsNonExpired()));
		logger.info(String.valueOf(user.isEnabled()));
	
		logger.info(request.getContextPath());
		
//		response.sendRedirect(request.getContextPath() + "/");
	}

}
