import React, { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="shadow-dream relative grid w-[80%] grid-cols-12 gap-[10px] rounded-[24px] border-[2px] border-slate-200 p-12 md:w-[600px]"
    >
      {children}
    </form>
  );
};
