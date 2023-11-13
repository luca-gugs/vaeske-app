import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { Fragment, Suspense, useState } from "react";
import Modal from "~/app/_components/atoms/Modals";
import { ControlPanel } from "~/app/_components/organisms/ControlPanel";
import Table from "~/app/_components/organisms/Table/v1";
import { api } from "~/trpc/server";

export default async function Org({ params }: any) {
  const userProfile = await api.user.getCurrent.query({ getProperties: true });
  const { orgSlug } = auth();
  const org = await api.org.getBySlug.query({
    slug: params.slug || "",
    getBuyBoxes: true,
  });
  console.log("ORG: ", org);
  if (!userProfile?.payload?.user?.id) {
    redirect("/onboard");
  }
  if (!org.isSuccess || !org.payload) {
    redirect("/org/onboard");
  }

  return (
    <main className="relative min-h-screen bg-zinc-50">
      <ControlPanel />
      <div className="flex h-fit min-h-screen grow flex-col items-center md:ml-[105px]">
        <div className="relative grid w-full max-w-[1384px] grid-cols-12 justify-between gap-[16px] px-[20px] py-[32px] md:gap-[24px] md:p-[48px]">
          <Suspense fallback={<p>Loading feed...</p>}>
            <Table />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
