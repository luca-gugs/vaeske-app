import { SignIn } from "@clerk/nextjs";
import { Header } from "~/app/_components/organisms/Header";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <SignIn />
    </main>
  );
}
