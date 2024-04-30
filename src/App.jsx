import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import House from "./House";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<House />} />
      </Routes>
    </Router>
  );
}
