package com.mini.pms.service;

import com.mini.pms.restcontroller.response.DownloadFileInfo;
import com.mini.pms.restcontroller.response.UploadFileInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.Principal;

public interface PictureService {
    UploadFileInfo upload(MultipartFile file, long propertyId, Principal principal)
        throws IOException;

    DownloadFileInfo download(String key) throws MalformedURLException;
}
