import { Header } from "../_components/Header";
import { OnboardingForm } from "../_components/OnboardingForm";
import { ProgressBar } from "../_components/OnboardingForm/ProgressBar";
import { OnboardingProvider } from "../_components/OnboardingForm/context";

export default function Onboard() {
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
