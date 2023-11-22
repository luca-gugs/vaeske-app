"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

type PropertyCardProps = {
  properties: Property[];
};
export const PropertyCards = ({ properties }: PropertyCardProps) => {
  const createMatch = api.match.process.useMutation({
    onSuccess: () => {
      //   router.refresh();
      //   setName("");
    },
  });

  return (
    <>
      {properties?.map((property) => {
        return (
          <div
            className="relative col-span-12 space-y-2 rounded-xl border-[1px] border-slate-300 bg-white p-4 md:col-span-6 lg:col-span-4"
            key={property.id}
          >
            <button
              onClick={() => {
                console.log("CLICKED");
                createMatch.mutate({
                  propertyId: property.id,
                  stateCode: property.state,
                });
              }}
              className="absolute right-1 top-1 text-red-500"
            >
              Process
            </button>
            <div className="space-between flex">
              <span>Addr:</span>
              <span>
                {property?.streetAddress}, {property?.city}, {property?.state},{" "}
                {property?.zip}
              </span>
            </div>
            <div className="space-between flex">
              <span>EHV:</span>
              <span>{property?.ehv}</span>
            </div>
            <div className="space-between flex">
              <span>MB:</span>
              <span>{property?.mb}</span>
            </div>
            <div className="space-between flex">
              <span>LTV:</span>
              <span>{property?.ltv}</span>
            </div>
            <div className="space-between flex">
              <span>Liens:</span>
              <span>{property?.liens}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
