import { Address } from "viem";

export const addVendor = async (
  companyName: string,
  walletAddress: Address,
  did: string
) => {
  try {
    const res = await fetch("http://localhost:3000/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        wallet: walletAddress,
        did,
        events: [],
      }),
    });
    return {
      status: res.status,
      message: ((await res.json()).message as string) || res.statusText,
      isError: !res.ok,
    };
  } catch (err) {
    console.log(err);
    return { status: 400, message: err as string, isError: true };
  }
};
