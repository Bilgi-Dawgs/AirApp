package com.airapp.main_service.exceptions;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    private ResponseEntity<Map<String, Object>> build(
        HttpStatus status,
        String message
    )
    {
        return ResponseEntity
            .status(status)
            .body(
                Map.of(
                    "status", status.value(),
                    "error", message,
                    "timestamp", LocalDateTime.now()
                )
            );
    }

    @ExceptionHandler(FlightNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleFlightNotFound(
        FlightNotFoundException ex
    )
    {
        return build(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(RosterAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleRosterExists(
        RosterAlreadyExistsException ex
    )
    {
        return build(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(RosterRuleViolationException.class)
    public ResponseEntity<Map<String, Object>> handleRuleViolation(
        RosterRuleViolationException ex
    )
    {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(RosterMappingException.class)
    public ResponseEntity<Map<String, Object>> handleMapping(
        RosterMappingException ex
    )
    {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // @ExceptionHandler(Exception.class)
    // public ResponseEntity<Map<String, Object>> handleUnexpected(
    //     Exception ex
    // )
    // {
    //     return build(
    //         HttpStatus.INTERNAL_SERVER_ERROR,
    //         "Unexpected server error"
    //     );
    // }
}
