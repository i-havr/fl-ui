export const calculateBalanceChange = (balanceLastPeriod, balance) => {
  if (balanceLastPeriod === 0) {
    return balance > 0 ? 100 : balance < 0 ? -100 : 0;
  }

  const change = ((balance - balanceLastPeriod) / balanceLastPeriod) * 100;
  return change.toFixed(2);
};
