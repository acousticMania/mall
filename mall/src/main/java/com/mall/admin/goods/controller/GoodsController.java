
package com.mall.admin.goods.controller;

import java.text.DecimalFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.admin.goods.service.GoodsService;

/**
 * Goods 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @version : 12st.V1.0
 * @설명 : 상품관리
 * @작성일 : 2017. 1. 10. 오전 10:26:06
 * @작성자 : Seo Myeongseok(sirosms@gmail.com)
 */

@Controller
public class GoodsController {
	
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(GoodsController.class);
	
	/** The goods service. */
	@Resource
	private GoodsService goodsService;
	
	/**
	 * Generate work id.
	 *
	 * @param custId
	 *            the cust id
	 * @return the string
	 */
	private String generateWorkId(String custId) {
		// 20 자리 WORK_ID 생성
		StringBuilder sb = new StringBuilder(20);
		DecimalFormat decimalFormat = new DecimalFormat("000");

		sb.append("G");											// GOODS_ID 헤더 (1자리)
		sb.append(custId);										// 미정 ID (3자리)
		sb.append(System.currentTimeMillis());					// 현재시간 밀리세컨드 (13자리)
		sb.append(decimalFormat.format(Math.random() * 999));	// 난수 (3자리)

		return sb.toString();
	}

	
	
	
	/**
	 * 기존 카탈로그화면 준석이가 했던거.(삭제해야함)
	 *
	 * @param locale
	 *            the locale
	 * @param model
	 *            the model
	 * @return the string
	 */
	@RequestMapping(value = "/admin/goods/catalog", method = RequestMethod.GET)
	public String catalog(Locale locale, Model model) {
    logger.info("Welcome home! The client locale is {}.", locale);
        
    return "/admin/goods/catalog.tiles";
	}
	
	/**
	 * 상품조회화면을 호출한다.
	 *
	 * @return the string
	 */
	@RequestMapping("/admin/goods/goodsList")
	public String goodsList() {
		return "/admin/goods/goodsList.tiles";
	}
	
	/**
	 * 상품조회를 요청한다. ajax
	 *
	 * @param paramMap
	 *            the param map
	 * @param model
	 *            the model
	 * @return the map< string, object>
	 */
//	@RequestMapping(value = "/admin/goods/selectGoodsList", produces = {"application/json"})
//	public Map<String, Object> selectGoodsList(@RequestParam Map<String,String> paramMap, Model model) {
//		
//		List<Map<String,String>> goodsList = goodsService.selectGoodsList();
//		
//		int rows = 10;
//		int totalCount = goodsList.size();
//		int total_page = totalCount /rows;
//		if(totalCount%rows > 0) total_page++;
//		
//		Map<String, Object> map = new HashMap();
//		
//		map.put("TOTAL", totalCount);
//		map.put("TOTAL_PAGE", total_page);
//		map.put("goodsList", goodsList);
//		
//		return map;
//	}
	
	/**
	 * 상품조회를 요청한다. ajax (restful)
	 *
	 * @param paramMap
	 *            the param map
	 * @param model
	 *            the model
	 */
	@RequestMapping("/admin/goods/selectGoodsList")
	public void selectGoodsList(@RequestParam Map<String,String> paramMap, Model model) {
		
		List<Map<String,String>> goodsList = goodsService.selectGoodsList();
		
		int rows = 10;
		int totalCount = goodsList.size();
		int total_page = totalCount /rows;
		if(totalCount%rows > 0) total_page++;
		
		
		model.addAttribute("TOTAL", totalCount);
		model.addAttribute("TOTAL_PAGE", total_page);
		model.addAttribute("goodsList", goodsList);
	}
	
	
	
	/**
	 * goods grp list 조회를 요청한다.
	 *
	 * @param paramMap
	 *            the param map
	 * @param model
	 *            the model
	 */
	@RequestMapping("/admin/goods/selectGoodsGrpList")
	public void selectGoodsGrpList(@RequestParam Map<String, String> paramMap, Model model) {
		String gdGrpId = paramMap.get("gdGrpId");
		
		if(gdGrpId == null)	gdGrpId = "GP01";
		
		List<Map<String,String>> goodsGrpList = goodsService.selectGoodsGrpList(gdGrpId);
		
		model.addAttribute("goodsGrpList", goodsGrpList);
	}
	
}
