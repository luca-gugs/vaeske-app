"use client";
import React, {
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import { Button } from "../../../atoms/Button";
import {
  primaryOptionsArray,
  primaryOptionsObject,
  secondaryOptionsObject,
  stateCodes,
} from "~/app/_utils/scaffold";
import NumberInput from "~/app/_components/atoms/NumberInput";
import Modal from "~/app/_components/atoms/Modals";
import { Select } from "~/app/_components/atoms/Select";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MultiSelect from "~/app/_components/atoms/MultiSelect";
import { Tabs } from "./components/tabs";

type TableProps = {
  orgId: string;
  other: BuyBox[];
  buyboxes: BuyBox[];
};

const Table = ({ orgId, buyboxes, other }: TableProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(
    { name: buyboxes[0]?.name, id: buyboxes[0]?.id } || null,
  );
  const [newBuyBoxModalOpen, setNewBuyBoxModalOpen] = useState(false);
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

      setSheet(activeBuyBox?.rules || []);
      setOriginalSheet(buyBoxOriginal?.rules || []);
    }
  }, [activeTab, buyboxes]);

  const createRule = api.rule.create.useMutation({
    onSuccess: () => {
      toast.success("Rule Created!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong creating rule!");
    },
  });

  const updateRule = api.rule.update.useMutation({
    onSuccess: () => {
      toast.success("Rule Updated!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong updating rule!");
    },
  });

  return (
    <>
      <div className="col-span-12 flex justify-between">
        {/* Buy Box Tabs */}
        <Tabs
          activeTab={activeTab}
          buyboxes={buyboxes}
          handleClick={handleTabClick}
        />

        <Button
          className="hover:shadow-xl hover:transition-all"
          onClick={() => setNewBuyBoxModalOpen(true)}
        >
          New Buy Box
        </Button>
      </div>

      <div className="col-span-12">{/*  */}</div>

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
            if (activeTab.id) {
              if (!currentRule.id) {
                createRule.mutate({
                  buyBoxId: activeTab.id,
                  key: currentRule.key,
                  params: currentRule.params,
                  value: currentRule.value,
                  valueType: currentRule.valueType,
                });
              } else {
                updateRule.mutate({
                  id: currentRule.id,
                  buyBoxId: activeTab.id,
                  key: currentRule.key,
                  params: currentRule.params,
                  value: currentRule.value,
                  valueType: currentRule.valueType,
                });
              }
            } else {
              toast.error("NO BUYBOX ID");
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
    </>
  );
};

export default Table;
