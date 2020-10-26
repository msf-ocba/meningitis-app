import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CheckParent from "./CheckParent";
import DeleteOrigin from "./DeleteOrigin";

/**
Component that receives a First visit event (object), an Origin visit event and
a flag which specify whether it has an origin event associated or not from 
CheckOrigin component.
It makes a request from the API to evaluate if the HAO field is filled or not.
Moreover, depending on the origin flag:
	-With origin flag == true:
	 Evaluates if the HAO orgUnit and the Origin orgUnit are the same or if it needs 
	 to be updated
	-With origin flag == false:
	 Evaluates if the HAO orgUnit and the Parent orgUnit of the First Visit event 
   are the same or it needs to be created a new Origin event
Parent component: CheckOrigin
Child component: CheckParent
**/

export const CheckHAO = ({
  event,
  origin,
  eventOrigin,
  program,
  programStage,
}) => {
  const query = {
    attributes: {
      resource: "trackedEntityInstances",
      id: `${event.trackedEntityInstance}`,
    },
  };

  const { loading, error, data, refetch } = useDataQuery(query);

  return (
    <>
      {loading && <span>...</span>}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && origin && (
        <pre>
          {data.attributes.attributes.map((attribute) => {
            if (attribute.valueType === "ORGANISATION_UNIT") {
              return (
                <React.Fragment key={event.event}>
                  <CheckParent
                    event={event}
                    origin={origin}
                    eventOrigin={eventOrigin}
                    haoOrgunit={attribute.value}
                    program={program}
                    programStage={programStage}
                  />
                </React.Fragment>
              );
            }
          })}

          {!data.attributes.attributes.some(
            (attribute) => attribute.valueType === "ORGANISATION_UNIT"
          ) && (
            <>
              <DeleteOrigin id={eventOrigin.event} />
            </>
          )}
        </pre>
      )}

      {data && !origin && (
        <>
          <pre>
            {data.attributes.attributes.map((attribute) => {
              if (attribute.valueType === "ORGANISATION_UNIT") {
                return (
                  <CheckParent
                    key={event.event}
                    event={event}
                    origin={origin}
                    eventOrigin={null}
                    haoOrgunit={attribute.value}
                    program={program}
                    programStage={programStage}
                  />
                );
              }
            })}
          </pre>
        </>
      )}
    </>
  );
};

export default CheckHAO;
