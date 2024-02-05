package com.mini.pms.service;

import com.mini.pms.entity.Member;

public interface MemberService {
    Member findByEmail(String email);
}
