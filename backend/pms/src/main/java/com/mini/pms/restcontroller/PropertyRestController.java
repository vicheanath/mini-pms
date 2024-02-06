package com.mini.pms.restcontroller;


import com.mini.pms.restcontroller.response.PageResponse;
import com.mini.pms.restcontroller.response.PropertyResponse;
import com.mini.pms.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/v1/properties")
@RequiredArgsConstructor
public class PropertyRestController {

    private final PropertyService propService;

    @GetMapping
    public ResponseEntity<PageResponse> findAllProps(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "numberOfRoom", required = false) String numberOfRoom,
            @RequestParam(value = "location", required = false) String location,

            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable,
            Principal principal
    ) {
        var props = propService.findAll(
                search,
                minPrice,
                maxPrice,
                category,
                type,
                numberOfRoom,
                location,
                pageable,
                principal
        );

        return ResponseEntity.ok(new PageResponse(props, PropertyResponse.class));
    }

}
