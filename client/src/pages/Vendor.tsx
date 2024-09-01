import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMasca } from "../MascaProvider";

const Vendor = () => {
  const { currentDID, currentDIDMethod } = useMasca();

  return (
    <>
      <h1 className="text-3xl font-bold border-2 rounded-xl p-4">
        Vendor Page
      </h1>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 12 }}>
        <ConnectButton />
      </div>
      <div>
        <p>
          <strong>Current DID:</strong> {currentDID || "Not connected"}
        </p>
        <p>
          <strong>Current DID Method:</strong>{" "}
          {currentDIDMethod || "Not connected"}
        </p>
      </div>
    </>
  );
};

export default Vendor;
