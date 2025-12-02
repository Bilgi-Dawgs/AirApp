package com.flightroster.auth.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @brief Custom exception for Token related errors
 * 
 * @details 
 * This exception is thrown when there is an issue with JWT or Refresh Tokens
 * (e.g., Invalid format, Expired, Not Found).
 * @status 401 UNAUTHORIZED (Default)
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class TokenException extends RuntimeException
{
    public TokenException(String message)
    {
        super(message);
    }

    public TokenException(String message, Throwable cause)
    {
        super(message, cause);
    }
}