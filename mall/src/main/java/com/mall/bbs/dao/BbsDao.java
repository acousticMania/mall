package com.mall.bbs.dao;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.bbs.service.BbsService;
import com.mall.bbs.vo.BbsVo;

@Service(value = "bbsDao")
public class BbsDao {
    @Resource(name = "bbsMapper")
    private BbsService bbsMapper;

    public List<BbsVo> getSelect() {
        return this.bbsMapper.select();
    }

    public BbsVo getSelectOne(int idx) {
        return this.bbsMapper.selectOne(idx);
    }

    public void insert(BbsVo bbsVo) throws Exception {
         this.bbsMapper.insert(bbsVo);
    }

    public void update(BbsVo bbsVo) throws Exception {
         this.bbsMapper.update(bbsVo);
    }

    public void delete(int idx) throws Exception {
         this.bbsMapper.delete(idx);
    }
}
