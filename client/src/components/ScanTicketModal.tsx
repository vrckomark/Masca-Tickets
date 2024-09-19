import React from "react";

interface TicketModalProps {
  event: string;
  closeModal: () => void;
}

const ScanTicketModal: React.FC<TicketModalProps> = ({ event, closeModal }) => {

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleClickOutside}>
      <div className="p-8 bg-slate-600 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Scan Ticket for Event</h2>
        <p className="text-lg mb-4">{event}</p>

        {/* This is where you can integrate the scanner */}
        <div className="h-48 bg-gray-200 rounded-lg mb-4 flex justify-center items-center">
          <p>Scanner Component Placeholder</p>
        </div>

        <button
          className="bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600"
          onClick={closeModal} // Close the modal when the button is clicked
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScanTicketModal;
