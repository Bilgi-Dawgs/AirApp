package com.airapp.main_service.domains;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Roster
{
    private Long id; // persistence isterse doldurur, domain umursamaz

    private String flightNumber;

    private LocalDateTime flightDate;

    private RosterFlightInfo flightInfoSnapshot;

    private List<RosterPerson> persons = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

}
