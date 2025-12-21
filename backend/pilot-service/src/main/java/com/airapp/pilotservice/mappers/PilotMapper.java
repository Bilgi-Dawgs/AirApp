package com.airapp.pilotservice.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.airapp.pilotservice.dto.PilotResponse;
import com.airapp.pilotservice.entities.Pilot;

@Component
public class PilotMapper 
{

    // Entity -> DTO
    public PilotResponse toResponse(Pilot pilot)
    {
        if (pilot == null)
            return (null);

        PilotResponse dto = new PilotResponse();

        dto.setId(pilot.getId());
        dto.setName(pilot.getName());
        dto.setVehicleRestriction(pilot.getVehicleRestriction());
        dto.setAllowedRangeKm(pilot.getAllowedRangeKm());
        dto.setSeniority(pilot.getSeniority());

        return (dto);
    }

    // List<Entity> -> List<DTO>
    public List<PilotResponse> toResponseList(List<Pilot> pilots)
    {
        if (pilots == null)
             return (List.of());

        return (pilots.stream()
                .map(this::toResponse)
                .collect(Collectors.toList()));
    }
}
