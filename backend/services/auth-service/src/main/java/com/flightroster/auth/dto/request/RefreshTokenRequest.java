package com.flightroster.auth.dto.request;

// ===== Imports =====

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// ===== Class =====

@Getter
@Setter
public class RefreshTokenRequest
{
	@NotBlank(message = "Refresh token cannot be blank")
	private String refreshToken;
}
