package com.mall.common.spring.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

/**
 * @설명			: 스프링시큐리티 인증 실폐 후 처리  
 * @작성일		: 2017. 1. 10. 오전 10:33:28
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

public class UserLoginFailureHandler implements AuthenticationFailureHandler{
	
	private static final Logger logger = LoggerFactory.getLogger(UserLoginFailureHandler.class);
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		logger.info(exception.getLocalizedMessage());
		logger.info(exception.getMessage());
		
		for(StackTraceElement element : exception.getStackTrace()) {
			logger.info(element.getClassName());
			logger.info(element.getFileName());
			logger.info(element.getMethodName());
			logger.info(element.getLineNumber() + "");
			logger.info(element.isNativeMethod() + "");
		}
		request.setAttribute("errMsg", exception.getMessage());
		request.getRequestDispatcher("/WEB-INF/view/admin/main/login.jsp").forward(request, response);
	}
}
