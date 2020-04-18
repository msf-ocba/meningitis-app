import React from "react";
import UpdateFirstVisit from "./UpdateFirstVisit";

/**
 *
 *
 */

const CheckDataElements = ({ event, origin }) => {
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
          />
        </React.Fragment>
      )}
    </>
  );
};

export default CheckDataElements;
