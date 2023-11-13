import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
import { Fragment, Suspense } from "react";
import { ControlPanel } from "~/app/_components/organisms/ControlPanel";
import { OrgOnboardingForm } from "~/app/_components/organisms/OrgOnboardingForm";
import { ProgressBar } from "~/app/_components/organisms/OrgOnboardingForm/ProgressBar";
import { OrgOnboardingProvider } from "~/app/_components/organisms/OrgOnboardingForm/context";
import { api } from "~/trpc/server";

export default async function OrgOnboard({}: {}) {
  const user = await api.user.getCurrent.query({ getProperties: true });
  const { orgSlug } = auth();
  const org = await api.org.getBySlug.query({ slug: orgSlug || "" });

  if (!user?.payload?.user?.id) {
    redirect("/onboard");
  }
  if (org.isSuccess && org.payload?.slug) {
    redirect(`/org/${org.payload?.slug}`);
  }

  return (
    <main className="relative min-h-screen bg-zinc-50">
      <ControlPanel />
      <div className="flex h-fit min-h-screen grow flex-col items-center md:ml-[105px]">
        <div className="grid w-full max-w-[1384px] grid-cols-12 justify-between gap-[16px] px-[20px] py-[32px] md:gap-[24px] md:p-[48px]">
          <div className="col-span-12 mt-[80px] flex h-full flex-grow justify-center">
            <Suspense fallback={<p>Loading feed...</p>}>
              <OrgOnboardingProvider>
                <OrgOnboardingForm />
              </OrgOnboardingProvider>
            </Suspense>
          </div>
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
