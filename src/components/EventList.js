import React, { useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CheckOrigin from "./CheckOrigin";

/**
Parent component of the app. It requests the list of First Event type
events which are descendants from the orgUnit param in the query.
Parent component: -
Child component: CheckOrigin
 */

const query = {
  events: {
    resource: "events.json",
    params: ({ program, orgUnit, initialExecutionDate, dataElement }) => ({
      orgUnit,
      ouMode: "DESCENDANTS",
      program,
      lastUpdatedStartDate: `${initialExecutionDate}`,
      filter: `${dataElement}:eq:First visit`,
      skipPaging: "true",
    }),
  },
};

const EventList = ({
  orgUnit,
  program,
  initialExecutionDate,
  dataElement,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
}) => {
  const { loading, error, data } = useDataQuery(query, {
    variables: {
      orgUnit,
      program,
      initialExecutionDate,
      dataElement,
      originDataElement,
      referralDataElement,
      attributeCategoryOptions,
    },
  });

  useEffect(() => {
    console.log(
      `Executing OutBreak App on the program: ${program} with the parent_orgUnit ${orgUnit} with the date ${initialExecutionDate}`
    );
  }, []);

  return (
    <>
      {loading && <span>...</span>}
      {error && <p>{`ERROR: ${error.message}`}</p>}
      {data && (
        <>
          <pre>
            {data.events.events.map((ev, index) => (
              <React.Fragment key={ev.event}>
                <CheckOrigin
                  event={ev}
                  dataElement={dataElement}
                  originDataElement={originDataElement}
                  referralDataElement={referralDataElement}
                  attributeCategoryOptions={attributeCategoryOptions}
                  program={program}
                  programStage={ev.programStage}
                />
                {index == data.events.events.length - 1 &&
                  console.log(
                    `Program ${program} with ${data.events.events.length} events in orgUnit ${orgUnit}, updated!`
                  )}
              </React.Fragment>
            ))}
          </pre>
        </>
      )}
    </>
  );
};

export default EventList;
