package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Property;
import com.mini.pms.repo.PictureRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.restcontroller.request.PropertyRequest;
import com.mini.pms.service.MemberService;
import com.mini.pms.service.PictureService;
import com.mini.pms.service.PropertyService;
import com.mini.pms.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepo propertyRepo;
    private final MemberService memberService;
    private final PictureService picService;
    private final PictureRepo picRepo;

    @Override
    public Page<Property> findAll(Long memberId, String search, Double minPrice, Double maxPrice, String category, String type, String numberOfRoom, String location, Pageable pageable, Principal principal) {

        Specification<Property> spec = Specification.allOf();

        if (Objects.nonNull(memberId)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("email"), principal.getName()));
        }


        if (Objects.nonNull(search)) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.and(
                            criteriaBuilder.like(
                                    criteriaBuilder.lower(root.get("location")), "%" + search.toLowerCase() + "%")
                    )
            );
        }

        if (Objects.nonNull(minPrice)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (Objects.nonNull(maxPrice)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (Objects.nonNull(category)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category"), category));
        }

        if (Objects.nonNull(type)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("type"), type));
        }

        if (Objects.nonNull(numberOfRoom)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("numberOfRoom"), numberOfRoom));
        }

        if (Objects.nonNull(location)) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("location"), location));
        }


        var props = propertyRepo.findAll(spec, pageable);

        if (Objects.nonNull(principal)) {
            props = props.map(p -> {
                p.setFavorite(p.getFavorites().stream().anyMatch(
                        f -> f.getMember().getEmail().equals(principal.getName())
                ));
                return p;
            });
        }

        return props;
    }

    @Override
    public Property findById(long id) {
        return propertyRepo.findById(id).orElseThrow(() -> new PlatformException("Property not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Property createProperty(PropertyRequest propertyRequest, Principal principal) {

        var owner = memberService.findByEmail(principal.getName());

        if (owner.getRoles().stream().noneMatch(r -> Objects.equals(r.getName(), "Owner"))) {
            throw new PlatformException("Only owner role is allowed to create a property", HttpStatus.BAD_REQUEST);
        }

        var requestProp = Util.mapObj(propertyRequest, Property.class);
        requestProp.setOwner(owner);

        var prop = propertyRepo.save(requestProp);

        var pics = picService.updateByProperty(prop, propertyRequest.getPictures());
        prop.setPictures(pics);

        return prop;
    }

    @Override

    public Property updateProperty(long id, PropertyRequest propertyRequest, Principal principal) {
        var prop = findById(id);

        if (!prop.getOwner().getEmail().equals(principal.getName())) {
            throw new PlatformException("Invalid Property's Owner", HttpStatus.BAD_REQUEST);
        }

        prop.setTitle(propertyRequest.getTitle());
        prop.setPrice(propertyRequest.getPrice());
        prop.setLocation(propertyRequest.getLocation());
        prop.setDescription(propertyRequest.getDescription());
        prop.setCategory(propertyRequest.getCategory());
        prop.setSubCategory(propertyRequest.getSubCategory());
        prop.setType(propertyRequest.getType());
        prop.setNumberOfRoom(propertyRequest.getNumberOfRoom());
        prop.setLatitude(propertyRequest.getLatitude());
        prop.setLongitude(propertyRequest.getLongitude());


        var pics = picService.updateByProperty(prop, propertyRequest.getPictures());
        prop.setPictures(pics);

        return propertyRepo.save(prop);
    }
}
