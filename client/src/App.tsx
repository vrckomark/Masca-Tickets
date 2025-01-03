import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Vendor from "./pages/vendor/Events";
import Navbar from "./components/Navbar";
import SignUp from "./pages/signup";
import CreateEvent from "./pages/vendor/CreateEvent";
import { useInitializeWallet } from "./hooks/useInitializeWallet";
import Home from "./pages/home";
import { ModalContext } from "./contexts/ModalContextProvider";
import UserTickets from "./pages/user/UserTickets";

const App = () => {
  const { Modal } = useContext(ModalContext);
  useInitializeWallet();

  return (
    <div className="flex flex-col">
      <Navbar />
      {Modal}
      {/* <MascaStatus /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<UserTickets />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/vendor/signup" element={<SignUp />} />
        <Route path="/vendor/create-event" element={<CreateEvent />} />
        <Route path="/test" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
