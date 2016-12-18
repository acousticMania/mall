package com.mall.bbs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mall.bbs.dao.BbsDao;
import com.mall.bbs.vo.BbsVo;

@Controller(value = "ngbbsController")
public class NgbbsController {
//  private static final Logger logger = LoggerFactory.getLogger(NgbbsController.class);
  
//Resource 어노테이션을 이용하여 BbsDao 선언.
  @Resource(name = "bbsDao")
  private BbsDao bbsDao;

  // 게시판 목록
  @RequestMapping(value = "/retrieveNgBoardList", method = RequestMethod.GET)
  public String dispNgBbsList(Model model) {
      //List<BbsVo> list = this.bbsDao.getSelect();
      //model.addAttribute("list", list);
	  
      return "/board/ngBbsList.tiles";
  }
  
  @RequestMapping("/getList")
  public @ResponseBody Map<String , Object> getListByMap() {
    Map<String, Object> jsonObject = new HashMap<String, Object>();
    List<BbsVo> list = this.bbsDao.getSelect();
    
    jsonObject.put("list", list);
         
    return jsonObject; 
  }
  

  @RequestMapping("/getDetail")
  public @ResponseBody Map<String , Object> getDetailByMap() {
    Map<String, Object> jsonObject = new HashMap<String, Object>();
    //List<BbsVo> detail = this.bbsDao.getSelectOne(idx);
    
//    jsonObject.put("detail", detail);
         
    return jsonObject; 
  }
}
