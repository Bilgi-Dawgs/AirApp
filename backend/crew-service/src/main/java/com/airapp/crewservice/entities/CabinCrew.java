package com.airapp.crewservice.entities;

import java.util.Set;

import com.airapp.crewservice.enums.AttendantType;
import com.airapp.crewservice.enums.Gender;
import com.airapp.crewservice.enums.Recipes;
import com.airapp.crewservice.enums.SeniorityLevel;
import com.airapp.crewservice.enums.VehicleType;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cabin_crew")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CabinCrew
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String nationality;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "crew_languages",
        joinColumns = @JoinColumn(name = "crew_id")
    )
    @Column(name = "language")
    private Set<String> knownLanguages;

    @Enumerated(EnumType.STRING)
    private AttendantType attendantType;

    @Enumerated(EnumType.STRING)
    private SeniorityLevel seniorityLevel;

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
        name = "attendant_vehicle_restrictions",
        joinColumns = @JoinColumn(name = "attendant_id")
    )
    @Column(name = "vehicle_type")
    private Set<VehicleType> vehicleRestrictions;

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
        name = "crew_dish_recipes", 
        joinColumns = @JoinColumn(name = "crew_id")
    )
    @Column(name = "dish_name")
    private Set<Recipes> dishRecipes;

}