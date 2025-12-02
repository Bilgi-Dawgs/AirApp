package com.flightroster.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for the entire user service
 * Ensures consistent JSON responses for all exceptions
 */
@RestControllerAdvice
public class GlobalExceptionHandler
{
    /**
     * Handles UserNotFoundException
     * 
     * @return 404 NOT FOUND
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex)
    {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value(), null);

        return (new ResponseEntity<>(response, HttpStatus.NOT_FOUND));
    }

    /**
     * Handles EmailAlreadyExistsException
     * 
     * @return 409 CONFLICT
     */
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailConflict(EmailAlreadyExistsException ex)
    {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.CONFLICT.value(), null);

        return (new ResponseEntity<>(response, HttpStatus.CONFLICT));
    }

    /**
     * Handles UserValidationException
     * 
     * @return 400 BAD REQUEST
     */
    @ExceptionHandler(UserValidationException.class)
    public ResponseEntity<Object> handleUserValidationException(UserValidationException ex) 
    {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles all other unexpected exceptions
     * 
     * @return 500 INTERNAL SERVER ERROR
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex)
    {
        ErrorResponse response = new ErrorResponse("Internal server error: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
        return (new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR));
    }
}
