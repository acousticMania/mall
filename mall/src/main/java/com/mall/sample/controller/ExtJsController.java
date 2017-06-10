package com.mall.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ExtJsController {
	
	@RequestMapping("/sample/extJs")
	public String extJs() {
		return "/sample/extJs";
	}
	
	public void main() {
		
	}
	
}
