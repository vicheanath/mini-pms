package com.mini.pms.restcontroller.request;

import com.mini.pms.entity.type.MemberStatus;
import lombok.Data;

@Data
public class MemberRequest {
    private String email;
    private String name;
    private String city;
    private String address;
    private String state;
    private String zip;
    private String phone;
    private MemberStatus status;
}
