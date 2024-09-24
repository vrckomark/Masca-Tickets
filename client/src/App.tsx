import { Routes, Route } from "react-router-dom";
import Vendor from "./pages/Vendor";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import UserTickets from "./pages/UserTickets";
import TicketScanner from "./pages/TicketScanner";
import { useInitializeWallet } from "./hooks/useInitializeWallet";
import MascaStatus from "./components/ui/MascaStatus";
import Home from "./pages/Home";

const App = () => {
  useInitializeWallet();

  return (
    <div className="flex flex-col">
      <Navbar />
      <MascaStatus />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<UserTickets />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/vendor/signup" element={<SignUp />} />
        <Route path="/vendor/create-event" element={<CreateEvent />} />
        <Route path="/ticket-scan" element={<TicketScanner />} />
      </Routes>
    </div>
  );
};

export default App;
