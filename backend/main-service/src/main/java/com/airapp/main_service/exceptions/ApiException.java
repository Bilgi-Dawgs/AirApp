package com.airapp.main_service.exceptions;

public abstract class ApiException extends RuntimeException
{
    protected ApiException(String message)
    {
        super(message);
    }
}
