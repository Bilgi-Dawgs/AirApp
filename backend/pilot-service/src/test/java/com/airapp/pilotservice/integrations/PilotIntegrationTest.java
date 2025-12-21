package com.airapp.pilotservice.integrations;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.airapp.pilotservice.entities.Pilot;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;
import com.airapp.pilotservice.repositories.PilotRepository;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class PilotIntegrationTest
{
    @Autowired MockMvc mockMvc;
    @Autowired PilotRepository pilotRepository;

    @Test
    void eligible_endpoint_should_return_filtered_results() throws Exception
    {
        Pilot p = new Pilot();
        p.setName("Test");
        p.setVehicleRestriction(VehicleType.BOEING_777);
        p.setSeniority(SeniorityLevel.SENIOR);
        p.setNationality("TR"); 
        p.setAllowedRangeKm(12000);
        pilotRepository.save(p);

        mockMvc.perform(
            get("/pilot-service/eligible")
                .param("vehicleType", "BOEING_777")
                .param("range", "10000")
                .param("seniority", "SENIOR")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Test"));
    }
}
