import React, { createContext, useEffect, useState } from "react";
import {
  enableMasca,
  isError,
  MascaApi,
} from "@blockchain-lab-um/masca-connector";
import { useAccount } from "wagmi";
import { getVendorStatus } from "../util/fetch/getVendorStatus";

export const MascaContext = createContext<{
  mascaApi: MascaApi | null;
  currentDID: string | null;
  isVendor: boolean | undefined;
}>({
  mascaApi: null,
  currentDID: null,
  isVendor: undefined,
});

const MascaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mascaApi, setMascaApi] = useState<MascaApi | null>(null);
  const [currentDID, setCurrentDID] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const [isVendor, setIsVendor] = useState<boolean | undefined>(undefined);

  const initializeMasca = async () => {
    if (!address || !isConnected) return;

    const enableResult = await enableMasca(address, {
      snapId: "npm:@blockchain-lab-um/masca",
      version: "1.2.2",
    });

    if (isError(enableResult)) {
      console.error("Failed to enable Masca:", enableResult.error);
      return;
    }

    const api = enableResult.data.getMascaApi();
    setMascaApi(api);
    
    await api.switchDIDMethod("did:key");

    const did = await api.getDID();
    if (isError(did)) {
      console.error("Couldn't get DID:", did.error);
    } else {
      setCurrentDID(did.data);
    }
  };

  const checkVendorStatus = async () => {
    if (isConnected && address) {
      const vendorStatus = await getVendorStatus(address);
      setIsVendor(vendorStatus.exists);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      initializeMasca();
      checkVendorStatus();
    } else {
      setMascaApi(null);
      setCurrentDID(null);
      setIsVendor(undefined);
    }
  }, [isConnected, address]);

  return (
    <MascaContext.Provider value={{ mascaApi, currentDID, isVendor }}>
      {children}
    </MascaContext.Provider>
  );
};

export default MascaProvider;