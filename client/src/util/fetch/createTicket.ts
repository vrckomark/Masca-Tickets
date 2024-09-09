import { Address } from "viem";

export const createTicket = async (
  eventId: string,
  wallet: Address,
  alias: Address,
  did: string
) => {
  try {
    const res = await fetch("http://localhost:3000/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        alias,
        wallet,
        did,
      }),
    });

    const data = await res.json();

    return {
      status: res.status,
      message: data.message || res.statusText,
      isError: !res.ok,
      verifiableCredential: data.verifiableCredential || null,
    };
  } catch (err) {
    console.log(err);
    return { status: 400, message: err as string, isError: true, verifiableCredential: null };
  }
};