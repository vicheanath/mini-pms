package com.mini.pms.restcontroller;

import com.mini.pms.restcontroller.response.TokenResponse;
import com.mini.pms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
@RequestMapping("api/v1/token/refresh")
@RequiredArgsConstructor
public class AuthRenewTokenRestController {

    private final AuthService authService;

    @PostMapping
    public TokenResponse refresh(Principal principal) {

        return authService.issueAccessToken(principal);
    }

}
