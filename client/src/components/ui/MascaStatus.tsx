import React, { useContext } from "react";
import { useAccount } from "wagmi";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { MascaContext } from "../providers/MascaApiProvider";

const MascaStatus = () => {
  const { currentDID } = useAppSelector(selectUser);
  const { isConnected } = useAccount();
  const { mascaApi, isLoading } = useContext(MascaContext);
  const isMascaReady = !!currentDID && !!mascaApi;

  return (
    <div
      className={`flex items-center  gap-4 fixed right-0 px-4 py-2 bg-zinc-800 font-bold rounded-tl-xl bottom-0 ${
        !isConnected
          ? "opacity-50"
          : isMascaReady
          ? "text-sky-500 border-t-4 border-l-4 border-sky-500"
          : "text-red-500 border-t-4 border-l-4 border-red-500"
      }`}
    >
      {isLoading && (
        <div className="text-white">
          <CircularProgress color="inherit" size={15} thickness={10} />
        </div>
      )}

      <p>
        {!isConnected
          ? "No wallet connected"
          : isMascaReady
          ? "Masca Connected"
          : "Masca not connected"}
      </p>
    </div>
  );
};

export default MascaStatus;
