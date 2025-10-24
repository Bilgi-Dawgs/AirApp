package com.flightroster.roster.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @brief Represents a standard error response structure.
 * @details Returned to the client when an exception occurs.
 */
@Data
@AllArgsConstructor
public class ErrorResponse
{
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
