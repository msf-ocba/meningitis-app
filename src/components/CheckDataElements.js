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
              <>
                <UpdateFirstVisit
                  dataElementOrigin={origin}
                  dataElementReferral={referral.value}
                  ev={event}
                />
              </>
            );
          }
        })}
      {!event.dataValues.some(
        (dataElement) => dataElement.dataElement == "FyftDLj4iSy"
      ) && (
        <>
          <UpdateFirstVisit
            dataElementOrigin={origin}
            dataElementReferral={null}
            ev={event}
          />
        </>
      )}
    </>
  );
};

export default CheckDataElements;
