<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
Ext.onReady(function() {
// 	Ext.Msg.alert("Chapter 1", "Hello World!!!");
	
	Ext.define('User', {
	    extend: 'Ext.data.Model',
	    fields : [ 'TITLE', 'BOARD_IDX', 'HIT_CNT' ]
	});
	
	var userStore = Ext.create('Ext.data.Store', {
	    model : 'User',
	    proxy: {
            // load using HTTP
            type: 'ajax',
            url: '/sample/selectBoardList.json',
            // the return will be XML, so lets set up a reader
            reader: {
                type: 'json',
//                 record: 'list',
                rootProperty : 'list'
//                 totalProperty  : 'total'
            }
        }
	});
	
	// create the grid
    var grid = Ext.create('Ext.grid.Panel', {
        bufferedRenderer: false,
        store: userStore,
        columns: [
            {text: "TITLE", width: 120, dataIndex: 'TITLE'},
            {text: "BOARD_IDX", width: 120, dataIndex: 'BOARD_IDX'},
            {text: "HIT_CNT", width: 125, dataIndex: 'HIT_CNT'}
        ],
        forceFit: true,
        height:210,
        split: true,
        region: 'north'
    });
	
    // define a template to use for the detail view
    var bookTplMarkup = [
        'TITLE: {TITLE}</a><br/>',
        'BOARD_IDX: {BOARD_IDX}<br/>',
        'HIT_CNT: {HIT_CNT}<br/>'
    ];
    var bookTpl = Ext.create('Ext.Template', bookTplMarkup);

    Ext.create('Ext.Panel', {
        renderTo: 'binding-example',
        frame: true,
        title: 'Book List',
        width: 580,
        height: 400,
        layout: 'border',
        items: [
            grid, {
                id: 'detailPanel',
                region: 'center',
                bodyPadding: 7,
                bodyStyle: "background: #ffffff;",
                html: 'Please select a book to see additional details.'
        }]
    });
    
 	// update panel body on selection change
    grid.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
        if (selectedRecord.length) {
            var detailPanel = Ext.getCmp('detailPanel');
            detailPanel.update(bookTpl.apply(selectedRecord[0].data));
        }
    });
	
	userStore.load();
});
</script>
</head>
<body>
<div id="binding-example" align="center" >
</div>

</body>
</html>