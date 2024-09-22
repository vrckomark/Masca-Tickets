import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getVendorStatus } from "../util/fetch/getVendorStatus";
import { useAppDispatch } from "../store/hooks";
import { setIsVendor } from "../store/userSlice";

export const useInitializeWallet = () => {
  const { address, isConnected } = useAccount();
  const dispatch = useAppDispatch();

  const checkVendorStatus = async () => {
    if (isConnected && address) {
      const vendorStatus = await getVendorStatus(address);
      dispatch(setIsVendor(vendorStatus.exists));
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkVendorStatus();
    } else {
      dispatch(setIsVendor(undefined));
    }
  }, [isConnected, address]);
};
