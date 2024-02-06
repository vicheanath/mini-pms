package com.mini.pms.restcontroller.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadFileInfo {
    private String url;
    private String key;
}
