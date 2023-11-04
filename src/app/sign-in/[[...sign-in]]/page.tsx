import { SignIn } from "@clerk/nextjs";
import NavigationMenuDemo from "~/app/_components/TopNav";
import TopNav from "~/app/_components/TopNav";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      {" "}
      <SignIn />
    </main>
  );
}
