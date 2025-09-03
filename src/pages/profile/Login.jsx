import React, { useState } from "react";
// import logo from "./assets/logo/Logo.png";
import logo from "../../assets/logo/mainLogo.png";
import loginbg from "../../assets/logo/loginbg.png";
import { Eye, EyeOff } from "lucide-react";
import { BASE_URL } from "../../constants";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-cyan-50 to-cyan-100 p-6">
      <div className="flex w-full max-w-3xl overflow-hidden  border border-gray-200 shadow-lg">
        {/* Left side with overlay */}
        <div className="relative hidden md:block w-1/2">
          <img
            src={loginbg}
            alt="Login background"
            // className="absolute inset-0 h-full w-full object-fit"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#2FAAA1] opacity-70"></div>
          {/* Logo + text */}
          <div className="absolute inset-0 flex  items-center justify-center text-white">
            <img src={logo} alt="Orbit Care Logo" className="w-10 h-10 mx-2" />
            <h1 className="text-2xl font-bold">Orbit Care</h1>
          </div>
        </div>
        {/* Right side form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <h2 className="text-xl font-semibold mb-6">Login</h2>
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FAAA1]"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FAAA1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {/* Remember me */}
            {/* <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-[#2FAAA1] focus:ring-[#2FAAA1]"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div> */}
            {/* Submit button */}
            <button
              type="submit"
              className="w-full rounded-md bg-[#2FAAA1] py-2 text-white font-medium hover:bg-[#279186] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
