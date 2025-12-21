package com.airapp.pilotservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airapp.pilotservice.entities.Pilot;
import com.airapp.pilotservice.enums.SeniorityLevel;
import com.airapp.pilotservice.enums.VehicleType;


@Repository
public interface PilotRepository extends JpaRepository<Pilot, Long> 
{
    List<Pilot> findByVehicleRestriction(VehicleType vehicleType);

    List<Pilot> findByVehicleRestrictionAndSeniority(VehicleType vehicle, SeniorityLevel seniority);
}
