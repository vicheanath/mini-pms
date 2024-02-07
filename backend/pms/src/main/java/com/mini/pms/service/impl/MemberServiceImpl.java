package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.PasswordResetToken;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.repo.PasswordResetTokenRepo;
import com.mini.pms.restcontroller.request.ChangePasswordRequest;
import com.mini.pms.restcontroller.request.ForgotPasswordRequest;
import com.mini.pms.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    @Value("${spring.reset-password-url}")
    private String resetPasswordUrl;
    private final MemberRepo memberRepo;
    private final PasswordResetTokenRepo passwordTokenRepository;
    private final EmailServiceImpl emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Member findByEmail(String email) {
        return memberRepo
                .findByEmail(email)
                .orElseThrow(() -> new PlatformException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Member profile(long id) {
        return memberRepo
                .findById(id)
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
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
    @Transactional
    public String changePassword(ChangePasswordRequest changePasswordRequest) {
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmNewPassword()))
            throw new PlatformException("Password does not match", HttpStatus.BAD_REQUEST);
        String token = validatePasswordResetToken(changePasswordRequest.getToken());
        if (token != null) {
            throw new PlatformException("Invalid or expired token", HttpStatus.BAD_REQUEST);
        }

         // change password
        Member member = getUserByPasswordResetToken(changePasswordRequest.getToken())
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
        member.setPassword(bCryptPasswordEncoder.encode(changePasswordRequest.getNewPassword()));
        memberRepo.save(member);
        return "Password changed successfully";
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Member member = memberRepo
                .findByEmail(forgotPasswordRequest.getEmail())
                .orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        String token = UUID.randomUUID().toString();
        createPasswordResetTokenForUser(member, token);

//        write email content render it as html
        String content = "<html><body>"
                + "<h1>Reset Password</h1>"
                + "<p>Click the link below to reset your password</p>"
                + "<a href='" + resetPasswordUrl + "?token=" + token + "'>Reset Password</a>"
                + "</body></html>";


        emailService.sendSimpleMail("PMS Reset Password", content, member.getEmail());
       // send email to reset password
        return "Reset password link sent to your email :" + member.getEmail();
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
        myToken.setToken(token);
        myToken.setUser(user);
//        set expiry date in 1 hour
        myToken.setExpiryDate( new Date(System.currentTimeMillis() + 3600000));
        passwordTokenRepository.save(myToken);
    }

    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

        return !isTokenFound(passToken) ? "invalidToken"
                : isTokenExpired(passToken) ? "expired"
                : null;
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }

    private Optional<Member> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordTokenRepository.findByToken(token).getUser());
    }
}
