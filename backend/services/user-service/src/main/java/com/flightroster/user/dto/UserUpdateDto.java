package com.flightroster.user.dto;

import java.math.BigDecimal;

import com.flightroster.user.entity.Role;
import com.flightroster.user.entity.Status;

import lombok.Data;

/**
 * @brief DTO used for updating user details.
 */
@Data
public class UserUpdateDto
{
    private String username;
    private BigDecimal balance;
    private Role role;
    private Status status;
}
