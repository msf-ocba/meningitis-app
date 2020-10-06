import React from "react";
import { ProgramList } from "./components/ProgramList";
import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { DataStore } from "./components/DataStore";

const MeningitisApp = () => {
  return (
    <DataStoreProvider namespace="outbreakApp">
      {/* <ProgramList />; */}
      <DataStore />
    </DataStoreProvider>
  );
};

export default MeningitisApp;
