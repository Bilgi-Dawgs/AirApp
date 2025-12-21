package com.airapp.main_service.domains;

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

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RosterPerson
{
    // Persistence isterse doldurur, domain umursamaz
    private Long id;

    // External service ID (Passenger / Pilot / Crew)
    private String personId;

    private PersonType type;

    private String name;
    private Integer age;
    private String gender;
    private String nationality;

    // === Seat Info ===
    private String seatNumber;
    private boolean assignedAutomatically;

    // === Passenger Specific ===
    private Boolean isInfant;
    private SeatType seatType;
    private String parentId;

    private List<String> affiliatedWith = new ArrayList<>();

    // === Crew Specific ===
    private SeniorityLevel seniority;
    private AttendantType attendantType;

    private Set<Recipes> knownRecipes = new HashSet<>();
    private Set<VehicleType> vehicleRestrictions = new HashSet<>();

    // === Pilot Specific ===
    private String pilotVehicleRestriction;
    private Integer allowedRangeKm;
}
