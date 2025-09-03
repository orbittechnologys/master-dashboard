import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/components/Sidebar";
import AppRoutes from "./Routes";
import Login from "./pages/profile/Login";
import ProtectedRoute from "./pages/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes with Sidebar layout */}
        <Route element={<Sidebar />}>
          {AppRoutes?.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<ProtectedRoute element={element} />}
            />
          ))}
        </Route>

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h2>❌ Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
