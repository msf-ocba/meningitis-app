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
        "attributeValues.value:eq:true",
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

  const [executionObjs, setExecutionObjs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const requestPrograms = async () => {
    const programs = await engine.query(PROGRAMS_QUERY);
    const programsRequested = programs.programs.programs;

    programsRequested.map(async (program, index) => {
      const parent = await engine.query(ORG_UNIT_QUERY, {
        variables: {
          id: program.organisationUnits[0].id,
        },
      });
      //Each program_id and parent_id from each request to the API is
      //appended to the executionObjs array and it is stored in the state
      setExecutionObjs((executionObjs) => [
        ...executionObjs,
        {
          program_id: program.id,
          parent_id: parent.orgunits.organisationUnits[0].id,
        },
      ]);

      //When the map index is equal to the lenght of the programs array
      //the render is toggled in
      if (index == programsRequested.length - 1) {
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    requestPrograms();
  }, []);

  // useEffect(() => {
  //   if (isLoaded) {
  //     console.log(`ExecutionObject: ${JSON.stringify(executionObjs)}`);
  //   }
  // }, [isLoaded]);

  return (
    <React.Fragment>
      {/* {programsFiltered && ous && (
        <>
          <EventList orgUnit={ous} program={programsFiltered} />
        </>
      )} */}
      {isLoaded && (
        <>
          <pre>
            {executionObjs.map((obj) => (
              <EventList orgUnit={obj.parent_id} program={obj.program_id} />
            ))}
          </pre>
        </>
      )}
    </React.Fragment>
  );
};
