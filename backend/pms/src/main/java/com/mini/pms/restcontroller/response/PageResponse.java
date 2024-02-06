package com.mini.pms.restcontroller.response;

import com.mini.pms.util.Util;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageResponse {
    @Setter
    private List<?> data;
    private long size;
    private int page;
    private long totalElement;
    private long totalPage;
    private boolean isLast;
    private boolean isFirst;
    private boolean isEmpty;
    private boolean hasNext;
    private boolean hasPrevious;

    public PageResponse(Page<?> page, Class<?> t) {
        this.data = Util.mapList(page.getContent(), t);
        this.size = page.getSize();
        this.page = page.getNumber();
        this.totalElement = page.getTotalElements();
        this.totalPage = page.getTotalPages();
        this.isLast = page.isLast();
        this.isFirst = page.isFirst();
        this.isEmpty = page.isEmpty();
        this.hasNext = page.hasNext();
        this.hasPrevious = page.hasPrevious();
    }
}
