package com.mini.pms.restcontroller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmailRequest {

    private String title;
    private String content;

    @NotNull
    private String recipient;

}
