import { FormEvent, useState } from "react";
import { useAccount } from "wagmi";
import { addVendor } from "../../util/fetch/addVendor";

export const useSignUp = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const { isConnected, address } = useAccount();
  const [status, setStatus] = useState<{
    message: string;
    status: number;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!companyName || !isConnected || !address) return;
    const status = await addVendor(companyName, address);
    setStatus(status);
  };

  const onCompanyNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCompanyName(e.currentTarget.value);
  };

  return {
    handleSubmit,
    companyName: { value: companyName, onChange: onCompanyNameChange },
    isConnected,
    status,
  };
};
