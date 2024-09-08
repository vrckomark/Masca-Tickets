import { Address } from "viem";

export const addVendor = async (
  companyName: string,
  walletAddress: Address
) => {
  try {
    const res = await fetch("http://localhost:3000/api/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        wallet: walletAddress,
        events: [],
      }),
    });

    const responseData = await res.json();

    if (res.ok && responseData.identifier && responseData.vendor) {
      return {
        status: res.status,
        message: "Vendor Successfully Created",
        isError: false,
      };
    }

    return {
      status: res.status,
      message: responseData?.error || res.statusText,
      isError: !res.ok,
    };
    
  } catch (err) {
    console.log(err);
    return { status: 400, message: err as string, isError: true };
  }
};
