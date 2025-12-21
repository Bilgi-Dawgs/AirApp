package com.airapp.main_service.clients;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.airapp.main_service.dto.responses.PassengerResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class PassengerClient {

    private final RestTemplate restTemplate;

    @Value("${services.passenger-service.url}")
    private String passengerServiceUrl;


    public List<PassengerResponse> getPassengersByFlight(String flightNumber) {
        String url = passengerServiceUrl + "/by-flight/" + flightNumber;

        log.info("Fetching passengers for flight {} from: {}", flightNumber, url);

        try {
            JsonNode root = restTemplate.getForObject(url, JsonNode.class);

            if (root == null || !root.has("passengers")) {
                log.warn("No 'passengers' field in response for flight {}", flightNumber);
                return Collections.emptyList();
            }

            ObjectMapper mapper = new ObjectMapper();

            return mapper.convertValue(
                root.get("passengers"),
                new TypeReference<List<PassengerResponse>>() {}
            );

        } catch (Exception e) {
            log.error("Error fetching passengers for flight {}: {}", flightNumber, e.getMessage());
            return Collections.emptyList();
        }
    }


    public PassengerResponse getPassengerById(String passengerId) {
        String url = passengerServiceUrl + "/" + passengerId;

        log.info("Fetching passenger details from: {}", url);

        try {
            return restTemplate.getForObject(url, PassengerResponse.class);
        } catch (Exception e) {
            log.error("Error fetching passenger {}: {}", passengerId, e.getMessage());
            return null;
        }
    }

    public List<PassengerResponse> getAllPassengers() {
        String url = passengerServiceUrl + "/";

        log.info("Fetching all passengers from: {}", url);

        try {
            PassengerResponse[] response = restTemplate.getForObject(url, PassengerResponse[].class);
            return response != null ? Arrays.asList(response) : Collections.emptyList();
        } catch (Exception e) {
            log.error("Error fetching all passengers: {}", e.getMessage());
            return Collections.emptyList();
        }
    }
}