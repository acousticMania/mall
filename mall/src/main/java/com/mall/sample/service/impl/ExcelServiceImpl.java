package com.mall.sample.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mall.common.util.excel.FileType;
import com.mall.sample.dao.ExcelDao;
import com.mall.sample.service.ExcelService;

@Service
public class ExcelServiceImpl implements ExcelService{
	
//	private static final Logger logger = LoggerFactory.getLogger(ExcelController.class);
	
	@Resource
	private ExcelDao excelDao;
	
	/**
	 * @설명 			: 엑셀업로드
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 16. 오후 9:45:37
	 * @Method Name		: excelFileUpload
	 * @param excelFile
	 */
	@Override
	public void excelFileUpload(MultipartFile excelFile) {
		// 엑셀 파일변환필요하면 변환처리해야함
		
		// 엑셀읽어들이기
		List<Map<String,String>> list = readExcelFile(excelFile);
		
		for(int i=0; i < list.size(); i++) {
//			Map<String, String> strMap = list.get(i);
//			Map<String, Object> map = new HashMap<String, Object>();
//			String creaDtm = strMap.get("CREA_DTM");
//			Timestamp CREA_DTM = Timestamp.valueOf(creaDtm); 
//			strMap.put("CREA_DTM", CREA_DTM);
			
			excelDao.insertBoard(list.get(i));
		}
		
		//
		
	}

	/**
	 * @설명 			: 엑셀내용을 읽어서 List에 담는다.
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 4:01:47
	 * @Method Name		: readExcelFile
	 * @param excelFile
	 * @return excellist
	 */
	private List<Map<String, String>> readExcelFile(MultipartFile excelFile) {
		
		
		
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Map<String, String> map = new HashMap<String, String>();
			
			// XLS or XLSX인지 구분
		Workbook workbook = FileType.getWorkbook(excelFile);
		
		try {
			
			//탐색에 사용할 Sheet, Row, Cell 객체
	//		Sheet sheet = null;
	//		Row row = null;
	//		Cell cell = null;
			
			//전체sheet수
			int sheetCnt = workbook.getNumberOfSheets();
			
			for(int sheetIndex = 0; sheetIndex < sheetCnt; sheetIndex++) {
				//현재 sheet
				Sheet curSheet = workbook.getSheetAt(sheetIndex);
				
				//sheet당 row수
				int rowCnt = curSheet.getPhysicalNumberOfRows();
				
				for(int rowIndex=0; rowIndex < rowCnt; rowIndex++) {
					//row 0은 헤더정보이 때문에 무시
					if(rowIndex != 0) {
						//현재 row
						Row curRow = curSheet.getRow(rowIndex);
						
						// row의 첫번째 cell값이 비어있지 않은 경우 만 cell탐색
						if(!"".equals(curRow.getCell(0).getStringCellValue())) {
							
							// cell 탐색 for문
							for(int cellIndex=0; cellIndex < curRow.getPhysicalNumberOfCells(); cellIndex++) {
								Cell curCell = curRow.getCell(cellIndex);
								String value = "";
								
								// cell스타일에 따라 변경필요할시 fileType이용
//								value = FileType.getStringCell(curCell);
								value = curCell.getStringCellValue();
								
								// 현재 column index에 따라서 map에 입력
								switch (cellIndex) {
								case 0:	// TITLE 
									map.put("TITLE", value);
									break;
								case 1:	// CONTENTS
									map.put("CONTENTS", value);
									break;
								case 2:	// CREA_DTM
									map.put("REG_DATE", value);
								case 3:	// CREA_ID
									map.put("REG_ID", value);
								}
							
							}
							
							list.add(map);
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(workbook != null)
				try {
					workbook.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
		
		return list;
	}

	/**
	 * @설명 			: 엑셀리스트 조회 
	 * @author 			: Myeong-seok(sirosms@gmail.com)
	 * @date			: 2016. 11. 19. 오후 9:21:21
	 * @Method Name		: excelFileDownload
	 * @return
	 */
	@Override
	public List<Map<String, String>> excelFileDownload() {
		return excelDao.selectBoardList();
	}
}
