"use client";
import React from "react";
import { useOnboardingContext } from "../../context";

export const ProgressBar = () => {
  const { step, finish } = useOnboardingContext();
  const totalSteps = finish ? 6 : 7;
  const percent = Number((step / totalSteps) * 100).toFixed(0);
  // refire deploy
  return (
    <div className="absolute top-0 h-[8px] w-full bg-slate-200">
      <div
        style={{ width: `${percent}%`, minWidth: "5%" }}
        className={`h-full transition-all duration-700 ${
          percent !== "100" ? "rounded-r-full" : ""
        } bg-red-500`}
      />
      <div className="absolute right-5 top-5 w-fit font-bold">{percent}%</div>
    </div>
  );
};
