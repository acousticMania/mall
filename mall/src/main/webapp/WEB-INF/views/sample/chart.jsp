<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/resources/js/jquery/jquery-1.10.2.js"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/Nwagon/Nwagon.css"/>"/>
<script type="text/javascript" src="/resources/js/Nwagon/Nwagon.js"></script>
</head>
<body>
<div id="Nwagon"></div>
<script>
var options = {
        'legend':{
            names: [
                'Perceivable', 
                'Information Loss', 
                'Understandable', 
                'Enough Time', 
                'Epilepsy Prevent', 
                'Operable', 
                'Navigation', 
                'Error Prevent'
            ],
            hrefs: [
                'http://nuli.nhncorp.com/accessibility#k1',
                'http://nuli.nhncorp.com/accessibility#k2',
                'http://nuli.nhncorp.com/accessibility#k3',
                'http://nuli.nhncorp.com/accessibility#k4',
                'http://nuli.nhncorp.com/accessibility#k5',
                'http://nuli.nhncorp.com/accessibility#k6',
                'http://nuli.nhncorp.com/accessibility#k7',
                'http://nuli.nhncorp.com/accessibility#k8'
            ]
        },
        'dataset': {
            title: 'Web accessibility status', 
            values: [[34,53,67,23,78,45,69,98]], 
            bgColor: '#f9f9f9',
            fgColor: '#30a1ce',
        },
        'chartDiv': 'Nwagon',
        'chartType': 'radar',
        'chartSize': { width: 500, height: 300 }
    };
    Nwagon.chart(options);
</script>
</body>
</html>