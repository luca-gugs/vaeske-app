import { currentUser } from "@clerk/nextjs";
import { Header } from "../_components/Header";
import { OnboardingForm } from "../_components/OnboardingForm";
import { ProgressBar } from "../_components/OnboardingForm/ProgressBar";
import { OnboardingProvider } from "../_components/OnboardingForm/context";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Onboard() {
  const user = await currentUser();
  const userProfile = await api.user.getCurrent.query();

  console.log("USER on onboard: ", userProfile);

  if (userProfile?.id) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-white pt-[64px]">
      <Header />
      <div className="relative flex w-full flex-grow flex-col items-center justify-center">
        <OnboardingProvider>
          <ProgressBar />
          <OnboardingForm />
        </OnboardingProvider>
      </div>
    </main>
  );
}
