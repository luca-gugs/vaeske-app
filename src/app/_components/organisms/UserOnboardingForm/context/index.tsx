"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";

export type KeyState = {
  //User Values
  type: string; //Step 1
  ownershipStatusCheck: boolean; //Step 1
  creditScore: string;
  first: string;
  last: string;

  //Property Values
  street: string; //Step 3
  street2: string; //Step 3
  city: string; //Step 3
  state: string; //Step 3
  zip: string; //Step 3

  //Financial Values
  estimatedHomeValue: number; //Step 4
  mortgageBalance: number; //Step 5
  desiredCashout: number; //Step 6
};

interface OnboardingContextType {
  finish: boolean;
  setFinish: (finish: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  register: UseFormRegister<KeyState> | null;
  errors: FieldErrors<KeyState> | null;
  setValue: UseFormSetValue<KeyState> | null;
  watch: UseFormWatch<KeyState> | null;
  setFocus: UseFormSetFocus<KeyState> | null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  control: Control<KeyState, any> | null;
  handleSubmit: UseFormHandleSubmit<KeyState, undefined> | null;
}

const OnboardingContext = createContext<OnboardingContextType>({
  finish: false,
  setFinish: () => null,
  step: 0,
  setStep: () => null,
  register: null,
  errors: null,
  setValue: null,
  watch: null,
  setFocus: null,
  control: null,
  handleSubmit: null,
});

export const OnboardingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [finish, setFinish] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      // User Values
      type: "homeOwner",
      creditScore: "good",
      ownershipStatusCheck: true,
      first: "",
      last: "",
      // Address Values
      street: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      // Financial Values
      estimatedHomeValue: 0,
      mortgageBalance: 0,
      desiredCashout: 0,
    },
  });

  return (
    <OnboardingContext.Provider
      value={{
        control,
        handleSubmit,
        step,
        setStep,
        register,
        errors,
        setValue,
        watch,
        setFocus,
        finish,
        setFinish,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => useContext(OnboardingContext);
