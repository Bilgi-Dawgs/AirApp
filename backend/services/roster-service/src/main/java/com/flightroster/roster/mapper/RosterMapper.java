package com.flightroster.roster.mapper;

import org.springframework.stereotype.Component;

import com.flightroster.roster.dto.RosterRequestDto;
import com.flightroster.roster.dto.RosterResponseDto;
import com.flightroster.roster.dto.RosterUpdateDto;
import com.flightroster.roster.entity.Roster;

/**
 * @brief Handles conversion between Roster entity and DTOs.
 * @details This mapper isolates the transformation logic between
 * the API layer (DTOs) and persistence layer (Entity).
 */
@Component
public class RosterMapper
{
    /**
     * @brief Converts a RosterRequestDto to a Roster entity.
     * @param dto The DTO containing roster creation data.
     * @return A Roster entity ready to be persisted in the database.
     */
    public Roster toEntity(RosterRequestDto dto)
    {
        if (dto == null)
            return (null);

        Roster roster = new Roster();
        roster.setFlightId(dto.getFlightId());
        roster.setCrewIds(dto.getCrewIds());
        roster.setPassengerIds(dto.getPassengerIds());

        // Default fields handled by JPA (status, createdAt, updatedAt)
        return (roster);
    }

    /**
     * @brief Updates an existing Roster entity using values from a RosterUpdateDto.
     * @param dto The DTO containing updated roster data.
     * @param roster The entity to update.
     */
    public void updateEntity(RosterUpdateDto dto, Roster roster)
    {
        if (dto == null || roster == null)
            return ;

        if (dto.getCrewIds() != null)
            roster.setCrewIds(dto.getCrewIds());

        if (dto.getPassengerIds() != null)
            roster.setPassengerIds(dto.getPassengerIds());

        if (dto.getStatus() != null)
            roster.setStatus(dto.getStatus());
    }

    /**
     * @brief Converts a Roster entity to a RosterResponseDto.
     * @param roster The Roster entity fetched from the database.
     * @return A RosterResponseDto suitable for returning to the client.
     */
    public RosterResponseDto toDto(Roster roster)
    {
        if (roster == null)
            return (null);

        RosterResponseDto dto = new RosterResponseDto();
        dto.setId(roster.getId());
        dto.setFlightId(roster.getFlightId());
        dto.setCrewIds(roster.getCrewIds());
        dto.setPassengerIds(roster.getPassengerIds());
        dto.setStatus(roster.getStatus());
        dto.setCreatedAt(roster.getCreatedAt());
        dto.setUpdatedAt(roster.getUpdatedAt());

        return (dto);
    }
}
