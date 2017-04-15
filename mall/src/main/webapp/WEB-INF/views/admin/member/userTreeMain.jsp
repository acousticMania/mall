
<%@ include file="/WEB-INF/views/common/sample/default-head.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript" charset="utf-8">
Ext.onReady(function(){

	var store =  Ext.create('Ext.data.TreeStore',{
		 root : {
			    text: '12st Member',
			    expanded: false,
			    //added
			    id : 0
		 },
		 proxy: {
        type: 'ajax',
        //json file url change
        url: '/member/server3_select',
        reader: {
            type: 'json',
            root: 'children'
        }
    }
	});

	Ext.create('Ext.tree.Panel', {
	    title: 'Simple Tree',
	    width: 400,
	    height: 600,
	    store: store,
	    rootVisible: true,
	    renderTo: Ext.getBody(),
	    listeners: {
	        itemclick: function(view,record,item,index,e) {
	                var jsonData = $.parseJSON(record.data.result);
	                alert(record.data.text);
	        }
	    }
	});

}); 
</script>
</head>
<body>

</body>