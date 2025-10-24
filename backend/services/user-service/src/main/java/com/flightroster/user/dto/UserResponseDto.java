package com.flightroster.user.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flightroster.user.entity.Role;
import com.flightroster.user.entity.Status;

import lombok.Data;

/**
 * @brief DTO used for returning user information in responses.
 */
@Data
public class UserResponseDto
{
    private Long id;
    private String email;
    private String username;
    private BigDecimal balance;
    private Role role;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
