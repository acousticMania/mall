
package com.mall.admin.user.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.admin.user.service.LoginService;
import com.mall.common.util.crypto.Hash;

import sun.misc.BASE64Encoder;

/**
 * @설명			: 로그인 처리  
 * @작성일		: 2016. 12. 13. 오후 9:04:13
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */

@Controller
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Resource
	LoginService loginService;
	
	@RequestMapping(value = "/admin/user/login")
	public String login(Locale locale, @RequestParam Map<String, String> paramMap) {
		logger.info("Login Page : {}",locale);
		
				
		return "/admin/user/login";
	}
	
	@SuppressWarnings("restriction")
	@RequestMapping("/admin/main/doLogin")
	public ModelAndView doLogin(Locale locale, HttpServletRequest request, @RequestParam Map<String,String> paramMap) {
		ModelAndView mv = new ModelAndView();
		
//		Locale locale = new Locale(request.getParameter("locale"));
//		//localeResolver에 locale 셋팅
//		localeResolver.setLocale(request, response, locale);
//		//셋팅된 locale 확인
//		System.out.println("current locale from locale resolver ====== " + 
//			localeResolver.resolveLocale(request));
		
//		MessageSource messageSource = null;
//		
//		messageSource.getMessage(code, null, locale);
		
		// 비밀번호 체크
		Map<String, String> userInfo = loginService.selectUserInfo(paramMap);

		if(userInfo != null) {
			if(userInfo.get("password").equals(new BASE64Encoder().encode(Hash.getSHA256(paramMap.get("password"))))){
				// 세션저장
				Map<String, String> map = new HashMap<String, String>();
				map.put("LOGIN_ID", userInfo.get("LOGIN_ID"));
				map.put("PASSWD", userInfo.get("PASSWD"));
				map.put("EMAIL", userInfo.get("EMAIL"));
				request.getSession().setAttribute("admin", map);
				mv.setViewName("/admin/main/main");
			} else {
				mv.addObject("pwCheck", "N");
				mv.setViewName("/admin/main/login");
			}
		} else {
			mv.addObject("pwCheck", "N");
			mv.setViewName("/admin/main/login");
		}
		
		mv.addObject("pwCheck", "N");
		
		return mv;
	}
}
