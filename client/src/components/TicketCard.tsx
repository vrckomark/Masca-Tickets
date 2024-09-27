import React, { useState } from "react";
import ScanTicketModal from "../components/ScanTicketModal";
import { TicketType } from "../types/Ticket";
import TextBox from "./TextBox";
import { FaLocationDot } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";

interface TicketCardProps {
  ticket: TicketType;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const event = ticket.event;

  return (
    <div className="flex flex-col py-8 px-6 gap-6 rounded-lg bg-white bg-opacity-5 w-max">
      <h2 className="text-2xl text-sky-400 font-semibold">{event.name}</h2>

      {event.location && (
        <div className="flex p-2 gap-4 items-center">
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
        onClick={openModal}
        className="bg-sky-500 hover:bg-sky-400  text-white py-4 rounded-lg button-hover disabled:bg-white disabled:bg-opacity-50  flex items-center gap-4 justify-center"
        value={event.id}
        disabled={ticket.isUsed}
        name="eventId"
      >
        <IoQrCode />
        <p className="font-semibold">
          {ticket.isUsed ? "Ticket Scanned" : "Scan Ticket"}
        </p>
      </button>

      {isModalOpen && (
        <ScanTicketModal
          event={event.name}
          eventID={event.id}
          closeModal={closeModal}
          ticketID={ticket.ticketId}
        />
      )}
    </div>
  );
};

export default TicketCard;
