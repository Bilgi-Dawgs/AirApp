package com.airapp.main_service.persistence.sql.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.airapp.main_service.enums.AttendantType;
import com.airapp.main_service.enums.PersonType;
import com.airapp.main_service.enums.Recipes;
import com.airapp.main_service.enums.SeatType;
import com.airapp.main_service.enums.SeniorityLevel;
import com.airapp.main_service.enums.VehicleType;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roster_persons")
public class RosterPersonEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String personId;

    @Enumerated(EnumType.STRING)
    private PersonType type;

    private String name;
    private Integer age;
    private String gender;
    private String nationality;

    private String seatNumber;
    private boolean assignedAutomatically;

    private Boolean isInfant;

    @Enumerated(EnumType.STRING)
    private SeatType seatType;

    private String parentId;

    @ElementCollection
    @CollectionTable(
        name = "roster_person_affiliations",
        joinColumns = @JoinColumn(name = "roster_person_id")
    )
    @Column(name = "affiliated_id")
    private List<String> affiliatedWith = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private SeniorityLevel seniority;

    @Enumerated(EnumType.STRING)
    private AttendantType attendantType;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Recipes> knownRecipes = new HashSet<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<VehicleType> vehicleRestrictions = new HashSet<>();

    private String pilotVehicleRestriction;
    private Integer allowedRangeKm;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roster_id")
    private RosterEntity roster;
}
