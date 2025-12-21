package com.airapp.pilotservice.services;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.airapp.pilotservice.dto.PilotResponse;
import com.airapp.pilotservice.entities.Pilot;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;
import com.airapp.pilotservice.exceptions.PilotNotFoundException;
import com.airapp.pilotservice.mappers.PilotMapper;
import com.airapp.pilotservice.repositories.PilotRepository;

@ExtendWith(MockitoExtension.class)
class PilotServiceTest
{
    @Mock
    private PilotRepository pilotRepository;

    @Mock
    private PilotMapper pilotMapper;

    @InjectMocks
    private PilotService pilotService;

    @Test
    void should_return_eligible_pilots_by_vehicle_and_range()
    {
        Pilot pilot = new Pilot();
        pilot.setId(1L);
        pilot.setName("Senior John");
        pilot.setVehicleRestriction(VehicleType.BOEING_777);
        pilot.setAllowedRangeKm(12000);
        pilot.setSeniority(SeniorityLevel.SENIOR);

        PilotResponse response = new PilotResponse();
        response.setId(1L);
        response.setName("Senior John");
        response.setVehicleRestriction(VehicleType.BOEING_777);
        response.setAllowedRangeKm(12000);
        response.setSeniority(SeniorityLevel.SENIOR);

        when(
            pilotRepository.findByVehicleRestrictionAndSeniority(
                VehicleType.BOEING_777,
                SeniorityLevel.SENIOR
            )
        ).thenReturn(List.of(pilot));

        when(pilotMapper.toResponse(pilot))
            .thenReturn(response);

        List<PilotResponse> result =
            pilotService.findEligiblePilots(
                VehicleType.BOEING_777,
                10000,
                SeniorityLevel.SENIOR
            );

        assertEquals(1, result.size());
        assertEquals("Senior John", result.get(0).getName());
    }

    @Test
    void should_filter_out_pilots_with_insufficient_range()
    {
        Pilot pilot = new Pilot();
        pilot.setAllowedRangeKm(5000);
        pilot.setSeniority(SeniorityLevel.SENIOR);
        pilot.setVehicleRestriction(VehicleType.BOEING_777);

        when(
            pilotRepository.findByVehicleRestrictionAndSeniority(
                VehicleType.BOEING_777,
                SeniorityLevel.SENIOR
            )
        ).thenReturn(List.of(pilot));

        List<PilotResponse> result =
            pilotService.findEligiblePilots(
                VehicleType.BOEING_777,
                8000,
                SeniorityLevel.SENIOR
            );

        assertTrue(result.isEmpty());
    }

    @Test
    void should_return_empty_list_when_repository_returns_empty()
    {
        when(
            pilotRepository.findByVehicleRestrictionAndSeniority(
                any(),
                any()
            )
        ).thenReturn(List.of());

        List<PilotResponse> result =
            pilotService.findEligiblePilots(
                VehicleType.AIRBUS_A320,
                3000,
                SeniorityLevel.JUNIOR
            );

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void should_return_empty_list_when_repository_returns_null()
    {
        when(
            pilotRepository.findByVehicleRestrictionAndSeniority(
                any(),
                any()
            )
        ).thenReturn(null);

        List<PilotResponse> result =
            pilotService.findEligiblePilots(
                VehicleType.AIRBUS_A320,
                3000,
                SeniorityLevel.JUNIOR
            );

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void should_throw_exception_when_pilot_not_found()
    {
        when(pilotRepository.findById(99L))
            .thenReturn(Optional.empty());

        assertThrows(
            PilotNotFoundException.class,
            () -> pilotService.getPilot(99L)
        );
    }

    @Test
    void should_return_pilot_when_found()
    {
        Pilot pilot = new Pilot();
        pilot.setId(1L);

        PilotResponse response = new PilotResponse();
        response.setId(1L);

        when(pilotRepository.findById(1L))
            .thenReturn(Optional.of(pilot));

        when(pilotMapper.toResponse(pilot))
            .thenReturn(response);

        PilotResponse result = pilotService.getPilot(1L);

        assertEquals(1L, result.getId());
    }


}
