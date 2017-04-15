
package com.mall.admin.order.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.admin.order.service.OrderService;
import com.mall.sample.service.SampleService;

/**
 * @설명			: 주문관리 
 * @작성일		: 2017. 1. 10. 오전 10:27:13
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @수정일		: 2017. 3. 28. 오후 9:40
 * @수정자		: Choi Jaehyuk(psychyboy@gmail.com)
 * @version 	: 12st.V1.1
 */

@Controller
public class OrderController {

	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	@Resource
	private OrderService orderService;
	
	@RequestMapping(value="/admin/order/orderList")
	public String orderList(@RequestParam Map<String, Object> paramMap) {
		return "/admin/order/orderList.tiles";
	}
	
	@RequestMapping(value="/admin/order/orderListJson", produces = {"application/json"})
	public ModelAndView orderListJson(@RequestParam Map<String, Object> paramMap) {
		ModelAndView mv = new ModelAndView();
		List<Map<String, Object>> list = orderService.selectOrderList(paramMap);
		int totalCount = orderService.selectOrderTotalCount(paramMap);
		logger.info("totalCount : " + totalCount);
		logger.info("list size : " + list.size());
		logger.info("list : " + list);
		
		mv.addObject("list", list);
		mv.addObject("TOTAL", totalCount);
		return mv;
	}
}
