package com.mini.pms.restcontroller.request;

import lombok.Data;

@Data
public class AuthRequest {

    String email;
    String password;

}
