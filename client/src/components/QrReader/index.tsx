import { CircularProgress } from "@mui/material";
import "./QrStyles.css";
import QrFrame from "../../assets/qr-frame.svg";
import FailureAnimation from "../ui/FailureAnimation";
import { useQrReader } from "../hooks/useQrReader";
import SuccessAnimation from "../ui/SuccessAnimation";

interface QrReaderProps {
  eventID: string;
  ticketID: string;
  closeModal: () => void;
}

const QrReader: React.FC<QrReaderProps> = ({
  eventID,
  ticketID,
  closeModal,
}) => {
  const {
    videoEl,
    qrBoxEl,
    scannedResult,
    apiResult,
    isVerifying,
    handleConfirm,
  } = useQrReader(eventID, ticketID, closeModal);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {scannedResult && (
        <div
          className={`popup ${
            apiResult === true
              ? "popup-success"
              : apiResult === false
              ? "popup-error"
              : ""
          }`}
        >
          <div className="flex justify-center items-center gap-2">
            {isVerifying ? (
              <CircularProgress size={50} thickness={10} color="inherit" />
            ) : apiResult === false ? (
              <FailureAnimation />
            ) : apiResult === true ? (
              <SuccessAnimation />
            ) : (
              <span className="text-lg">Awaiting scan...</span>
            )}
          </div>
          {!isVerifying && <button onClick={handleConfirm}>Confirm</button>}
        </div>
      )}
    </div>
  );
};

export default QrReader;
