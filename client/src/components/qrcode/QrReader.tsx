import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { CircularProgress } from "@mui/material";
import { UseTicket } from "../../util/fetch/useTicket";
import "./QrStyles.css";
import QrFrame from "../../assets/qr-frame.svg";
import SuccessAnimation from '../ui/successAnimation';
import FailureAnimation from '../ui/FailureAnimation';

interface eventProps {
  eventID: string;
  ticketID: string;
  closeModal: () => void;
}

interface ScannedResult {
  eventID: string;
  room: string;
}

const QrReader: React.FC<eventProps> = ({ eventID, ticketID, closeModal }) => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const [scannedResult, setScannedResult] = useState<ScannedResult | null>(null);
  const [apiResult, setApiResult] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  function trimQuotes(trimData: string) {
    if (trimData.startsWith('"') && trimData.endsWith('"')) {
      return trimData.slice(1, -1);
    }
    return trimData;
  }

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (scanComplete) return;

    const scanedData = trimQuotes(result?.data);
    const scanedDataParse = JSON.parse(scanedData);

    setScanComplete(true);
    setScannedResult(scanedDataParse);
    console.log('Scanned Result:', scanedDataParse);
    console.log('Scanned Result:', scannedResult);
    setIsVerifying(true);
    setApiResult(null);

    scanner.current?.pause();

    try {
      if (scanedDataParse?.eventID !== eventID) {
        throw new Error(`Invalid ticket for this event. Event ID: ${scanedDataParse?.eventID} and Ticket ID: ${eventID}`);
      }

      const apiResponse = await UseTicket(ticketID, scanedDataParse?.room);

      if (apiResponse.result) {
        setApiResult(true);

        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        setApiResult(false);
      }
    } catch (err) {
      console.error("Error verifying ticket:", err);
      setApiResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const onScanFail = (err: string | Error) => {
    return;
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      scanner?.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and reload."
      );
    }
  }, [qrOn]);

  const handleConfirm = () => {
    setScannedResult(null);
    setApiResult(null);
    setScanComplete(false);
    scanner?.current?.start();
  };

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
          {!isVerifying && ( <button onClick={handleConfirm}>Confirm</button> )}
        </div>
      )}
    </div>
  );
};

export default QrReader;
