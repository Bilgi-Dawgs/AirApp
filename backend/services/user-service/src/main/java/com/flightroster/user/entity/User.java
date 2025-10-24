package com.flightroster.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @brief Represents a user in the Flight Roster System.
 * @details This entity defines basic information, account balance,
 * role-based access, and account status for each registered user.
 */
@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User
{
    /*
     * Unique identifier for the user
     * Auto-generated primary key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Email address of the user
     * Must be unique and not null
     * Maximum length: 100 characters
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    /*
     * Unique username chosen by the user
     * Used for login and display purposes
     * Maximum length: 50 characters
     */
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    /*
     * Balance available in the user's account
     * Default value: 0.00
     */
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;

    /*
     * Role of the user within the system
     * Enum defines access privileges
     * Default: PASSENGER
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.PASSENGER;

    /*
     * Current account status of the user
     * Enum defines if user is active, disabled or banned
     * Default: ACTIVE
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.ACTIVE;

    /*
     * Timestamp indicating when the record was created
     * Automatically set upon creation
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /*
     * Timestamp indicating the last update of the record
     * Automatically updated on modification
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate()
    {
        this.updatedAt = LocalDateTime.now();
    }
}
