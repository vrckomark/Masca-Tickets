export const getEvents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    return data.map((event: any) => ({
      ...event,
      date: new Date(event.dateTime),
    }));
  } catch (err) {
    console.error(err);
  }
};