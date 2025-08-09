import { useState } from "react";
import { Home, Building2, Users, Settings } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const SidePanel = () => (
    <div className="flex flex-col justify-between bg-[#f4f9f8] w-64 h-screen shadow-lg p-4">
      <div className="space-y-2">
        <button
          onClick={() => setActivePage("dashboard")}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "dashboard" ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Home size={20} /> Dashboard
        </button>
        <button
          onClick={() => setActivePage("hospital")}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "hospital" ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Building2 size={20} /> Hospital
        </button>
        <button
          onClick={() => setActivePage("patients")}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "patients" ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Users size={20} /> Patients
        </button>
      </div>
      <div>
        <button
          onClick={() => setActivePage("settings")}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "settings" ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Settings size={20} /> Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f9fdfc]">
      <SidePanel />
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard/>
            }
          />
          <Route
            path="/hospital"
            element={
              <h1 className="text-2xl font-bold">Hospital Page Placeholder</h1>
            }
          />
          <Route
            path="/patients"
            element={
              <h1 className="text-2xl font-bold">Patients Page Placeholder</h1>
            }
          />
          <Route
            path="/settings"
            element={
              <h1 className="text-2xl font-bold">Settings Page Placeholder</h1>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
