import Dashboard from "./pages/dashboard/Dashboard";
import Hospital from "./pages/hospitals/Hospital";
import AddHospital from "./pages/hospitals/AddHospital";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/Setting";
import EditHospital from "./pages/hospitals/EditHospital";

const AppRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    title: "Dashboard",
    requiredRole: "SUPERADMIN",
  },
  {
    path: "/hospital",
    element: <Hospital />,
    title: "Hospitals",
    requiredRole: "SUPERADMIN",
  },
  {
    path: "/addhospital",
    element: <AddHospital />,
    title: "Add Hospital",
    requiredRole: "SUPERADMIN",
  },
  {
    path: "/patient",
    element: <Patients />,
    title: "Patients",
  },
  {
    path: "/settings",
    element: <Settings />,
    title: "Settings",
    requiredRole: "SUPERADMIN",
  },
  {
    path: "/edithospital/:id",
    element: <EditHospital />,
    title: "Edit Hospital",
    requiredRole: "SUPERADMIN",
  },
];

export default AppRoutes;
