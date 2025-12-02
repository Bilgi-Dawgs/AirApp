package com.flightroster.user.controller;

// ===================== IMPORTS =====================

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightroster.user.dto.UserRequestDto;
import com.flightroster.user.dto.UserResponseDto;
import com.flightroster.user.exceptions.UserValidationException;
import com.flightroster.user.service.UserService;

// ===================== INTERNAL =====================

/**
 * REST Controller for internal system operations.
 * @details Handles synchronization between microservices. Restricted to ADMIN access.
 */
@RestController
@RequestMapping("/user/internal")
public class UserInternalController
{
    private final UserService userService;

    public UserInternalController(UserService userService)
    {
        this.userService = userService;
    }

    /**
     * Synchronizes user statuses across services
     * 
     * Access: Internal
     * 
     * @return Accepted response
     */
    @PatchMapping("/sync-status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> syncStatus(@RequestBody UserRequestDto dto)
    {
        // Validation
        if (dto.getEmail() == null || dto.getEmail().isEmpty())
        {
            throw new UserValidationException("Email parameter is required.");
        }
        
        if (dto.getStatus() == null)
        {
            throw new UserValidationException("Status parameter is required.");
        }

        userService.syncUserStatus(dto.getEmail(), dto.getStatus());

        return (ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(java.util.Map.of(
                        "message", "User status synchronized",
                        "email", dto.getEmail(),
                        "newStatus", dto.getStatus()
                )));
    }

    /**
     * Synchronizes user roles across services
     * 
     * Access: Internal
     * 
     * @param request (UserRequestDto): Contains email and new role information
     * 
     * @return Accepted response
     */
    @PatchMapping("/sync-role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> syncRole(@RequestBody UserRequestDto request)
    {
        // Validation
        if (request.getEmail() == null || request.getRole() == null)
        {
            return (ResponseEntity.badRequest().body("Email and Role are required"));
        }

        // Synchronize role
        userService.syncUserRole(request.getEmail(), request.getRole());

        return (ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(java.util.Map.of(
                        "message", "User role synchronized",
                        "email", request.getEmail(),
                        "newRole", request.getRole()
                )));
    }

    /**
     * Syncs a new user from another internal service
     * 
     * Access: Internal
     * 
     * @param dto (UserRequestDto): User data
     * 
     * @return UserResponseDto
     */
    @PostMapping("/sync-user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponseDto> syncUser(@RequestBody UserRequestDto dto)
    {
        // Basic Validation
        if (dto.getEmail() == null || dto.getEmail().isEmpty())
        {
            throw new UserValidationException("Email is required for syncing user");
        }

        // Call the Upsert (Sync) logic in Service
        UserResponseDto syncedUser = userService.syncUser(dto);

        return (ResponseEntity.ok(syncedUser));
    }
}
