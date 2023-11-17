"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import MultiSelect from "../MultiSelect";
import { stateCodes } from "~/app/_utils/scaffold";
import { or } from "drizzle-orm";
import MultiSelectDropdown from "../MultiSelect";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submit?: () => void;
  orgId: string;
};

export default function Modal({ open, orgId, setOpen, submit }: ModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const router = useRouter();

  const cancelButtonRef = useRef(null);
  type Inputs = {
    name: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const createBuyBox = api.buybox.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setOpen(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createBuyBox.mutate({
      orgId: orgId,
      name: data.name,
      disallowedStates:
        selectedOptions.length > 0 ? selectedOptions.join("%") : null,
    });
    // console.log("SELECTED OPTIONS: ", selectedOptions.join("%"));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="h-[500px] bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="w-full sm:flex sm:items-start">
                      <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create New Buy Box
                        </Dialog.Title>
                        <div className="mt-2 flex w-full flex-col space-y-2">
                          <input
                            placeholder="Buy Box Name"
                            className="w-full rounded-lg border border-black px-4 py-2 focus:border-green-500 focus:outline-none"
                            {...register("name", { required: true })}
                          />
                          {selectedOptions.length > 0 && (
                            <div className="flex rounded-md border-[1px] border-slate-200 p-1">
                              {selectedOptions.map((option) => {
                                return <div className="mr-1">{option}</div>;
                              })}
                            </div>
                          )}
                          <MultiSelectDropdown
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            formFieldName={"test"}
                            options={stateCodes}
                            prompt={"Disallowed States List"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
