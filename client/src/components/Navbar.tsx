import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { useMasca } from "../hooks/useMasca";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { isVendor } = useMasca();

  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";

  return (
    <div className="flex w-full p-8 justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-3xl text-sky-400 p-4">
          Masca Events
        </Link>
        {isVendor && (
          <p className="font-mediun text-xl text-sky-300 italic">vendors</p>
        )}
      </div>

      <div className="flex gap-6 items-center">
        {isVendor && isConnected && (
          <Link
            to="/vendor/create-event"
            className="px-4 py-2 hover:bg-sky-400 transition-all bg-sky-500 rounded-lg font-semibold"
          >
            + New Event
          </Link>
        )}
        <Link
          to="/user/tickets"
          className="color-sky-500 font-semibold px-4 py-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all rounded-lg"
        >
          Your tickets
        </Link>
        {!isSignUpPage && <ConnectButton />}

        {!isSignUpPage && !isConnected && (
          <Link
            to="/vendor/signup"
            className="p-4 rounded-full font-semibold text-sky-400 bg-white bg-opacity-0 hover:bg-opacity-15 transition-all"
          >
            Sign Up as Vendor
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;