
package com.mall.common.util;

import java.util.UUID;

public class CommonUtil {
	 
	/**
	 * @설명 			: 32글자의 랜덤한 문자열(숫자포함)을 만들어서 반환해준다. 
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 24. 오후 2:06:39
	 * @Method Name		: getRandomString
	 * @return
	 */
	public static String getRandomString() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}
