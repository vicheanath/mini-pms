package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.PasswordResetToken;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.repo.PasswordResetTokenRepo;
import com.mini.pms.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepo memberRepo;
    private final PasswordResetTokenRepo passwordTokenRepository;
    @Override
    public Member findByEmail(String email) {
        return memberRepo
                .findByEmail(email)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Member profile(long id) {
        return memberRepo
                .findById(id)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<Member> findAll() {
        return memberRepo.findAll();
    }

    @Override
    public Member findById(Long id) {
        return memberRepo
                .findById(id)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Member update(Long id, Member member) {
        Member m = memberRepo
                .findById(id)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        m.setPhone(member.getPhone());
        m.setAddress(member.getAddress());
        m.setCity(member.getCity());
        m.setState(member.getState());
        m.setZip(member.getZip());

        return  memberRepo.save(m);

    }

    @Override
    public String changePassword(Long id, String password) {
         // change password
        Member member = memberRepo
                .findById(id)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        member.setPassword(password);

        memberRepo.save(member);
        return "Password changed successfully";
    }

    @Override
    public String forgotPassword(String email) {
        Member member = memberRepo
                .findByEmail(email)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        String token = UUID.randomUUID().toString();
        createPasswordResetTokenForUser(member, token);

       // send email to reset password
        return "Email sent successfully";
    }

    @Override
    public String resetPassword(String email, String password) {
        // reset password
        Member member = memberRepo
                .findByEmail(email)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        member.setPassword(password);
        memberRepo.save(member);
        return "Password reset successfully";
    }

    public void createPasswordResetTokenForUser(Member user, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        passwordTokenRepository.save(myToken);
    }
}
