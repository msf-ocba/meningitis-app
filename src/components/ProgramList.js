import React, { useEffect, useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import EventList from "./EventList";

/**
 * This component make the call to the API requesting
 * the tracker program list implemented in the instance with the flag enabled
 * (using filters).
 * For each program it retrieves an org unit associated to it and makes a
 * call to the API requesting the level of the parent org unit (level 4).
 * For each program and each parent org unit, eventList is executed.
 */

const PROGRAMS_QUERY = {
  programs: {
    resource: "programs",
    params: {
      paging: false,
      fields: "id, displayName, organisationUnits",
      filter: [
        "programType:eq:WITH_REGISTRATION",
        "attributeValues.attribute.id:eq:WVmkKHRZi52",
      ],
    },
  },
};

const ORG_UNIT_QUERY = {
  orgunits: {
    resource: "organisationUnits",
    id: ({ id }) => id,
    params: {
      fields: "id, displayName, level",
      includeAncestors: "true",
      filter: ["level:eq:4"],
    },
  },
};

export const ProgramList = () => {
  const engine = useDataEngine();

  const [programsFiltered, setProgramsFiltered] = useState("");
  const [ou, setOu] = useState("");

  const requestPrograms = async () => {
    const programs = await engine.query(PROGRAMS_QUERY);
    const programsRequested = programs.programs.programs;
    setProgramsFiltered(programsRequested[0].id);

    programsRequested.map(async (program) => {
      const parent = await engine.query(ORG_UNIT_QUERY, {
        variables: {
          id: program.organisationUnits[0].id,
        },
      });
      setOu(parent.orgunits.organisationUnits[0].id);
    });
  };

  useEffect(() => {
    requestPrograms();
  }, []);

  useEffect(() => {
    if (ou) {
      console.log(programsFiltered);
      console.log(ou);
    }
  }, [ou]);

  return (
    <React.Fragment>
      {programsFiltered && ou && (
        <>
          <EventList orgUnit={ou} program={programsFiltered} />
        </>
      )}
    </React.Fragment>
  );
};
