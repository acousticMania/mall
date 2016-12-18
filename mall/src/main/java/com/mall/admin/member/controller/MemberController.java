
package com.mall.admin.member.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@RequestMapping(value = "/admin/member/member", method = RequestMethod.GET)
	public String member(Locale locale, Model model) {
	    logger.info("Welcome home! The client locale is {}.", locale);
	        
	    return "/admin/member/member.tiles";
	}
}
