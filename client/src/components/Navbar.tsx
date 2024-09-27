import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { IoQrCode } from "react-icons/io5";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { MdEvent } from "react-icons/md";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import { useContext } from "react";
import { MascaContext } from "./providers/MascaApiProvider";

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
          <Link to="/vendor" className="color-sky-500 font-semibold px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all rounded-lg">
            Dashboard
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
        {/* Show the "New Event" button only if Masca is ready and the user is a vendor */}
        {isVendor && isConnected && (
          <Link
            to="/vendor/create-event"
            className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
          >
            Create Event
          </Link>
        )}

        {/* Show link to user's tickets if connected */}
        {isConnected ? (
          isVendor ? (
            <Link
              to="/vendor"
              className="color-sky-500 flex items-center gap-2 font-semibold px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all rounded-lg"
            >
              <MdEvent />
              Your events
            </Link>
          ) : (
            <Link
              to="/tickets"
              className="color-sky-500 flex items-center gap-2 font-semibold px-4 py-2 bg-sky-500 hover:bg-opacity-55 transition-all rounded-lg"
            >
              <BsTicketPerforatedFill />
              <p>Your tickets</p>
            </Link>
          )
        ) : null}

        {/* Rainbowkit Connect Button */}
        {!isSignUpPage && <ConnectButton />}
      </div>
    </div>
  );
};

export default Navbar;
