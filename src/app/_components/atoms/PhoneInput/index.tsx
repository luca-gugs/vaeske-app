import React, { ChangeEvent } from "react";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  className,
  id,
}) => {
  const formatPhoneNumber = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Implement your phone number formatting logic here
    const formattedValue =
      numericValue.length > 3
        ? `${numericValue.slice(0, 3)}-${numericValue.slice(
            3,
            6,
          )}-${numericValue.slice(6, 10)}`
        : numericValue;

    return formattedValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
    const inputValue = (e.target as any).value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
    const formattedValue = formatPhoneNumber(inputValue);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
    onChange(formattedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to ensure hyphens are removed
    if (e.key === "Backspace") {
      const inputValue = value.replace(/[^0-9]/g, "");
      const formattedValue =
        inputValue.length > 1
          ? `${inputValue.slice(0, -1).slice(0, 3)}-${inputValue
              .slice(0, -1)
              .slice(3, 6)}-${inputValue.slice(0, -1).slice(6, 10)}`
          : inputValue;

      onChange(formattedValue);
    }
  };

  return (
    <input
      id={id}
      className={className}
      type="text"
      value={formatPhoneNumber(value)}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="123-456-7890"
    />
  );
};

export default PhoneNumberInput;
