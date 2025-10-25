package com.flightroster.roster.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.flightroster.roster.enums.Status;

import lombok.Data;

/**
 * @brief DTO for roster response payload.
 * @details Represents data returned to the client after operations.
 */
@Data
public class RosterResponseDto
{
    private Long id;
    private Long flightId;
    private List<Long> crewIds;
    private List<Long> passengerIds;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
