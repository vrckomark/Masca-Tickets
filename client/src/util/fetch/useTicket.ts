export const UseTicket = async ( ticketID: string ) => {
  try {
    const res = await fetch("http://localhost:3000/api/useTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketID }),
    });

    const data = await res.json();

    return {
      status: res.status,
      message: data.message || res.statusText,
      isError: !res.ok,
      result: data.result || null,
    };
  } catch (err) {
    console.log('Error in useTicket:', err);
    return { status: 400, message: `Error: ${err.message}`, isError: true, result: null };
  }
};