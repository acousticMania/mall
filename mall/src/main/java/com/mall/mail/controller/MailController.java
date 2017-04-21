package com.mall.mail.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mall.mail.service.MailService;


@Controller
public class MailController {
	
	@Resource
	private MailService mailService;
	
	@RequestMapping("mail/sendmail")
	public void findId(@RequestParam Map<String, Object> paramMap) {
		
		String result = mailService.sendMail(paramMap);
		
	}
}