package com.flightroster.roster.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.flightroster.roster.enums.Status;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @brief Represents a flight roster record in the system.
 * @details Maps crew and passenger assignments for a flight
 * and tracks the lifecycle (draft, finalized, cancelled).
 */
@Entity
@Table(name = "rosters")
@Document(collection = "rosters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Roster
{
    /*
     * Unique identifier for the roster
     * Auto-generated primary key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Associated flight ID for this roster
     * Foreign key reference from Flight Service
     */
    @Column(nullable = false)
    private Long flightId;

    /*
     * List of assigned crew member IDs
     * Referenced from Crew Service
     */
    @ElementCollection
    @CollectionTable(name = "roster_crew_ids", joinColumns = @JoinColumn(name = "roster_id"))
    @Column(name = "crew_id")
    private List<Long> crewIds;

    /*
     * List of assigned passenger IDs
     * Referenced from Passenger Service
     */
    @ElementCollection
    @CollectionTable(name = "roster_passenger_ids", joinColumns = @JoinColumn(name = "roster_id"))
    @Column(name = "passenger_id")
    private List<Long> passengerIds;

    /*
     * Current roster status
     * Enum defines lifecycle state
     * Default: DRAFT
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.DRAFT;

    /*
     * Record creation timestamp
     * Automatically set on creation
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /*
     * Record last updated timestamp
     * Automatically updated on modification
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate()
    {
        this.updatedAt = LocalDateTime.now();
    }
}
