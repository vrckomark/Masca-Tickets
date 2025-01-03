import { EventType } from "../../../types/Event";
import EventCard from "../EventCard";
import { useVendorEvents } from "../hooks/useVendorEvents";

const Vendor = () => {
  const { events } = useVendorEvents();

  return (
    <div className="p-8 text-xl flex flex-col gap-12">
      <div className="flex flex-wrap gap-8">
        {events.length ? (
          events
            .filter((event) => new Date(event.date) > new Date())
            .map((event: EventType, index: number) => (
              <EventCard event={event} key={index} />
            ))
        ) : (
          <h2>You haven't created any events yet.</h2>
        )}
      </div>
      {events.length &&
      events.filter((event) => new Date(event.date) < new Date()).length ? (
        <>
          <h1 className="text-3xl font-bold px-4">Past Events</h1>
          <div className="flex flex-wrap gap-8">
            {events
              .filter((event) => new Date(event.date) < new Date())
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
