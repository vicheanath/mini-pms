package com.mini.pms.restcontroller.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OfferResponse {
    private long id;
    private long customerId;
    private long propertyId;
    private String remark;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
