package com.mini.pms.service;

import com.mini.pms.restcontroller.response.FileInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.Principal;

public interface PictureService {
    String upload(MultipartFile file, long propertyId, Principal principal)
        throws IOException;

    FileInfo download(String key) throws MalformedURLException;
}
