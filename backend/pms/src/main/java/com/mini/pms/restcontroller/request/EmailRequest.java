package com.mini.pms.restcontroller.request;

import lombok.Data;

@Data
public class EmailRequest {

    private String title;
    private String content;
    private String recipient;

}
