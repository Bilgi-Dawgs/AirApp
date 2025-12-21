package com.airapp.main_service.exceptions;

public class RosterAlreadyExistsException extends ApiException
{
    public RosterAlreadyExistsException(String flightNumber)
    {
        super("Roster already exists for flight: " + flightNumber);
    }
}
