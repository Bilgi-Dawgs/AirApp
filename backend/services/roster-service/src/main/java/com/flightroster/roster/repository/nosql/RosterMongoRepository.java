package com.flightroster.roster.repository.nosql;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flightroster.roster.entity.Roster;

@Repository
public interface RosterMongoRepository extends MongoRepository<Roster, Long> { }
