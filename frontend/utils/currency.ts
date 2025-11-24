export const convertEthToUsd = (ethAmount: number, ethToUsdRate: number | null): number | null => {
  if (ethToUsdRate === null) {
    return null;
  }
  return ethAmount * ethToUsdRate;
};

export const formatUsd = (usdAmount: number | null): string => {
  if (usdAmount === null) {
    return "N/A";
  }
  return `$${usdAmount.toFixed(2)}`;
};

export const formatEth = (ethAmount: number | null): string => {
  if (ethAmount === null) {
    return "N/A";
  }
  return `${ethAmount.toFixed(4)} ETH`;
};

export const truncateAddress = (address: string, chars = 4) => {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
};
