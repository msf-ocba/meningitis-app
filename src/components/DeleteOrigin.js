import React, { useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**
Component that handles the deleting process of an origin event when
the HAO attribute value is changed (or gets corrected) to the same 
Health Area as the event registration level 6 ancestor.
**/

export const DeleteOrigin = ({ id }) => {
  const mutation = {
    resource: "events",
    type: "delete",
    id: ({ id }) => id,
  };
  const [mutate] = useDataMutation(mutation, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    mutate();
    console.log("Event " + id + " deleted!!");
  }, []);

  return <></>;
};

export default DeleteOrigin;
