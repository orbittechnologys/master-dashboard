import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import logo from "@/assets/orbit-care.png";
import { Building2, Home, Settings, Users } from 'lucide-react';



export const SidePanel = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  return (

  <div className="flex flex-col justify-between bg-[#f4f9f8] w-64 h-screen shadow-lg p-4">
    {/* Top Section with Logo + Nav */}
    <div>
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img
          src={logo}
          alt="Orbit Care Logo"
          className="h-auto w-auto object-contain"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => {setActivePage("dashboard"); navigate("/")}}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "dashboard"  ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Home size={20} /> Dashboard
        </button>
        <button
          onClick={() => {setActivePage("hospital"); navigate("/hospital")}}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "hospital"  ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Building2 size={20} /> Hospital
        </button>
        <button
          onClick={() => {setActivePage("patients"); navigate("/patients")}}
          className={`flex items-center gap-3 p-3 rounded-xl w-full ${
            activePage === "patients"  ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
          }`}
        >
          <Users size={20} /> Patients
        </button>
      </div>
    </div>

    {/* Bottom Settings Button */}
    <div>
      <button
        onClick={() => {setActivePage("settings"); navigate("/settings")}}
        className={`flex items-center gap-3 p-3 rounded-xl w-full ${
          activePage === "settings"  ? "bg-[#d0ece7]" : "hover:bg-[#eaf5f3]"
        }`}
      >
        <Settings size={20} /> Settings
      </button>
    </div>
  </div>
);
}
export default SidePanel;