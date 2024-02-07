package com.mini.pms.service;

import com.mini.pms.entity.Property;
import com.mini.pms.restcontroller.request.PropertyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface PropertyService {

    Page<Property> findAll(String search, Double minPrice, Double maxPrice, String category, String type, String numberOfRoom, String location, Pageable pageable, Principal principal);

    Property findById(long id);

    Property createProperty(PropertyRequest propertyRequest, Principal principal);
}
