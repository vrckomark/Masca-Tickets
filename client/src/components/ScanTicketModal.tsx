import React from "react";
import QrReader from "../components/qrcode/QrReader";

interface TicketModalProps {
  event: string;
  eventID: string;
  ticketID: string;
  closeModal: () => void;
}

const ScanTicketModal: React.FC<TicketModalProps> = ({ event, eventID, closeModal, ticketID }) => {

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleClickOutside}>
      <div className="p-8 bg-sky-600 rounded-lg">

        <h2 className="text-2xl font-bold mb-4">You are scanning ticket for <span className="text-rose-400 underline decoration-sky-500">{event}</span></h2>

        <QrReader 
            eventID={eventID}
            ticketID={ticketID}
            closeModal={closeModal}
        />

        <button
          className="bg-red-500 text-white p-4 rounded-lg w-full hover:bg-red-600 mt-6 font-bold"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScanTicketModal;
