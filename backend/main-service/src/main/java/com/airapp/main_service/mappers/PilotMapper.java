package com.airapp.main_service.mappers;

import org.springframework.stereotype.Component;

import com.airapp.main_service.domains.RosterPerson;
import com.airapp.main_service.dto.responses.PilotResponse;
import com.airapp.main_service.enums.PersonType;

@Component
public class PilotMapper {

    public RosterPerson toRosterPerson(PilotResponse dto) {
        if (dto == null) return null;

        RosterPerson person = new RosterPerson();

        person.setPersonId(String.valueOf(dto.getId()));
        person.setType(PersonType.PILOT);

        person.setName(dto.getName());

        if (dto.getVehicleRestriction() != null) {
            person.setPilotVehicleRestriction(
                dto.getVehicleRestriction().name()
            );
        }

        person.setAllowedRangeKm(dto.getAllowedRangeKm());

        if (dto.getSeniority() != null) {
            person.setSeniority(dto.getSeniority());
        }

        person.setAssignedAutomatically(true);

        return person;
    }
}
