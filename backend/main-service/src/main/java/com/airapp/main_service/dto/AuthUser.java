package com.airapp.main_service.dto;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthUser
{
    private final Long userId;
    private final String username;
    private final List<String> roles;

    public Collection<GrantedAuthority> toAuthorities()
    {
        return roles.stream()
            .map(role -> (GrantedAuthority) new SimpleGrantedAuthority(role))
            .toList();
    }

}
