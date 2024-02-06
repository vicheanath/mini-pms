package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.service.AuthService;
import com.mini.pms.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
     @PutMapping("/profile")
     public Member updateProfile(@RequestBody Member member) {
         Member m = authService.getAuthenticatedUser();
         return memberService.update(m.getId(), member);
     }

    @GetMapping("/change-password")
    public String changePassword(String password) {
        Member m = authService.getAuthenticatedUser();
        return memberService.changePassword(m.getId(), password);
    }


}
