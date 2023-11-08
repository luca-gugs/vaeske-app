import { use, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useOnboardingContext } from "../../context";

type Inputs = {
  streetAddress: string;
  example: string;
  exampleRequired: string;
};

export default function StreetAddress() {
  const { errors, step, setStep, register, watch, setValue } =
    useOnboardingContext();
  const [manageFullAddr, setManageFullAddr] = useState(false);
  const [suggestions, setSuggestions] = useState<
    {
      street: string;
      city: string;
      state: string;
      zip: string;
    }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const testSuggestions: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }[] = [
    { street: "2 Willow Lane", city: "Sausalito", state: "CA", zip: "94965" },
    { street: "2 Willow Lane", city: "Sausalito", state: "CA", zip: "94965" },
    { street: "2 Willow Lane", city: "Sausalito", state: "CA", zip: "94965" },
    { street: "2 Willow Lane", city: "Sausalito", state: "CA", zip: "94965" },
  ];

  useEffect(() => {
    setSuggestions(testSuggestions);
    setShowSuggestions(true);
  }, []);

  const updateViaAutocomplete = (
    street: string,
    city: string,
    state: string,
    zip: string,
    street2?: string,
  ) => {
    if (setValue) {
      if (street) setValue("street", street);
      if (street2) setValue("street2", street2);
      if (city) setValue("city", city);
      if (state) setValue("state", state);
      if (zip) setValue("zip", zip);
      setShowSuggestions(false);
    }
  };

  if (register && watch) {
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <>
        <form
          className="shadow-dream relative grid w-[80%] grid-cols-12 gap-[10px] rounded-[10px] border-[2px] border-black p-12 md:w-[600px]"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <h2 className="col-span-12 text-4xl font-medium">
            Whats your address?
          </h2>

          <div className="relative col-span-12">
            <span className="text-sm font-bold">Street Addr</span>
            <input
              type="text"
              className="w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
              placeholder="Street Addr."
              //   autoill='off'
              {...register("street", { required: true })}
            />
            {showSuggestions &&
              watch("street").length > 3 &&
              suggestions.length > 0 && (
                <div className="shadow-shorter absolute bottom-[-140px] z-30 overflow-hidden rounded-lg border-[2px] border-slate-200 bg-white">
                  {suggestions.map(
                    (
                      suggestion: {
                        street: string;
                        city: string;
                        state: string;
                        zip: string;
                      },
                      idx,
                    ) => {
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() =>
                            updateViaAutocomplete(
                              suggestion.street,
                              suggestion.city,
                              suggestion.state,
                              suggestion.zip,
                            )
                          }
                          className="flex cursor-pointer gap-2 px-2 py-1 hover:bg-blue-200"
                        >
                          <span>{suggestion.street},</span>
                          <span>{suggestion.city},</span>
                          <span>{suggestion.state},</span>
                          <span>{suggestion.zip}</span>
                        </button>
                      );
                    },
                  )}
                </div>
              )}
          </div>

          <div
            className={`col-span-12 grid w-full grid-cols-12 gap-[10px] overflow-hidden transition-all  ${
              manageFullAddr
                ? "h-[142px] duration-200"
                : "h-[0px] duration-1000"
            }`}
          >
            <div
              className={`col-span-6 transition-all duration-700 ${
                manageFullAddr ? "opacity-100" : "opacity-0"
              } `}
            >
              <span className="text-sm font-bold">City</span>
              <input
                type="text"
                className="w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
                placeholder="City"
                {...register("city", { required: true })}
              />
            </div>
            <div
              className={`col-span-6 transition-all duration-700 ${
                manageFullAddr ? "opacity-100" : "opacity-0"
              } `}
            >
              <span className="text-sm font-bold">State</span>

              <select
                className="h-[42px] w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
                {...register("state", { required: true })}
              >
                <option className="text-slate-200" value="">
                  Select a state
                </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="CA">California</option>

                {/* Add more state options here */}
              </select>
            </div>
            <div
              className={`col-span-4 transition-all duration-700 ${
                manageFullAddr ? "opacity-100" : "opacity-0"
              } `}
            >
              {" "}
              <span className="text-sm font-bold">Zip</span>
              <input
                type="text"
                className="w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
                placeholder="zip"
                {...register("zip", { required: true })}
              />
            </div>
          </div>
          {/* )} */}

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}

          <div className="col-span-12 mt-[50px] flex items-center justify-between">
            <button
              className="text-xl font-bold text-black outline-none transition-all hover:underline focus:underline"
              type="submit"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setManageFullAddr(!manageFullAddr)}
              className="col-span-12 text-left text-xs outline-none hover:underline focus:underline"
            >
              {manageFullAddr ? "use autocomplete" : "input manually"}
            </button>
          </div>
        </form>
      </>
    );
  }
}
