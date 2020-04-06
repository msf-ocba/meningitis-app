import React, { useState, useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**

**/

export const UpdateFirstVisit = ({
  dataElementOrigin,
  dataElementReferral,
  ev,
}) => {
  const mutation = {
    resource: "events",
    type: "update",
    id: ({ id }) => id,
    partial: false,
    data: ({
      event,
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      dataElementOrigin,
      dataElementReferral,
    }) => ({
      program: "VOEVJzwp4F7",
      event,
      programStage: "UFGwxeTgzZD",
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      attributeCategoryOptions: "rHGSHuG4Ts5",
      dataValues: [
        {
          dataElement: "MZ5Ww7OZTgM",
          value: "First visit",
        },
        {
          dataElement: "S2GcSStnM9p",
          value: dataElementOrigin,
        },
        {
          dataElement: "FyftDLj4iSy",
          value: dataElementReferral,
        },
      ],
    }),
  };
  const [mutate] = useDataMutation(mutation, {
    variables: {
      id: ev.event,
      event: ev.event,
      orgUnit: ev.orgUnit,
      trackedEntityInstance: ev.trackedEntityInstance,
      enrollment: ev.enrollment,
      eventDate: ev.eventDate,
      dataElementOrigin: dataElementOrigin,
      dataElementReferral: dataElementReferral,
    },
  });

  useEffect(() => {
    mutate();
    console.log("First Visit Event " + ev.event + " updated!!");
  }, []);

  return (
    <>
      <ul>
        <ul>
          <ul>
            <ul>
              <li>
                {" "}
                DataElementOrigin {dataElementOrigin} and DataElementReferral{" "}
                {dataElementReferral}{" "}
              </li>
            </ul>
          </ul>
        </ul>
      </ul>
    </>
  );
};

export default UpdateFirstVisit;
