package com.mall.common.util;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.mall.sample.controller.SampleController;

public class QueryMapper {
	private static final Logger logger = LoggerFactory.getLogger(QueryMapper.class);
	
	@Autowired
    protected SqlSessionTemplate sqlSessionTemplate;
     
    protected void printQueryId(String queryId) {
        if(logger.isInfoEnabled()){
        	logger.info("\t QueryId  \t:  " + queryId);
        } else {
        	logger.debug("\t QueryId  \t:  " + queryId);
        }
    }
     
    public Object insert(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionTemplate.insert(queryId, params);
    }
     
    public Object update(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionTemplate.update(queryId, params);
    }
     
    public Object delete(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionTemplate.delete(queryId, params);
    }
     
    public Object selectOne(String queryId){
        printQueryId(queryId);
        return sqlSessionTemplate.selectOne(queryId);
    }
     
    public Object selectOne(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionTemplate.selectOne(queryId, params);
    }
     
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId){
        printQueryId(queryId);
        return sqlSessionTemplate.selectList(queryId);
    }
     
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionTemplate.selectList(queryId,params);
    }
    
    @SuppressWarnings("unchecked")
	public Object selectPagingList(String queryId, Object params) {
		printQueryId(queryId);
		Map<String, Object> map = (Map<String, Object>) params;
		
		//현재페이지셋팅?
		String strPageIndex = (String) map.get("PAGE_INDEX");
		String strpageRow = (String) map.get("PAGE_ROW");
		int nPageIndex = 0;
		int nPageRow = 20;
		
		if(StringUtils.isEmpty(strPageIndex) == false) {
			nPageIndex = Integer.parseInt(strPageIndex)-1;
		}
		if(StringUtils.isEmpty(strpageRow) == false) {
			nPageRow = Integer.parseInt(strpageRow);
		}
		map.put("START", (nPageIndex * nPageRow) + 1);
		map.put("END", (nPageIndex * nPageRow) + nPageRow);
		
		return sqlSessionTemplate.selectList(queryId, map);
	}
}
