<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<% request.setCharacterEncoding("UTF-8"); //해당시스템의 인코딩타입이 UTF-8일 경우
//request.setCharacterEncoding("EUC-KR");//해당시스템의 인코딩타입이 EUC-KR일 경우
//2017년 2월 제공항목이 확대되었습니다. 원하시는 항목을 추가하여 사용하시면 됩니다.
String inputYn = request.getParameter("inputYn");
String roadFullAddr = request.getParameter("roadFullAddr");
String roadAddrPart1 = request.getParameter("roadAddrPart1");
String roadAddrPart2 = request.getParameter("roadAddrPart2");
String engAddr = request.getParameter("engAddr");
String jibunAddr = request.getParameter("jibunAddr");
String zipNo = request.getParameter("zipNo");
String addrDetail = request.getParameter("addrDetail");
String admCd = request.getParameter("admCd");
String rnMgtSn = request.getParameter("rnMgtSn");
String bdMgtSn = request.getParameter("bdMgtSn");
%>
</head>
<script language="javascript">
function init(){
	var url = location.href;
	var confmKey = "U01TX0FVVEgyMDE3MDQxNTExMzAzOTIwNjAw"; // 연계싞청시 부여받은 승인키 입력(테스트용 승인키 : TESTJUSOGOKR)
	var resultType = "4"; // 도로명주소 검색결과 화면 출력유형, 1 : 도로명, 2 : 도로명+지번, 3 : 도로명+상세건물명, 4 : 도로명+지번+상세건물명
	var inputYn= "<%=inputYn%>";
	if(inputYn != "Y"){
		document.form.confmKey.value = confmKey;
		document.form.returnUrl.value = url;
		document.form.resultType.value = resultType;
		document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망(행정망의 경우 별도 문의)
		document.form.submit();
	}else{
		opener.jusoCallBack("<%=roadFullAddr%>","<%=roadAddrPart1%>","<%=addrDetail%>","<%=roadAddrPart2%>","<%=engAddr%>","<%=jibunAddr%>","<%=zipNo%>", "<%=admCd%>", "<%=rnMgtSn%>", "<%=bdMgtSn%>");
		window.close();
	}
}
</script>
<body onload="init();">
<form id="form" name="form" method="post">
<input type="hidden" id="confmKey" name="confmKey" value=""/>
<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
<input type="hidden" id="resultType" name="resultType " value=""/>
<!-- <input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/> -->
</form> </body>
</html>