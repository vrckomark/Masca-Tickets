import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EventType } from "../../types/Event";
import { getEventsByVendor } from "../../util/fetch/getEventsByVendor";
import EventCard from "./EventCard";

const Vendor = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!address) return;
      const data = await getEventsByVendor(address);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-8 text-xl flex flex-col gap-12">
      <h1 className="text-3xl font-medium px-4">Your Events</h1>
      <div className="flex flex-wrap gap-8">
        {events.length ? (
          events
            .filter((event) => event.date > new Date())
            .map((event: EventType, index: number) => (
              <EventCard event={event} key={index} />
            ))
        ) : (
          <h2>You haven't created any events yet.</h2>
        )}
      </div>
      {events.length &&
      events.filter((event) => event.date < new Date()).length ? (
        <>
          <h1 className="text-3xl font-medium px-4">Past Events</h1>
          <div className="flex flex-wrap gap-8">
            {events
              .filter((event) => event.date < new Date())
              .map((event: EventType, index: number) => (
                <EventCard event={event} key={index} />
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Vendor;
