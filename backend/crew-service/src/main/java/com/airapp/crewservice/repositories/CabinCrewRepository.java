package com.airapp.crewservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airapp.crewservice.entities.CabinCrew;
import com.airapp.crewservice.enums.AttendantType;
import com.airapp.crewservice.enums.VehicleType;

@Repository
public interface CabinCrewRepository extends JpaRepository<CabinCrew, Long> 
{
    List<CabinCrew> findByVehicleRestrictionsContainsAndAttendantType(VehicleType vehicle, AttendantType type);

    List<CabinCrew> findByAttendantType(AttendantType type);   

}
