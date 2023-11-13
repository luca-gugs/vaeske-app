// Table.tsx
"use client";
import React, { Fragment, useState } from "react";
import { Button } from "../../../atoms/Button";
import { stateCodes } from "~/app/_utils";
import NumberInput from "~/app/_components/atoms/NumberInput";
import Modal from "~/app/_components/atoms/Modals";
const Table: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Sheet1"); // Initial active tab
  const [newBuyBoxModalOpen, setNewBuyBoxModalOpen] = useState(false);

  const [sheet, setSheet] = useState([
    { key: "ehv", rule: "greater than", value: "0" },
  ]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const options = {
    ehv: {
      name: "Estimated Home Value",
      options: ["Greater Than", "Less Than"],
    },
    mb: { name: "Mortgage Balance", options: ["Greater Than", "Less Than"] },
    cs: { name: "Credit Score", options: ["minimum"] },
    disallowedStates: { name: "Disallowed States", options: stateCodes },
    disallowedZips: { name: "Disallowed Zips", options: [] },
  };

  const optionArray = ["ehv", "mb", "cs", "disallowedStates", "disallowedZips"];
  return (
    <>
      <div className="col-span-12 flex justify-between">
        {/* Buy Box Tabs */}
        {/* <div className="mb-4 flex">
          <div
            className={`cursor-pointer border-b-2 px-4 py-2 ${
              activeTab === "Sheet1" ? "border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("Sheet1")}
          >
            Sheet 1
          </div>
          <div
            className={`cursor-pointer border-b-2 px-4 py-2 ${
              activeTab === "Sheet2" ? "border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("Sheet2")}
          >
            Sheet 2
          </div>
        </div> */}

        <Button
          className="hover:shadow-xl hover:transition-all"
          onClick={() => setNewBuyBoxModalOpen(true)}
        >
          New Buy Box
        </Button>
      </div>

      {/* Rules Table */}
      {/* <div className="col-span-12 grid w-full grid-cols-12">
        <div className="col-span-8 border px-4 py-2 font-bold">Rule</div>
        <div className="col-span-4 border px-4 py-2 font-bold">Value</div>
        {sheet.map((_, index) => {
          let sheetCopy = sheet;
          let currentRow = sheetCopy[index];

          const secondaryOptions =
            options[currentRow?.key as keyof typeof options].options;

          const setNumberInput = (value: string) => {
            if (currentRow && currentRow !== undefined) {
              currentRow.value = value;
              const newSheet = sheetCopy.map((u, idx) =>
                idx !== index ? u : currentRow,
              );
              setSheet(newSheet as any);
            }
          };
          return (
            <Fragment key={index}>
              <div className="col-span-8 border px-4 py-2">
                <select>
                  {optionArray.map((option) => {
                    return (
                      <option value={option}>
                        {options[option as keyof typeof options]?.name}
                      </option>
                    );
                  })}
                </select>
                <span className="mx-2">is</span>
                {secondaryOptions.length > 0 && (
                  <select>
                    {secondaryOptions.map((option) => {
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                )}
              </div>
              <div className="col-span-4 border px-4 py-2">
                <NumberInput
                  value={sheet[index]?.value || ""}
                  onChange={setNumberInput}
                  id={""}
                />
              </div>
            </Fragment>
          );
        })}
      </div> */}

      {/* Add New Rule Row */}
      {/* <div className="col-span-12 mt-8 flex justify-center transition-all">
        <Button
          className={
            "transition-all duration-500 hover:scale-105 hover:shadow-xl"
          }
          onClick={() => {
            setSheet([
              ...sheet,
              { key: "ehv", rule: "greater than", value: "0" },
            ]);
          }}
        >
          Add Rule
        </Button>
      </div> */}

      {/* New Buy Box Modal */}
      <Modal open={newBuyBoxModalOpen} setOpen={setNewBuyBoxModalOpen} />
      {/* Save Button */}
      {/* <Button
        className="absolute bottom-[-80px] right-0 hover:shadow-xl hover:transition-all"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        Save
      </Button> */}
    </>
  );
};

export default Table;
