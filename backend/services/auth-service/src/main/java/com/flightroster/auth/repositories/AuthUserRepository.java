package com.flightroster.auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightroster.auth.entities.AuthUser;

/**
 * @brief Repository interface for managing AuthUser entities.
 * @details Provides standard CRUD operations and additional
 * query methods for user authentication and lookup.
 */
@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, Long>
{
    /**
     * @brief Finds a user by email.
     * @param email The email address of the user.
     * @return Optional containing the user if found.
     */
    Optional<AuthUser> findByEmail(String email);

    /**
     * @brief Checks if a user with the given email exists.
     * @param email The email address to check.
     * @return True if a user exists with that email, false otherwise.
     */
    boolean existsByEmail(String email);
}
