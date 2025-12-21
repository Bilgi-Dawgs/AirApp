package com.airapp.main_service.exceptions;

public class FlightNotFoundException extends ApiException
{
    public FlightNotFoundException(String flightNumber)
    {
        super("Flight not found: " + flightNumber);
    }
}
