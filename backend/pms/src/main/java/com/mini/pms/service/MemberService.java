package com.mini.pms.service;

import com.mini.pms.entity.Member;

import java.util.List;

public interface MemberService {
    Member findByEmail(String email);

    Member profile(long id);

    List<Member> findAll();

    Member findById(Long id);

    Member update(Long id, Member member);

    String changePassword(Long id, String password);


    String forgotPassword(String email);

    String resetPassword(String email, String password);

}
