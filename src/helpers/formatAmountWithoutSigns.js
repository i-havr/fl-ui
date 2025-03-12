// returned value examples:
// "3 000,67"
// "5 204,25"

export const formatAmountWithoutSigns = (value, min = 0, max = 2) => {
  return value
    .toLocaleString("en-US", {
      minimumFractionDigits: min,
      maximumFractionDigits: max
    })
    .replaceAll(",", " ")
    .replaceAll(".", ",");
};
