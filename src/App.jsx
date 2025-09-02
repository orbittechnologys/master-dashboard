import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/components/Sidebar";
import Login from "./pages/profile/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Hospital from "./pages/hospitals/Hospital";
import AddHospital from "./pages/hospitals/AddHospital";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Sidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/addhospital" element={<AddHospital />} />
          <Route path="/patient" element={<Patients />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<h2>:x: Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
