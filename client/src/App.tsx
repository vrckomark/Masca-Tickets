import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/health-check");
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold border-2 rounded-xl p-4">
        Boilerplate
      </h1>
    </>
  );
}

export default App;
