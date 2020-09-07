import React from "react";
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
    params: ({ orgUnit, program }) => ({
      orgUnit: "wg60MeX0Txd",
      ouMode: "DESCENDANTS",
      program: "VOEVJzwp4F7",
      lastUpdatedDuration: "300d",
      filter: "MZ5Ww7OZTgM:eq:First visit",
      skipPaging: "true",
    }),
  },
};

export const EventList = () => {
  const { loading, error, data } = useDataQuery(query);

  return (
    <>
      {loading && <span>...</span>}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && (
        <>
          <pre>
            {data.events.events.map((ev) => (
              <React.Fragment key={ev.event}>
                <CheckOrigin event={ev} />
              </React.Fragment>
            ))}
          </pre>
        </>
      )}
    </>
  );
};
