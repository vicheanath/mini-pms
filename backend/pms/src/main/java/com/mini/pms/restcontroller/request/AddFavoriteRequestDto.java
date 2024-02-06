package com.mini.pms.restcontroller.request;

import lombok.Data;

@Data
public class AddFavoriteRequestDto {
    private long propertyId;
    private long memberId;
}
