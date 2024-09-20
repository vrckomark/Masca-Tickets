export const verifyTicket = async (credential: object) => {
  try {
    const res = await fetch("http://localhost:3000/api/verify-credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
    });

    const data = await res.json();

    return {
      status: res.status,
      message: data.message || res.statusText,
      isError: !res.ok,
      result: data.result || null,
    };
  } catch (err) {
    console.log("Error in verifyTicket:", err);
    return false;
  }
};
