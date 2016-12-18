
package com.mall.admin.order.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {

	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	@RequestMapping("/admin/order/orderList")
	public String orderList() {
		return "/admin/order/orderList.tiles";
	}
}
