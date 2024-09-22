import React, { useState } from "react";
import ScanTicketModal from "../components/ScanTicketModal";
import { TicketType } from "../types/Ticket";

interface TicketCardProps {
  ticket: TicketType;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-start gap-4 bg-white bg-opacity-10 rounded-lg p-6 w-max my-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl text-sky-400 mb-4">
          {ticket.type}
        </h2>

        <div className="flex gap-4 items-center">
          <p className="w-1/5">ID</p>
          <div className="p-2 tracking-wide rounded-lg bg-white bg-opacity-5">
            {ticket.ticketID}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-1/5">Date</p>
          <div className="p-2 rounded-lg bg-white bg-opacity-5">
            {new Date(ticket.eventDate).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-1/5">Location</p>
          <div className="p-2 rounded-lg bg-white bg-opacity-5">
            {ticket.eventLocation}
          </div>
        </div>
        <div>
          <button
            className="bg-sky-400 text-white rounded-lg p-2 w-full hover:shadow-lg hover:bg-sky-500"
            onClick={openModal}
          >
            Scan Ticket
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ScanTicketModal
          event={ticket.type}
          eventID={ticket.eventID}
          closeModal={closeModal}
          ticketID={ticket.ticketID}
        />
      )}
    </div>
  );
};

export default TicketCard;
