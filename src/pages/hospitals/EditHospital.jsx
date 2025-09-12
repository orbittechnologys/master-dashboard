import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Save, ArrowLeft, Plus } from "lucide-react";
import axios from "axios";
import uploadToAzureStorage from "../../utils/UploadToAzureStorage";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";

export default function EditHospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    logo: null,
    description: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    suspended: false,
    noOfDoctors: "",
  });
  const [departments, setDepartments] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [originalLogo, setOriginalLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDept, setNewDept] = useState("");

  // Get authentication token
  const token = sessionStorage.getItem("authToken");

  // Fetch hospital data
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setFetchLoading(true);
        console.log("Fetching hospital with ID:", id);

        // Check if ID is valid
        if (!id || id === "undefined") {
          throw new Error("Invalid hospital ID");
        }

        const response = await axios.get(
          `${BASE_URL}/hospital/fetchById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          const hospital = response.data.data.hospital;
          setForm({
            name: hospital.name || "",
            logo: null,
            description: hospital.description || "",
            addressLine1: hospital.address?.addressLine1 || "",
            addressLine2: hospital.address?.addressLine2 || "",
            pincode: hospital.address?.pincode || "",
            city: hospital.address?.city || "",
            state: hospital.address?.state || "",
            suspended: hospital.suspended || false,
            noOfDoctors: hospital.noOfDoctors || "",
          });
          setOriginalLogo(hospital.logo || "");

          // Set departments
          if (response.data.data.departments) {
            setDepartments(
              response.data.data.departments.map((dept) => dept.department._id)
            );
          }
        } else {
          setError("Failed to fetch hospital data");
        }
      } catch (err) {
        console.error("Failed to fetch hospital:", err);
        console.error("Error response:", err.response?.data);

        if (err.response?.status === 400) {
          setError("Invalid hospital ID or request format");
        } else if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (err.response?.status === 404) {
          setError("Hospital not found");
        } else {
          setError(
            `Failed to load hospital data: ${
              err.response?.data?.message || err.message
            }`
          );
        }
      } finally {
        setFetchLoading(false);
      }
    };

    const fetchAllDepartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/department/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setAllDepartments(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };

    if (token && id && id !== "undefined") {
      fetchHospital();
      fetchAllDepartments();
    } else {
      setError("Authentication token or hospital ID not found.");
      setFetchLoading(false);
    }
  }, [token, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  const handleDepartmentChange = (deptId) => {
    setDepartments((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleAddDepartment = () => {
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
    }
    setNewDept("");
    setShowAddDept(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (
        !form.name ||
        !form.description ||
        !form.addressLine1 ||
        !form.city ||
        !form.state ||
        !form.pincode
      ) {
        throw new Error("Please fill all required fields");
      }

      // Upload new logo if exists
      let logoUrl = originalLogo;
      if (form.logo) {
        try {
          logoUrl = await uploadToAzureStorage(form.logo);
        } catch (uploadError) {
          throw new Error(`Logo upload failed: ${uploadError.message}`);
        }
      }

      // Prepare request body
      const requestBody = {
        name: form.name,
        description: form.description,
        logo: logoUrl,
        address: {
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          pincode: form.pincode,
          city: form.city,
          state: form.state,
        },
        suspended: form.suspended,
        noOfDoctors: parseInt(form.noOfDoctors) || 0,
      };

      // Make API call to update hospital
      const response = await axios.patch(
        `${BASE_URL}/hospital/update/${id}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Hospital updated successfully!");
        navigate("/hospital");
      } else {
        setError(response.data.message || "Failed to update hospital");
        toast.error(response.data.message || "Failed to update hospital");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while updating the hospital"
      );
      toast.error("Failed to update hospital");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if no token
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

  if (fetchLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-16 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading hospital data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-16">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/hospital")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Hospital</h1>
        </div>
        <button
          onClick={() => navigate("/hospital")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
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
                {form.logo ? "Change Logo" : "Upload Logo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {form.logo && <span className="text-sm">{form.logo.name}</span>}
              {originalLogo && !form.logo && (
                <div className="text-sm text-gray-500">Current logo set</div>
              )}
            </div>
            {originalLogo && (
              <div className="mt-2">
                <img
                  src={originalLogo}
                  alt="Current logo"
                  className="h-16 w-16 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
            />
          </div>

          {/* Number of Doctors */}
          <div>
            <label className="block mb-1 font-medium">Number of Doctors</label>
            <input
              type="number"
              name="noOfDoctors"
              value={form.noOfDoctors}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
            />
          </div>

          {/* Status */}
          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="suspended"
                checked={form.suspended}
                onChange={handleChange}
                className="rounded focus:ring-[#4DB6AC]"
              />
              <span className="font-medium">Suspended</span>
            </label>
          </div>

          {/* Departments */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Departments</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {allDepartments.map((dept) => (
                <label key={dept._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={departments.includes(dept._id)}
                    onChange={() => handleDepartmentChange(dept._id)}
                  />
                  <span className="text-sm">{dept.name}</span>
                </label>
              ))}
            </div>

            {/* {showAddDept ? (
              <div className="flex gap-2 mt-3">
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
                >
                  <option value="">Select Department</option>
                  {allDepartments
                    .filter((dept) => !departments.includes(dept._id))
                    .map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddDepartment}
                  className="px-3 py-2 bg-[#4DB6AC] text-white rounded-lg"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDept(false)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddDept(true)}
                className="flex items-center gap-2 mt-3 text-[#4DB6AC]"
              >
                <Plus size={16} /> Add Department
              </button>
            )} */}
          </div>

          {/* Address Details Heading */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Address Details
            </h2>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address Line 1 *</label>
            <input
              type="text"
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
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
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-[#4DB6AC] hover:bg-[#399D94] text-white rounded-lg shadow transition disabled:opacity-50"
          >
            {loading ? (
              "Updating..."
            ) : (
              <>
                <Save size={18} /> Update Hospital
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
