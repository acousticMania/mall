package com.mall.admin.user.vo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.User;

/**
 * @설명			: UserDetail인터페이스만 상속받아 VO객체를 만들어도 상관없지만 User클래스를 이용하여 확장을 할 경우
 * 				  중복세션 방지등의 기능을 추가적으로 구현하지 않아도 적용시킬수 있어 User클래스를 직접 확장하는 방법 사용
 * @작성일		: 2017. 1. 10. 오전 10:18:56
 * @작성자		: Seo Myeongseok(sirosms@gmail.com)
 * @version 	: 12st.V1.0
 */

public class UserDetailsVO extends User{ 
	/**
	 * 버전에 대한 시리얼버전을 입력하리는 Warning Message처리
	 * general serial
	 */
	private static final long serialVersionUID =  SpringSecurityCoreVersion.SERIAL_VERSION_UID;;
	
	private String email;
	
	public UserDetailsVO(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		// TODO Auto-generated constructor stub
	}

	public UserDetailsVO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString() + "; Email:" + this.email;
	}
	
	
	
}
