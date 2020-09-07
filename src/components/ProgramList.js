import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";

/**
 * This component make the call to the API requesting
 * the program list implemented in the instance with the flag enabled
 * (using filters). I don't see how to do it using filters, so we should
 * make the call to the api/program endpoint and iterate through each program
 * For each program it retrieves an org unit associated to it and makes a
 * call to the API requesting the level of the parent org unit (level 4).
 * For each program and each parent org unit, eventList is executed.
 */

const query = {
  programs: {
    resource: "programs",
    params: {},
  },
};
