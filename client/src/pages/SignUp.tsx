import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { FormEvent, useState } from "react";
import { useAccount } from "wagmi";
import { useMasca } from "../hooks/useMasca";
import { addVendor } from "../util/fetch/addVendor";

const SignUp = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const { isConnected, address } = useAccount();
  const { currentDID } = useMasca();
  const [status, setStatus] = useState<{
    message: string;
    status: number;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!companyName || !isConnected || !currentDID || !address) return;
    const status = await addVendor(companyName, address, currentDID);
    setStatus(status);
  };

  const onCompanyNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCompanyName(e.currentTarget.value);
  };

  return (
    <div className="p-12 flex flex-col w-full items-center gap-8">
      <h1 className="font-semibold text-3xl mb-8">
        Sign up to become a ticket vendor.
      </h1>
      <form onSubmit={handleSubmit} className="flex-col flex w-1/3 gap-8">
        <input
          className="text-white transition-all hover:bg-opacity-10 focus:bg-opacity-10 outline-none border-2 border-white border-opacity-0 hover:border-opacity-20 duration-150 font-medium bg-white bg-opacity-[0.07] w-full p-4 rounded-lg"
          type="text"
          value={companyName}
          placeholder="Enter your vendor name"
          onChange={onCompanyNameChange}
        />
        <div className="flex justify-between w-full items-end">
          <div className="flex flex-col gap-2">
            <p className="font-medium opacity-70">
              Please select your vendor's wallet
            </p>
            <ConnectButton />
          </div>

          <input
            type="submit"
            disabled={!companyName || !isConnected}
            className=" bg-sky-500 disabled:bg-stone-500 disabled:cursor-default bg-opacity-90 hover:bg-opacity-100 transition-all p-4 font-medium text-xl rounded-lg cursor-pointer"
          />
        </div>
        {status && (
          <div
            className={`w-full p-4 flex flex-col items-center bg-red-500justify-center rounded-lg ${
              status?.isError ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <h2 className="text-3xl font-bold">
              {status.isError ? status.status : status.message}
            </h2>
            {status.isError && <p>{status.message}</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
