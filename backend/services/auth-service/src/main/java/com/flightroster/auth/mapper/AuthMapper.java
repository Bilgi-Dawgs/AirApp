package com.flightroster.auth.mapper;

// ===== Imports =====

import java.time.LocalDateTime;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.flightroster.auth.dto.response.AuthResponse;
import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.enums.Role;
import com.flightroster.auth.enums.Status;

// ===== Class =====

@Component
public class AuthMapper
{
	static final String DEFAULT_TOKEN_TYPE = "Bearer";

	public AuthUser toEntity(String email, String passwordHash)
	{
		AuthUser user = new AuthUser();
		user.setEmail(email);
		user.setPasswordHash(passwordHash);
		user.setRole(Role.PASSENGER);
		user.setStatus(Status.ACTIVE);
		user.setCreatedAt(LocalDateTime.now());
		user.setUpdatedAt(LocalDateTime.now());

		return (user);
	}

	public AuthResponse toAuthResponse(String accessToken, String refreshToken, long expiresIn)
	{
		return (AuthResponse.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.tokenType(DEFAULT_TOKEN_TYPE)
			.expiresIn(expiresIn)
			.build());
	}

	public UserDetails toUserDetails(AuthUser user)
	{
		return (User.builder()
			.username(user.getEmail())
			.password(user.getPasswordHash())
			.roles(user.getRole().name())
			.build());
	}
}
