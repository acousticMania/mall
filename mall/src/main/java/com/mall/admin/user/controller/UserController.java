package com.mall.admin.user.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mall.admin.user.service.UserService;
import com.mall.common.spring.security.service.ShaEncoder;


@Controller
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Resource
	private ShaEncoder encoder;
	
	@Resource
	private UserService userService;
	
	@RequestMapping("/admin/user/doJoin")
	public String doJoin() {
		return "/admin/user/join";
	}
	
	@RequestMapping("/admin/user/insertUser")
	public String insertUser(@RequestParam Map<String, String> paramMap) {
		String password = encoder.encoding(paramMap.get("USER_PWD")) ;
		paramMap.put("USER_PWD", password);
		userService.insertUser(paramMap);
		
		return "/admin/user/login";
	}
}
