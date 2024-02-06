package com.mini.pms.restcontroller.response;

import com.mini.pms.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.Resource;

@Data
@AllArgsConstructor
public class DownloadFileInfo {
    private Resource resource;
    private Picture picture;
}
