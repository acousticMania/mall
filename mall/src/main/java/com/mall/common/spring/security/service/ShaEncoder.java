package com.mall.common.spring.security.service;

import javax.annotation.Resource;

import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * @설명			: 스프링 시큐리티 암호화 
 * @작성일		: 2017. 1. 10. 오전 10:36:02
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

@Component("shaEncoder")
public class ShaEncoder {
	
	@Resource(name="passwordEncoder")
	private ShaPasswordEncoder encoder;
	
	public String encoding(String str) {
		return encoder.encodePassword(str, null);
	}
	
	public String saltEncoding(String str, String salt) {
		return encoder.encodePassword(str, salt);
	}
}
