import React, { useState } from "react";
import { Address } from "viem";
import { MascaApi } from "@blockchain-lab-um/masca-types";
import { CircularProgress } from "@mui/material";
import { EventType } from "../../types/Event";
import TextBox from "../../components/TextBox";
import { FaLocationDot } from "react-icons/fa6";

interface EventCardProps {
  event: EventType;
  buyTicket: (eventId: string, alias: Address) => void;
  walletData?: {
    address: Address;
    currentDID: string;
    mascaApi: MascaApi;
  };
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  buyTicket,
  walletData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyTicket = async () => {
    setIsLoading(true);
    try {
      await buyTicket(event.id, event.vendor.wallet);
    } catch (error) {
      console.error("Error buying ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-8 px-6 gap-6 rounded-lg bg-white bg-opacity-5 w-max">
      <h2 className="text-2xl text-sky-400 font-semibold">{event.name}</h2>

      <div className="flex items-center gap-4">
        <p>Tickets left </p>
        <TextBox
          label={`${event.availableTickets}`}
          customStyle="font-medium py-2 text-sky-400"
        />
      </div>
      {event.location && (
        <div className="flex ml-4 p-2 gap-4 items-center">
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
      <button
        onClick={handleBuyTicket}
        className="bg-sky-500 hover:bg-sky-400  text-white px-4 py-2 rounded-lg button-hover disabled:bg-white disabled:bg-opacity-50 font-medium"
        value={event.id}
        disabled={!walletData}
        name="eventId"
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Buy Ticket"
        )}
      </button>
    </div>
  );
};

export default EventCard;
