import { Controller, SubmitHandler } from "react-hook-form";
import NumberInput from "~/app/_components/atoms/NumberInput";
import { KeyState, useOnboardingContext } from "../../context";
import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export const DesiredCash = () => {
  const {
    control,
    handleSubmit,
    errors,
    step,
    setStep,
    register,
    watch,
    setValue,
    setFinish,
  } = useOnboardingContext();
  const { user } = useUser();
  const [userMutationDone, setUserMutationDone] = useState(false);
  const [propertyMutationDone, setPropertyMutationDone] = useState(false);
  const [loading, setLoading] = useState(0);
  const [header, setHeader] = useState("Creating Your Profile");
  const [emoji, setEmoji] = useState("🤵");
  const router = useRouter();

  //   API CALLS
  const createUser = api.user.create.useMutation({
    onSuccess: (x, y) => {
      console.log("CREATE USER", x, y);
      setUserMutationDone(true);
    },
    onError: (err) => {
      console.error("CREATE USER ERROR: ", err);
    },
  });
  const createProperty = api.property.create.useMutation({
    onSuccess: (x, y, z) => {
      console.log("CREATE PROPERTY: ", x, y);
      setPropertyMutationDone(true);
    },
    onError: (err) => {
      console.error("CREATE PROPERTY ERROR: ", err);
    },
  });

  //Check When API Calls are Done
  useEffect(() => {
    if (userMutationDone && !propertyMutationDone) {
      setLoading(25);
      setHeader("Creating Your Property");
      setEmoji("🏠");
    }
    if (!userMutationDone && propertyMutationDone) {
      setLoading(25);

      setHeader("Creating Your Property");
      setEmoji("🏠");
    }
    if (userMutationDone && propertyMutationDone) {
      setLoading(60);
      setHeader("Drumming Up Offers");
      setEmoji("🥁");
      setTimeout(() => {
        setLoading(71);
        setHeader("Teaching our ai about house parties");
        setEmoji("🤖🎉");
      }, 1500);
      setTimeout(() => {
        setLoading(86);
        setHeader("Counting grains of sand");
        setEmoji("🏖️");
      }, 1500);
      setTimeout(() => {
        setLoading(93);
        setHeader("Solving world hunger (tell no one)");
        setEmoji("🍲");
      }, 1500);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  }, [userMutationDone, propertyMutationDone]);

  //SUBMIT ONBOARDING FORM
  const onSubmit: SubmitHandler<KeyState> = (data) => {
    setLoading(10);
    setFinish(true);
    //property stuff -- destructuring
    const ehv = parseInt(data.estimatedHomeValue as unknown as string);
    const mb = parseInt(data.mortgageBalance as unknown as string);

    createUser.mutate({
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      type: data.type,
      creditScore: data.creditScore,
    });

    createProperty.mutate({
      street: data.street,
      street2: null, //TODO FIX THIS
      city: data.city,
      state: data.state,
      zip: data.zip,
      ehv: ehv,
      mb: mb,
    });
  };

  if (register && watch && control && handleSubmit) {
    return (
      <>
        {loading <= 0 ? (
          <form
            className="shadow-dream relative grid w-[80%] grid-cols-12 gap-[10px] rounded-[10px] border-[2px] border-black p-12 md:w-[600px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="col-span-12 text-2xl font-medium">
              How much cash do you need?
            </h2>

            <div className="relative col-span-12 flex flex-col">
              <div className="flex items-center">
                $
                <Controller
                  name="desiredCashout"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumberInput
                      id="desiredCash"
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
                className="text-xl font-bold text-black outline-none transition-all hover:underline focus:underline"
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-10">
            <div className="flex items-center">
              <h2 className="mr-4 text-4xl md:text-5xl">{header}</h2>
              <span className="text-6xl md:text-8xl">{emoji}</span>
            </div>
            <div className="h-[10px] w-[80%] rounded-full bg-slate-200 md:w-[450px]">
              <div
                style={{ width: `${loading}%` }}
                className="duration-800 h-[10px] rounded-full bg-violet-500 transition-all"
              />
            </div>
          </div>
        )}
      </>
    );
  }
};
