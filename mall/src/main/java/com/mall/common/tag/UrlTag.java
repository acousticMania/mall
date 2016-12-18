package com.mall.common.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class UrlTag extends TagSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2820200472997558487L;
	
	private String value = "";
	
	public int doStartTag() throws JspException {
		JspWriter out = pageContext.getOut();
		
		String ctxPath = pageContext.getServletContext().getContextPath();
			
		try {
			out.print(ctxPath + value);
		} catch (IOException e) {
			throw new JspException(e.getMessage());
		}
		
		return SKIP_BODY; // no body processing
	}

	// Releases any resources we may have (or inherit)
    public void release() {
    	super.release();
    	
    	value = "";
    }

	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
	
}
