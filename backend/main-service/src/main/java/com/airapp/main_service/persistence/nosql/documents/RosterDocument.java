package com.airapp.main_service.persistence.nosql.documents;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.airapp.main_service.domains.RosterFlightInfo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "rosters")
public class RosterDocument
{
    @Id
    private String id; // Mongo ObjectId

    private String flightNumber;

    private LocalDateTime flightDate;

    private RosterFlightInfo flightInfoSnapshot;

    private List<RosterPersonDocument> persons = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();
}
