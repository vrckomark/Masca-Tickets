import React from "react";
import QRCode from "react-qr-code";
import { FaLocationDot } from "react-icons/fa6";
import TextBox from "../../components/TextBox";
import { EventType } from "../../types/Event";

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex gap-8 p-6 rounded-lg items-center bg-white bg-opacity-5 w-max">
      <div className="flex flex-col  gap-6 w-max">
        <div className="flex gap-6  flex-col">
          <h2 className="text-2xl text-sky-400 font-semibold">{event.name}</h2>
          <div className="flex items-center gap-4">
            <p>Tickets left </p>
            <TextBox
              label={`${event.availableTickets}`}
              customStyle="font-medium py-2 text-sky-400"
            />
          </div>
        </div>
        {event.location && (
          <div className="flex p-4 gap-4 items-center">
            <div className="text-sky-400">
              <FaLocationDot />
            </div>

            <p>{event.location}</p>
          </div>
        )}
        {event.date && (
          <div className="flex gap-4">
            <TextBox label={new Date(event.date).toDateString()} />
            <TextBox
              label={`${new Date(event.date).getHours()}:${
                new Date(event.date).getMinutes() == 0 ? "00" : new Date(event.date).getMinutes()
              }`}
            />
          </div>
        )}
        <pre
          style={{ fontFamily: "Inter Tight , system-ui" }}
          className="text-lg opacity-60 bg-white bg-opacity-5 rounded-lg p-4"
        >
          {event.description}
        </pre>
      </div>
      <div className="h-full w-2 rounded-xl bg-white bg-opacity-20" />
      {event.id && (
        <div className="p-6 h-max w-max bg-white rounded-lg flex ">
          <QRCode value={JSON.stringify(event.id)} />
        </div>
      )}
    </div>
  );
};

export default EventCard;
