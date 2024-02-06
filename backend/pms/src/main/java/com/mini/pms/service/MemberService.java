package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.restcontroller.request.ChangePasswordRequest;
import com.mini.pms.restcontroller.request.ForgotPasswordRequest;

import java.util.List;

public interface MemberService {
    Member findByEmail(String email);

    Member profile(long id);

    List<Member> findAll();

    Member findById(Long id);

    Member update(Long id, Member member);

    String changePassword(ChangePasswordRequest changePasswordRequest);


    String forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    String resetPassword(String email, String password);

}
