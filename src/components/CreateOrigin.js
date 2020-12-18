import React, { useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**
Component that handles the creation of new origin events.
Every time a new origin event is created a log appears at the console.
**/

export const CreateOrigin = ({
  orgUnit,
  trackedEntityInstance,
  enrollment,
  eventDate,
  program,
  programStage,
  dataElement,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
}) => {
  const mutation = {
    resource: "events",
    type: "create",
    data: ({
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      program,
      programStage,
    }) => ({
      program,
      programStage,
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      status: "ACTIVE",
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
      orgUnit: orgUnit,
      trackedEntityInstance: trackedEntityInstance,
      enrollment: enrollment,
      eventDate: eventDate,
      program: program,
      programStage: programStage,
    },
  });

  useEffect(() => {
    mutate();
    console.log(
      "Origin event with TEI_ID: " +
        trackedEntityInstance +
        " has been created!! And ProgramStage " +
        programStage
    );
  }, []);

  return <></>;
};

export default CreateOrigin;
