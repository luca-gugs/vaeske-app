import { Controller } from "react-hook-form";
import NumberInput from "~/app/_components/atoms/NumberInput";
import { useOnboardingContext } from "../../context";

export const EstimatedHomeValue = () => {
  const { control, errors, step, setStep, register, watch, setValue } =
    useOnboardingContext();

  const isDisabled = !watch || watch("estimatedHomeValue") === 0 ? true : false;
  if (register && watch && control) {
    return (
      <>
        <form
          className="shadow-dream relative grid w-[80%] grid-cols-12 gap-[10px] rounded-[10px] border-[2px] border-black p-12 md:w-[600px]"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          <h2 className="col-span-12 text-2xl font-medium">
            How Much is Your Home Worth
          </h2>

          <div className="relative col-span-12 flex flex-col">
            <div className="flex items-center">
              $
              <Controller
                name="estimatedHomeValue"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <NumberInput
                    id="estimatedHomeValue"
                    className="border-[1px] border-white p-1 text-2xl outline-none focus:border-[1px] focus:border-black"
                    {...field}
                    value={field.value.toString()}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-span-12 mt-[50px] flex items-center justify-between">
            <button
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "text-slate-500"
                  : "text-black hover:underline focus:underline"
              } text-xl font-bold outline-none transition-all`}
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      </>
    );
  }
};
