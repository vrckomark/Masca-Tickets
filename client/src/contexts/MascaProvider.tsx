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
  currentDIDMethod: string | null;
  isVendor: boolean | undefined;
  vendorId: string | null;
}>({
  mascaApi: null,
  currentDID: null,
  currentDIDMethod: null,
  isVendor: undefined,
  vendorId: null,
});

const MascaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mascaApi, setMascaApi] = useState<MascaApi | null>(null);
  const [currentDID, setCurrentDID] = useState<string | null>(null);
  const [currentDIDMethod, setCurrentDIDMethod] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const [isVendor, setIsVendor] = useState<boolean | undefined>(undefined);
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      const initializeMasca = async () => {
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

        const did = await api.getDID();
        if (isError(did)) {
          console.error("Couldn't get DID:", did.error);
        } else {
          setCurrentDID(did.data);
        }

        const method = await api.getSelectedMethod();
        if (isError(method)) {
          console.error("Couldn't get selected DID method:", method.error);
        } else {
          setCurrentDIDMethod(method.data);
        }
      };

      initializeMasca();
    }

    const checkVendorStatus = async () => {
      if (isConnected && address) {
        const vendorStatus = await getVendorStatus(address);
        setIsVendor(vendorStatus.isVendor !== null);
        setVendorId(vendorStatus.id || null);
      }
    };

    checkVendorStatus();
  }, [isConnected, address]);

  return (
    <MascaContext.Provider
      value={{ mascaApi, currentDID, currentDIDMethod, isVendor, vendorId }}
    >
      {children}
    </MascaContext.Provider>
  );
};

export default MascaProvider;
