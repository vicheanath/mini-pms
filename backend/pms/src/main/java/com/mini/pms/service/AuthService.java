package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.type.TokenType;
import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.request.RegisterRequest;
import com.mini.pms.restcontroller.response.TokenResponse;
import org.springframework.security.core.Authentication;

public interface AuthService {
    Member getAuthenticatedUser();
    Authentication authenticate(String email, String password);

    String createToken(AuthRequest authRequest, TokenType tokenType, long expired);

    TokenResponse issueAccessToken(AuthRequest authRequest);

    Member registerCustomer(RegisterRequest authRequest);

    Member registerOwner(RegisterRequest authRequest);

    Member registerAdmin(RegisterRequest authRequest);
}
