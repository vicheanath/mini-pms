package com.mini.pms.restcontroller.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OfferResponse {
    private long id;
    private MemberResponse customer;
    private PropertyResponse property;
    private String remark;
    private String status;
    private Double price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
