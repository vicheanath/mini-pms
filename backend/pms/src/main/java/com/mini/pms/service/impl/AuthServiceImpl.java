package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.Role;
import com.mini.pms.entity.type.MemberStatus;
import com.mini.pms.entity.type.TokenType;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.repo.RoleRepo;
import com.mini.pms.restcontroller.request.AuthRequest;
import com.mini.pms.restcontroller.request.RegisterRequest;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    @Value("${jwt.secret}")
    private String secret;
    // 3 seconds for testing
    private final long ACCESS_TOKEN_EXPIRED = 1000 * 3; // 3s
    private final long REFRESH_TOKEN_EXPIRED = 1000 * 60 * 20; // 20mn

    private final AuthenticationManager authManager;

    private final BCryptPasswordEncoder passwordEncoder;

    private final RoleRepo roleRepo;
    private final MemberRepo memberRepo;


    @Override
    public Member getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return memberRepo.findByEmail(authentication.getName()).orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
    }

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
    public String createToken(Authentication auth, String email, TokenType tokenType, long expired) {

        if (!auth.isAuthenticated()) {
            throw new PlatformException("Unauthorized user", HttpStatus.UNAUTHORIZED);
        }

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

        var email = authRequest.getEmail();
        var password = authRequest.getPassword();
        var auth = authenticate(email, password);
        tokenRes.accessToken(createToken(auth, email, TokenType.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRED))
                .refreshToken(
                        createToken(auth, email, TokenType.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED));

        return tokenRes.build();
    }

    @Override
    public TokenResponse issueAccessToken(Principal principal) {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        var tokenRes = TokenResponse.builder();

        tokenRes.accessToken(createToken(auth, principal.getName(), TokenType.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRED))
                .refreshToken(
                        createToken(auth, principal.getName(), TokenType.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED));

        return tokenRes.build();
    }

    @Override
    public Member registerCustomer(RegisterRequest authRequest) {
        authRequest.setRole("Customer");
        return register(authRequest);
    }

    @Override
    public Member registerOwner(RegisterRequest authRequest) {
        authRequest.setRole("Owner");
        authRequest.setStatus(MemberStatus.INACTIVE);
        return register(authRequest);
    }

    @Override
    public Member registerAdmin(RegisterRequest authRequest) {
        authRequest.setRole("Admin");
        return register(authRequest);
    }

    private Member register(RegisterRequest authRequest) {
        Role role = roleRepo.findByName(authRequest.getRole());
        Member member = Member.builder()
                .name(authRequest.getName())
                .email(authRequest.getEmail())
                .status(authRequest.getStatus())
                .password(passwordEncoder.encode(authRequest.getPassword()))
                .roles(List.of(role))
                .build();
        return memberRepo.save(member);
    }

}
