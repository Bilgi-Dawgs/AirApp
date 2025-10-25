package com.flightroster.roster.enums;

/**
 * @brief Enumeration representing possible roster states.
 */
public enum Status
{
    DRAFT,      // Roster created but not finalized
    FINALIZED,  // Confirmed and locked
    CANCELLED   // Invalidated or withdrawn
}