package com.flightroster.auth.entities;

import java.time.LocalDateTime;

import com.flightroster.auth.enums.Role;
import com.flightroster.auth.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @brief Represents an authenticated user in the system.
 * @details Defines credentials, role-based privileges, and status tracking
 * for each user managed by the Auth Service.
 */
@Entity
@Table(name = "auth_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthUser
{
    /*
     * Unique identifier for the authenticated user.
     * Auto-generated primary key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Email address of the user.
     * Must be unique and not null.
     * Used as the main login identifier.
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    /*
     * Hashed password of the user.
     * Stored securely using a strong hashing algorithm.
     */
    @Column(nullable = false, name = "password_hash", length = 255)
    private String passwordHash;

    /*
     * Role of the user within the system.
     * Determines access privileges and authorization scope.
     * Default: PASSENGER.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.PASSENGER;

    /*
     * Current status of the user account.
     * Indicates if the user is active, disabled, or banned.
     * Default: ACTIVE.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.ACTIVE;

    /*
     * Timestamp marking when the record was created.
     * Automatically set during entity creation.
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /*
     * Timestamp marking the last update time of the record.
     * Automatically updated on modification.
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    /*
     * Timestamp of the user's most recent login.
     * Can be null if the user has not logged in yet.
     */
    private LocalDateTime lastLoginAt;

    @PreUpdate
    protected void onUpdate()
    {
        this.updatedAt = LocalDateTime.now();
    }
}
