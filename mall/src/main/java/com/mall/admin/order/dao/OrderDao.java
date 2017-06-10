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
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectOrderSearchList(Map<String, Object> map) {
		return (List<Map<String, Object>>) selectPagingList(namespace + "selectOrderSearchList", map);
	}
	
	public int selectOrderTotalCount(Map<String, Object> map) {
		return (Integer) selectOne(namespace + "selectOrderTotalCount", map);
	}

	public void insertOrder(Map<String, Object> map) {
		insert(namespace + "insertOrder", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectOrderDetail(Map<String, Object> map) throws Exception {
		return (Map<String, Object>) selectOne(namespace + "selectOrderDetail", map);
	}

	public void updateOrder(Map<String, Object> map) {
		update(namespace + "updateOrder", map);
	}

	public void deleteOrder(Map<String, String> map) {
		delete(namespace + "deleteOrder", map);
	}

	public int updateOrderStatus(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int cnt = 0;
		try{
			update(namespace + "updateOrderStatus", map);
			cnt++;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return cnt;
	}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectGoodsList(Map<String, Object> map) {
		return (List<Map<String, Object>>) selectList(namespace + "selectGoodsList", map);
	}

}
