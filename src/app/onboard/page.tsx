import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { Header } from "../_components/organisms/Header";
import { OnboardingForm } from "../_components/organisms/OnboardingForm";
import { ProgressBar } from "../_components/organisms/OnboardingForm/ProgressBar";
import { OnboardingProvider } from "../_components/organisms/OnboardingForm/context";

export default async function Onboard() {
  const userProfile = await api.user.getCurrent.query({});

  if (userProfile?.user?.id) {
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
