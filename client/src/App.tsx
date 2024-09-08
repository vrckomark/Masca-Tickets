import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import VendorLayout from "./layouts/VendorLayout";
import User from "./pages/User";
import Vendor from "./pages/Vendor";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import UserTickets from "./pages/UserTickets";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<UserTickets />} />
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<Vendor />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="create-event" element={<CreateEvent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
