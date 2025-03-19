// returned value examples:
// "-$3 000,67"
// "$5 204,25"

export const formatAmount = (value, min = 0, max = 2) => {
  const formatted = value
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: min,
      maximumFractionDigits: max
    })
    .replaceAll(",", " ")
    .replaceAll(".", ",");

  return value < 0 ? formatted : `+${formatted}`;
};
