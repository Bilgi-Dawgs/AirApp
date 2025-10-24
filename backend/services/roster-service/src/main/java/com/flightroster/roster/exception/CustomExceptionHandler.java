package com.flightroster.roster.exception;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

/**
 * @brief Handles all exceptions thrown within the application.
 * @details Converts exceptions into meaningful HTTP responses.
 */
@RestControllerAdvice
public class CustomExceptionHandler
{
    /**
     * @brief Handles roster not found exceptions.
     */
    @ExceptionHandler(RosterNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleRosterNotFound(RosterNotFoundException ex, HttpServletRequest request)
    {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            "Roster Not Found",
            ex.getMessage(),
            request.getRequestURI()
        );
        return (ResponseEntity.status(HttpStatus.NOT_FOUND).body(error));
    }

    /**
     * @brief Handles validation errors from @Valid annotated DTOs.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request)
    {
        String messages = ex.getBindingResult()
                            .getFieldErrors()
                            .stream()
                            .map(err -> err.getField() + ": " + err.getDefaultMessage())
                            .collect(Collectors.joining(", "));

        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Validation Error",
            messages,
            request.getRequestURI()
        );
        return (ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error));
    }

    /**
     * @brief Handles all uncaught exceptions as internal errors.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request)
    {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal Server Error",
            ex.getMessage(),
            request.getRequestURI()
        );
        return (ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error));
    }
}
