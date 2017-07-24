package com.mall.system.code.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mall.system.code.dao.CodeDao;

@Service
public class CodeService {

	@Resource
	private CodeDao codeDao;
	
	/**
	 * 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, String>> selectGrpCodeList(Map<String, String> paramMap){
		
		if(paramMap.get("searchKeyword")==null){
			paramMap.put("searchKeyword", "");
		}
		
		if(paramMap.get("searchTrg")==null){
			paramMap.put("searchTrg", "name");
		}
		
		return codeDao.selectGrpCodeList(paramMap);
		
	}
	
	/**
	 * 일반코드 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, String>> selectCodeList(Map<String, String> paramMap){
		
		return codeDao.selectCodeList(paramMap);
		
	}
	
	/**
	 * 그룹코드조회(단건)
	 * @param paramMap
	 * @return
	 */
	public Map<String, String> selectGrpCode(Map<String, String> paramMap){
		
		return codeDao.selectGrpCode(paramMap);
		
	}
	
	/**
	 * 일반코드 조회(단건)
	 * @param paramMap
	 * @return
	 */
	public Map<String, String> selectCode(Map<String, String> paramMap){
		
		return codeDao.selectCode(paramMap);
		
	}
	
	/**
	 * 그룹코드 추가
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void insertGrpCode(Map<String, String> paramMap){
		
		paramMap.put("table_id", "cmm_grp_code");
		paramMap.put("ref_id", paramMap.get("grp_cd"));
		paramMap.put("name", paramMap.get("grp_cd_nm"));
		
		codeDao.insertGrpCode(paramMap);
		codeDao.insertCodeResource(paramMap);
		
	}
	
	/**
	 * 일반코드 추가
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void insertCode(Map<String, String> paramMap){
		
		String cd_sys_id = paramMap.get("grp_cd")+"_"+paramMap.get("cd");
		
		paramMap.put("table_id", "cmm_code");
		paramMap.put("ref_id", cd_sys_id);
		paramMap.put("name", paramMap.get("cd_name"));
		paramMap.put("cd_sys_id", cd_sys_id);
		
		codeDao.insertCode(paramMap);
		codeDao.insertCodeResource(paramMap);
		
	}
	
	/**
	 * 일반코드 수정
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void updateCode(Map<String, String> paramMap){
		
		paramMap.put("table_id", "cmm_code");
		paramMap.put("ref_id", paramMap.get("cd_sys_id"));
		paramMap.put("name", paramMap.get("cd_name"));
		
		codeDao.updateCode(paramMap);
		codeDao.updateCodeResource(paramMap);
		
	}
	
	/**
	 * 그룹코드 수정
	 * @param paramMap
	 */
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void updateGrpCode(Map<String, String> paramMap){
		
		paramMap.put("table_id", "cmm_grp_code");
		paramMap.put("ref_id", paramMap.get("grp_cd"));
		paramMap.put("name", paramMap.get("grp_cd_nm"));
		
		codeDao.updateGrpCode(paramMap);
		codeDao.updateCodeResource(paramMap);
		
	}
}
