"use client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const navigation = [
  { name: "Team", href: "#" },
  { name: "White Paper", href: "#" },
  { name: "Roadmap", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { RoughNotation } from "react-rough-notation";
import Link from "next/link";

//Work In Progress Nav Based off component in tailwind ui.
export const Header = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <Disclosure
      as="nav"
      className="absolute top-0 z-50 w-full border-b-[1px] border-b-slate-100 bg-white"
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/home">
                    <h2 className="text-3xl font-normal tracking-[-2px]">
                      væske.
                    </h2>
                  </Link>
                </div>
                <div className="hidden items-center sm:ml-6 sm:flex">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => {
                      const linkIsCurrentPath = pathname === item.href;
                      const isHovered = hoveredLink === item.name;
                      return (
                        <div
                          key={item.name}
                          onMouseOver={() => setHoveredLink(item.name)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          <RoughNotation
                            type={linkIsCurrentPath ? "circle" : "underline"}
                            color={linkIsCurrentPath ? "red" : "black"}
                            show={linkIsCurrentPath || isHovered}
                            key={item.name}
                          >
                            <a
                              id={item.name}
                              key={item.name}
                              href={item.href}
                              className="rounded-md px-3 py-2 text-sm font-medium"
                            >
                              {item.name}
                            </a>
                          </RoughNotation>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton>
                        <button className="rounded-lg bg-black px-4 py-2 text-white">
                          Dashboard
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="z-20 sm:hidden">
            <div className="z-20 space-y-1 bg-white px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const linkIsCurrentPath = pathname === item.href;
                const isHovered = hoveredLink === item.href;
                return (
                  <div
                    key={item.href}
                    onMouseOver={() => setHoveredLink(item.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <RoughNotation
                      type={linkIsCurrentPath ? "circle" : "underline"}
                      color={linkIsCurrentPath ? "red" : "black"}
                      show={linkIsCurrentPath || isHovered}
                      key={item.name}
                    >
                      <a
                        id={item.name}
                        key={item.name}
                        href={item.href}
                        className="rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </a>
                    </RoughNotation>
                  </div>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
