import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";

  return (
    <div className="flex w-full p-8 justify-between items-center">
      <Link to="/" className="font-bold text-3xl text-sky-400">
        Home
      </Link>
      <div className="flex gap-4 items-center">
        <ConnectButton />
        {!isSignUpPage && (
          <Link
            to="/signup"
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
