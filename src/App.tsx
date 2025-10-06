import { useEffect } from "react";
//COMPONENTS
import Layout from "./components/layout";

import "./App.css";

function App() {
  useEffect(() => {
    document.title = "RPSSL";
  }, []);

  return (
    <div className="body">
      <Layout />
    </div>
  );
}

export default App;
