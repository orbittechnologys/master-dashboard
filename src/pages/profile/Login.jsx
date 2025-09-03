import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo/mainLogo.png";
import loginbg from "../../assets/logo/loginbg.png";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://care.uur.co.in:4035/api/user/login",
        formData
      );

      // Store the token in sessionStorage
      if (response.data.token) {
        sessionStorage.setItem("authToken", response.data.token);
        // You might also want to store user data if needed
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));

        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-cyan-50 to-cyan-100 p-6">
      <div className="flex w-full max-w-3xl overflow-hidden  border border-gray-200 shadow-lg">
        {/* Left side with overlay */}
        <div className="relative hidden md:block w-1/2">
          <img
            src={loginbg}
            alt="Login background"
            className="h-full w-full object-cover"
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
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="identifier"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FAAA1]"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FAAA1] pr-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#2FAAA1] py-2 text-white font-medium hover:bg-[#279186] disabled:opacity-70 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
