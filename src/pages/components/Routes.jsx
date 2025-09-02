import Dashboard from "../Dashboard";
import Hospitals from "../Hospitals";
import Patients from "../Patients";
import AddHospital from "../AddHospital";
import Settings from "../profile/Settings"; // make sure you create this page

const AppRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/hospitals", element: <Hospitals /> },
  { path: "/patients", element: <Patients /> },
  { path: "/addhospital", element: <AddHospital /> },
  { path: "/settings", element: <Settings /> }, // ✅ added
];

export default AppRoutes;
