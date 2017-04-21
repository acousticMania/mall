package com.mall.mail;

import java.util.Properties;

import javax.mail.internet.MimeMessage;

import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration; 
import org.springframework.mail.javamail.JavaMailSender; 
import org.springframework.mail.javamail.JavaMailSenderImpl; 

@Configuration 
public class MailConfig { 

	@Bean 
	public static JavaMailSender mailSender(){ 
	
	JavaMailSenderImpl mailSender = new JavaMailSenderImpl(); 
	mailSender.setHost("smtp.gmail.com"); 
	mailSender.setPort(587);
	mailSender.setProtocol("smtp");
	mailSender.setUsername("wkdguscjf1987@gmail.com"); 
	mailSender.setPassword("asdf7877");
	
	
	Properties prop = new Properties();
	prop.put("mail.smtp.auth", "true");
	prop.put("mail.smtp.debug", "true");
	prop.put("mail.smtp.starttls.enable", "true");
	prop.put("mail.smtp.EnableSSL.enable", "true");

	//파일이 없으면
	mailSender.setJavaMailProperties(prop);

	/*MimeMessage mimeMsg = mailSender.createMimeMessage();
	mimeMsg.setFrom(new InternetAddress(multi.getParameter("sender-email")));
	mimeMsg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));//수취인
	mimeMsg.setSubject(title, "utf-8");
	mimeMsg.setContent(msg, "text/html; charset=utf-8");
	mimeMsg.setSentDate(new Date());
	mailSender.send(mimeMsg);*/
	
	return mailSender; 
	
	
	}
	
}
