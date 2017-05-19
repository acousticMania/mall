
package com.mall.common.spring.framework.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.mall.common.util.CommonUtil;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

/**
 * @설명			: 파일관련 유틸리티 (이 객체의 관리는 스프링이 담당)   
 * @작성일		: 2016. 11. 24. 오후 2:09:20
 * @작성자		: Myeong-seok(sirosms@gmail.com)
 * @version 	: 12st v1.0
 */

@Component("fileUtil")
public class FileUtil {
	/** logger. */
	private static Logger logger = LoggerFactory.getLogger(FileUtil.class);
	
	public static final String filePath = "C:\\project\\file\\";
	
	public List<Map<String, Object>> parseInsertFileInfo(Map<String, Object> map, HttpServletRequest request) {
		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
		Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
		
		MultipartFile multipartFile = null;
		String originalFileName =null;
		String originalFileExtension = null;
		String storedFileName = null;
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> listMap = null;
		
		String boardIdx = (String) String.valueOf(map.get("BOARD_IDX"));
		String requestName = null;
		String idx = null;
		
		
		File file = new File(filePath);
		if(file.exists()==false) {
			file.mkdirs();
		}
		
		while(iterator.hasNext()) {
			multipartFile = multipartHttpServletRequest.getFile(iterator.next());
			if(multipartFile.isEmpty() == false) {
				originalFileName = multipartFile.getOriginalFilename();
				originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
				storedFileName = CommonUtil.getRandomString() + originalFileExtension;
				
				file = new File(filePath + storedFileName);
				try {
					multipartFile.transferTo(file);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				
				listMap = new HashMap<String, Object>();
				listMap.put("IS_NEW", "Y");
				listMap.put("BOARD_IDX", boardIdx);
				listMap.put("REAL_FILE_NAME", originalFileName);
				listMap.put("FILE_NAME", storedFileName);
				listMap.put("FILE_SIZE", multipartFile.getSize());
				listMap.put("FILE_PATH", filePath);
				listMap.put("FILE_EXT", originalFileExtension);
				listMap.put("REG_DATE", map.get("REG_DATE"));
				listMap.put("REG_ID", map.get("REG_ID"));
				list.add(listMap);
			} else {
				requestName = multipartFile.getName();
				idx = "FILE_IDX_" + requestName.substring(requestName.indexOf("_")+1);
				if(map.containsKey(idx) == true && map.get(idx) != null) {
					listMap = new HashMap<String, Object>();
					listMap.put("IS_NEW", "N");
					listMap.put("FILE_IDX", map.get(idx));
					list.add(listMap);
				}
			}
		}
		
		return list;
	}

	/**
	 * 파일&디렉토리 복사 메소드.
	 *
	 * @param source 원본 파일&디렉토리.
	 * @param target 타겟 파일&디렉토리.
	 * @return boolean 복사 성공 여부.
	 */
	public static boolean copy(String source, String target) {
		File sourceFile = new File(source);
		File targetFile = new File(target);
		return copy(sourceFile, targetFile);
	}

	/**
	 * 파일&디렉토리 복사 메소드.
	 *
	 * @param source 원본 파일&디렉토리.
	 * @param target 타겟 파일&디렉토리.
	 * @return boolean 복사 성공 여부.
	 */
	public static boolean copy(File source, File target) {
		boolean sucess = false;
		if (source.exists()) {
			if (source.isDirectory()) {
				target.mkdir();
				File[] list = source.listFiles();
				for (int i = 0; i < list.length; i++) {
					File tempFile = new File(target.getPath() + File.separator + list[i].getName());
					sucess = copy(list[i], tempFile);
					if (!sucess) {
						break;
					}
				}
				sucess = target.exists();
			} else {
				sucess = copyFile(source, target);
			}
		}
		return sucess;
	}

	/**
	 * 파일 복사 메소드<br>
	 * copy(File source, File target) 를 써도된다.
	 *
	 * @param source 원본 파일.
	 * @param target 타겟 파일.
	 * @return boolean 복사 성공 여부.
	 */
	public static boolean copyFile(File source, File target) {
		if (!source.exists() || !source.isFile()) {
			return false;
		}

		byte[] buffer = new byte[4096];
		int bytesRead;
		BufferedInputStream input = null;
		BufferedOutputStream output = null;

		try {
			input = new BufferedInputStream(new FileInputStream(source));
			output = new BufferedOutputStream(new FileOutputStream(target));
			while ((bytesRead = input.read(buffer)) != -1) {
				output.write(buffer, 0, bytesRead);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (Exception e) {
					logger.error("input filestream close error");
				}
			}
			if (output != null) {
				try {
					output.close();
				} catch (Exception e) {
					logger.error("output filestream close error");
				}
			}
		}
		return target.exists();
	}

	/**
	 * 파일&디렉토리 삭제 메소드.
	 * 수정해야함 명석.
	 *
	 * @param source 삭제 파일&디렉토리.
	 * @return boolean 삭제 성공 여부.
	 */
	public static boolean delete(String source) {
//		File sourceFile = new File(PropertyConstants.uploadDir + source);
//		return delete(sourceFile);
		return true;
	}

	/**
	 * 파일&디렉토리 삭제 메소드.
	 *
	 * @param source 삭제 파일&디렉토리.
	 * @return boolean 삭제 성공 여부.
	 */
	public static boolean delete(File source) {
		boolean sucess = false;
		if (source.exists()) {
			if (source.isDirectory()) {
				File[] list = source.listFiles();
				for (int i = 0; i < list.length; i++) {
					File tempFile = new File(source.getPath() + File.separator + list[i].getName());
					sucess = delete(tempFile);
					if (!sucess) {
						break;
					}
				}
				sucess = source.delete();

			} else {
				sucess = source.delete();
			}
		}
		return sucess;
	}

	/**
	 * 파일&디렉토리 이동메소드. <br>
	 * 타겟이 존재하고 디렉토리일경우 내용을 복사해 넣은후 원본 삭제.
	 *
	 * @param source 원본 파일.
	 * @param target 타겟 파일.
	 * @return boolean 삭제 성공 여부.
	 */
	public static boolean move(String source, String target) {
		File sourceFile = new File(source);
		File targetFile = new File(target);
		return move(sourceFile, targetFile);
	}

	/**
	 * 파일&디렉토리 이동메소드. <br>
	 * 타겟이 존재하고 디렉토리일경우 내용을 복사해 넣은후 원본 삭제.
	 *
	 * @param source 원본 파일.
	 * @param target 타겟 파일.
	 * @return boolean 삭제 성공 여부.
	 */
	public static boolean move(File source, File target) {
		boolean sucess = false;
		if (!source.exists()) {
			return false;
		} else if (target.exists() && target.isDirectory()) {
			if (copy(source, target)) {
				sucess = delete(source);
			}
		} else {
			if (target.exists()) {
				delete(target);
			}
			sucess = source.renameTo(target);
			if(!sucess){ //renameTo가 실패시 파일을 복사함.
			     copy(source, target);
			     source.delete();
			}
		}
		return sucess;
	}

	/**
	 * 폴더, 파일 이름 변경(-1:실패, 0:성공, 1:파일,폴더 존재.
	 *
	 * @param oldFile File
	 * @param newFile File
	 * @return the int
	 */
	public static int rename(File oldFile, File newFile) {
		if (newFile.exists()) {
			return 1;
		}
		if (oldFile.renameTo(newFile)) {
			return 0;
		}
		return -1;
	}

	/**
	 * Rename.
	 *
	 * @param oldname String
	 * @param newname String
	 * @return true, if successful
	 */
	public static boolean rename(String oldname, String newname) {
		File oldFile = new File(oldname);
		File newFile = new File(newname);
		return move(oldFile, newFile);
	}

	/**
	 * 디렉토리 존재 검사. <br>
	 *
	 * @param source 파일&디렉토리.
	 * @return boolean true=존재.
	 */
	public static boolean exists(String source) {
		File sourceDir = new File(source);
		return exists(sourceDir);
	}

	/**
	 * 디렉토리 존재 검사. <br>
	 *
	 * @param source 파일&디렉토리.
	 * @return boolean true=존재.
	 */
	public static boolean exists(File source) {
		return source.exists();
	}

	/**
	 * 숫자를 단위로(Byte,KB,MB,GB).
	 *
	 * @param num long 데이터 단위
	 * @return the string
	 */
	public static String strNumToFileSize(long num) {
		String ret = "";
		long bias = 1024L;

		if (num < bias) {
			ret = num + "Byte";
		} else if (num >= bias && num < (bias * bias)) {
			ret = num / bias + "KB";
		} else if (num >= (bias * bias) && num < (bias * bias * bias)) {
			ret = num / (bias * bias) + "MB";
		} else if (num >= (bias * bias * bias) && num < (bias * bias * bias * bias)) {
			ret = num / (bias * bias * bias) + "GB";
		}
		return ret;
	}

	/**
	 * 숫자를 단위(Byte,KB,MB,GB)로 변환.
	 *
	 * @param num int
	 * @return the string
	 */
	public static String strNumToFileSize(int num) {
		return strNumToFileSize((long) num);
	}

	/**
	 * 입력받은 파일 이름에서 파일 확장자를 추출한다.
	 *
	 * @param fileName 파일 명
	 * @return String 입력받은 파일 명에서 파일 확장자를 추출하여 반환 하거나 입력받은 파일 명이 null이라면 null을 확장자를 추출할수 없다면 빈문자열을
	 *         반환한다.
	 */
	public static String getFileType(String fileName) {
		String fileExt = null;
		if (fileName != null) {
			int offset = fileName.lastIndexOf(".");
			if ((offset != -1) && (offset != fileName.length())) {
				fileExt = fileName.substring(offset + 1);
			} else {
				fileExt = "";
			}
		}

		return fileExt;
	}

	/**
	 * 입력받은 파일 이름에서 파일 확장자를 추출한다.
	 *
	 * @param filePath String
	 * @return String 입력받은 파일 명에서 파일 확장자를 추출하여 반환 하거나 입력받은 파일 명이 null이라면 null을 확장자를 추출할수 없다면 입력받은 파일
	 *         명을 반환한다.
	 */
	public static String getFileName(String filePath) {
		String fileName = null;
		if (filePath != null) {
			int offset = filePath.lastIndexOf("/");
			if ((offset != -1) && (offset != filePath.length())) {
				fileName = filePath.substring(offset + 1);
			} else {
				fileName = filePath;
			}
		}

		return fileName;
	}

	/**
	 * JSON 파일 만들기.
	 *
	 * @param strFilePath String
	 * @param jsonNode String
	 * @return true, if successful
	 */
	public boolean makeJSONFile(String strFilePath, String jsonNode) {
		return makeFile(strFilePath, "[" + jsonNode + "]", "UTF-8");
	}

	/**
	 * JSON 파일 만들기.
	 *
	 * @param strFilePath String
	 * @param jsonNode String
	 * @param strEncoding String
	 * @return true, if successful
	 */
	public boolean makeJSONFile(String strFilePath, String jsonNode, String strEncoding) {
		return makeFile(strFilePath, "[" + jsonNode + "]", strEncoding);
	}

	/**
	 * 파일 생성.
	 *
	 * @param baseUrl String
	 * @param mode String
	 * @param year String
	 * @param month String
	 * @param date String
	 * @param fileName String
	 * @param body String
	 * @return true, if successful
	 */
	public static boolean makeFile(String baseUrl, String mode, String year, String month,
			String date, String fileName, String body) {
		String sep = System.getProperty("file.separator");
		StringBuffer url = new StringBuffer();
		url.append(url).append(sep).append(mode).append(sep).append(year).append(sep).append(month)
				.append(sep).append(date).append(sep).append(fileName);
		return makeFile(url.toString(), body, "UTF-8");
	}

	/**
	 * 파일 생성.
	 *
	 * @param strFilePath String
	 * @param body String
	 * @return true, if successful
	 */
	public static boolean makeFile(String strFilePath, String body) {
		return makeFile(strFilePath, body, "UTF-8");
	}

	/**
	 * 파일 생성.
	 *
	 * @param strFilePath String
	 * @param body String
	 * @param strEncoding String
	 * @return true, if successful
	 */
	public static boolean makeFile(String strFilePath, String body, String strEncoding) {
		boolean isDone = false;
		File fOut = null;
		FileOutputStream fileOutputStream = null;
		OutputStreamWriter outputStreamWriter = null;
		BufferedWriter bufferedWriter = null;

		try {
			fOut = new File(strFilePath);
			fileOutputStream = new FileOutputStream(fOut);
			if (strEncoding != null && !"".equals(strEncoding)) {
				outputStreamWriter = new OutputStreamWriter(fileOutputStream, strEncoding);
			} else {
				outputStreamWriter = new OutputStreamWriter(fileOutputStream);
			}
			bufferedWriter = new BufferedWriter(outputStreamWriter);

			bufferedWriter.write(body);
			bufferedWriter.newLine();

			bufferedWriter.flush();

			isDone = true;
		} catch (FileNotFoundException fnfe) {
			fnfe.printStackTrace();

			logger.error("", fnfe);
		} catch (UnsupportedEncodingException uee) {
			uee.printStackTrace();

			logger.error("strFilePath=" + strFilePath, uee);
			disconnectOut(fileOutputStream, outputStreamWriter, bufferedWriter);
			fOut.delete();
		} catch (IOException ioe) {
			ioe.printStackTrace();

			logger.error("", ioe);
		} finally {
			disconnectOut(fileOutputStream, outputStreamWriter, bufferedWriter);
		}

		return isDone;
	}

	/**
	 * 파일 스트림 닫기.
	 *
	 * @param fileOutputStream FileOutputStream
	 * @param outputStreamWriter OutputStreamWriter
	 * @param bufferedWriter BufferedWriter
	 */
	public static void disconnectOut(FileOutputStream fileOutputStream,
			OutputStreamWriter outputStreamWriter, BufferedWriter bufferedWriter) {
		if (fileOutputStream != null) {
			try {
				fileOutputStream.close();
				bufferedWriter = null;
			} catch (IOException e) {
				logger.error("", e);
			}
		}

		if (outputStreamWriter != null) {
			try {
				outputStreamWriter.close();
				outputStreamWriter = null;
			} catch (IOException e) {
				logger.error("", e);
			}
		}

		if (bufferedWriter != null) {
			try {
				bufferedWriter.close();
				bufferedWriter = null;
			} catch (IOException e) {
				logger.error("", e);
			}
		}
	}

	/**
	 * 파일 업로드용 폴더 만들기(baseDir + mode + yyyy + m + dd).
	 *
	 * @param baseDir String
	 * @param mode String
	 */
	public static void makeFolder(String baseDir, String mode) {
		Calendar calendar = Calendar.getInstance();
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int date = calendar.get(Calendar.DATE);

		makeFolder(baseDir, mode, year, month, date);
	}

	/**
	 * 파일 업로드용 폴더 만들기(mode + yyyy + m + dd).
	 *
	 * @param mode String
	 * @param year int
	 * @param month int
	 * @param date int
	 */
	public static void makeFolder(String mode, int year, int month, int date) {
		String baseDir = null;
		makeFolder(baseDir, mode, String.valueOf(year), String.valueOf(month), String.valueOf(date));
	}

	/**
	 * 파일 업로드용 폴더 만들기(baseDir + mode + yyyy + m + dd).
	 *
	 * @param baseDir String
	 * @param mode String
	 * @param year int
	 * @param month int
	 * @param date int
	 */
	public static void makeFolder(String baseDir, String mode, int year, int month, int date) {
		makeFolder(baseDir, mode, String.valueOf(year), String.valueOf(month), String.valueOf(date));
	}

	/**
	 * 폴더를 생성한다.
	 *
	 * @param dirPath String
	 */
	public static void makeFolder(String dirPath) {
		File dir = new File(dirPath);
		if (!dir.exists()) {
			dir.mkdir();

			if (!dir.exists()) {
				System.out.println("### 디렉토리 생성 실패. ==> " + dirPath);
			}

		}
	}

	/**
	 * 파일 업로드용 폴더 만들기(baseDir + mode + yyyy + m + dd).
	 *
	 * @param baseDir String
	 * @param mode String
	 * @param year String
	 * @param month String
	 * @param date String
	 */
	public static void makeFolder(String baseDir, String mode, String year, String month, String date) {
		String tMonth = StringUtils.leftPad(month, 2, "0");
		String tDate = StringUtils.leftPad(date, 2, "0");

		String sep = System.getProperty("file.separator");
		StringBuffer sb = new StringBuffer();
		sb.append(baseDir);

		if (mode.indexOf("/") != -1) {
			String[] modeArr = mode.split("/");
			for (int i = 0; i < modeArr.length; i++) {
				sb.append(sep);
				sb.append(modeArr[i]);
				makeFolder(sb.toString());
			}
		} else {
			sb.append(sep).append(mode);
			makeFolder(sb.toString());
		}
		sb.append(sep).append(year);
		makeFolder(sb.toString());

		sb.append(sep).append(tMonth);
		makeFolder(sb.toString());

		sb.append(sep).append(tDate);
		makeFolder(sb.toString());
	}

	/**
	 * 파일생성 규칙에 따라 폴더생성.
	 *
	 * @param baseDir String
	 * @param modeName String
	 * @return the string
	 */
	public static String createFolderByMakingRule(String baseDir, String modeName) {
		FileUtil.makeFolders(baseDir + System.getProperty("file.separator") + modeName);
		Calendar calendar = Calendar.getInstance();
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int date = calendar.get(Calendar.DATE);

		String tMonth = String.valueOf(month);
		if (month < 10) {
			tMonth = "0" + month;
		}

		String tDate = String.valueOf(date);
		if (date < 10) {
			tDate = "0" + date;
		}
		StringBuffer filePathSb = new StringBuffer();
		filePathSb.append(baseDir);

		if (!(baseDir.endsWith(System.getProperty("file.separator"))
				|| baseDir.endsWith("/") || baseDir.endsWith("\\"))) {
			filePathSb.append(System.getProperty("file.separator"));
		}
		filePathSb.append(modeName).append(System.getProperty("file.separator")).append(year)
				.append(System.getProperty("file.separator")).append(tMonth)
				.append(System.getProperty("file.separator")).append(tDate)
				.append(System.getProperty("file.separator"));

		FileUtil.makeFolder(baseDir, modeName, year, month, date);

		return filePathSb.toString();
	}

	/**
	 * 파일생성 규칙에 따라 폴더생성하고 루트 경로를 제외한 경로를 리턴.
	 *
	 * @param baseDir String
	 * @param modeName String
	 * @return the string
	 */
	public static String createFolderAndReturnPath(String baseDir, String modeName) {
		FileUtil.makeFolder(baseDir);
		Calendar calendar = Calendar.getInstance();
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int date = calendar.get(Calendar.DATE);

		String tMonth = String.valueOf(month);
		if (month < 10) {
			tMonth = "0" + month;
		}

		String tDate = String.valueOf(date);
		if (date < 10) {
			tDate = "0" + date;
		}
		StringBuffer filePathSb = new StringBuffer();

		if (!(baseDir.endsWith(System.getProperty("file.separator"))
				|| baseDir.endsWith("/") || baseDir.endsWith("\\"))) {
			filePathSb.append(System.getProperty("file.separator"));
		}
		filePathSb.append(modeName).append(System.getProperty("file.separator")).append(year)
				.append(System.getProperty("file.separator")).append(tMonth)
				.append(System.getProperty("file.separator")).append(tDate);
		FileUtil.makeFolder(baseDir, modeName, year, month, date);

		return filePathSb.toString();
	}

	/**
	 * 지정한 파일을 지정한 인코딩으로 읽어들여 문자열로 리턴
	 *
	 * @param strFilePath String
	 * @param strEncoding String
	 * @return body
	 */
	public static String getBodyFile(String strFilePath, String strEncoding) {
		FileInputStream		fis	= null;
		InputStreamReader	isr	= null;
		BufferedReader		br	= null;
		StringBuffer		sb	= new StringBuffer();

		try {
			fis	= new FileInputStream(strFilePath);
			isr	= new InputStreamReader(fis, strEncoding);
			br	= new BufferedReader(isr);

			String str = null;
			while (true) {
				str = br.readLine();
				if (str == null) {
					break;
				}
				sb.append(str);
			}
		} catch (FileNotFoundException e) {
			logger.error("그런 파일이 없습니다(No such file or directory).[" + strFilePath + "]");
		} catch (IOException e) {
			logger.error("예외 발생...");
		} finally{
			if (br != null) try { br.close(); } catch(Exception e) {}
			if (isr != null) try { isr.close(); } catch(Exception e) {}
			if (fis != null) try { fis.close(); } catch(Exception e) {}
		}

		return sb.toString();
	}

	/**
	 * 파일url에서 파일명앞에 문자를 추가한다.
	 *
	 * @param fileUrl String
	 * @param prefix String
	 * @return the string
	 */
	public static String addPrefixToFileName(String fileUrl, String prefix) {
		if (fileUrl == null) {
			return null;
		}

		StringBuffer sb = new StringBuffer(fileUrl);
		sb.insert(sb.lastIndexOf("/") + 1, prefix);
		return sb.toString();
	}

	/**
	 * 파일url에서 파일명뒤에 문자를 추가한다.
	 *
	 * @param fileUrl String
	 * @param postfix String
	 * @return the string
	 */
	public static String addPostfixToFileName(String fileUrl, String postfix) {
		if (fileUrl == null) {
			return null;
		}

		StringBuffer sb = new StringBuffer(fileUrl);
		int dotIdx = sb.lastIndexOf(".", sb.lastIndexOf("/") + 1);
		if (dotIdx == -1) {
			sb.append(postfix);
		} else {
			sb.insert(dotIdx - 1, postfix);
		}
		return sb.toString();
	}

	/**
	 * 유효한 파일명을 리턴한다.
	 *
	 * @param fileName String
	 * @return the valid file name
	 */
	public static String getValidFileName(String fileName) {
		return StringUtils.replace(fileName.trim().replaceAll("[/:*?<>\"|]", ""), "\\", "");
	}

	/**
	 * 특정길이의 유효한 파일명을 리턴한다.
	 *
	 * @param fileName String
	 * @param maxLength int
	 * @return the valid file name
	 */
	public static String getValidFileName(String fileName, int maxLength) {
		String validFileName = getValidFileName(fileName);
		if (validFileName.length() > maxLength) {
			return validFileName.substring(0, maxLength);
		}
		return validFileName;
	}

	/**
	 * 파일명 제거
	 *
	 * @param name String
	 * @return 문자열
	 */
	public static String getCleanFileName(String name) {
		return name.replaceAll("\"", "").replaceAll("/", "").replaceAll(":", "")
				.replaceAll("\\?", "").replaceAll("\\*", "").replaceAll("|", "")
				.replaceAll("\"\"", "").replaceAll("<", "").replaceAll(">", "");
	}

	/**
	 * 중복 dot(마침표) 제거
	 *
	 * @param srcStr String
	 * @return 문자열
	 */
	public static String removeDoublePeriod(String srcStr) {
		while (srcStr.indexOf("..") > -1) {
			srcStr = srcStr.replaceAll("\\.\\.", "\\.");
		}
		return srcStr;
	}

	/**
	 * 현재일 부터 정한 날짜 이전 파일&디렉토리 삭제 메소드.
	 *
	 * @param source 삭제 파일&디렉토리.
	 * @param date 기간 지정
	 * @return boolean 삭제 성공 여부.
	 */
	public static boolean deleteSetPeriod(File source, int date) {
		boolean sucess = false;

		if (source.exists()) {

			if (source.isDirectory()) {
				File[] list = source.listFiles();
				for (int i = 0; i < list.length; i++) {
					File tempFile = new File(source.getPath() + File.separator + list[i].getName());

					SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

					// 파일의 마지막변경일자
					Date fileDate = new Date(tempFile.lastModified());
					String fileDateStr = formatter.format(fileDate);

					// 현재일자에서 date를 빼준다.
					Calendar currentCal = Calendar.getInstance();
					currentCal.add(Calendar.DATE, date);
					String currentDateStr = formatter.format(currentCal.getTime());

					// 현재일자 - date 보다 이전 파일들은 삭제한다.
					if (Integer.parseInt(fileDateStr) < Integer.parseInt(currentDateStr)) {
						sucess = delete(tempFile);
						if (!sucess) {
							break;
						}
					}
				}
			}
		}
		return sucess;
	}

	/**
	 * 폴더를 생성한다.(상위폴더까지)
	 *
	 * @param dirPath String
	 */
	public static void makeFolders(String dirPath) {
		File dir = new File(dirPath);
		if (!dir.exists()) {
			dir.mkdirs();
		}
	}
	public static String uploadIMGURL(String url,String filePathStr,String fileName) throws Exception{
		String fileUrl = "";
		 URL IMGUR = new URL(url);
		  //String fileNameWithoutExtn = fileName.substring(0, fileName.lastIndexOf('.'));
//		  filePathStr = StringUtil.defaultString(PropertyConstants.uploadDir, System.getProperty("java.io.tmpdir"))+File.separator+StringUtil.defaultString(PropertyConstants.mailTempDir,"");
		  	File filePath = new File(filePathStr);
			File fileDir = filePath.getParentFile();
			filePath.mkdirs();
			fileUrl = filePathStr+File.separator+fileName;
			FileOutputStream fos = new FileOutputStream(fileUrl);

			InputStream is = IMGUR.openStream();

			byte[] buf = new byte[1024];

			double len = 0;

			while ((len = is.read(buf)) > 0) {
				fos.write(buf, 0, (int) len);
			}

			fos.close();
			is.close();
		return fileUrl;
	}
	public static String extractParamValue(String text){
		if(text.indexOf(" ") > -1){
			text = text.substring(0,text.indexOf(" "));
		}else if(text.indexOf("&amp;") > -1){
			text = text.substring(0,text.indexOf("&amp;"));
		}else if(text.indexOf("&") > -1){
			text = text.substring(0,text.indexOf("&"));
		}else if(text.indexOf("\"") > -1){
			text = text.substring(0,text.indexOf("\""));
		}else if(text.indexOf("'") > -1){
			text = text.substring(0,text.indexOf("'"));
		}
		return text;
	}
	/**
	 * src 파일 저장
	 * 수정해야함 명석
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public static void saveSrcFile(String url,String filePathStr) throws Exception{
		if(url.indexOf("http://namas.naonsoft.com/ekp/service/file/fileView") > -1){ //에디터에서 삽입된 이미지만 MIME 에 추가한다.
			String imgSrc = url;
			String cmd = imgSrc.substring(imgSrc.indexOf("module=")+7);
			cmd = extractParamValue(cmd);

			String imageName = imgSrc.substring(imgSrc.indexOf("fileName=")+9);
			imageName = extractParamValue(imageName);

			String imagePath = imgSrc.substring(imgSrc.indexOf("fileUrl=")+9);
			imagePath = extractParamValue(imagePath);
			// /root/회사코드/temp/eml/2014/07/05/파일명
//			String root = StringUtil.defaultString(PropertyConstants.uploadDir,"");
			if("emlTemp".equals(cmd)){
//				root = root+File.separator+StringUtil.defaultString(PropertyConstants.mailTempDir,"");
			}
//			imagePath = root+File.separator+imagePath+File.separator+imageName;
			copy(imagePath, filePathStr);
		}else{
			if(url.indexOf("http://my.naonsoft.com") > -1){
				String tmpUrl[] = url.split("&amp;");
				tmpUrl[1] = tmpUrl[1].replaceAll("fileUrl=", "");
				tmpUrl[2] = tmpUrl[2].replaceAll("fileName=", "");
				
				if(tmpUrl[0].indexOf("emlTemp") > -1){
					//메일의 경우 상위 경로가 mailTempDir 안에 첨부된 이미지가 쌓이기 때문에 분기처리.
					url = "http://my.naonsoft.com/ekp/upload/mailTempDir" + tmpUrl[1] + "/" + tmpUrl[2];
				}else{
					url = "http://my.naonsoft.com/ekp/upload" + tmpUrl[1] + "/" + tmpUrl[2];	
				}
			}
			URL IMGUR = new URL(url);
			File nFile = new File(filePathStr);
			InputStream is = IMGUR.openStream();
			FileCopyUtils.copy(is, new FileOutputStream(filePathStr));
			is.close();
		}
	}
	
}
