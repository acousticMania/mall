
package com.mall.admin.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mall.admin.user.service.UserService;


/**
 * @설명			: 회원관리 
 * @작성일		: 2017. 1. 10. 오전 10:26:54
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

@Controller
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Resource
	private UserService userService;
	
	@RequestMapping(value = "/admin/member/member", method = RequestMethod.GET)
	public String member(Locale locale, Model model) {
	    logger.info("Welcome home! The client locale is {}.", locale);
	        
	    return "/admin/member/member.tiles";
	}
	
	
	@RequestMapping(value = "/admin/member/extjsMember", method = RequestMethod.GET)
	public String extjsMember(Locale locale, Model model) {
	    logger.info("Welcome home! The client locale is {}.", locale);
	        
	    return "/admin/member/extjsMember.tiles";
	}
	
	@RequestMapping(value = "/admin/extTest", method = RequestMethod.GET)
	public String extTest(Locale locale, Model model) {
	    logger.info("Welcome home! The client locale is {}.", locale);
	        
	    return "/admin/member/userTreeMain";
	}
	
	@RequestMapping(value = "/member/server3_select", method = RequestMethod.GET)
	public String getTreeData( Model model,HttpServletRequest request , HttpServletResponse response) throws IOException {
		//model.asMap();
		String node = request.getParameter("node");
		JSONObject jsonObj = new JSONObject(); 
		JSONObject jsonObj2 = null; 
		JSONArray jsonArr= new JSONArray(); 
		List<Map<String, Object>> userList =  userService.selectUserAll();
		//node는 서버에서받은 root의 id값이다. 
		if(node.equals("0")) { //임의의 자식노드 json객체 생성후 json array에 답는다. 
			for(int i=0; i<userList.size();i++) { 
				jsonObj2 = new JSONObject(); 
				jsonObj2.put("text",userList.get(i).get("EMAIL")); 
				jsonObj2.put("result",jsonObj2.toJSONString(userList.get(i)));
				jsonObj2.put("id",userList.get(i).get("USER_ID"));
				jsonObj2.put("leaf",true); 
				jsonObj2.put("expanded",false);
				jsonArr.add(jsonObj2); 
			} //꼭 children이 아니여도 된다. children으로 준 이유는 proxy -> reader -> root값을 children으로 주었기때문 //proxy -> reader -> root 값을 하단 key값과 맞춰만 주면 된다. 
			jsonObj.put("children", jsonArr); 
		}
		
		PrintWriter pw = response.getWriter(); 
		System.out.println(jsonObj.toString()); 
		pw.print(jsonObj);
		pw.flush(); 
		pw.close();

		model.addAllAttributes(jsonObj);
	        
	    return "/admin/member/userTreeMain";
	}
	
	
}
