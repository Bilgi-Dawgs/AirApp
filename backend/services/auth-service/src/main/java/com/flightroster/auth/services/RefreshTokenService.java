package com.flightroster.auth.services;

// ===== Imports =====

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.entities.RefreshToken;
import com.flightroster.auth.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

// ===========================================
// Service to manage refresh tokens
// ===========================================

@Service
@RequiredArgsConstructor
public class RefreshTokenService
{
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshTokenDurationMs;

    /**
     * Creates a new refresh token for a user using the configured expiration time.
	 * 
     * @param user (AuthUser): The user for whom to create the refresh token
	 * 
     * @return RefreshToken containing the newly created refresh token
     */
    public RefreshToken createRefreshToken(AuthUser user)
    {
		LocalDateTime expirationTime = LocalDateTime.now().plus(refreshTokenDurationMs, ChronoUnit.MILLIS);
        RefreshToken token = new RefreshToken(user, expirationTime);

        return (refreshTokenRepository.save(token));
    }

    /**
     * Retrieves a refresh token by its ID.
	 * 
     * @param tokenId (UUID): The ID of the refresh token
	 * 
     * @return Optional<RefreshToken> containing the refresh token if found
     */
    public Optional<RefreshToken> getById(UUID tokenId)
    {
        return (refreshTokenRepository.findById(tokenId));
    }

    /**
     * Checks if a refresh token is valid (not revoked and not expired).
	 * 
     * @param token (RefreshToken): The refresh token to check
	 * 
     * @return boolean indicating if the token is valid
     */
    public boolean isTokenValid(RefreshToken token)
    {
        return (!token.isRevoked() && token.getExpiresAt().isAfter(LocalDateTime.now()));
    }

    /**
     * Revokes a refresh token immediately.
	 * 
     * @param token (RefreshToken): The refresh token to revoke
     */
    public void revokeToken(RefreshToken token)
    {
        token.setRevoked(true);
        token.setUpdatedAt(LocalDateTime.now());
        refreshTokenRepository.save(token);
    }
}