package com.mall.admin.goods.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.goods.dao.GoodsDao;

@Service
public class GoodsService {
	
	@Resource
	private GoodsDao goodsDao;
	
	public List<Map<String, String>> selectGoodsList() {
		return goodsDao.selectGoodsList();
	}

	
	
}
