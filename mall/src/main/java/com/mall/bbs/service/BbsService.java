package com.mall.bbs.service;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mall.bbs.vo.BbsVo;

@Repository(value = "bbsMapper")
@Transactional
public interface BbsService {
    List<BbsVo> select();

    BbsVo selectOne(int idx);
    void insert(BbsVo bbsVo) throws Exception;
    void update(BbsVo bbsVo) throws Exception;
    void delete(int idx) throws Exception;
}