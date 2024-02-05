package com.mini.pms.restcontroller;

import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.response.TokenResponse;
import com.mini.pms.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("token")
    @ResponseStatus(HttpStatus.OK)
    public TokenResponse token(@RequestBody AuthRequest authRequest) {
        return authService.issueAccessToken(authRequest);
    }

    //    @PostMapping("/token/refresh")
    //    public String refresh(@RequestBody AuthRequest authRequest) {
    //        return authService.issueAccessToken(authRequest);
    //    }

}
