package com.airapp.pilotservice.exceptions;

public class PilotNotFoundException extends RuntimeException 
{
    public PilotNotFoundException(Long id) 
    {
        super("Pilot not found with ID: " + id);
    }
}
