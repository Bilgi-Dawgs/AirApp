package com.flightroster.user.dto;

import java.math.BigDecimal;

import com.flightroster.user.entity.Role;

import lombok.Data;

/**
 * @brief DTO used for creating or updating a user
 */
@Data
public class UserRequestDto
{
    private String email;
    private String username;
    private BigDecimal balance = BigDecimal.ZERO;
    private Role role = Role.PASSENGER;
}
