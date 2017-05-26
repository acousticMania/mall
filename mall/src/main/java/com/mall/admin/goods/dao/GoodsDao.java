package com.mall.admin.goods.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class GoodsDao extends QueryMapper {

	private String namespace = "com.mall.admin.goods.GoodsDao.";
	
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> selectGoodsList() {
		return selectList(namespace + "selectGoodsList");
	}

}
