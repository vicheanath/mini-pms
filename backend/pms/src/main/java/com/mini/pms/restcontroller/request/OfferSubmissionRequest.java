package com.mini.pms.restcontroller.request;

import lombok.Data;

@Data
public class OfferSubmissionRequest {
    private Long customerId;
    private Long propertyId;
    private String remark;
    private Double price;
}
