export const addCommas = (
  number: number,
  showDecimals: boolean = true,
): string | undefined => {
  if (typeof number !== "number") {
    return number;
  }
  // Convert the number to a string
  const numberString = number?.toString();

  // Split the string into integer and decimal parts (if any)
  const parts = numberString.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Add commas to the integer part
  const integerWithCommas = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer part and decimal part (if any)
  if (showDecimals && decimalPart.length > 0) {
    return integerWithCommas + "." + decimalPart;
  } else {
    return integerWithCommas;
  }
};
