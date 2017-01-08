package com.mall.common.spring.security.service;

import javax.annotation.Resource;

import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Component;

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
