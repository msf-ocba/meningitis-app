import React, { useEffect, useState } from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import { ProgramList } from "./ProgramList";

function getCurrentDate() {
  let tempDate = new Date();
  let date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getDate() +
    "T" +
    tempDate.getHours() +
    ":" +
    tempDate.getMinutes() +
    ":" +
    tempDate.getSeconds();

  return `${date}`;
}

function getInitialDate() {
  let tempDate = new Date();
  tempDate.setDate(tempDate.getDate() - 300);
  let date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getDate() +
    "T" +
    tempDate.getHours() +
    ":" +
    tempDate.getMinutes() +
    ":" +
    tempDate.getSeconds();

  return `${date}`;
}

const DATASTORE_QUERY = {
  datastore: {
    resource: "dataStore/outbreakApp/settings",
  },
};

const initialMutation = {
  resource: "dataStore/outbreakApp/settings",
  type: "update",
  data: () => ({
    initialExecutionDate: getInitialDate(),
    dataElement: "MZ5Ww7OZTgM",
  }),
};

const followingMutation = {
  resource: "dataStore/outbreakApp/settings",
  type: "update",
  data: ({ dataElement }) => ({
    initialExecutionDate: getCurrentDate(),
    dataElement,
  }),
};

export const DataStore = () => {
  const [data, setData] = useState({});
  const [mutate, { loading, engine }] = useDataMutation(initialMutation);
  const [mutate2] = useDataMutation(followingMutation);
  const requestDataStore = async () => {
    const firstRequest = await engine.query(DATASTORE_QUERY);
    if (Object.entries(firstRequest.datastore).length == 0) {
      await mutate();
      const response = await engine.query(DATASTORE_QUERY);
      await setData(response);
    } else {
      await mutate2({ dataElement: firstRequest.datastore.dataElement });
      await setData(firstRequest);
    }
  };

  useEffect(() => {
    requestDataStore();
  }, []);

  return (
    <React.Fragment>
      {Object.entries(data).length != 0 && (
        <ProgramList
          initialExecutionDate={data.datastore.initialExecutionDate}
          dataElement={data.datastore.dataElement}
        />
      )}
    </React.Fragment>
  );
};
