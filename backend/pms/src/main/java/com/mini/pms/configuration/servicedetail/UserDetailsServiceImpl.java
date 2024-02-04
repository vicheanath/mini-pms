package com.mini.pms.configuration.servicedetail;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepo memberRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var member =
                memberRepo
                        .findByEmail(username)
                        .orElseThrow(() -> new PlatformException("", HttpStatus.NOT_FOUND));
        return new CustomizeUserDetails(member);
    }
}
