package com.airapp.crewservice.dto;

import java.util.Set;

import com.airapp.crewservice.enums.AttendantType;
import com.airapp.crewservice.enums.Recipes;
import com.airapp.crewservice.enums.SeniorityLevel;
import com.airapp.crewservice.enums.VehicleType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CabinCrewResponse
{
    private Long id;

    private String name;

    private AttendantType attendantType;
    private SeniorityLevel seniorityLevel;

    private Set<Recipes> recipes;

    private Set<VehicleType> vehicleRestrictions;
}
