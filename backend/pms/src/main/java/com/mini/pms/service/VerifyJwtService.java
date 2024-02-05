package com.mini.pms.service;


import com.mini.pms.entity.type.JwtInfo;

public interface VerifyJwtService {

    JwtInfo verifyToken(String jwtToken);
}
