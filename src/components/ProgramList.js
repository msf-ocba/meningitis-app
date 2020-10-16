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

export const ProgramList = ({ initialExecutionDate, dataElement }) => {
  const [executionObjs, setExecutionObjs] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [executionIsLoaded, setExecutionIsLoaded] = useState(false);
  const [programListIsLoaded, setProgramListIsLoaded] = useState(false);
  const engine = useDataEngine();

  //This function will search for level 4 orgUnits related to each program
  //The output will be
  const searchForOrgUnits = (objects) => {
    const programs1 = objects.map((object) => [
      object.program_id,
      new Set(
        object.org_units.program.organisationUnits
          .map((obj) => obj.parent)
          .filter((obj) => obj.level === 4)
          .map((obj) => obj.id)
      ),
    ]);
    const programs2 = objects.map((object) => [
      object.program_id,
      [
        ...new Set(
          object.org_units.program.organisationUnits
            .map((obj) => obj.parent.parent)
            .filter((obj) => obj.level === 4)
            .map((obj) => obj.id)
        ),
      ],
    ]);

    const programs = programs1.map((program, i) => {
      if (program[0] === programs2[i][0]) {
        return Object.assign({}, program, programs2[i]);
      }
    });

    console.log(programs);
    //This state update should happen conditionally in order to not enter into race conditions
    setProgramListIsLoaded(true);

    return [...programs];
  };

  const requestPrograms = async () => {
    const programs = await engine.query(PROGRAMS_QUERY);
    const programsRequested = programs.programs.programs;

    console.log(programsRequested);

    programsRequested.map(async (program, index) => {
      const parent = await engine.query(PROGRAM_QUERY, {
        variables: {
          // id: program.organisationUnits[0].id,
          id: program.id,
        },
        onComplete: (data) => console.log(data),
      });
      //Each program_id and parent_id from each request to the API is
      //appended to the executionObjs array and it is stored in the state
      await setExecutionObjs((executionObjs) => [
        ...executionObjs,
        {
          program_id: program.id,
          org_units: parent,
        },
      ]);

      //When the map index is equal to the lenght of the programs array
      //the render is toggled in
      console.log(index);
      console.log(executionIsLoaded);
      if (index == programsRequested.length - 1) {
        setExecutionIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    requestPrograms();
  }, []);

  useEffect(() => {
    if (executionIsLoaded) {
      // console.log(`ExecutionObject: ${JSON.stringify(executionObjs)}`);
      setProgramsList(searchForOrgUnits(executionObjs));
    }
  }, [executionIsLoaded]);

  // useEffect(() => {
  //   if (programListIsLoaded) {
  //     console.log(programsList);
  //     console.log(programsList[0]);
  //   }
  // }, [programListIsLoaded]);

  return (
    <React.Fragment>
      {executionIsLoaded && programListIsLoaded && (
        <>
          <pre>
            {programsList.map((program) =>
              program[1].map((org) => {
                return (
                  <EventList
                    orgUnit={org}
                    program={program[0]}
                    initialExecutionDate={initialExecutionDate}
                    dataElement={dataElement}
                    key={org}
                  />
                );
              })
            )}
          </pre>
        </>
      )}
    </React.Fragment>
  );
};
