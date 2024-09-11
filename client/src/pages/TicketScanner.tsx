import { useState } from "react";
import QrReader from "../components/qrcode/QrReader";

function TicketScanner() {
    const [openQr, setOpenQr] = useState<boolean>(false);
    return (
      <div>
        <button 
            onClick={() => setOpenQr(!openQr)}
            className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
        >
          {openQr ? "Close" : "Open"} QR Scanner
        </button>
        {openQr && <QrReader />}
      </div>
    );
}

export default TicketScanner;