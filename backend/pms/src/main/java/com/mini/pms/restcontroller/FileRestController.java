package com.mini.pms.restcontroller;

import com.mini.pms.restcontroller.response.UploadFileInfo;
import com.mini.pms.service.PictureService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("api/v1/files")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FileRestController {

    private final PictureService picService;

    @PostMapping( "upload")
    public UploadFileInfo upload(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
        return picService.upload(file, principal);
    }

    @GetMapping(
            value = "/{key}/download",
            produces = {
                MediaType.IMAGE_PNG_VALUE,
                MediaType.IMAGE_JPEG_VALUE,
                MediaType.IMAGE_GIF_VALUE,

                // MediaType.APPLICATION_OCTET_STREAM_VALUE //will download immediately
            })
    public ResponseEntity<Resource> download(@PathVariable("key") String key) throws IOException {

        var fileInfo = picService.download(key);
        var filename = fileInfo.getPicture().getName();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(fileInfo.getResource());
    }
}
