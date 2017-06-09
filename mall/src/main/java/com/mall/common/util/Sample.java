
package com.mall.common.util;

import javax.annotation.Resource;

import com.mall.common.spring.security.service.ShaEncoder;
import com.mall.common.util.crypto.Hash;

import sun.misc.BASE64Encoder;

/**
 * @설명			: java Test Class 추후 Junit으로 변경 예정  
 * @작성일		: 2016. 12. 14. 오후 8:53:19
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */

public class Sample {
	
	@Resource
	private static ShaEncoder encoder;
	
	public static void main(String[] arg) {
		//재귀함수 테스트
//		int a = test(0);
//		System.out.println(a);
		
//		ShaEncoder encoder = new ShaEncoder();
		
		String password = "admin";
		
		password = encoder.encoding(password);
		
//		password = new BASE64Encoder().encode(Hash.getSHA256(password));
		System.out.println(password);
		
		
		
	}
	
	
	// 재귀호출
	public static int test(int a) {
		System.out.println("a : " + a);
		
		if(a==10) {
			return a;
		}
		
		int b = test(a+1);
		System.out.println("b : " + b);

		return b;
	}

}
