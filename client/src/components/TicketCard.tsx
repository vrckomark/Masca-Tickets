import React from "react";
import QRCode from "react-qr-code";

interface TicketCardProps {
  vc: object;
}

const TicketCard: React.FC<TicketCardProps> = ({ vc }) => {
  const dummyTicket = {
    id: "0x1234567890abcdef",
    vendor: "Stuk",
    event: "Stuk rave",
    time: "13.9.2024 21.00",
    location: "Gosposvetska cesta 83, Maribor",
    buyerSignature: "0x1234567890abcdef",
    vendorSignature: "0xabcdef1234567890",
  };

  return (
    <div className="flex gap-4 bg-white bg-opacity-10 rounded-lg p-6 w-max">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl text-sky-400 mb-4">Stuk rave</h2>

        <div className="flex gap-4 items-center">
          <p className="w-1/5">Time</p>
          <div className="p-2 tracking-wide rounded-lg bg-white bg-opacity-5">
            13.9.2024 21.00
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-1/5">Location</p>
          <div className="p-2 rounded-lg bg-white bg-opacity-5">
            Gosposvetska cesta 83, Maribor
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <QRCode value={JSON.stringify(dummyTicket)} />
      </div>
    </div>
  );
};

export default TicketCard;
