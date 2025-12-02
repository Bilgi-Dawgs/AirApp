package com.flightroster.user.mapper;

import org.springframework.stereotype.Component;

import com.flightroster.user.dto.UserRequestDto;
import com.flightroster.user.dto.UserResponseDto;
import com.flightroster.user.dto.UserUpdateDto;
import com.flightroster.user.entity.User;

/**
 * @brief Handles conversion between User entity and DTOs.
 * @details This mapper isolates the transformation logic between
 * the API layer (DTOs) and persistence layer (Entity).
 */
@Component
public class UserMapper
{
    /**
     * @brief Converts a UserRequestDto to a User entity.
     * @param dto The DTO containing user creation data.
     * @return A User entity ready to be persisted in the database.
     */
    public User toEntity(UserRequestDto dto)
    {
        if (dto == null)
            return null;

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setBalance(dto.getBalance());
        user.setRole(dto.getRole());

        // Default fields handled by JPA (status, createdAt, updatedAt)
        return (user);
    }

    /**
     * @brief Updates an existing User entity using values from a UserUpdateDto.
     * @param dto The DTO containing updated user data.
     * @param user The entity to update.
     */
    public void updateEntity(UserUpdateDto dto, User user)
    {
        if (dto == null || user == null)
            return ;

        if (dto.getUsername() != null)
            user.setUsername(dto.getUsername());

        if (dto.getBalance() != null)
            user.setBalance(dto.getBalance());

        if (dto.getRole() != null)
            user.setRole(dto.getRole());

        if (dto.getStatus() != null)
            user.setStatus(dto.getStatus());
    }

    /**
     * @brief Converts a User entity to a UserResponseDto.
     * @param user The User entity fetched from the database.
     * @return A UserResponseDto suitable for returning to the client.
     */
    public UserResponseDto toDto(User user)
    {
        if (user == null)
            return (null);

        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setBalance(user.getBalance());
        dto.setRole(user.getRole());
        dto.setStatus(user.getStatus());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        return (dto);
    }
}
