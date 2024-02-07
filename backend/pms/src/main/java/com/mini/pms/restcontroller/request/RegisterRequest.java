package com.mini.pms.restcontroller.request;

import com.mini.pms.entity.type.MemberStatus;
import lombok.Data;

@Data
public class RegisterRequest {
     private String name;
     private String email;
     private String password;
     private String role;
     private MemberStatus status;
}
