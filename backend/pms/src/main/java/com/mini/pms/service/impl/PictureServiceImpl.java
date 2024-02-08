package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Picture;
import com.mini.pms.entity.Property;
import com.mini.pms.repo.PictureRepo;
import com.mini.pms.restcontroller.FileRestController;
import com.mini.pms.restcontroller.response.DownloadFileInfo;
import com.mini.pms.restcontroller.response.UploadFileInfo;
import com.mini.pms.service.PictureService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PictureServiceImpl implements PictureService {

    private final String DIR = "src/main/resources/zfilestorage";

    private final PictureRepo picRepo;
    private final EntityManager em;

    @Override
    public UploadFileInfo upload(MultipartFile file, Principal principal)
            throws IOException {

        var key = UUID.randomUUID().toString();
        writeFile(file.getInputStream(), key);
        var name = file.getOriginalFilename();
        var size = file.getSize();

        String url =
                MvcUriComponentsBuilder.fromMethodName(FileRestController.class, "download", key)
                        .build()
                        .toString();

        var pic = Picture.builder()
                .key(key)
                .name(name)
                .size(size)
                .url(url)
                .build();

        var a = picRepo.save(pic);
        System.out.println(a);
        return new UploadFileInfo(url, key);
    }

    @Override
    public DownloadFileInfo download(String key) throws MalformedURLException {

        var pic =
                picRepo.findByKey(key)
                        .orElseThrow(
                                () ->
                                        new PlatformException(
                                                "File not found", HttpStatus.NOT_FOUND));

        final Path uploadPath = Paths.get(DIR);
        Path path = uploadPath.resolve(key);
        var resource = new UrlResource(path.toUri());

        return new DownloadFileInfo(resource, pic);
    }

    @Override
    public Picture findByKey(String key) {
        var pic = picRepo.findByKey(key)
                .orElseThrow(() -> new PlatformException("Picture not found", HttpStatus.NOT_FOUND));
        return pic;
    }

    @Override
    public List<Picture> findByKey(List<String> keys) {
        return picRepo.findByKeyIn(keys);
    }

    @Override
    @Transactional
    public List<Picture> updateByProperty(Property property, List<String> keys) {

        List<Picture> existingPics = findByKey(keys);

        var existingKeys = existingPics.stream().map(Picture::getKey).toList();
        if (existingPics.size() != keys.size()) {
            var notFoundKeys = keys.stream().filter(k -> existingKeys.stream().noneMatch(f -> f.equals(k))).toList();
            throw new PlatformException("keys: " + notFoundKeys + " are not found", HttpStatus.BAD_REQUEST);
        }

        var unMatchOwnerKeys = existingPics.stream()
                .filter(f -> !(Objects.isNull(f.getProperty()) || f.getProperty().getId() == property.getId()))
                .map(Picture::getKey)
                .toList();
        if (!unMatchOwnerKeys.isEmpty()) {
            throw new PlatformException("keys: " + unMatchOwnerKeys + " key already join to another property", HttpStatus.BAD_REQUEST);
        }

        existingPics = existingPics.stream().peek(p -> p.setProperty(property)).toList();
        return picRepo.saveAll(existingPics);
    }

    private void writeFile(InputStream file, String key) throws IOException {

        final Path uploadPath = Paths.get(DIR);
        Path path = uploadPath.resolve(key);
        Files.copy(file, Path.of(path.toUri()), StandardCopyOption.REPLACE_EXISTING);
    }
}
