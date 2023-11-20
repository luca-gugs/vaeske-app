"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "~/app/_components/atoms/Modals";
import NumberInput from "~/app/_components/atoms/NumberInput";
import { Select } from "~/app/_components/atoms/Select";
import {
  primaryOptionsArray,
  primaryOptionsObject,
  secondaryOptionsObject,
} from "~/app/_utils/scaffold";
import { api } from "~/trpc/react";
import { Button } from "../../../atoms/Button";
import { Info } from "./components/info";
import { Tabs } from "./components/tabs";
import { IconTrash } from "@tabler/icons-react";
type TableProps = {
  orgId: string;
  other: BuyBox[];
  buyboxes: BuyBox[];
};

const Table = ({ orgId, buyboxes, other }: TableProps) => {
  const router = useRouter();

  // State Val
  const [activeTab, setActiveTab] = useState(
    { name: buyboxes[0]?.name, id: buyboxes[0]?.id } || null,
  );
  const [newBuyBoxModalOpen, setNewBuyBoxModalOpen] = useState(false);
  const [sheet, setSheet] = useState<Rule[]>([]);
  const [originalSheet, setOriginalSheet] = useState<any[]>([]);

  const [activeBuyBox, setActiveBuyBox] = useState<BuyBox | null>(
    buyboxes[0] || null,
  );

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Active Sheet Control Hook
  useEffect(() => {
    if (activeTab) {
      const activeBuyBox = buyboxes.find(
        (buybox) => buybox.name === activeTab.name,
      );
      const buyBoxOriginal = other.find(
        (buybox) => buybox.name === activeTab.name,
      );
      setActiveBuyBox(activeBuyBox || null);
      setSheet(activeBuyBox?.rules || []);
      setOriginalSheet(buyBoxOriginal?.rules || []);
    }
  }, [activeTab, buyboxes]);

  // Trpc Call for Creating or Updating Rules
  const createOrUpdateManyRules = api.rule.createAndUpdateMany.useMutation({
    onSuccess: () => {
      toast.success("Buybox Updated!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong updating your buybox!");
    },
  });

  //Trpc Call for Deleting Rules
  const deleteRule = api.rule.delete.useMutation({
    onSuccess: () => {
      toast.success("Rule Deleted Updated!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong updating your buybox!");
    },
  });

  const handleDelete = (rule: Rule) => {
    if (unsavedChanges) {
      // deleteRule.mutate;
    }
  };

  // Check if Rules to Save
  useEffect(() => {
    const sheetString = JSON.stringify(sheet);
    const originalSheetString = JSON.stringify(originalSheet);
    if (sheetString !== originalSheetString) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [sheet, originalSheet]);

  // Save Rules
  const onSave = () => {
    let rulesToServer: Rule[] = [];
    sheet.map((currentRule) => {
      //If Rule is New send to server tot save
      if (!currentRule.id && activeTab.id) {
        rulesToServer.push(currentRule);
        //If rule is not new check if same as old rule
      } else if (currentRule.id && activeTab.id) {
        const oldRule = originalSheet.filter(
          (originalRule) => originalRule.id === currentRule.id,
        );
        // If rule is different send to server to update
        if (JSON.stringify(currentRule) !== JSON.stringify(oldRule)) {
          rulesToServer.push(currentRule);
        } else {
        }
      }
    });

    createOrUpdateManyRules.mutate({ rules: rulesToServer });
  };

  return (
    <>
      <div className="col-span-12 flex justify-between">
        {/* Buy Box Tabs */}
        <Tabs
          activeTab={activeTab}
          buyboxes={buyboxes}
          setActiveTab={setActiveTab}
        />

        <Button
          className="hover:shadow-xl hover:transition-all"
          onClick={() => setNewBuyBoxModalOpen(true)}
        >
          New Buy Box
        </Button>
      </div>

      {activeBuyBox && (
        <div className="col-span-12">
          <Info buyBox={activeBuyBox} />
        </div>
      )}

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
            currentRule.key = event as unknown as string;
            const newSheet = sheet.map((u, idx) =>
              idx !== index ? u : currentRule,
            );
            setSheet(newSheet as any);
          };

          const handleParamValueChange = (
            event: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            currentRule.params = event as unknown as string;
            const newSheet = sheet.map((u, idx) =>
              idx !== index ? u : currentRule,
            );
            setSheet(newSheet as any);
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
              {/* <Image /> */}
              <NumberInput
                className="rounded-[6px] border-[1px] border-slate-300 p-[5px]"
                value={sheet[index]?.value || ""}
                onChange={setNumberInput}
                id={""}
              />
              <button onClick={() => handleDelete(currentRule)}>
                <IconTrash />
              </button>
            </div>
          );
        })}
      </div>

      <div className="col-span-12 mt-8 flex justify-between transition-all">
        {/* Add New Rule Row */}
        {activeTab.id && (
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
                  buyBoxId: activeTab.id || 1,
                },
              ]);
            }}
          >
            Add Rule
          </Button>
        )}
        {unsavedChanges && (
          <Button
            className={
              "transition-all duration-500 hover:scale-105 hover:shadow-xl"
            }
            onClick={onSave}
          >
            Save
          </Button>
        )}
      </div>

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
