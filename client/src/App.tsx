import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "./pages/User";
import Vendor from "./pages/Vendor";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/health-check");
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

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
