import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Pricing from "./pages/Pricing";
import NotAvailable from "./pages/NotAvailable";
import Demo from "./pages/Demo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/get-started" element={<NotAvailable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
