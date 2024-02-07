package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.request.ChangePasswordRequest;
import com.mini.pms.restcontroller.request.ForgotPasswordRequest;
import com.mini.pms.restcontroller.request.RegisterRequest;
import com.mini.pms.restcontroller.response.MemberResponse;
import com.mini.pms.restcontroller.response.TokenResponse;
import com.mini.pms.service.AuthService;

import com.mini.pms.service.MemberService;
import com.mini.pms.util.Util;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;
    private final MemberService memberService;
    @PostMapping("token")
    @ResponseStatus(HttpStatus.OK)
    public TokenResponse token(@RequestBody AuthRequest authRequest) {
        return authService.issueAccessToken(authRequest);
    }

    //    @PostMapping("/token/refresh")
    //    public String refresh(@RequestBody AuthRequest authRequest) {
    //        return authService.issueAccessToken(authRequest);
    //    }

    @PostMapping("owner/register")
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponse registerOwner(@RequestBody RegisterRequest registerRequest) {
        return Util.mapObj(authService.registerOwner(registerRequest), MemberResponse.class);
    }

    @PostMapping("customer/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Member registerCustomer(@RequestBody RegisterRequest registerRequest) {
       return authService.registerCustomer(registerRequest);
    }
    @PutMapping("change-password")
    @Transactional
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordRequest) {
        var s = memberService.changePassword(passwordRequest);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return new ResponseEntity<>(memberService.forgotPassword(forgotPasswordRequest), HttpStatus.OK);
    }
}
