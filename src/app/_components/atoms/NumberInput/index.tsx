import React, { ChangeEvent } from "react";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const formattedValue = new Intl.NumberFormat().format(parseFloat(value));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //TODO FIX
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
    const inputValue = (e.target as any).value.replace(/,/g, ""); // Remove existing commas
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    onChange(inputValue);
  };

  return (
    <input
      className={className}
      type="text"
      value={formattedValue}
      onChange={handleInputChange}
    />
  );
};

export default NumberInput;
