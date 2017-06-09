package com.mall.admin.goods.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.admin.goods.dao.GoodsDao;

/**
 * Goods 관련 처리하는 서비스 Class입니다.
 *
 * @author Seo Myeongseok(sirosms@gmail.com)
 * @date 2017. 6. 9 오전 5:18:53
 */
@Service
public class GoodsService {
	
	/** The goods dao. */
	@Resource
	private GoodsDao goodsDao;
	
	/**
	 * goods list 조회를 요청한다.
	 *
	 * @return the list< map< string, string>>
	 */
	public List<Map<String, String>> selectGoodsList() {
		return goodsDao.selectGoodsList();
	}

	/**
	 * goods grp list 조회를 요청한다.
	 *
	 * @param parentGdGrpId
	 *            the parent gd grp id
	 * @return the list< map< string, string>>
	 */
	public List<Map<String, String>> selectGoodsGrpList(String parentGdGrpId) {
		return goodsDao.selectGoodsGrpList(parentGdGrpId);
	}

	
	
}
