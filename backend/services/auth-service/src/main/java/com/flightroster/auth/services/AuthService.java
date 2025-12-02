package com.flightroster.auth.services;

// ===== Imports =====

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flightroster.auth.config.JwtService;
import com.flightroster.auth.dto.request.LoginRequest;
import com.flightroster.auth.dto.request.RefreshTokenRequest;
import com.flightroster.auth.dto.request.RegisterRequest;
import com.flightroster.auth.dto.response.AuthResponse;
import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.entities.RefreshToken;
import com.flightroster.auth.exceptions.TokenException;
import com.flightroster.auth.mapper.AuthMapper;
import com.flightroster.auth.repositories.AuthUserRepository;
import com.flightroster.auth.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

// ===== Class =====

@Service
@RequiredArgsConstructor
public class AuthService
{
    private final JwtService jwtService;
    private final AuthMapper authMapper;
    private final AuthUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;

    @Value("${application.security.jwt.expiration}")
    private long accessTokenExpiration;

    // ===========================================
    // Public Authentication Methods
    // ===========================================

    /**
     * Registers a new user and generates initial tokens
     * 
     * @param request (RegisterRequest): The registration request containing email and password
     * 
     * @return AuthResponse containing the JWT token, refresh token ID, and expiration time
     */
    public AuthResponse register(RegisterRequest request)
    {
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        AuthUser user = authMapper.toEntity(request.getEmail(), encodedPassword);
        AuthUser savedUser = userRepository.save(user);

        UserDetails userDetails = authMapper.toUserDetails(savedUser);
        String jwtToken = jwtService.generateToken(userDetails);
        
        // Create initial refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);

        return (authMapper.toAuthResponse(jwtToken, refreshToken.getId().toString(), accessTokenExpiration));
    }

    /**
     * Authenticates a user and issues new tokens
     * 
     * @param request (LoginRequest): The login request containing email and password
     * 
     * @throws TokenException if user is not found
     * 
     * @return AuthResponse containing the JWT token and refresh token info
     */
    public AuthResponse login(LoginRequest request)
    {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        AuthUser user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new TokenException("User not found"));

        UserDetails userDetails = authMapper.toUserDetails(user);
        String jwtToken = jwtService.generateToken(userDetails);

        // Issue a new refresh token upon login
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return (authMapper.toAuthResponse(jwtToken, refreshToken.getId().toString(), accessTokenExpiration));
    }

    // ===========================================
    // Token Management Methods
    // ===========================================

    /**
     * Refreshes the access token using Refresh Token Rotation strategy.
     * This invalidates the old refresh token and issues a completely new one.
     * 
     * @param request (RefreshTokenRequest): The request containing the old refresh token
     * 
     * @throws TokenException if token is not found, expired, or revoked
     * @throws TokenException if token format is invalid
     * 
     * @return AuthResponse containing new Access Token and new Refresh Token
     */
    @Transactional
    public AuthResponse refreshAccessToken(RefreshTokenRequest request)
    {
        try
        {
            UUID tokenId = UUID.fromString(request.getRefreshToken());

            RefreshToken oldToken = refreshTokenRepository.findById(tokenId)
                .orElseThrow(() -> new TokenException("Refresh token not found"));

            if (!refreshTokenService.isTokenValid(oldToken))
            {
                throw new TokenException("Token expired or revoked");
            }

            AuthUser user = oldToken.getUser();

            // Revoke the old token
            refreshTokenService.revokeToken(oldToken);

            // Create a brand new refresh token
            RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);

            // Generate new access token
            String newAccessToken = jwtService.generateToken(authMapper.toUserDetails(user));

            return (authMapper.toAuthResponse(
                newAccessToken, 
                newRefreshToken.getId().toString(), 
                accessTokenExpiration
            ));
        }
        catch (IllegalArgumentException e)
        {
            throw new TokenException("Invalid token format");
        }
    }

    /**
     * Logs out the user by revoking the specific refresh token
     * 
     * @param request (RefreshTokenRequest): The request containing the refresh token to revoke
     * 
     * @throws TokenException if token is not found or format is invalid
     */
    public void logout(RefreshTokenRequest request) 
    {
        try 
        {
            UUID tokenId = UUID.fromString(request.getRefreshToken());

            RefreshToken token = refreshTokenRepository.findById(tokenId)
                .orElseThrow(() -> new TokenException("Refresh token not found"));

            refreshTokenService.revokeToken(token);
        } 
        catch (IllegalArgumentException e) 
        {
            throw new TokenException("Invalid token format"); 
        }
    }
}