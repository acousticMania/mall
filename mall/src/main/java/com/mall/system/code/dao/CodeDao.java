package com.mall.system.code.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class CodeDao extends QueryMapper{

	private String namespace = "com.mall.sys.code.dao.";
	
	public List<Map<String, String>> selectGrpCodeList(Map<String, String> paramMap) {
		return (List<Map<String, String>>)this.selectList(namespace + "selectGrpCodeList", paramMap);
	}
	
	public List<Map<String, String>> selectCodeList(Map<String, String> paramMap) {
		return (List<Map<String, String>>)this.selectList(namespace + "selectCodeList", paramMap);
	}
	
	public Map<String, String> selectGrpCode(Map<String, String> paramMap) {
		return (Map<String, String>)this.selectOne(namespace + "selectGrpCode", paramMap);
	}
	
	public Map<String, String> selectCode(Map<String, String> paramMap) {
		return (Map<String, String>)this.selectOne(namespace + "selectCode", paramMap);
	}
	
	public void insertGrpCode(Map<String, String> paramMap) {
		this.insert(namespace + "insertGrpCode", paramMap);
	}
	
	public void insertCodeResource(Map<String, String> paramMap) {
		this.insert(namespace + "insertCodeResource", paramMap);
	}
	
	public void insertCode(Map<String, String> paramMap) {
		this.insert(namespace + "insertCode", paramMap);
	}
	
	public void editCode(Map<String, String> paramMap) {
		this.insert(namespace + "editCode", paramMap);
	}
	
	public void editGrpCode(Map<String, String> paramMap) {
		this.insert(namespace + "editGrpCode", paramMap);
	}
	
	public void editCodeResource(Map<String, String> paramMap) {
		this.insert(namespace + "editCodeResource", paramMap);
	}
	
}
