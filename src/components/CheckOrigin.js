import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CheckHAO from "./CheckHAO";

/**
Component that receives a First Visit type of event (object) from EventList and 
check if there is an origin event associated to the trackedEntityInstance. 
Parent component: EventList
Child component: CheckHAO
**/

const CheckOrigin = ({
  event,
  dataElement,
  program,
  programStage,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
}) => {
  const query = {
    origin: {
      resource: "events",
      params: {
        trackedEntityInstance: `${event.trackedEntityInstance}`,
        filter: `${dataElement}:eq:Origin`,
      },
    },
  };

  const { loading, error, data, refetch } = useDataQuery(query);

  return (
    <>
      {loading && <span>...</span>}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && (
        <>
          <pre>
            {data.origin.events.map((ev) => {
              return (
                <CheckHAO
                  key={event.event}
                  event={event}
                  origin={true}
                  eventOrigin={ev}
                  program={program}
                  programStage={programStage}
                  dataElement={dataElement}
                  originDataElement={originDataElement}
                  referralDataElement={referralDataElement}
                  attributeCategoryOptions={attributeCategoryOptions}
                />
              );
            })}
            {!data.origin.events.length && (
              <>
                <CheckHAO
                  key={event.event}
                  event={event}
                  origin={false}
                  eventOrigin={null}
                  program={program}
                  programStage={programStage}
                  dataElement={dataElement}
                  originDataElement={originDataElement}
                  referralDataElement={referralDataElement}
                  attributeCategoryOptions={attributeCategoryOptions}
                />
              </>
            )}
          </pre>
        </>
      )}
    </>
  );
};

export default CheckOrigin;
