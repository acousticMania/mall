<%@page import="org.apache.jasper.tagplugins.jstl.core.Import"%>
<%@ include file="/WEB-INF/views/common/default-head.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript">
var myApp = angular.module('myApp', []);

myApp.controller('UserCtrl', ['$scope', function ($scope) {
    
    $scope.user = {};
    $scope.user.details={
    	"username" : "Todd Motto",
    	"id" : "89101112"
    }
    $scope.greeting = 'Todd Motto';
}]);

myApp.directive('customButton', function() {
	return {
		restrict: '',
		replace: true,
		transclude: true,
		template:'<a href="" class="myawesomebutton" ng-transclude>' +
			'<i class="icon-ok-sign"></i>' +
			'</a>',
		link : function(scope, element, attr) {
			
		}
	};
});

myApp.service('Math', function() {
	this.multiply = function (x, y) {
		return x * y;
	};
});

myApp.filter('reverse', function() {
	return function (input, uppercase) {
		var out='';
		for (var i=0; i < input.length; i++) {
			out = input.charAt(i) + out;
		}
		if (uppercase) {
			out = out.toUpperCase();
		}
		return out;
	}
});

myApp.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.myModel = '';
    
    
}]);

myApp.controller('EmailsCtrl', ['$scope', function($scope) {
	
	$scope.emails = {};
	
	$scope.emails.messages = [{
		"from": "Steve Jobs",
		"subject": "I think I'm holding my phone worng :/",
		"sent": "2013-10-01T08:05:59Z"
	},{
	 "from": "Ellie Goulding",
        "subject": "I've got Starry Eyes, lulz",
        "sent": "2013-09-21T19:45:00Z"
    },{
        "from": "Michael Stipe",
        "subject": "Everybody hurts, sometimes.",
        "sent": "2013-09-12T11:38:30Z"
    },{
        "from": "Jeremy Clarkson",
        "subject": "Think I've found the best car... In the world",
        "sent": "2013-09-03T13:15:11Z"
	}];
	
	$scope.deleteEmail = function (index) {
	    $scope.emails.messages.splice(index, 1)
    };
}]);



</script>
</head>
<body>
<div ng-app="myApp">
    <div ng-controller="UserCtrl">
         <p class="username">Welcome, {{user.details.username}}</p>
         <p class="id">User ID : {{user.details.id}}</p>
         <p>No filter : {{ greeting }}</p>
         <p>Reverse : {{ greeting | reverse }}</p>
    </div>
    <br/>
    <br/>
    <a custom-button>Click me</a>
    
    <div ng-controller="MainCtrl">
    	<input type="text" ng-model="myModel" placeholder="Start typing..." />
    	<p>My model data :{{ myModel }}</p>
    </div>
    <br/>
    <br/>
    <div ng-controller="EmailsCtrl">
    	<ul>
		  <li ng-repeat="message in emails.messages">
		    <p>From: {{ message.from }}</p>
		    <p>Subject: {{ message.subject }}</p>
		    <p>{{ message.sent | date:'MMM d, y h:mm:ss a' }}</p>
		  </li>
		</ul>
		<a ng-click="deleteEmail($index)">Delete email</a>
    </div>
    <br/>
    <br/>
    <div>
    	<a href="" ng-click="toggle = !toggle">Toggle nav</a>
    	<ul ng-show="toggle">
    		<li>Link 1</li>
    		<li>Link 2</li>
    		<li>Link 3</li>
    	</ul>
    </div>
    <br/>
    <br/>
    <p>{{ data.length > 0 && 'My data' || 'No data'}}</p>
</div>
</body>
</html>