package com.mini.pms.service;

import com.mini.pms.entity.Picture;
import com.mini.pms.entity.Property;
import com.mini.pms.restcontroller.response.DownloadFileInfo;
import com.mini.pms.restcontroller.response.UploadFileInfo;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.Principal;
import java.util.List;

public interface PictureService {
    UploadFileInfo upload(MultipartFile file, Principal principal)
        throws IOException;

    DownloadFileInfo download(String key) throws MalformedURLException;

    Picture findByKey(String key);

    List<Picture> findByKey(List<String> keys);

    @Transactional
    List<Picture> updateByProperty(Property property, List<String> pictures);
}
