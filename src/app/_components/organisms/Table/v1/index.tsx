// Table.tsx
"use client";
import React, { useState } from "react";
import { Button } from "../../../atoms/Button";
import { stateCodes } from "~/app/_utils";
import NumberInput from "~/app/_components/atoms/NumberInput";
import { set } from "zod";
const Table: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Sheet1"); // Initial active tab
  const [sheet, setSheet] = useState({
    row1: { key: "ehv", rule: "greater than", value: "0" },
  });
  const [rules, setRules] = useState(1);
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

  console.log("sheet: ", sheet[`row${1}`]);

  return (
    <div className="container relative mx-auto mt-8">
      <Button
        className="absolute bottom-[-80px] right-0 hover:shadow-xl hover:transition-all"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        Save
      </Button>
      {/* Tabs */}
      <div className="mb-4 flex">
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
        {/* Add more tabs as needed */}
      </div>

      {/* Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Key</th>
            <th className="border px-4 py-2">Rule</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Object.keys(sheet).length }).map((_, index) => {
            console.log(
              "sheet: ",
              sheet[`row${index + 1}` as keyof typeof sheet],
            );

            const currentRow: { key: string; rule: string } =
              sheet[`row${index + 1}` as keyof typeof sheet];

            const secondaryOptions =
              options[currentRow.key as keyof typeof options].options;
            console.log("secondaryOptions: ", secondaryOptions);

            const setNumberInput = (value: string) => {
              console.log("SHEET: ");
              const newSheet = { ...sheet, [`row${index + 1}`]: value };
              console.log("value: ", value);
            };
            return (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <select>
                    {optionArray.map((option) => {
                      // console.log("option", option);
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
                  <NumberInput
                    value={sheet[`row${index + 1}` as keyof typeof sheet].value}
                    onChange={setNumberInput}
                    id={""}
                  />
                </td>
                <td className="border px-4 py-2">Row {index + 1}, Column 2</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
