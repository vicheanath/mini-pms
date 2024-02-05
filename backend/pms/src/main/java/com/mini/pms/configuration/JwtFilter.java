package com.mini.pms.configuration;

import com.mini.pms.entity.type.JwtInfo;
import com.mini.pms.service.VerifyJwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final VerifyJwtService verifyJwtService;
    private final UserDetailsService detailsService;
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {

        try {
            var authorize = request.getHeader(HttpHeaders.AUTHORIZATION);

            if (Objects.nonNull(authorize) && authorize.startsWith("Bearer ")) {
                var jwtInfo = extractJwt(authorize);
                var member = detailsService.loadUserByUsername(jwtInfo.getEmail());
                var authentication =
                        UsernamePasswordAuthenticationToken.authenticated(
                                jwtInfo.getEmail(), member.getPassword(), jwtInfo.getRoles());
                authentication.setDetails(member.getUsername());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }

    private JwtInfo extractJwt(String authorize) {
        var jwtToken = authorize.substring(7);
        var jwtInfo = verifyJwtService.verifyToken(jwtToken);
        return jwtInfo;
    }
}
