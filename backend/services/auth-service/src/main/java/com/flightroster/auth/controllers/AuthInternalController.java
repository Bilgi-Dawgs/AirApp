package com.flightroster.auth.controllers;

// ===== Imports =====

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

// ===========================================
//			Internal Controllers 
// ===========================================

@RestController
@RequestMapping("/auth/internal")
@RequiredArgsConstructor
public class AuthInternalController 
{
    // TODO: Service dependency injection
    

    /**
	 * Validates tokens for inter-service communication.
     * 
	 * route: POST /auth/internal/validate-token
     * 
	 * access: Internal (requires ADMIN)
	*/
	@PostMapping("/validate-token")
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
	@PostMapping("/disable-user")
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
	@PatchMapping("/sync-role")
	public ResponseEntity<String> syncRole()
	{
		// TODO: Implement role synchronization
		return (ResponseEntity.ok("User role synchronized successfully"));
	}
}

