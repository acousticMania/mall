package com.mall.admin.order.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mall.admin.order.dao.OrderDao;

@Service
public class OrderService {

	private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
	
	@Resource
	private OrderDao orderDao;

	public List<Map<String, Object>> selectOrderList(Map<String, Object> map) {
		return orderDao.selectOrderList(map);
	}
	
	public int selectOrderTotalCount(Map<String, Object> map) {
		return orderDao.selectOrderTotalCount(map);
	}
	
	
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void insertOrder(Map<String, Object> map, HttpServletRequest request) {
		orderDao.insertOrder(map);
	}
	
	public Map<String, Object> selectOrderDetail(Map<String, String> map) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, String> tempMap = orderDao.selectOrderDetail(map);
		resultMap.put("map", tempMap);
		return resultMap;
	}
	
	@Transactional(rollbackFor=Exception.class, propagation=Propagation.REQUIRED)
	public void updateOrder(Map<String, Object> map, HttpServletRequest request) {
		orderDao.updateOrder(map);
	}

	public void deleteOrder(Map<String, String> map) {
		orderDao.deleteOrder(map);
	}

	public int updateOrderStatus(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return orderDao.updateOrderStatus(map);
	}
	
}
