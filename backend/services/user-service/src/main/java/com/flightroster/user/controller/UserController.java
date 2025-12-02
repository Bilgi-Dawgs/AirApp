package com.flightroster.user.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flightroster.user.dto.UserRequestDto;
import com.flightroster.user.dto.UserResponseDto;
import com.flightroster.user.dto.UserUpdateDto;
import com.flightroster.user.entity.Role;
import com.flightroster.user.entity.Status;
import com.flightroster.user.service.UserService;

/**
 * @brief REST Controller for user-related operations
 * @details Exposes endpoints for Public, Protected, Admin, and Internal usage.
 */
@RestController
@RequestMapping("/user")
public class UserController
{
    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    // ===================== PUBLIC ENDPOINTS =====================

    /**
     * Health check endpoint
     * 
     * Access: Public
     * 
     * @return Service health message
     */
    @GetMapping("/health")
    public ResponseEntity<Object> health()
    {
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(java.util.Map.of("status", "User Service is healthy")));
    }

    // ===================== PROTECTED ENDPOINTS =====================

    /**
     * Retrieves the currently authenticated user's data
     * 
     * @param authentication (Authentication): The authentication token containing user details
     * 
     * Access: Protected
     * 
     * @return UserResponseDto of the current user
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(Authentication authentication)
    {
        // Get user
        String email = authentication.getName();
        
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.getUserByEmail(email)));
    }

    /**
     * Updates current user's profile
     * 
     * @param dto (UserUpdateDto): The DTO containing update data
     * @param authentication (Authentication): The authentication token containing user details
     * 
     * Access: Protected
     * 
     * @return Updated UserResponseDto
     */
    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateCurrentUser(@RequestBody UserUpdateDto dto, Authentication authentication)
    {
        // Get user
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUser(userId, dto)));
    }

    /**
     * Updates current user's balance
     * 
     * Access: Protected
     * 
     * @return Updated UserResponseDto
     */
    @PatchMapping("/me/balance")
    public ResponseEntity<UserResponseDto> updateBalance(@RequestParam("balance") BigDecimal balance, Authentication authentication)
    {
        // Get user
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();

        // Prepare DTO
        UserUpdateDto dto = new UserUpdateDto();
        dto.setBalance(balance);

        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUser(userId, dto)));
    }

    /**
     * Retrieves transaction history (placeholder)
     * 
     * Access: Protected
     * 
     * @return Placeholder response
     */
    @GetMapping("/me/transactions")
    public ResponseEntity<String> getTransactions()
    {
        return (ResponseEntity.ok("Transaction service integration pending"));
    }

    /**
     * Deletes current user's account
     * 
     * Access: Protected
     * 
     * @return No content response
     */
    @DeleteMapping("/me")
    public ResponseEntity<Object> deleteCurrentUser(Authentication authentication)
    {
        // Get user
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();

        // Prepare message
        String message = "User with email " + email + " has been deleted.";

        // Delete user
        userService.deleteUser(userId);
        
        return (ResponseEntity.ok(java.util.Map.of("message", message)));
    }

    // ===================== ADMIN =====================

    /**
     * Retrieves all users
     * 
     * Access: Admin
     * 
     * @return List of UserResponseDto
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserResponseDto>> getAllUsers()
    {
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.getAllUsers()));
    }

    /**
     * Retrieves a user by ID
     * 
     * Access: Admin
     * 
     * @param id (Long): User ID
     * 
     * @return UserResponseDto
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id)
    {
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.getUserById(id)));
    }

    /**
     * Creates a new user
     * 
     * Access: Admin
     * 
     * @param dto (UserRequestDto): User data
     * 
     * @return UserResponseDto
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto dto)
    {
        UserResponseDto created = userService.createUser(dto);

        return (ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    /**
     * Updates a user's role
     * 
     * Access: Admin
     * 
     * @param id (Long): User ID
     * @param role (String): New role
     * 
     * @return UserResponseDto
     */
    @PutMapping("/{id}/role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponseDto> updateUserRole(@PathVariable Long id, @RequestParam String role)
    {
        UserUpdateDto dto = new UserUpdateDto();
        dto.setRole(Enum.valueOf(Role.class, role.toUpperCase()));
    
        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUser(id, dto)));
    }

    /**
     * Updates a user's status
     * 
     * Access: Admin
     * 
     * @param id (Long): User ID
     * @param status (String): New status
     * 
     * @return UserResponseDto
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponseDto> updateUserStatus(@PathVariable Long id, @RequestParam String status)
    {
        UserUpdateDto dto = new UserUpdateDto();
        dto.setStatus(Enum.valueOf(Status.class, status.toUpperCase()));

        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUser(id, dto)));
    }

    /**
     * Deletes a user by ID
     * 
     * Access: Admin
     * 
     * @param id (Long): User ID
     * 
     * @return No content response
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id)
    {
        userService.deleteUser(id);

        return (ResponseEntity.status(HttpStatus.ACCEPTED).body(java.util.Map.of(
                "message", "User with ID " + id + " has been deleted."
        )));
    }
    
}
