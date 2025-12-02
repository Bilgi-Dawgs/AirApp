package com.flightroster.user.exceptions;

/**
 * Thrown when a requested user cannot be found in the database
 */
public class UserNotFoundException extends RuntimeException
{
    public UserNotFoundException(String message)
    {
        super(message);
    }
}
