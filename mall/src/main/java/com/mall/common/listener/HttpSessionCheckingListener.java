
package com.mall.common.listener;

import java.util.Date;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpSessionCheckingListener implements HttpSessionListener{
	
	private static final Logger logger = LoggerFactory.getLogger(HttpSessionCheckingListener.class);
	
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		if(logger.isDebugEnabled()) {
			 logger.debug("Session ID".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
		}
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		if(logger.isDebugEnabled()) {
			logger.debug("Session ID".concat(event.getSession().getId()).concat(" destroyed at ").concat(new Date().toString()));
		}
	}
	
}
