package com.flightroster.roster.dto;

import java.util.List;

import com.flightroster.roster.enums.StorageType;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @brief DTO for creating a new roster record.
 * @details Represents the input body for POST requests.
 */
@Data
public class RosterRequestDto
{
    @NotNull(message = "Flight ID cannot be null")
    private Long flightId;

    @NotEmpty(message = "Crew list cannot be empty")
    private List<Long> crewIds;

    @NotEmpty(message = "Passenger list cannot be empty")
    private List<Long> passengerIds;

    @NotEmpty(message = "Aircraft ID cannot be empty")
    private StorageType storageType;
}
