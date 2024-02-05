package com.mini.pms.service;

import com.mini.pms.entity.type.TokenType;
import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.response.TokenResponse;
import org.springframework.security.core.Authentication;

public interface AuthService {
    Authentication authenticate(String email, String password);

    String createToken(AuthRequest authRequest, TokenType tokenType, long expired);

    TokenResponse issueAccessToken(AuthRequest authRequest);
}
