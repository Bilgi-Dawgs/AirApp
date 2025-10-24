package com.flightroster.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightroster.user.dto.UserRequestDto;
import com.flightroster.user.dto.UserResponseDto;
import com.flightroster.user.dto.UserUpdateDto;
import com.flightroster.user.entity.User;
import com.flightroster.user.exception.EmailAlreadyExistsException;
import com.flightroster.user.exception.UserNotFoundException;
import com.flightroster.user.mapper.UserMapper;
import com.flightroster.user.repository.UserRepository;

/**
 * @brief Handles business logic for User management
 * @details This service layer performs CRUD operations and ensures domain consistency.
 */
@Service
public class UserService
{
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper)
    {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    // ===================== CREATE =====================

    /**
     * @brief Creates a new user
     * @param dto The DTO containing user creation data
     * @return The created UserResponseDto
     * @throws EmailAlreadyExistsException If the email already exists
     */
    public UserResponseDto createUser(UserRequestDto dto)
    {
        if (userRepository.existsByEmail(dto.getEmail()))
            throw (new EmailAlreadyExistsException("Email already exists: " + dto.getEmail()));

        User user = userMapper.toEntity(dto);
        User saved = userRepository.save(user);

        return (userMapper.toDto(saved));
    }

    // ===================== READ =====================

    /**
     * @brief Retrieves all users
     * @return List of all users as DTOs
     */
    public List<UserResponseDto> getAllUsers()
    {
        return (userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList()));
    }

    /**
     * @brief Retrieves a user by ID
     * @param id The ID of the user
     * @return The found user as DTO
     * @throws UserNotFoundException If user does not exist
     */
    public UserResponseDto getUserById(Long id)
    {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));

        return (userMapper.toDto(user));
    }

    /**
     * @brief Retrieves a user by email
     * @param email The email of the user
     * @return The found user as DTO
     * @throws UserNotFoundException If user does not exist
     */
    public UserResponseDto getUserByEmail(String email)
    {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));

        return (userMapper.toDto(user));
    }

    // ===================== UPDATE =====================

    /**
     * @brief Updates user data
     * @param id The user ID
     * @param dto DTO containing updated values
     * @return Updated user DTO
     */
    public UserResponseDto updateUser(Long id, UserUpdateDto dto)
    {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));

        userMapper.updateEntity(dto, existing);
        User updated = userRepository.save(existing);

        return (userMapper.toDto(updated));
    }

    // ===================== DELETE =====================

    /**
     * @brief Deletes a user by ID
     * @param id The ID of the user
     */
    public void deleteUser(Long id)
    {
        if (!userRepository.existsById(id))
            throw (new UserNotFoundException("User with ID " + id + " not found"));

        userRepository.deleteById(id);
    }
}
