import React from "react";
import QRCode from "react-qr-code";

interface TicketModalProps {
  event: string;
  eventID: string;
  closeModal: () => void;
}

const ShowQRcodeModal: React.FC<TicketModalProps> = ({ event, eventID, closeModal }) => {

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleClickOutside}>
      <div className="p-8 bg-slate-600 rounded-lg">

        <h2 className="text-2xl font-bold mb-4">Showing QRCode for {event}</h2>

        <QRCode value={JSON.stringify(eventID)} />

        <button
          className="bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowQRcodeModal;
