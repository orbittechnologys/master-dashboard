import { useState, useEffect, useCallback } from "react";
import { Search, Phone, Mail, Plus, Edit, Slash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../hospitals/HospitalCard";

export default function Hospital() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Debounce function to prevent too many API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Function to get auth token
  const getAuthToken = () => {
    return sessionStorage.getItem("authToken");
  };

  // Function to make API request with proper headers
  const makeApiRequest = async (url, params = {}) => {
    const token = getAuthToken();
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params,
    });
  };

  // Fetch all hospitals data from API
  const fetchAllHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await makeApiRequest('https://care.uur.co.in:4035/api/hospital/fetchAll');
      
      if (data.success) {
        setHospitals(data.data);
      } else {
        setError('Failed to fetch hospitals');
      }
    } catch (err) {
      console.error('Error fetching hospitals:', err);
      setError('Failed to load hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search hospitals by name using the search API
  const searchHospitalsByName = async (query) => {
    if (!query.trim()) {
      // If search is empty, fetch all hospitals
      fetchAllHospitals();
      return;
    }

    try {
      setSearchLoading(true);
      setError(null);
      
      const { data } = await makeApiRequest('https://care.uur.co.in:4035/api/hospital/fetchByName', {
        q: query.trim()
      });
      
      if (data.success) {
        setHospitals(data.data);
      } else {
        setError('Failed to search hospitals');
        setHospitals([]);
      }
    } catch (err) {
      console.error('Error searching hospitals:', err);
      setError('Failed to search hospitals. Please try again.');
      setHospitals([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      searchHospitalsByName(query);
    }, 500),
    []
  );

  // Initial load - fetch all hospitals
  useEffect(() => {
    fetchAllHospitals();
  }, []);

  // Handle search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Extract unique cities from hospital data
  const cities = ["All", ...new Set(hospitals.map((h) => h.address?.city).filter(Boolean))];

  // Filter hospitals by city (search by name is handled by API)
  const filteredHospitals = hospitals.filter((h) => {
    const matchesCity =
      selectedCity === "" || selectedCity === "All" || h.address?.city === selectedCity;
    return matchesCity;
  });

  // Loading state - show loading for initial load or search
  if (loading && !searchLoading) {
    return (
      <div className="flex flex-col min-h-screen p-4 md:p-6 bg-background w-full mt-16">
        <div className="flex justify-center items-center flex-1">
          <div className="text-lg text-gray-600">Loading hospitals...</div>
        </div>
      </div>
    );
  }

  if (error && hospitals.length === 0) {
    return (
      <div className="flex flex-col min-h-screen p-4 md:p-6 bg-background w-full mt-16">
        <div className="flex justify-center items-center flex-1">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">{error}</div>
            <button
              onClick={() => {
                setError(null);
                fetchAllHospitals();
              }}
              className="px-4 py-2 bg-[#4db6ac] text-white rounded-lg hover:bg-[#399d94] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 bg-background w-full mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          All Hospitals
        </h1>
        <button
          onClick={() => navigate("/addhospital")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4db6ac] hover:bg-[#399d94] text-white rounded-lg shadow transition w-full sm:w-auto"
        >
          <Plus size={18} /> Add Hospital
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${
              searchLoading ? 'animate-pulse' : ''
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search hospitals by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4db6ac] focus:outline-none text-sm"
            disabled={searchLoading}
          />
          {searchLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-[#4db6ac] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4db6ac] focus:outline-none text-sm w-full md:w-auto"
          disabled={searchLoading}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Error message for search */}
      {error && hospitals.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 flex-1 overflow-y-auto">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="flex flex-col h-fit">
              {/* Logo Section */}
              <div className="bg-gray-50 flex items-center justify-center">
                <img
                  src={hospital.logo}
                  // alt={hospital.name}
                  className="h-40 w-full object-contain rounded-md"
                  // onError={(e) => {
                  //   e.target.src = '/placeholder-hospital.png';
                  // }}
                />
              </div>

              {/* Hospital Info */}
              <CardHeader>
                <CardTitle>{hospital.name}</CardTitle>
                <CardDescription>
                  {hospital.address ? (
                    <>
                      {hospital.address.addressLine1}
                      {hospital.address.addressLine2 && `, ${hospital.address.addressLine2}`}
                      <br />
                      {hospital.address.city}, {hospital.address.state} - {hospital.address.pincode}
                    </>
                  ) : (
                    'Address not available'
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    OHID: <span className="font-medium">{hospital.OHID}</span>
                  </p>
                  <p>
                    Doctors: <span className="font-medium">{hospital.noOfDoctors || 'N/A'}</span>
                  </p>
                  <p>
                    Status: <span className={`font-medium ${hospital.suspended ? 'text-red-600' : 'text-green-600'}`}>
                      {hospital.suspended ? 'Suspended' : 'Active'}
                    </span>
                  </p>
                </div>
              </CardContent>

              {/* Action Buttons */}
            <CardFooter className="mt-auto grid grid-cols-2 xl:grid-cols-4 gap-2">
  {/* Call Button */}
  <button
    onClick={() => {
      /* Add phone call functionality */
    }}
    className="flex items-center gap-1 px-2 py-1.5 bg-[#4db6ac] text-white rounded-lg text-xs hover:bg-[#399d94] transition flex-1 justify-center"
  >
    <Phone size={14} /> Call
  </button>

  {/* Email Button */}
  <button
    onClick={() => {
      /* Add email functionality */
    }}
    className="flex items-center gap-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition flex-1 justify-center"
  >
    <Mail size={14} /> Email
  </button>

  {/* Edit Button */}
  <button
    onClick={() => {
      /* Add edit functionality */
    }}
    className="flex items-center gap-1 px-2 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition flex-1 justify-center"
  >
    <Edit size={14} /> Edit
  </button>

  {/* Suspend Button */}
  <button
    onClick={() => {
      /* Add suspend functionality */
    }}
    className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition flex-1 justify-center"
  >
    <Slash size={14} /> Suspend
  </button>
</CardFooter>

            </Card>
          ))
        ) : searchLoading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-[#4db6ac] border-t-transparent rounded-full animate-spin"></div>
              Searching hospitals...
            </div>
          </div>
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            {searchTerm ? 
              `No hospitals found matching "${searchTerm}"${selectedCity !== "All" && selectedCity ? ` in ${selectedCity}` : ''}.` :
              'No hospitals found matching your criteria.'
            }
          </div>
        )}
      </div>
    </div>
  );
}