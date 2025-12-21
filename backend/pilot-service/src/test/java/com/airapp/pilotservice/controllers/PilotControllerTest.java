package com.airapp.pilotservice.controllers;

import java.util.List;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.airapp.pilotservice.dto.PilotResponse;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;
import com.airapp.pilotservice.exceptions.PilotNotFoundException;
import com.airapp.pilotservice.services.PilotService;

@WebMvcTest(PilotControllers.class)
class PilotControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PilotService pilotService;

    // =====================================
    // GET /pilot-service/{id}
    // =====================================

    @Test
    void shouldReturnPilot_whenIdIsValid() throws Exception
    {
        PilotResponse pilot = new PilotResponse(
            1L,
            "John Doe",
            VehicleType.BOEING_777,
            8000,
            SeniorityLevel.SENIOR
        );

        when(pilotService.getPilot(1L))
            .thenReturn(pilot);

        mockMvc.perform(get("/pilot-service/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("John Doe"))
            .andExpect(jsonPath("$.seniority").value("SENIOR"));
    }

    @Test
    void shouldReturnNotFound_whenPilotDoesNotExist() throws Exception
    {
        when(pilotService.getPilot(99L))
            .thenThrow(new PilotNotFoundException(99L));

        mockMvc.perform(get("/pilot-service/99"))
            .andExpect(status().isNotFound());
    }

    // =====================================
    // GET /pilot-service/eligible
    // =====================================

    @Test
    void shouldReturnEligiblePilots_whenParamsAreValid() throws Exception
    {
        PilotResponse pilot = new PilotResponse(
            2L,
            "Jane Smith",
            VehicleType.BOEING_777,
            6000,
            SeniorityLevel.JUNIOR
        );

        when(pilotService.findEligiblePilots(
                VehicleType.BOEING_777,
                4500,
                SeniorityLevel.JUNIOR
            ))
            .thenReturn(List.of(pilot));

        mockMvc.perform(
                get("/pilot-service/eligible")
                    .param("vehicleType", "BOEING_777")
                    .param("range", "4500")
                    .param("seniority", "JUNIOR")
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(2))
            .andExpect(jsonPath("$[0].name").value("Jane Smith"));
    }

    @Test
    void shouldReturnBadRequest_whenQueryParamsAreMissing() throws Exception
    {
        mockMvc.perform(
                get("/pilot-service/eligible")
                    .param("vehicleType", "BOEING_777")
            )
            .andExpect(status().isBadRequest());
    }
}
