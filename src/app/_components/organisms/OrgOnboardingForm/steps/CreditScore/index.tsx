import { useEffect } from "react";
import { useOnboardingContext } from "../../context";

export const CreditScore = () => {
  const { errors, step, setStep, register, watch, setValue, setFocus } =
    useOnboardingContext();

  useEffect(() => {
    if (setFocus) {
      setFocus("type");
    }
  }, [setFocus]);
  const creditScoreRanges = [
    { label: "Excellent (750-850)", value: "excellent" },
    { label: "Good (700-749)", value: "good" },
    { label: "Fair (650-699)", value: "fair" },
    { label: "Poor (600-649)", value: "poor" },
    { label: "Bad (Below 600)", value: "bad" },
  ];

  const isDisabled = !watch || watch("creditScore") === "" ? true : false;
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
          <h2 className="col-span-12 text-3xl font-medium">
            Whats your credit history?
          </h2>

          <div className="relative col-span-12 mt-[40px] flex items-center">
            <select
              className="flex flex-grow rounded-lg border border-white px-1 py-2 pl-0 text-xl font-semibold focus:border-green-500 focus:outline-none"
              {...register("creditScore", { required: true })}
            >
              {creditScoreRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
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
