package com.flightroster.roster.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightroster.roster.dto.RosterRequestDto;
import com.flightroster.roster.dto.RosterResponseDto;
import com.flightroster.roster.dto.RosterUpdateDto;
import com.flightroster.roster.entity.Roster;
import com.flightroster.roster.entity.Status;
import com.flightroster.roster.exception.RosterNotFoundException;
import com.flightroster.roster.mapper.RosterMapper;
import com.flightroster.roster.repository.sql.RosterJpaRepository;

/**
 * @brief Handles business logic for Roster management.
 * @details Performs CRUD operations and roster-specific lifecycle actions.
 */
@Service
public class RosterService
{
    private final RosterJpaRepository repository;
    private final RosterMapper mapper;

    @Autowired
    public RosterService(RosterJpaRepository repository, RosterMapper mapper)
    {
        this.repository = repository;
        this.mapper = mapper;
    }

    // ===================== CREATE =====================

    /**
     * @brief Creates a new roster record.
     * @param dto The DTO containing roster creation data.
     * @return The created RosterResponseDto.
     */
    public RosterResponseDto createRoster(RosterRequestDto dto)
    {
        Roster roster = mapper.toEntity(dto);
        roster.setStatus(Status.DRAFT);
        roster.setCreatedAt(LocalDateTime.now());
        roster.setUpdatedAt(LocalDateTime.now());

        Roster saved = repository.save(roster);
        return (mapper.toDto(saved));
    }

    // ===================== READ =====================

    /**
     * @brief Retrieves all rosters.
     * @return List of roster DTOs.
     */
    public List<RosterResponseDto> getAllRosters()
    {
        return (repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList()));
    }

    /**
     * @brief Retrieves a roster by ID.
     * @param id The roster ID.
     * @return The found roster as DTO.
     * @throws RosterNotFoundException If roster does not exist.
     */
    public RosterResponseDto getRosterById(Long id)
    {
        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        return (mapper.toDto(roster));
    }

    // ===================== UPDATE =====================

    /**
     * @brief Updates an existing roster.
     * @param id The roster ID.
     * @param dto DTO containing updated values.
     * @return Updated roster DTO.
     * @throws RosterNotFoundException If roster does not exist.
     */
    public RosterResponseDto updateRoster(Long id, RosterUpdateDto dto)
    {
        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        mapper.updateEntity(dto, roster);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster updated = repository.save(roster);
        return (mapper.toDto(updated));
    }

    /**
     * @brief Finalizes a roster.
     * @param id The roster ID.
     * @return Finalized roster DTO.
     */
    public RosterResponseDto finalizeRoster(Long id)
    {
        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        roster.setStatus(Status.FINALIZED);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster finalized = repository.save(roster);
        return (mapper.toDto(finalized));
    }

    /**
     * @brief Cancels a roster.
     * @param id The roster ID.
     * @return Cancelled roster DTO.
     */
    public RosterResponseDto cancelRoster(Long id)
    {
        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        roster.setStatus(Status.CANCELLED);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster cancelled = repository.save(roster);
        return (mapper.toDto(cancelled));
    }

    // ===================== DELETE =====================

    /**
     * @brief Deletes a roster by ID.
     * @param id The roster ID.
     * @throws RosterNotFoundException If roster does not exist.
     */
    public void deleteRoster(Long id)
    {
        if (!repository.existsById(id))
            throw (new RosterNotFoundException("Roster with ID " + id + " not found"));

        repository.deleteById(id);
    }
}
