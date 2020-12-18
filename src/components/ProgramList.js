import React, { useEffect, useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import EventList from "./EventList";

/**
 * A request to the endpoint /api/programs/<program_id> it's being made
 * for each program passed to the component through props. From this
 * request, the level 4 orgUnit linked to the program is retrieved
 * For each program and each org unit, eventList is executed with the
 * initialExecutionDate defined in DataStore.
 */

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

export const ProgramList = ({
  initialExecutionDate,
  dataElement,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
  programs,
}) => {
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
    //This state update should happen conditionally in order to not enter into race conditions
    setProgramListIsLoaded(true);

    return [...programs];
  };

  const requestPrograms = async () => {
    const programsRequested = programs.programs.programs;

    programsRequested.map(async (program) => {
      const parent = await engine.query(PROGRAM_QUERY, {
        variables: {
          // id: program.organisationUnits[0].id,
          id: program.id,
        },
        // onComplete: (data) => console.log(data),
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

      setExecutionIsLoaded(true);
    });
  };

  useEffect(() => {
    requestPrograms();
  }, []);

  useEffect(() => {
    if (executionObjs.length == programs.programs.programs.length) {
      // console.log(`ExecutionObject: ${JSON.stringify(executionObjs)}`);
      setProgramsList(searchForOrgUnits(executionObjs));
    }
  }, [executionObjs]);

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
                    key={org}
                    program={program[0]}
                    initialExecutionDate={initialExecutionDate}
                    dataElement={dataElement}
                    originDataElement={originDataElement}
                    referralDataElement={referralDataElement}
                    attributeCategoryOptions={attributeCategoryOptions}
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
