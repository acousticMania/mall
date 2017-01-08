package com.mall.sample.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.common.spring.framework.service.FileUtil;
import com.mall.sample.service.SampleService;

/**
 * @설명			: sample관련 컨트롤러  
 * @작성일		: 2016. 12. 10. 오후 11:35:36
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */
@Controller
public class SampleController {
	
	private static final Logger logger = LoggerFactory.getLogger(SampleController.class);
	
	@Resource
	private SampleService sampleService;
	
	@RequestMapping("/userInfo")
	public String test(Model model) {
		
		logger.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		
		List<Map<String, String>> memberList = new ArrayList<Map<String, String>>();
		memberList = sampleService.selectMemberList();
		model.addAttribute("memberList", memberList);
		
		return "/testdb/test";
	}
	
	@RequestMapping("/sample/openBoardList")
	public ModelAndView openBoardList(@RequestParam Map<String, String> paramMap) {
		ModelAndView mv = new ModelAndView();
		
		//Ajax로 변경
//		List<Map<String, String>> list = sampleService.selectBoardList(paramMap);
//		mv.addObject("list", list);
		mv.setViewName("/sample/boardList");
		
		return mv;
	}
	
	@RequestMapping("/sample/openBoardWrite")
	public ModelAndView openBoardWrite() {
		ModelAndView mv = new ModelAndView("/sample/boardWrite");
		return mv;
	}
	
	@RequestMapping("/sample/insertBoard")
	public ModelAndView insertBoard(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		
		logger.debug("@@@@@@@@@@@@@@@@@ Map" + paramMap);
		
		sampleService.insertBoard(paramMap, request);
		mv.setViewName("redirect:/sample/openBoardList");
		return mv;
	}
	
	@RequestMapping("/sample/openBoardDetail")
	public ModelAndView openBoardDetail(@RequestParam Map<String, String> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		Map<String, Object> map = sampleService.selectBoardDetail(paramMap);
		mv.addObject("map", map.get("map"));
		mv.addObject("list", map.get("list"));
		mv.setViewName("/sample/boardDetail");
		return mv;
	}
	
	@RequestMapping("/sample/openBoardUpdate")
	public ModelAndView openBoardUpdate(@RequestParam Map<String, String> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		Map<String, Object> map = sampleService.selectBoardDetail(paramMap);
		mv.addObject("map", map.get("map"));
		mv.addObject("list", map.get("list"));
		mv.setViewName("/sample/boardUpdate");
		return mv;
	}
	
	@RequestMapping("/sample/updateBoard")
	public ModelAndView updateBaord(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		
		sampleService.updateBoard(paramMap, request);
		mv.addObject("BOARD_IDX", paramMap.get("BOARD_IDX"));
		mv.setViewName("redirect:/sample/openBoardDetail");
		return mv;
	}
	
	@RequestMapping("/sample/deleteBoard")
	public ModelAndView deleteBoard(@RequestParam Map<String, String> paramMap) {
		ModelAndView mv = new ModelAndView();
		
		sampleService.deleteBoard(paramMap);
		mv.setViewName("redirect:/sample/openBoardList");
		return mv;
	}
	
	@RequestMapping("/sample/downloadFile")
	public void downloadFile(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) {
		Map<String, Object> map = sampleService.selectFileInfo(paramMap);
		String fileName = (String)map.get("FILE_NAME");
		String realFileName = (String)map.get("REAL_FILE_NAME");
		
		try {
			byte[] fileByte = FileUtils.readFileToByteArray(new File(FileUtil.filePath + fileName));
			response.setContentType("application/octet-stream");
			response.setContentLength(fileByte.length);
			response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(realFileName, "UTF-8")+"\";");
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.getOutputStream().write(fileByte);
			
			response.getOutputStream().flush();
			response.getOutputStream().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/sample/selectBoardList", produces = {"application/json"})
	public ModelAndView selectBoardList(@RequestParam Map<String, Object> paramMap) {
		ModelAndView mv = new ModelAndView();
		
		List<Map<String, Object>> list = sampleService.selectBoardList(paramMap);
		mv.addObject("list", list);
		if(list.size() >0){
			mv.addObject("TOTAL", list.get(0).get("TOTAL_COUNT"));
		} else {
			mv.addObject("TOTAL", 0);
		}
		
		return mv;
	}
	
	
	
}
