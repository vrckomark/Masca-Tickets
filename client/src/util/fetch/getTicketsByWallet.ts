import { Address } from "viem";

export const getTicketsByWallet = async (wallet: Address) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getTicketsByWallet/${wallet}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    return data.map((ticket: any) => ({
      ticketId: ticket.id,
      wallet: ticket.wallet,
      isUsed: ticket.isUsed,
      event: {
        id: ticket.event.id,
        name: ticket.event.name,
        description: ticket.event.description,
        dateTime: ticket.event.dateTime,
        location: ticket.event.location,
        availableTickets: ticket.event.availableTickets,
      },
    }));
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
};
