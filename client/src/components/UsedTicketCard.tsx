import React from "react";
import { TicketType } from "../types/Ticket";

interface TicketCardProps {
  ticket: TicketType;
}

const UsedTicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="flex gap-4 bg-white bg-opacity-10 rounded-lg p-6 w-max my-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl text-sky-400 mb-4">
          {ticket.type}
        </h2>

        <div className="flex gap-4 items-center">
          <p className="w-1/5">ID</p>
          <div className="p-2 tracking-wide rounded-lg bg-white bg-opacity-5">
            {ticket.id}
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
      </div>
      <div className="p-4 bg-white rounded-lg text-black flex items-center">
        <p>Used QR code</p>
      </div>
    </div>
  );
};

export default UsedTicketCard;
