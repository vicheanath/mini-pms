package com.mini.pms.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/owners")
public class OwnerRestController {

    @GetMapping
    public String owners() {
        return "owners";
    }

}
