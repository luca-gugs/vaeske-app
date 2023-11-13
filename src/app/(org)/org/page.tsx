"use client";
import { auth, useOrganizationList } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { ControlPanel } from "~/app/_components/organisms/ControlPanel";
import { api } from "~/trpc/server";

export default function Org({ params }: any) {
  const router = useRouter();

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (userMemberships.data && userMemberships?.data?.length > 0) {
    userMemberships.data[0]?.organization.slug;
    router.push(`/org/${userMemberships.data[0]?.organization.slug}`);
  }

  return (
    <main className="relative min-h-screen bg-zinc-50">
      <ControlPanel />
      <div className="flex h-fit min-h-screen grow flex-col items-center md:ml-[105px]"></div>
    </main>
  );
}
