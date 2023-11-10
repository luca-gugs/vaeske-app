"use client";
import { useOrgOnboardingContext } from "./context";
import { OrgDescription } from "./steps/Description";
import { OrgPhoneNumber } from "./steps/Phone";

//TODO Create Credit Score Step
export const OrgOnboardingForm = () => {
  const { step } = useOrgOnboardingContext();
  switch (step) {
    case 0:
      return <OrgDescription />;
    case 1:
      return <OrgPhoneNumber />;
    // case 2:
    //   return <StreetAddress />;
    // case 3:
    //   return <EstimatedHomeValue />;
    // case 4:
    //   return <MortgageBalance />;
    // case 5:
    //   return <DesiredCash />;
    // case 5:
    //   return <Submit />;
    // case 6:
    //   return <div>6</div>;
    default:
      return <div>default</div>;
  }
};
