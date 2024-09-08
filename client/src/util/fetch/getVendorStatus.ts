import { Address } from "viem";

export const getVendorStatus = async (wallet: Address) => {
  const response = await fetch(`http://localhost:3000/api/vendor/${wallet}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const vendorStatus = await response.json();
  return vendorStatus;
};
