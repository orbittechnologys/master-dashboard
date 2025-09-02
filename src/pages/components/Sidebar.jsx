import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "@/assets/orbit-care.png";
import { Building2, Home, Settings, Users } from "lucide-react";
import AppRoutes from "./Routes"; 

const iconMap = {
  "/dashboard": <Home size={20} />,
  "/hospitals": <Building2 size={20} />,
  "/patients": <Users size={20} />,
  "/settings": <Settings size={20} />,
};

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col justify- bg-[#f4f9f8] w-64 shadow-lg p-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Orbit Care Logo" className="h-auto w-auto object-contain" />
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          {AppRoutes.map(({ path }) =>
            iconMap[path] ? (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl w-full ${
                    isActive ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
                  }`
                }
              >
                {iconMap[path]}{" "}
                {path.replace("/", "").charAt(0).toUpperCase() + path.replace("/", "").slice(1)}
              </NavLink>
            ) : null
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
