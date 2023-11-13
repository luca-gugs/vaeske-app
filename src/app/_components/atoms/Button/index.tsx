import React from "react";
import Link from "next/link";
export type ButtonLinkProps = {
  children?: React.ReactNode;
  className: string;
  onClick: () => void;
  secondary?: boolean;
};

export const Button = ({
  children,
  className,
  onClick,
  secondary = false,
}: ButtonLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-[1px] border-black px-4 py-2 text-center font-medium ${
        secondary ? "bg-white text-black" : "bg-black text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};
