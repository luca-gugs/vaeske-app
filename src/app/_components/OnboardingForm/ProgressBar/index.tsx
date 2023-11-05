"use client";
import React from "react";
import { useOnboardingContext } from "../context";

export const ProgressBar = () => {
  const { step } = useOnboardingContext();
  const totalSteps = 5;
  const percent = Number((step / totalSteps) * 100).toFixed(0);
  console.log("percent: ", percent, percent === "0");

  return (
    <div className="absolute top-0 h-[8px] w-full bg-slate-200">
      <div
        className={`h-full transition-all duration-700 ${
          percent !== "0" ? `w-[${percent}%]` : "w-[10px]"
        } ${percent !== "100" ? "rounded-r-full" : ""} bg-red-500`}
      />
      <div className="absolute right-5 top-5 w-fit font-bold">{percent}%</div>
    </div>
  );
};
