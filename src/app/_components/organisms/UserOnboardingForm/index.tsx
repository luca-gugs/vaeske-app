"use client";
import React, { useState } from "react";
import StreetAddress from "./steps/StreetAddress";
import { OnboardingProvider, useOnboardingContext } from "./context";
import { UserType } from "./steps/UserType";
import { EstimatedHomeValue } from "./steps/EHV";
import { MortgageBalance } from "./steps/MortgageBalance";
import { DesiredCash } from "./steps/DesiredCash";
import { CreditScore } from "./steps/CreditScore";
import Name from "./steps/Name";

//TODO Create Credit Score Step
export const UserOnboardingForm = () => {
  const { step } = useOnboardingContext();
  switch (step) {
    case 0:
      return <Name />;
    case 1:
      return <UserType />;
    case 2:
      return <CreditScore />;
    case 3:
      return <StreetAddress />;
    case 4:
      return <EstimatedHomeValue />;
    case 5:
      return <MortgageBalance />;
    case 6:
      return <DesiredCash />;
    // case 5:
    //   return <Submit />;
    // case 6:
    //   return <div>6</div>;
    default:
      return <div>default</div>;
  }
};
