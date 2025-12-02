package com.flightroster.auth.exceptions;

// ===== Imports =====

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// ===========================================
// Global Exception Handler
// ===========================================

@RestControllerAdvice
public class GlobalExceptionHandler
{
    /**
     * Handles custom TokenException (e.g. Invalid refresh token).
     * 
     * @return JSON response with 401 Unauthorized status
     */
    @ExceptionHandler(TokenException.class)
    public ResponseEntity<Map<String, Object>> handleTokenException(TokenException ex)
    {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED.value());
        errorResponse.put("error", "Unauthorized");
        errorResponse.put("message", ex.getMessage());

        return (ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse));
    }

    /**
     * Handles Spring Security Authentication Exceptions.
     * (Wrong password, User not found, Account locked, etc.)
     * 
     * @return JSON response with 401 Unauthorized status
     */
    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<Map<String, Object>> handleAuthenticationException(Exception ex)
    {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED.value());
        errorResponse.put("error", "Unauthorized");
        
        if (ex instanceof BadCredentialsException) 
        {
            errorResponse.put("message", "Invalid email or password");
        } 
        else if (ex instanceof DisabledException) 
        {
            errorResponse.put("message", "Account is disabled");
        } 
        else if (ex instanceof LockedException) 
        {
            errorResponse.put("message", "Account is locked");
        } 
        else 
        {
            errorResponse.put("message", "Authentication failed");
        }

        return (ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse));
    }

    /**
     * Handles unexpected Exceptions (Fallback handler).
     * 
     * @return JSON response with 500 Internal Server Error status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception ex)
    {

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("error", "Internal Server Error");
        
        errorResponse.put("message", "An unexpected error occurred. Please try again later.");

        return (ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse));
    }
}