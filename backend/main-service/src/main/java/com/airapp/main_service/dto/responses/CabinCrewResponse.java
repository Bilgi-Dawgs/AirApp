package com.airapp.main_service.dto.responses;

import java.util.Set;

import com.airapp.main_service.enums.AttendantType;
import com.airapp.main_service.enums.Recipes;
import com.airapp.main_service.enums.SeniorityLevel;
import com.airapp.main_service.enums.VehicleType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CabinCrewResponse {
    private Long id;
    private String name;
    private AttendantType attendantType;   // Map to Enum
    private SeniorityLevel seniorityLevel;  // Map to Enum
    private Set<Recipes> recipes;    // Map to Enum
    private Set<VehicleType> vehicleRestrictions; // Map to Enum
}