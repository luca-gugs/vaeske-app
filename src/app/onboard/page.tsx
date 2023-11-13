import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { Header } from "../_components/organisms/Header";
import { UserOnboardingForm } from "../_components/organisms/UserOnboardingForm";
import { ProgressBar } from "../_components/organisms/UserOnboardingForm/components/ProgressBar";
import { OnboardingProvider } from "../_components/organisms/UserOnboardingForm/context";

export default async function Onboard() {
  const userProfile = await api.user.getCurrent.query({});

  if (userProfile?.payload?.user?.id) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-white pt-[64px]">
      <Header />
      <div className="relative flex w-full flex-grow flex-col items-center justify-center">
        <OnboardingProvider>
          <ProgressBar />
          <UserOnboardingForm />
        </OnboardingProvider>
      </div>
    </main>
  );
}
