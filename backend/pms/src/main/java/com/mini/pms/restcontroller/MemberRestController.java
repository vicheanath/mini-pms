package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.service.AuthService;
import com.mini.pms.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(String password) {
        Member m = authService.getAuthenticatedUser();
        return new ResponseEntity<>(memberService.changePassword(m.getId(), password), HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(String email) {
        return new ResponseEntity<>(memberService.forgotPassword(email), HttpStatus.OK);
    }




}
