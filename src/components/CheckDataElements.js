import React, { useEffect } from "react";
import UpdateFirstVisit from "./UpdateFirstVisit";

/**
Component that handles how the UpdateFirstVisit component is executed.
If the First Event has the referral dataelement filled it will pass
its value to the First Visit component in order to use it for the update.
Parent component: CheckParent
Child component: UpdateFirstVisit
 */

const CheckDataElements = ({
  event,
  origin,
  program,
  programStage,
  dataElement,
  originDataElement,
  referralDataElement,
  attributeCategoryOptions,
}) => {
  return (
    <>
      {event.dataValues.some(
        (dataElement) => dataElement.dataElement == referralDataElement
      ) &&
        event.dataValues.map((referral) => {
          if (referral.dataElement == referralDataElement) {
            return (
              <React.Fragment key={event.event}>
                <UpdateFirstVisit
                  dataElementOrigin={origin}
                  dataElementReferral={referral.value}
                  ev={event}
                  program={program}
                  programStage={programStage}
                  dataElement={dataElement}
                  originDataElement={originDataElement}
                  referralDataElement={referralDataElement}
                  attributeCategoryOptions={attributeCategoryOptions}
                />
              </React.Fragment>
            );
          }
        })}
      {!event.dataValues.some(
        (dataElement) => dataElement.dataElement == referralDataElement
      ) && (
        <React.Fragment key={event.event}>
          <UpdateFirstVisit
            dataElementOrigin={origin}
            dataElementReferral={null}
            ev={event}
            program={program}
            programStage={programStage}
            dataElement={dataElement}
            originDataElement={originDataElement}
            referralDataElement={referralDataElement}
            attributeCategoryOptions={attributeCategoryOptions}
          />
        </React.Fragment>
      )}
    </>
  );
};

export default CheckDataElements;
