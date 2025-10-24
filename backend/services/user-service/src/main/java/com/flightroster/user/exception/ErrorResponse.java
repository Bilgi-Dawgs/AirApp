package com.flightroster.user.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @brief Standard error response for API exceptions
 */
@Data
@AllArgsConstructor
public class ErrorResponse
{
    /*
     * Human-readable error message
     */
    private String message;

    /*
     * HTTP status code (e.g., 404, 400, 500)
     */
    private int status;

    /*
     * Time when the error occurred
     */
    private LocalDateTime timestamp = LocalDateTime.now();
}
