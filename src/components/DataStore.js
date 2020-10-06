import React, { useEffect, useState } from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";

const DATASTORE_QUERY = {
  datastore: {
    resource: "dataStore/outbreakApp/execution",
  },
};

export const DataStore = () => {
  const { loading, error, data } = useDataQuery(DATASTORE_QUERY);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return <div></div>;
};
