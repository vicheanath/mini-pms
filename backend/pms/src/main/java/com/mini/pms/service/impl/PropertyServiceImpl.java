package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Property;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.service.PropertyService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepo propertyRepo;

    @Override
    public Property findById(long id) {
        return propertyRepo
                .findById(id)
                .orElseThrow(
                        () -> new PlatformException("Property not found", HttpStatus.NOT_FOUND));
    }
}
