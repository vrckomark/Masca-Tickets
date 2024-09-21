import React, { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { enableMasca, isError } from "@blockchain-lab-um/masca-connector";
import { MascaApi } from "@blockchain-lab-um/masca-types";
import { useAppDispatch } from "../../store/hooks";
import { setCurrentDID } from "../../store/userSlice";

interface MascaApiProviderProps {
  children: React.ReactNode;
}
interface MascaContextType {
  mascaApi: MascaApi | null;
}

export const MascaContext = createContext<MascaContextType>({
  mascaApi: null,
});

const MascaApiProvider: React.FC<MascaApiProviderProps> = ({ children }) => {
  const [mascaApi, setMascaApi] = useState<MascaApi | null>(null);
  const { isConnected, address } = useAccount();
  const [isMascaInitialized, setIsMascaInitialized] = useState(false);
  const dispatch = useAppDispatch();

  const initializeMasca = async () => {
    if (!address || !isConnected || isMascaInitialized) return;

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
      dispatch(setCurrentDID(did.data));
    }

    setIsMascaInitialized(true);
  };

  useEffect(() => {
    if (isConnected && address) {
      initializeMasca();
    } else {
      dispatch(setCurrentDID(null));
      setIsMascaInitialized(false);
    }
  }, [isConnected, address, initializeMasca]);

  return (
    <MascaContext.Provider value={{ mascaApi }}>
      {children}
    </MascaContext.Provider>
  );
};

export default MascaApiProvider;
