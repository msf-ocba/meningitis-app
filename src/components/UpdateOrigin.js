import React, { useState, useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**

**/

export const UpdateOrigin = ({ orgUnit, ev }) => {
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
          value: "Origin",
        },
      ],
    }),
  };
  const [mutate] = useDataMutation(mutation, {
    variables: {
      id: ev.event,
      event: ev.event,
      orgUnit: orgUnit,
      trackedEntityInstance: ev.trackedEntityInstance,
      enrollment: ev.enrollment,
      eventDate: ev.eventDate,
    },
  });

  useEffect(() => {
    mutate();
    console.log("Event " + ev.event + " updated!!");
  }, []);

  return <></>;
};

export default UpdateOrigin;
