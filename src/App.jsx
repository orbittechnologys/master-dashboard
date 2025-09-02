// src/App.jsx
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./pages/components/Sidebar";
import AppRoutes from "./pages/components/Routes";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Sidebar Layout for Dashboard pages */}
      <Route element={<Sidebar />}>
        {AppRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>

      {/* Fallback for invalid routes */}
      <Route path="*" element={<h2>❌ Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
