package com.airapp.crewservice.services;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.airapp.crewservice.dto.CabinCrewResponse;
import com.airapp.crewservice.entities.CabinCrew;
import com.airapp.crewservice.enums.AttendantType;
import com.airapp.crewservice.enums.VehicleType;
import com.airapp.crewservice.mappers.CabinCrewMapper;
import com.airapp.crewservice.repositories.CabinCrewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CabinCrewService 
{
    private final CabinCrewRepository cabinCrewRepository;
    private final CabinCrewMapper cabinCrewMapper;

    public CabinCrewResponse getCabinCrew(Long id)
    {
        CabinCrew crew = cabinCrewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cabin crew not found with id: " + id));

        return cabinCrewMapper.toResponse(crew);
    }


    public List<CabinCrewResponse> getAllCabinCrew() 
    {
        List<CabinCrew> crewList = cabinCrewRepository.findAll();
        return cabinCrewMapper.toResponseList(crewList);
    }


    public List<CabinCrewResponse> findEligibleCabinCrew(VehicleType vehicle, AttendantType type)
    {
        return cabinCrewRepository
                .findByAttendantType(type).stream()
                .filter(crew -> crew.getVehicleRestrictions() != null &&
                        crew.getVehicleRestrictions().contains(vehicle))
                .map(cabinCrewMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<CabinCrewResponse> getCrewByIds(
        List<Long> ids,
        AttendantType type
    )
    {
        if (ids == null || ids.isEmpty())
            return List.of();

        if (type == null)
            throw new IllegalArgumentException("AttendantType must not be null");

        return cabinCrewRepository.findAllById(ids).stream()
            .filter(Objects::nonNull)
            .filter(crew -> crew.getAttendantType() == type)
            .map(cabinCrewMapper::toResponse)
            .toList();
    }
}