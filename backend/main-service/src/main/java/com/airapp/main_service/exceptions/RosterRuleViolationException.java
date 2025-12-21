package com.airapp.main_service.exceptions;

public class RosterRuleViolationException extends ApiException
{
    public RosterRuleViolationException(String message)
    {
        super(message);
    }
}
