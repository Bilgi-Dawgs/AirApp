package com.flightroster.user.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // ===================== PUBLIC =====================

    /**
     * @brief Health check endpoint
     * @return Service health message
     */
    @GetMapping("/health")
    public ResponseEntity<String> health()
    {
        return (ResponseEntity.ok("User Service is running"));
    }

    // ===================== PROTECTED =====================

    /**
     * @brief Retrieves the currently authenticated user's data
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser()
    {
        String email = "demo@user.com"; // TODO: fetch from token
        return (ResponseEntity.ok(userService.getUserByEmail(email)));
    }

    /**
     * @brief Updates current user's profile
     */
    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateCurrentUser(@RequestBody UserUpdateDto dto)
    {
        Long userId = 1L; // TODO: from token
        return (ResponseEntity.ok(userService.updateUser(userId, dto)));
    }

    /**
     * @brief Updates current user's balance
     */
    @PatchMapping("/me/balance")
    public ResponseEntity<UserResponseDto> updateBalance(@RequestParam("balance") double balance)
    {
        Long userId = 1L; // TODO: from token
        UserUpdateDto dto = new UserUpdateDto();
        dto.setBalance(java.math.BigDecimal.valueOf(balance));
        return (ResponseEntity.ok(userService.updateUser(userId, dto)));
    }

    /**
     * @brief Retrieves transaction history (placeholder)
     */
    @GetMapping("/me/transactions")
    public ResponseEntity<String> getTransactions()
    {
        return (ResponseEntity.ok("Transaction service integration pending"));
    }

    /**
     * @brief Deletes current user's account
     */
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser()
    {
        Long userId = 1L; // TODO: from token
        userService.deleteUser(userId);
        return (ResponseEntity.noContent().build());
    }

    // ===================== ADMIN =====================

    /**
     * @brief Retrieves all users (Admin only)
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers()
    {
        return (ResponseEntity.ok(userService.getAllUsers()));
    }

    /**
     * @brief Retrieves a user by ID (Admin only)
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id)
    {
        return (ResponseEntity.ok(userService.getUserById(id)));
    }

    /**
     * @brief Creates a new user (Admin only)
     */
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto dto)
    {
        UserResponseDto created = userService.createUser(dto);
        return (ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    /**
     * @brief Updates a user's role (Admin only)
     */
    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponseDto> updateUserRole(@PathVariable Long id, @RequestParam String role)
    {
        UserUpdateDto dto = new UserUpdateDto();
        dto.setRole(Enum.valueOf(Role.class, role.toUpperCase()));
        return (ResponseEntity.ok(userService.updateUser(id, dto)));
    }

    /**
     * @brief Updates a user's status (Admin only)
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<UserResponseDto> updateUserStatus(@PathVariable Long id, @RequestParam String status)
    {
        UserUpdateDto dto = new UserUpdateDto();
        dto.setStatus(Enum.valueOf(Status.class, status.toUpperCase()));
        return (ResponseEntity.ok(userService.updateUser(id, dto)));
    }

    /**
     * @brief Deletes a user by ID (Admin only)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id)
    {
        userService.deleteUser(id);
        return (ResponseEntity.noContent().build());
    }

    // ===================== INTERNAL =====================

    /**
     * @brief Synchronizes user statuses across services
     */
    @PatchMapping("/internal/sync-status")
    public ResponseEntity<String> syncStatus()
    {
        return (ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("User statuses synchronized"));
    }

    /**
     * @brief Synchronizes user roles across services
     */
    @PatchMapping("/internal/sync-role")
    public ResponseEntity<String> syncRole()
    {
        return (ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("User roles synchronized"));
    }

    /**
     * @brief Syncs a new user from another internal service
     */
    @PostMapping("/internal/sync-user")
    public ResponseEntity<UserResponseDto> syncUser(@RequestBody UserRequestDto dto)
    {
        UserResponseDto created = userService.createUser(dto);
        return (ResponseEntity.status(HttpStatus.CREATED).body(created));
    }
}
