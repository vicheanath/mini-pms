package com.mini.pms.entity.type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtInfo {
    private String email;
    private List<SimpleGrantedAuthority> roles;
    private TokenType subject;
}
