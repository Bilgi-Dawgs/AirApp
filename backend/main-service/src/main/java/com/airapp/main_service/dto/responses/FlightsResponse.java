package com.airapp.main_service.dto.responses;

import java.util.List;
import lombok.Data;

@Data
public class FlightsResponse
{
    private List<FlightResponse> flights;
}
