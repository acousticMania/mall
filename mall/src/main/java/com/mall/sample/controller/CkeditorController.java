package com.mall.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CkeditorController {
	
	@RequestMapping("/sample/ckeditor")
	public String ckeditor() {
		return "/sample/ckeditor";
	}
	
}
