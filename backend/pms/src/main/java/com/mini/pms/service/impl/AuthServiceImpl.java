package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.type.TokenType;
import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.response.TokenResponse;
import com.mini.pms.service.AuthService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${jwt.secret}")
    private String secret;

    private final long ACCESS_TOKEN_EXPIRED = 1000 * 60 * 10; // 10mn
    private final long REFRESH_TOKEN_EXPIRED = 1000 * 60 * 20; // 20mn

    private final AuthenticationManager authManager;

    @Override
    public Authentication authenticate(String email, String password) {
        var context = SecurityContextHolder.getContext();
        var authPayload =
                UsernamePasswordAuthenticationToken.authenticated(
                        email, password, Collections.emptyList());

        try {
            Authentication auth = authManager.authenticate(authPayload);
            context.setAuthentication(auth);
            return auth;
        } catch (AuthenticationException e) {
            throw new PlatformException("incorrect username and password", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public String createToken(AuthRequest authRequest, TokenType tokenType, long expired) {
        var email = authRequest.getEmail();
        var password = authRequest.getPassword();

        var auth = authenticate(email, password);

        var now = new Date();
        var expireAt = new Date(now.getTime());
        expireAt.setTime(expireAt.getTime() + expired);

        List<Map<String, String>> roles =
                auth.getAuthorities().stream().map(m -> Map.of("role", m.getAuthority())).toList();
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("roles", roles);
        claims.put("subject", tokenType.name());

        var jwt =
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(now)
                        .setExpiration(expireAt)
                        .signWith(SignatureAlgorithm.HS512, secret)
                        .compact();

        return jwt;
    }

    @Override
    public TokenResponse issueAccessToken(AuthRequest authRequest) {

        var tokenRes = TokenResponse.builder();

        tokenRes.accessToken(createToken(authRequest, TokenType.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRED))
                .refreshToken(
                        createToken(authRequest, TokenType.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED));

        return tokenRes.build();
    }
}
