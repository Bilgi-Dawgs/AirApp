package com.airapp.main_service.clients;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.airapp.main_service.dto.responses.FlightResponse;
import com.airapp.main_service.dto.responses.FlightsResponse;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class FlightClient {

    private final RestTemplate restTemplate;

    @Value("${services.flight-service.url}")
    private String flightServiceUrl;

    // Wrapper class for single flight response: { "flight": { ... } }
    @Data
    @NoArgsConstructor
    private static class SingleFlightResponse {
        private FlightResponse flight;
    }

    public FlightResponse getFlight(String flightNumber) {
        // Ensure the URL is correct (e.g., http://flight-service:8086/flights/TK1920)
        String url = flightServiceUrl + "/" + flightNumber;

        log.info("Fetching flight details from: {}", url);

        try {
            // Fix: Map to SingleFlightResponse, not FlightsResponse
            SingleFlightResponse response = restTemplate.getForObject(url, SingleFlightResponse.class);

            if (response == null || response.getFlight() == null) {
                log.warn("Flight service returned null for flight: {}", flightNumber);
                return null;
            }

            return response.getFlight();
        } catch (Exception e) {
            log.error("Error fetching flight {}: {}", flightNumber, e.getMessage());
            return null;
        }
    }

    public List<FlightResponse> getAllFlights() {
        String url = flightServiceUrl + "/";

        log.info("Fetching all flights from: {}", url);

        try {
            FlightsResponse response = restTemplate.getForObject(url, FlightsResponse.class);

            return response != null && response.getFlights() != null
                ? response.getFlights()
                : Collections.emptyList();
        } catch (Exception e) {
            log.error("Error fetching all flights", e);
            return Collections.emptyList();
        }
    }
}