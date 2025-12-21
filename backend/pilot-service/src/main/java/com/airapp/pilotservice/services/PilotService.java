package com.airapp.pilotservice.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.airapp.pilotservice.dto.PilotResponse;
import com.airapp.pilotservice.entities.Pilot;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;
import com.airapp.pilotservice.exceptions.PilotNotFoundException;
import com.airapp.pilotservice.mappers.PilotMapper;
import com.airapp.pilotservice.repositories.PilotRepository;

@Service
public class PilotService {

    private final PilotRepository pilotRepository;
    private final PilotMapper pilotMapper;

    public PilotService(PilotRepository pilotRepository, PilotMapper pilotMapper) {
        this.pilotRepository = pilotRepository;
        this.pilotMapper = pilotMapper;
    }

    public PilotResponse getPilot(Long id)
    {
        Pilot pilot = pilotRepository.findById(id).orElse(null);

        if (pilot == null) {
            throw  new PilotNotFoundException(id);
        }

        return pilotMapper.toResponse(pilot);
    }


    public List<PilotResponse> getAllPilots() {
        return pilotRepository.findAll().stream()
                .map(pilotMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<PilotResponse> findEligiblePilots(
        VehicleType vehicle, 
        int range, 
        SeniorityLevel seniority) 
    {
        
        List<Pilot> candidates = pilotRepository.findByVehicleRestrictionAndSeniority(vehicle, seniority);

        if (candidates == null)
            return List.of();

        return candidates.stream()
                .filter(p -> p.getAllowedRangeKm() >= range)
                .map(pilotMapper::toResponse)
                .collect(Collectors.toList());
    }
}