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
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
type TableProps = {
  orgId: string;
  other: {
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
const Table = ({ orgId, buyboxes, other }: TableProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(
    { name: buyboxes[0]?.name, id: buyboxes[0]?.id } || null,
  ); // Initial active tab
  const [newBuyBoxModalOpen, setNewBuyBoxModalOpen] = useState(false);
  // const [showSaveButton, setShowButton] = useState(false);
  const [sheet, setSheet] = useState<any[]>([]);
  const [originalSheet, setOriginalSheet] = useState<any[]>([]);

  const handleTabClick = (tabName: string, tabId: number) => {
    setActiveTab({ name: tabName, id: tabId });
  };

  useEffect(() => {
    if (activeTab) {
      const activeBuyBox = buyboxes.find(
        (buybox) => buybox.name === activeTab.name,
      );
      const buyBoxOriginal = other.find(
        (buybox) => buybox.name === activeTab.name,
      );

      if (activeBuyBox?.rules && buyBoxOriginal?.rules) {
        setSheet(activeBuyBox?.rules);
        setOriginalSheet(buyBoxOriginal?.rules);
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

  const createRule = api.rule.create.useMutation({
    onSuccess: () => {
      // router.refresh();
      toast.success("Rule created!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleButtonClick = () => {
    toast.success("You did it!"); // Displays a success message
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
                    activeTab.name === buybox.name ? "border-blue-500" : ""
                  }`}
                  onClick={() => handleTabClick(buybox.name, buybox.id)}
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
          const originalRule = originalSheet[index];

          const showSave =
            JSON.stringify(currentRule) !== JSON.stringify(originalRule);

          const secondaryOptions =
            primaryOptionsObject[
              currentRule.key as keyof typeof primaryOptionsObject
            ].options;

          const setNumberInput = (value: string) => {
            currentRule.value = value;
            const newSheet = sheet.map((u, idx) =>
              idx !== index ? u : currentRule,
            );
            setSheet(newSheet as any);
          };

          const handleKeyValueChange = (
            event: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            currentRule.key = event;
            const newSheet = sheet.map((u, idx) =>
              idx !== index ? u : currentRule,
            );
            setSheet(newSheet as any);
          };

          const handleParamValueChange = (
            event: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            currentRule.params = event;
            const newSheet = sheet.map((u, idx) =>
              idx !== index ? u : currentRule,
            );
            setSheet(newSheet as any);
          };

          const saveRule = (currentRule: any) => {
            // console.log("CURRENT RULE: ", currentRule);
            // console.log("BUYBOX ID: ", activeTab.id);
            if (activeTab.id) {
              createRule.mutate({
                buyBoxId: activeTab.id,
                key: currentRule.key,
                params: currentRule.params,
                value: currentRule.value,
                valueType: currentRule.valueType,
              });
            }
          };

          return (
            <div
              key={index}
              className="md:flex-col-row col-span-12 flex flex-col flex-wrap space-x-0 space-y-2 border px-4 py-2 md:flex-row md:items-center md:space-x-2 md:space-y-0"
            >
              <Select
                selected={
                  primaryOptionsObject[
                    currentRule.key as keyof typeof primaryOptionsObject
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
                      currentRule.params as keyof typeof secondaryOptionsObject
                    ]
                  }
                  setSelected={handleParamValueChange}
                  options={secondaryOptions}
                />
              )}
              <NumberInput
                className="rounded-[6px] border-[1px] border-slate-300 p-[5px]"
                value={sheet[index]?.value || ""}
                onChange={setNumberInput}
                id={""}
              />
              {showSave && (
                <Button
                  className="!py-[7px] !text-sm"
                  onClick={() => saveRule(currentRule)}
                >
                  Save
                </Button>
              )}
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
                {
                  key: "ehv",
                  params: "greaterThan",
                  value: "0",
                  valueType: "number",
                },
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
