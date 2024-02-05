package com.mini.pms.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/private")
public class PrivateRestController {

    @GetMapping
    public String success(
            Principal principal
    ) {
        return "Success!";
    }
}
