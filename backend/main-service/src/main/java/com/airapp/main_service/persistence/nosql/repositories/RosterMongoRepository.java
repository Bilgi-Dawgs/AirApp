package com.airapp.main_service.persistence.nosql.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.airapp.main_service.persistence.nosql.documents.RosterDocument;

public interface RosterMongoRepository extends MongoRepository<RosterDocument, String>
{
    Optional<RosterDocument> findByFlightNumber(String flightNumber);

    boolean existsByFlightNumber(String flightNumber);
}
