import React, { useEffect, useState } from "react";
import { useDataQuery, useDataEngine } from "@dhis2/app-runtime";

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
      fields: "id, displayName",
      includeAncestors: "true",
    },
  },
};

export const ProgramList = () => {
  const engine = useDataEngine();

  const requestPrograms = async () => {
    const response = await engine.query(PROGRAMS_QUERY);
    console.log(response.programs.programs);
  };

  useEffect(() => {
    requestPrograms();
  }, []);

  return (
    <React.Fragment>
      <p>Test</p>
    </React.Fragment>
  );
};
