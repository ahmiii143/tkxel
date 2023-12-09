import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SectorForm from "./Sectors";
import Showdata from "./Showdata";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Showdata" element={<Showdata />} />

        <Route path="/" element={<SectorForm />} />
      </Routes>
    </Router>
  );
}

export default App;
