package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.restcontroller.response.MemberResponse;
import com.mini.pms.service.AuthService;
import com.mini.pms.service.MemberService;
import com.mini.pms.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class MemberRestController {

    private final MemberService memberService;
    private final AuthService authService;

    @GetMapping("/profile")
    public MemberResponse profile() {
        Member member = authService.getAuthenticatedUser();
        return Util.mapObj(member, MemberResponse.class);
    }

    @PutMapping("/profile")
    public Member updateProfile(@RequestBody Member member) {
        Member m = authService.getAuthenticatedUser();
        return memberService.update(m.getId(), member);
    }


}
