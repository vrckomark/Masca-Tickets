import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { UseTicket } from "../../util/fetch/useTicket"; // Import the API call function

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result and lock for scanning
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [apiResult, setApiResult] = useState<string | null>(null); // For API call result
  const [isVerifying, setIsVerifying] = useState<boolean>(false); // Loading state
  const [scanComplete, setScanComplete] = useState<boolean>(false); // To track if scan is complete

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    if (scanComplete) return; // Prevent further scans after the first successful one

    let ticketID = result?.data;

    if (ticketID.startsWith('"') && ticketID.endsWith('"')) {
      ticketID = ticketID.slice(1, -1); // Remove first and last character (the quotes)
    }

    setScanComplete(true); // Mark scan as complete
    setScannedResult(ticketID);
    setIsVerifying(true); // Show loading spinner
    setApiResult(null); // Reset the result for a fresh validation

    // Pause scanning by disabling the listener, but keep the camera running
    scanner.current?.pause();

    // Call the API to verify the ticket
    try {
      console.log("scanned data ", result?.data);
      console.log("cuted data ", ticketID);
      const apiResponse = await UseTicket(ticketID); // Assuming result.data is the ticketID
      if (apiResponse.result) {
        setApiResult("Ticket is valid!"); // Success message
      } else {
        setApiResult("Ticket is invalid or already used."); // Error message
      }
    } catch (err) {
      console.error("Error verifying ticket:", err);
      setApiResult("Error verifying ticket.");
    } finally {
      setIsVerifying(false); // Stop loading when the API call is done
    }
  };

  // Fail
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
      // Cleanup when leaving the component (only stop when component unmounts or you change paths)
      scanner?.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.");
    }
  }, [qrOn]);

  // Restart scanning after user confirms
  const handleConfirm = () => {
    setScannedResult(""); // Reset the scanned result
    setApiResult(null); // Reset the API result
    setScanComplete(false); // Allow scanning again
    scanner?.current?.start(); // Restart the scan listener
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

      {/* Show API Result and Data Result if scan is successful */}
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
