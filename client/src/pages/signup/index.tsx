import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaUserTie } from "react-icons/fa6";
import { useSignUp } from "./useSignUp";

const SignUp = () => {
  const { handleSubmit, companyName, isConnected, status } = useSignUp();
  return (
    <div className="p-12 flex flex-col w-full items-center gap-8">
      <FaUserTie className="text-[72px] text-primary" />

      <h1 className="font-semibold text-3xl mb-6">
        Sign up to become a ticket vendor.
      </h1>
      <form onSubmit={handleSubmit} className="flex-col flex w-1/3 gap-8">
        <input
          className="text-black text-lg transition-all outline-none border-opacity-0 placeholder:text-stone-700 hover:border-opacity-20 duration-150 font-medium bg-primary bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 w-full p-4 rounded-lg"
          type="text"
          value={companyName.value}
          placeholder="Enter your vendor name"
          onChange={companyName.onChange}
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
            disabled={!companyName.value || !isConnected}
            className=" bg-primary  disabled:bg-stone-500 disabled:text-stone-200 disabled:cursor-default bg-opacity-90 hover:bg-opacity-100 transition-all px-6 py-3 font-bold text-white text-xl rounded-lg cursor-pointer"
          />
        </div>
        {status && (
          <div
            className={`w-full p-4 flex flex-col items-center bg-red-500justify-center rounded-lg ${
              status?.isError ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <h2 className="text-2xl font-bold">
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
