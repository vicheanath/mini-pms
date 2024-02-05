package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepo memberRepo;

    @Override
    public Member findByEmail(String email) {
        return memberRepo
                .findByEmail(email)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
    }
}
