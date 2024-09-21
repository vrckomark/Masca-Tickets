import { EventReturnType, EventType } from "../../types/Event";

export const getEvents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    return data.map((event: EventReturnType) => {
      const { dateTime, ...rest } = event;
      return {
        ...rest,
        date: new Date(dateTime),
      };
    }) as EventType[];
  } catch (err) {
    console.error(err);
  }
};
