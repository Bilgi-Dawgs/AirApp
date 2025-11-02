package com.flightroster.auth.services;

// ===== Imports =====

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.repositories.AuthUserRepository;

import lombok.RequiredArgsConstructor;

// ===== Class =====

@Service
@RequiredArgsConstructor
public class AuthUserDetailsService implements UserDetailsService
{
	private final AuthUserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
	{
		AuthUser user = userRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

		return (User.builder()
			.username(user.getEmail())
			.password(user.getPasswordHash())
			.roles(user.getRole().name())
			.build());
	}
}
