package com.airapp.pilotservice.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final static String DEFAULT_INTERNAL_ERROR_MSG
            = "An unexpected error occurred.";

    // -------------------------------
    //  Pilot Not Found (404)
    // -------------------------------
    @ExceptionHandler(PilotNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePilotNotFound(
            PilotNotFoundException ex,
            HttpServletRequest request
    ) {
        log.warn("PilotNotFoundException at {} {} → {}",
                request.getMethod(),
                request.getRequestURI(),
                ex.getMessage()
        );

        ErrorResponse response = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now(),
                request.getRequestURI()
        );

        return (ResponseEntity.status(HttpStatus.NOT_FOUND).body(response));
    }

    @ExceptionHandler({
        MissingServletRequestParameterException.class,
        MethodArgumentTypeMismatchException.class,
        IllegalArgumentException.class
    })
    public ResponseEntity<ErrorResponse> handleBadRequest(
            Exception ex,
            HttpServletRequest request
    ) {
        log.warn("Bad Request at {} {} → {}",
                request.getMethod(),
                request.getRequestURI(),
                ex.getMessage()
        );

        String message = ex.getMessage();

        if (ex instanceof MissingServletRequestParameterException msrpe) {
            message = "Required parameter is missing: " + msrpe.getParameterName();
        }

        ErrorResponse response = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                message,
                LocalDateTime.now(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    // -------------------------------
    //  General Exception (500)
    // -------------------------------
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception ex,
            HttpServletRequest request
    ) {
        log.error("Unhandled exception at {} {}",
                request.getMethod(),
                request.getRequestURI(),
                ex
        );

        ErrorResponse response = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                DEFAULT_INTERNAL_ERROR_MSG,
                LocalDateTime.now(),
                request.getRequestURI()
        );

        return (ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response));
    }
}
