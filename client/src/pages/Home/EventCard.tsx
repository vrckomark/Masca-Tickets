import React, { useContext, useEffect, useState } from "react";
import { Address } from "viem";
import { CircularProgress } from "@mui/material";
import { EventType } from "../../types/Event";
import TextBox from "../../components/TextBox";
import { FaLocationDot } from "react-icons/fa6";
import { ModalContext } from "../../contexts/ModalContextProvider";
import BuyTicketModal from "../../components/ui/BuyTicketModal";

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
  const { openModal } = useContext(ModalContext);

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
      headers.append(
        "x-api-key",
        "NjEwOWNiMjQtOWZiNS00MDlmLWE2MmQtYzc2MWY4ZGVkMjFm"
      );

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

  useEffect(() => {
    if (!pin || !qrLocation) return;
    openModal(<BuyTicketModal pin={pin} qrLocation={qrLocation} />);
  }, [qrLocation, pin]);

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
        <div className="flex ml-4 py-2 px-4 gap-4 items-center bg-secondary bg-opacity-25 w-max rounded-lg">
          <div className="text-secondary">
            <FaLocationDot />
          </div>
          <p className="font-medium">{event.location}</p>
        </div>
      )}
      {event.date && (
        <div className="flex gap-4 font-semibold">
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
        className="text-lg bg-secondary bg-opacity-20 rounded-lg p-4"
      >
        {event.description}
      </pre>
      <button
        onClick={handleBuyTicket}
        className="bg-primary hover:bg-opacity-90 text-white py-4 rounded-lg button-hover disabled:bg-white disabled:bg-opacity-50 font-semibold transition-all"
        disabled={!walletData || isLoading}
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
