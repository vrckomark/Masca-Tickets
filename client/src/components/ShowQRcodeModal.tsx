import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { io } from 'socket.io-client';
import SuccessAnimation from './ui/successAnimation';
import FailureAnimation from './ui/FailureAnimation';

interface TicketModalProps {
  event: string;
  eventID: string;
  closeModal: () => void;
}

const ShowQRcodeModal: React.FC<TicketModalProps> = ({ event, eventID, closeModal }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  function generateSocketRoom() {
    const length = 10;
    const generateSocketRoom = Math.random().toString(36).substring(2, 2 + length);
    setRoom(generateSocketRoom);
    return generateSocketRoom;
  }

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    const createAndJoinRoom = (room: string) => {
      setRoom(room);
      newSocket.emit("joinEventRoom", room);
      console.log(`Joined room: ${room}`);
    };

    const initialRoom = generateSocketRoom();
    createAndJoinRoom(initialRoom);

    newSocket.on('ticketValidated', (data: any) => {
      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message);
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }

      const newRoom = generateSocketRoom();
      createAndJoinRoom(newRoom);

      setTimeout(() => {
        setMessage(null);
        setIsSuccess(null);
      }, 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
      <div className="p-8 bg-sky-600 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Showing QRCode for {event}</h2>

        <div className="flex justify-center items-center p-4 mb-4">
          {message ? (
            <div className="flex flex-col items-center">
              {isSuccess ? <SuccessAnimation /> : <FailureAnimation />}
              <div className={`font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            </div>
          ) : (
            <QRCode value={JSON.stringify({ eventID, room })} />
          )}
        </div>

        <button
          className="bg-red-500 text-white p-3 rounded-lg w-full hover:bg-red-600 font-bold"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowQRcodeModal;
