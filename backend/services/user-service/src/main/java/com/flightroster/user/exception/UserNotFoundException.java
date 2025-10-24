package com.flightroster.user.exception;

/**
 * @brief Thrown when a requested user cannot be found in the database
 */
public class UserNotFoundException extends RuntimeException
{
    public UserNotFoundException(String message)
    {
        super(message);
    }
}
