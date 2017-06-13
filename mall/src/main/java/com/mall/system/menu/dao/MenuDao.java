package com.mall.system.menu.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class MenuDao extends QueryMapper{
	
	private String namespace = "com.mall.system.menu.dao.";
	
	public List<Map<String, Object>> selectMenuTree(Map<String, String> paramMap) {
		return (List<Map<String, Object>>)this.selectList(namespace + "selectMenuTree",paramMap);
	}
	
	public List<Map<String, Object>> selectMenuList(String menuType) {
		return (List<Map<String, Object>>)this.selectList(namespace + "selectMenuList",menuType);
	}
	
	public Map<String, Object> selectUpMenuTree(Map<String, String>paramMap) {
		return (Map<String, Object>)this.selectOne(namespace + "selectUpMenuTree" ,paramMap);
	}
	
	public void insertMenu(Map<String, String> paramMap) {
		this.insert(namespace + "insertMenu",paramMap);
	}
	
	public void insertMenuResource(Map<String, String> paramMap) {
		this.insert(namespace + "insertMenuResource",paramMap);
	}
	
	public void updateMenuResource(Map<String, String> paramMap) {
		this.insert(namespace + "updateMenuResource",paramMap);
	}
	
	public void updateMenu(Map<String, String> paramMap) {
		this.insert(namespace + "updateMenu",paramMap);
	}
	
	public Map<String, Object> selectMenuByMenuId(Map<String, String>paramMap) {
		return (Map<String, Object>)this.selectOne(namespace + "selectMenuByMenuId" ,paramMap);
	}
	
	public void deleteMenu(Map<String, String>paramMap) {
		this.delete(namespace + "deleteMenu" ,paramMap);
	}
	
	public void deleteMenuResource(Map<String, String>paramMap) {
		this.delete(namespace + "deleteMenuResource" ,paramMap);
	}
	
}
