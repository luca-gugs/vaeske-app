import React, { ReactNode } from "react";
import * as TooltipRadix from "@radix-ui/react-tooltip";
import { PlusIcon } from "@radix-ui/react-icons";

export type TooltipProps = {
  children: ReactNode;
  text: string;
  position: string;
};

const Tooltip = ({ children, text, position }: TooltipProps) => {
  return (
    <div className="z-90">
      <div className="">
        <div className="group relative inline-block">
          {/* <button className="bg-primary inline-flex rounded px-[18px] py-2 text-base font-semibold text-white"> */}
          {children}
          {/* </button> */}
          <div
            className={` ${
              (position === "right" &&
                `border-light text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded border bg-white px-4 py-[6px] text-sm font-semibold opacity-0 group-hover:opacity-100`) ||
              (position === "top" &&
                `border-light text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded border bg-white px-4 py-[6px] text-sm font-semibold opacity-0 group-hover:opacity-100`) ||
              (position === "left" &&
                `border-light text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2 whitespace-nowrap rounded border bg-white px-4 py-[6px] text-sm font-semibold opacity-0 group-hover:opacity-100`) ||
              (position === "bottom" &&
                `border-light text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded border bg-white px-4 py-[6px] text-sm font-semibold opacity-0 group-hover:opacity-100`)
            }`}
          >
            <span
              className={` ${
                (position === "right" &&
                  `border-light dark:border-dark-3 dark:bg-dark absolute -left-1 top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-r-sm border-b border-l bg-white`) ||
                (position === "top" &&
                  `border-light dark:border-dark-3 dark:bg-dark absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-l-sm border-b border-r bg-white`) ||
                (position === "left" &&
                  `border-light dark:border-dark-3 dark:bg-dark absolute -right-1 top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm border-r border-t bg-white`) ||
                (position === "bottom" &&
                  `border-light dark:border-dark-3 dark:bg-dark absolute -top-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm border-l border-t bg-white`)
              } `}
            ></span>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tooltip;
