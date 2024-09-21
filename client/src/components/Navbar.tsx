import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import { useContext } from "react";
import { MascaContext } from "./providers/MascaAPIProvider";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { isVendor, currentDID } = useAppSelector(selectUser);
  const { mascaApi } = useContext(MascaContext);

  const location = useLocation();
  const isSignUpPage = location.pathname === "/vendor/signup";

  const isMascaReady = !!currentDID && !!mascaApi;

  return (
    <div className="flex w-full p-8 justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-3xl text-sky-400 p-4">
          Masca Events
        </Link>
        {/* Display vendor link only if the user is connected and is a vendor */}
        {isVendor && isConnected && (
          <Link to="/vendor" className="ml-4">
            <p className="font-medium text-xl text-sky-300 italic">Vendors</p>
          </Link>
        )}

        {/* Show "Sign Up as Vendor" only if user is not connected */}
        {!isSignUpPage && !isVendor && isConnected && (
          <Link
            to="/vendor/signup"
            className="color-sky-500 font-semibold px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all rounded-lg"
          >
            Sign Up as Vendor
          </Link>
        )}
      </div>

      <div className="flex gap-6 items-center">
        {/* Display a status message if Masca is connected */}
        {isConnected &&
          (isMascaReady ? (
            <p className="font-semibold text-green-500 italic">
              Masca Connected
            </p>
          ) : (
            <>
              <span className="font-semibold text-red-500 italic">
                Masca Not Connected
              </span>
              <CircularProgress size={20} color="inherit" />
            </>
          ))}

        {/* Show the "New Event" button only if Masca is ready and the user is a vendor */}
        {isVendor && isConnected && isMascaReady && (
          <Link
            to="/vendor/create-event"
            className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
          >
            + New Event
          </Link>
        )}

        {/* Show the Scan tickets button only if Masca is ready */}

        <Link
          to="/ticket-scan"
          className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
        >
          Scan tickets
        </Link>

        {/* Show link to user's tickets if connected */}
        {isConnected && (
          <Link
            to="/tickets"
            className="color-sky-500 font-semibold px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all rounded-lg"
          >
            Your tickets
          </Link>
        )}

        {/* Rainbowkit Connect Button */}
        {!isSignUpPage && <ConnectButton />}
      </div>
    </div>
  );
};

export default Navbar;
