
package com.mall.common.view;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;



/**
 * @설명			: 엑셀뷰 추상엑셀뷰를 상속받는다.  
 * @작성일		: 2016. 11. 19. 오후 9:18:11
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */

public class ExcelView extends AbstractExcelView {

	/**
	 * @설명 			: 엑셀 문서를 만든다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:18:47
	 * @Method Name		: buildExcelDocument
	 * @param model
	 * @param workbook
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		//시트생성
		HSSFSheet sheet = createFirstSheet(workbook);
		
		//최상단 셀값설정
		createColumnLabel(sheet);
		
		//출력할 데이터 가져오기
		@SuppressWarnings("unchecked")
		List<Map<String, String>> excelList = (List<Map<String, String>>) model.get("list");
		int rowNum = 1;
		
		for(Map<String, String> map : excelList) {
			createExcelRow(sheet, map, rowNum++);
		}
		
	}
	
	/**
	 * @설명 			: 엑셀시트를 생성한다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:19:07
	 * @Method Name		: createFirstSheet
	 * @param workbook
	 * @return
	 */
	private HSSFSheet createFirstSheet(HSSFWorkbook workbook) {
		HSSFSheet sheet = workbook.createSheet();
		workbook.setSheetName(0, "페이지 순위");
		
		//시트크기설정
		sheet.setColumnWidth(1, 255*20);
		return sheet;
	}
	
	/**
	 * @설명 			: 엑셀제목을 생성한다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:19:20
	 * @Method Name		: createColumnLabel
	 * @param sheet
	 */
	private void createColumnLabel(HSSFSheet sheet) {
		//시트의 첫번째 행 생성
		HSSFRow firstRow = sheet.createRow(0);
		
		//행의 첫번째 셀 생성
		HSSFCell cell = firstRow.createCell(0);
		cell.setCellValue("제목");
		
		cell = firstRow.createCell(1);
		cell.setCellValue("내용");
		cell = firstRow.createCell(2);
		cell.setCellValue("작성일");
		cell = firstRow.createCell(3);
		cell.setCellValue("작성자");
//		cell = firstRow.createCell(4);
	}

	/**
	 * @설명 			: 엑셀내용을 생성한다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:19:41
	 * @Method Name		: createExcelRow
	 * @param sheet
	 * @param map
	 * @param rowNum
	 */
	private void createExcelRow(HSSFSheet sheet, Map<String, String> map, int rowNum) {
		//행생성
		HSSFRow row = sheet.createRow(rowNum);
		HSSFCell cell = row.createCell(0);
		
		cell.setCellValue(map.get("TITLE"));
		cell = row.createCell(1);
		cell.setCellValue(map.get("CONTENTS"));
		cell = row.createCell(2);
		cell.setCellValue(map.get("CREA_DTM"));
		cell = row.createCell(3);
		cell.setCellValue(map.get("CREA_ID"));
//		cell = row.createCell(4);
		
	}
}
