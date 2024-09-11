import { useState } from "react";
import QrReader from "../components/qrcode/QrReader";

function TicketScanner() {
    const [openQr, setOpenQr] = useState<boolean>(false);
    return (
      <div className="h-screen flex flex-col align-top space-x-4">
        <div>
            {openQr && <QrReader />}
        </div>
        <div className="w-auto flex justify-center mt-10">
            <button 
                onClick={() => setOpenQr(!openQr)}
                className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
            >
            {openQr ? "Close" : "Open"} QR Scanner
            </button>
        </div>
      </div>
    );
}

export default TicketScanner;