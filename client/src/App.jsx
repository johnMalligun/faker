import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import DataTable from "./components/DataTable";
import ExportButton from "./components/ExportButton";

const App = () => {
  const [region, setRegion] = useState("en");
  const [errors, setErrors] = useState(0);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000)); // Инициализация seed случайным значением
  const [items, setItems] = useState([]);

  const randomizeSeed = () => {
    const newSeed = Math.floor(Math.random() * 100000);
    setSeed(newSeed);
  };

  return (
    <div className="App">
      <h1>Fake User Data Generator</h1>
      <ControlPanel
        region={region}
        setRegion={setRegion}
        errors={errors}
        setErrors={setErrors}
        seed={seed}
        setSeed={setSeed}
        randomizeSeed={randomizeSeed}
      />
      <ExportButton data={items} />
      <DataTable
        region={region}
        errors={errors}
        seed={seed}
        items={items}
        setItems={setItems}
      />
    </div>
  );
};

export default App;
