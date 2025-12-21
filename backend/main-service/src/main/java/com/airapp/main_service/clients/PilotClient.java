package com.airapp.main_service.clients;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.airapp.main_service.dto.responses.PilotResponse;
import com.airapp.main_service.enums.SeniorityLevel;
import com.airapp.main_service.enums.VehicleType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class PilotClient {

    private final RestTemplate restTemplate;

    @Value("${services.pilot-service.url}")
    private String pilotServiceUrl;

    public List<PilotResponse> findEligiblePilots(
            VehicleType vehicle,
            int range,
            SeniorityLevel seniority
    ) {
        String url = pilotServiceUrl + "/pilot-service/eligible"
                   + "?vehicleType=" + vehicle.name()
                   + "&range=" + range
                   + "&seniority=" + seniority.name();

        log.info("Fetching eligible pilots: {}", url);

        try {
            PilotResponse[] response =
                restTemplate.getForObject(url, PilotResponse[].class);

            return response != null
                    ? Arrays.asList(response)
                    : Collections.emptyList();

        } catch (Exception e) {
            log.error("Error fetching eligible pilots: {}", e.getMessage());
            return Collections.emptyList();
        }
    }

    // =================================================
    // MANUAL PILOTS
    // =================================================
    public List<PilotResponse> getPilotsByIds(List<Long> ids) {
        if (ids == null || ids.isEmpty())
            return Collections.emptyList();

        return ids.stream()
                  .map(this::getPilotById)
                  .filter(Objects::nonNull)
                  .toList();
    }

    public PilotResponse getPilotById(Long id) {
        String url = pilotServiceUrl + "/pilot-service/" + id;
        try {
            return restTemplate.getForObject(url, PilotResponse.class);
        } catch (Exception e) {
            log.error("Error fetching pilot id {}: {}", id, e.getMessage());
            return null;
        }
    }
}
