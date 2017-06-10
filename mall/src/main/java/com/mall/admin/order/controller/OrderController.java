
package com.mall.admin.order.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mall.admin.order.service.OrderService;
import com.mall.sample.service.SampleService;

/**
 * @설명 : 주문관리
 * @작성일 : 2017. 1. 10. 오전 10:27:13
 * @작성자 : Seo Myeongseok(sirosms@gmail.com)
 * @수정일 : 2017. 3. 28. 오후 9:40
 * @수정자 : Choi Jaehyuk(psychyboy@gmail.com)
 * @version : 12st.V1.1
 */

@Controller
public class OrderController {

	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

	@Resource
	private OrderService orderService;

	@RequestMapping(value = "/admin/order/orderList")
	public String orderList(@RequestParam Map<String, Object> paramMap) {
		return "/admin/order/orderList.tiles";
	}

	@RequestMapping(value = "/admin/order/orderView")
	public ModelAndView orderView(@RequestParam Map<String, Object> paramMap, @RequestParam String ORD_NO) {
		
		logger.info("ORD_NO : " + ORD_NO);
		Map<String, Object> selectOrderDetail = null;
		List<Map<String, Object>> selectGoodslist = null;
		
		ModelAndView mv = new ModelAndView("/admin/order/orderView.tiles");
		try {
			selectGoodslist = orderService.selectGoodsList(paramMap);
			selectOrderDetail = orderService.selectOrderDetail(paramMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mv.addObject("selectGoodslist", selectGoodslist);
		mv.addObject("selectOrderDetail", selectOrderDetail);
		
		return mv;
	}

	@RequestMapping(value = "/admin/order/orderListJson", produces = { "application/json" })
	public ModelAndView orderListJson(@RequestParam Map<String, Object> paramMap) {
		paramMap.put("PAGE_INDEX", paramMap.get("page"));
		paramMap.put("PAGE_ROW", paramMap.get("rows"));

		ModelAndView mv = new ModelAndView();
		List<Map<String, Object>> list = orderService.selectOrderList(paramMap);
		int rows = Integer.parseInt(paramMap.get("rows").toString());
		int totalCount = orderService.selectOrderTotalCount(paramMap);
		logger.info("totalCount : " + totalCount);
		logger.info("list size : " + list.size());
		logger.info("list : " + list);
		int total_page = totalCount / rows;
		if (totalCount % rows > 0)
			total_page++;
		mv.addObject("list", list);
		mv.addObject("TOTAL", totalCount);
		mv.addObject("TOTAL_PAGE", total_page);
		return mv;
	}

	@RequestMapping(value = "/admin/order/orderSearchListJson", produces = { "application/json" })
	public @ResponseBody List<Map<String, Object>> orderListSearchJson2(@RequestParam Map<String, Object> paramMap,
			HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		// System.out.println("출력"+paramMap.get("ORD_NO"));
		// System.out.println("출력2"+paramMap.get("ORD_DATE_BEFORE"));
		// System.out.println("출력3"+paramMap.get("ORD_DATE_AFTER"));

		String[] ORD_STATUSList = request.getParameterValues("ORD_STATUS");

		if (ORD_STATUSList != null) {
			if (ORD_STATUSList.length > 0) {
				for (int x = 0; x < ORD_STATUSList.length; x++) {
					// System.out.println(item[x]);
					logger.info("출력" + ORD_STATUSList[x]);
				}
			}
			List<String> ORD_STATUS = Arrays.asList(ORD_STATUSList);
			paramMap.put("ORD_STATUS", ORD_STATUS);
		}

		String[] PAY_METHODList = request.getParameterValues("PAY_METHOD");
		if (PAY_METHODList != null) {

			if (PAY_METHODList.length > 0) {
				for (int x = 0; x < PAY_METHODList.length; x++) {
					// System.out.println(item[x]);
					logger.info("출력" + PAY_METHODList[x]);
				}
			}
			// 그냥 쓸 경우 NumberFormatException 발생 - https://okky.kr/article/273701
			List<String> PAY_METHOD = Arrays.asList(PAY_METHODList);
			paramMap.put("PAY_METHOD", PAY_METHOD);
		}

		logger.info("출력2" + paramMap.get("ORD_DATE_BEFORE"));
		logger.info("출력3" + paramMap.get("ORD_DATE_AFTER"));

		List<Map<String, Object>> list = orderService.selectOrderSearchList(paramMap);
		// int totalCount = orderService.selectOrderTotalCount(paramMap);
		// logger.info("totalCount : " + totalCount);
		// logger.info("list size : " + list.size());
		// logger.info("list : " + list);
		// mv.addObject("list", list);
		// mv.addObject("TOTAL", totalCount);
		return list;
	}

	@RequestMapping(value = "/admin/order/updateOrderStatus", produces = { "application/json" })
	public ModelAndView updateOrderStatus(@RequestParam Map<String, Object> paramMap) {
		ModelAndView mv = new ModelAndView();
		int cnt = orderService.updateOrderStatus(paramMap);
		// int totalCount = orderService.selectOrderTotalCount(paramMap);
		// logger.info("totalCount : " + totalCount);
		// logger.info("list size : " + list.size());
		// logger.info("list : " + list);
		String result = "fail";
		if (cnt > 0)
			result = "ok";
		mv.addObject("result", result);
		return mv;
	}
}
