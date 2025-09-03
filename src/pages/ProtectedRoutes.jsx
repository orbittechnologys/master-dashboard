import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // Check multiple authentication indicators
  const isAuthenticated =
    sessionStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("authToken") !== null;

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected component
  return element;
};

export default ProtectedRoute;
