import { EventReturnType, EventType } from "../../types/Event";

export const getEvent = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/event/${id}`);
    const data: EventReturnType = await response.json();

    const { dateTime, ...rest } = data;

    return {
      ...rest,
      date: dateTime || "",
    } as EventType;
  } catch (err) {
    console.error(err);
  }
};
