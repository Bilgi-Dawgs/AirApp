package com.flightroster.auth.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @brief Represents a refresh token used for JWT renewal.
 * @details Stores long-lived token identifiers linked to authenticated users.
 * Tokens are persisted for session continuity and can be revoked when necessary.
 */
@Entity
@Table(name = "refresh_tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken
{
    /*
     * Unique identifier for the refresh token.
     * Auto-generated UUID primary key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /*
     * Associated authenticated user.
     * Defines a many-to-one relationship with AuthUser.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AuthUser user;

    /*
     * Indicates whether the token has been revoked.
     * Used to prevent reuse after logout or compromise.
     */
    @Column(nullable = false)
    private boolean revoked = false;

    /*
     * Timestamp marking when the token was created.
     * Automatically set upon entity creation.
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /*
     * Timestamp marking the last update of the token record.
     * Automatically updated when the entity changes.
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    /*
     * Expiration time of the refresh token.
     * Determines when the token becomes invalid.
     */
    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @PreUpdate
    protected void onUpdate()
    {
        this.updatedAt = LocalDateTime.now();
    }
}
