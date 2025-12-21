package com.airapp.main_service.mappers;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.dto.responses.CabinCrewResponse;
import com.airapp.main_service.enums.PersonType;

import java.util.HashSet;

@Component
public class CrewMapper {

    public RosterPerson toRosterPerson(CabinCrewResponse dto) {
        if (dto == null) return null;

        RosterPerson person = new RosterPerson();

        person.setPersonId(String.valueOf(dto.getId()));
        person.setType(PersonType.CABIN_CREW);

        person.setName(dto.getName());
        person.setAttendantType(dto.getAttendantType());
        person.setSeniority(dto.getSeniorityLevel());

        if (dto.getRecipes() != null) {
            person.setKnownRecipes(new HashSet<>(dto.getRecipes()));
        }

        if (dto.getVehicleRestrictions() != null) {
            person.setVehicleRestrictions(new HashSet<>(dto.getVehicleRestrictions()));
        }

        person.setAssignedAutomatically(true);

        return person;
    }
}
