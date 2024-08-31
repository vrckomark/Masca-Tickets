import { ConnectButton } from "@rainbow-me/rainbowkit";

function User() {
  return (
    <>
      <h1 className="text-3xl font-bold border-2 rounded-xl p-4">
        <a href="/vendor">User page</a>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
    </>
  );
}

export default User;
