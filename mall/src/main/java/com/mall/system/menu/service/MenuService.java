package com.mall.system.menu.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.mall.common.util.StringUtil;
import com.mall.system.menu.dao.MenuDao;

@Service
public class MenuService {

	@Resource
	private MenuDao menuDao;
	
	/**
	 * 메뉴조회(메뉴아이디)
	 * @param paramMap[menu_Id]
	 * @return
	 */
	public Map<String, Object> selectMenuByMenuId(Map<String, String> paramMap){
		
		return menuDao.selectMenuByMenuId(paramMap);
	}
	
	/**
	 * 메뉴조회(전체)
	 * @return
	 */
	public List<Map<String, Object>> selectMenuList(String menuType){
		
		return menuDao.selectMenuList(menuType);
	}

	/**
	 * 메뉴트리 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> selectMenuTree(Map<String, String> paramMap){
		
		return menuDao.selectMenuTree(paramMap);
	}
	
	/**
	 * 메뉴 추가
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void insertMenu(Map<String, String> paramMap){
		
		paramMap.put("table_id", "ptl_menu");
		paramMap.put("ref_id", paramMap.get("menu_id"));
		paramMap.put("name", paramMap.get("menu_name"));
		
		Map<String, Object> upMenuTree = menuDao.selectUpMenuTree(paramMap);
		String newSeq = (Integer.parseInt(upMenuTree.get("cnt").toString())+1)+"";
		String new_tree_id = "";
		if("*".equals(upMenuTree.get("tree_id").toString())){
			 new_tree_id = paramMap.get("menu_id") +"_"+StringUtil.leftPad(newSeq, 5,"0");
		}else{
			 new_tree_id = upMenuTree.get("tree_id").toString()+"_"+StringUtil.leftPad(newSeq, 5,"0");
		}
		
		paramMap.put("tree_id",new_tree_id);
		paramMap.put("up_tree_id", upMenuTree.get("tree_id").toString());
		menuDao.insertMenuResource(paramMap);
		menuDao.insertMenu(paramMap);
	}
	
	
	/**
	 * 메뉴수정
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void updateMenu(Map<String, String> paramMap){
		
		paramMap.put("table_id", "ptl_menu");
		paramMap.put("ref_id", paramMap.get("menu_id"));
		paramMap.put("name", paramMap.get("menu_name"));
		
		menuDao.updateMenu(paramMap);
		menuDao.updateMenuResource(paramMap);
		
	}
	
	/**
	 * 메뉴삭제
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void deleteMenu(Map<String, String> paramMap){
		
		menuDao.deleteMenuResource(paramMap);
		menuDao.deleteMenu(paramMap);
		
		
	}
	
}
