import { useState, useEffect } from "react";
import { PlusCircle, X, Upload } from "lucide-react";
import axios from "axios";
import uploadToAzureStorage from "../../utils/UploadToAzureStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";
import GoogleMapPicker from "./MapPicker";

export default function AddHospital() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    logo: null,
    description: "",
    departments: [],
    area: "",
    city: "",
    state: "",
    pincode: "",
    pocName: "",
    pocPhone: "",
    pocEmail: "",
    // consultationFee: "",
    latitude: null,
    longitude: null,
    logoPreview: null,
  });
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/department/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setDepartmentsList(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else {
          setError("Failed to load departments. Please refresh the page.");
        }
      }
    };

    if (token) {
      fetchDepartments();
    } else {
      setError("Authentication token not found. Please login again.");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setForm({ ...form, logo: e.target.files[0] });
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        logo: file,
        logoPreview: URL.createObjectURL(file), // 👈 adds a preview URL
      });
    }
  };

  const handleDepartmentChange = (deptId) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter((d) => d !== deptId)
        : [...prev.departments, deptId],
    }));
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError("");
    setSuccess("");

    if (!token) {
      setError("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      if (
        !form.name ||
        !form.description ||
        !form.area ||
        !form.city ||
        !form.state ||
        !form.pincode ||
        !form.pocName ||
        !form.pocPhone ||
        !form.pocEmail
      ) {
        throw new Error("Please fill all required fields");
      }

      let logoUrl = "";
      if (form.logo) {
        try {
          logoUrl = await uploadToAzureStorage(form.logo);
        } catch (uploadError) {
          throw new Error(`Logo upload failed: ${uploadError.message}`);
        }
      }

      const requestBody = {
        hospital: {
          name: form.name,
          description: form.description,
          logo: logoUrl,
          address: {
            addressLine1: form.area,
            addressLine2: "",
            pincode: form.pincode,
            city: form.city,
            state: form.state,
          },
          ...(form.latitude != null && form.longitude != null
            ? {
                location: {
                  latitude: form.latitude,
                  longitude: form.longitude,
                },
              }
            : {}),
        },
        admin: {
          username: form.pocName,
          email: form.pocEmail,
          phone: form.pocPhone,
          profileImg: "",
        },
        ...(form.departments?.length > 0
          ? { departments: form.departments }
          : {}),
      };

      const response = await axios.post(
        `${BASE_URL}/hospital/add`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess("Hospital added successfully!");
        setForm({
          name: "",
          logo: null,
          description: "",
          departments: [],
          area: "",
          city: "",
          state: "",
          pincode: "",
          pocName: "",
          pocPhone: "",
          pocEmail: "",
        });
        toast.success("Hospital added successfully!");
        navigate("/hospital");
      } else {
        console.log("API Error:", response.data);
        setError(response.data.message || "Failed to add hospital");
        toast.error(response.data.message || "Failed to add hospital");
      }
    } catch (err) {
      toast.error("Failed to add hospital");
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.msg ||
            "An error occurred while adding the hospital"
        );
      }
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-16 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Authentication Required
          </h2>
          <p className="mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-[#4DB6AC] text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-16">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Hospital</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Name */}
        <div>
          <label className="block mb-1 font-medium">Hospital Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        {/* Hospital Logo */}
        <div>
          <label className="block mb-1 font-medium">Hospital Logo</label>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload size={16} />
              Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {form.logo && <span className="text-sm">{form.logo.name}</span>}
          </div>

          {/* 👇 Image preview section */}
          {form.logoPreview && (
            <div className="mt-3">
              <img
                src={form.logoPreview}
                alt="Logo Preview"
                className="h-24 w-24 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">
            Description * <small>(max 200 characters)</small>
          </label>
          <textarea
            name="description"
            value={form.description}
            maxLength={500}
            onChange={handleChange}
            required
            placeholder="Max 100 words..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        {/* Consultation Fee */}
        {/* 
        <div>
          <label className="block mb-1 font-medium">
            Consultation Fee (₹) *
          </label>
          <input
            type="number"
            name="consultationFee"
            value={form.consultationFee}
            onChange={handleChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>
        */}

        {/* Departments Multi Select */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Departments <small>(optional)</small>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {departmentsList.map((dept) => (
              <label key={dept._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.departments.includes(dept._id)}
                  onChange={() => handleDepartmentChange(dept._id)}
                />
                <span className="text-sm">{dept.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Address Details Heading */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Address Details
          </h2>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Hospital Location</label>
          <GoogleMapPicker
            onLocationSelect={(data) =>
              setForm((prev) => ({
                ...prev,
                latitude: data.latitude,
                longitude: data.longitude,
                area: data.address || prev.area, // 👈 auto-fill Area field
              }))
            }
          />
          {/* <GoogleMapPicker
            onLocationSelect={(data) => {
              console.log(data);
              setForm((prev) => ({
                ...prev,
                latitude: data.latitude,
                longitude: data.longitude,
                area: data.area || prev.area, // 👈 auto-fill Area
                city: data.city || prev.city, // 👈 auto-fill City
                state: data.state || prev.state, // 👈 auto-fill State
                pincode: data.pincode || prev.pincode, // 👈 auto-fill Pincode
              }));
            }}
          /> */}
        </div>

        <div>
          <label className="block mb-1 font-medium">Area *</label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">City *</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">State *</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Latitude *</label>
          <input
            type="text"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Longitude *</label>
          <input
            type="text"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        {/* POC Details Heading */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Hospital Admin / POC Details
          </h2>
        </div>

        <div>
          <label className="block mb-1 font-medium">POC Name *</label>
          <input
            type="text"
            name="pocName"
            value={form.pocName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">POC Phone *</label>
          <input
            type="tel"
            name="pocPhone"
            value={form.pocPhone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">POC Email *</label>
          <input
            type="email"
            name="pocEmail"
            value={form.pocEmail}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-[#4DB6AC] hover:bg-[#399D94] text-white rounded-lg shadow transition disabled:opacity-50"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <PlusCircle size={18} /> Add Hospital
            </>
          )}
        </button>
      </div>

      {/* Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Confirm Add Hospital</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to add this hospital?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-[#4DB6AC] hover:bg-[#399D94] text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Adding..." : "Confirm"}
              </button>
            </div>
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
