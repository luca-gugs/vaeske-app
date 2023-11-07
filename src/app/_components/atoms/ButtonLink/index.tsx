import React from "react";
import Link from "next/link";
export type ButtonLinkProps = {
  children?: React.ReactNode;
  className: string;
  href: string;
  secondary?: boolean;
};

export const ButtonLink = ({
  children,
  className,
  href,
  secondary = false,
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`rounded-lg border-[1px] border-black px-4 py-2 text-center font-medium ${
        secondary ? "bg-white text-black" : "bg-black text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
};
