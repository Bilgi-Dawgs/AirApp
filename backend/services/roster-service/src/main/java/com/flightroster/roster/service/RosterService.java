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
import com.flightroster.roster.enums.Status;
import com.flightroster.roster.enums.StorageType;
import com.flightroster.roster.exception.RosterNotFoundException;
import com.flightroster.roster.mapper.RosterMapper;
import com.flightroster.roster.repository.RosterRepositoryBase;
import com.flightroster.roster.repository.sql.RosterJpaRepository;
import com.flightroster.roster.repository.nosql.RosterMongoRepository;

/**
 * @brief Handles business logic for Roster management.
 * @details Provides CRUD operations and state transitions across both SQL and NoSQL databases.
 */
@Service
public class RosterService
{
    private final RosterJpaRepository sqlRepository;
    private final RosterMongoRepository nosqlRepository;
    private final RosterMapper mapper;

    @Autowired
    public RosterService(RosterJpaRepository sqlRepository, RosterMongoRepository nosqlRepository, RosterMapper mapper)
    {
        this.sqlRepository = sqlRepository;
        this.nosqlRepository = nosqlRepository;
        this.mapper = mapper;
    }

    // ============================================================
    // INTERNAL UTILITY
    // ============================================================

    /**
     * @brief Chooses correct repository based on storage type.
     */
    private RosterRepositoryBase getRepository(StorageType type)
    {
        return (type == StorageType.NOSQL) ? nosqlRepository : sqlRepository;
    }

    // ============================================================
    // PROTECTED ENDPOINTS (Require authentication)
    // ============================================================

    /**
     * @brief Creates a new roster record in the selected storage (Protected).
     * @param dto The DTO containing roster creation data and chosen storageType.
     * @return The created roster DTO.
     */
    public RosterResponseDto createRoster(RosterRequestDto dto)
    {
        StorageType type = dto.getStorageType();
        if (type == null)
            throw new IllegalArgumentException("Storage type must be specified (SQL or NOSQL)");

        RosterRepositoryBase repository = getRepository(type);

        Roster roster = mapper.toEntity(dto);
        roster.setStatus(Status.DRAFT);
        roster.setCreatedAt(LocalDateTime.now());
        roster.setUpdatedAt(LocalDateTime.now());

        Roster saved = repository.save(roster);
        return mapper.toDto(saved);
    }

    /**
     * @brief Updates an existing roster (Protected).
     * @param id The roster ID.
     * @param dto DTO containing updated values.
     * @param type The target storage type.
     * @return Updated roster DTO.
     */
    public RosterResponseDto updateRoster(Long id, RosterUpdateDto dto, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        mapper.updateEntity(dto, roster);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster updated = repository.save(roster);
        return mapper.toDto(updated);
    }

    /**
     * @brief Finalizes a roster (Protected).
     * @param id The roster ID.
     * @param type The target storage type.
     * @return Finalized roster DTO.
     */
    public RosterResponseDto finalizeRoster(Long id, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        roster.setStatus(Status.FINALIZED);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster finalized = repository.save(roster);
        return mapper.toDto(finalized);
    }

    /**
     * @brief Cancels a roster (Protected).
     * @param id The roster ID.
     * @param type The target storage type.
     * @return Cancelled roster DTO.
     */
    public RosterResponseDto cancelRoster(Long id, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        roster.setStatus(Status.CANCELLED);
        roster.setUpdatedAt(LocalDateTime.now());

        Roster cancelled = repository.save(roster);
        return mapper.toDto(cancelled);
    }

    /**
     * @brief Deletes a roster by ID (Protected).
     * @param id The roster ID.
     * @param type The target storage type.
     * @throws RosterNotFoundException If roster does not exist.
     */
    public void deleteRoster(Long id, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        if (!repository.existsById(id))
            throw new RosterNotFoundException("Roster with ID " + id + " not found");

        repository.deleteById(id);
    }

    // ============================================================
    // PUBLIC ENDPOINTS
    // ============================================================

    /**
     * @brief Retrieves all rosters (Public/Admin).
     * @param type The target storage type.
     * @return List of roster DTOs.
     */
    public List<RosterResponseDto> getAllRosters(StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * @brief Retrieves a roster by ID (Public).
     * @param id The roster ID.
     * @param type The target storage type.
     * @return The found roster as DTO.
     */
    public RosterResponseDto getRosterById(Long id, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        Roster roster = repository.findById(id)
                .orElseThrow(() -> new RosterNotFoundException("Roster with ID " + id + " not found"));

        return mapper.toDto(roster);
    }

    // ============================================================
    // ADMIN ENDPOINTS
    // ============================================================

    /**
     * @brief Hard deletes a roster (Admin only).
     * @param id The roster ID.
     * @param type The target storage type.
     */
    public void hardDeleteRoster(Long id, StorageType type)
    {
        RosterRepositoryBase repository = getRepository(type);

        if (!repository.existsById(id))
            throw new RosterNotFoundException("Roster with ID " + id + " not found");

        repository.deleteById(id);
    }

    // ============================================================
    // ⚙️ INTERNAL ENDPOINTS (Service-to-Service communication)
    // ============================================================

    // These will be implemented when roster sync and flight integration is added:
    // - getRostersByFlightId()
    // - syncRosterData()
    // - updateStatusInternal()
}
