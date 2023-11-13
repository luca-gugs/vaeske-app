import { useEffect } from "react";
import { useOnboardingContext } from "../../context";
import { Form } from "../../components/Form";

export const UserType = () => {
  const { errors, step, setStep, register, watch, setValue, setFocus } =
    useOnboardingContext();

  useEffect(() => {
    if (setFocus) {
      setFocus("type");
    }
  }, [setFocus]);

  const isDisabled = !watch || watch("type") === "" ? true : false;
  if (register && watch) {
    return (
      <>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          <h2 className="col-span-12 text-3xl font-medium">
            Tell us about you
          </h2>

          <div className="relative col-span-12 mt-[40px] flex items-center">
            <div className="no-wrap flex min-w-[45px] text-xl font-semibold">
              I am{" "}
            </div>

            <select
              className="flex flex-grow rounded-lg border border-white px-1 py-2 pl-0 text-xl font-semibold focus:border-green-500 focus:outline-none"
              {...register("type", { required: true })}
            >
              <option value="homeOwner">a home owner</option>
              <option value="reEmployee" disabled>
                working for a real estate technology company
              </option>
              <option value="investor" disabled>
                looking to invest in financial products
              </option>
              <option value="loan" disabled>
                looking for a loan
              </option>
            </select>
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
        </Form>
      </>
    );
  }
};
