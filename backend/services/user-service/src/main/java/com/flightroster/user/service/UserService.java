package com.flightroster.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightroster.user.dto.UserRequestDto;
import com.flightroster.user.dto.UserResponseDto;
import com.flightroster.user.dto.UserUpdateDto;
import com.flightroster.user.entity.Role;
import com.flightroster.user.entity.Status;
import com.flightroster.user.entity.User;
import com.flightroster.user.exceptions.EmailAlreadyExistsException;
import com.flightroster.user.exceptions.UserNotFoundException;
import com.flightroster.user.mapper.UserMapper;
import com.flightroster.user.repository.UserRepository;

/**
 * Handles business logic for User management
 * This service layer performs CRUD operations and ensures domain consistency.
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
     * Creates a new user
     * 
     * @param dto (UserRequestDto): The DTO containing user creation data
     * 
     * @throws EmailAlreadyExistsException If the email already exists
     * 
     * @return The created UserResponseDto
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
     * Retrieves all users
     * 
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
     * Retrieves a user by ID
     * 
     * @param id (Long): The ID of the user
     * 
     * @throws UserNotFoundException If user does not exist
     * 
     * @return The found user as DTO
     */
    public UserResponseDto getUserById(Long id)
    {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));

        return (userMapper.toDto(user));
    }

    /**
     * Retrieves a user by email
     * 
     * @param email (String): The email of the user
     * 
     * @throws UserNotFoundException If user does not exist
     * 
     * @return The found user as DTO
     */
    public UserResponseDto getUserByEmail(String email)
    {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));

        return (userMapper.toDto(user));
    }

    // ===================== UPDATE =====================

    /**
     * Updates user data
     * 
     * @param id (Long): The user ID
     * @param dto (UserUpdateDto): DTO containing updated values
     * 
     * @throws UserNotFoundException If user does not exist
     * 
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
     * Deletes a user by ID
     * 
     * @param id (Long): The ID of the user
     * 
     * @throws UserNotFoundException If user does not exist
     * 
     * @return void
     */
    public void deleteUser(Long id)
    {
        if (!userRepository.existsById(id))
            throw (new UserNotFoundException("User with ID " + id + " not found"));

        userRepository.deleteById(id);
    }

    // ===================== INTERNAL =====================

    /**
     * Synchronizes user role by email.
     * Accepts a Role enum directly. Logic is simplified.
     */
    public void syncUserRole(String email, Role newRole)
    {
        // Get user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));

        // Update role
        user.setRole(newRole);

        // Save changes
        userRepository.save(user);
    }

    /**
     * Syncs a new user from another internal service
     * 
     * @param dto (UserRequestDto): User data
     * 
     * @return UserResponseDto
     */
    public UserResponseDto syncUser(UserRequestDto dto)
    {
        // Check if user exists by email
        User user = userRepository.findByEmail(dto.getEmail())
                .orElse(new User()); // If not found, prepare a new instance

        // Set/Update fields
        if (user.getId() == null) // It is a new user
        {
            user.setEmail(dto.getEmail());
            user.setStatus(Status.ACTIVE); // Default status
        }

        // Update fields that are allowed to change via sync
        user.setUsername(dto.getUsername());
        
        // Only update role if provided in DTO
        if (dto.getRole() != null)
        {
            user.setRole(dto.getRole());
        }

        // Only update balance if provided (or strictly sync logic depending on requirement)
        if (dto.getBalance() != null)
        {
            user.setBalance(dto.getBalance());
        }

        // Save (Upsert)
        User savedUser = userRepository.save(user);
        
        return (userMapper.toDto(savedUser));
    }

    /**
     * Synchronizes user status by email.
     * Updates the account status (e.g. BANNED, ACTIVE).
     * 
     * @param email (String): User email
     * @param newStatus (Status): New status to set
     * 
     * @return void
     */
    public void syncUserStatus(String email, Status newStatus)
    {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));

        user.setStatus(newStatus);
        
        userRepository.save(user);
    }
}
