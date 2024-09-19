import { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { enableMasca, isError } from "@blockchain-lab-um/masca-connector";
import { getVendorStatus } from "../util/fetch/getVendorStatus";
import { useAppDispatch } from "../store/hooks";
import { setCurrentDID, setIsVendor, setMascaApi } from "../store/userSlice";

export const useMasca = () => {
  const { address, isConnected } = useAccount();
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
    dispatch(setMascaApi(api));

    await api.switchDIDMethod("did:key");

    const did = await api.getDID();
    if (isError(did)) {
      console.error("Couldn't get DID:", did.error);
    } else {
      dispatch(setCurrentDID(did.data));
    }

    setIsMascaInitialized(true);
  };

  const checkVendorStatus = async () => {
    if (isConnected && address) {
      const vendorStatus = await getVendorStatus(address);
      dispatch(setIsVendor(vendorStatus.exists));
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      initializeMasca();
      checkVendorStatus();
    } else {
      dispatch(setMascaApi(null));
      dispatch(setCurrentDID(null));
      dispatch(setIsVendor(undefined));
      setIsMascaInitialized(false);
    }
  }, [isConnected, address]);
};
