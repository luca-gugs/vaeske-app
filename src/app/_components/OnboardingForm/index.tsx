"use client";
import React, { useState } from "react";
import StreetAddress from "./steps/StreetAddress";
import { OnboardingProvider, useOnboardingContext } from "./context";
import { UserType } from "./steps/UserType";
import { EstimatedHomeValue } from "./steps/EHV";
import { MortgageBalance } from "./steps/MortgageBalance";
import { DesiredCash } from "./steps/DesiredCash";
import { Submit } from "./submit";

//TODO Create Credit Score Step
export const OnboardingForm = () => {
  const { step } = useOnboardingContext();
  switch (step) {
    case 0:
      return <UserType />;
    case 1:
      return <StreetAddress />;
    case 2:
      return <EstimatedHomeValue />;
    case 3:
      return <MortgageBalance />;
    case 4:
      return <DesiredCash />;
    // case 5:
    //   return <Submit />;
    // case 6:
    //   return <div>6</div>;
    default:
      return <div>default</div>;
  }
};
