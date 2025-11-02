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

// ===== Class =====

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
	 * @brief Registers a new user.
     * 
	 * @route POST /auth/register
     * 
	 * @access Public
	 */
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request)
	{
		return (ResponseEntity.ok(authService.register(request)));
	}

	/**
	 * @brief Authenticates user credentials and issues tokens.
     * 
	 * @route POST /auth/login
     * 
	 * @access Public
	 */
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request)
	{
		return (ResponseEntity.ok(authService.login(request)));
	}

	/**
	 * @brief Health check endpoint for monitoring service status.
     * 
	 * @route GET /auth/health
     * 
	 * @access Public
	 */
	@GetMapping("/health")
	public ResponseEntity<String> health()
	{
		return (ResponseEntity.ok("Auth service is running"));
	}

	/**
	 * @brief Provides public JSON Web Key Set (JWKS) for JWT validation.
     * 
	 * @route GET /.well-known/jwks.json
     * 
	 * @access Public
	 */
	@GetMapping("/.well-known/jwks.json")
	public ResponseEntity<String> jwks()
	{
		// Placeholder for JWKS implementation
		return (ResponseEntity.ok("{\"keys\": []}"));
	}

	/**
	 * @brief Handles password reset initiation (sending email, etc).
     * 
	 * @route POST /auth/forgot-password
     * 
	 * @access Public
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

	// ================================
	// PROTECTED ENDPOINTS
	// ================================

	/**
	 * @brief Logs out the current user and revokes their refresh token.
     * 
	 * @route POST /auth/logout
     * 
	 * @access Protected
	 */
	@PostMapping("/logout")
	public ResponseEntity<String> logout()
	{
		// TODO: Implement logout (revoke refresh token)
		return (ResponseEntity.ok("Logged out successfully"));
	}

	/**
	 * @brief Refreshes access token using a valid refresh token.
     * 
	 * @route POST /auth/refresh-token
     * 
	 * @access Protected
	 */
	@PostMapping("/refresh-token")
	public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request)
	{
		return (ResponseEntity.ok(authService.refreshAccessToken(request)));
	}

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

	// ================================
	// INTERNAL ENDPOINTS
	// ================================

	/**
	 * @brief Validates tokens for inter-service communication.
     * 
	 * @route POST /auth/internal/validate-token
     * 
	 * @access Internal (requires ADMIN)
	 */
	@PostMapping("/internal/validate-token")
	public ResponseEntity<String> validateInternalToken()
	{
		return (ResponseEntity.ok("Internal token validated"));
	}

	/**
	 * @brief Disables a user account.
     * 
	 * @route POST /auth/internal/disable-user
     * 
	 * @access Internal (requires ADMIN)
	 */
	@PostMapping("/internal/disable-user")
	public ResponseEntity<String> disableUser()
	{
		// TODO: Implement disable logic
		return (ResponseEntity.ok("User disabled successfully"));
	}

	/**
	 * @brief Synchronizes a user's role with another service.
     * 
	 * @route PATCH /auth/internal/sync-role
     * 
	 * @access Internal (requires ADMIN)
	 */
	@PatchMapping("/internal/sync-role")
	public ResponseEntity<String> syncRole()
	{
		// TODO: Implement role synchronization
		return (ResponseEntity.ok("User role synchronized successfully"));
	}
}
