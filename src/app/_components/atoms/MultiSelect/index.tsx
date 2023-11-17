"use client";

import { useState, useEffect, useRef } from "react";

type MultiSelectDropdownProps = {
  formFieldName: string;
  options: string[];
  prompt: string;
  selectedOptions: string[];
  setSelectedOptions: (selectedOptions: string[]) => void;
};

export default function MultiSelectDropdown({
  formFieldName,
  options,
  prompt = "Select one or more options",
  selectedOptions,
  setSelectedOptions,
}: MultiSelectDropdownProps) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  //   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const optionsListRef = useRef(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const handleChange = (e: any) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e: any) => {
    e.preventDefault();

    const optionsInputs = (optionsListRef?.current as any).querySelectorAll(
      "input",
    );
    optionsInputs.forEach((input: any) => {
      input.checked = true;
    });

    setSelectedOptions([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e: any) => {
    e.preventDefault();

    const optionsInputs = (optionsListRef.current as any)?.querySelectorAll(
      "input",
    );
    optionsInputs.forEach((input: any) => {
      input.checked = false;
    });

    setSelectedOptions([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="peer hidden" />

      <div className="inline-flex cursor-pointer rounded border px-5 py-2 after:ml-1 after:inline-flex after:items-center after:text-xs after:transition-transform after:content-['▼'] peer-checked:after:-rotate-180">
        {prompt}
        {isJsEnabled && selectedOptions.length > 0 && (
          <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
        )}
      </div>

      <div className="pointer-events-none absolute max-h-60 w-full overflow-y-scroll border bg-white opacity-0 transition-opacity peer-checked:pointer-events-auto peer-checked:opacity-100">
        {isJsEnabled && (
          <ul>
            <li>
              <button
                onClick={handleSelectAllClick}
                disabled={!isSelectAllEnabled}
                className="w-full px-2 py-1 text-left text-blue-600 disabled:opacity-50"
              >
                {"Select All"}
              </button>
            </li>
            <li>
              <button
                onClick={handleClearSelectionClick}
                disabled={!isClearSelectionEnabled}
                className="w-full px-2 py-1 text-left text-blue-600 disabled:opacity-50"
              >
                {"Clear selection"}
              </button>
            </li>
          </ul>
        )}
        <ul ref={optionsListRef}>
          {options.map((option: string, i: number) => {
            return (
              <li key={option}>
                <label
                  className={`flex cursor-pointer whitespace-nowrap px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                >
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}
