// returned value examples:
// "-$3 000,67"
// "$5 204,25"

export const formatAmount = (value) => {
  const formatted = value
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    .replaceAll(",", " ")
    .replaceAll(".", ",");

  return value < 0 ? formatted : `+${formatted}`;
};
