"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { or } from "drizzle-orm";
import { api } from "~/trpc/react";

export type KeyState = {
  description: string;
  phone: string;
};

interface OrgOnboardingContextType {
  onSubmit: SubmitHandler<KeyState>;
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

const OrgOnboardingContext = createContext<OrgOnboardingContextType>({
  step: 0,
  setStep: () => null,
  register: null,
  errors: null,
  setValue: null,
  watch: null,
  setFocus: null,
  control: null,
  handleSubmit: null,
  onSubmit: () => null,
});

export const OrgOnboardingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  const { organization } = useOrganization();

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
      description: "",
      phone: "",
    },
  });

  // API CALLS
  const creatOrganization = api.org.create.useMutation({
    onSuccess: (x, y) => {
      console.log("CREATE USER", x, y);
      router.refresh();
    },
    onError: (err) => {
      console.error("CREATE USER ERROR: ", err);
    },
  });

  const onSubmit: SubmitHandler<KeyState> = (data) => {
    if (
      organization?.id &&
      organization?.name &&
      organization?.slug &&
      user?.primaryEmailAddress?.emailAddress
    ) {
      creatOrganization.mutate({
        id: organization.id,
        email: user?.primaryEmailAddress?.emailAddress,
        phone: data.phone,
        name: organization.name,
        slug: organization.slug,
        description: data.description,
      });
    } else {
      console.error("ERROR!");
    }
  };

  return (
    <OrgOnboardingContext.Provider
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
        onSubmit,
      }}
    >
      {children}
    </OrgOnboardingContext.Provider>
  );
};

export const useOrgOnboardingContext = () => useContext(OrgOnboardingContext);
