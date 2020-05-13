import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CreateOrigin from "./CreateOrigin";
import UpdateOrigin from "./UpdateOrigin";
import DeleteOrigin from "./DeleteOrigin";
import CheckDataElements from "./CheckDataElements";

/**
Component that checks if the parent org unit (level 6) of the event from EvenList
matches with the Health Area selected in the HAO attribute.
It decides if there is need to:
                              -DeleteOrigin event
                              -UpdateOrigin event
                              -CreateOrigin event
                              -None of the previous actions

It always end at CheckDataElements component to make sure the correct
values are selected for each situation.
Parent component: CheckHAO
Child component: CheckDataElements
**/

export const CheckParent = ({ event, origin, eventOrigin, haoOrgunit }) => {
  const query = {
    parent: {
      resource: "organisationUnits",
      id: `${event.orgUnit}`,
      params: {
        includeAncestors: "true",
      },
    },
  };

  const { loading, error, data, refetch } = useDataQuery(query);

  return (
    <>
      {loading && <span>...</span>}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && origin && (
        <>
          <pre>
            {data.parent.organisationUnits.map((orgUnit) => {
              if (orgUnit.level == 5) {
                if (haoOrgunit != orgUnit.id) {
                  if (eventOrigin.orgUnit != haoOrgunit) {
                    //If origin needs an update
                    return (
                      <React.Fragment key={event.event}>
                        <UpdateOrigin orgUnit={haoOrgunit} ev={eventOrigin} />
                        <CheckDataElements event={event} origin="false" />
                      </React.Fragment>
                    );
                  } else {
                    //If origin doesn't need an update
                    return (
                      <CheckDataElements
                        key={event.event}
                        event={event}
                        origin="false"
                      />
                    );
                  }
                } else {
                  //If origin needs to get deleted because HAO and parentOrgunit are equal
                  return (
                    <React.Fragment key={event.event}>
                      <DeleteOrigin id={eventOrigin.event} />
                      <CheckDataElements event={event} origin="true" />
                    </React.Fragment>
                  );
                }
              }
            })}
          </pre>
        </>
      )}
      {data && !origin && (
        <>
          <pre>
            {data.parent.organisationUnits.map((orgUnit) => {
              if (orgUnit.level == 5) {
                if (haoOrgunit != orgUnit.id) {
                  return (
                    <React.Fragment key={event.event}>
                      <CreateOrigin
                        orgUnit={haoOrgunit}
                        trackedEntityInstance={event.trackedEntityInstance}
                        enrollment={event.enrollment}
                        eventDate={event.eventDate}
                      />
                      <CheckDataElements event={event} origin="false" />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <CheckDataElements
                      key={event.event}
                      event={event}
                      origin="true"
                    />
                  );
                }
              }
            })}
          </pre>
        </>
      )}
    </>
  );
};

export default CheckParent;
