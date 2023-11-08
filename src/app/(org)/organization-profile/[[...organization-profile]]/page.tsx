import { OrganizationProfile } from "@clerk/nextjs";
import { Header } from "~/app/_components/organisms/Header";

export default function OrganizationProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Header />
      <OrganizationProfile routing="path" path="/organization-profile" />
    </main>
  );
}
