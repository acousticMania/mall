
package com.mall.common.util;

import java.net.URLEncoder;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.Iterator;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;




/**
 * StringUtil Class 입니다.
 *
 * @author Seo Myeongseok(sirosms@gmail.com)
 * @date 2017. 5. 18 오후 7:51:02
 */
public class StringUtil extends StringUtils {
	/** Alpha. */
	private static String Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	/** Num. */
	private static String Num = "0123456789";
	/** AlphaNum. */
	private static String AlphaNum = Alpha + Num;
	/** Constant ALPHA_NUM_CHAR_ARR. */
	public static final char[] ALPHA_NUM_CHAR_ARR = AlphaNum.toCharArray();
	/** Constant 구분자. */
	public static final String[] ARR_SEP = {",", "|", "▒", "▤", "▩", "＾", "｜", "＆"};
	
	/**
	 * 조건 검색어의 특수문자를 변환/제거 처리한다.
	 *
	 * @param query String
	 * @return the string
	 */
	public static String escapeQueryText(String query) {
		return escapeQueryText(query, null);
	}

	/**
	 * 조건 검색어의 특수문자를 변환/제거 처리한다.
	 *
	 * @param query String
	 * @param replacement String
	 * @return the string
	 */
	public static String escapeQueryText(String query, String replacement) {
		if (query == null || query.equals("")) {
			if (replacement != null) {
				return replacement;
			} else {
				return query;
			}
		}

		return query.replaceAll("\"", "").replaceAll("'", "");
	}

	/**
	 * 문자열을 분리자를 기준으로 분리하여 String 배열로 반환한다.
	 *
	 * @param str 문자열
	 * @param dilim 분리자
	 * @return the string[]
	 */
	public static String[] split(String str, String dilim) {
		StringTokenizer st = new StringTokenizer(str, dilim);
		String[] list = new String[st.countTokens()];
		int i = 0;
		while (st.hasMoreElements()) {
			list[i] = st.nextToken();
			i++;
		}

		return list;
	}


	/**
	 * 대상문자열(strTarget)에서 지정문자열(strSearch)이 검색된 횟수를, 지정문자열이 없으면 0 을 반환한다.
	 *
	 * @param strTarget
	 *            대상문자열
	 * @param strSearch
	 *            검색할 문자열
	 * @return 지정문자열이 검색되었으면 검색된 횟수를, 검색되지 않았으면 0 을 반환한다.
	 */
	public static int search(String strTarget, String strSearch) {
		int result = 0;
		String strCheck = new String(strTarget);
		for (int i = 0; i < strTarget.length();) {
			int loc = strCheck.indexOf(strSearch);
			if (loc == -1) {
				break;
			} else {
				result++;
				i = loc + strSearch.length();
				strCheck = strCheck.substring(i);
			}
		}
		return result;
	}


	/**
	 * 주어진 문자열이 null 또는 공백문자열("") 인지를 체크한다.
	 *
	 * @param str
	 *            문자열
	 * @return 주어진 문자열이 null 또는 공백문자열("") 또는 "null" 이라면 공백문자열("")을 반환하고 그렇지 않다면 주어진 문자열을
	 *         반환한다.
	 */
	public static String nullToString(String str) {
		return nullToString(str, "");
	}

	/**
	 * 주어진 문자열(regex)이 null 또는 공백문자열("") 인지를 체크한다.
	 *
	 * @param regex
	 *            원본 문자열
	 * @param replacement
	 *            대치할 문자열
	 * @return 원본 문자열이 null 또는 공백문자열("") 또는 "null" 이라면 대치할 문자열을 반환하고 그렇지 않다면 원본 문자열을 반환한다.
	 */
	public static String nullToString(String regex, String replacement) {
		if (regex == null || "".equals(regex) || "null".equals(regex)) {
			return replacement;
		}
		return regex;
	}


	/**
	 * 주어진 문자열중 일부 문자열을 새로운 문자열로 변환하여 반환한다.
	 *
	 * @param original
	 *            원본 문자열
	 * @param pattern
	 *            변환되어야 하는 문자열
	 * @param replace
	 *            대치할 문자열
	 * @return 원본 문자열에서 변환되어야 하는 문자열을 대치할 문자열로 대치하여 반환한다.
	 */
	public static String replace(String original, String pattern, String replace) {
		int s = 0;
		int e = 0;
		StringBuffer buffer = new StringBuffer();

		while ((e = original.indexOf(pattern, s)) >= 0) {
			buffer.append(original.substring(s, e));
			buffer.append(replace);
			s = e + pattern.length();
		}
		buffer.append(original.substring(s));

		return buffer.toString();
	}

	/**
	 * 주어진 문자열의 길이를 조정한다.
	 *
	 * @param str
	 *            원본 문자열
	 * @param tail
	 *            원본 문자열의 길이를 조정한후 뒤에 따라붙을 문자열
	 * @param start
	 *            문자열의 길이를 조정할 시작 위치
	 * @param end
	 *            원본 문자열의 길이를 조정할 최대 사이즈
	 * @return String 원본 문자열의 길이가 size 보다 크다면 size 크기로 조정하고 tail 을 추가한 문자열을
	 *         반환한다. 만일 원본문자열의 길이가 size 보다 작다면 원본문자열을 그대로 반환한다.
	 */
	public static String substring(String str, String tail, int start, int end) {

		if (str == null) {
			return "";
		} else if (str.length() > end) {
			return str.substring(start, end) + tail;
		} else {
			return str;
		}
	}

	/**
	 * 주어진 문자열의 길이를 조정한다.
	 *
	 * @param str
	 *            원본 문자열
	 * @param tail
	 *            원본 문자열의 길이를 조정한후 뒤에 따라붙을 문자열
	 * @param size
	 *            원본 문자열의 길이를 조정할 최대 사이즈
	 * @return String 원본 문자열의 길이가 size 보다 크다면 size 크기로 조정하고 tail 을 추가한 문자열을
	 *         반환한다. 만일 원본문자열의 길이가 size 보다 작다면 원본문자열을 그대로 반환한다.
	 */
	public static String substring(String str, String tail, int size) {
		return substring(str, tail, 0, size);
	}




	/**
	 * 주어진 문자열을 숫자형 문자로 변환한다.
	 *
	 * @param value
	 *            변환할 문자열
	 * @return String 변환된 문자열 "1234.56" -> "1,234.56"
	 */
	public static String numberFormat(String value) {
		return numberFormat(value, -1, -1);
	}

	/**
	 * Number format.
	 *
	 * @param value int
	 * @return the string
	 */
	public static String numberFormat(int value) {
		return numberFormat(String.valueOf(value));
	}

	/**
	 * Number format.
	 *
	 * @param value long
	 * @return the string
	 */
	public static String numberFormat(long value) {
		return numberFormat(String.valueOf(value));
	}

	/**
	 * Number format.
	 *
	 * @param value double
	 * @return the string
	 */
	public static String numberFormat(double value) {
		return numberFormat(String.valueOf(value));
	}

	/**
	 * 주어진 문자열의 소수점 이하의 자릿수가 max보다 큰경우 반올림하고 min보다 작은경우 0을 추가한다. 기본적으로 max값은
	 * min값보다 크거나 같아야 한다.
	 *
	 * @param value
	 *            변환할 문자열
	 * @param max
	 *            소수점 이하 최대 자릿수로 주어진 값이 0보다 작다면 적용되지 않는다.
	 * @param min
	 *            소수점 이하 최소 자릿수로 주어진 값이 0보다 작다면 적용되지 않는다.
	 * @return String 변환된 문자열 <br>
	 *         str="1234.56", max=1, min=0 -> "1,234.6"<br>
	 *         str="1234.56", max=-1, min=3 -> "1,234.560"
	 */
	public static String numberFormat(String value, int max, int min) {
		String formatValue = "";
		try {
			NumberFormat nf = NumberFormat.getInstance();
			if (max >= 0) {
				nf.setMaximumFractionDigits(max);
			}

			if (min >= 0) {
				nf.setMinimumFractionDigits(min);
			}

			formatValue = nf.format(Double.parseDouble(value));
		} catch (IllegalArgumentException e) {
			formatValue = value;
		}

		return formatValue;
	}

	/**
	 * 주어진 문자열의 html태그를 특수문자로 변환한다.
	 *
	 * @param str
	 *            변환할 문자열
	 * @return String 변환된 문자열
	 */
	public static String charToHtml(String str) {
		String convert = "";

		if (str != null) {
			convert = replace(str, "<", "&lt;");
			convert = replace(convert, ">", "&gt;");
			convert = replace(convert, "\"", "&quot;");
			convert = replace(convert, "\'", "&#39;");
			convert = replace(convert, "&nbsp;", "&amp;nbsp;");
		}

		return convert;
	}

	/**
	 * 주어진 문자열의 특수문자를 html태그로 변환한다.
	 *
	 * @param str
	 *            변환할 문자열
	 * @return 변환된 문자열
	 */
	public static String htmlToChar(String str) {
		String convert = "";

		if (str != null) {
			convert = replace(str, "&lt;", "<");
			convert = replace(convert, "&gt;", ">");
			convert = replace(convert, "&quot;", "\"");
			convert = replace(convert, "&#39;", "\'");
			convert = replace(convert, "&amp;nbsp;", "&nbsp;");
		}

		return convert;
	}

	/**
	 * 주어진 컬렉션으로부터 구분자로 문자열을 연결하여 반환한다.
	 *
	 * @param collection 컬렉션
	 * @param separator 구분자
	 * @param allowEmpty 빈문자열인 연결 허용 여부 true면 빈문자열 도 연결하여 반환하고 false인 경우 빈 문자열을 제거한다.
	 * @return the string
	 */
	public static String join(Collection collection, String separator, boolean allowEmpty) {
		StringBuffer sb = new StringBuffer();

		if (collection == null) {
			return sb.toString();
		}

		if (collection.isEmpty()) {
			return sb.toString();
		}

		Iterator iter = collection.iterator();
		Object obj = null;
		String tmp = null;
		while (iter.hasNext()) {
			obj = iter.next();

			if (obj instanceof String) {
				tmp = (String) obj;
				if (allowEmpty) {
					sb.append(tmp).append(separator);
				} else if (tmp != null && !tmp.equals("")) {
					sb.append(tmp).append(separator);
				}
			}
		}

		if (sb.length() != 0) {
			return sb.substring(0, sb.lastIndexOf(separator));
		} else {
			return sb.toString();
		}

	}


	/**
	 * Escape html string.
	 *
	 * @param s String
	 * @return the string
	 */
	public static String escapeHtmlString(String s) {
		String s1 = s;
		if (s1 == null) {
			return null;
		}
		if (s1.indexOf('&', 0) != -1) {
			s1 = replace(s1, "&", "&amp;");
		}
		if (s1.indexOf('<', 0) != -1) {
			s1 = replace(s1, "<", "&lt;");
		}
		if (s1.indexOf('>', 0) != -1) {
			s1 = replace(s1, ">", "&gt;");
		}
		if (s1.indexOf('"', 0) != -1) {
			s1 = replace(s1, "\"", "&quot;");
		}
		return s1;
	}

	/**
	 * Re escape html string.
	 *
	 * @param s String
	 * @return the string
	 */
	public static String reEscapeHtmlString(String s) {
		String s1 = s;
		if (s1 == null) {
			return null;
		} else {
			String[] as = {"&amp;", "&lt;", "&gt;", "&quot;"};
			String[] as1 = {"&", "<", ">", "\""};
			return replace(s1, as, as1);
		}
	}

	/**
	 * Replace.
	 *
	 * @param s String
	 * @param as String[]
	 * @param as1 String[]
	 * @return the string
	 */
	private static String replace(String s, String[] as, String[] as1) {
		if (s == null || as == null || as1 == null) {
			return s;
		}
		for (int i = 0; i < as.length; i++) {
			s = replace(s, as[i], as1[i]);
		}

		return s;
	}
	/**
	 * <p>argument로 보낸 파라미터를 모두 합친 문자열을 리턴한다.</p>
	 * <p>MY_SQL의 CONCAT함수와 기능이 동일하다.</p>
	 * <p>JDK 1.5 이상에서 동작함</p>
	 * ex)
	 * <pre>
	 * StringUtil.concat('hello ', 'world');
	 * return) 'hello world'
	 *
	 * StringUtil.concat('h','e','l','l','o');
	 * return) 'hello'
	 * </pre>
	 * @param str String. 파라미터 갯수는 가변적이다.
	 * @return 파라미터가 합쳐진 문자열
	 */
	public static String concat(String ... str) {
		StringBuffer sb = new StringBuffer();
		for (String s : str) {
			sb.append(s);
		}
		return sb.toString();
	}
	/**
	 * random 문자열을 생성한다. (By Bae)
	 *
	 * @param len int
	 * @return the radom str
	 */
	public static String getRadomStr(int len)
	{
		String ret = "";
		if(len>0){
			Random rand = new Random();
			char[] randChar = new char[len];

			for(int i=0; i<len; i++){
				randChar[i] = ALPHA_NUM_CHAR_ARR[rand.nextInt(ALPHA_NUM_CHAR_ARR.length)];
			}
			ret = new String(randChar);
			randChar = null;
		}
		return ret;
	}
    /**
     * 문자열내에서 태그를 삭제하여 넘긴다.
     * 2008-10-24 : 주석삭제 추가(배근식)
     *
     * @param contents String
     * @return the tag removed str
     */
    public static String getTagRemovedStr(String contents){
    	if(isEmpty(contents)) return contents;
    	//return contents.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
    	return contents.replaceAll("(<(/)?([a-zA-Z]*[0-9]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>)|(<!--[^>](.*?)-->)", "");
    }

	/**
	 * deleteStyle.
	 *
	 * @param content String
	 * @return string
	 */
	public static String deleteStyle(String content){
		if(content==null) return "";
		return content.replaceAll("<STYLE>(.*)</STYLE>", "").replaceAll("&nbsp;", "");
	}
	
	/**
     * Gets the file size.
     *
     * @param byteSize long
     * @return the file size
     */
    public static String getFileSize(long byteSize){
    	double doubleSize = 0;
		String unit = "";
		if(byteSize < (1024*1024)){//KB
			doubleSize = byteSize/1024.0;
			unit = "KB";
		}else if(byteSize < (1024*1024*1024)){ //MB
			doubleSize = byteSize/1024.0/1024.0;
			unit = "MB";
		}else{ //GB
			doubleSize = byteSize/1024.0/1024.0/1024.0;
			unit = "GB";
		}
		return new java.math.BigDecimal(doubleSize).setScale(1,java.math.BigDecimal.ROUND_DOWN) + unit;
    }
    
    /**
	 * valid email인지 아닌지를 반환한다.
	 *
	 * @param email
	 *            the email
	 * @return valid email이면 true
	 */
    public static boolean isValidEmail(String email){
    	if (email==null) return false;
		//var mailPattern = /^[a-zA-Z0-9.+'_-]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}/g;   select4.js에서 사용하는 정규식
    	//boolean b = Pattern.matches("[\\w\\~\\-\\.]+@[\\w\\~\\-]+(\\.[\\w\\~\\-]+)+",email.trim());
    	boolean b = Pattern.matches("[\\w\\~\\-\\.+'_]+@[\\w\\~\\-]+(\\.[\\w\\~\\-]+)+",email.trim());
    	return b;
    	
    }
    
    /**
	 * Removes the script tag.
	 *
	 * @param data
	 *            the data
	 * @return the string
	 */
    public static String removeScriptTag(String data){
    	StringBuilder regex = new StringBuilder("<script[^>]*>(.*?)</script>");
    	int flags = Pattern.MULTILINE | Pattern.DOTALL| Pattern.CASE_INSENSITIVE;
    	Pattern pattern = Pattern.compile(regex.toString(), flags);
    	Matcher matcher = pattern.matcher(data);
    	return matcher.replaceAll("");
    }
    
    /**
	 * 스타일 치환.
	 *
	 * @param data
	 *            the data
	 * @return 치환된 문자
	 */    
    public static String removeStyleTag(String data){
		Matcher mat; 
		Pattern style = Pattern.compile("<style[^>]*>(.*?)</style>",Pattern.DOTALL);  
		mat = style.matcher(data);  
    	return mat.replaceAll("");
    }

    /**
	 * 스타일 치환.
	 *
	 * @param data
	 *            the data
	 * @param replace
	 *            the replace
	 * @return 치환된 문자
	 */    
    public static String removeStyleTag(String data , String replace){
		Matcher mat; 
		Pattern style = Pattern.compile("<style[^>]*>(.*?)</style>",Pattern.DOTALL);  
		mat = style.matcher(data);  
    	return mat.replaceAll(replace);
    }
    
    /**
	 * 문자열을 자바스크립트에 직접 대입할 때 스크립트 오류를 방지하기 위해 특수문자 치환.
	 *
	 * @param str
	 *            원문
	 * @return 치환된 문자
	 */
    public static String toJS(String str){
    	if(str==null){return "";}
    	return str.replace("\\","\\\\")
    					.replace("\'","\\\'")
    					.replace("\"","\\\"")
    					.replace("\r\n","\\n")
    					.replace("\n","\\n");
    }
    
    /**
	 * 파라미터중에 리턴 URL만 인코딩 처리.
	 *
	 * @param request
	 *            the request
	 * @param str
	 *            원문
	 * @return 치환된 문자
	 */
    public static String getEncodeUrl(HttpServletRequest request,String str){
    	if(str==null){return "";}
		try{
			String urls[] = str.split("[?]");
			String host = urls[0];
			String param = "";
			if(urls.length>1){
				for ( String pair : urls[1].split( "&" ) ){
					int eq = pair.indexOf( "=" );
		        	if ( eq < 0 )
		        	{
		            	// key with no value
		        		continue;
		        	}
		        	else
		        	{
		        		// key=value
		            	String key = pair.substring( 0 , eq );
		            	String value = URLEncoder.encode( pair.substring( eq + 1 ) ,"UTF-8");
		            	if(!"".equals(param)){
		              		param+="&";
		            	}
		            	param += key+"="+value;
		        	}
				}
			}
			
			if(urls.length>2){
				for(int j=2;j<urls.length;j++){
					param += URLEncoder.encode("?"+urls[j],"UTF-8");
				}
			}

			if(StringUtil.isNotEmpty(param)){
				param = "?"+param;
			}
			
			if(!host.startsWith("http:")){
				if(host.startsWith(request.getContextPath())){
					str = host+param;		
				}else{
					str = request.getContextPath()+host+param;		
				}
			}else{
				str = host+param;
			}
		}catch(Exception e){
			e.printStackTrace();
			return str;
		}
		return str;
   }
    
    /**
	 * Gets the ekp url.
	 *
	 * @param str
	 *            the str
	 * @return the ekp url
	 */
//	public static String getEkpUrl(CompanyBean companyBean) {
//		return defaultString(PropertyConstants.EKP_PROTOCOL,"http://") +  companyBean.getCmpHost() + "." + companyBean.getCmpDomain() + "/" + StringUtil.defaultString(PropertyConstants.CONTEXT_NAME,"ekp");
//	}

	/**
	 * Gets the mobile url.
	 *
	 * @param companyBean CompanyBean
	 * @return the mobile url
	 */
//	public static String getMobileUrl(CompanyBean companyBean) {
//		return defaultString(PropertyConstants.EKP_PROTOCOL,"http://")+ StringUtil.defaultString(PropertyConstants.MOBILE_HOST,"m.") + companyBean.getCmpHost() + "." + companyBean.getCmpDomain() + "/" + StringUtil.defaultString(PropertyConstants.CONTEXT_NAME,"ekp");
//	}
	
	/**
	 * 주어진 문자열이 null또는 공백문자열("") 인지를 체크한다.
	 *
	 * @param str 원본 문자열
	 * @return int 원본 문자열이 null또는 공백문자열("") 이라면 대치할 값을 반환하고 그렇지 않다면 원본 문자열을
	 * Integer로 변환하여 반환한다 만일 원본 문자열을 Integer로 변환하는중 에러가 발생하면 0을 반환한다.
	 */

	public static int nullToInteger(String str) {
		return nullToInteger(str, 0);
	}

	/**
	 * Null to integer.
	 *
	 * @param str String
	 * @param i int
	 * @return the int
	 */
	public static int nullToInteger(String str, int i) {
		int value = 0;
		if ("".equals(nullToString(str))) {
			value = i;
		} else {
			try {
				value = Integer.parseInt(str);
			} catch (Exception e) {
			}
		}

		return value;
	}
	
	/**
	 * 문자열 자르기.
	 *
	 * @param orig
	 *            String
	 * @param byteLength
	 *            the byte length
	 * @return 문자열
	 */
	public static String getShortString( String orig, int byteLength)
	 {
	    if(orig != null){
	    	int retLength = 0;    
	        int tempSize = 0;    
	        int asc;    
	    	int length = orig.length();
	        
	        for (int i = 1; i <= length; i++) {        
	            asc = (int) orig.charAt(i - 1);        
	            if (asc > 127) {            
	                if (byteLength >= tempSize + 2) {                
	                    tempSize += 2;                
	                    retLength++;            
	                } else {                
	                    return orig.substring(0, retLength);            
	                }       
	            } else {           
	                if (byteLength > tempSize) {
	                    tempSize++;
	                    retLength++;            
	                }        
	            }    
	        }   
	         
	        return orig.substring(0, retLength);
	    }else{
	    	return "";
	    }
	}
	
	/**
	 * link 태그에 blank target 생성함 <prev> (쪽지,메일은 기존 Service 그대로) 다른 모듈에 에디터를 쓰는경우
	 * 해당 함숭 </prev>.
	 *
	 * @param str
	 *            the str
	 * @return target add str
	 */
	public static String getTargetAddStr(String str){
		str = str.replaceAll("href=(\"(.+?)\")", "href=$1 target=\"_blank\"").replaceAll("href=('(.+?)')", "href=$1 target=\"_blank\"");
		return str;
	}
	
	/**
	 * 특정 태그와 하위 태그 전부 제거 <prev> str =
	 * <p>
	 * <img src="">test</img>
	 * </p>
	 * removeRex(str, "img") retrun =
	 * <p>
	 * </P>
	 * </prev>.
	 *
	 * @param str
	 *            the str
	 * @param rex
	 *            the rex
	 * @return str
	 */
	public static String removeRex(String str, String rex){
		
		Pattern pt = Pattern.compile("<"+rex+"[^>]*>.*</"+rex+">",Pattern.DOTALL);  

		Matcher mat = pt.matcher(str);  

		str = mat.replaceAll("");  

		return str;
	}
	
}