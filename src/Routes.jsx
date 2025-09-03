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
  {
    path: "/edithospital",
    element: <EditHospital />,
    title: "Edit Hospital",
  },
];

export default AppRoutes;
