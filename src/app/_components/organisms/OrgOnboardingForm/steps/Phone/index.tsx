import { useEffect } from "react";
import { useOrgOnboardingContext } from "../../context";
import { auth, useOrganization, useSession, useUser } from "@clerk/nextjs";
import { Controller } from "react-hook-form";
import PhoneNumber from "~/app/_components/atoms/PhoneInput";

export const OrgPhoneNumber = () => {
  const { onSubmit, control, handleSubmit, step, setStep, register, watch } =
    useOrgOnboardingContext();
  const { organization, membership } = useOrganization();

  const isDisabled = !watch || watch("phone") === "" ? true : false;
  if (register && watch && control && handleSubmit) {
    return (
      <>
        <form
          className="shadow-dream rounded-[10px relative grid w-[90%] grid-cols-12 gap-[10px] p-6 md:w-[600px] md:p-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="absolute right-2 top-2 text-xs">
            Onboarding: {organization?.name}
          </span>
          <h2 className="col-span-12 text-3xl font-medium">
            Where Can We Contact You
          </h2>

          <div className="relative col-span-12 mt-[40px] flex items-center">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneNumber
                  id="phone"
                  className="border-[1px] border-white p-1 text-2xl outline-none focus:border-[1px] focus:border-black"
                  {...field}
                  value={field.value.toString()}
                />
              )}
            />
          </div>

          <div className="col-span-12 mt-[50px] flex items-center justify-between">
            <button
              className={`${
                isDisabled
                  ? "text-slate-500"
                  : "text-black hover:underline focus:underline"
              } text-xl font-bold outline-none transition-all`}
              type="submit"
              disabled={isDisabled}
            >
              Next
            </button>
          </div>
        </form>
      </>
    );
  }
};
