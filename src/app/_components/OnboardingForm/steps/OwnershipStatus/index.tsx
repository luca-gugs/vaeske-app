import { useEffect } from "react";
import { useOnboardingContext } from "../../context";

export const UserType = () => {
  //Not Currently In Use
  const { errors, step, setStep, register, watch, setValue, setFocus } =
    useOnboardingContext();

  useEffect(() => {
    if (setFocus) {
      setFocus("type");
    }
  }, [setFocus]);

  const isDisabled = !watch || watch("type") === "" ? true : false;
  console.log("isDisabled: ", isDisabled);
  if (register && watch) {
    return (
      <>
        <form
          className="shadow-dream relative grid w-[80%] grid-cols-12 gap-[10px] rounded-[10px] border-[2px] border-black p-12 md:w-[600px]"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          <h2 className="col-span-12 text-5xl font-medium">
            Let&apos;s Talk Ownership...
          </h2>

          <div className="relative col-span-12 mt-[40px] flex flex-col items-center">
            <p className="no-wrap font-regular flex min-w-[45px] text-lg">
              A heads up. There are a variety of financial products companies
              can offer you as a homeowner on væske. Some of these allow you to
              retain ownership. Others require you to sell your home (with an
              option to buy it back later). We want to make sure you get the
              right product for your needs.
            </p>
            <select
              className="flex flex-grow rounded-lg border border-white px-1 py-2 pl-0 text-xl font-semibold focus:border-green-500 focus:outline-none"
              {...register("type", { required: true })}
            >
              <option className="text-slate-200" value="">
                ...
              </option>
              <option value="homeOwner">Sounds Good</option>
              <option value="reEmployee">I am only interested</option>
              <option value="investor">
                looking to invest in financial products
              </option>
              <option value="loan">looking for a loan</option>
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
        </form>
      </>
    );
  }
};
