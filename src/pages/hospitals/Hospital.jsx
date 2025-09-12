import { useState, useEffect } from "react";
import { Search, Phone, Mail, Plus, Edit, Slash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, formatDate } from "../../constants";

export default function Hospital() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Get auth token
  const getAuthToken = () => {
    return sessionStorage.getItem("authToken");
  };

  // Fetch all hospitals
  // In your fetchAllHospitals function, check the response structure:
  const fetchAllHospitals = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      const response = await axios.get(`${BASE_URL}/hospital/fetchAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetch all hospitals response:", response.data);

      if (response.data.success) {
        setHospitals(response.data.data);
        // Check what properties the hospitals have
        if (response.data.data.length > 0) {
          console.log(
            "First hospital properties:",
            Object.keys(response.data.data[0])
          );
        }
      } else {
        setError("Failed to fetch hospitals");
      }
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError("Failed to load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search hospitals by name
  const searchHospitalsByName = async (query) => {
    if (!query.trim()) {
      fetchAllHospitals();
      return;
    }

    try {
      setSearchLoading(true);
      setError(null);

      const token = getAuthToken();
      const response = await axios.get(`${BASE_URL}/hospital/fetchByName`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query.trim(),
        },
      });

      if (response.data.success) {
        setHospitals(response.data.data);
      } else {
        setError("No hospitals found");
        setHospitals([]);
      }
    } catch (err) {
      console.error("Error searching hospitals:", err);
      setError("Failed to search hospitals");
      setHospitals([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchHospitalsByName(searchTerm);
      } else {
        fetchAllHospitals();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    fetchAllHospitals();
  }, []);

  // Filter hospitals by city
  const filteredHospitals = hospitals.filter((hospital) => {
    if (!selectedCity || selectedCity === "All") return true;
    return hospital.address?.city === selectedCity;
  });

  // Get unique cities
  const cities = [
    "All",
    ...new Set(hospitals.map((h) => h.address?.city).filter((city) => city)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 mt-16 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading hospitals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Hospitals</h1>
        <button
          onClick={() => navigate("/addhospital")}
          className="flex items-center gap-2 px-4 py-2 bg-[#4db6ac] hover:bg-[#399d94] text-white rounded-lg"
        >
          <Plus size={18} /> Add Hospital
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search hospitals by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac]"
          />
        </div>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4db6ac]"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Hospital Logo */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={hospital.logo}
                  alt={hospital.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-hospital.png";
                  }}
                />
              </div>

              {/* Hospital Info */}
              <div className="p-4">
                <h3 className="text-lg line-clamp-1 font-semibold text-gray-800 mb-2">
                  {hospital.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {hospital.address ? (
                    <>
                      {hospital.address.addressLine1}
                      {hospital.address.addressLine2 &&
                        `, ${hospital.address.addressLine2}`}
                      <br />
                      {hospital.address.city}, {hospital.address.state} -{" "}
                      {hospital.address.pincode}
                    </>
                  ) : (
                    "Address not available"
                  )}
                </p>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    OHID:{" "}
                    <span className="font-medium">
                      {hospital.OHID || "N/A"}
                    </span>
                  </p>
                  <p>
                    Onboarding Date:{" "}
                    <span className="font-medium">
                      {formatDate(hospital.createdAt) || "N/A"}
                    </span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        hospital.suspended ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {hospital.suspended ? "Suspended" : "Active"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {/* todo: add actual phone and email  */}
              <div className="p-4 bg-gray-50 grid grid-cols-2 gap-2">
                <a href="tel:+911234567890" className="w-full">
                  <button className="flex items-center w-full justify-center gap-1 px-2 py-1.5 bg-[#4db6ac] text-white rounded text-xs hover:bg-[#399d94]">
                    <Phone size={14} /> Call
                  </button>
                </a>

                <a href="mailto:example@email.com" className="w-full">
                  <button className="flex items-center w-full justify-center gap-1 px-2 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-100">
                    <Mail size={14} /> Email
                  </button>
                </a>

                <button
                  onClick={() => {
                    console.log("Hospital ID to edit:", hospital.id); // Use hospital.id
                    navigate(`/edithospital/${hospital.id}`);
                  }}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                >
                  <Edit size={14} /> Edit
                </button>
                <button className="flex items-center justify-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                  <Slash size={14} /> Suspend
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchTerm
              ? `No hospitals found for "${searchTerm}"`
              : "No hospitals available"}
          </div>
        )}
      </div>

      {/* Loading during search */}
      {searchLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#4db6ac] border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
