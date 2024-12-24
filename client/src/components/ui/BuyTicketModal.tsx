import React from "react";
import Modal from "./Modal";
import { QRCodeSVG } from "qrcode.react";

interface BuyTicketModalProps {
  qrLocation: string;
  pin: string;
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ pin, qrLocation }) => {
  return (
    <Modal>
      <div className="flex flex-col gap-6 my-10">
        <div className="flex flex-col items-center">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl text-gray-900 font-bold">PIN:</h1>
            <p className="text-3xl font-bold tracking-widest text-black">
              {pin}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-8">
          <p className="text text-gray-900 font-semibold text-2xl">
            Scan this QR code:
          </p>
          <QRCodeSVG value={qrLocation} size={300} />
        </div>
      </div>
    </Modal>
  );
};

export default BuyTicketModal;
