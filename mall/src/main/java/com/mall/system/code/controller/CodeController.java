package com.mall.system.code.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mall.system.code.service.CodeService;

@Controller
public class CodeController {

	private static final Logger logger = LoggerFactory.getLogger(CodeController.class);

	@Resource
	private CodeService codeService;
	
	/**
	 * 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/oepnGrpCodeList")
	public ModelAndView oepnGrpCodeList(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		paramMap.put("grp_cd", "CODE_TYPE");
		List<Map<String, String>> codeList = codeService.selectGrpCodeList(paramMap);
		List<Map<String, String>> codeType = codeService.selectCodeList(paramMap);
		
		mv.addObject("sys_type", codeType);
		mv.addObject("codeList",codeList);
		mv.setViewName("/admin/system/code/grpCodeList.tiles");
		
		return mv;
	}
	
	/**
	 * 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value="/admin/system/selectGrpCodeList", produces = {"application/json"})
	public Map<String, Object> selectGrpCodeList(@RequestParam Map<String, String> paramMap) {
		
		//node는 서버에서받은 root의 id값이다. 
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, String>> grpCodeList = codeService.selectGrpCodeList(paramMap);
		
		int rows = 10;
		int totalCount = grpCodeList.size();
		int total_page = totalCount / rows;
		if(totalCount % rows > 0) total_page++;
		
		map.put("TOTAL", totalCount);
		map.put("TOTAL_PAGE", total_page);
		map.put("grpCodeList", grpCodeList);

		
		return map;
	}

	/**
	 * 그룹코드 추가	
	 * @return
	 */
	@RequestMapping(value="/admin/system/code/insertGrpCode", produces = {"application/json"})
	public Map<String, Object> insertGrpCode(@RequestParam Map<String, String> paramMap){
		Map<String, Object> map = new HashMap<String, Object>();
		
		codeService.insertGrpCode(paramMap);
		
		List<Map<String, String>> grpCodeList = codeService.selectGrpCodeList(paramMap);
		
		int rows = 10;
		int totalCount = grpCodeList.size();
		int total_page = totalCount / rows;
		if(totalCount % rows > 0) total_page++;
		
		map.put("TOTAL", totalCount);
		map.put("TOTAL_PAGE", total_page);
		map.put("grpCodeList", grpCodeList);
		return map;
	}
	
	/**
	 * 일반코드 조회 - 화면조회 호출
	 * @return
	 */
	@RequestMapping(value = "/admin/system/openCodeList")
	public ModelAndView openCodeList(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		List<Map<String, String>> codeList = codeService.selectCodeList(paramMap);
		List<Map<String, String>> grpCodeList = codeService.selectGrpCodeList(paramMap);
			
		mv.addObject("codeList",codeList);
		mv.addObject("grpCodeList",grpCodeList);
		mv.setViewName("/admin/system/code/codeList.tiles");
		
		return mv;
	}
	

	/**
	 * 일반코드 조회 - ajax 호출
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value="/admin/system/selectCodeList", produces = {"application/json"})
	public Map<String, Object> selectCodeList(@RequestParam Map<String, String> paramMap) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Map<String, String>> codeList = codeService.selectCodeList(paramMap);	
		
		int rows = 10;
		int totalCount = codeList.size();
		int total_page = totalCount / rows;
		if(totalCount % rows > 0) total_page++;
		
		map.put("TOTAL", totalCount);
		map.put("TOTAL_PAGE", total_page);
		map.put("codeList", codeList);
		map.put("grp_cd",paramMap.get("grp_cd"));
		
		return map;
	}
	
	/**
	 * 일반코드 작성화면
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/code/writeCodePop")
	public ModelAndView writeCodePop(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("codeInfo",paramMap);
		mv.setViewName("/admin/system/code/writeCodePop");
		
		return mv;
	}
	
	/**
	 * 일반코드 상세보기
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/code/viewCodePop")
	public ModelAndView viewCodePop(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		Map<String, String> codeInfo =  codeService.selectCode(paramMap);
		
		mv.addObject("codeInfo",codeInfo);
		mv.setViewName("/admin/system/code/viewCodePop");
		
		return mv;
	}
	

	/**
	 * 일반코드 추가
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value="/admin/system/code/insertCode", produces = {"application/json"})
	public Map<String, Object> insertCode(@RequestParam Map<String, String> paramMap) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		codeService.insertCode(paramMap);
		
		List<Map<String, String>> codeList = codeService.selectCodeList(paramMap);
			
		map.put("codeList",codeList);
		map.put("grp_cd",paramMap.get("grp_cd"));
		
		return map;
	}
	
	
	/**
	 * 일반코드 수정
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value="/admin/system/code/updateCode", produces = {"application/json"})
	public ModelAndView updateCode(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		codeService.updateCode(paramMap);
		
		List<Map<String, String>> codeList = codeService.selectCodeList(paramMap);
			
		mv.addObject("codeList",codeList);		
		return mv;
	}
	
	/**
	 * 그룹코드 상세보기
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/code/viewGrpCodePop")
	public ModelAndView viewGrpCodePop(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		Map<String, String> codeInfo =  codeService.selectGrpCode(paramMap);
		
		mv.addObject("codeInfo",codeInfo);
		mv.setViewName("/admin/system/code/viewGrpCodePop");
		
		return mv;
	}
	
	/**
	 * 그룹코드 작성화면 이동
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value = "/admin/system/code/writeGrpCodePop")
	public ModelAndView writeGrpCodePop(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		String grp_cd = paramMap.get("grp_cd");
		paramMap.put("grp_cd", "CODE_TYPE");
		List<Map<String, String>> codeType = codeService.selectCodeList(paramMap);
		paramMap.put("grp_cd", grp_cd);
		
		mv.addObject("sys_type", codeType);
		mv.addObject("codeInfo",paramMap);
		mv.setViewName("/admin/system/code/writeGrpCodePop");
		
		return mv;
	}
	
	/**
	 * 그룹코드 수정
	 * @param paramMap
	 * @return
	 */
	@RequestMapping(value="/admin/system/code/updateGrpCode", produces = {"application/json"})
	public ModelAndView updateGrpCode(@RequestParam Map<String, String> paramMap){
		ModelAndView mv = new ModelAndView();
		
		codeService.updateGrpCode(paramMap);
		
		List<Map<String, String>> grpCodeList = codeService.selectGrpCodeList(paramMap);
			
		mv.addObject("grpCodeList",grpCodeList);
		
		return mv;
	}
	
}
