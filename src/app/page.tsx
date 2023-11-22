import { redirect } from "next/navigation";
import { Fragment, Suspense } from "react";
import { api } from "~/trpc/server";
import { ControlPanel } from "./_components/organisms/ControlPanel";
import { motion } from "framer-motion";
import { ClientComponent } from "./_components/atoms/ExampleClientComp";
import Image from "next/image";
import Link from "next/link";
import { PropertyCards } from "./_components/atoms/PropertyCard";
export default async function Dashboard() {
  const userProfile = await api.user.getCurrent.query({ getProperties: true });

  if (!userProfile.isSuccess || !userProfile?.payload) {
    redirect("/onboard");
  }
  const { user, properties } = userProfile.payload;

  const boxShadowVariants = {
    initial: {
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    animate: {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <main className="relative min-h-screen bg-zinc-50">
      <ControlPanel />
      <div className="flex h-fit min-h-screen grow flex-col items-center md:ml-[105px]">
        <div className="grid w-full max-w-[1384px] grid-cols-12 justify-between gap-[16px] px-[20px] py-[32px] md:gap-[32px] md:p-[48px]">
          <Suspense fallback={<p>Loading feed...</p>}>
            <div className="col-span-12">
              <h1 className="text-6xl font-bold">Hey {user.first} 👋</h1>
            </div>

            <div className="col-span-12 flex flex-col items-center space-y-4 md:flex-row md:space-x-10 md:space-y-0">
              <h2 className="text-2xl font-medium">Your Properties:</h2>
            </div>
            <PropertyCards properties={properties} />
            <Link
              href="#"
              className="col-span-6 flex flex-col items-center justify-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl lg:col-span-4"
            >
              <h3 className="text-center text-2xl font-medium">Add Another</h3>
              <h3 className="text-5xl">🏠</h3>
            </Link>

            <div className="col-span-12">
              <h2 className="text-2xl font-medium">Whats Next:</h2>
            </div>
            <div className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl sm:col-span-6 lg:col-span-4">
              <h3 className="w-full text-xl font-black">1. Receive Offers</h3>
              <Image
                alt="hiker"
                className="w-full"
                height={400}
                width={150}
                src="/hiker.svg"
              />
            </div>
            <div className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl sm:col-span-6 lg:col-span-4">
              <h3 className="w-full text-xl font-black">2. Evaluate Options</h3>
              <Image alt="hiker2" height={400} width={150} src="/hiker2.svg" />
            </div>
            <div className="col-span-12 flex max-h-[340px] flex-col items-center space-y-2 overflow-hidden rounded-xl border-[1px] border-slate-300 bg-white p-4 transition-all hover:scale-105 hover:shadow-xl lg:col-span-4">
              <h3 className="w-full text-xl font-black">3. Cash Out</h3>
              <Image
                alt="hiker3"
                className="w-[55%]"
                height={400}
                width={150}
                src="/hiker3.svg"
              />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
