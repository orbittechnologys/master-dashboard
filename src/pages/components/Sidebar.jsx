import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Settings,
  Home,
  Building2,
  Users,
} from "lucide-react";
import logo from "../../assets/logo/mainLogo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user info from sessionStorage or use defaults
  const userName = sessionStorage.getItem("username") || "User Name";
  const fetchedRole = sessionStorage.getItem("role") || "SUPER_ADMIN";

  // Navigation links based on user role
  const navLinks = {
    SUPER_ADMIN: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
      { name: "Hospitals", icon: <Building2 size={20} />, path: "/hospital" },
      { name: "Patients", icon: <Users size={20} />, path: "/patient" },
      //   { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ],
    HOSPITAL_STAFF: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
      { name: "Patients", icon: <Users size={20} />, path: "/patients" },
      { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ],
    DOCTOR: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
      { name: "Patients", icon: <Users size={20} />, path: "/patients" },
    ],
  };

  const selectedNavlinks = navLinks[fetchedRole] || [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 sm:hidden ${
          isSidebarOpen ? "opacity-100 z-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 transition-transform h-screen duration-300 text-white bg-primary ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-center items-center">
            <img
              src={logo}
              alt="Orbit Care Logo"
              className="h-10 object-contain"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-1 py-2 overflow-y-auto">
            <h2 className="px-2 text-sm font-semibold my-2 ">MENU</h2>
            <ul className="space-y-2 p-2 rounded-md">
              {selectedNavlinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(link.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer border rounded-md transition-all ${
                      isActive
                        ? "bg-white text-primary"
                        : "hover:bg-white hover:text-primary text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-5 h-5">{link.icon}</span>
                      <span className="ml-3 text-base">{link.name}</span>
                    </div>
                    <ChevronRight size={18} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="sm:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 sm:left-64 h-16 flex items-center justify-between bg-white border-b px-4 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md sm:hidden hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#E9EBEC] pl-10 pr-4 py-2 rounded-md focus:outline-none w-48 md:w-64"
              />
            </div>
          </div>

          {/* Right - User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center cursor-pointer"
            >
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className="text-sm">{userName}</p>
                <p className="text-xs text-[#878A99]">
                  {fetchedRole?.replace("_", " ")}
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 flex flex-col z-50">
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsOpen(false);
                  }}
                  className="text-gray-500 flex items-center hover:bg-gray-100 px-4 py-2"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="text-sm">Settings</span>
                </button>
                <div>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/");
                    }}
                    className="flex items-center w-full text-sm text-red-700 hover:bg-gray-100 px-4 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        {/* <div className="pt-16 sm:pt-0">
          <div className="">
            <main>
              <Outlet />
            </main>
          </div>
        </div> */}
        <div className=" max-w-7xl mx-auto flex flex-col gap-5 ">
          <h2 className="text-[10px] m-3 sm:hidden bg-primary py-1 rounded-sm text-center text-white animate-pulse text-nowrap">
            Please View in larger screen for better UI experiance
          </h2>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
