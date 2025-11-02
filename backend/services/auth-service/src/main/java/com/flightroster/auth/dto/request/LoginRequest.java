package com.flightroster.auth.dto.request;

// ===== Imports =====

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// ===== Class =====

@Getter
@Setter
public class LoginRequest
{
	@NotBlank(message = "Email cannot be blank")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Password cannot be blank")
	private String password;
}
