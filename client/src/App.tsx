import { Routes, Route } from "react-router-dom";
import Vendor from "./pages/Vendor";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import UserTickets from "./pages/UserTickets";
import QRCodeScanner from "./pages/QRCodeScanner";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<UserTickets />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/vendor/signup" element={<SignUp />} />
        <Route path="/vendor/create-event" element={<CreateEvent />} />
        <Route path="/ticket-scan" element={<QRCodeScanner />} />
      </Routes>
    </div>
  );
}

export default App;
