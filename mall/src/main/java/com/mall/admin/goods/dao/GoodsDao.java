package com.mall.admin.goods.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

/**
 * Goods 관련된 데이타를 처리하는 DAO Class입니다.
 *
 * @author Seo Myeongseok(sirosms@gmail.com)
 * @date 2017. 6. 9 오전 5:19:05
 */
@Repository
public class GoodsDao extends QueryMapper {

	/** The namespace. */
	private String namespace = "com.mall.admin.goods.GoodsDao.";
	
	/**
	 * goods list 조회하는 DML을 실행한다.
	 *
	 * @return the list< map< string, string>>
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> selectGoodsList() {
		return selectList(namespace + "selectGoodsList");
	}


	/**
	 * goods grp list 조회하는 DML을 실행한다.
	 *
	 * @param parentGdGrpId
	 *            the parent gd grp id
	 * @return the list< map< string, string>>
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> selectGoodsGrpList(String parentGdGrpId) {
		return selectList(namespace + "selectGoodsGrpList", parentGdGrpId);
	}

}
