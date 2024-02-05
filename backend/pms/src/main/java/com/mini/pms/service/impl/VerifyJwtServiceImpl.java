package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.JwtInfo;
import com.mini.pms.entity.TokenType;
import com.mini.pms.service.VerifyJwtService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VerifyJwtServiceImpl implements VerifyJwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Override
    public JwtInfo verifyToken(String jwtToken) {

        try {

            var jwt = Jwts.parser()
                    .setSigningKey(secret).parseClaimsJws(jwtToken);

            var body = jwt.getBody();
            var subject = TokenType.valueOf(body.get("subject").toString());
            var email = String.valueOf(body.get("email"));
            var roles =
                    ((List<Map>) body.get("roles"))
                            .stream()
                                    .map(
                                            m ->
                                                    new SimpleGrantedAuthority(
                                                            String.valueOf(m.get("role"))))
                                    .toList();

            return JwtInfo.builder().subject(subject).email(email).roles(roles).build();

        } catch (ExpiredJwtException e) {
            throw new PlatformException("Token expired", HttpStatus.UNAUTHORIZED);
        } catch (JwtException e) {
            throw new PlatformException("Invalid Token", HttpStatus.UNAUTHORIZED);
        }
    }
}
