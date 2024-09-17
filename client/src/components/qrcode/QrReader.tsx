import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { UseTicket } from "../../util/fetch/useTicket";
import "./QrStyles.css";

import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";

const QrReader = () => {

  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (scanComplete) return;

    let ticketID = result?.data;

    if (ticketID.startsWith('"') && ticketID.endsWith('"')) {
      ticketID = ticketID.slice(1, -1);
    }

    setScanComplete(true);
    setScannedResult(ticketID);
    setIsVerifying(true);
    setApiResult(null);

    scanner.current?.pause();

    try {
      console.log("scanned data ", result?.data);
      console.log("cuted data ", ticketID);
      const apiResponse = await UseTicket(ticketID);
      if (apiResponse.result) {
        setApiResult("Ticket is valid!");
      } else {
        setApiResult("Ticket is invalid or already used.");
      }
    } catch (err) {
      console.error("Error verifying ticket:", err);
      setApiResult("Error verifying ticket.");
    } finally {
      setIsVerifying(false);
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log("QR Scan failed:", err);
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
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.");
    }
  }, [qrOn]);

  const handleConfirm = () => {
    setScannedResult("");
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
        <div className="popup-success">
          <h2 className="text-xl">
            {isVerifying ? (
              <div className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" /> Validating ticket...
              </div>
            ) : (
              apiResult || "Validation failed."
            )}
          </h2>
          {/* <p>Scanned Result: {scannedResult}</p> */}
          {!isVerifying && <button onClick={handleConfirm}>Confirm</button>}
        </div>
      )}
    </div>
  );
};

export default QrReader;
