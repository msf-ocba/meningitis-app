import React from "react";
import UpdateFirstVisit from "./UpdateFirstVisit";

/**
Component that handles how the UpdateFirstVisit component is executed.
If the First Event has the referral dataelement filled it will pass
its value to the First Visit component in order to use it for the update.
Parent component: CheckParent
Child component: UpdateFirstVisit
 */

const CheckDataElements = ({ event, origin, program, programStage }) => {
  return (
    <>
      {event.dataValues.some(
        (dataElement) => dataElement.dataElement == "FyftDLj4iSy"
      ) &&
        event.dataValues.map((referral) => {
          if (referral.dataElement == "FyftDLj4iSy") {
            return (
              <React.Fragment key={event.event}>
                <UpdateFirstVisit
                  dataElementOrigin={origin}
                  dataElementReferral={referral.value}
                  ev={event}
                  program={program}
                  programStage={programStage}
                />
              </React.Fragment>
            );
          }
        })}
      {!event.dataValues.some(
        (dataElement) => dataElement.dataElement == "FyftDLj4iSy"
      ) && (
        <React.Fragment key={event.event}>
          <UpdateFirstVisit
            dataElementOrigin={origin}
            dataElementReferral={null}
            ev={event}
            program={program}
            programStage={programStage}
          />
        </React.Fragment>
      )}
    </>
  );
};

export default CheckDataElements;
