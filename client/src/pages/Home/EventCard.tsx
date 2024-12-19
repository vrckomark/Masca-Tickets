import React, { useState } from "react";
import { Address } from "viem";
import { CircularProgress } from "@mui/material";
import { EventType } from "../../types/Event";
import TextBox from "../../components/TextBox";
import { FaLocationDot } from "react-icons/fa6";
import { QRCodeSVG } from "qrcode.react";

interface EventCardProps {
  event: EventType;
  walletData?: {
    address: Address;
    currentDID: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event, walletData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [qrLocation, setQrLocation] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  const handleBuyTicket = async () => {
    if (!walletData) return;
    setIsLoading(true);

    try {
      const payload = {
        credential_type: ["VerifiableCredential", "EventTicketCredential"],
        credential_subject: {
          eventId: event.id,
          eventName: event.name,
        },
      };

      console.log(payload);

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("x-api-key", "NjEwOWNiMjQtOWZiNS00MDlmLWE2MmQtYzc2MWY4ZGVkMjFm");

      const response = await fetch(
        "http://142.132.224.126:3001/oidc/create-credential-offer",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const decodedLocation = decodeURIComponent(data.location); 
        setQrLocation(decodedLocation);
        setPin(data.pin);
        console.log(decodedLocation);
      } else {
        throw new Error("Failed to fetch credential offer.");
      }
    } catch (error) {
      console.error("Error buying ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-8 px-6 gap-6 rounded-lg bg-white w-max text-black">
      <h2 className="text-2xl text-sky-400 font-semibold">{event.name}</h2>

      <div className="flex items-center gap-4">
        <p>Tickets left</p>
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
              new Date(event.date).getMinutes() === 0
                ? "00"
                : new Date(event.date).getMinutes()
            }`}
          />
        </div>
      )}
      <pre
        style={{ fontFamily: "Inter Tight, system-ui" }}
        className="text-lg opacity-60 bg-white bg-opacity-5 rounded-lg p-4"
      >
        {event.description}
      </pre>
      <button
        onClick={handleBuyTicket}
        className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg button-hover disabled:bg-white disabled:bg-opacity-50 font-medium"
        disabled={!walletData || isLoading}
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Buy Ticket"
        )}
      </button>
      {qrLocation && pin && (
        <div>
          <div className="flex flex-col items-center">
            <p className="text text-gray-500">Your pin: {pin}</p>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <p className="text text-gray-500">Scan this QR code:</p>
            <QRCodeSVG value={qrLocation} size={300} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;