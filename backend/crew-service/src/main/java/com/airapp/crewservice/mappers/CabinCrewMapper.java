package com.airapp.crewservice.mappers;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;
 
import com.airapp.crewservice.dto.CabinCrewResponse;
import com.airapp.crewservice.entities.CabinCrew;
import com.airapp.crewservice.enums.AttendantType;

@Component
public class CabinCrewMapper
{
    public CabinCrewResponse toResponse(CabinCrew crew)
    {
        CabinCrewResponse response = new CabinCrewResponse();

        response.setId(crew.getId());
        response.setName(crew.getName());
        response.setAttendantType(crew.getAttendantType());
        response.setSeniorityLevel(crew.getSeniorityLevel());

        // Only CHEF should have recipes,
        // others return empty set
        if (crew.getAttendantType() == AttendantType.CHEF)
        {
            response.setRecipes(crew.getDishRecipes());
        }
        else
        {
            response.setRecipes(Collections.emptySet());
        }

        response.setVehicleRestrictions(crew.getVehicleRestrictions());

        return (response);

    }
    
    public List<CabinCrewResponse> toResponseList(List<CabinCrew> crewList) 
    {

        if (crewList == null || crewList.isEmpty())
            return (Collections.emptyList()); 

        return (crewList.stream()
                .map(this::toResponse)
                .toList());

    }
        
}
