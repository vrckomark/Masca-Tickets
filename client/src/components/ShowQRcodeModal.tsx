import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { io } from 'socket.io-client'; // Import Socket.io client

interface TicketModalProps {
  event: string;
  eventID: string;
  closeModal: () => void;
}

const ShowQRcodeModal: React.FC<TicketModalProps> = ({ event, eventID, closeModal }) => {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit('joinEventRoom', "1234");

    newSocket.on('ticketValidated', (data: any) => {
      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message);
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }

      // Clear message after 2.5 seconds
      setTimeout(() => {
        setMessage(null);
        setIsSuccess(null);
      }, 2500);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [eventID]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div className="p-8 bg-slate-600 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Showing QRCode for {event}</h2>

        {message ? (
          <div className={`font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        ) : (
          <QRCode value={JSON.stringify({eventID})} />
        )}

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
