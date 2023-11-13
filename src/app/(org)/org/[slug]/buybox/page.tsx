import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { Fragment, Suspense } from "react";
import { ControlPanel } from "~/app/_components/organisms/ControlPanel";
import Table from "~/app/_components/organisms/Table/v1";
import { api } from "~/trpc/server";

export default async function Org({ params }: any) {
  const userProfile = await api.user.getCurrent.query({ getProperties: true });
  const { orgSlug } = auth();
  const org = await api.org.getBySlug.query({ slug: params.slug || "" });

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
        <div className="grid w-full max-w-[1384px] grid-cols-12 justify-between gap-[16px] px-[20px] py-[32px] md:gap-[24px] md:p-[48px]">
          <div className="relative col-span-12">
            <Table />
          </div>
          {/* <Suspense fallback={<p>Loading feed...</p>}>
            <div className="col-span-12">
              <h1 className="text-6xl font-bold capitalize">
                {org.payload.name}
              </h1>
            </div>
            <div className="col-span-12"></div>
            <Link
              href="#"
              className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl sm:col-span-6 lg:col-span-4"
            >
              <h3 className="w-full text-xl font-black">Build a Buy Box ✏️</h3>
              <Image
                alt="hiker"
                className="w-full"
                height={400}
                width={150}
                src="/biz.svg"
              />
            </Link>
            <Link
              href="#"
              className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl sm:col-span-6 lg:col-span-4"
            >
              <h3 className="w-full text-xl font-black">
                Find Opportunities 🔬
              </h3>
              <Image
                alt="hiker2"
                className="w-full"
                height={400}
                width={150}
                src="/biz2.svg"
              />
            </Link>
            <Link
              href="#"
              className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl sm:col-span-6 lg:col-span-4"
            >
              {" "}
              <h3 className="w-full text-xl font-black">Make Investments 📈</h3>
              <Image
                alt="hiker3"
                className="!mt-[-30px] w-full"
                height={400}
                width={150}
                src="/biz3.svg"
              />
            </Link>
          </Suspense> */}
        </div>
      </div>
    </main>
  );
}

//   Client Side Org Hooks
//   const {
//     isLoaded,
//     organization,
//     membership,
//     invitations,
//     memberships,
//     membershipRequests,
//     domains,
//   } = useOrganization();

//   //USE ORGANIZATION
//   console.log("isLoaded: ", isLoaded);
//   console.log("organization: ", organization);
//   console.log("membership: ", membership);
//   console.log("invitations: ", invitations);
//   console.log("memberships: ", memberships);
//   console.log("membershipRequests: ", membershipRequests);
//   console.log("domains: ", domains);
