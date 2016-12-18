
package com.mall.admin.goods.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class GoodsController {
	
	private static final Logger logger = LoggerFactory.getLogger(GoodsController.class);
	
	@RequestMapping(value = "/admin/goods/catalog", method = RequestMethod.GET)
	public String catalog(Locale locale, Model model) {
    logger.info("Welcome home! The client locale is {}.", locale);
        
    return "/admin/goods/catalog.tiles";
	}
}
