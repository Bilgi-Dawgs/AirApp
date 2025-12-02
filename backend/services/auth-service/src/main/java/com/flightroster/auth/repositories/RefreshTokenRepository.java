package com.flightroster.auth.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightroster.auth.entities.AuthUser;
import com.flightroster.auth.entities.RefreshToken;

/**
 * @brief Repository interface for managing RefreshToken entities.
 * @details Supports operations for finding, revoking, and verifying
 * tokens associated with authenticated users.
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID>
{
    /**
     * @brief Finds the most recent refresh token for a specific user.
     * @param user (AuthUser): The associated AuthUser entity.
     * @return Optional containing the token if it exists.
     */
    Optional<RefreshToken> findTopByUserOrderByCreatedAtDesc(AuthUser user);

    /**
     * @brief Deletes all refresh tokens for a given user.
     * @param user (AuthUser): The user whose tokens will be deleted.
     */
    void deleteAllByUser(AuthUser user);

}
