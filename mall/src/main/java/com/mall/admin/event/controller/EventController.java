
package com.mall.admin.event.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EventController {
	
	@RequestMapping("/admin/event/eventList")
	public String viewEvent() {
		return "/admin/event/eventList.tiles";
	}
	
}
