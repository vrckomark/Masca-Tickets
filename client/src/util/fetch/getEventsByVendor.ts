import { Address } from "viem";

export const getEventsByVendor = async (wallet: Address) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getEventsByVendor/${wallet}`);
    const data = await response.json();

    return data.map((event: any) => ({
      ...event,
      date: new Date(event.dateTime),
    }));
  } catch (err) {
    console.error(err);
  }
};
