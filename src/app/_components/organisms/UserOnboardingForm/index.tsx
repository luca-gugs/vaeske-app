"use client";
import React, { useState } from "react";
import StreetAddress from "./steps/StreetAddress";
import { OnboardingProvider, useOnboardingContext } from "./context";
import { UserType } from "./steps/UserType";
import { EstimatedHomeValue } from "./steps/EHV";
import { MortgageBalance } from "./steps/MortgageBalance";
import { DesiredCash } from "./steps/DesiredCash";
import { Submit } from "./submit";
import { CreditScore } from "./steps/CreditScore";

//TODO Create Credit Score Step
export const UserOnboardingForm = () => {
  const { step } = useOnboardingContext();
  switch (step) {
    case 0:
      return <UserType />;
    case 1:
      return <CreditScore />;
    case 2:
      return <StreetAddress />;
    case 3:
      return <EstimatedHomeValue />;
    case 4:
      return <MortgageBalance />;
    case 5:
      return <DesiredCash />;
    // case 5:
    //   return <Submit />;
    // case 6:
    //   return <div>6</div>;
    default:
      return <div>default</div>;
  }
};
