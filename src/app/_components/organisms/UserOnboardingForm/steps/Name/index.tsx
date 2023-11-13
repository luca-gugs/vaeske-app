import { useEffect, useState } from "react";
import { useOnboardingContext } from "../../context";
import { Form } from "../../components/Form";

export default function Name() {
  const { step, setStep, register, watch, setValue } = useOnboardingContext();

  const isDisabled =
    !watch || watch("first") === "" || watch("last") === "" ? true : false;

  if (register && watch) {
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <h2 className="col-span-12 text-4xl font-medium">Whats your name?</h2>

          <div className="relative col-span-12 mt-[20px] grid grid-cols-12 gap-[10px]">
            <input
              id="first"
              type="text"
              className="col-span-12 rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none md:col-span-6"
              placeholder="First"
              {...register("first", { required: true })}
            />
            <input
              id="last"
              type="text"
              className="col-span-12 rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none md:col-span-6"
              placeholder="Last"
              {...register("last", { required: true })}
            />
          </div>

          {/* )} */}

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}

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
        </Form>
      </>
    );
  }
}
