import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import UserIcon from "~/components/atoms/UserIcon";
// import { AccountWidget } from "~/components/molecules/AccountWidget";
// import { useMediaQuery } from "~/utils/helpers";

type ControlPanelProps = {
  admin?: boolean;
  adminRole?: string | undefined;
  hideLinks?: boolean;
};

export const ControlPanel = ({
  admin = false,
  adminRole = undefined,
  hideLinks = false,
}: ControlPanelProps) => {
  //   const router = useRouter();
  //   const [tabletMenuOpen, setTabletMenuOpen] = useState<boolean>(false);

  const items = [
    {
      link: "/",
      nameDsk: "Pre-qualification",
      nameMbl: "Pre-Qualify",
      src: "/clipboard.svg",
      srcActive: "/clipboard.svg",
    },
    {
      link: "/process",
      nameDsk: "Next Steps",
      nameMbl: "Next Steps",
      src: "/clipboard.svg",
      srcActive: "/clipboard.svg",
    },
    // TODO Unhide
    {
      link: "/docs",
      nameDsk: "My Documents",
      nameMbl: "Docs",
      src: "/clipboard.svg",
      srcActive: "/clipboard.svg",
    },
    {
      link: "/account",
      nameDsk: "Account",
      nameMbl: "Account",
      src: "/clipboard.svg",
      srcActive: "/clipboard.svg",
    },
  ];

  //   const isMobile = useMediaQuery(767);

  return (
    <>
      <div className="border-greyWhite5 fixed bottom-0 z-20 flex w-full flex-col justify-between rounded-t-[16px] border-l-[1px] border-r-[1px] border-t-[1px] bg-white px-[20px] py-[8px] md:h-screen md:w-fit md:rounded-none md:border-l-0 md:border-t-0  md:px-[24px] md:pb-[24px] md:pt-[48px]">
        {/* Tablet View */}
        <div
          className="flex w-[56px] flex-col items-center
            transition-all"
        >
          {/* <UserIcon admin={admin} /> */}

          {/* <button
            // onClick={() => setTabletMenuOpen(!tabletMenuOpen)}
            className="mt-[20px]"
          >
            <Image
              className={`transition-all ${
                tabletMenuOpen ? "rotate-180" : ""
              } pointer-events-none`}
              src="/controlPanelIcons/doubleRight.svg"
              width={24}
              height={24}
              alt={""}
            />
          </button> */}
          <hr className="bg-greyWhite5 my-[32px] w-full" />
          {items.map((item) => {
            // const isActive = item.link === router.pathname;
            const isActive = false;

            if (item.link !== "/account") {
              return (
                <Link
                  id={`controlPanelLinkTo${item.nameDsk}`}
                  key={item.link}
                  href={item.link}
                  className={`flex min-h-[58px] w-full items-center overflow-hidden rounded-[20px] p-[16px] text-lg font-semibold ${
                    isActive ? "bg-snowBlue text-outerSpace" : "text-darkGrey2"
                  }`}
                >
                  <Image
                    src={isActive ? item.srcActive : item.src}
                    width={24}
                    height={24}
                    alt={""}
                  />
                  {/* <span
                    className={`h6	ml-[16px] whitespace-nowrap ${
                      !tabletMenuOpen ? "hidden" : ""
                    }`}
                  >
                    {item.nameDsk}
                  </span> */}
                </Link>
              );
            }
          })}
        </div>
      </div>

      {/* Tablet Menu Background */}
      {/* {tabletMenuOpen && (
        <div
          id="openTabletMenuButtonZelda"
          onClick={() => setTabletMenuOpen(false)}
          className="absolute z-10 hidden h-screen w-full bg-black opacity-20 transition-all md:flex lg:hidden"
        />
      )} */}
    </>
  );
};
