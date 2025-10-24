package com.flightroster.roster.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightroster.roster.dto.RosterRequestDto;
import com.flightroster.roster.dto.RosterResponseDto;
import com.flightroster.roster.dto.RosterUpdateDto;
import com.flightroster.roster.service.RosterService;

/**
 * @brief REST controller for roster operations.
 * @details Provides endpoints for creating, updating, retrieving and deleting roster data.
 */
@RestController
@RequestMapping("/roster")
@Validated
public class RosterController
{
    private final RosterService service;

    @Autowired
    public RosterController(RosterService service)
    {
        this.service = service;
    }

    // ===================== CREATE =====================

    /**
     * @brief Creates a new roster.
     * @param dto The DTO containing roster creation data.
     * @return ResponseEntity containing the created roster DTO.
     */
    @PostMapping
    public ResponseEntity<RosterResponseDto> createRoster(@RequestBody RosterRequestDto dto)
    {
        RosterResponseDto created = service.createRoster(dto);
        return (ResponseEntity
                .status(HttpStatus.CREATED)
                .header("Location", "/roster/" + created.getId())
                .body(created));
    }

    // ===================== READ =====================

    /**
     * @brief Retrieves all rosters.
     * @return ResponseEntity containing list of all roster DTOs.
     */
    @GetMapping
    public ResponseEntity<List<RosterResponseDto>> getAllRosters()
    {
        List<RosterResponseDto> rosters = service.getAllRosters();
        return (ResponseEntity.ok(rosters));
    }

    /**
     * @brief Retrieves a roster by ID.
     * @param id The roster ID.
     * @return ResponseEntity containing the roster DTO.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RosterResponseDto> getRosterById(@PathVariable Long id)
    {
        RosterResponseDto roster = service.getRosterById(id);
        return (ResponseEntity.ok(roster));
    }

    // ===================== UPDATE =====================

    /**
     * @brief Updates an existing roster.
     * @param id The roster ID.
     * @param dto The DTO containing updated values.
     * @return ResponseEntity containing updated roster DTO.
     */
    @PutMapping("/{id}")
    public ResponseEntity<RosterResponseDto> updateRoster(@PathVariable Long id, @RequestBody RosterUpdateDto dto)
    {
        RosterResponseDto updated = service.updateRoster(id, dto);
        return (ResponseEntity.ok(updated));
    }

    /**
     * @brief Finalizes a roster.
     * @param id The roster ID.
     * @return ResponseEntity containing finalized roster DTO.
     */
    @PatchMapping("/{id}/finalize")
    public ResponseEntity<RosterResponseDto> finalizeRoster(@PathVariable Long id)
    {
        RosterResponseDto finalized = service.finalizeRoster(id);
        return (ResponseEntity.ok(finalized));
    }

    /**
     * @brief Cancels a roster.
     * @param id The roster ID.
     * @return ResponseEntity containing cancelled roster DTO.
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<RosterResponseDto> cancelRoster(@PathVariable Long id)
    {
        RosterResponseDto cancelled = service.cancelRoster(id);
        return (ResponseEntity.ok(cancelled));
    }

    // ===================== DELETE =====================

    /**
     * @brief Deletes a roster by ID.
     * @param id The roster ID.
     * @return ResponseEntity with 204 No Content status.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoster(@PathVariable Long id)
    {
        service.deleteRoster(id);
        return (ResponseEntity.noContent().build());
    }
}
