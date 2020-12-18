import React, { useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**
Component that handles the update of origin events org unit when 
the HAO attribute changes (or get corrected) to a different 
Health Area value.
**/

export const UpdateOrigin = ({
  orgUnit,
  ev,
  program,
  programStage,
  dataElement,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
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
      program,
      programStage,
    }) => ({
      program,
      event,
      programStage,
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      attributeCategoryOptions,
      dataValues: [
        {
          dataElement,
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
      program: program,
      programStage: programStage,
    },
  });

  useEffect(() => {
    mutate();
    console.log("Event " + ev.event + " updated!!");
  }, []);

  return <></>;
};

export default UpdateOrigin;
