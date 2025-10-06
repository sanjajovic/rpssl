//COMPONENTS
import Layout from "./components/layout";

import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="body">
      <Layout />
    </div>
  );
}

export default App;
