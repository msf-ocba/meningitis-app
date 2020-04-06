import React, { useState, useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**

**/

export const CreateOrigin = ({
  orgUnit,
  trackedEntityInstance,
  enrollment,
  eventDate,
}) => {
  const mutation = {
    resource: "events",
    type: "create",
    data: ({ orgUnit, trackedEntityInstance, enrollment, eventDate }) => ({
      program: "VOEVJzwp4F7",
      programStage: "UFGwxeTgzZD",
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      status: "ACTIVE",
      dataValues: [
        {
          dataElement: "MZ5Ww7OZTgM",
          value: "Origin",
        },
      ],
    }),
  };
  const [mutate, { data }] = useDataMutation(mutation, {
    variables: {
      orgUnit: orgUnit,
      trackedEntityInstance: trackedEntityInstance,
      enrollment: enrollment,
      eventDate: eventDate,
    },
  });

  useEffect(() => {
    mutate();
    console.log(
      "Event with TEI_ID: " + trackedEntityInstance + " has been created!!"
    );
  }, []);

  return <></>;
};

export default CreateOrigin;
