package com.mall.system.menu.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.system.code.controller.CodeController;
import com.mall.system.menu.service.MenuService;

@Controller
public class MenuController {

	
	private static final Logger logger = LoggerFactory.getLogger(CodeController.class);
	
	@Resource
	private MenuService menuService;
	
	/**
	 * 메뉴 조회
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menuList")
	public ModelAndView menuList(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		mv.setViewName("/admin/system/menu/menu.tiles");
		return mv;
	}
	
	/**
	 * 메뉴조회 ajax
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menu/selectMenuList", produces = {"application/json"})
	public ModelAndView selectMenuList(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		List<Map<String, Object>> adminMenuList =  menuService.selectMenuList("ADMIN");
		List<Map<String, Object>> userMenuList =  menuService.selectMenuList("USER");
		List<Map<String, Object>> extMenuList =  menuService.selectMenuList("EXT");
		
		mv.addObject("adminMenuList",adminMenuList);
		mv.addObject("extMenuList",extMenuList);
		mv.addObject("userMenuList",userMenuList);
		return mv;
	}
	
	/**
	 * 메뉴 트리
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = "/admin/system/menu/selectMenuTree", method = RequestMethod.GET)
	public void selectMenuTree( Model model,HttpServletRequest request , HttpServletResponse response) throws IOException {
		//model.asMap(); 
		String node = request.getParameter("node");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("up_tree_id", node);
		JSONObject jsonObj = new JSONObject();  
		JSONObject jsonObj2 = null; 
		JSONArray jsonArr= new JSONArray(); 
		List<Map<String, Object>> menuList =  menuService.selectMenuTree(paramMap);
		//node는 서버에서받은 root의 id값이다. 
		for(int i=0; i<menuList.size();i++) { 
			jsonObj2 = new JSONObject(); 
			jsonObj2.put("text",menuList.get(i).get("menu_name")); 
			jsonObj2.put("result",jsonObj2.toJSONString(menuList.get(i)));
			jsonObj2.put("id",menuList.get(i).get("tree_id"));
			jsonObj2.put("leaf",Integer.parseInt(menuList.get(i).get("cnt").toString())>0?false:true); 
			jsonObj2.put("expanded",false);
			jsonArr.add(jsonObj2); 
		} //꼭 children이 아니여도 된다. children으로 준 이유는 proxy -> reader -> root값을 children으로 주었기때문 //proxy -> reader -> root 값을 하단 key값과 맞춰만 주면 된다. 
		jsonObj.put("children", jsonArr); 
		
		response.setContentType("text/plain; charset=utf-8"); // 이부분 세팅해줘야 한글로 넘어감.
		PrintWriter pw = response.getWriter(); 
		pw.print(jsonObj);
		pw.flush(); 
		pw.close();

		
	}
	
	/**
	 * 메뉴 추가
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menu/insertMenu", produces = {"application/json"})
	public Map<String, Object> insertMenu(@RequestParam Map<String, String> paramMap){
		Map<String, Object> map = new HashMap<String, Object>();
		menuService.insertMenu(paramMap);
		return map;
	}
	
	/**
	 * 메뉴 수정
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menu/updateMenu", produces = {"application/json"})
	public ModelAndView updateMenu(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		menuService.updateMenu(paramMap);
		Map<String, Object> menuData =  menuService.selectMenuByMenuId(paramMap);
		
		mv.addObject("menuData",menuData);
		
		return mv;
	}
	
	
	/**
	 * 메뉴 수정
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menu/checkValidationMenuId", produces = {"application/json"})
	public ModelAndView checkValidationMenuId(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		Map<String, Object> menuData =  menuService.selectMenuByMenuId(paramMap);
		
		mv.addObject("validateMenuId",StringUtils.isEmpty(menuData));
		
		return mv;
	}
	
	/**
	 * 메뉴삭제
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/menu/deleteMenu", produces = {"application/json"})
	public ModelAndView deleteMenu(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		menuService.deleteMenu(paramMap);
				
		return mv;
	}
	
}
