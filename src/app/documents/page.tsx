import { redirect } from "next/navigation";
import { Fragment, Suspense } from "react";
import { api } from "~/trpc/server";
import { ControlPanel } from "../_components/organisms/ControlPanel";

export default async function Documents() {
  const userProfile = await api.user.getCurrent.query({ getProperties: true });

  if (!userProfile?.payload?.user?.id) {
    redirect("/onboard");
  }

  return (
    <main className="relative min-h-screen bg-zinc-50">
      <ControlPanel />
      <div className="flex h-fit min-h-screen grow flex-col items-center md:ml-[105px]">
        <div className="grid w-full max-w-[1384px] grid-cols-12 justify-between gap-[16px] px-[20px] py-[32px] md:gap-[24px] md:p-[48px]">
          <Suspense fallback={<p>Loading feed...</p>}>
            <div className="col-span-12">
              <h1 className="text-6xl font-bold">Documents Root Page</h1>
              <p>
                A page where users can upload documents and see their statuses
              </p>
            </div>
            <div className="col-span-12 space-y-2">
              <h1 className="text-xl">Properties Array</h1>
              {/* {userProfile?.properties?.map((property) => {
                return (
                  <Fragment key={property.id}>
                    <div className="space-between flex">
                      <span>Addr:</span>
                      <span>
                        {property?.streetAddress}, {property?.city},{" "}
                        {property?.state}, {property?.zip}
                      </span>
                    </div>
                    <div className="space-between flex">
                      <span>EHV:</span>
                      <span>{property?.ehv}</span>
                    </div>
                    <div className="space-between flex">
                      <span>MB:</span>
                      <span>{property?.mb}</span>
                    </div>
                    <div className="space-between flex">
                      <span>LTV:</span>
                      <span>{property?.ltv}</span>
                    </div>
                    <div className="space-between flex">
                      <span>Liens:</span>
                      <span>{property?.liens}</span>
                    </div>
                  </Fragment>
                );
              })} */}
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
