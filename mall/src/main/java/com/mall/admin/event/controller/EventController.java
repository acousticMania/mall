
package com.mall.admin.event.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class EventController {
	
	private static final Logger logger = LoggerFactory.getLogger(EventController.class);
	
	@RequestMapping("/admin/event/viewEventList")
	public String viewEventList() {
		return "/admin/event/eventList.tiles";
	}
	
	@RequestMapping("/admin/event/selectEventList")
	public ModelAndView eventList() {
		
		ModelAndView mv = new ModelAndView("/admin/event/selectEventList");
		return mv;
	}
}
