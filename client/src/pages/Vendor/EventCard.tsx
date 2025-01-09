import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import TextBox from "../../components/TextBox";
import { EventType } from "../../types/Event";

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex flex-col py-8 shadow-xl shadow-[#c7c7c7] px-6 gap-6 rounded-lg bg-white w-max text-black">
      <h2 className="text-2xl text-primary font-semibold">{event.name}</h2>

      <div className="flex items-center gap-6">
        <p className="font-medium">Tickets left:</p>
        <p className="py-2 px-3 bg-black bg-opacity-5 font-semibold rounded-lg">
          {event.availableTickets}
        </p>
      </div>
      {event.location && (
        <div className="flex py-2 px-4 gap-4 items-center bg-secondary bg-opacity-25 w-max rounded-lg">
          <div className="text-secondary">
            <FaLocationDot />
          </div>
          <p className="font-medium">{event.location}</p>
        </div>
      )}
      {event.date && (
        <div className="flex w-full items-center justify-between font-semibold">
          <TextBox label={new Date(event.date).toDateString()} />
          <p className="bg-black bg-opacity-[0.07] px-2 py-1 rounded-lg">{`${new Date(
            event.date
          ).getHours()}:${
            new Date(event.date).getMinutes() === 0
              ? "00"
              : new Date(event.date).getMinutes()
          }`}</p>
        </div>
      )}
      <pre
        style={{ fontFamily: "Inter Tight, system-ui" }}
        className="text-lg font-medium bg-secondary bg-opacity-20 rounded-lg p-4"
      >
        {event.description}
      </pre>
    </div>
  );
};

export default EventCard;
