package com.mini.pms.restcontroller;

import com.mini.pms.restcontroller.response.MemberResponse;
import com.mini.pms.restcontroller.response.PageResponse;
import com.mini.pms.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/v1/admins")
@RequiredArgsConstructor
public class AdminRestController {

    private final AdminService adminService;

    @GetMapping("users")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse findAll(
            @RequestParam(value = "role", required = false) String role,

            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable,
            Principal principal
    ) {
        var members = adminService.findAll(role, pageable, principal);
        return new PageResponse(members, MemberResponse.class);
    }

    @PostMapping("users/{id}/approve")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void approve(@PathVariable("id") long id) {
        adminService.approve(id);
    }

}
