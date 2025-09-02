// src/pages/components/Routes.jsx
import Dashboard from "../Dashboard";
import Hospitals from "../Hospitals";
import Patients from "../Patients";
import AddHospital from "../AddHospital";

const AppRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/hospitals", element: <Hospitals /> },
  { path: "/patients", element: <Patients /> },
  { path: "/addhospital", element: <AddHospital /> },
];

export default AppRoutes;
