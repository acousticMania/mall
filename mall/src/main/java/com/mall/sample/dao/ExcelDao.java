package com.mall.sample.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class ExcelDao extends QueryMapper{

	private String namespace = "com.mall.excel.";
	
	/**
	 * board 입력하는 DML을 실행한다.
	 *
	 * @param the map
	 */
	public void insertBoard(Map<String, String> map) {
		this.insert(namespace + "insertExcelBoard", map);
	}

	/**
	 * board list 조회하는 DML을 실행한다.
	 *
	 * @return the list< map< string, string>>
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> selectBoardList() {
		return (List<Map<String, String>>)this.selectList(namespace + "selectBoardList");
	}


}
