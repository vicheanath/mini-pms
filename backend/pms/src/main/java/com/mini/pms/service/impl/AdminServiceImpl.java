package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.type.MemberStatus;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.service.AdminService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final MemberRepo memberRepo;

    @Override
    public Page<Member> findAll(String role, Pageable pageable, Principal principal) {

        Specification<Member> spec = Specification.allOf();

        if (Objects.nonNull(role)) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.join("roles").get("name"), role));
        }

        return memberRepo.findAll(spec, pageable);
    }

    public Member findById(long id) {
        return memberRepo.findById(id)
                .orElseThrow(() -> new PlatformException("User not found", HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public void approve(long id) {
        var member = findById(id);

        if (MemberStatus.ACTIVATED.equals(member.getStatus())) {
            throw new PlatformException("Member is already activated", HttpStatus.BAD_REQUEST);
        }

        member.setStatus(MemberStatus.ACTIVATED);
        memberRepo.save(member);
    }

}
