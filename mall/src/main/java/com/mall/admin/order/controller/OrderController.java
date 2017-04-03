
package com.mall.admin.order.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @설명			: 주문관리 
 * @작성일		: 2017. 1. 10. 오전 10:27:13
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

@Controller
public class OrderController { 

	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	@RequestMapping("/admin/order/orderList")
	public String orderList() {
		return "/admin/order/orderList.tiles";
	}
}
