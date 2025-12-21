package com.airapp.pilotservice.entities;

import java.util.Set;

import com.airapp.pilotservice.enums.Gender;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Pilot Entity - Represents pilot information and capabilities
 * 
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pilot 
{
    
    /**
     * Unique identifier for the pilot
     * Auto-generated using database sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==================== PERSONAL INFORMATION ====================
    
    /**
     * Pilot's full name
     * Cannot be empty or null
     */
    @NotBlank
    private String name;

    /**
     * Pilot's age in years
     */
    private int age;

    /**
     * Pilot's gender
     * Values: MALE, FEMALE, OTHER
     */
    @Enumerated(EnumType.STRING)
    private Gender gender;

    /**
     * Pilot's nationality/country of origin
     * Cannot be empty or null
     */
    @NotBlank
    private String nationality;


    // ==================== QUALIFICATIONS & CERTIFICATIONS ====================
    
    /**
     * List of languages the pilot can speak fluently
     * Stored as multiple collection elements in database
     * Example: ["English", "Turkish", "German"]
     */
    @ElementCollection
    private Set<String> languages;

    /**
     * Aircraft type restriction for this pilot
     * Determines which aircraft types the pilot is certified to operate
     */
    @Enumerated(EnumType.STRING)
    private VehicleType vehicleRestriction;

    /**
     * Maximum allowed flight range for this pilot in kilometers
     * Must be a positive value
     * Example: 5000 km maximum range per flight
     */
    @Positive
    private int allowedRangeKm;

    /**
     * Pilot's experience and seniority level
     * Values: JUNIOR, SENIOR, CAPTAIN, INSTRUCTOR, etc.
     * Determines pilot's qualifications and responsibilities
     */
    @Enumerated(EnumType.STRING)
    private SeniorityLevel seniority;
}