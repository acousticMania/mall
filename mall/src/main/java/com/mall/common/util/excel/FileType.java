
package com.mall.common.util.excel;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

/**
 * @설명			: 엑셀업로드 확장자를 찾는 클래스  
 * @작성일		: 2016. 11. 16. 오후 10:04:38
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */
public class FileType {
	
	/**
	 * @설명 			: XLS와 XLSX 확장자를 비교한다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 16. 오후 10:07:28
	 * @Method Name		: getWorkbook
	 * @param filePath
	 * @return Workbook
	 */
	public static Workbook getWorkbook(MultipartFile excelFile) {
		String fileName = excelFile.getOriginalFilename();
		InputStream in = null;
//		FileInputStream fis = null; 
		Workbook workbook = null;
		
		try {
			in = excelFile.getInputStream();
//			fis = (FileInputStream) excelFile.getInputStream();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		if(fileName.toUpperCase().endsWith(".XLS")){
			try {
				workbook = new HSSFWorkbook(in);
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(in != null) {
					try {
						in.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		} else if(fileName.toUpperCase().endsWith(".XLSX")) {
			try {
				workbook = new XSSFWorkbook(in);
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(in != null) {
					try {
						in.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		return workbook;
	}

	/**
	 * @설명 			: cell Style을 String으로 변환 
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 16. 오후 11:19:35
	 * @Method Name		: getStringCell
	 * @param curCell
	 * @return stringCell
	 */
	public static String getStringCell(Cell cell) {
		String cellValue = "";
		
		// 엑셀 타입별로 분리
	    // 숫자, 문자 이외의 수식, 데이터, null이 아닌 공백, 에러 등 많은 종류가 있다
	    int cellType = cell.getCellType();
	    switch (cellType) {
	    case XSSFCell.CELL_TYPE_NUMERIC: // type 숫자
	     cellValue = String.valueOf(cell.getNumericCellValue());
	     break;
	    case XSSFCell.CELL_TYPE_STRING: // type 문자
	     cellValue = cell.getStringCellValue();
	     break;
	    }
		
		
		if(true) {
			// 사용하지말라는 이유찾아야봐야함
			switch (cell.getCellType()) {
			case Cell.CELL_TYPE_FORMULA:
			}
			
		}
		return cellValue;
	}
}
