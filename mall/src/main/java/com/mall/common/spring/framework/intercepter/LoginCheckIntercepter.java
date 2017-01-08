
package com.mall.common.spring.framework.intercepter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @설명			: 세션체크되는 페이지를 체크한다.
 * @작성일		: 2016. 12. 10. 오후 11:33:47
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */
public class LoginCheckIntercepter extends HandlerInterceptorAdapter{
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object handeler) throws Exception {
		//session가져온다
		HttpSession session = request.getSession(false);
		
		//sesstion체크
		if(session == null) {
			response.sendRedirect("/");
			return false;
		}
		
		//member인지확인한다.
		@SuppressWarnings("unchecked")
		Map<String, String> adminMap = (Map<String, String>) session.getAttribute("admin");
		
		if(adminMap == null) {
			response.sendRedirect("/");
			return false;
		}
		
		return true;
	}
}
