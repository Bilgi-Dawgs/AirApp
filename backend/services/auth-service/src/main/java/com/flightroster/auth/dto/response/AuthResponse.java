package com.flightroster.auth.dto.response;

// ===== Imports =====

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// ===== Class =====

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse
{
	private String accessToken;
	private String refreshToken;
	private String tokenType;
	private long expiresIn;
}
