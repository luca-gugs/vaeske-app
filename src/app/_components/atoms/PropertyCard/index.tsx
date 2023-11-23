"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import { addCommas } from "../../../_utils/helpers";
import { MortgageBalance } from "../../organisms/UserOnboardingForm/steps/MortgageBalance/index";
import Link from "next/link";

type PropertyCardProps = {
  properties: Property[];
};
export const PropertyCards = ({ properties }: PropertyCardProps) => {
  const createMatch = api.match.process.useMutation({
    onSuccess: () => {},
  });
  const desktopMap = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-122.4615,37.7894,12.7,0/300x200@2x?access_token=pk.eyJ1IjoibHVjYWdnNDE1IiwiYSI6ImNsbm03cnd0ODIzbzgybnBkczFpcHAydTYifQ.ty1Lrr-cE169UdsZ-FNyMQ&attribution=false&logo=false`;

  return (
    <>
      {properties?.map((property) => {
        let currentDate = new Date(property?.createdAt || "");
        let dateString = currentDate.toString();

        return (
          <div
            className="group relative col-span-12 space-y-2 rounded-xl border-[1px] border-slate-300 bg-white p-2 md:col-span-6"
            key={property.id}
          >
            <Image
              src={desktopMap}
              alt="map"
              width={300}
              height={200}
              className="max-h-[250px] w-full object-cover shadow-md transition-all duration-700 group-hover:shadow-xl"
            />
            <div className="absolute right-1 top-1 flex">
              <button
                onClick={() => {
                  console.log("CLICKED");
                  createMatch.mutate({
                    propertyId: property.id,
                    stateCode: property.state,
                  });
                }}
                className="shadow-shorter text-md mr-1 rounded-3xl border-[1px] border-red-500 bg-red-200 p-1.5 px-2 font-medium text-red-500"
              >
                Process
              </button>
              <button
                onClick={() => {
                  console.log("CLICKED");
                  createMatch.mutate({
                    propertyId: property.id,
                    stateCode: property.state,
                  });
                }}
                className="shadow-shorter text-md rounded-3xl border-[1px] border-green-500 bg-green-200 p-1.5 px-2 font-semibold text-green-500"
              >
                Matches ({property?.matchCount || 0})
              </button>
            </div>
            <div className="flex flex-col space-y-2 p-2">
              <div className="flex w-fit flex-col">
                <span className="w-fit text-xl font-semibold">
                  {property?.streetAddress}, {property?.city}, {property?.state}
                  , {property?.zip}
                </span>
                <div className="h-[2px] w-0 bg-slate-700 transition-all duration-500 group-hover:!w-full" />
              </div>
              <div className="flex w-full">
                <div className=" flex w-1/2 items-baseline space-x-2">
                  <span className="text-sm">Home Value:</span>
                  <span className="text-lg font-medium">
                    ${addCommas(property?.ehv || 0)}
                  </span>
                </div>
                <div className="space-between flex w-1/2 items-baseline space-x-2">
                  <span className="text-sm">Mortgage Balance:</span>
                  <span className="text-lg font-medium">{property?.mb}</span>
                </div>
              </div>
              <div className="flex w-full">
                <div className=" flex w-1/2 items-baseline space-x-2">
                  <span className="text-sm">Liens/Debts:</span>
                  <span className="text-lg font-medium">{property?.liens}</span>
                </div>
                <div className=" flex w-1/2 items-baseline space-x-2">
                  <span className="text-sm">LTV:</span>
                  <span className="text-lg font-medium">
                    {(property?.ltv || 0) * 100}%
                  </span>
                </div>
              </div>
              <div className="flex w-full">
                <div className=" flex w-full items-baseline space-x-2">
                  {/* <span className="text-xs">Created:</span> */}
                  <span className="text-sm text-slate-600">{dateString}</span>
                </div>
                {/* <div className=" flex w-1/2 items-baseline space-x-2">
                  <span>LTV:</span>
                  <span className="text-lg font-medium">
                    {(property?.ltv || 0) * 100}%
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
