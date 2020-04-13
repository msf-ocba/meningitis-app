import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CreateOrigin from "./CreateOrigin";
import UpdateOrigin from "./UpdateOrigin";
import DeleteOrigin from "./DeleteOrigin";
import CheckDataElements from "./CheckDataElements";

/**

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
                      <>
                        <ul>
                          <ul>
                            <ul>
                              <ul>
                                <li>
                                  {" "}
                                  Level 5 and HAO different of parentOrgUnit{" "}
                                  {orgUnit.id}
                                </li>
                              </ul>
                            </ul>
                          </ul>
                        </ul>
                        <ul>
                          <ul>
                            <ul>
                              <ul>
                                <li> UpdateOrigin() </li>
                              </ul>
                            </ul>
                          </ul>
                        </ul>
                        <UpdateOrigin orgUnit={haoOrgunit} ev={eventOrigin} />
                        <CheckDataElements event={event} origin="false" />
                      </>
                    );
                  } else {
                    //If origin doesn't need an update
                    return (
                      <>
                        <CheckDataElements event={event} origin="false" />
                      </>
                    );
                  }
                } else {
                  //If origin needs to get deleted because HAO and parentOrgunit are equal
                  return (
                    <>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li>
                                {" "}
                                Level 5 and HAO equal parentOrgUnit {orgUnit.id}
                              </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li> DeleteOrigin() </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <DeleteOrigin id={eventOrigin.event} />
                      <CheckDataElements event={event} origin="true" />
                    </>
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
                    <>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li>
                                {" "}
                                Level 5 and HAO different of parentOrgUnit{" "}
                                {orgUnit.id}
                              </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li> CreateOrigin() </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <CreateOrigin
                        orgUnit={haoOrgunit}
                        trackedEntityInstance={event.trackedEntityInstance}
                        enrollment={event.enrollment}
                        eventDate={event.eventDate}
                      />
                      <CheckDataElements event={event} origin="false" />
                    </>
                  );
                } else {
                  return (
                    <>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li>
                                {" "}
                                Level 5 and HAO equal parentOrgUnit {orgUnit.id}
                              </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <ul>
                        <ul>
                          <ul>
                            <ul>
                              <li> DO NOTHING </li>
                            </ul>
                          </ul>
                        </ul>
                      </ul>
                      <CheckDataElements event={event} origin="true" />
                    </>
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
