package com.mall.sample.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.mall.sample.service.ExcelService;

/**
 * @설명			: 엑셀 업로드 다운로드 
 * @작성일		: 2016. 11. 19. 오후 3:56:15
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */

@Controller
public class ExcelController {
	
//	private static final Logger logger = LoggerFactory.getLogger(ExcelController.class);
	
	@Resource
	ExcelService excelService;
	
	
	/**
	 * @설명 			: 엑셀파일 업로드
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 3:56:31
	 * @Method Name		: excelFileUpload
	 * @param request
	 * @return tilesView
	 */
	@RequestMapping(value="/sample/excelFileUpload", method=RequestMethod.POST)
	public ModelAndView excelFileUpload(MultipartHttpServletRequest request) {
		MultipartFile excelFile = request.getFile("file");
		//파일패스
//		Set pathSet = request.getSession().getServletContext().getResourcePaths("/");
//		String filePath = request.getSession().getServletContext().getRealPath("");
//		logger.debug("@@@@@@@@@pathSet" + pathSet);
		
		if(excelFile==null || excelFile.isEmpty()) {
			throw new RuntimeException("엑셀파일을 선택해주세요");
		}
		
		ModelAndView mv = new ModelAndView();
		
		excelService.excelFileUpload(excelFile);
		
		mv.setViewName("redirect:/sample/openBoardList");
		
		return mv;
	}
	
	/**
	 * @설명 			: 엑셀다운로드 restful
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:20:26
	 * @Method Name		: excelFileDownload
	 * @return
	 */
	@RequestMapping("/download")
	public void download(Model model) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		list = excelService.excelFileDownload();
		model.addAttribute("list", list);
	}
	
	
	
	/**
	 * @설명 			: restful을 이용하지않을경우 header에 지정 
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 12. 4. 오후 11:12:25
	 * @Method Name		: excelFileDownload
	 * @param model
	 * @return
	 */
	/*@RequestMapping(value="/excelView", produces = {"application/vnd.ms-excel", "application/json"})
	public List<Map<String, String>> excelFileDownload(Model model) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		
		list = excelService.excelFileDownload();
		
		model.addAttribute("list", list);
		
		return list;
	}*/
	
	
	@RequestMapping("/pdfFileDownload")
	public ModelAndView pdfFileDownload() {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		
		list = excelService.excelFileDownload();
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("list", list);
		mv.setViewName("pdfView");
		
		return mv;
	}
}
