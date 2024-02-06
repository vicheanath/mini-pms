package com.mini.pms.restcontroller.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.mini.pms.entity.Role;
import lombok.Data;

import java.util.List;
import java.util.Map;


@Data
public class MemberResponse {
    private long id;
    private String email;
    private String name;
    private List<Role> roles;
    private String city;
    private String address;
    private String state;
    private String zip;
    private String status;
    private String phone;

    @JsonGetter("roles")
    public List<Map<String, String>> getRoles() {
        return roles.stream().map(m -> Map.of("role", m.getName())).toList();
    }

}
