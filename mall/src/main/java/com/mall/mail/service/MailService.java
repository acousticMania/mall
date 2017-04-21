package com.mall.mail.service;

import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	@Autowired 
	private JavaMailSender mailSender;
	
	private String from 	= "qhdaksen@naver.com";
	//private String subject	= "메일제목 (생략가능)";

	public String sendMail(Map<String, Object> pramMap) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			messageHelper.setTo(pramMap.get("email").toString());
			messageHelper.setText(pramMap.get("content").toString());
			messageHelper.setFrom(from);
			messageHelper.setSubject(pramMap.get("title").toString());	// 메일제목은 생략이 가능하다
			
			mailSender.send(message);
		} catch(Exception e){
			System.out.println(e);
		}
	
		return "Sucess";
	}
}
