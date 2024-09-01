import React, { ChangeEventHandler, FormEvent, useState } from "react";

const SignUp = () => {
  const [companyName, setCompanyName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onCompanyNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCompanyName(e.currentTarget.value);
  };

  return (
    <div className="p-12 flex flex-col w-full items-center">
      <form onSubmit={handleSubmit} className="flex-col flex w-1/3">
        <input
          className="text-white font-medium bg-white bg-opacity-[0.07] w-full p-4 rounded-lg"
          type="text"
          value={companyName}
          placeholder="Enter your vendor name"
          onChange={onCompanyNameChange}
        />
      </form>
    </div>
  );
};

export default SignUp;
