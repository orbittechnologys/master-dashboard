import Dashboard from "./pages/dashboard/Dashboard";
import Hospital from "./pages/hospitals/Hospital";
import AddHospital from "./pages/hospitals/AddHospital";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/Setting";

const AppRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    title: "Dashboard",
  },
  {
    path: "/hospital",
    element: <Hospital />,
    title: "Hospitals",
  },
  {
    path: "/addhospital",
    element: <AddHospital />,
    title: "Add Hospital",
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
  },
];

export default AppRoutes;
