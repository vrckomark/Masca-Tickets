import React from "react";

interface TicketCardProps {
  vc: any;
}

const UsedTicketCard: React.FC<TicketCardProps> = ({ vc }) => {

  const { credential } = vc;
  const { credentialSubject, type } = credential;

  const ticketInfo = {
    event: type?.[1] || "Unknown Event",
    id: credentialSubject?.ticketID || "Unknown ID",
    date: credentialSubject?.eventDate || "Unknown Date",
    location: credentialSubject?.eventLocation || "Unknown Location",
  };

  return (
    <div className="flex gap-4 bg-white bg-opacity-10 rounded-lg p-6 w-max my-8">
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
      </div>
      <div className="p-4 bg-white rounded-lg text-black flex items-center">
        <p>Used qr code</p>
      </div>
    </div>
  );
};

export default UsedTicketCard;
