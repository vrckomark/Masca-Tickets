import React, { useState } from "react";
import ScanTicketModal from "../components/ScanTicketModal";

interface TicketCardProps {
  vc: any;
}

const TicketCard: React.FC<TicketCardProps> = ({ vc }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { credential } = vc;
  const { credentialSubject, type } = credential;

  const ticketInfo = {
    event: type?.[1] || "Unknown Event",
    id: credentialSubject?.ticketID || "Unknown ID",
    date: credentialSubject?.eventDate || "Unknown Date",
    location: credentialSubject?.eventLocation || "Unknown Location",
    eventID: credentialSubject?.eventID || "Unknown Event ID",
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-start gap-4 bg-white bg-opacity-10 rounded-lg p-6 w-max my-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl text-sky-400 mb-4">{ticketInfo.event}</h2>

        <div className="flex gap-4 items-center">
          <p className="w-1/5">ID</p>
          <div className="p-2 tracking-wide rounded-lg bg-white bg-opacity-5">
            {ticketInfo.id}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-1/5">Date</p>
          <div className="p-2 rounded-lg bg-white bg-opacity-5">
            {new Date(ticketInfo.date).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-1/5">Location</p>
          <div className="p-2 rounded-lg bg-white bg-opacity-5">
            {ticketInfo.location}
          </div>
        </div>
        <div>
          <button 
            className="bg-sky-400 text-white rounded-lg p-2 w-full hover:shadow-lg hover:bg-sky-500"
            onClick={openModal}
          >
            Scann Ticket
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ScanTicketModal 
          event={ticketInfo.event}
          eventID={ticketInfo.eventID}
          closeModal={closeModal}
          ticketID={ticketInfo.id}
        />
      )}
    </div>
  );
};

export default TicketCard;
