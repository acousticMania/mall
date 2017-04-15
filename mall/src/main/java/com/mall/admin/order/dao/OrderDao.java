package com.mall.admin.order.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.mall.common.util.QueryMapper;

@Repository
public class OrderDao extends QueryMapper {
	
	private String namespace = "com.mall.admin.order.";
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectOrderList(Map<String, Object> map) {
		return (List<Map<String, Object>>) selectPagingList(namespace + "selectOrderList", map);
	}
	
	public int selectOrderTotalCount(Map<String, Object> map) {
		return (Integer) selectOne(namespace + "selectOrderTotalCount", map);
	}

	public void insertOrder(Map<String, Object> map) {
		insert(namespace + "insertOrder", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, String> selectOrderDetail(Map<String, String> map) throws Exception {
		return (Map<String, String>) selectOne(namespace + "selectOrderDetail", map);
	}

	public void updateOrder(Map<String, Object> map) {
		update(namespace + "updateOrder", map);
	}

	public void deleteOrder(Map<String, String> map) {
		delete(namespace + "deleteOrder", map);
	}

}
