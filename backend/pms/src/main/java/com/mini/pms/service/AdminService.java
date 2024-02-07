package com.mini.pms.service;

import com.mini.pms.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface AdminService {
    Page<Member> findAll(String role, Pageable pageable, Principal principal);

    @Transactional
    void approve(long id);
}
