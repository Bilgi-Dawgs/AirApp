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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flightroster.roster.dto.RosterRequestDto;
import com.flightroster.roster.dto.RosterResponseDto;
import com.flightroster.roster.dto.RosterUpdateDto;
import com.flightroster.roster.enums.StorageType;
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

    // ============================================================
    // PUBLIC ENDPOINTS
    // ============================================================

    /**
     * @brief [GET] /roster/{id}
     * @details Retrieve a single roster by its ID (Public)
     */
    @GetMapping("/{id}")
    public ResponseEntity<RosterResponseDto> getRosterById(
        @PathVariable Long id,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        RosterResponseDto roster = service.getRosterById(id, storageType);
        return (ResponseEntity.ok(roster));
    }

    /**
     * @brief [GET] /roster
     * @details Retrieve all rosters (Public)
     */
    @GetMapping
    public ResponseEntity<List<RosterResponseDto>> getAllRosters(
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        List<RosterResponseDto> rosters = service.getAllRosters(storageType);
        return (ResponseEntity.ok(rosters));
    }

    // ============================================================
    // PROTECTED ENDPOINTS
    // ============================================================

    /**
     * @brief [POST] /roster
     * @details Create a new roster (Protected)
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

    /**
     * @brief [PUT] /roster/{id}
     * @details Update an existing roster (Protected)
     */
    @PutMapping("/{id}")
    public ResponseEntity<RosterResponseDto> updateRoster(
        @PathVariable Long id,
        @RequestBody RosterUpdateDto dto,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        RosterResponseDto updated = service.updateRoster(id, dto, storageType);
        return (ResponseEntity.ok(updated));
    }

    /**
     * @brief [PATCH] /roster/{id}/finalize
     * @details Finalize a roster (Protected)
     */
    @PatchMapping("/{id}/finalize")
    public ResponseEntity<RosterResponseDto> finalizeRoster(
        @PathVariable Long id,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        RosterResponseDto finalized = service.finalizeRoster(id, storageType);
        return (ResponseEntity.ok(finalized));
    }

    /**
     * @brief [PATCH] /roster/{id}/cancel
     * @details Cancel a roster (Protected)
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<RosterResponseDto> cancelRoster(
        @PathVariable Long id,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        RosterResponseDto cancelled = service.cancelRoster(id, storageType);
        return (ResponseEntity.ok(cancelled));
    }

    /**
     * @brief [DELETE] /roster/{id}
     * @details Delete a roster (Protected)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoster(
        @PathVariable Long id,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        service.deleteRoster(id, storageType);
        return (ResponseEntity.noContent().build());
    }

    // ============================================================
    // ADMIN ENDPOINTS
    // ============================================================

    /**
     * @brief [DELETE] /roster/admin/hard-delete/{id}
     * @details Permanently delete a roster (Admin only)
     */
    @DeleteMapping("/admin/hard-delete/{id}")
    public ResponseEntity<Void> hardDeleteRoster(
        @PathVariable Long id,
        @RequestParam(defaultValue = "SQL") StorageType storageType)
    {
        service.hardDeleteRoster(id, storageType);
        return (ResponseEntity.noContent().build());
    }

    // ============================================================
    // INTERNAL ENDPOINTS (Service-to-service communication)
    // ============================================================

    /**
     * @brief [GET] /roster/internal/list
     * @details Return all roster summaries (Internal)
     */
    // @GetMapping("/internal/list")

    /**
     * @brief [POST] /roster/internal/sync
     * @details Sync roster data with other services (Internal)
     */
    // @PostMapping("/internal/sync")

    /**
     * @brief [PATCH] /roster/internal/status/{id}
     * @details Update roster status internally (Internal)
     */
    // @PatchMapping("/internal/status/{id}")

    /**
     * @brief [GET] /roster/internal/flight/{flightId}
     * @details Retrieve rosters for a specific flight (Internal)
     */
    // @GetMapping("/internal/flight/{flightId}")
}
