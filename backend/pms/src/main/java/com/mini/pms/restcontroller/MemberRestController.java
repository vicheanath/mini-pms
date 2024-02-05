package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.service.AuthService;
import com.mini.pms.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class MemberRestController {

     private final MemberService memberService;
     private final AuthService authService;
     @GetMapping("/profile")
    public Member profile() {
         Member member = authService.getAuthenticatedUser();
        return memberService.profile(member.getId());
    }

}
