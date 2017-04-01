
package com.mall.common.spring.framework.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

public class DaoException {

	@ExceptionHandler(DataAccessException.class)
    public ModelAndView dataAccessExceptionHandler(DataAccessException e) {
        return new ModelAndView("dataexception").addObject("msg", e.getMessage());
    }
}
