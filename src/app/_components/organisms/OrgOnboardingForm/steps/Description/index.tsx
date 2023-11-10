import { useEffect } from "react";
import { useOrgOnboardingContext } from "../../context";
import { auth, useOrganization, useSession } from "@clerk/nextjs";

export const OrgDescription = () => {
  const { errors, step, setStep, register, watch, setValue, setFocus } =
    useOrgOnboardingContext();
  // Client Side Org Hooks
  const { organization } = useOrganization();

  const isDisabled = !watch || watch("description") === "" ? true : false;
  if (register && watch) {
    return (
      <>
        <form
          className="shadow-dream rounded-[10px relative grid w-[90%] grid-cols-12 gap-[10px] p-6 md:w-[600px] md:p-12"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          <span className="absolute right-2 top-2 text-xs">
            Onboarding: {organization?.name}
          </span>
          <h2 className="col-span-12 text-3xl font-medium">
            Tell us about the type of work your company does
          </h2>

          <div className="relative col-span-12 mt-[40px] flex items-center">
            <textarea
              className="w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
              placeholder="Tell us about your buisness"
              autoComplete="off"
              {...register("description", { required: true })}
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
