package com.airapp.main_service.clients;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.airapp.main_service.dto.responses.CabinCrewResponse;
import com.airapp.main_service.enums.AttendantType;
import com.airapp.main_service.enums.VehicleType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CabinCrewClient {

    private final RestTemplate restTemplate;

    @Value("${services.crew-service.url}")
    private String crewServiceUrl;

    public List<CabinCrewResponse> getEligibleCabinCrew(
        VehicleType vehicle,
        AttendantType type,
        int count
    ) {
        String url =
            crewServiceUrl
            + "/cabin-crew-service/eligible"
            + "?vehicleType=" + vehicle.name()
            + "&type=" + type.name();

        log.info("Fetching eligible cabin crew from: {}", url);

        try {
            CabinCrewResponse[] response =
                restTemplate.getForObject(url, CabinCrewResponse[].class);

            List<CabinCrewResponse> all =
                response != null ? Arrays.asList(response) : Collections.emptyList();

            return all.size() > count ? all.subList(0, count) : all;

        } catch (Exception e) {
            log.error("Error fetching cabin crew: {}", e.getMessage());
            return Collections.emptyList();
        }
    }


    public CabinCrewResponse getCrewById(Long id) {
        String url = crewServiceUrl + "/cabin-crew-service/" + id;
        
        try {
            return restTemplate.getForObject(url, CabinCrewResponse.class);
        } catch (Exception e) {
            log.error("Error fetching crew id {}: {}", id, e.getMessage());
            return null;
        }
    }


    public List<CabinCrewResponse> getCrewByIds(
        List<Long> manualIds,
        AttendantType type
    )
    {
        if (manualIds == null || manualIds.isEmpty())
            return Collections.emptyList();

        String idsParam = manualIds.stream()
            .map(String::valueOf)
            .reduce((a, b) -> a + "," + b)
            .orElse("");

        String url =
            crewServiceUrl
            + "/cabin-crew-service/by-ids"
            + "?ids=" + idsParam
            + "&type=" + type.name();

        log.info("Fetching cabin crew by ids from: {}", url);

        try
        {
            CabinCrewResponse[] response =
                restTemplate.getForObject(url, CabinCrewResponse[].class);

            return response != null
                ? Arrays.asList(response)
                : Collections.emptyList();
        }
        catch (Exception e)
        {
            log.error("Error fetching crew by ids {}: {}", manualIds, e.getMessage());
            return Collections.emptyList();
        }
    }
}