import { CreateOrganization } from "@clerk/nextjs";
import { Header } from "~/app/_components/Header";

export default function CreateOrganizationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <CreateOrganization />
    </main>
  );
}
