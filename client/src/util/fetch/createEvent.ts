export const createEvent = async (
  eventName: string,
  description: string,
  dateTime: Date,
  location: string,
  totalTickets: number,
  vendorId: string
) => {
  try {
    const res = await fetch("http://localhost:3000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName,
        description,
        dateTime,
        location,
        availableTickets: totalTickets,
        vendorId,
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
