import React, { useEffect, useState } from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import { ProgramList } from "./ProgramList";

/**
 * This component make a call to the API requesting
 * the tracker program list implemented in the instance with the
 * flag enabled (Attribute => "Include in Outbreak App").
 */

function getCurrentDate() {
  //This function calculates the (current - 1) date
  //using DHIS2 format for dates
  let tempDate = new Date();
  let date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    /**
     * We take the day before for the lastExecutionDate
     * just in case the timezone where the events get
     * registered is different from the timezone where
     * Outbreak App is executed
     */
    (tempDate.getDate() - 1) +
    "T" +
    tempDate.getHours() +
    ":" +
    tempDate.getMinutes() +
    ":" +
    tempDate.getSeconds();

  return `${date}`;
}

function getInitialDate(dateList) {
  //This function gets a date array extracted from the
  //programList and returns the earliest one to use it
  //as the initialExecutionDate

  const earliest = dateList.reduce(function (pre, cur) {
    return Date.parse(pre) > Date.parse(cur) ? cur : pre;
  });
  return `${earliest}`;
}

const PROGRAMS_QUERY = {
  //This query request the tracker programs marked as executable
  //for the Outbreak App
  programs: {
    resource: "programs",
    params: {
      paging: false,
      fields: "id, displayName, created",
      filter: [
        "programType:eq:WITH_REGISTRATION",
        "attributeValues.attribute.id:eq:WVmkKHRZi52",
        "attributeValues.value:eq:true",
      ],
    },
  },
};

const DATASTORE_QUERY = {
  //This query requests actual the Settings for Outbreak App
  //in the DHIS2 DataStore
  datastore: {
    resource: "dataStore/outbreakApp/settings",
  },
};

const initialMutation = {
  //This mutation sets the Settings for Outbreak App in case
  //it is the initial execution of the app in a particular sever
  resource: "dataStore/outbreakApp/settings",
  type: "update",
  data: ({ dateList }) => ({
    initialExecutionDate: getInitialDate(dateList),
    dataElement: "MZ5Ww7OZTgM",
  }),
};

const followingMutation = {
  //This mutation sets the Settings for Outbreak App of the
  //last execution in the server
  resource: "dataStore/outbreakApp/settings",
  type: "update",
  data: ({ dataElement }) => ({
    initialExecutionDate: getCurrentDate(),
    dataElement,
  }),
};

export const DataStore = () => {
  const [data, setData] = useState({});
  const [programList, setProgramList] = useState({});
  const [mutate, { engine }] = useDataMutation(initialMutation);
  const [mutate2] = useDataMutation(followingMutation);
  const requestDataStore = async () => {
    const firstRequest = await engine.query(DATASTORE_QUERY);
    const programs = await engine.query(PROGRAMS_QUERY);
    await setProgramList(programs);
    const dateList = await programs.programs.programs.map((program) => [
      program.created,
    ]);
    if (Object.entries(firstRequest.datastore).length == 0) {
      //If the Outbreak App namespace is empty in the dataStore
      await mutate({ dateList });
      const response = await engine.query(DATASTORE_QUERY);
      await setData(response);
      await mutate2({ dataElement: response.datastore.dataElement });
    } else {
      //Otherwise
      await mutate2({ dataElement: firstRequest.datastore.dataElement });
      await setData(firstRequest);
    }
  };

  useEffect(() => {
    requestDataStore();
  }, []);

  // useEffect(() => {
  //   if (Object.entries(programList).length != 0) {
  //     console.log(programList);
  //   }
  // }, [programList]);

  return (
    <React.Fragment>
      {Object.entries(data).length != 0 &&
        Object.entries(programList).length != 0 && (
          <>
            <p>DATASTORE</p>
            <p>
              initialExecutionDate{": "}
              {JSON.stringify(data.datastore.initialExecutionDate)}
            </p>
            <p>
              dataElement{": "}
              {JSON.stringify(data.datastore.dataElement)}
            </p>

            <p>EXECUTION</p>

            <p>
              programs{": "}
              {JSON.stringify(
                programList.programs.programs.map((program) => {
                  return program.displayName;
                })
              )}
            </p>
            <ProgramList
              initialExecutionDate={data.datastore.initialExecutionDate}
              dataElement={data.datastore.dataElement}
              programs={programList}
            />
          </>
        )}
    </React.Fragment>
  );
};
