import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "./pages/User";
import Vendor from "./pages/Vendor";
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </Router>
  );
}

export default App;
