package com.flightroster.auth.controllers;

// ===== Imports =====

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightroster.auth.dto.request.LoginRequest;
import com.flightroster.auth.dto.request.RefreshTokenRequest;
import com.flightroster.auth.dto.request.RegisterRequest;
import com.flightroster.auth.dto.response.AuthResponse;
import com.flightroster.auth.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

// ===========================================
// 					Controllers 
// ===========================================

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController
{
	private final AuthService authService;

	// ================================
	// PUBLIC ENDPOINTS
	// ================================

	/**
	 * Registers a new user.
	 * 
	 * route: POST /auth/register
	 * 
	 * access: Public
	 */
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request)
	{
		return (ResponseEntity.ok(authService.register(request)));
	}

	/**
	 * Authenticates user credentials and issues tokens.
     * 
	 * route: POST /auth/login
     * 
	 * access: Public
	 */
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request)
	{
		return (ResponseEntity.ok(authService.login(request)));
	}

	/**
	 * Health check endpoint for monitoring service status.
     * 
	 * route: GET /auth/health
     * 
	 * access: Public
	 */
	@GetMapping("/health")
	public ResponseEntity<Object> health()
	{
		return (ResponseEntity.ok(java.util.Map.of("status", "Auth service is healthy")));
	}

	/**
	 * Refreshes access token using a valid refresh token.
     * 
	 * route: POST /auth/refresh-token
     * 
	 * access: Public
	 */
	@PostMapping("/refresh-token")
	public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request)
	{
		return (ResponseEntity.ok(authService.refreshAccessToken(request)));
	}

	/**
	 * Handles password reset initiation (sending email, etc).
     * 
	 * route: POST /auth/forgot-password
     * 
	 * access: Public
	 */
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword()
	{
		// TODO: Implement email sending logic
		return (ResponseEntity.ok("Password reset link sent to email (mock)"));
	}

	/**
	 * @brief Handles password reset confirmation.
     * 
	 * @route POST /auth/reset-password
     * 
	 * @access Public
	 */
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword()
	{
		// TODO: Implement password reset logic
		return (ResponseEntity.ok("Password reset successful (mock)"));
	}


	/**
	 * Logs out the current user and revokes their refresh token.
     * 
	 * @route POST /auth/logout
     * 
	 * @access Public
	 */
	@PostMapping("/logout")
	public ResponseEntity<Object> logout(@Valid @RequestBody RefreshTokenRequest request)
	{
		authService.logout(request);

		return (ResponseEntity.ok(java.util.Map.of("message", "Logged out successfully")));
	}


	// ================================
	// PROTECTED ENDPOINTS
	// ================================

	/**
	 * @brief Validates the provided JWT access token.
     * 
	 * @route GET /auth/validate
     * 
	 * @access Protected
	 */
	@GetMapping("/validate")
	public ResponseEntity<String> validate()
	{
		// TODO: Implement token validation logic
		return (ResponseEntity.ok("Token is valid"));
	}

	/**
	 * @brief Returns currently authenticated user's details.
     * 
	 * @route GET /auth/me
     * 
	 * @access Protected
	 */
	@GetMapping("/me")
	public ResponseEntity<String> me()
	{
		// TODO: Return user details from SecurityContext
		return (ResponseEntity.ok("Current user profile info (mock)"));
	}

	/**
	 * @brief Allows user to change password.
     * 
	 * @route PATCH /auth/change-password
     * 
	 * @access Protected
	 */
	@PatchMapping("/change-password")
	public ResponseEntity<String> changePassword()
	{
		// TODO: Implement password change logic
		return (ResponseEntity.ok("Password changed successfully"));
	}
}
