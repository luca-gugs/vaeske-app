"use client";
import { SignedIn, UserButton, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Tooltip from "../../atoms/Tooltip";

type ControlPanelProps = {
  admin?: boolean;
  adminRole?: string | undefined;
  hideLinks?: boolean;
};

export const ControlPanel = ({}: ControlPanelProps) => {
  const pathname = usePathname();
  const params = useParams();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // if (userMemberships.data && userMemberships?.data?.length > 0) {
  //   userMemberships.data[0]?.organization.slug;
  //   router.push(`/org/${userMemberships.data[0]?.organization.slug}`);
  // }
  let items = [
    {
      link: "/checklist",
      nameMbl: "Checklist",
      src: "/clipboard.svg",
    },
    {
      link: "/documents",
      nameMbl: "Documents",
      src: "/docs.svg",
    },
    {
      link: "/account",
      nameDsk: "Account",
      nameMbl: "Account",
      src: "/user.svg",
    },
  ];

  if (pathname.includes("org") && userMemberships?.data) {
    items = [
      {
        link: "/organization-profile",
        nameMbl: "Org Profile",
        src: "/orgprofile.svg",
      },
      {
        link: `/org/${userMemberships?.data[0]?.organization.slug}/buybox`,
        nameMbl: "Buy Boxes",
        src: "/table.svg",
      },
      {
        link: "/org/matches",
        nameMbl: "Matches",
        src: "/heart.svg",
      },
      {
        link: "/org/offers",
        nameMbl: "Offers",
        src: "/cash.svg",
      },
    ];
  }

  return (
    <>
      <div className="border-greyWhite5 fixed bottom-0 z-20 flex w-full flex-col justify-between rounded-t-[16px] border-l-[1px] border-r-[1px] border-t-[1px] bg-white px-[20px] py-[8px] md:h-screen md:w-fit md:rounded-none md:border-l-0 md:border-t-0  md:px-[24px] md:pb-[24px] md:pt-[48px]">
        {/* Tablet View */}
        <div className="hidden h-full w-[56px] flex-col items-center justify-between transition-all md:flex">
          <div>
            <Link className="text-2xl font-bold" href="/">
              v.01
            </Link>
            <hr className="bg-greyWhite5 my-[32px] w-full" />

            {items.map((item) => {
              const isActive = item.link === pathname;

              return (
                <Tooltip
                  key={item.nameMbl}
                  position="right"
                  text={item.nameMbl}
                >
                  <Link
                    id={`controlPanelLinkTo${item.nameDsk}`}
                    key={item.link}
                    href={item.link}
                    className={`flex min-h-[58px] w-full items-center overflow-hidden rounded-[20px] p-[16px] text-lg font-semibold ${
                      isActive ? "bg-slate-100" : ""
                    }`}
                  >
                    <Image src={item.src} width={24} height={24} alt={""} />
                  </Link>
                </Tooltip>
              );
            })}
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {/* Mobile View */}
        <div className="flex w-full items-center justify-around md:hidden">
          {items.map((item) => {
            const isActive = item.link === pathname;

            return (
              <Link
                key={`MobileLink-${item.nameMbl}`}
                id={`MobileLink-${item.nameMbl}`}
                href={item.link}
                className={`flex min-w-[67px] flex-col items-center space-y-[4px] py-[8px] ${
                  isActive ? "text-outerSpace" : "text-darkGrey2"
                }`}
              >
                {/* <TooltipRadix.Provider> */}
                {item.src && (
                  <Image
                    className="h-[20px]"
                    src={item.src}
                    width={24}
                    height={24}
                    alt={""}
                  />
                )}
                <span className="text-[12px]">{item.nameMbl}</span>
              </Link>
            );
          })}
          <Link className="text-2xl font-bold" href="/">
            v.01
          </Link>
        </div>
      </div>
    </>
  );
};
