package com.flightroster.auth.services;


// ===== Imports =====

import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flightroster.auth.config.JwtService;
import com.flightroster.auth.dto.request.LoginRequest;
import com.flightroster.auth.dto.request.RefreshTokenRequest;
import com.flightroster.auth.dto.request.RegisterRequest;
import com.flightroster.auth.dto.response.AuthResponse;
import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.entities.RefreshToken;
import com.flightroster.auth.mapper.AuthMapper;
import com.flightroster.auth.repositories.AuthUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService
{
    private final JwtService jwtService;
	private final AuthMapper authMapper;
    private final AuthUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final com.flightroster.auth.repositories.RefreshTokenRepository refreshTokenRepository;
	private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request)
    {
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        AuthUser user = authMapper.toEntity(request.getEmail(), encodedPassword);
        userRepository.save(user);

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .roles(user.getRole().name())
            .build();

        String jwtToken = jwtService.generateToken(userDetails);
        return (authMapper.toAuthResponse(jwtToken, null, 86400L));
    }


    public AuthResponse login(LoginRequest request)
    {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        AuthUser user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .roles(user.getRole().name())
            .build();

        String jwtToken = jwtService.generateToken(userDetails);

        return (authMapper.toAuthResponse(jwtToken, null, 86400L));
    }

    public AuthResponse refreshAccessToken(RefreshTokenRequest request)
    {
        UUID tokenId = UUID.fromString(request.getRefreshToken());

        RefreshToken token = refreshTokenRepository.findById(tokenId)
            .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (!refreshTokenService.isTokenValid(token))
            throw new RuntimeException("Token expired or revoked");

        AuthUser user = token.getUser();
        String newAccessToken = jwtService.generateToken(authMapper.toUserDetails(user));

        return (authMapper.toAuthResponse(newAccessToken, token.getId().toString(), 86400L));
    }


}


