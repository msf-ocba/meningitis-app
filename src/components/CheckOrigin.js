import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CheckHAO from "./CheckHAO";

/**
Component that receives a First Visit type of event (object) from EventList and 
check if there is an origin event associated to the trackedEntityInstance. 
Parent component: EventList
Child component: CheckHAO
**/

const CheckOrigin = ({ event }) => {
  const query = {
    origin: {
      resource: "events",
      params: {
        trackedEntityInstance: `${event.trackedEntityInstance}`,
        filter: "MZ5Ww7OZTgM:eq:Origin",
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
