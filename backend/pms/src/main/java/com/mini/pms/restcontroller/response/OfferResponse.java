package com.mini.pms.restcontroller.response;

import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import lombok.Data;

@Data
public class OfferResponse {
    private long id;
    private long customerId;
    private long propertyId;
    private String remark;
    private String status;
}
