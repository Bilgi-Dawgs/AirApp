package com.flightroster.roster.dto;

import java.util.List;

import com.flightroster.roster.entity.Status;

import lombok.Data;

/**
 * @brief DTO for updating roster records.
 * @details Used for PUT or PATCH requests to modify existing roster data.
 */
@Data
public class RosterUpdateDto
{
    private List<Long> crewIds;
    private List<Long> passengerIds;
    private Status status;
}
