package com.mall.bbs.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.mall.bbs.dao.BbsDao;
import com.mall.bbs.vo.BbsVo;

@Controller(value = "bbsController")
public class BbsController {
    private static final Logger logger = LoggerFactory.getLogger(BbsController.class);

    // Resource 어노테이션을 이용하여 BbsDao 선언.
    @Resource(name = "bbsDao")
    private BbsDao bbsDao;

    // 게시판 목록
    @RequestMapping(value = "/retrieveBoardList", method = RequestMethod.GET)
    public String dispBbsList(Model model) {
        List<BbsVo> list = this.bbsDao.getSelect();
        model.addAttribute("list", list);

        return "/board/bbsList.tiles";
    }
      
    // PathVariable 어노테이션을 이용하여 RESTful 방식 적용
    // bbs/1 -> id = 게시물 번호
    // @ReuqstParam(value = "bbsVo", required = false, defaultValue = "0")
    @RequestMapping("/{idx}")
    public String dispBbsView(@PathVariable int idx, Model model) {
        logger.info("view idx = {}", idx);
        BbsVo object = this.bbsDao.getSelectOne(idx);

        model.addAttribute("object", object);
        return "/board/bbsView.tiles";
    }

    // 게시판 쓰기
    @RequestMapping(value = "/retrieveBoardWrite", method = RequestMethod.GET)
    public String dispBbsWrite(@RequestParam(value="idx", defaultValue="0") int idx, Model model) {
        logger.info("write");

        if (idx > 0) {
            BbsVo object = this.bbsDao.getSelectOne(idx);
            model.addAttribute("object", object);
        }

        return "/board/bbsWrite.tiles";
    }

    @RequestMapping(value = "/write_ok", method = RequestMethod.POST)
    public String procBbsWrite(@ModelAttribute("bbsVo") BbsVo bbsVo, RedirectAttributes redirectAttributes) {
        Integer idx = bbsVo.getIdx();
        
        if (idx == null || idx == 0) {
            try {
              this.bbsDao.insert(bbsVo);
            } catch (Exception e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
            }
            redirectAttributes.addFlashAttribute("message", "추가되었습니다.");
            return "redirect:/retrieveBoardList";
        } else {
            try {
              this.bbsDao.update(bbsVo);
            } catch (Exception e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
            }
            redirectAttributes.addFlashAttribute("message", "수정되었습니다.");
            return "redirect:/retrieveBoardWrite?idx=" + idx;
        }
    }

    @RequestMapping(value = "/retrieveBoardDelete", method = RequestMethod.POST)
    public String procBbsDelete(@RequestParam(value = "idx", required = false) int idx) {
        try {
          this.bbsDao.delete(idx);
        } catch (Exception e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
        return "redirect:/retrieveBoardList";
    }

}