import "./App.css";
import PersistentDrawerLeft from "./Drawer";
import { Context } from "./Context.jsx";
import { useState } from "react";

function App() {
  const [navname, setNavname] = useState("Welcome");
  const [stuName, setStuName] = useState(null);
  return (
    <div className="App">
      <Context.Provider
        value={{ value1: [navname, setNavname], value2: [stuName, setStuName] }}
      >
        <PersistentDrawerLeft />
      </Context.Provider>
    </div>
  );
}

export default App;
