package com.flightroster.roster.exception;

/**
 * @brief Exception thrown when a requested roster cannot be found.
 * @details Used to signal 404 NOT FOUND errors in the roster service.
 */
public class RosterNotFoundException extends RuntimeException
{
    public RosterNotFoundException(String message)
    {
        super(message);
    }
}
