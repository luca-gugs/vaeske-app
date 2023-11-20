import React from "react";

type InfoProps = {
  buyBox: BuyBox;
};
export const Info = ({ buyBox }: InfoProps) => {
  const parsedStates = buyBox.disallowedStates?.split("%");
  return (
    <div className="flex items-center">
      <span className="mr-2 text-lg font-medium">Disallowed States: </span>
      {parsedStates && parsedStates.length > 0 ? (
        parsedStates.map((state, idx) => {
          return (
            <span className="text-md mr-2" key={idx}>
              {state}
            </span>
          );
        })
      ) : (
        <span>null</span>
      )}
    </div>
  );
};
