package com.flightroster.user.exceptions;

/**
 * Thrown when trying to register an already existing email
 */
public class EmailAlreadyExistsException extends RuntimeException
{
    public EmailAlreadyExistsException(String message)
    {
        super(message);
    }
}
