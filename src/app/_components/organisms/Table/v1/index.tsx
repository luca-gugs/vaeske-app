// Table.tsx
"use client";
import React, {
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import { Button } from "../../../atoms/Button";
import { stateCodes } from "~/app/_utils";
import NumberInput from "~/app/_components/atoms/NumberInput";
import Modal from "~/app/_components/atoms/Modals";
import { Select } from "~/app/_components/atoms/Select";

type TableProps = {
  orgId: string;
  buyboxes: {
    orgId: string;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    rules?: {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      buyBoxId: number;
      key: string;
      params: string;
      value: string;
      valueType: string;
    }[];
  }[];
};
const Table = ({ orgId, buyboxes }: TableProps) => {
  console.log("BUYBOXES: ", buyboxes);

  const [activeTab, setActiveTab] = useState(buyboxes[0]?.name || null); // Initial active tab
  const [newBuyBoxModalOpen, setNewBuyBoxModalOpen] = useState(false);

  const [sheet, setSheet] = useState<any[]>([]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (activeTab) {
      const activeBuyBox = buyboxes.find((buybox) => buybox.name === activeTab);
      if (activeBuyBox?.rules && activeBuyBox?.rules.length > 0) {
        setSheet(activeBuyBox?.rules);
      }
    }
  }, [activeTab]);

  const primaryOptionsObject = {
    ehv: {
      id: "ehv",
      name: "Estimated Home Value",
      options: ["greaterThan", "lessThan"],
    },
    mb: {
      id: "mb",
      name: "Mortgage Balance",
      options: ["greaterThan", "lessThan"],
    },
    cs: {
      id: "cs",
      name: "Credit Score",
      options: ["greaterThan", "lessThan"],
    },
    disallowedStates: {
      id: "disallowedStates",
      name: "Disallowed States",
      options: [],
    },
    disallowedZips: {
      id: "disallowedZips",
      name: "Disallowed Zips",
      options: [],
    },
  };
  const primaryOptionsArray = [
    "ehv",
    "mb",
    "cs",
    "disallowedStates",
    "disallowedZips",
  ];

  const secondaryOptionsObject = {
    greaterThan: {
      id: "greaterThan",
      name: "Greater Than",
    },
    lessThan: {
      id: "lessThan",
      name: "Less Than",
    },
  };

  return (
    <>
      <div className="col-span-12 flex justify-between">
        {/* Buy Box Tabs */}
        {buyboxes.length > 0 && (
          <div className="mb-4 flex">
            {buyboxes.map((buybox, idx) => {
              return (
                <div
                  key={idx}
                  className={`cursor-pointer border-b-2 px-4 py-2 ${
                    activeTab === buybox.name ? "border-blue-500" : ""
                  }`}
                  onClick={() => handleTabClick(buybox.name)}
                >
                  {buybox.name}
                </div>
              );
            })}
          </div>
        )}

        <Button
          className="hover:shadow-xl hover:transition-all"
          onClick={() => setNewBuyBoxModalOpen(true)}
        >
          New Buy Box
        </Button>
      </div>

      {/* Rules Table */}
      <div className="col-span-12 grid w-full grid-cols-12">
        <div className="col-span-12 border px-4 py-2 font-bold">Rules</div>
        {sheet.map((currentRule, index) => {
          let sheetCopy = sheet;
          let currentRow = sheetCopy[index];

          console.log("currentRow", currentRow);

          const secondaryOptions =
            primaryOptionsObject[
              currentRow?.key as keyof typeof primaryOptionsObject
            ].options;

          const setNumberInput = (value: string) => {
            if (currentRow && currentRow !== undefined) {
              currentRow.value = value;
              const newSheet = sheetCopy.map((u, idx) =>
                idx !== index ? u : currentRow,
              );
              setSheet(newSheet as any);
            }
          };

          const handleKeyValueChange = (
            event: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            currentRow.key = event;
            const newSheet = sheetCopy.map((u, idx) =>
              idx !== index ? u : currentRow,
            );
            setSheet(newSheet as any);
          };

          const handleParamValueChange = (
            event: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            currentRow.params = event;
            const newSheet = sheetCopy.map((u, idx) =>
              idx !== index ? u : currentRow,
            );
            setSheet(newSheet as any);
          };

          return (
            <div
              key={index}
              className="md:flex-col-row col-span-12 flex flex-col flex-wrap space-x-0 space-y-2 border px-4 py-2 md:items-center md:space-x-2 md:space-y-0"
            >
              <Select
                selected={
                  primaryOptionsObject[
                    currentRow.key as keyof typeof primaryOptionsObject
                  ]
                }
                setSelected={handleKeyValueChange}
                options={primaryOptionsArray}
              />
              <span className="">is</span>
              {secondaryOptions.length > 0 && (
                <Select
                  selected={
                    secondaryOptionsObject[
                      currentRow.params as keyof typeof secondaryOptionsObject
                    ]
                  }
                  setSelected={handleParamValueChange}
                  options={secondaryOptions}
                />
              )}
              <NumberInput
                value={sheet[index]?.value || ""}
                onChange={setNumberInput}
                id={""}
              />
            </div>
          );
        })}
      </div>

      {/* Add New Rule Row */}
      {activeTab && (
        <div className="col-span-12 mt-8 flex justify-center transition-all">
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
        </div>
      )}

      {/* New Buy Box Modal */}
      <Modal
        orgId={orgId}
        open={newBuyBoxModalOpen}
        setOpen={setNewBuyBoxModalOpen}
      />
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
