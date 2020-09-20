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

// const ORG_UNIT_QUERY = {
//   orgunits: {
//     resource: "organisationUnits",
//     id: ({ id }) => id,
//     params: {
//       fields: "id, displayName, level",
//       includeAncestors: "true",
//       //Level 1 (Root) to be sure all the events from the selected programs
//       //in all the countries are checked by the app
//       filter: ["level:eq:1"],
//     },
//   },
// };

const PROGRAM_QUERY = {
  program: {
    resource: "programs",
    id: ({ id }) => id,
    params: {
      paging: false,
      fields:
        "organisationUnits[id, level, parent[id, level, parent[id, level]]",
    },
  },
};

export const ProgramList = () => {
  const searchForOrgUnits = (objects) => {
    const programs = objects.map((object) =>
      object.org_units.program.organisationUnits
        .map((obj) => obj.parent)
        .filter((obj) => obj.level === 4)
    );
    const programs2 = objects.map((object) =>
      object.org_units.program.organisationUnits
        .map((obj) => obj.parent.parent)
        .filter((obj) => obj.level === 4)
        .map((obj) => obj.id)
    );

    return new Set(programs2[1]);
  };

  const engine = useDataEngine();

  const [executionObjs, setExecutionObjs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const requestPrograms = async () => {
    const programs = await engine.query(PROGRAMS_QUERY);
    const programsRequested = programs.programs.programs;

    programsRequested.map(async (program, index) => {
      const parent = await engine.query(PROGRAM_QUERY, {
        variables: {
          // id: program.organisationUnits[0].id,
          id: program.id,
        },
      });
      //Each program_id and parent_id from each request to the API is
      //appended to the executionObjs array and it is stored in the state
      setExecutionObjs((executionObjs) => [
        ...executionObjs,
        {
          program_id: program.id,
          org_units: parent,
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

  useEffect(() => {
    if (isLoaded) {
      // console.log(`ExecutionObject: ${JSON.stringify(executionObjs)}`);
      console.log(executionObjs);
      console.log(searchForOrgUnits(executionObjs));
    }
  }, [isLoaded]);

  return (
    <React.Fragment>
      {/* {programsFiltered && ous && (
        <>
          <EventList orgUnit={ous} program={programsFiltered} />
        </>
      )} */}
      {isLoaded && (
        <p>Test!</p>

        // <>
        //   <pre>
        //     {executionObjs.map((obj) => (
        //       <EventList orgUnit={obj.parent_id} program={obj.program_id} />
        //     ))}
        //   </pre>
        // </>
      )}
    </React.Fragment>
  );
};
