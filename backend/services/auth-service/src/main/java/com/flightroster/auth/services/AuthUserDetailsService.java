package com.flightroster.auth.services;

// ===== Imports =====

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.mapper.AuthMapper; // Mapper eklendi
import com.flightroster.auth.repositories.AuthUserRepository;

import lombok.RequiredArgsConstructor;

// ===========================================
// Service to load user details for authentication
// ===========================================

@Service
@RequiredArgsConstructor
public class AuthUserDetailsService implements UserDetailsService
{
    private final AuthUserRepository userRepository;
    private final AuthMapper authMapper; // Mapper inject edildi

    /**
     * Loads user details by email for authentication.
	 * 
     * @param email (String): The email of the user to load
	 * 
     * @return UserDetails containing user information for authentication
	 * 
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        AuthUser user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return (authMapper.toUserDetails(user));
    }
}