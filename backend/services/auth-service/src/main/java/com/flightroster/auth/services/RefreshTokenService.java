package com.flightroster.auth.services;

// ===== Imports =====

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.entities.RefreshToken;
import com.flightroster.auth.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

// ===== Class =====

@Service
@RequiredArgsConstructor
public class RefreshTokenService
{
	private final RefreshTokenRepository refreshTokenRepository;

	public RefreshToken createRefreshToken(AuthUser user)
	{
		RefreshToken token = new RefreshToken();
		token.setId(UUID.randomUUID());
		token.setUser(user);
		token.setRevoked(false);
		token.setCreatedAt(LocalDateTime.now());
		token.setExpiresAt(LocalDateTime.now().plusDays(7));

		return (refreshTokenRepository.save(token));
	}

	public Optional<RefreshToken> getById(UUID tokenId)
	{
		return (refreshTokenRepository.findById(tokenId));
	}

	public boolean isTokenValid(RefreshToken token)
	{
		return (!token.isRevoked() && token.getExpiresAt().isAfter(LocalDateTime.now()));
	}

	public void revokeToken(RefreshToken token)
	{
		token.setRevoked(true);
		token.setUpdatedAt(LocalDateTime.now());
		refreshTokenRepository.save(token);
	}
}
