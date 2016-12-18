package com.mall.sample.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mall.sample.service.SampleService;

@Controller
public class NgController {
	
	@Resource
	SampleService sampleService;
	
	@RequestMapping("/angularTest")
	public ModelAndView test() {
	  ModelAndView mv = new ModelAndView();
	  
	  mv.setViewName("/angularTest");
	  return mv;
	}
	
	@RequestMapping("/sample/openNgBoardList")
	public ModelAndView openNgBoardList() {
		ModelAndView mv = new ModelAndView();
		
		mv.setViewName("/sample/ngBoardList");
		return mv;
	}
	
	@RequestMapping("/sample/selectNgBoardList")
	public @ResponseBody Map<String, Object> selectNgBoardList(@RequestParam Map<String, String> paramMap) {
		Map<String, Object> dataMap = new HashMap<String, Object>();
		
		List<Map<String, String>> list = sampleService.selectBoardList(paramMap);
		
		dataMap.put("list", list);	
		return dataMap;
	}
	
	@RequestMapping("/sample/openNgBoardWrite")
	public ModelAndView openBoardWrite() {
		ModelAndView mv = new ModelAndView("/sample/ngBoardWrite");
		return mv;
	}
	
	@RequestMapping("/sample/openNgBoardDetail")
	public ModelAndView openBoardDetail(@RequestParam Map<String, String> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		Map<String, Object> map = sampleService.selectBoardDetail(paramMap);
		mv.addObject("map", map);
		mv.setViewName("/sample/ngBoardDetail");
		return mv;
	}
	
	
	
	
	
	/*@RequestMapping("/sample/selectNgBoardList")
	public ModelAndView selectNgBoardList(@RequestParam Map<String, String> paramMap) {
		Map<String, Object> dataMap = new HashMap<String, Object>();
		
		List<Map<String, String>> list = sampleService.selectBoardList(paramMap);
		dataMap.put("list", list);
		
		ModelAndView mv = new ModelAndView("jsonView", dataMap);
		return mv;
	}*/
	
	// 뷰리졸버에서 데이터타입을 판별하지 못하는거같음
	/*@RequestMapping("/sample/selectNgBoardList")
	public ModelMap selectNgBoardList(@RequestParam Map<String, String> paramMap) {
		ModelMap dataMap = new ModelMap();
		
		List<Map<String, String>> list = sampleService.selectBoardList(paramMap);
		
		dataMap.put("list", list);
		
		return dataMap;
	}*/
}
